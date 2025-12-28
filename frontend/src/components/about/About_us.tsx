"use client";

import { about_page_img } from "@/assets/about";
import React from "react";
import { motion } from "framer-motion"; // For animations

export default function AboutUs() {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16">
      {/* Hero Image */}
      <div className="w-full relative">
        <img
          src={about_page_img.src}
          className="w-full object-cover h-96 sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
          alt="About Us"
        />
        <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-10 space-y-8">
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Librix: Where Every Genre, Every Author, Every Book Finds a Home
        </motion.h2>

        <motion.div
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            In the Great Green Room, there was a telephone… and a little bunny
            who sparked a lifelong love for stories. Just like Margaret Wise
            Brown’s <i>Goodnight Moon</i>, we at <b>Librix</b> began with a
            simple tale – a tale of love for books.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Books have the power to transport us to unknown worlds, introduce us
            to unforgettable characters, and ignite our imagination like nothing
            else. Whether you're a lifelong reader or just beginning your
            journey, we believe that every book finds its reader, and every
            reader deserves a library that speaks to their soul.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            At Librix, we strive to bring you an unparalleled collection of
            books across all genres, from timeless classics to the latest
            bestsellers. Our mission is simple – to make books more accessible,
            enjoyable, and meaningful to everyone. Whether you're looking for a
            gripping mystery, a heartwarming romance, or a deep dive into
            history, you’ll find it all here.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            More than just a bookstore, Librix is a community. A place where
            book lovers connect, authors share their voices, and stories come to
            life. With curated recommendations, personalized collections, and
            engaging discussions, we invite you to embark on a journey of
            endless discovery.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to Librix, India’s fastest-growing online bookstore – a
            world woven with words, where every story counts, and every reader
            matters! We are a leading supplier in the literary market,
            dedicated to making reading accessible and affordable. We believe in
            the power of stories and understand the joy of diving into a
            bestseller. That’s why we offer an extensive catalog featuring
            everything from the latest releases to timeless classics.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            At Librix, we believe in creating a world where every book finds its
            home. We strive to make books more accessible, enjoyable, and
            meaningful to everyone. Whether you're a lifelong reader or just
            beginning your journey, we believe that every book finds its reader,
            and every reader deserves a library that speaks to their soul.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            When you shop with us, you don’t just buy a book—you become part of
            our ever-growing community, you become part of something truly
            transforming. Whether you’re looking for a riveting thriller, a
            heartwarming romance, or an enlightening non-fiction piece, classics
            or life-changing biographies; our collection has something for every
            reader. What’s more, we offer exciting combo deals that let you
            explore new genres and authors without breaking the bank.
          </motion.p>

          <motion.p
            className="font-semibold text-center text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Join us as we turn pages, open minds, and build a world where every
            book finds a home.
          </motion.p>
        </motion.div>

        {/* Call to book section */}
        <div className="text-center mt-12">
          <a
            href="/shop"
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
          >
            Explore Our Collection
          </a>
        </div>
      </div>
    </section>
  );
}
