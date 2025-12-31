import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const token = localStorage.getItem("token");

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setAvatarPreview(response.data?.avatar || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  // const handleAvatarChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setAvatarFile(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setAvatarPreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleAvatarUpdate = async () => {
  //   e.preventDefault();

  //   if (!avatarFile) {
  //     return alert("Please select an image to upload.");
  //   }

  //   const formData = new FormData();
  //   formData.append("avatar", avatarFile);

    try {
      const response = await axios.put("/api/user/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile avatar updated successfully");
      // Optionally update the avatar preview after successful upload
      setAvatarPreview(response.data.avatar);
    } catch (error) {
      alert("Failed to update avatar");
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Add loading state while fetching user data
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="text-4xl font-bold text-purple-400 mb-8">Dashboard</h1>

      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-10">
        <div className="mb-6">
          <p className="text-lg text-zinc-700">
            Welcome back,{" "}
            <span className="font-semibold text-zinc-900">{user?.username}</span> 👋
          </p>
          <p className="text-sm text-zinc-500">Here’s your account summary.</p>
        </div>

        {/* Avatar Upload Section */}
        <div className="mb-6 flex items-center gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border border-zinc-300">
            <img
              src={avatarPreview || "/default-avatar.png"} // Default avatar if none is uploaded
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="block w-full text-sm text-zinc-700"
            />
            <button
              onClick={handleAvatarUpdate}
              className="mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Update Avatar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-zinc-700">
          <div>
            <p className="text-sm text-zinc-500 uppercase mb-1">📛 Username</p>
            <p className="font-medium text-zinc-800">{user?.username}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 uppercase mb-1">📧 Email</p>
            <p className="font-medium text-zinc-800">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 uppercase mb-1">🏠 Address</p>
            <p className="font-medium text-zinc-800">
              {user?.address || <span className="italic text-zinc-400">Not Provided</span>}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 uppercase mb-1">🔖 Role</p>
            <p className="font-medium text-zinc-800 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
