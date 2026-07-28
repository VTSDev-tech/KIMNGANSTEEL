"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function MaterialsManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const bgTextWords = gsap.utils.toArray<HTMLElement>(".manifesto-word", section);
      const sheet = section.querySelector<HTMLElement>(".manifesto-sheet");
      const copy = section.querySelector<HTMLElement>(".manifesto-copy");
      const link = section.querySelector<HTMLElement>(".manifesto-link");

      if (reduceMotion) {
        gsap.set([bgTextWords, sheet, copy, link], { clearProps: "all", opacity: 1 });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          bgTextWords,
          { yPercent: 20, opacity: 0 },
          { yPercent: 0, opacity: 0.35, stagger: 0.08, duration: 0.5 },
          0
        )
        .fromTo(
          copy,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          0.15
        )
        .fromTo(
          link,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.35 },
          0.25
        )
        .fromTo(
          sheet,
          { xPercent: 30, yPercent: 10, rotate: -6, opacity: 0 },
          { xPercent: 0, yPercent: 0, rotate: 0, opacity: 1, duration: 0.5 },
          0.1
        )
        .to(sheet, { rotate: 8, yPercent: -5, ease: "none" }, 0.5);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative w-full min-h-screen bg-[#ECE8DE] border-b border-[#1A1918]/10 text-[#1A1918] overflow-hidden select-none"
    >
      <div className="relative w-full h-screen min-h-[680px] flex flex-col justify-between p-8 md:p-12 lg:p-16">
        
        {/* Top Left Hairline Marker */}
        <div className="absolute top-8 left-8 md:left-12 w-8 h-[1px] bg-[#1A1918]/40" />

        {/* 1. GIANT OVERSIZED BACKGROUND TYPOGRAPHY (MATCHING IMAGE 2 EXACTLY) */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center pl-4 sm:pl-8 md:pl-16 pt-4 pointer-events-none select-none overflow-hidden font-serif">
          <div className="manifesto-word text-[15vw] sm:text-[13vw] leading-[0.8] font-light text-[#8E877D]/30 uppercase tracking-tight">
            MATERIALS
          </div>
          <div className="manifesto-word text-[15vw] sm:text-[13vw] leading-[0.8] font-light text-[#8E877D]/30 uppercase tracking-tight">
            FOR
          </div>
          <div className="manifesto-word text-[15vw] sm:text-[13vw] leading-[0.8] font-light text-[#8E877D]/30 uppercase tracking-tight">
            LASTING
          </div>
          <div className="manifesto-word text-[15vw] sm:text-[13vw] leading-[0.8] font-light text-[#8E877D]/30 uppercase tracking-tight pl-8 md:pl-[22vw]">
            STRUCTURES
          </div>
        </div>

        {/* 2. FLOATING TEXT CONTENT (LEFT OVERLAY MATCHING IMAGE 2) */}
        <div className="relative z-10 max-w-[1560px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
          
          {/* Left Column: Monospaced Text & Link Floating Over 'FOR / LASTING' */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center pt-16 lg:pt-12 pl-2">
            <p className="manifesto-copy text-xs md:text-[13px] text-[#4A4540] font-mono leading-relaxed max-w-sm mb-6 uppercase tracking-wider">
              CHÚNG TÔI CUNG CẤP GIẢI PHÁP VẬT LIỆU THÉP CHẤT LƯỢNG CAO CHO MỌI CÔNG TRÌNH. BỀN VỮNG HÔM NAY, VỮNG CHẮC TƯƠNG LAI.
            </p>

            <a
              href="#san-pham"
              className="manifesto-link editorial-link text-xs uppercase tracking-[0.25em] text-[#1A1918] font-mono pb-1 border-b border-[#1A1918]"
            >
              KHÁM PHÁ →
            </a>
          </div>

          {/* Right Column: Floating Steel Sheet Asset Floating Over 'STRUCTURES' */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end relative w-full h-full pointer-events-auto pr-0 lg:pr-12">
            <div className="manifesto-sheet relative w-full max-w-[320px] sm:max-w-[480px] lg:max-w-[680px] aspect-[4/3] flex items-center justify-center">
              <img
                src="/tonbackground.svg"
                alt="Kim Ngan Steel Architectural Roofing Sheet"
                className="w-full h-full object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
              />
            </div>
          </div>

        </div>

        {/* 3. BOTTOM BAR (MATCHING IMAGE 2 EXACTLY) */}
        <div className="relative z-10 w-full flex items-center justify-between pt-4 border-t border-[#1A1918]/10 text-xs font-mono text-[#4A4540]">
          {/* Left side vertically rotated 'SCROLL' tag */}
          <div className="absolute left-0 bottom-16 origin-bottom-left -rotate-90 text-[10px] tracking-[0.3em] uppercase text-[#6B655F] pointer-events-none hidden sm:block">
            SCROLL
          </div>

          <div className="flex items-center gap-1.5 sm:gap-6 uppercase tracking-wider sm:tracking-widest text-[9px] sm:text-xs font-medium pl-0 sm:pl-8 whitespace-nowrap shrink-0">
            <span className="shrink-0">CHẤT LƯỢNG</span>
            <span className="text-[#1A1918]/20">|</span>
            <span className="shrink-0">UY TÍN</span>
            <span className="text-[#1A1918]/20">|</span>
            <span className="shrink-0">BỀN VỮNG</span>
          </div>

          <div className="flex items-center gap-2 pr-0 shrink-0 whitespace-nowrap">
            <span className="font-bold text-[#1A1918] text-xs sm:text-sm">01</span>
            <span className="text-[#6B655F] text-xs">/ 05</span>
            <div className="w-6 sm:w-16 h-[1px] bg-[#1A1918]" />
          </div>
        </div>

      </div>
    </section>
  );
}
