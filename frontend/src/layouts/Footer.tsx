import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[rgb(33,18,64)] text-white mt-10 py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Newsletter Section */}
        <div className="space-y-5 border-2 border-white p-5 rounded-lg">
          <h3 className="text-xl font-bold">Join Our Newsletter</h3>
          <p className="text-sm text-gray-200">
            Stay updated with our latest offers and collections.
          </p>
          <div className="grid grid-cols-1 gap-3">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Your Name"
              className="bg-white rounded-md"
            />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Your Email"
              className="bg-white rounded-md"
            />
            <Button
              variant="contained"
              style={{
                backgroundColor: "#f5c518",
                color: "#1f0f3e",
              }}
            >
              Subscribe
            </Button>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Info</h3>
          <p>
            Email:{" "}
            <a href="mailto:support@librix.com" className="hover:text-gray-200">
              support@librix.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+917978213669" className="hover:text-gray-200">
              +91 79782 13669
            </a>
          </p>
          <p>
            Address:{" "}
            <a
              href="https://goo.gl/maps/example"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              Jaydev Bihar, Odisha, India
            </a>
          </p>
        </div>

        {/* Social Media Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/LibrixBookstore"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <i className="fab fa-facebook-square fa-2x">
                <FaFacebook className="!text-2xl" />
              </i>
            </a>
            <a
              href="https://www.instagram.com/librixbookstore/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <i className="fab fa-instagram fa-2x">
                <FaInstagram className="!text-2xl" />
              </i>
            </a>
            <a
              href="https://www.twitter.com/LibrixBookstore/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <i className="fab fa-twitter fa-2x">
                <FaTwitter className="!text-2xl" />
              </i>
            </a>
          </div>
        </div>
      </div>

      <hr className="my-6 border-white/50" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Popular Series Section */}
        <div>
          <h3 className="text-lg font-semibold">Popular Series</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-200">
                Robert Greene Combo
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                The Made Series
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Summer | Turned Pretty Trilogy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Shadow and Bone Trilogy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Percy Jackson Series
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Harry Potter Box Set
              </a>
            </li>
          </ul>
        </div>

        {/* Categories Section */}
        {/* Categories Section */}
        <div>
          <h3 className="text-lg font-semibold">Popular Categories</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/category/fiction" className="hover:text-gray-200">
                Fiction
              </Link>
            </li>
            <li>
              <Link
                href="/category/fiction-box-sets"
                className="hover:text-gray-200"
              >
                Fiction & Box Sets
              </Link>
            </li>
            <li>
              <Link
                href="/category/non-fiction"
                className="hover:text-gray-200"
              >
                Non-Fiction
              </Link>
            </li>
            <li>
              <Link
                href="/category/biographies-memoirs"
                className="hover:text-gray-200"
              >
                Biographies & Memoirs
              </Link>
            </li>
            <li>
              <Link
                href="/category/contemporary-fiction"
                className="hover:text-gray-200"
              >
                Contemporary Fiction
              </Link>
            </li>
            <li>
              <Link
                href="/category/children-books"
                className="hover:text-gray-200"
              >
                Children's Books
              </Link>
            </li>
          </ul>
        </div>

        {/* Help Center Section */}
        <div>
          <h3 className="text-lg font-semibold">Help Center</h3>
          <ul className="space-y-2">
            <li>
              <a href="/contact" className="hover:text-gray-200">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/privacy_policy" className="hover:text-gray-200">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms_conditions" className="hover:text-gray-200">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Shipping & Delivery Policies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Return & Refund Policies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Bulk Order Inquiries
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-8 border-white/50" />

      {/* Footer Bottom */}
      <div className="text-center text-gray-300 text-sm">
        <p>&copy; 2025 Librix Bookstore. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
