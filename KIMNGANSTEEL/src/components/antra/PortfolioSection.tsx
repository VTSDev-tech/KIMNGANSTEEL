"use client";

import { motion } from "framer-motion";
import type { ProjectCard } from "@/types/antra";

type CaseStudy = {
  num: string;
  title: string;
  category: string;
  location: string;
  buildingType: string;
  year: string;
  scale: string;
  application: string;
  image: string;
  materials: string[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    num: "01",
    title: "NHÀ XƯỞNG SẢN XUẤT TỰ ĐỘNG HÓA",
    category: "Industrial Factory",
    location: "KCN VSIP II, BÌNH DƯƠNG",
    buildingType: "Nhà Xưởng Công Nghiệp",
    year: "2025",
    scale: "15,000 m²",
    application: "Hệ Mái Bao Che & Giàn Kèo Thép Khẩu Độ Lớn",
    image: "/nha_xuong.png",
    materials: [
      "Tôn Lợp Seamlock 5 Sóng",
      "Xà Gồ Z Mạ Kẽm G450",
      "Thép Hình I / H Tiêu Chuẩn JIS",
      "Tôn PU Cách Nhiệt Cao Cấp",
    ],
  },
  {
    num: "02",
    title: "TRUNG TÂM LOGISTICS THÔNG MINH",
    category: "Logistics Hub",
    location: "TP. THỦ ĐỨC, TP.HCM",
    buildingType: "Kho Vận Đa Năng",
    year: "2025",
    scale: "22,000 m²",
    application: "Vách Bao Che Chống Nóng & Hệ Khung Thép",
    image: "/kho_logistics.png",
    materials: [
      "Tôn Vách Mạ Màu Sóng Vuông",
      "Thép Hộp Vuông 200x200 mm",
      "Xà Gồ C Mạ Kẽm Z275",
      "Tôn Lấy Sáng Polycarbonate",
    ],
  },
  {
    num: "03",
    title: "TỔ HỢP THƯƠNG MẠI & TỔNG KHO KỸ THUẬT",
    category: "Commercial & Tech Facility",
    location: "KCN LONG THÀNH, ĐỒNG NAI",
    buildingType: "Tổ Hợp Thương Mại",
    year: "2024",
    scale: "18,500 m²",
    application: "Kết Cấu Khung Kèo Mái Vòm & Tôn Mạ Màu",
    image: "/neoclassical_villa.png",
    materials: [
      "Tôn Mạ Màu Khổ Rộng",
      "Thép Khung Kèo Tiền Chế Q345B",
      "Tôn Sóng Vuông Vách 9 Sóng",
      "Máng Xối Thép Mạ Kẽm",
    ],
  },
  {
    num: "04",
    title: "NHÀ THÉP TIỀN CHẾ KHỔ RỘNG",
    category: "Steel Structure Facility",
    location: "KCN PHÚ MỸ, BÀ RỊA - VŨ TÀU",
    buildingType: "Nhà Thép Khổ Rộng",
    year: "2024",
    scale: "30,000 m²",
    application: "Mái Seamlock & Hệ Cột Thép Chịu Lực",
    image: "/nha_thep_tien_che.png",
    materials: [
      "Tôn Seamlock Chống Rò Rỉ",
      "Cột Thép Hình H SS400",
      "Xà Gồ Z Nối Chồng Cường Độ Cao",
      "Tôn Cách Nhiệt Glasswool",
    ],
  },
];

type PortfolioSectionProps = {
  projects?: ProjectCard[];
};

