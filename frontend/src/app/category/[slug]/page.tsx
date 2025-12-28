"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface Book {
  _id: string; // Use _id instead of id
  title: string;
  author: string;
  url: string;
  price: number; // discounted price
  discount: number; // add this if discount is not always present
}

export default function Page() {
  const params = useParams();
  const slug = decodeURIComponent(params.slug as string);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/v1/category/${slug}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          setBooks([]);
        }
      } catch (err) {
        console.error("Error fetching category data:", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [slug]);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6 capitalize">{slug} Books</h1>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
        </div>
      ) : books.length === 0 ? (
        <p>No books found in this category.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {books.map((book) => {
            const discount = book.discount;
            const originalPrice = Math.round(book.price / (1 - discount / 100));

            return (
              <Link href={`/books/${book._id}`} key={book._id} className="block">
                <motion.div
                  className="relative bg-white shadow-md rounded-xl overflow-hidden p-4 hover:shadow-lg hover:scale-[1.03] transition-all cursor-pointer h-full"
                  whileHover={{ scale: 1.03 }}
                >
                  {/* Discount Badge */}
                  {discount !== 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow-md">
                      {discount}% OFF
                    </div>
                  )}

                  <img
                    src={book.url}
                    alt={book.title}
                    className="h-40 w-full object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold text-center">{book.title}</h3>
                  <p className="text-gray-500 text-sm text-center">{book.author}</p>

                  <div className="text-center mt-2">
                    <span className="text-primary font-semibold text-lg">₹{book.price}</span>
                    <span className="text-sm text-gray-400 line-through ml-2">₹{originalPrice}</span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
