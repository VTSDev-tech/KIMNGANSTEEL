"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const PARTNER_LOGOS = [
  "/partners/hoa-sen-group.png",
  "/partners/ton-dong-a.png",
  "/partners/hoa-phat.png",
  "/partners/pomina.png",
  "/partners/thep-viet-nhat.png",
  "/partners/tien-loi-group.png",
  "/partners/ton-dong-a.png",
  "/partners/nam hung metal.png",
  "/partners/8.svg",
  "/partners/1.svg",
  "/partners/10.svg",
  "/partners/5.svg",
];

export function PartnersSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tween: gsap.core.Tween | null = null;
    let ctx: gsap.Context | null = null;

    const marquee = marqueeRef.current?.querySelector<HTMLDivElement>(".marquee-inner");
    if (!marquee) return;

    const startMarquee = () => {
      ctx = gsap.context(() => {
        const width = marquee.scrollWidth / 2;
        if (!width) return;

        gsap.set(marquee, { x: 0 });
        tween = gsap.to(marquee, {
          x: -width,
          ease: "none",
          duration: 100,
          repeat: -1,
          modifiers: {
            // Dùng modifier thay vì onRepeat để tránh giật hình khi loop
            x: gsap.utils.unitize((x) => parseFloat(x) % -width),
          },
        });
      }, marqueeRef);
    };

    // Đợi tất cả ảnh trong marquee load xong rồi mới tính scrollWidth
    const imgs = Array.from(marquee.querySelectorAll("img"));
    const loadPromises = imgs.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }
        })
    );

    Promise.all(loadPromises).then(startMarquee);

    // Fallback: nếu resize window (responsive) thì tính lại width
    const handleResize = () => {
      ctx?.revert();
      startMarquee();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx?.revert();
    };
  }, []);

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

      <div ref={marqueeRef} className="w-full flex whitespace-nowrap overflow-hidden relative pb-10 px-12 md:px-14">
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="marquee-inner flex items-center gap-16 sm:gap-24 w-max" style={{ willChange: "transform" }}>
          {duplicatedLogos.map((logoUrl, index) => (
            <div key={index} className="flex-none flex items-center justify-center h-20 sm:h-28">
              <img
                src={logoUrl}
                alt={`Partner Logo ${index + 1}`}
                className="h-full w-auto object-contain grayscale mix-blend-multiply opacity-60 hover:opacity-100 hover:scale-110 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}