"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HotspotData = {
  id: string;
  number: string;
  x: number; // badge percentage x
  y: number; // badge percentage y
  targetX: number; // target pin percentage x
  targetY: number; // target pin percentage y
  label: string;
  componentName: string;
  productName: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
};

const HOTSPOTS: HotspotData[] = [
  {
    id: "roof",
    number: "01",
    x: 42,
    y: 16,
    targetX: 42,
    targetY: 25,
    label: "Tôn mái",
    componentName: "Hệ Mái Bao Che",
    productName: "Tôn Mạ Màu / Tôn Cán Sóng",
    description: "Giải pháp lợp mái tối ưu cho nhà xưởng công nghiệp và công trình thương mại, chịu lực cao, phản nhiệt tốt và độ bền màu trên 15 năm.",
    image: "/ton_can_song.svg",
    specs: [
      { label: "Độ dày", value: "0.35 - 0.60 mm" },
      { label: "Kiểu sóng", value: "5 sóng / 9 sóng vuông" },
      { label: "Lớp mạ", value: "Nhôm kẽm / Sơn màu Polyester" },
      { label: "Bảo hành", value: "10 - 20 năm" },
    ],
  },
  {
    id: "purlin",
    number: "02",
    x: 24,
    y: 31,
    targetX: 36,
    targetY: 42,
    label: "Xà gồ mái",
    componentName: "Kết Cấu Xà Gồ Mái",
    productName: "Xà Gồ C / Z Mạ Kẽm",
    description: "Hệ đòn tay xà gồ thép mạ kẽm cường độ cao G350 - G450, khả năng đục lỗ tự động và nối chồng tăng cứng khẩu độ nhà xưởng.",
    image: "/xa_go_z_update.svg",
    specs: [
      { label: "Quy cách", value: "C80 - C300 / Z150 - Z300" },
      { label: "Độ dày", value: "1.5 - 3.2 mm" },
      { label: "Cường độ thép", value: "G350 - G450 MPa" },
      { label: "Lớp mạ kẽm", value: "Z120 - Z275 (g/m²)" },
    ],
  },
  {
    id: "rafter",
    number: "03",
    x: 14,
    y: 44,
    targetX: 40,
    targetY: 39,
    label: "Khung thép",
    componentName: "Khung Kèo Thép Chính",
    productName: "Thép Hình I / H",
    description: "Kết cấu khung kèo thép chính chịu tải trọng trọng yếu cho toàn bộ mái và hệ giàn công trình, sản xuất theo chuẩn kỹ thuật ISO.",
    image: "/thep_hop.svg",
    specs: [
      { label: "Chủng loại", value: "Thép I, H, Khung vòm" },
      { label: "Mác thép", value: "SS400 / Q345B" },
      { label: "Bề mặt", value: "Sơn chống gỉ / Mạ kẽm" },
      { label: "Tiêu chuẩn", value: "JIS G3101 / ASTM A36" },
    ],
  },
  {
    id: "column",
    number: "04",
    x: 18,
    y: 54,
    targetX: 32,
    targetY: 54,
    label: "Cột thép",
    componentName: "Hệ Cột Chịu Lực",
    productName: "Thép Hộp / Thép Hình H",
    description: "Hệ cột chịu lực thẳng đứng truyền tải trọng công trình xuống móng bê tông, được gia công ERW đanh mịn và đai liên kết chắc chắn.",
    image: "/thep_hop.svg",
    specs: [
      { label: "Quy cách", value: "Vuông 100x100 - 200x200 mm" },
      { label: "Độ dày thành", value: "2.0 - 5.0 mm" },
      { label: "Chiều dài cây", value: "6m - 12m" },
      { label: "Tiêu chuẩn", value: "ASTM A500 / TCVN 3783" },
    ],
  },
  {
    id: "wall",
    number: "05",
    x: 62,
    y: 61,
    targetX: 52,
    targetY: 61,
    label: "Tôn vách",
    componentName: "Vách Bao Che Công Trình",
    productName: "Tôn Mạ Màu Vách",
    description: "Hệ bao che vách ngăn chống chịu thời tiết, cách nhiệt, giữ màu sắc công trình luôn mới và đồng bộ kiến trúc hiện đại.",
    image: "/ton_ma_mau.svg",
    specs: [
      { label: "Độ dày", value: "0.30 - 0.50 mm" },
      { label: "Khổ rộng", value: "914 - 1.000 mm" },
      { label: "Màu sắc", value: "Xám xơ dừa, Trắng sữa, Xanh" },
      { label: "Bề mặt", value: "Sơn bóng / Mờ PU" },
    ],
  },
];

