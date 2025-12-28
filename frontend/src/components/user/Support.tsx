import React, { useState } from "react";
import axios from "axios";

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await axios.post("http://localhost:4000/api/v1/support", formData);
      setStatus("Thank you for reaching out! We will get back to you soon.");
    } catch (error) {
      setStatus("Oops! Something went wrong, please try again later.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-4xl font-bold text-purple-500 mb-6">Support</h1>
      <p className="text-lg text-gray-700 mb-6">
        Need help? We're here to assist you. Please provide the details below, and we will get back to you as soon as possible.
      </p>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border text-gray-700 bg-blue-50 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 text-gray-700 bg-blue-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full p-3 border text-gray-700 bg-blue-50 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Submit Request
          </button>
        </div>
      </form>

      {/* Status Message */}
      {status && (
        <div className="mt-6 text-center text-lg text-gray-700">
          <p>{status}</p>
        </div>
      )}

      {/* Support Contact Info */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-purple-500 mb-4">Other Ways to Reach Us</h2>
        <p className="text-lg text-gray-700 mb-4">
          You can also reach out to us via the following methods:
        </p>
        <ul className="list-disc pl-6">
          <li className="text-lg text-gray-700"><a href="mailto: support@example.com">📧 Email: support@example.com</a></li>
          <li className="text-lg text-gray-700"><a href=" tel:+91 7978213669">📞 Phone:+91 7978213669</a></li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-purple-500 mb-4">Frequently Asked Questions</h2>
        <ul className="space-y-4">
          <li>
            <p className="font-semibold text-gray-800">1. How can I reset my password?</p>
            <p className="text-gray-700">
              To reset your password, click on the "Forgot Password" link on the login page and follow the
              instructions.
            </p>
          </li>
          <li>
            <p className="font-semibold text-gray-800">2. How do I track my order?</p>
            <p className="text-gray-700">
              Once your order is shipped, we will send you an email with tracking information.
            </p>
          </li>
          <li>
            <p className="font-semibold text-gray-800">3. Can I cancel my order?</p>
            <p className="text-gray-700">
              You can cancel your order within 24 hours of placing it. Please contact us immediately for assistance.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
