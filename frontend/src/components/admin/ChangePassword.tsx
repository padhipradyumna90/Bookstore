"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, CheckCircle, AlertCircle } from "lucide-react";

export default function ChangePassword() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/getuserinformation", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Failed to fetch user info", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        "http://localhost:4000/api/v1/changepassword",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage({ type: "success", text: "Password changed successfully!" });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Something went wrong!";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10  text-gray-500 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Change Password</h2>

      {user && (
        <p className="text-sm text-gray-500 text-center mb-4">
         <span className="font-medium text-blue-600">{user.username}</span>
        </p>
      )}

      <div className="space-y-4">
        <input
          type="password"
          placeholder="Old Password"
          className="w-full border border-gray-300 rounded-xl px-4 py-2"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full border border-gray-300 rounded-xl px-4 py-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full border border-gray-300 rounded-xl px-4 py-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handlePasswordChange}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="h-4 w-4 animate-spin" /> Changing...
            </div>
          ) : (
            "Change Password"
          )}
        </button>

        {message && (
          <div
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
