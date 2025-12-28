"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; 

export default function Signup() {
    const [showpassword,hidepassword]=useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:4000/api/v1/signup", formData);
      if (res.status === 201) {
        alert("Signup successful! You can now log in.");
        router.push("/signin"); // Redirect to login page
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-800 p-8 rounded-2xl shadow-lg text-white border border-zinc-700">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white border border-zinc-600"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white border border-zinc-600"
            onChange={handleChange}
            required
          />
          <div className="relative">

          <input
            type={showpassword?"text":"password"}
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white border border-zinc-600"
            onChange={handleChange}
            required
            />
            <button 
            type="button"
            onClick={()=>hidepassword(!showpassword)}
            className="absolute right-3 top-[30%] text-zinc-400 hover:text-white"
            >
                {showpassword?<EyeOff size={20}/>:<Eye size={20}/>}
            </button>
            </div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white border border-zinc-600"
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white border border-zinc-600"
            onChange={handleChange}
            defaultValue="user"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {errorMsg && (
            <p className="text-red-400 text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-zinc-400 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-purple-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
