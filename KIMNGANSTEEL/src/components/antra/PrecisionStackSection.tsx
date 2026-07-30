"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const statements = [
  "Chính xác trong từng chi tiết",
  "Chất lượng trên từng tấm tôn",
  "Giữ vững kết cấu bền lâu",
];

export function PrecisionStackSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isTouchViewport =
      window.matchMedia("(max-width: 767px), (pointer: coarse)").matches ||
      "ontouchstart" in window;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".precision-statement span", section);

      if (reduceMotion) {
        gsap.set(lines, { opacity: 1, xPercent: 0 });
        return;
      }

      // Ẩn tất cả các dòng chữ ban đầu
      gsap.set(lines, { opacity: 0, xPercent: 0, yPercent: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: "power1.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isTouchViewport ? "+=260%" : "+=320%",
          scrub: isTouchViewport ? 1.35 : 1.2,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      // 1. Câu 1: "Chính xác trong từng chi tiết" (Trượt mượt từ bên phải vào ĐÚNG CHÍNH GIỮA, dừng lại thong thả, rồi trượt mờ sang trái)
      timeline
        .fromTo(lines[0], { opacity: 0, xPercent: 25 }, { opacity: 1, xPercent: 0, duration: 1.2 }, 0)
        .to(lines[0], { opacity: 1, xPercent: 0, duration: 2.2 }, 1.2)
        .to(lines[0], { opacity: 0, xPercent: -25, duration: 1.2 }, 3.4);

      // 2. Câu 2: "Chất lượng trên từng tấm tôn" (Trượt mượt từ bên trái vào ĐÚNG CHÍNH GIỮA, dừng lại thong thả, rồi trượt mờ sang phải)
      timeline
        .fromTo(lines[1], { opacity: 0, xPercent: -25 }, { opacity: 1, xPercent: 0, duration: 1.2 }, 4.6)
        .to(lines[1], { opacity: 1, xPercent: 0, duration: 2.2 }, 5.8)
        .to(lines[1], { opacity: 0, xPercent: 25, duration: 1.2 }, 8.0);

      // 3. Câu 3: "Giữ vững kết cấu bền lâu" (Trượt mượt từ bên phải vào ĐÚNG CHÍNH GIỮA, dừng lại sáng rõ cho đến khi phần dưới đẩy lên)
      timeline
        .fromTo(lines[2], { opacity: 0, xPercent: 25 }, { opacity: 1, xPercent: 0, duration: 1.2 }, 9.2)
        .to(lines[2], { opacity: 1, xPercent: 0, duration: 2.2 }, 10.4);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="precision-stack-section relative z-30 overflow-hidden bg-[#F7F7F4] text-[#1A1918] select-none"
      aria-label="Kim Ngan Steel precision capabilities"
    >
      <div className="precision-stage relative flex h-screen min-h-[640px] w-full items-center justify-center bg-[#F7F7F4]">
        <div className="precision-statements absolute inset-0 flex items-center justify-center pointer-events-none">
          {statements.map((statement) => (
            <div className="precision-statement absolute inset-0 flex items-center justify-center pointer-events-none" key={statement}>
              <span className="!max-w-full px-4 md:px-8 text-center uppercase tracking-wider font-bold whitespace-normal sm:whitespace-nowrap !text-[clamp(1.15rem,4.2vw,4.2rem)] text-[#1A1918]">
                {statement}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
