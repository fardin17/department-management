"use client";

import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/app/components/ui/carousel";
import Image from "next/image";

import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { CarouselItems } from "@/assets/carouselItems";
import { cn } from "@/app/utils/helper/global-helper";

export default function AuthCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const pageNumbers = Array.from({ length: count }, (_, i) => (
    <button
      key={i}
      className={cn("h-2.5 w-2.5 cursor-pointer rounded-full bg-white text-sm", current === i + 1 ? "w-6" : "")}
      onClick={() => api?.scrollTo(i)}
    ></button>
  ));

  return (
    <Carousel
      setApi={setApi}
      className="mx-auto w-full"
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent className="w-full">
        {CarouselItems.map((item, idx) => (
          <CarouselItem key={idx} className="w-full">
            <div className="mx-auto h-[80%] w-[80%]">
              <Image alt={item.title} src={item.image} placeholder="blur" />
            </div>
            <div className="mx-auto w-[70%] space-y-1 text-balance pt-4 text-center">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm font-semibold text-white/80">{item.description}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-center gap-2 pt-8">{pageNumbers}</div>
    </Carousel>
  );
}
