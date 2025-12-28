"use client";

import Image from "next/image";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { LOGO } from "@/assets/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function Header() {
  const { isLoggedIn, username, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white w-full z-50 relative">
      <div className="h-20 w-full flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="w-32 md:w-48 cursor-pointer" onClick={() => router.push("/")}>
          <Image src={LOGO} alt="Librix Logo" width={130} className="object-contain" />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center space-x-3 w-2/5">
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="Search for books..."
            className="bg-white"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon className="!text-[#273498]" />
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                borderRadius: 50,
                paddingLeft: 15,
              },
            }}
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4 relative">
          <IconButton
            onClick={() => {
              if (isLoggedIn) {
                router.push("/wishlist");
              } else {
                toast.error("Please sign in to view your wishlist");
                router.push("/signin");
              }
            }}
            className="hover:bg-gray-200 p-2 !text-[#273498] rounded-full"
          >
            <FavoriteBorderIcon fontSize="medium" />
          </IconButton>

          <IconButton
            onClick={() => {
              if (isLoggedIn) {
                router.push("/cart");
              } else {
                toast.error("Please sign in to view your cart");
                router.push("/signin");
              }
            }}
            className="hover:bg-gray-200 p-2 !text-[#273498] rounded-full"
          >
            <ShoppingCartIcon fontSize="medium" />
          </IconButton>

          {!isLoggedIn ? (
            <div className="hidden md:flex items-center gap-2 ml-4">
              <button
                onClick={() => router.push("/signin")}
                className="text-sm font-medium text-[#273498] border border-[#273498] px-4 py-1.5 rounded-full hover:bg-[#273498] hover:text-white transition"
              >
                Sign In
              </button>
              <Link
                href="/signup"
                className="text-sm font-medium text-white bg-[#273498] px-4 py-1.5 rounded-full hover:bg-[#1f285f] transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 text-sm font-medium text-[#273498] hover:text-[#1f285f] ml-2"
              >
                <PersonOutlineIcon />
                <span className="hidden md:inline">{username || "Loading..."}</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>

              {showDropdown && (
                <div className="absolute top-16 right-0 w-40 bg-white rounded-md shadow-lg ring-1 ring-opacity-5 z-50 overflow-hidden">
                  <ul className="py-1">
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/profile?tab=orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          setShowDropdown(false);
                          router.push("/");
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="flex md:hidden px-4 pb-2">
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Search for books..."
          className="bg-white"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon className="!text-[#273498]" />
                </IconButton>
              </InputAdornment>
            ),
            style: {
              borderRadius: 50,
              paddingLeft: 15,
            },
          }}
        />
      </div>
    </header>
  );
}
