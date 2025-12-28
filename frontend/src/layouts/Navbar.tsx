"use client";
import { useState } from "react";
import { NavArr } from "@/utils/navbar";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  Menu,
  MenuItem,
  Button,
  IconButton,
  Drawer,
  Collapse,
} from "@mui/material";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // Hover control
  let hoverTimeout: NodeJS.Timeout;

  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const categories = [
    {
      title: "Fiction",
      subcategories: [
        "Adventure",
        "Fantasy",
        "Science",
        "Crime Thriller",
        "Romance",
        "Relationships",
        "Young & Adult Fiction",
      ],
    },
    {
      title: "Non Fiction",
      subcategories: [
        "Biography",
        "Business,Investment & Economics",
        "History",
        "Health & Wellness",
        "Self Help",
        "Personal Development",
        "Poetry",
      ],
    },
    {
      title: "Other Fiction",
      subcategories: [
        "Analysis & Strategy",
        "Mental Health & Well Being",
        "Personal Finance",
        "Philosophy & Spirituality",
        "Self Help",
      ],
    },
  ];

  const handleSubmenuToggle = (category: string) => {
    setSubmenuOpen(submenuOpen === category ? null : category);
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsCategoryOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsCategoryOpen(false);
    }, 300); // Adjust delay here
  };

  return (
    <nav className="bg-white dark:bg-gray-900 h-16 flex items-center px-4 md:px-6 border-b border-gray-200 dark:border-gray-700 shadow-md sticky top-0 z-40">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        {/* All Categories - Desktop */}
        <div
          className="hidden md:flex relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Button className="text-[#273498] dark:text-white text-lg hover:text-[#1F2F98] transition duration-300 flex items-center gap-1">
            All Categories
            <ExpandMoreIcon className="transition-transform duration-300 group-hover:-rotate-90" />
          </Button>

          {isCategoryOpen && (
            <div className="absolute top-full left-0 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-md mt-1 w-64 transition-opacity duration-300">
              {categories.map((category) => (
                <div key={category.title} className="group/subcategory relative">
                  <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    {category.title}
                    <ExpandMoreIcon
                      className="ml-1 transition-transform duration-300 group-hover/subcategory:-rotate-90"
                      fontSize="small"
                    />
                  </div>
                  <div className="absolute top-0 left-full w-64 hidden group-hover/subcategory:block bg-white dark:bg-gray-800 shadow-lg rounded-md ml-1">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        href={`/category/${sub}`}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {NavArr.map((item) => (
            <Link
              href={item.path}
              key={item.id}
              className="text-[#273498] dark:text-white text-lg hover:text-[#1F2F98] transition duration-300"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <IconButton onClick={toggleMobileMenu} className="text-[#273498]">
            <MenuIcon fontSize="large" />
          </IconButton>
        </div>

        {/* Mobile Drawer */}
        <Drawer anchor="left" open={mobileOpen} onClose={toggleMobileMenu}>
          <div className="w-64 p-4 bg-white dark:bg-gray-900 h-full">
            {/* Close Button */}
            <div className="flex justify-end">
              <IconButton onClick={toggleMobileMenu}>
                <CloseIcon />
              </IconButton>
            </div>

            {/* Mobile All Categories */}
            <Button
              className="text-[#273498] dark:text-white text-lg w-full flex justify-between"
              onClick={handleMenuClick}
              endIcon={<ExpandMoreIcon />}
            >
              All Categories
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                className: "bg-white dark:bg-gray-800 shadow-lg",
              }}
            >
              {categories.map((category) => (
                <div key={category.title}>
                  <Link href={`/category/${category.title}`} passHref>
                    <MenuItem onClick={() => handleSubmenuToggle(category.title)}>
                      {category.title.toUpperCase()}
                    </MenuItem>
                  </Link>
                  <Collapse in={submenuOpen === category.title} timeout="auto" unmountOnExit>
                    {category.subcategories.map((subcategory) => (
                      <Link key={subcategory} href={`/category/${subcategory}`} passHref>
                        <MenuItem className="pl-6" onClick={toggleMobileMenu}>
                          {subcategory}
                        </MenuItem>
                      </Link>
                    ))}
                  </Collapse>
                </div>
              ))}
            </Menu>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col mt-4">
              {NavArr.map((item) => (
                <Link
                  href={item.path}
                  key={item.id}
                  className="text-[#273498] dark:text-white text-lg py-2 hover:text-[#1F2F98] transition duration-300"
                  onClick={toggleMobileMenu}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </Drawer>
      </div>
    </nav>
  );
}
