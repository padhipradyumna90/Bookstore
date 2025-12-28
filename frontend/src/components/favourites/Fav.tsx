"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HeartOff } from 'lucide-react';

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
}

export default function Fav() {
  const [favourites, setFavourites] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const uid = localStorage.getItem("userid") || "";
    setUserId(uid);
    if (uid) fetchFavourites(uid);
  }, []);

  const fetchFavourites = async (uid: string) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/get-favourite-books/${uid}`);
      setFavourites(res.data.favourites || []);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavourite = async (bookId: string) => {
    try {
      await axios.put(`http://localhost:4000/api/v1/remove-book-from-favourites/${uid}`, {
        bookid: bookId,
        userid: userId,
      });
      setFavourites(prev => prev.filter(book => book._id !== bookId));
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  // if (loading) return <div className="p-6">Loading favourites...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Your Favourite Books</h1>

      {favourites.length === 0 ? (
        <div className="flex items-center justify-center h-96 text-gray-600 text-lg">
          <p>Your favourites list is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map(book => (
            <div
              key={book._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-500">{book.author}</p>
              <p className="text-md font-medium mt-2">${book.price.toFixed(2)}</p>

              <button
                onClick={() => removeFavourite(book._id)}
                className="mt-4 w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-700"
              >
                <HeartOff size={18} /> Remove from Favourites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
