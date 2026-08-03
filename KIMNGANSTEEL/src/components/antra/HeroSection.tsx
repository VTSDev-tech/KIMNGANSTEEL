"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const playIntro = () => {
      if (!sectionRef.current) return;
      const elements = sectionRef.current.querySelectorAll(".kn-hero-anim");
      gsap.fromTo(
        elements,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power3.out" }
      );
    };

    const hasSeen = sessionStorage.getItem("kn_has_seen_intro");
    if (hasSeen) {
      // If intro was skipped, wait a tiny bit then play
      const timer = setTimeout(playIntro, 100);
      return () => clearTimeout(timer);
    } else {
      // Wait for intro complete event
      window.addEventListener("introComplete", playIntro);
      return () => window.removeEventListener("introComplete", playIntro);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#ffffff] flex items-center pt-20"
      aria-label="Kim Ngan Steel hero assembly"
    >
      {/* Background & Blueprint Layer */}
      {/* Background & Blueprint Layer */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden bg-[#fafafa]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 78, 59, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 78, 59, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      >
        {/* PURE BLUEPRINT SVG DRAWING LAYER (Fullscreen) */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full opacity-40 mix-blend-multiply" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            {/* Defs for arrow markers */}
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#064e3b" />
              </marker>
              <marker id="crosshair" markerWidth="10" markerHeight="10" refX="5" refY="5">
                <path d="M 5 0 L 5 10 M 0 5 L 10 5" stroke="#ea580c" strokeWidth="0.5" fill="none" />
              </marker>
            </defs>

            {/* Top Left Angle Detail */}
            <g>
              <path
                d="M 200 200 L 250 200 L 250 250"
                stroke="#064e3b"
                strokeWidth="1"
                fill="none"
                strokeDasharray="2 2"
                markerStart="url(#crosshair)"
                markerEnd="url(#crosshair)"
              />
              <text x="210" y="190" fill="#064e3b" fontSize="10" fontFamily="monospace" letterSpacing="1">ANGLE: 90°</text>
            </g>

            {/* Path 1: Base width dimension (bottom) */}
            <g>
              <path
                d="M 500 850 L 1400 850"
                stroke="#064e3b"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4 4"
                markerStart="url(#arrow)"
                markerEnd="url(#arrow)"
              />
              <text x="950" y="840" fill="#064e3b" fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="2">DIMENSION: 15,000m²</text>
            </g>

            {/* Path 2: Pillar height dimension (left) */}
            <g>
              <path
                d="M 950 750 L 950 350"
                stroke="#064e3b"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4 4"
                markerStart="url(#arrow)"
                markerEnd="url(#arrow)"
              />
              <text x="935" y="550" fill="#064e3b" fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="2" transform="rotate(-90 935 550)">ELEVATION: + 12.5M</text>
            </g>

            {/* Path 3: Roof span dimension (top angle) */}
            <g>
              <path
                d="M 600 250 L 1300 250"
                stroke="#ea580c"
                strokeWidth="1"
                fill="none"
                strokeDasharray="2 4"
                markerStart="url(#arrow)"
                markerEnd="url(#arrow)"
              />
              <text x="950" y="240" fill="#ea580c" fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="2">MATERIAL: AZ150 SPAN</text>
            </g>
            
            {/* Edge registration marks */}
            <path d="M 60 60 L 120 60 L 60 120" stroke="#ea580c" strokeWidth="1.5" fill="none" opacity="0.3" />
            <path d="M 1860 120 L 1860 60 L 1800 60" stroke="#ea580c" strokeWidth="1.5" fill="none" opacity="0.3" />
            <path d="M 60 960 L 60 1020 L 120 1020" stroke="#ea580c" strokeWidth="1.5" fill="none" opacity="0.3" />
            <path d="M 1860 960 L 1860 1020 L 1800 1020" stroke="#ea580c" strokeWidth="1.5" fill="none" opacity="0.3" />
            
            {/* Subtle Outer Frame */}
            <rect x="60" y="60" width="1800" height="960" stroke="#064e3b" strokeWidth="0.5" fill="none" strokeDasharray="10 5" opacity="0.3" />

            {/* Static minimal architectural elements (Crosshairs) */}
            <circle cx="200" cy="850" r="10" stroke="#064e3b" strokeWidth="0.5" fill="none" />
            <path d="M 195 850 L 205 850 M 200 845 L 200 855" stroke="#064e3b" strokeWidth="0.5" />
            
            <circle cx="1600" cy="200" r="10" stroke="#064e3b" strokeWidth="0.5" fill="none" />
            <path d="M 1595 200 L 1605 200 M 1600 195 L 1600 205" stroke="#064e3b" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Position the factory image on the right side, scaled down */}
        <div className="kn-hero-anim absolute top-1/2 right-0 md:-right-10 lg:-right-20 -translate-y-1/2 w-[120%] sm:w-[90%] md:w-[75%] lg:w-[65%] xl:w-[55%] flex items-center justify-center z-20 pointer-events-none opacity-0">
          <img
            src="/hero_sequence/nha_may.svg"
            alt="Nhà máy cán tôn Kim Ngân Steel"
            className="w-full h-auto object-contain mix-blend-darken"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-20 flex flex-col justify-center px-6 md:px-14 max-w-[1600px] w-full mx-auto pointer-events-none mt-12 md:mt-20">
        
        <div className="max-w-4xl space-y-6 md:space-y-8 pointer-events-auto relative z-10 p-6 md:p-0">
          {/* Label */}
          <div className="kn-hero-anim opacity-0 flex items-center gap-3 text-xs md:text-sm font-mono font-bold tracking-[0.3em] text-[#ea580c]">
            <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
            <span className="uppercase">KIM NGÂN STEEL</span>
          </div>
          
          {/* Main Heading */}
          <div className="kn-hero-anim opacity-0 space-y-1 font-sans">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-[4rem] xl:text-[4.2rem] font-extrabold text-[#064e3b] leading-[1.3] uppercase drop-shadow-sm">
              VẬT LIỆU VỮNG CHẮC<br />KIẾN TẠO CÔNG TRÌNH<br />BỀN VỮNG
            </h1>
          </div>

          {/* Subtitle */}
          <p className="kn-hero-anim opacity-0 text-[#064e3b]/80 text-sm md:text-lg font-medium max-w-xl">
            Nhà máy cán tôn trực tiếp. Giá cạnh tranh. Giao hàng nhanh 24h.
          </p>

          {/* Action Buttons */}
          <div className="kn-hero-anim opacity-0 flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/san-pham"
              className="inline-flex h-12 md:h-14 items-center justify-center rounded-full bg-[#064e3b] px-8 md:px-10 text-xs md:text-sm font-bold tracking-widest text-white transition-colors hover:bg-[#043326] shadow-md"
            >
              KHÁM PHÁ SẢN PHẨM
            </Link>
            <Link
              href="/lien-he"
              className="inline-flex h-12 md:h-14 items-center justify-center rounded-full border border-[#064e3b]/30 bg-white/50 backdrop-blur-sm px-8 md:px-10 text-xs md:text-sm font-bold tracking-widest text-[#064e3b] transition-colors hover:border-[#064e3b] hover:bg-white shadow-sm"
            >
              NHẬN BÁO GIÁ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
