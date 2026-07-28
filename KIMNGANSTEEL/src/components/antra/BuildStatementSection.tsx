"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  "CHẤT LƯỢNG",
  "CHUYÊN NGHIỆP",
  "NỖ LỰC",
  "SÁNG TẠO",
  "UY TÍN",
  "BỀN VỮNG",
];

export function BuildStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(".build-word, .build-line span", { clearProps: "all" });
      gsap.set(".build-word-left, .build-word-right", { opacity: 1, xPercent: 0, yPercent: 0 });
      gsap.set(".build-lines", { opacity: 0, yPercent: 0 });
      gsap.set(".build-line span", { yPercent: 20, opacity: 0 });

      if (reduceMotion) {
        gsap.set(".build-word, .build-lines, .build-line span", { yPercent: 0, opacity: 1 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 761px)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        timeline
          // 1. "Giá Trị" & "Cốt Lõi" xuất hiện rõ ràng ngay khi cuộn vào, rồi tách sang 2 bên
          .fromTo(".build-word-left, .build-word-right", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0)
          .to(".build-word-left", { opacity: 1, duration: 0.6 }, 0.6)
          .to(".build-word-right", { opacity: 1, duration: 0.6 }, 0.6)
          .to(".build-word-left", { xPercent: -105, opacity: 0.08, duration: 0.8 }, 1.2)
          .to(".build-word-right", { xPercent: 95, opacity: 0.08, duration: 0.8 }, 1.2)
          
          // 2. Hiện mảng các Từ Giá Trị Cốt Lõi ở giữa và DỪNG LẠI THẬT LÂU CHO NGƯỜI ĐỌC
          .to(".build-lines", { opacity: 1, duration: 0.3 }, 2.0)
          .fromTo(
            ".build-line span",
            { opacity: 0, yPercent: 24 },
            { opacity: 1, yPercent: 0, stagger: 0.12, duration: 0.8 },
            2.1
          )
          .to(".build-lines", { yPercent: 0, opacity: 1, duration: 3.5 }, 3.5) // Dừng lại hiển thị 100% rõ nét thật lâu
          .to(".build-lines", { yPercent: -8, opacity: 0, duration: 0.8 }, 7.0)
          .to(".build-word-left", { xPercent: -125, opacity: 0, duration: 0.8 }, 7.0)
          .to(".build-word-right", { xPercent: 115, opacity: 0, duration: 0.8 }, 7.0);
      });

      mm.add("(max-width: 760px)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(".build-word-left, .build-word-right", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0)
          .to(".build-word-left, .build-word-right", { opacity: 1, duration: 0.6 }, 0.6)
          .to(".build-word-left", { yPercent: -180, xPercent: 0, opacity: 0.04, duration: 0.8 }, 1.2)
          .to(".build-word-right", { yPercent: 180, xPercent: 0, opacity: 0.04, duration: 0.8 }, 1.2)
          .to(".build-lines", { opacity: 1, duration: 0.3 }, 2.0)
          .fromTo(
            ".build-line span",
            { opacity: 0, yPercent: 20 },
            { opacity: 1, yPercent: 0, stagger: 0.12, duration: 0.8 },
            2.1
          )
          .to(".build-lines", { opacity: 1, duration: 3.5 }, 3.5)
          .to(".build-lines, .build-word", { opacity: 0, duration: 0.8 }, 7.0);
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="build-statement-section relative z-20 w-full h-[280vh] md:h-[420vh] bg-[#F7F7F4] text-[#1A1918] select-none" aria-label="Giá trị cốt lõi của Kim Ngân Steel">
      <div className="build-stage sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#F7F7F4]">
        
        <p className="build-kicker absolute top-12 left-8 md:left-16 text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase z-30">
          GIÁ TRỊ CỐT LÕI
        </p>

        {/* Chữ Giá Trị - Cốt Lõi khổng lồ */}
        <div className="build-words relative flex items-center justify-center gap-4 sm:gap-8 text-center z-10 pointer-events-none" aria-hidden="true">
          <span className="build-word build-word-left text-4xl sm:text-7xl lg:text-[7.5rem] font-bold uppercase tracking-tight text-[#1A1918] whitespace-nowrap">
            GIÁ TRỊ
          </span>
          <span className="build-word build-word-right text-4xl sm:text-7xl lg:text-[7.5rem] font-bold uppercase tracking-tight text-[#1A1918] whitespace-nowrap">
            CỐT LÕI
          </span>
        </div>

        {/* Mảng các danh mục Giá Trị Cốt Lõi */}
        <div className="build-lines absolute inset-0 flex flex-col items-center justify-center gap-1.5 sm:gap-3 z-20 pointer-events-none" aria-label="Các giá trị cốt lõi">
          {categories.map((item) => (
            <div className="build-line h-[clamp(2.2rem,4vw,4.5rem)] overflow-visible flex items-center justify-center py-1" key={item}>
              <span className="text-[clamp(1.4rem,2.8vw,3.2rem)] font-bold text-[#1A1918] uppercase leading-[1.25] px-3">
                {item}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
