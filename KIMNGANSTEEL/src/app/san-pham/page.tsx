"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/antra/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    index: "01",
    name: "Tôn Lạnh",
    nameEn: "Cold Rolled Steel",
    category: "Tôn Lợp",
    image: "/roof_material.png",
    specs: ["0.28 – 0.65 mm", "Mạ nhôm kẽm AZ"],
    desc: "Tôn chống nóng cao cấp, độ bám kẽm vượt trội.",
  },
  {
    index: "02",
    name: "Tôn Màu",
    nameEn: "Color Coated Sheet",
    category: "Tôn Lợp",
    image: "/roof_material.png",
    specs: ["40+ màu sắc", "Sóng vuông / ngói"],
    desc: "Đa dạng màu sắc, bề mặt sơn phủ bền màu 10 năm.",
  },
  {
    index: "03",
    name: "Tôn Cán Sóng",
    nameEn: "Corrugated Sheet",
    category: "Tôn Lợp",
    image: "/roof_material.png",
    specs: ["5 / 9 / 11 sóng", "Cán theo yêu cầu"],
    desc: "Phục vụ lợp mái nhà xưởng khẩu độ lớn.",
  },
  {
    index: "04",
    name: "Thép Cuộn Mạ Kẽm",
    nameEn: "Galvanized Coil",
    category: "Thép Xây Dựng",
    image: "/coil_material.png",
    specs: ["≥ 60 g/m²", "ASTM A653"],
    desc: "Nguyên liệu phôi thép cuộn chất lượng cao.",
  },
  {
    index: "05",
    name: "Thép Hộp Mạ Kẽm",
    nameEn: "Square Hollow Section",
    category: "Thép Xây Dựng",
    image: "/coil_material.png",
    specs: ["Vuông & Chữ nhật", "0.7 – 3.0 mm"],
    desc: "Khung kèo xây dựng, chống rỉ sét bền lâu.",
  },
  {
    index: "06",
    name: "Thép Ống & Thép Hình",
    nameEn: "Pipe & Structural Steel",
    category: "Thép Xây Dựng",
    image: "/pipe_material.png",
    specs: ["I, U, V, H, Đúc", "Ø21 – Ø219"],
    desc: "Thép hình phục vụ công nghiệp nặng và cơ khí.",
  },
  {
    index: "07",
    name: "Thép Tấm Đen",
    nameEn: "Black Steel Plate",
    category: "Thép Xây Dựng",
    image: "/pipe_material.png",
    specs: ["4 – 25 mm", "Chịu lực cao"],
    desc: "Kết cấu chịu tải trọng lớn, cơ khí công nghiệp.",
  },
  {
    index: "08",
    name: "Xà Gồ C / Z",
    nameEn: "Purlin C / Z",
    category: "Thép Xây Dựng",
    image: "/purlin_material.png",
    specs: ["C100 – C300", "Đục lỗ theo yêu cầu"],
    desc: "Mái nhà xưởng và nhà thép tiền chế.",
  },
];

