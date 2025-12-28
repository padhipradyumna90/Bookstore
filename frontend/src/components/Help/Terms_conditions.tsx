"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TermsConditions() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Terms & Conditions
      </motion.h1>

      <div className="space-y-12 text-base leading-relaxed">
        {/* Section */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-semibold mb-2">Changing or Cancelling Orders</h2>
          <p>If you have an issue with your order, please contact Librix Customer Care as soon as possible.</p>
          <p className="mt-2">Changes or cancellations are only possible before your order is processed. Once processed, changes cannot be made.</p>
        </motion.div>

        <hr className="border-gray-300 dark:border-gray-700" />

        {/* Section */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-semibold mb-2">Returns Policy</h2>
          <p>This policy does not limit the rights you are entitled to under Indian Consumer Law.</p>
        </motion.div>

        <hr className="border-gray-300 dark:border-gray-700" />

        {/* Section */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-semibold mb-2">Returns for Defective Items</h2>
          <p>If you receive an incorrect, damaged, or faulty item, please contact Librix Customer Care immediately. You may be eligible for a refund or replacement.</p>
        </motion.div>

        <hr className="border-gray-300 dark:border-gray-700" />

        {/* Section */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-semibold mb-2">Returns for Change of Mind</h2>
          <p>Returns for change of mind are accepted only under specific conditions. You may receive store credit, excluding shipping costs.</p>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
            <li>Magazine Subscriptions</li>
            <li>Gift Certificates</li>
            <li>eBooks & Other Digital Content</li>
            <li>Print-on-Demand Titles</li>
          </ul>
        </motion.div>

        <hr className="border-gray-300 dark:border-gray-700" />

        {/* Section */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-semibold mb-2">Delivery Expectations</h2>

          <h3 className="text-lg font-semibold mt-3">In Stock at the Librix Warehouse</h3>
          <p className="mt-2">Items marked 'In Stock' typically ship within 2 business days. Delivery times may vary based on your location.</p>

          <h3 className="text-lg font-semibold mt-4">Items Not In Stock</h3>
          <p className="mt-2">Items not in stock will be sourced from suppliers, which may affect delivery time. You will be notified of any delays.</p>
        </motion.div>

        <hr className="border-gray-300 dark:border-gray-700" />

        {/* Section */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h3 className="text-lg font-semibold mt-3">Delivery Time Estimates</h3>
          <ol className="list-decimal list-inside mt-2 ml-4 space-y-1">
            <li>Processing: 1 business day</li>
            <li>Shipping: 2 business days</li>
            <li>Delivery: 4–7 business days (varies by location)</li>
          </ol>
        </motion.div>

        <hr className="border-gray-300 dark:border-gray-700" />

        {/* Section */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-semibold mb-2">Privacy Policy</h2>
          <p>Your personal information is kept confidential and is only used to process orders as per Librix’s privacy policy.</p>
        </motion.div>
      </div>
    </section>
  );
}
