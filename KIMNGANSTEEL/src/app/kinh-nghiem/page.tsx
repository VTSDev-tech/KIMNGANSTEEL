"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { SiteFooter } from "@/components/antra/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

const ARTICLES = [
  {
    num: "01",
    title: "CÁCH CHỌN ĐỘ DÀY TÔN LỢP (ZEM) PHÙ HỢP CHO NHÀ XƯỞNG CÔNG NGHIỆP",
    category: "Kiến Thức Kỹ Thuật",
    date: "12/07/2026",
    readTime: "5 PHÚT ĐỌC",
    desc: "Độ dày phôi thép và trọng lượng mạ kẽm (AZ100, AZ150) ảnh hưởng trực tiếp đến tuổi thọ công trình và khả năng chống ăn mòn hóa chất trong nhà xưởng.",
    image: "/nha_xuong.png",
    featured: true,
  },
  {
    num: "02",
    title: "HƯỚNG DẪN THI CÔNG TÔN SEAMLOCK CHỐNG DỘT MÙA MƯA BÃO",
    category: "Thi Công Lắp Dựng",
    date: "05/07/2026",
    readTime: "4 PHÚT ĐỌC",
    desc: "Phương pháp ngàm sập Seamlock không dùng vít bắn mái, tối ưu thoát nước mưa cực nhanh cho các mái nhà xưởng có khẩu độ lớn.",
    image: "/nha_thep_tien_che.png",
  },
  {
    num: "03",
    title: "SO SÁNH TÔN LẠNH MẠ NHÔM KẼM VÀ TÔN MẠ KẼM THÔNG THƯỜNG",
    category: "So Sánh Vật Liệu",
    date: "28/06/2026",
    readTime: "4 PHÚT ĐỌC",
    desc: "Phân tích toàn diện khả năng phản xạ nhiệt, độ bền ăn mòn ngoài môi trường tự nhiên và bài toán tối ưu ngân sách cho chủ đầu tư.",
    image: "/kho_logistics.png",
  },
  {
    num: "04",
    title: "TIÊU CHUẨN MẠ KẼM ASTM A653 VÀ JIS G3302 TRONG THÉP XÂY DỰNG",
    category: "Tiêu Chuẩn Quốc Tế",
    date: "15/06/2026",
    readTime: "6 PHÚT ĐỌC",
    desc: "Đọc hiểu thông số chứng chỉ CO/CQ xuất xưởng, giúp kỹ sư và nhà thầu nghiệm thu chính xác chất lượng tôn thép.",
    image: "/neoclassical_villa.png",
  },
];

