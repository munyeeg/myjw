"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { inkfree } from "@/fonts";

export default function Header() {
  return (
    <div suppressHydrationWarning className={cn("relative overflow-hidden")}>
      {/* <div className="embla z-9" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="max-h-[550px] overflow-hidden">
                <Image src={slide} alt="header" width={1000} height={1000} />
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <div className="w-full overflow-hidden">
        <Image
          src="/background-4.jpg"
          alt="header"
          width={2542}
          height={1739}
          className={cn("object-cover object-top select-none h-full w-full")}
        />
      </div>
      {/* <div className="absolute bottom-[-2px] left-0 w-full z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="var(--primary)"
            fillOpacity="1"
            d="M0,288L34.3,256C68.6,224,137,160,206,117.3C274.3,75,343,53,411,74.7C480,96,549,160,617,160C685.7,160,754,96,823,112C891.4,128,960,224,1029,245.3C1097.1,267,1166,213,1234,192C1302.9,171,1371,181,1406,186.7L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </div> */}
      {/* Wedding of */}
      <div
        className={cn(
          "absolute p-2 bottom-[calc(12vw)] right-[calc(4vw)] md:bottom-24 md:right-8"
        )}
      >
        <div className="relative">
          <Image
            aria-hidden
            src="/brush.png"
            alt="Brush icon"
            className="w-[calc(57vw)] md:w-[400px] h-[calc(10vw)] md:h-[100px]"
            width={450}
            height={450}
          />
          <div
            className={cn(
              "absolute left-[58%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-white w-full text-center rotate-[-4deg] text-[calc(3vw)] md:text-[25px]",
              inkfree.className
            )}
          >
            THE WEDDING OF
          </div>
        </div>
      </div>
    </div>
  );
}