export function PortfolioSection({ projects: _unusedProjects }: PortfolioSectionProps = {}) {
  return (
    <section
      id="projects"
      className="py-16 md:py-24 bg-[#ffffff] border-b border-[#064e3b]/10 text-[#064e3b] overflow-hidden select-none"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Editorial Publication Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 pb-6 border-b border-[#064e3b]/15 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#064e3b] font-sans font-bold block mb-3">
              SELECTED CASE STUDIES · ARCHIVE 2026
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-[#064e3b]">
              CÔNG TRÌNH TIÊU BIỂU
            </h2>
          </div>

          <a
            href="/du-an"
            className="editorial-link text-xs uppercase tracking-[0.25em] text-[#064e3b] font-sans font-bold pb-1 border-b border-[#064e3b] self-start md:self-auto hover:text-[#ea580c] hover:border-[#ea580c] transition-colors duration-300"
          >
            <span>TẤT CẢ DỰ ÁN</span><svg className="w-3.5 h-3.5 inline-block ml-1 text-current transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" /></svg>
          </a>
        </div>

        {/* Curated Editorial Case Studies Sequence (Alternating Visual Rhythms) */}
        <div className="space-y-36 md:space-y-48">
          
          {/* =========================================================================
              PROJECT 01 — HERO SIGNATURE PROJECT (Large Dominant Composition)
             ========================================================================= */}
          {(() => {
            const p = CASE_STUDIES[0];
            return (
              <motion.article
                key={p.num}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative flex flex-col w-full"
              >
                {/* Header Metadata Bar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline pb-6 border-b border-[#064e3b]/15 mb-8">
                  <div className="lg:col-span-2 flex items-center gap-3">
                    <span className="text-2xl font-light tracking-tight text-[#064e3b]">
                      {p.num}
                    </span>
                    <span className="text-[#064e3b]/30 font-sans">/</span>
                    <span className="text-xs font-sans uppercase text-[#064e3b] tracking-widest font-semibold">
                      SIGNATURE CASE STUDY
                    </span>
                  </div>

                  <div className="lg:col-span-7">
                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-[#064e3b] group-hover:text-[#ea580c] transition-colors duration-500 leading-[1.08]">
                      {p.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-3 flex flex-col lg:items-end text-xs font-sans text-[#064e3b] space-y-1">
                    <span className="uppercase font-bold text-[#064e3b]">{p.location}</span>
                    <span className="text-[#064e3b]">{p.buildingType} · {p.scale} · {p.year}</span>
                  </div>
                </div>

                {/* Hero Widescreen Dominant Image */}
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#ffffff] mb-8">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-1000 ease-out filter contrast-[1.03] brightness-[0.98]"
                  />
                  <div className="absolute inset-0 bg-[#064e3b]/0 group-hover:bg-[#064e3b]/[0.08] transition-colors duration-500 pointer-events-none" />
                </div>

                {/* Applied Materials Checklist & Editorial Footer */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2 text-xs font-sans">
                  <div className="lg:col-span-8 flex flex-wrap items-center gap-2 text-[#064e3b]">
                    <span className="font-bold text-[#064e3b] uppercase tracking-wider mr-2">Vật Liệu Ứng Dụng:</span>
                    {p.materials.map((m, i) => (
                      <span key={m} className="inline-flex items-center gap-2 bg-white/70 px-3 py-1 rounded-md text-[11px] font-medium border border-[#064e3b]/08 text-[#064e3b]">
                        {m}
                        {i < p.materials.length - 1 && <span className="opacity-30">·</span>}
                      </span>
                    ))}
                  </div>

                  <div className="lg:col-span-4 flex items-center justify-end">
                    <span className="editorial-link uppercase tracking-widest text-xs font-bold text-[#064e3b] group-hover:translate-x-1 transition-transform duration-300">
                      <span>XEM CHI TIẾT CASE STUDY</span><svg className="w-3.5 h-3.5 inline-block ml-1 text-current transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })()}

          {/* =========================================================================
              PROJECT 02 — LOGISTICS HUB (Left Shifted Image & Right Aligned Metadata)
             ========================================================================= */}
          {(() => {
            const p = CASE_STUDIES[1];
            return (
              <motion.article
                key={p.num}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: false, amount: 0.15 }}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left: Image (7 Cols) */}
                <div className="lg:col-span-7 relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-[#ffffff]">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-1000 ease-out filter contrast-[1.03] brightness-[0.98]"
                  />
                  <div className="absolute inset-0 bg-[#064e3b]/0 group-hover:bg-[#064e3b]/[0.08] transition-colors duration-500 pointer-events-none" />
                </div>

                {/* Right: Metadata & Content (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="flex items-center gap-3 border-b border-[#064e3b]/15 pb-4">
                    <span className="text-xl font-light tracking-tight text-[#064e3b]">
                      {p.num}
                    </span>
                    <span className="text-[#064e3b]/30 font-sans">/</span>
                    <span className="text-xs font-sans uppercase text-[#064e3b] tracking-widest font-semibold">
                      LOGISTICS & WAREHOUSING
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-[#064e3b] group-hover:text-[#ea580c] transition-colors duration-500 leading-tight">
                    {p.title}
                  </h3>

                  <div className="space-y-2 text-xs font-sans text-[#064e3b]">
                    <div className="flex justify-between py-1.5 border-b border-[#064e3b]/08">
                      <span className="text-[#064e3b]">Địa Điểm:</span>
                      <span className="font-bold text-[#064e3b]">{p.location}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#064e3b]/08">
                      <span className="text-[#064e3b]">Quy Mô / Năm:</span>
                      <span className="font-bold text-[#064e3b]">{p.scale} · {p.year}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#064e3b]/08">
                      <span className="text-[#064e3b]">Hạng Mục:</span>
                      <span className="font-bold text-[#064e3b] text-right">{p.application}</span>
                    </div>
                  </div>

                  {/* Applied Materials Checklist */}
                  <div className="pt-2">
                    <span className="text-xs font-bold text-[#064e3b] uppercase tracking-wider block mb-2">Vật Liệu Ứng Dụng:</span>
                    <div className="flex flex-wrap gap-2">
                      {p.materials.map((m) => (
                        <span key={m} className="bg-white/70 px-3 py-1 rounded-md text-[11px] font-medium border border-[#064e3b]/08 text-[#064e3b]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <span className="editorial-link uppercase tracking-widest text-xs font-bold text-[#064e3b] group-hover:translate-x-1 transition-transform duration-300">
                      <span>XEM CHI TIẾT CASE STUDY</span><svg className="w-3.5 h-3.5 inline-block ml-1 text-current transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })()}

          {/* =========================================================================
              PROJECT 03 — COMMERCIAL FACILITY (Side-by-Side Split)
             ========================================================================= */}
          {(() => {
            const p = CASE_STUDIES[2];
            return (
              <motion.article
                key={p.num}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: false, amount: 0.15 }}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left: Metadata & Content (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6 order-2 lg:order-1">
                  <div className="flex items-center gap-3 border-b border-[#064e3b]/15 pb-4">
                    <span className="text-xl font-light tracking-tight text-[#064e3b]">
                      {p.num}
                    </span>
                    <span className="text-[#064e3b]/30 font-sans">/</span>
                    <span className="text-xs font-sans uppercase text-[#064e3b] tracking-widest font-semibold">
                      COMMERCIAL & TECH HUB
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-[#064e3b] group-hover:text-[#ea580c] transition-colors duration-500 leading-tight">
                    {p.title}
                  </h3>

                  <div className="space-y-2 text-xs font-sans text-[#064e3b]">
                    <div className="flex justify-between py-1.5 border-b border-[#064e3b]/08">
                      <span className="text-[#064e3b]">Địa Điểm:</span>
                      <span className="font-bold text-[#064e3b]">{p.location}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#064e3b]/08">
                      <span className="text-[#064e3b]">Quy Mô / Năm:</span>
                      <span className="font-bold text-[#064e3b]">{p.scale} · {p.year}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#064e3b]/08">
                      <span className="text-[#064e3b]">Hạng Mục:</span>
                      <span className="font-bold text-[#064e3b] text-right">{p.application}</span>
                    </div>
                  </div>

                  {/* Applied Materials Checklist */}
                  <div className="pt-2">
                    <span className="text-xs font-bold text-[#064e3b] uppercase tracking-wider block mb-2">Vật Liệu Ứng Dụng:</span>
                    <div className="flex flex-wrap gap-2">
                      {p.materials.map((m) => (
                        <span key={m} className="bg-white/70 px-3 py-1 rounded-md text-[11px] font-medium border border-[#064e3b]/08 text-[#064e3b]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <span className="editorial-link uppercase tracking-widest text-xs font-bold text-[#064e3b] group-hover:translate-x-1 transition-transform duration-300">
                      <span>XEM CHI TIẾT CASE STUDY</span><svg className="w-3.5 h-3.5 inline-block ml-1 text-current transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </span>
                  </div>
                </div>

                {/* Right: Image (7 Cols) */}
                <div className="lg:col-span-7 relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-[#ffffff] order-1 lg:order-2">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-1000 ease-out filter contrast-[1.03] brightness-[0.98]"
                  />
                  <div className="absolute inset-0 bg-[#064e3b]/0 group-hover:bg-[#064e3b]/[0.08] transition-colors duration-500 pointer-events-none" />
                </div>
              </motion.article>
            );
          })()}

          {/* =========================================================================
              PROJECT 04 — STEEL STRUCTURE (Wide Panoramic Composition)
             ========================================================================= */}
          {(() => {
            const p = CASE_STUDIES[3];
            return (
              <motion.article
                key={p.num}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: false, amount: 0.15 }}
                className="group relative flex flex-col w-full"
              >
                {/* Header Bar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline pb-6 border-b border-[#064e3b]/15 mb-8">
                  <div className="lg:col-span-2 flex items-center gap-3">
                    <span className="text-2xl font-light tracking-tight text-[#064e3b]">
                      {p.num}
                    </span>
                    <span className="text-[#064e3b]/30 font-sans">/</span>
                    <span className="text-xs font-sans uppercase text-[#064e3b] tracking-widest font-semibold">
                      STEEL STRUCTURE FACILITY
                    </span>
                  </div>

                  <div className="lg:col-span-7">
                    <h3 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-[#064e3b] group-hover:text-[#ea580c] transition-colors duration-500 leading-tight">
                      {p.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-3 flex flex-col lg:items-end text-xs font-sans text-[#064e3b] space-y-1">
                    <span className="uppercase font-bold text-[#064e3b]">{p.location}</span>
                    <span className="text-[#064e3b]">{p.buildingType} · {p.scale} · {p.year}</span>
                  </div>
                </div>

                {/* Ultra-Wide Panoramic Image Stage */}
                <div className="relative w-full aspect-[16/9] md:aspect-[24/9] overflow-hidden bg-[#ffffff] mb-8">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-1000 ease-out filter contrast-[1.03] brightness-[0.98]"
                  />
                  <div className="absolute inset-0 bg-[#064e3b]/0 group-hover:bg-[#064e3b]/[0.08] transition-colors duration-500 pointer-events-none" />
                </div>

                {/* Applied Materials Checklist Footer */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2 text-xs font-sans">
                  <div className="lg:col-span-8 flex flex-wrap items-center gap-2 text-[#064e3b]">
                    <span className="font-bold text-[#064e3b] uppercase tracking-wider mr-2">Vật Liệu Ứng Dụng:</span>
                    {p.materials.map((m, i) => (
                      <span key={m} className="inline-flex items-center gap-2 bg-white/70 px-3 py-1 rounded-md text-[11px] font-medium border border-[#064e3b]/08 text-[#064e3b]">
                        {m}
                        {i < p.materials.length - 1 && <span className="opacity-30">·</span>}
                      </span>
                    ))}
                  </div>

                  <div className="lg:col-span-4 flex items-center justify-end">
                    <span className="editorial-link uppercase tracking-widest text-xs font-bold text-[#064e3b] group-hover:translate-x-1 transition-transform duration-300">
                      <span>XEM CHI TIẾT CASE STUDY</span><svg className="w-3.5 h-3.5 inline-block ml-1 text-current transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })()}

        </div>

      </div>
    </section>
  );
}