export default function KnowledgePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".kn-know-kicker", { y: 20, opacity: 0, duration: 0.8 })
        .from(".kn-know-h1", { y: 40, opacity: 0, duration: 1 }, "-=0.5")
        .from(".kn-know-desc", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

      gsap.utils.toArray<HTMLElement>(".kn-know-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const featured = ARTICLES[0];
  const list = ARTICLES.slice(1);

  return (
    <div
      ref={rootRef}
      className="antra-theme min-h-screen bg-[#F7F7F4] text-[#1A1918] selection:bg-[#1A1918] selection:text-[#F7F7F4] select-none font-sans"
    >
      {/* 1. HERO MONOGRAPH HEADER */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-14 border-b border-[#1A1918]/10 bg-[#F7F7F4]">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <div className="kn-know-kicker flex items-center gap-3 text-xs font-mono font-bold tracking-[0.3em] text-[#C28E5C]">
            <span className="w-2 h-2 rounded-full bg-[#C28E5C]" />
            <span className="uppercase">CHAPTER 05 / TECHNICAL JOURNAL &amp; GUIDES</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-2">
            <h1 className="kn-know-h1 text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#1A1918] leading-[0.92] max-w-5xl">
              CẨM NANG KỸ THUẬT<br />
              <span className="italic font-sans text-[#C28E5C] font-normal lowercase">
                material engineering guides.
              </span>
            </h1>

            <p className="kn-know-desc text-xs sm:text-sm text-[#524D4A] font-sans max-w-md leading-relaxed">
              Tổng hợp hướng dẫn kỹ thuật chọn vật liệu, tiêu chuẩn mạ kẽm và kinh nghiệm lợp mái chống dột dành cho kỹ sư và nhà thầu.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FEATURED ARTICLE (LARGE EDITORIAL BANNER) */}
      <section className="py-16 md:py-24 px-6 md:px-14 border-b border-[#1A1918]/10 bg-[#F7F7F4]">
        <div className="max-w-[1600px] mx-auto">
          <article className="kn-know-card group relative grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-[#1A1918]/12 p-8 md:p-12 hover:border-[#C28E5C] transition-all duration-300 shadow-sm cursor-pointer">
            <div className="lg:col-span-7 relative aspect-[16/10] bg-[#1A1918] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.04]"
              />
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs border-b border-[#1A1918]/10 pb-4">
                  <span className="font-bold text-[#C28E5C] tracking-widest uppercase">
                    BÀI NỔI BẬT · {featured.category}
                  </span>
                  <span className="text-[#524D4A]">{featured.date}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#1A1918] group-hover:text-[#C28E5C] transition-colors leading-[1.08]">
                  {featured.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#524D4A] leading-relaxed">
                  {featured.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-[#1A1918]/10 flex items-center justify-between font-mono text-xs font-bold text-[#1A1918]">
                <span>{featured.readTime}</span>
                <span className="text-[#C28E5C] group-hover:translate-x-1 transition-transform">
                  ĐỌC BÀI VIẾT
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 3. RECENT ARTICLES LIST */}
      <section className="py-16 md:py-24 px-6 md:px-14 bg-[#F7F7F4]">
        <div className="max-w-[1600px] mx-auto space-y-12">
          <div className="border-b border-[#1A1918]/10 pb-6 flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase">
              RECENT TECHNICAL GUIDES
            </span>
            <span className="font-mono text-xs text-[#524D4A]">
              KIM NGÂN STEEL ARCHIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {list.map((item) => (
              <article
                key={item.num}
                className="kn-know-card group bg-white border border-[#1A1918]/12 p-6 md:p-8 flex flex-col justify-between space-y-6 hover:border-[#C28E5C] transition-all duration-300 shadow-sm cursor-pointer"
              >
                <div className="flex items-center justify-between font-mono text-xs border-b border-[#1A1918]/10 pb-3">
                  <span className="font-bold text-[#C28E5C] tracking-widest">{item.num} / {item.category}</span>
                  <span className="text-[#524D4A]">{item.date}</span>
                </div>

                <div className="relative w-full aspect-[16/10] bg-[#1A1918] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.04]"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold uppercase tracking-tight text-[#1A1918] group-hover:text-[#C28E5C] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#524D4A] leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1A1918]/10 flex items-center justify-between font-mono text-xs font-bold text-[#1A1918]">
                  <span className="text-[#524D4A]">{item.readTime}</span>
                  <span className="text-[#C28E5C] group-hover:translate-x-1 transition-transform">
                   
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEWSLETTER B2B CALL-TO-ACTION (OBSIDIAN DARK BAND) */}
      <section className="py-20 bg-[#0E0E0D] text-[#F7F7F4]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase block">
              BẢNG GIÁ THÉP BẢN TIN HÀNG TUẦN
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F7F5F0]">
              NHẬN BÁO GIÁ & THÔNG SỐ KỸ THUẬT MỚI NHẤT
            </h3>
          </div>

          <Link
            href="/lien-he"
            className="px-8 py-4 bg-[#C28E5C] text-[#0E0E0D] font-bold text-xs uppercase tracking-widest hover:bg-[#d69f6a] transition-colors whitespace-nowrap"
          >
            Đăng Ký Tư Vấn Kỹ Thuật
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
