"use client";

import { useRouter } from "next/navigation"; 
import { NewReleaseArr } from "@/utils/home";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

export default function Slider1() {
  const router = useRouter(); 
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 py-20">
      {/* Heading */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          New Releases
        </h3>
        <div className="w-16 h-1 bg-blue-500 mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="px-6 relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="h-auto"
        >
          {NewReleaseArr.map((items) => (
            <SwiperSlide key={items.id}>
              <div className="flex flex-col items-center justify-between bg-white dark:bg-gray-800 shadow-md rounded-lg transition transform hover:scale-105 hover:shadow-lg h-[400px] p-4">
                <img
                  src={items.image.src}
                  alt={items.title}
                  className="object-cover w-full h-56 rounded-lg shadow-sm"
                />
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-3 text-center">
                  {items.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center px-2">
                  {items.description}
                </p>

                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-400 mt-2"
                  onClick={() => router.push(`/books/${items.id}`)}
                >
                  Read More
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition">
          ❮
        </button>
        <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition">
          ❯
        </button>
      </div>
    </div>
  );
}
