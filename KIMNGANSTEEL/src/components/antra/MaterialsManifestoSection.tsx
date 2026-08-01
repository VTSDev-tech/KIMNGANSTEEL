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

      gsap.set(sheet, {
        transformOrigin: "50% 50%",
        force3D: true,
        rotation: 0,
        skewX: 0,
        skewY: 0,
        scaleX: 1,
        scaleY: 1,
      });

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
          {
            xPercent: 0,
            yPercent: 0,
            rotate: 0,
            skewX: 0,
            skewY: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            duration: 0.5,
          },
          0.1
        )
        .to(
          sheet,
          {
            xPercent: 0,
            yPercent: 0,
            rotate: 0,
            skewX: 0,
            skewY: 0,
            scaleX: 1,
            scaleY: 1,
            ease: "none",
            duration: 0.55,
          },
          0.5
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative w-full min-h-screen bg-[#ffffff] border-b border-[#064e3b]/10 text-[#064e3b] overflow-hidden select-none"
    >
      <div className="relative w-full h-screen min-h-[680px] flex flex-col justify-between p-8 md:p-12 lg:p-16">
        
        {/* Top Left Decorative Orange Plus */}
        <div className="absolute top-10 left-8 md:left-12 flex items-center justify-center pointer-events-none z-20">
          <div className="absolute w-[2px] h-6 bg-[#ea580c]"></div>
          <div className="absolute w-6 h-[2px] bg-[#ea580c]"></div>
        </div>

        {/* 1. GIANT OVERSIZED BACKGROUND TYPOGRAPHY (MATCHING IMAGE 2 EXACTLY) */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center pl-4 sm:pl-8 md:pl-16 pt-4 pointer-events-none select-none overflow-hidden font-serif">
          <div className="manifesto-word text-[12vw] sm:text-[10vw] leading-[0.8] font-light text-[#064e3b]/25 uppercase tracking-tight">
            MATERIALS
          </div>
          <div className="manifesto-word text-[12vw] sm:text-[10vw] leading-[0.8] font-light text-[#064e3b]/25 uppercase tracking-tight">
            FOR
          </div>
          <div className="manifesto-word text-[12vw] sm:text-[10vw] leading-[0.8] font-light text-[#064e3b]/25 uppercase tracking-tight">
            LASTING
          </div>
          <div className="manifesto-word text-[12vw] sm:text-[10vw] leading-[0.8] font-light text-[#064e3b]/25 uppercase tracking-tight pl-8 md:pl-[22vw]">
            STRUCTURES
          </div>
        </div>

        {/* 2. FLOATING TEXT CONTENT (LEFT OVERLAY MATCHING IMAGE 2) */}
        <div className="relative z-10 max-w-[1560px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
          
          {/* Left Column: Monospaced Text & Link Floating Over 'FOR / LASTING' */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center pt-16 lg:pt-12 pl-2">
            <p className="manifesto-copy text-sm md:text-base text-[#064e3b] font-medium leading-relaxed max-w-sm md:max-w-md mb-8 uppercase tracking-widest drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
              CHÚNG TÔI CUNG CẤP GIẢI PHÁP VẬT LIỆU THÉP CHẤT LƯỢNG CAO CHO MỌI CÔNG TRÌNH. BỀN VỮNG HÔM NAY, VỮNG CHẮC TƯƠNG LAI.
            </p>

            <a
              href="#san-pham"
              className="manifesto-link editorial-link group relative text-sm md:text-base font-bold uppercase tracking-[0.25em] text-[#064e3b] font-mono pb-1 border-b-2 border-[#064e3b]/30 hover:border-[#ea580c] transition-colors"
            >
              <span className="group-hover:text-[#ea580c] transition-colors">KHÁM PHÁ</span> 
              <span className="text-[#ea580c] ml-2">→</span>
            </a>
          </div>

          {/* Right Column: Floating Steel Sheet Asset Floating Over 'STRUCTURES' */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end relative w-full h-full pointer-events-auto pr-0 lg:pr-12">
            
            {/* Orange Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#ea580c]/[0.03] blur-3xl pointer-events-none"></div>
            <div className="absolute right-[10%] top-[20%] text-[#ea580c] font-mono text-[10px] tracking-widest opacity-60 pointer-events-none rotate-90 origin-right">
              // KN-STL
            </div>
            
            <div className="manifesto-sheet relative z-10 w-full max-w-[320px] sm:max-w-[480px] lg:max-w-[680px] aspect-[4/3] flex items-center justify-center">
              <img
                src="/tonbackground.svg"
                alt="Kim Ngan Steel Architectural Roofing Sheet"
                className="w-full h-full object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
              />
            </div>
          </div>

        </div>

        {/* 3. BOTTOM BAR (MATCHING IMAGE 2 EXACTLY) */}
        <div className="relative z-10 w-full flex items-center justify-between pt-4 border-t border-[#064e3b]/10 text-xs font-mono text-[#064e3b]">
          {/* Left side vertically rotated 'SCROLL' tag */}
          <div className="absolute left-0 bottom-16 origin-bottom-left -rotate-90 text-[10px] tracking-[0.3em] uppercase text-[#064e3b] pointer-events-none hidden sm:block">
            SCROLL
          </div>

          <div className="flex items-center gap-1.5 sm:gap-6 uppercase tracking-wider sm:tracking-widest text-[9px] sm:text-xs font-medium pl-0 sm:pl-8 whitespace-nowrap shrink-0">
            <span className="shrink-0">CHẤT LƯỢNG</span>
            <span className="text-[#064e3b]/20">|</span>
            <span className="shrink-0">UY TÍN</span>
            <span className="text-[#064e3b]/20">|</span>
            <span className="shrink-0">BỀN VỮNG</span>
          </div>

          <div className="flex items-center gap-2 pr-0 shrink-0 whitespace-nowrap">
            <span className="font-bold text-[#ea580c] text-xs sm:text-sm">01</span>
            <span className="text-[#064e3b]/50 text-xs">/ 05</span>
            <div className="w-6 sm:w-16 h-[1px] bg-[#ea580c]" />
          </div>
        </div>

      </div>
    </section>
  );
}
