"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Ban, Check, Trash2, Search, Info, X } from "lucide-react";
import Image from "next/image";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  address: string;
  profileImage?: string;
  createdAt?: string;
  lastLogin?: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/getallusers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
      setFilteredUsers(res.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (
    userId: string,
    status: "active" | "blocked"
  ) => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/updatestatus/${userId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const applyFilters = () => {
    let temp = [...users];

    if (search) {
      const s = search.toLowerCase();
      temp = temp.filter(
        (u) =>
          u.username.toLowerCase().includes(s) ||
          u.email.toLowerCase().includes(s)
      );
    }

    if (statusFilter) {
      temp = temp.filter((u) => u.status === statusFilter);
    }

    if (roleFilter) {
      temp = temp.filter((u) => u.role === roleFilter);
    }

    setFilteredUsers(temp);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, statusFilter, roleFilter, users]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center text-gray-500 bg-white px-3 py-2 rounded-lg shadow-sm w-full sm:w-auto">
          <Search className="h-4 w-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search username or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none text-sm w-full sm:w-64"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm text-gray-700"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm text-gray-700"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="relative bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 transition-transform hover:-translate-y-1 hover:shadow-2xl"
          >
            {/* Info Icon */}
            <div
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              <Info className="w-5 h-5" />
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg uppercase">
                {user.username.charAt(0)}
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.username}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Info */}
            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium text-gray-600">Role:</span>{" "}
                <span className="text-blue-600">{user.role}</span>
              </p>
              <p>
                <span className="font-medium text-gray-600">Status:</span>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    user.status === "blocked"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {user.status}
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              {user.status === "active" ? (
                <button
                  onClick={() => updateUserStatus(user._id, "blocked")}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-sm transition-all"
                >
                  <Ban className="h-4 w-4" />
                  Block
                </button>
              ) : (
                <button
                  onClick={() => updateUserStatus(user._id, "active")}
                  className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-xl text-sm transition-all"
                >
                  <Check className="h-4 w-4" />
                  Unblock
                </button>
              )}
              <button
                onClick={() => deleteUser(user._id)}
                className="flex items-center gap-1 bg-gray-300 hover:bg-gray-400 text-black px-3 py-2 rounded-xl text-sm transition-all"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              User Details
            </h2>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Username:</span>{" "}
              {selectedUser.username}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Email:</span> {selectedUser.email}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Role:</span> {selectedUser.role}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Status:</span>{" "}
              {selectedUser.status}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Address:</span>{" "}
              {selectedUser.address}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(selectedUser.createdAt || "").toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