export default function ProductsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-kicker", { y: 20, opacity: 0, duration: 0.8 })
        .from(".hero-title", { y: 40, opacity: 0, duration: 1 }, "-=0.5")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

      gsap.from(".prod-line", {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power2.out",
        scrollTrigger: { trigger: ".prod-list", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const handleEnter = (i: number) => {
    // Cancel any pending leave
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveIdx(i);
    if (imgRef.current) {
      gsap.killTweensOf(imgRef.current);
      gsap.fromTo(imgRef.current, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" });
    }
  };

  const handleLeave = () => {
    if (imgRef.current) {
      gsap.killTweensOf(imgRef.current);
      gsap.to(imgRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" });
    }
    // Delay nulling so transition between lines doesn't flicker
    leaveTimer.current = setTimeout(() => setActiveIdx(null), 250);
  };

  return (
    <div ref={rootRef} className="min-h-screen bg-[#080808] pt-24 font-sans selection:bg-[#B8AFA3] selection:text-[#080808]">

      {/* ─── Hero ─── */}
      <section className="relative bg-[#080808] py-24 md:py-36 border-b border-[#111]">
        {/* background text */}
        <span className="absolute right-0 bottom-0 text-[12rem] md:text-[22rem] font-black text-[#0f0f0f] leading-none select-none pointer-events-none tracking-[-0.05em] translate-y-4">KN</span>

        <div className="container mx-auto px-6 md:px-12 max-w-[1280px] relative z-10">
          <p className="hero-kicker text-[10px] font-bold tracking-[0.3em] uppercase text-[#9C8A73] mb-8">Kim Ngân Steel — Danh Mục</p>
          <h1 className="hero-title font-light uppercase leading-[0.95] tracking-[-0.02em] text-white mb-8"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}>
            Sản<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px #555" }}>Phẩm</span>
          </h1>
          <div className="flex items-center gap-6">
            <div className="w-12 h-px bg-[#9C8A73]" />
            <p className="hero-sub text-[#888] text-sm font-light tracking-wide">
              {PRODUCTS.length} sản phẩm · Quy cách chuẩn quốc tế · Sẵn hàng kho lớn
            </p>
          </div>
        </div>
      </section>

      {/* ─── Interactive Product List ─── */}
      <section className="relative prod-list">
        {/* Floating image preview */}
        <div
          ref={imgRef}
          className="fixed right-[6vw] top-1/2 -translate-y-1/2 w-[28vw] max-w-[360px] aspect-square pointer-events-none z-50 opacity-0 hidden xl:block"
        >
          {activeIdx !== null && (
            <div className="w-full h-full bg-[#111] border border-[#222] relative overflow-hidden">
              <Image
                src={PRODUCTS[activeIdx].image}
                alt={PRODUCTS[activeIdx].name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#9C8A73] mb-1">{PRODUCTS[activeIdx].category}</p>
                <p className="text-white text-lg font-light uppercase">{PRODUCTS[activeIdx].name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Lines */}
        <div className="xl:mr-[34vw]">
          {PRODUCTS.map((p, i) => {
            const isActive = activeIdx === i;
            const isFaded = activeIdx !== null && !isActive;
            return (
              <div
                key={p.index}
                className={`prod-line group border-b border-[#1c1c1c] cursor-default transition-colors duration-300 ${isActive ? "bg-[#111]" : "hover:bg-[#0d0d0d]"}`}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={handleLeave}
              >
                <div className={`container mx-auto px-6 md:px-12 max-w-[1280px] py-7 md:py-9 grid grid-cols-[2rem_1fr_auto] md:grid-cols-[2.5rem_1fr_auto_auto] items-center gap-4 md:gap-8 transition-opacity duration-300 ${isFaded ? "opacity-25" : "opacity-100"}`}>

                  {/* Index */}
                  <span className={`text-[11px] font-black tracking-widest transition-colors duration-300 ${isActive ? "text-[#9C8A73]" : "text-[#555]"}`}>
                    {p.index}
                  </span>

                  {/* Name */}
                  <div>
                    <h2
                      className={`font-light uppercase leading-tight transition-all duration-300 ${isActive ? "text-white" : "text-[#aaa]"}`}
                      style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)", letterSpacing: "-0.01em" }}
                    >
                      {p.name}
                    </h2>
                    <p className={`text-[10px] tracking-[0.2em] uppercase mt-1 transition-colors duration-300 ${isActive ? "text-[#777]" : "text-[#444]"}`}>
                      {p.nameEn}
                    </p>
                  </div>

                  {/* Specs — hidden on mobile */}
                  <div className={`hidden md:flex flex-col gap-1 text-right transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}>
                    {p.specs.map((s, si) => (
                      <span key={si} className="text-[11px] text-[#9C8A73] font-bold tracking-wide">{s}</span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className={`flex items-center justify-center w-10 h-10 border transition-all duration-300 ${isActive ? "border-[#9C8A73] text-[#9C8A73]" : "border-[#2a2a2a] text-[#333]"}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Expanded desc on active */}
                <div className={`overflow-hidden transition-all duration-300 ${isActive ? "max-h-20" : "max-h-0"}`}>
                  <p className="container mx-auto px-6 md:px-12 max-w-[1280px] pb-5 pl-[4.5rem] text-[13px] text-[#555] font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA Strip ─── */}
      <section className="bg-[#F2F0EC] py-20">
        <div className="container mx-auto px-6 md:px-12 max-w-[1280px] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#9C8A73] mb-3">Chính sách thương mại</p>
            <h3 className="text-2xl md:text-4xl font-light text-[#151413] uppercase leading-tight">
              Chiết khấu đến <span className="text-[#C99A5C]">5%</span><br />
              <span className="text-[#9C8A73] text-xl md:text-3xl">cho đại lý & nhà thầu</span>
            </h3>
          </div>
          <div className="flex flex-col gap-3 text-right">
            <p className="text-[#666] text-sm font-light">Giao hàng miễn phí nội tỉnh</p>
            <p className="text-[#666] text-sm font-light">Đổi trả 7 ngày nếu lỗi nhà sản xuất</p>
            <Link href="/lien-he" className="mt-2 inline-block bg-[#151413] text-white text-[11px] font-black uppercase tracking-[0.25em] px-8 py-3.5 hover:bg-[#C99A5C] transition-colors duration-300">
              Nhận Báo Giá →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
