"use client"
import axios from "axios";
import React, { ReactElement, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status,setStatus] = useState("");

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name,value}=e.target;
    setFormData({
      ...formData,
      [name]:value,
    })
  }

  const handleSubmit =async(e:React.FormEvent)=>{
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await axios.post("http://localhost:4000/api/v1/support", formData);
      setStatus("Thank you for reaching out! We will get back to you soon.");
    } catch (error) {
      setStatus("Oops! Something went wrong, please try again later.");
    }
  }

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
            Get in Touch with <span className="text-blue-600">Librix</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Have questions? We're here to help!
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-md rounded-xl">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Message
                </label>
                <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                  rows={6}
                  placeholder="Write your message here..."
                  className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-400">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 sm:p-8 shadow-md rounded-xl">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Contact Information
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Have a question? Reach out to us anytime.
            </p>
            <div className="mt-5 space-y-4">
              {/* Location */}
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-blue-500 text-xl" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=123+Librix+Street+New+Delhi+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Jaydev Bihar, Odisha, India
                </a>
              </div>
              {/* Phone */}
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-blue-500 text-xl" />
                <a
                  href="tel:+919876543210"
                  className="text-blue-600 hover:text-blue-800"
                >
                  +91 7978213669
                </a>
              </div>
              {/* Email */}
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-500 text-xl" />
                <a
                  href="mailto:support@librix.com"
                  className="text-blue-600 hover:text-blue-800"
                >
                  support@librix.com
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
              Connect With Us
            </h3>
            <div className="flex space-x-5 mt-3">
              <a
                href="https://www.facebook.com/librix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-2xl"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com/librix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-2xl"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/company/librix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-2xl"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Our Location
          </h3>
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d779.70022241915!2d85.82299199780489!3d20.297727655369542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1742468412940!5m2!1sen!2sin"
              height="450"
              loading="lazy"
              className="w-full"
            ></iframe>

            {/* Ratings & Location Link */}
            <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 shadow-md rounded-lg p-3">
              <p>Jaydev Bihar,Odisha ,India</p>
              <p className="text-sm text-gray-800 dark:text-white font-semibold">
                5.0⭐⭐⭐⭐⭐
              </p>
              <a
                href="https://www.google.com/maps/place/Your+Business+Name/@20.2977276,85.8229919,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
