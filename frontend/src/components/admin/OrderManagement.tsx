'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    // setLoading(true);
    try {
      const res = await axios.get('http://localhost:4000/api/v1/get-all-orders');
      setOrders(res.data.data);
    } catch (err) {
      setError('Failed to fetch orders.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/v1/update-status/${id}`, { status });
      if (res.status === 200) {
        setSuccess('Order status updated successfully!');
        fetchOrders();
      }
    } catch (err) {
      setError('Failed to update order status.');
      console.error(err);
    }
  };

  const handleCancelOrder = async (id: string) => {
    const confirmCancel = confirm('Are you sure you want to cancel this order?');
    if (!confirmCancel) return;

    try {
      const res = await axios.delete(`http://localhost:4000/api/v1/cancel-order/${id}`);
      if (res.status === 200) {
        setSuccess('Order canceled successfully!');
        fetchOrders();
      }
    } catch (err) {
      setError('Failed to cancel order.');
      console.error(err);
    }
  };

  return (
    <div className="p-6 md:p-8 bg-[#f9fafb] text-gray-800 rounded-xl shadow-inner">
      {/* Notification Overlay */}
      {(success || error) && (
        <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md">
          <div
            className={`text-center px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
              success
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {success || error}
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-[#111827]">🛍️ Order Management</h1>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-[#111827]">📜 All Orders</h2>

        {loading && <div className="text-center py-4">Loading...</div>}
        {!loading && orders.length === 0 && <div className="text-center py-4">No orders available.</div>}

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{order._id}</td>
                  <td className="px-4 py-2 border">{order.customerName}</td>
                  <td className="px-4 py-2 border">₹{order.amount}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        order.status === 'Pending'
                          ? 'bg-yellow-200 text-yellow-800'
                          : order.status === 'Shipped'
                          ? 'bg-blue-200 text-blue-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleUpdateStatus(order._id, order.status === 'Pending' ? 'Shipped' : 'Delivered')}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      {order.status === 'Pending' ? 'Ship' : 'Mark Delivered'}
                    </button>
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
