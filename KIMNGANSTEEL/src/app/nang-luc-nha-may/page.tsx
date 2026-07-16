"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SiteFooter } from "@/components/antra/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  { num: "500+", unit: "Tấn/Tháng", title: "Công Suất", desc: "Hơn 500 tấn/tháng, đáp ứng tiến độ mọi dự án." },
  { num: "05", unit: "Dây Chuyền", title: "Tự Động Hóa", desc: "Tự động hóa, cán sóng và xả băng chính xác." },
  { num: "10K", unit: "Tấn Phôi", title: "Kho Bãi", desc: "Sức chứa hàng ngàn tấn phôi, luôn sẵn sàng." },
  { num: "±1", unit: "Milimet", title: "Kiểm Định", desc: "Đo lường độ dày, độ bám kẽ m khắt khe." },
];

const GALLERY = [
  "/nha_xuong.png",
  "/kho_logistics.png",
  "/ton_can_song.svg",
  "/thep_cuon_ma_kem.svg"
];

export default function FactoryPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".antra-hero-kicker", { y: 20, opacity: 0, duration: 0.8 })
        .from(".antra-h1", { y: 40, opacity: 0, duration: 1 }, "-=0.5")
        .from(".antra-hero-text", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

      gsap.utils.toArray<HTMLElement>(".antra-section").forEach((section) => {
        gsap.from(section, {
          y: 80, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".antra-stagger-grid").forEach((grid) => {
        const items = grid.querySelectorAll(".antra-stagger-item");
        gsap.fromTo(items,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: grid, start: "top 90%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="antra-theme min-h-screen bg-[#080808] selection:bg-[#B8AFA3] selection:text-[#080808] pt-24 font-sans">
      
      {/* 1. Hero Section (Dark Image Background) */}
      <section className="relative py-20 md:py-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image src="/nha_xuong.png" alt="Nhà xưởng" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-[#080808]" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
          <p className="antra-hero-kicker text-[10px] font-bold tracking-[0.2em] uppercase text-[#9C8A73] mb-6">Nhà Máy</p>
          <h1 className="antra-h1 text-3xl md:text-5xl lg:text-7xl mb-6 uppercase font-light leading-[1.2] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E4DB] to-[#A39A86]">
            <span className="block">Năng Lực</span>
            <span className="block italic text-[#C99A5C]">Sản Xuất</span>
          </h1>
          <p className="antra-hero-text text-[#888] text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Hệ thống nhà máy hiện đại, quy trình khép kín, tối ưu hóa từ nguyên liệu đầu vào đến thành phẩm.
          </p>
        </div>
      </section>

      {/* 2. Tổng quan năng lực (Light) */}
      <section className="antra-section py-20 bg-[#F2F0EC] text-[#151413]">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl antra-stagger-grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#d8d4ce]">
            {CAPABILITIES.map((cap, i) => (
              <div key={i} className="antra-stagger-item bg-[#F2F0EC] p-8 md:p-10 flex flex-col group hover:bg-white transition-colors duration-300">
                <div className="mb-6">
                  <span className="text-[3.5rem] font-black leading-none text-[#151413] tracking-tighter tabular-nums">{cap.num}</span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C8A73] mt-1">{cap.unit}</span>
                </div>
                <div className="w-8 h-px bg-[#9C8A73] mb-4" />
                <h3 className="text-[13px] font-bold uppercase tracking-wide mb-2 text-[#151413]">{cap.title}</h3>
                <p className="text-[#666] text-[13px] font-light leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Quy trình sản xuất (Dark) */}
      <section className="antra-section py-24 bg-[#080808]">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-20">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9C8A73] mb-6">Quy trình gia công</p>
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-light leading-[1.2] uppercase tracking-tight text-white">
              Từ cuộn mạ nguyên bản<br/>đến mái tôn hoàn thiện
            </h2>
          </div>

          <div className="space-y-6 antra-stagger-grid">
            {[
              { step: "01", title: "Nhập & Kiểm tra phôi", desc: "Cuộn mạ được cân, đo độ dày, dán tem mã vạch." },
              { step: "02", title: "Xả băng / Cán sóng", desc: "Máy tự động kéo cuộn mạ đi qua hệ thống lô cán tạo hình." },
              { step: "03", title: "Cắt CNC chính xác", desc: "Cắt tôn theo đúng chiều dài bản vẽ, sai số dưới 1mm." },
              { step: "04", title: "KCS & Đóng gói", desc: "Kiểm tra bề mặt không trầy xước, dán nilon bảo vệ." }
            ].map((item, i) => (
              <div key={i} className="antra-stagger-item flex flex-col md:flex-row gap-8 items-start md:items-center bg-[#111] p-8 md:px-12 border border-white/5 hover:border-[#9C8A73]/30 transition-colors">
                <div className="text-5xl lg:text-7xl font-light text-[#1a1a1a] shrink-0" style={{ WebkitTextStroke: "1px #9C8A73" }}>{item.step}</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{item.title}</h3>
                  <p className="text-[#666] text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Thư viện hình ảnh (Light) */}
      <section className="antra-section py-24 bg-[#F2F0EC] text-[#151413]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-light leading-[1.2] uppercase tracking-tight">Thư Viện Hình Ảnh</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 antra-stagger-grid">
            {GALLERY.map((img, i) => (
              <div key={i} className="antra-stagger-item relative h-64 md:h-[400px] w-full bg-white p-3 shadow-sm group">
                <div className="relative w-full h-full overflow-hidden">
                  <Image src={img} alt="Gallery" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
