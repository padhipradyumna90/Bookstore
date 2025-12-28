"use client";
import BookPage from "../admin/BookPage";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
// import { motion } from "framer-motion";
import Order from "../admin/OrderManagement";
import User from "../admin/UserManagement";
import ChangePassword from "../admin/ChangePassword";
import AccountManagement from "../admin/AccountManagement";
import Dashboard from "../admin/Dashboard";
import Orders from "../user/Orders";
import Support from "../user/Support";


export default function ProfilePage() {
  const { isLoggedIn, username: authUsername, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const tabFromQuery = searchParams.get("tab");
    if (tabFromQuery) {
      setActiveTab(tabFromQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchUser = async () => {
      // const name = localStorage.getItem("username");
      // console.log(name, "username");
      const token = localStorage.getItem("token");
      // console.log(token, "bookssss");
      if (!token) {
        router.push('/signin');
        return;
      }
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/getuserinformation",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data.data);
        setUser(res.data.data);
      } catch (err) {
        console.error("Failed to fetch user info", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // if (loading) return <div className="text-white p-6">Loading...</div>;

  const tabs = [
    { tab: "dashboard", label: "📊 Dashboard" },
    { tab: "account", label: "👤 Account Settings" },
    { tab: "password", label: "🔐 Change Password" },
  ];

  const userTabs = [
    { tab: "orders", label: "📦 Orders" },
    // { tab: "reviews", label: "⭐ Reviews" },
    { tab: "support", label: "💬 Support" },
  ];

  const adminTabs = [
    { tab: "user-management", label: "👥 User Management" },
    { tab: "product-management", label: "📚 Product Management" },
    { tab: "order-management", label: "📦 Order Management" },
  ];

  const isAdmin = user?.role === "admin";

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-zinc-900 to-zinc-800 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-800 border-r border-zinc-700 p-6 flex flex-col">
        <h2 className="text-2xl font-semibold text-purple-400 mb-8">
          Welcome, {user?.username}
        </h2>

        <nav className="space-y-4">
          {tabs.map(({ tab, label }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`block w-full text-left py-2 px-3 rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "hover:bg-purple-700 hover:text-white text-zinc-300"
              }`}
            >
              {label}
            </button>
          ))}

          {/* Show user-specific tabs if the user is not an admin */}
          {!isAdmin &&
            userTabs.map(({ tab, label }) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`block w-full text-left py-2 px-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-700 hover:text-white text-zinc-300"
                }`}
              >
                {label}
              </button>
            ))}

          {/* Show admin-specific tabs if the user is an admin */}
          {isAdmin &&
            adminTabs.map(({ tab, label }) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`block w-full text-left py-2 px-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-700 hover:text-white text-zinc-300"
                }`}
              >
                {label}
              </button>
            ))}

          <button
            onClick={handleLogout}
            className="block w-full text-left py-2 px-3 rounded-lg transition-all duration-200 text-red-400 hover:bg-red-500 hover:text-white mt-2"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {activeTab === "dashboard" && (

         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
         >
           <h1 className="text-4xl font-bold text-purple-400 mb-8">Dashboard</h1>
         
           <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-10">
             <div className="mb-6">
               <p className="text-lg text-zinc-700">
                 Welcome ,{" "}
                 <span className="font-semibold text-zinc-900">{user?.username}</span> 👋
               </p>
               <p className="text-sm text-zinc-500">Here’s your account summary.</p>
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
         
        )}

        {activeTab === "account" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-purple-300 mb-4">
              Account Settings
            </h1>
            <AccountManagement/>
            
          </motion.div>
        )}

        {activeTab === "password" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-purple-300 mb-4">
              Change Password
            </h1>
            <ChangePassword/>
          </motion.div>
        )}

        {/* User-specific tabs */}
        {!isAdmin && activeTab === "orders" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-purple-300 mb-4">Orders</h1>
             <Orders/>
          </motion.div>
        )}
        {/* section for review ing products  */}
        {/* {!isAdmin && activeTab === "reviews" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-purple-300 mb-4">Reviews</h1>
            <p className="text-zinc-400">
              Manage and view your product reviews here.
            </p>
          </motion.div>
        )} */}

        {!isAdmin && activeTab === "support" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-purple-300 mb-4">Support</h1>
            <Support/>
          </motion.div>
        )}

        {/* Admin-specific tabs */}
        {isAdmin && activeTab === "user-management" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-purple-300 mb-4">
              User Management
            </h1>
            <User/>
          </motion.div>
        )}

        {isAdmin && activeTab === "product-management" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-purple-300 mb-4">
              Product Management
            </h1>
            <BookPage />
          </motion.div>
        )}
        {isAdmin && activeTab === "order-management" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-purple-300 mb-4">
              Order Management
            </h1>
            <Order/>
          </motion.div>
        )}
      </main>
    </div>
  );
}
