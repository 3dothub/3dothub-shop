"use client";

import Image from "next/image";
import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import type { HeroSlide } from "@/lib/types/storefront";

export default function HeroSection({
  slides,
}: {
  slides?: HeroSlide[];
}) {
  const carouselRef = useRef<CarouselRef | null>(null);

  const displayedSlides = slides ?? [];

  if (displayedSlides.length === 0) {
    return null;
  }

  return (
    <section className="group relative overflow-hidden bg-(--surface)">
      {/* Navigation - Only visible on hover for a cleaner look */}
      <button
        onClick={() => carouselRef.current?.prev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
      >
        <LeftOutlined className="text-gray-800" />
      </button>

      <button
        onClick={() => carouselRef.current?.next()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
      >
        <RightOutlined className="text-gray-800" />
      </button>

      <Carousel ref={carouselRef} autoplay effect="fade" dots={{ className: "bottom-4" }}>
        {displayedSlides.map((slide, index) => (
          <div key={index}>
            <div className="flex min-h-[50vh] flex-col items-center justify-between bg-(--surface) text-(--app-fg) transition-colors duration-500 md:h-125 md:flex-row">

              {/* CONTENT SIDE */}
              <div className="w-full md:w-1/2 px-8 md:px-20 py-12 flex flex-col items-start text-left">
                <span className="uppercase tracking-[0.2em] text-sm font-bold opacity-70 mb-2">
                  {slide.subtitle}
                </span>
                <h1 className="text-4xl md:text-6xl font-light leading-tight mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg opacity-80 max-w-sm mb-8">
                  {slide.description}
                </p>
                <button className="rounded-md bg-(--accent) px-8 py-3 font-medium text-white transition-transform hover:scale-105 active:scale-95">
                  Shop Collection
                </button>
              </div>

              {/* IMAGE SIDE */}
              <div className="w-full md:w-1/2 h-full relative flex items-center justify-center p-8">
                <div className="relative w-full h-75 md:h-100 transition-transform duration-700 hover:scale-105">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>

            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}