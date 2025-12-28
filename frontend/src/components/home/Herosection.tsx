"use client";

import Link from "next/link"; // Import Link from Next.js for navigation
import { PopularCategoryArr } from "@/utils/home";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Herosection() {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-10">
      {/* Heading */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Popular Categories in Books
        </h3>
        <div className="w-16 h-1 bg-blue-500 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Swiper Carousel */}
      <div className="px-6 relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={2}
          navigation={{
            prevEl: ".custom-prev-popular",
            nextEl: ".custom-next-popular",
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 6, spaceBetween: 30 },
          }}
          className="h-auto"
        >
          {PopularCategoryArr.map((popularCategory) => (
            <SwiperSlide key={popularCategory.id}>
              <Link
                href={`/category/${popularCategory.title}`} // Linking to the category page
                passHref
              >
                <div className="group flex flex-col items-center justify-center bg-white dark:bg-gray-800 shadow-md rounded-lg transition-transform hover:scale-105 hover:shadow-lg p-4 h-[140px] md:h-[320px]">
                  <img
                    src={popularCategory.image.src}
                    alt={popularCategory.title}
                    className="rounded-lg object-cover w-full h-32 md:h-40 shadow-sm"
                  />
                </div>
                <h1 className="mt-3 text-base text-center font-bold text-gray-800 dark:text-white group-hover:text-blue-500 transition">
                  {popularCategory.title}
                </h1>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button className="custom-prev-popular absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition">
          ❮
        </button>
        <button className="custom-next-popular absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition">
          ❯
        </button>
      </div>
    </section>
  );
}
