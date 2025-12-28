"use client";

import { BannerSliderArr } from "@/utils/home";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";

export default function Banner() {
  const router = useRouter();
  return (
    <div className="w-full  px-4 md:px-6  mx-auto">
      <Swiper
        loop={true}
        modules={[Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {BannerSliderArr.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
            onClick={() =>  router.push(`/books/${banner.id}`)}
            >
              <img
                src={banner.image.src}
               
                className="object-contain rounded-lg"
                
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
