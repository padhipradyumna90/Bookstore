import React, { useEffect, useState } from "react";
import axios from "axios";
// Accont managemnt page is nmot responding and is not showing when you bisgn in it does not shows ypur identifcications in pannel and admin paneel is also not responding StylePropertyMapReadOnly
export default function AccountManagement() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
  });

  const [deleteReason, setDeleteReason] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/getuserinformation", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { username, email, address } = res.data.data || {};

        setFormData({
          username: username ?? "",
          email: email ?? "",
          address: address ?? "",
        });
      })
      .catch((err) => console.error("Error fetching user info:", err));
  }, []);

  const handleProfileUpdate = async () => {
    try {
      await axios.put("http://localhost:4000/api/v1/update-profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully");
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  const handleAccountDelete = async () => {
    try {
      await axios.delete("http://localhost:4000/api/v1/deleteaccount", {
        headers: { Authorization: `Bearer ${token}` },
        data: { reason: deleteReason },
      });
      alert("Account deleted");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      alert("Failed to delete account");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-black bg-white shadow rounded-xl space-y-6">
      <h2 className="text-2xl font-bold">Edit Account Information</h2>

      {/* Profile Info */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleProfileUpdate}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      {/* Delete Account Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-red-600">
          Delete My Account
        </h2>

        <textarea
          rows={3}
          placeholder="Reason for deleting account (optional)"
          value={deleteReason}
          onChange={(e) => setDeleteReason(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Delete My Account
        </button>

        {showDeleteConfirm && (
          <div className="bg-red-100 border border-red-400 p-4 rounded space-y-2 mt-2">
            <p className="text-sm text-red-700">
              Are you sure you want to delete your account? This action is
              irreversible.
            </p>

            <button
              onClick={handleAccountDelete}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Confirm Delete
            </button>

            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="ml-2 text-sm underline"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
