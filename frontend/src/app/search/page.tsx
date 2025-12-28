"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books/search-books?query=${query}`)
        .then((res) => setBooks(res.data.books))
        .catch((err) => console.error("Search failed:", err));
    }
  }, [query]);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h1>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {books.map((book: any) => (
            <div key={book._id} className="border rounded-lg p-4 shadow-sm">
              <img src={book.coverImage} alt={book.title} className="w-full h-40 object-cover mb-2" />
              <h2 className="text-lg font-medium">{book.title}</h2>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
