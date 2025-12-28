"use client";
import { useRouter } from "next/navigation"; 
import { BestsellingNonfictionArr } from "@/utils/home";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import StarRateIcon from "@mui/icons-material/StarRate";

export default function Slider2() {
   const router = useRouter(); 
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 py-14">
      {/* Heading */}
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
          Bestselling Non-Fiction Books
        </h3>
        <div className="w-12 sm:w-16 h-1 bg-blue-500 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Swiper Carousel */}
      <div className="px-4 sm:px-6 relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={15}
          slidesPerView={1}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 }, // Small Phones
            480: { slidesPerView: 1, spaceBetween: 10 }, // Phones
            640: { slidesPerView: 2, spaceBetween: 15 }, // Tablets
            768: { slidesPerView: 3, spaceBetween: 15 }, // Small Desktops
            1024: { slidesPerView: 4, spaceBetween: 20 }, // Large Screens
          }}
          className="h-auto"
        >
          {BestsellingNonfictionArr.map((items) => (
            <SwiperSlide key={items.id}>
              <div className="flex flex-col items-center justify-between bg-white dark:bg-gray-800 shadow-md rounded-lg transition transform hover:scale-105 hover:shadow-xl h-auto lg:h-[450px] p-5">
                
                {/* Image */}
                <div className="w-full">
                  <img
                    src={items.image.src}
                    alt={items.title}
                    className="object-contain w-full h-48 sm:h-56 rounded-lg shadow-sm"
                  />
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mt-3 text-center">
                  {items.title}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center px-2 line-clamp-2">
                  {items.description}
                </p>

                {/* Author */}
                <p className="text-xs sm:text-sm font-medium underline text-gray-700 dark:text-gray-300 mt-1">
                  by {items.author}
                </p>

                {/* Star Ratings */}
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: Math.floor(items.ratings) }).map((_, i) => (
                    <StarRateIcon key={i} className="text-yellow-500" fontSize="small" />
                  ))}
                  {items.ratings % 1 !== 0 && (
                    <StarRateIcon className="text-yellow-500 opacity-50" fontSize="small" />
                  )}
                </div>

                {/* Button */}
                <button
                onClick={() => router.push(`/books/${items.id}`)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-400 mt-3">
                  Read More
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-700 transition">
          ❮
        </button>
        <button className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-700 transition">
          ❯
        </button>
      </div>
    </div>
  );
}
