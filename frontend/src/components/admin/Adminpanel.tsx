'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Users, ClipboardList } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';

export default function AdminDashboard() {
  const router = useRouter();

  const cards = [
    {
      title: 'Books',
      count: 120,
      icon: <BookOpen className="w-10 h-10 text-white" />,
      gradient: 'from-blue-500 to-indigo-600',
      route: '/admin/books',
    },
    {
      title: 'Users',
      count: 85,
      icon: <Users className="w-10 h-10 text-white" />,
      gradient: 'from-green-400 to-emerald-600',
      route: '/admin/users',
    },
    {
      title: 'Orders',
      count: 45,
      icon: <ClipboardList className="w-10 h-10 text-white" />,
      gradient: 'from-purple-500 to-pink-600',
      route: '/admin/orders',
    },
  ];

  const bookStats = [
    { category: 'Fiction', count: 30 },
    { category: 'Non-fiction', count: 25 },
    { category: 'Science', count: 20 },
    { category: 'History', count: 15 },
    { category: 'Biography', count: 10 },
  ];

  const orderStats = [
    { date: 'Apr 1', count: 5 },
    { date: 'Apr 2', count: 7 },
    { date: 'Apr 3', count: 4 },
    { date: 'Apr 4', count: 8 },
    { date: 'Apr 5', count: 6 },
  ];

  return (
    <motion.section
      className="relative min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#ffffff] overflow-hidden p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-300 opacity-20 rounded-full top-[-100px] left-[-100px] blur-[100px]" />
        <div className="absolute w-96 h-96 bg-indigo-200 opacity-20 rounded-full bottom-[-100px] right-[-100px] blur-[100px]" />
      </div>

      <div className="relative z-10">
        <motion.h1
          className="text-4xl font-extrabold text-gray-800 mb-8 tracking-wide"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Admin Dashboard
        </motion.h1>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              onClick={() => router.push(card.route)}
              className={`backdrop-blur-md bg-white/10 border border-white/30 p-6 rounded-2xl shadow-xl bg-gradient-to-br ${card.gradient} text-white cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.15, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-between items-center mb-6">
                {card.icon}
                <span className="text-4xl font-semibold">{card.count}</span>
              </div>
              <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
              <p className="text-white/80">Click to manage {card.title.toLowerCase()}.</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Books by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookStats}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', color: '#fff', borderRadius: '5px' }} />
                <Bar dataKey="count" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Orders Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderStats}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', color: '#fff', borderRadius: '5px' }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="count" stroke="#ec4899" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
