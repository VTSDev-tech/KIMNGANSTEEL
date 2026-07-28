"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const PARTNER_LOGOS = [
  "/partners/1.svg",
  "/partners/2.svg",
  "/partners/3.svg",
  "/partners/4.svg",
  "/partners/5.svg",
  "/partners/6.svg",
  "/partners/7.svg",
  "/partners/8.svg",
  "/partners/9.svg",
  "/partners/10.svg",
  "/partners/11.svg",
];

export function PartnersSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create infinite horizontal scroll
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  // Double the array for seamless infinite looping
  const duplicatedLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section className="py-24 bg-white text-[#1A1918] overflow-hidden border-b border-[#1A1918]/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-14 mb-16 text-center">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase block mb-3">
          STRATEGIC PARTNERS
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#1A1918]">
          CÁC ĐỐI TÁC TIÊU BIỂU
        </h2>
      </div>

      <div ref={marqueeRef} className="w-full flex whitespace-nowrap overflow-hidden relative pb-10">
        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="marquee-inner flex items-center gap-16 sm:gap-24 w-max px-12">
          {duplicatedLogos.map((logoUrl, index) => (
            <div key={index} className="flex-none flex items-center justify-center h-20 sm:h-28">
              <img 
                src={logoUrl} 
                alt={`Partner Logo ${index + 1}`} 
                className="h-full w-auto object-contain grayscale mix-blend-multiply opacity-60 hover:opacity-100 hover:scale-110 hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


