"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
}

export default function Cart() {
  const [cart, setCart] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth(); // updated here

  useEffect(() => {
    if (userId) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [userId]);

 const fetchCart = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:4000/api/v1/get-cart-for-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCart(res.data.cartData || []);
  } catch (err) {
    console.error("Error fetching cart:", err);
  } finally {
    setLoading(false);
  }
};


  const removeFromCart = async (bookId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:4000/api/v1/remove-book-from-cart/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart((prev) => prev.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error("Error removing book:", err);
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : cart.length === 0 ? (
        <p className="flex flex-col items-center justify-center h-96 text-gray-600 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((book) => (
              <div
                key={book._id}
                className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-20 h-28 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{book.title}</h2>
                    <p className="text-sm text-gray-500">{book.author}</p>
                    <p className="mt-1 font-medium">${book.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(book._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <p className="text-lg mb-2">
              Total: <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
