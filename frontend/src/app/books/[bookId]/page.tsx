'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Share2, X } from 'lucide-react';
import { format, addDays } from 'date-fns';

interface Book {
  _id: string;
  title: string;
  author: string;
  price: string;
  discount: string;
  category: string;
  url: string;
}

export default function BookDetailPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/v1/${bookId}`);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        toast.error('Failed to load book details.');
      } finally {
        setLoading(false);
      }
    };

    if (bookId) fetchBook();
  }, [bookId]);

  const handleCheckPincode = () => {
    if (pincode.length === 6) {
      const estDate = format(addDays(new Date(), 5), 'dd MMM yyyy');
      setDeliveryDate(estDate);
      toast.success(`Estimated delivery by ${estDate}`);
    } else {
      toast.error('Enter a valid 6-digit pincode');
    }
  };

  const shareUrls = {
    whatsapp: `https://api.whatsapp.com/send?text=Check out this book: ${book?.title} by ${book?.author} - ${book?.url}`,
    x: `https://twitter.com/intent/tweet?text=Check out this book: ${book?.title} by ${book?.author}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${book?.url}`,
  };

  const handleAddToCart = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/v1/add-book-to-cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
        },
        body: JSON.stringify({ bookid: book?._id }),
      });
      const data = await res.json();
      if (data.message === 'Book added to Cart') {
        toast.success('Added to cart');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to add book to cart.');
    }
  };

  const handleAddToFavourites = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/v1/add-book-to-favourites', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
        },
        body: JSON.stringify({ bookid: book?._id }),
      });
      const data = await res.json();
      if (data.message === 'Book added to Favourites') {
        toast.success('Wishlisted');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to add book to favourites.');
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!book) return <div className="p-10 text-center text-red-600">Book not found</div>;

  const originalPrice = parseFloat(book.price);
  const discountPercentage = parseFloat(book.discount);
  const discountedPrice = Math.floor(originalPrice - (originalPrice * discountPercentage) / 100);

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col md:flex-row gap-10">
        {/* Book Image with Share Button */}
        <div className="relative md:w-1/2">
          <Image
            src={book.url}
            alt={book.title}
            width={500}
            height={600}
            className="rounded-xl shadow-xl w-full object-cover"
          />
          <button
            onClick={() => setShowModal(true)}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            title="Share"
          >
            <Share2 className="text-gray-700 w-5 h-5" />
          </button>
        </div>

        {/* Book Info */}
        <div className="md:w-1/2 space-y-5">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">by <span className="font-semibold">{book.author}</span></p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Category: {book.category}</p>

          {/* Pricing */}
          <div className="space-y-1">
            <p className="text-xl">
              <span className="line-through text-gray-500">₹{book.price}</span>
              <span className="ml-2 text-2xl font-bold text-red-600">₹{discountedPrice}</span>
            </p>
            <p className="text-green-600 font-medium">You save {book.discount}%</p>
          </div>

          {/* Delivery Info */}
          <div className="space-y-2 pt-3">
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter your pincode"
              className="w-full max-w-sm px-4 py-2 border rounded-lg"
            />
            <button
              onClick={handleCheckPincode}
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm"
            >
              Check Delivery
            </button>
            {deliveryDate && (
              <p className="text-sm text-gray-700 dark:text-gray-300">Estimated delivery by <span className="font-semibold">{deliveryDate}</span></p>
            )}
          </div>

          {/* Buttons */}
          <div className="pt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow-lg transition"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button
              onClick={handleAddToFavourites}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg shadow-lg transition"
            >
              <Heart className="w-5 h-5" /> Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl relative w-[90%] max-w-md">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Share this book</h2>
            <div className="flex flex-col gap-3">
              <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                Share on WhatsApp
              </a>
              <a href={shareUrls.x} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Share on X (Twitter)
              </a>
              <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                Share on Facebook
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
