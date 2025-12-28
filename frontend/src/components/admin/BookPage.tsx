"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BookPage() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    discount: "",
    category: "",
    url: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const pageRange = 3; // Number of pages to show at once
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2)); // Adjust the range
  const endPage = Math.min(totalPages, startPage + pageRange - 1); // Limit the end page

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/all-books");
      setBooks(res.data.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to fetch books.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token is required");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (editingId) {
        const res = await axios.put(
          `http://localhost:4000/api/v1/update-book/${editingId}`,
          formData,
          { headers }
        );
        if (res.status === 200) {
          setSuccess("Book updated successfully!");
        } else {
          setError("Failed to update book.");
        }
      } else {
        const res = await axios.post(
          "http://localhost:4000/api/v1/add-book",
          formData,
          { headers }
        );
        if (res.status === 201) {
          setSuccess("Book added successfully!");
        } else {
          setError("Failed to add book.");
        }
      }

      setFormData({
        title: "",
        author: "",
        price: "",
        discount: "",
        category: "",
        url: "",
      });
      setEditingId(null);
      fetchBooks();
    } catch (err: any) {
      console.error("Error adding/updating book:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token is required");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const res = await axios.delete(
        `http://localhost:4000/api/v1/delete-book/${id}`,
        { headers }
      );
      if (res.status === 200) {
        setSuccess("Book deleted successfully!");
        fetchBooks();
      } else {
        setError("Failed to delete book.");
      }
    } catch (err: any) {
      console.error("Error deleting book:", err);
      setError(err.response?.data?.message || "Failed to delete book.");
    }
  };

  const handleEditBook = (book: any) => {
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price,
      discount: book.discount,
      category: book.category,
      url: book.url,
    });
    setEditingId(book._id);
    setSuccess("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 md:p-8 bg-[#f9fafb] text-gray-800 rounded-xl shadow-inner">
      {(success || error) && (
        <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md">
          <div
            className={`text-center px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
              success
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {success || error}
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-[#111827]">
        📚 Book Management
      </h1>

      {/* Add / Update Book */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-[#111827]">
          {editingId ? "✏️ Update Book" : "➕ Add New Book"}
        </h2>

        <form
          onSubmit={handleAddOrUpdateBook}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Title"
            className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Author"
            className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="Price"
            type="number"
            className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
          <input
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Discount %"
            type="number"
            min={0}
            max={100}
            className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="Category"
            className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
          <input
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            placeholder="Full Image URL"
            className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition col-span-1 md:col-span-2"
          >
            {loading
              ? editingId
                ? "Updating..."
                : "Adding..."
              : editingId
              ? "Update Book"
              : "Add Book"}
          </button>
        </form>
      </div>

      {/* View Books */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-[#111827]">
          📖 All Books
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Author</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Discount</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book: any) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border ">{book.title}</td>
                  <td className="px-4 py-2 border">{book.author}</td>
                  <td className="px-4 py-2 border">₹{book.price}</td>
                  <td className="px-4 py-2 border">{book.category}</td>
                  <td className="px-4 py-2 border">{book.discount}%</td>
                  <td className="px-4 py-2 border  ">
                    <button
                      onClick={() => handleEditBook(book)}
                      className="text-blue-600 hover:text-blue-700   "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      className="text-red-600 hover:text-red-700 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}

        <div className="flex justify-center mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-l-lg hover:bg-blue-600"
          >
            Previous
          </button>

          {[...Array(endPage - startPage + 1)].map((_, index) => (
            <button
              key={startPage + index}
              onClick={() => handlePageChange(startPage + index)}
              className={`px-4 py-2 ${
                currentPage === startPage + index
                  ? "bg-blue-500"
                  : "bg-gray-200"
              } text-white rounded-md mx-1`}
            >
              {startPage + index}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
