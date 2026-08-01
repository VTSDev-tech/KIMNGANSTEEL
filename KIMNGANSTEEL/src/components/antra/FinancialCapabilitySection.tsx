"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FinancialCapabilitySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fin-animate-up",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-28 px-6 md:px-14 bg-[#ffffff] text-[#064e3b] border-b border-[#064e3b]/10 select-none">
      <div className="max-w-[1560px] mx-auto space-y-16">
        
        {/* 1. TOP HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div className="space-y-4 max-w-3xl fin-animate-up">
            <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-[0.25em] text-[#ea580c] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
              <span>03 / NĂNG LỰC TÀI CHÍNH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-sans font-bold uppercase tracking-tight text-[#064e3b] leading-[1.12]">
              TĂNG TRƯỞNG VỮNG CHẮC,<br />
              NỀN TẢNG CHO HỢP TÁC DÀI HẠN
            </h2>
            <p className="text-xs sm:text-sm text-[#064e3b] font-sans leading-relaxed max-w-xl">
              Năng lực tài chính ổn định giúp Kim Ngân Steel chủ động nguồn hàng, nâng cao năng lực sản xuất và đáp ứng các đơn hàng quy mô lớn.
            </p>
          </div>

          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-[#064e3b]/10 shadow-sm text-xs font-mono text-[#064e3b] tracking-wider uppercase self-start lg:self-auto fin-animate-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]" />
            <span>BÁO CÁO CÔNG KHAI: 2022 — 2024</span>
          </div>
        </div>

        {/* 2. MIDDLE 3 KEY STAT HIGHLIGHTS (Divided by thin vertical hair lines) */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#064e3b]/10 border-t border-[#064e3b]/10 pt-10 fin-animate-up">
          
          {/* Highlight 1: Doanh Thu */}
          <div className="py-6 md:py-0 md:pr-10 space-y-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-5xl sm:text-6xl font-mono font-bold text-[#ea580c] tracking-tight">
                720,2
              </span>
              <span className="text-xl font-mono font-bold text-[#ea580c] uppercase">
                TỶ
              </span>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-sans text-[#064e3b] font-medium leading-snug">
                Doanh thu bán hàng và cung cấp dịch vụ
              </p>
              <p className="text-xs font-sans text-[#064e3b] font-bold">
                năm 2024
              </p>
            </div>
          </div>

          {/* Highlight 2: Lợi Nhuận Trước Thuế */}
          <div className="py-6 md:py-0 md:px-10 space-y-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-5xl sm:text-6xl font-mono font-bold text-[#ea580c] tracking-tight">
                3,81
              </span>
              <span className="text-xl font-mono font-bold text-[#ea580c] uppercase">
                TỶ
              </span>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-sans text-[#064e3b] font-medium leading-snug">
                Lợi nhuận trước thuế
              </p>
              <p className="text-xs font-sans text-[#064e3b] font-bold">
                năm 2024
              </p>
            </div>
          </div>

          {/* Highlight 3: Lợi Nhuận Sau Thuế */}
          <div className="py-6 md:py-0 md:pl-10 space-y-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-5xl sm:text-6xl font-mono font-bold text-[#ea580c] tracking-tight">
                3,05
              </span>
              <span className="text-xl font-mono font-bold text-[#ea580c] uppercase">
                TỶ
              </span>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-sans text-[#064e3b] font-medium leading-snug">
                Lợi nhuận sau thuế
              </p>
              <p className="text-xs font-sans text-[#064e3b] font-bold">
                năm 2024
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
