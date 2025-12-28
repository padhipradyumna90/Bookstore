"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { DiscountSliderArr } from "@/utils/home";
import { useRouter } from "next/navigation";

export default function DiscountSlider() {
  const router = useRouter();


  return (
    <div className="w-full flex">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="h-[calc(100vh-130px)] md:h-[70vh] sm:h-[80vh]"
      >
        {DiscountSliderArr.map((book) => (
          <SwiperSlide key={book.id}>
            <div
              className="relative flex items-center justify-center h-full cursor-pointer"
              onClick={() =>  router.push(`/books/${book.id}`)}
            >
              {/* Background Image */}
              <img
                src={book.image.src}
                className="w-full object-contain"
  
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