export function BuildingApplicationSection() {
  const [activeId, setActiveId] = useState<string>("roof");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".kn-app-header",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Model 3D Float in
      gsap.fromTo(
        ".kn-app-museum-model",
        { opacity: 0, scale: 0.94, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hotspots Stagger Pop-in
      gsap.fromTo(
        ".kn-app-hotspot-item",
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Right Info Panel Slide In
      gsap.fromTo(
        ".kn-app-info-panel",
        { opacity: 0, x: 35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const activeHotspot = HOTSPOTS.find((h) => h.id === activeId) || HOTSPOTS[0];

  return (
    <section
      ref={sectionRef}
      id="building-applications"
      className="relative py-16 md:py-24 bg-[#F7F5F0] border-b border-[#1A1918]/10 text-[#1A1918] select-none overflow-hidden"
    >
      {/* Top Subtle Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#1A1918]/10" />

      {/* Massive Editorial Background Chapter Watermark */}
      <div
        className="kn-app-chapter-bg absolute top-28 sm:top-36 left-1/2 -translate-x-1/2 text-6xl sm:text-7xl md:text-[130px] lg:text-[160px] font-bold text-[#1A1918]/[0.03] tracking-tighter uppercase pointer-events-none whitespace-nowrap z-0 select-none font-sans"
        aria-hidden="true"
      >
        APPLICATION IN PROJECTS
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Editorial Top Section Header (Balanced Split Layout) */}
        <div className="kn-app-header mb-8 md:mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C28E5C] font-sans font-bold block mb-3">
            CHAPTER 03 — REAL WORLD APPLICATION
          </span>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#1A1918]/10 pb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#1A1918] leading-[1.1] max-w-[680px]">
              ỨNG DỤNG VẬT LIỆU<br />TRONG CÔNG TRÌNH
            </h2>
            <p className="text-xs sm:text-sm text-[#524D4A] font-sans max-w-[420px] leading-relaxed">
              Trải nghiệm thực tế cách sắp xếp và phối hợp các chủng loại vật liệu tôn thép Kim Ngân Steel trong kết cấu nhà xưởng công nghiệp.
            </p>
          </div>
        </div>

        {/* Main Balanced Grid Stage: Left Model Stage (7 Cols) + Right Info Panel (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[580px]">
          
          {/* Left Column: Model Stage (7 Cols Desktop, Left Aligned to Margin) */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-start p-0 ml-0 lg:-ml-12">
            
            {/* Model Image Container (max-w-[880px], Left Aligned) */}
            <div className="kn-app-museum-model relative w-full max-w-[880px] aspect-square flex items-center justify-start">
              
              {/* Static Exploded Warehouse SVG Model */}
              <img
                src="/model_cong_trinh.svg"
                alt="Mô hình bóc tách vật liệu nhà xưởng Kim Ngân Steel"
                className="w-full h-full object-contain filter contrast-[1.03] brightness-[1.01] transition-none pointer-events-none"
              />

              {/* SVG Leader Lines Layer Connecting Number Badges to Target Metal Surfaces */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {HOTSPOTS.map((spot) => {
                  const isActive = spot.id === activeId;
                  return (
                    <g key={spot.id}>
                      <line
                        x1={spot.x + "%"}
                        y1={spot.y + "%"}
                        x2={spot.targetX + "%"}
                        y2={spot.targetY + "%"}
                        stroke={isActive ? "#C28E5C" : "#8A7A6A"}
                        strokeWidth={isActive ? "2" : "1.2"}
                        strokeDasharray={isActive ? "none" : "3 3"}
                        strokeOpacity={isActive ? "1" : "0.6"}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Target Metal Surface Pin Dots */}
              {HOTSPOTS.map((spot) => {
                const isActive = spot.id === activeId;
                return (
                  <div
                    key={"target-" + spot.id}
                    style={{ top: spot.targetY + "%", left: spot.targetX + "%" }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <span className="relative flex items-center justify-center">
                      <span
                        className={
                          "rounded-full transition-all duration-300 " +
                          (isActive
                            ? "w-3.5 h-3.5 bg-[#C28E5C] ring-4 ring-[#C28E5C]/30 shadow-sm"
                            : "w-2.5 h-2.5 bg-[#8A7A6A]")
                        }
                      />
                    </span>
                  </div>
                );
              })}

              {/* Hotspot HTML Native Number Badges Overlaid via Calibrated Percentage Coordinates */}
              {HOTSPOTS.map((spot) => {
                const isActive = spot.id === activeId;

                return (
                  <div
                    key={spot.id}
                    style={{ top: spot.y + "%", left: spot.x + "%" }}
                    className="kn-app-hotspot-item absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
                  >
                    {/* Native Button with Accessible Focus and Keyboard Support */}
                    <button
                      type="button"
                      onClick={() => setActiveId(spot.id)}
                      aria-label={"Chọn vị trí " + spot.label + " - " + spot.productName}
                      aria-pressed={isActive}
                      className={
                        "relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C28E5C] focus:ring-offset-2 " +
                        (isActive
                          ? "bg-[#C28E5C] text-white shadow-lg scale-110 ring-4 ring-[#C28E5C]/30"
                          : "bg-white/90 text-[#1A1918] hover:bg-[#C28E5C] hover:text-white border border-[#1A1918]/20 shadow-md hover:scale-110")
                      }
                    >
                      {/* Pulse Ring when Active */}
                      {isActive && (
                        <span className="absolute inset-0 rounded-full bg-[#C28E5C]/40 animate-ping pointer-events-none" />
                      )}

                      {/* Hotspot Dot Center Pin */}
                      <span className="text-xs font-sans font-bold z-10">{spot.number}</span>
                    </button>

                    {/* Tooltip Hover Label */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-[#1A1918] text-white text-[11px] font-sans font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md z-30">
                      {spot.label}
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

          {/* Right Column: Information Panel (5 Cols Desktop, Right Aligned) */}
          <div className="kn-app-info-panel lg:col-span-5 mx-auto flex w-[calc(100%-2rem)] max-w-[315px] flex-col justify-between rounded-xl border border-[#1A1918]/10 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sm:min-h-[440px] sm:w-full sm:max-w-none sm:p-6 md:min-h-[480px] md:p-9">
            
            {/* Accessible Live Region for Screen Readers */}
            <div aria-live="polite" className="sr-only">
              Đã chọn vị trí {activeHotspot.label}: {activeHotspot.productName}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Kicker + Component Number */}
                  <div className="flex items-center justify-between gap-3 border-b border-[#1A1918]/08 pb-2.5 mb-3 sm:pb-3.5 sm:mb-5">
                    <span className="text-[9px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#C28E5C]">
                      HẠNG MỤC {activeHotspot.number}
                    </span>
                    <span className="max-w-[120px] text-right text-[10px] sm:max-w-none sm:text-xs font-sans font-medium text-[#8E857B]">
                      {activeHotspot.componentName}
                    </span>
                  </div>

                  {/* Component Title & Product Name */}
                  <h3 className="text-lg sm:text-3xl font-bold uppercase tracking-tight text-[#1A1918] mb-1">
                    {activeHotspot.label}
                  </h3>
                  <p className="text-[9px] sm:text-xs font-sans font-bold text-[#8E857B] uppercase tracking-wider mb-2.5 sm:mb-5">
                    {activeHotspot.productName}
                  </p>

                  {/* Short Description */}
                  <p className="text-[11px] sm:text-sm text-[#524D4A] font-sans leading-relaxed mb-3 sm:mb-6">
                    {activeHotspot.description}
                  </p>

                  {/* Product Thumbnail & Specifications Grid */}
                  <div className="flex items-start gap-2.5 sm:gap-4 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F7F5F0] border border-[#1A1918]/06 mb-3 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white p-1.5 shrink-0 border border-[#1A1918]/08 flex items-center justify-center">
                      <img
                        src={activeHotspot.image}
                        alt={activeHotspot.productName}
                        className="w-full h-full object-contain filter contrast-105"
                      />
                    </div>
                    <div className="flex-1 space-y-1 text-[10px] sm:text-xs font-sans">
                      {activeHotspot.specs.map((s) => (
                        <div key={s.label} className="flex items-center justify-between gap-2 text-[9px] sm:text-[11px]">
                          <span className="text-[#6B655F] font-medium">{s.label}:</span>
                          <span className="font-bold text-[#1A1918] text-right">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-1.5 sm:pt-2">
                  <a
                    href="#contact"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 sm:py-3.5 sm:px-5 rounded-xl sm:rounded-2xl bg-[#1A1918] hover:bg-[#C28E5C] text-white font-sans text-[9px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm group"
                  >
                    <span>XEM CHI TIẾT SẢN PHẨM</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
