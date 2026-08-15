"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight, 
  X, 
  Maximize2, 
  Ruler, 
  Layers3, 
  ShieldCheck, 
  Cog, 
  Sliders, 
  Truck, 
  Building2, 
  PhoneCall, 
  Check, 
  Send,
  FileText,
  Shield,
  Layers,
  Wrench
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
  id: string;
  index: string;
  name: string;
  subtags: string;
  category: string;
  desc: string;
  image: string;
  specs: ProductSpec[];
  details: string;
  brands: string[];
  applications: string[];
}

const PRODUCTS: Product[] = [
  {
    id: "ton-cuon",
    index: "01",
    name: "TÔN CUỘN",
    subtags: "MẠ KẼM  ·  MẠ LẠNH  ·  MẠ MÀU",
    category: "Tôn Cuộn",
    desc: "Nguồn nguyên liệu chất lượng cao, bề mặt đồng đều, độ bền vượt trội, đáp ứng đa dạng nhu cầu sản xuất.",
    image: "/ton_ma_kem_1.svg",
    specs: [
      { label: "Độ dày", value: "0,25 – 0,60 mm" },
      { label: "Bề mặt", value: "Mạ kẽm, mạ nhôm kẽm, mạ màu" },
      { label: "Ứng dụng", value: "Cán tôn, mái và vách công nghiệp" },
    ],
    details: "Tôn cuộn Kim Ngân Steel nhập khẩu chính hãng từ Tôn Đông Á, Pomina, Tiến Lợi. Bề mặt phủ mạ kẽm/nhôm kẽm AZ50–AZ150 đạt độ bền màu 20 năm, không dột rét hay ăn mòn khí hậu biển.",
    brands: ["Tôn Đông Á", "Tôn Pomina", "Tôn Tiến Lợi", "Tôn Hòa Phát", "Tôn Nam Kim", "Tôn Việt Nhật", "Tôn Tây Nam"],
    applications: ["Cán tôn lợp mái 5 sóng / 9 sóng", "Sản xuất xà gồ nhẹ & Panel", "Gia công cơ khí & Đồ gia dụng"],
  },
  {
    id: "ton-lop",
    index: "02",
    name: "TÔN LỢP",
    subtags: "SÓNG VUÔNG  ·  SEAMLOCK  ·  KLIP-LOK",
    category: "Tôn Lợp",
    desc: "Sóng tôn công nghiệp sắc nét, liên kết Seamlock / Klip-Lok ngàm sập chống dột tuyệt đối 100%.",
    image: "/ton_can_song.svg",
    specs: [
      { label: "Độ dày", value: "0,30 – 0,60 mm" },
      { label: "Ứng dụng", value: "Mái lợp, vách, nhà xưởng, dân dụng" },
    ],
    details: "Tôn lợp sóng công nghiệp gia công trực tiếp trên máy cán sóng tự động CNC Kim Ngân. Khả năng cán tôn trực tiếp tại công trình giúp cắt tấm sóng dài bất tận, chống dột mưa 100%.",
    brands: ["Tôn Đông Á", "Tôn Tiến Lợi"],
    applications: ["Mái nhà xưởng quy mô lớn", "Kho bãi & Nhà thép tiền chế", "Nhà thi đấu, Sân bay & Dân dụng"],
  },
  {
    id: "thep-hop",
    index: "03",
    name: "THÉP HỘP",
    subtags: "HỘP MẠ KẼM  ·  HỘP ĐEN",
    category: "Thép Hộp & Ống",
    desc: "Kết cấu vuông & chữ nhật chịu nén va đập cao, đường hàn ERW phôi mạ kẽm sáng bóng chống ăn mòn.",
    image: "/thep_hop.svg",
    specs: [
      { label: "Quy cách", value: "10x10 – 200x200 mm" },
      { label: "Ứng dụng", value: "Kết cấu, khung, cơ khí, nội thất" },
    ],
    details: "Thép hộp mạ kẽm thương hiệu Hòa Phát, Việt Nhật cung ứng trực tiếp từ nhà máy. Lớp mạ kẽm nhúng nóng bề mặt giữ tuổi thọ công trình lên tới 30 năm.",
    brands: ["Thép Hòa Phát", "Thép Việt Nhật", "Sắt Đông Á", "Thép Nam Kim", "Thép Nam Hưng", "Ống Thép Đức Việt", "Ống Thép Sài Gòn"],
    applications: ["Khung kèo giàn mái nhà xưởng", "Cột chịu tải kết cấu thép", "Cơ khí chế tạo & Khung nội thất"],
  },
  {
    id: "thep-ong",
    index: "04",
    name: "THÉP ỐNG",
    subtags: "ỐNG TRÒN  ·  ỐNG MẠ KẼM",
    category: "Thép Hộp & Ống",
    desc: "Ống thép hàn áp lực tiêu chuẩn BS 1387 / ASTM A53, mạ kẽm đồng đều từ trong ra ngoài.",
    image: "/thep_ong.svg",
    specs: [
      { label: "Đường kính", value: "Ø 21 – Ø 219 mm" },
      { label: "Ứng dụng", value: "Cơ khí, kết cấu, dẫn nước" },
    ],
    details: "Ống thép tròn mạ kẽm chịu áp suất cao, độ giãn dài tối ưu. Cung ứng đầy đủ CO/CQ xuất xưởng theo lô hàng.",
    brands: ["Thép Hòa Phát", "Thép Việt Nhật", "Sắt Đông Á", "Thép Nam Kim", "Thép Nam Hưng", "Ống Thép Đức Việt", "Ống Thép Sài Gòn"],
    applications: ["Hệ thống đường ống PCCC", "Khung kết cấu vòm tròn", "Trụ bảng quảng cáo & Cột điện lực"],
  },
  {
    id: "xa-go",
    index: "05",
    name: "XÀ GỒ",
    subtags: "XÀ GỒ C  ·  XÀ GỒ Z",
    category: "Xà Gồ",
    desc: "Thép xà gồ C & Z mạ kẽm cường độ cao G450, đột lỗ tự động CNC chuẩn xác 100% theo bản vẽ CAD.",
    image: "/xa_go_z.svg",
    specs: [
      { label: "Độ dày", value: "1,50 – 3,50 mm" },
      { label: "Ứng dụng", value: "Kết cấu mái, nhà xưởng, dân dụng" },
    ],
    details: "Dây chuyền máy cán xà gồ C/Z tự động Kim Ngân đột lỗ Oval và cắt theo chiều dài yêu cầu. Thép nguyên liệu mạ kẽm bề mặt dính bám cao.",
    brands: ["Kim Ngân Gia Công (Phôi Hòa Phát/Hoa Sen)"],
    applications: ["Đòn tay xà gồ mái nhà xưởng", "Hệ sườn vách nhà thép tiền chế", "Giàn đòn gác lửng công nghiệp"],
  },
  {
    id: "thep-xay-dung",
    index: "06",
    name: "THÉP XÂY DỰNG",
    subtags: "THÉP CUỘN  ·  THÉP THANH VẰN",
    category: "Thép Xây Dựng",
    desc: "Thép cuộn & thép thanh vằn cốt bê tông mác CB300, CB400, CB500 chịu lực kéo nén đỉnh cao.",
    image: "/luoi_thep.svg",
    specs: [
      { label: "Đường kính", value: "Ø 6 – Ø 32 mm" },
      { label: "Ứng dụng", value: "Xây dựng dân dụng & công nghiệp" },
    ],
    details: "Thép xây dựng Hòa Phát chính hãng cung cấp trực tiếp cho các nhà thầu lớn. Đáp ứng đầy đủ tiêu chuẩn TCVN 1651 & JIS G3112.",
    brands: ["Thép Hòa Phát", "Thép Pomina"],
    applications: ["Đổ móng & Dầm cột bê tông cốt thép", "Công trình cao tầng & Hạ tầng giao thông", "Nhà dân dụng & Khung đúc"],
  },
  {
  id: "panel-eps",
  index: "07",
  name: "PANEL EPS CÁCH NHIỆT",
  subtags: "PANEL VÁCH · PANEL TRẦN",
  category: "Panel Cách Nhiệt",
  desc: "Panel EPS vách/trần dùng lõi xốp tỷ trọng 8 (±2) kg/m³, có các độ dày 5 cm, 7.5 cm và 10 cm. Khổ hữu dụng 1.15 m, chiều dài cắt theo yêu cầu.",
  image: "/thiet-ke-chua-co-ten-4.svg",
  specs: [
    { label: "Độ dày", value: "5 cm · 7.5 cm · 10 cm" },
    { label: "Khổ hữu dụng", value: "1.15 m" },
  ],
  details: "Panel EPS có 2 ngàm tăng cứng, dán màng chống trầy 2 mặt và chiều dài cắt theo yêu cầu.",
  brands: ["5 CM", "7.5 CM", "10 CM"],
  applications: ["Vách ngăn", "Trần", "Nhà xưởng", "Kho", "Công trình lắp ghép"],
},
  {
    id: "ton-pu",
    index: "08",
    name: "TÔN PU CÁCH NHIỆT",
    subtags: "TÔN PU 5 SÓNG · TÔN PU 9 SÓNG",
    category: "Tôn PU",
    desc: "Tôn PU cách nhiệt có lớp foam PU dày 16–17 mm, hỗ trợ cán 5 sóng và 9 sóng theo nhu cầu công trình.",
    image: "/ton-pu.svg",
    specs: [
      { label: "Độ dày PU", value: "16–17 mm" },
      { label: "Kiểu cán", value: "5 sóng · 9 sóng" },
    ],
    details: "Tôn PU hỗ trợ cách nhiệt, giảm nóng và được cán 5 sóng hoặc 9 sóng theo yêu cầu.",
    brands: [],
    applications: ["Mái nhà", "Nhà xưởng", "Kho bãi", "Mái che"],
  },

];

const CATEGORIES = [
  "TẤT CẢ",
  "TÔN CUỘN",
  "TÔN LỢP",
  "THÉP HỘP & ỐNG",
  "XÀ GỒ",
  "THÉP XÂY DỰNG",
  "PANEL THÔNG TIN",

];

const FABRICATION_STEPS = [
  { id: "01", title: "Cán tôn theo chiều dài", icon: Ruler },
  { id: "02", title: "Cán sóng vuông", icon: Layers3 },
  { id: "03", title: "Seamlock / Klip-Lok", icon: ShieldCheck },
  { id: "04", title: "Sản xuất xà gồ C/Z", icon: Cog },
  { id: "05", title: "Cắt theo quy cách", icon: Sliders },
  { id: "06", title: "Chuẩn bị đơn hàng theo công trình", icon: Truck },
];

export default function ProductsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("TẤT CẢ");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", notes: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".kn-prod-hero-content", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".kn-prod-hero-img", {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.utils.toArray<HTMLElement>(".kn-prod-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const filteredProducts =
    activeCategory === "TẤT CẢ"
      ? PRODUCTS
      : PRODUCTS.filter((p) => {
          if (activeCategory === "THÉP HỘP & ỐNG") {
            return p.category === "Thép Hộp & Ống";
          }
          return p.category.toUpperCase() === activeCategory;
        });

  const handleOpenQuote = (prod: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setQuoteProduct(prod);
    setQuoteModalOpen(true);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div
      ref={rootRef}
      className="antra-theme min-h-screen overflow-x-clip bg-[#ffffff] text-[#064e3b] selection:bg-[#064e3b] selection:text-[#F7F7F4] select-none font-sans"
    >
      {/* =========================================================================
          1. HERO HEADER SECTION (1-TO-1 FIGMA SHOWCASE WITH MODEL ABOUT)
         ========================================================================= */}
      <section className="relative pt-32 pb-14 md:pt-36 md:pb-20 px-6 md:px-14 border-b border-[#064e3b]/10 bg-[#ffffff] overflow-hidden">
        {/* Background Graphic Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <svg className="absolute top-1/4 right-[40%] w-32 h-32 opacity-40" viewBox="0 0 100 100" fill="none">
            <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#ea580c" />
            </pattern>
            <rect x="0" y="0" width="100" height="100" fill="url(#dot-grid)" />
          </svg>
          <svg className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] opacity-30 pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path d="M 200 1000 Q 600 500 1000 200" stroke="#064e3b" strokeWidth="2" fill="none" />
            <path d="M 400 1000 Q 800 300 1000 50" stroke="#ea580c" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          
          {/* Breadcrumb Bar */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#064e3b] uppercase tracking-widest pb-6">
            <Link href="/" className="hover:text-[#ea580c] transition-colors">TRANG CHỦ</Link>
            <span>/</span>
            <span className="text-[#064e3b] font-bold">SẢN PHẨM</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center overflow-visible">
            
            {/* Left Info Column (5 Cols) */}
            <div className="kn-prod-hero-content lg:col-span-5 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-[#ea580c] uppercase border-b-2 border-[#ea580c] pb-1">
                <span>01 / DANH MỤC SẢN PHẨM</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-bold uppercase tracking-tight text-[#064e3b] leading-[1.25]">
                VẬT LIỆU THÉP<br />
                CHO MỌI QUY MÔ<br />
                CÔNG TRÌNH
              </h1>

              <div className="pt-2 text-xs sm:text-sm font-sans text-[#064e3b] tracking-wide font-medium flex items-center">
                <span>Nguồn hàng chính hãng</span> <span className="text-[#ea580c] mx-2 text-[8px]">●</span> <span>Gia công theo quy cách</span> <span className="text-[#ea580c] mx-2 text-[8px]">●</span> <span>Giao vận 24h</span>
              </div>
            </div>

            {/* Right 3D Model Showcase Stage (7 Cols - Expanded & Enlarged) */}
            <div className="kn-prod-hero-img lg:col-span-7 flex justify-end lg:-mr-10 xl:-mr-20 z-0">
              <div className="relative w-full max-w-[850px] xl:max-w-[980px] aspect-[16/9] flex items-center justify-end transform lg:scale-115 xl:scale-125 lg:origin-center-right transition-transform">
                <img
                  src="/model-about.svg"
                  alt="Vật Liệu Thép Kim Ngân Steel"
                  className="w-full h-full object-contain filter contrast-[1.05] drop-shadow-2xl"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          2. CATEGORY FILTER TABS BAR
         ========================================================================= */}
      <section className="sticky top-0 z-30 py-4 px-3 sm:py-5 sm:px-6 md:px-14 bg-[#ffffff]/90 backdrop-blur-md border-b border-[#064e3b]/10 overflow-x-clip">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar pb-1">
          
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <div key={cat} className="relative flex flex-col items-center group">
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                      isActive
                        ? "bg-[#064e3b] text-white border-[#064e3b] shadow-md"
                        : "bg-transparent text-[#064e3b] border-[#e5e7eb] hover:border-[#064e3b] hover:text-[#064e3b]"
                    }`}
                  >
                    {cat}
                  </button>
                  {isActive && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#ea580c] rounded-full" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] sm:text-xs text-[#064e3b] shrink-0 font-bold uppercase tracking-widest">
            <Layers size={14} className="text-[#ea580c]" />
            <span>HIỂN THỊ <strong className="text-[#064e3b] font-black">{filteredProducts.length} / {PRODUCTS.length}</strong> CHỦNG LOẠI</span>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. FEATURED & PRODUCT SHOWCASE ARCHIVE
         ========================================================================= */}
      <section className="py-6 px-3 sm:py-16 sm:px-6 md:px-14 bg-[#ffffff]">
        <div className="max-w-[1600px] mx-auto space-y-4 sm:space-y-10">

          {/* ===================================================================
              FEATURED CARD #01 — TÔN CUỘN (HERO FULL-WIDTH CARD)
             =================================================================== */}
          {filteredProducts.some((p) => p.id === "ton-cuon") && (
            <div
              onClick={() => setSelectedProduct(PRODUCTS[0])}
              className="kn-prod-reveal relative mx-auto w-full max-w-[350px] bg-[#ffffff] border border-[#064e3b]/20 rounded-xl sm:max-w-none sm:rounded-2xl p-3.5 sm:p-10 lg:p-12 hover:border-[#ea580c] transition-all duration-300 shadow-sm cursor-pointer overflow-hidden group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 items-center">
                
                {/* Left Specs & Info Column */}
                <div className="lg:col-span-6 space-y-3 sm:space-y-6">
                  <div className="space-y-1 sm:space-y-2">
                    <span className="font-mono text-[9px] sm:text-xs font-bold text-[#ea580c] tracking-widest uppercase block">
                      {PRODUCTS[0].index}
                    </span>

                    <h2 className="text-xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#064e3b] group-hover:text-[#ea580c] transition-colors">
                      {PRODUCTS[0].name}
                    </h2>

                    <div className="font-mono text-[8px] sm:text-xs font-bold text-[#ea580c] uppercase tracking-wider pt-0.5 sm:pt-1">
                      {PRODUCTS[0].subtags}
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-sm text-[#064e3b] font-sans leading-relaxed max-w-xl">
                    {PRODUCTS[0].desc}
                  </p>

                  {/* Specs Table List */}
                  <div className="space-y-1.5 sm:space-y-3 pt-2 border-t border-[#064e3b]/10 max-w-lg">
                    {PRODUCTS[0].specs.map((spec, sIdx) => (
                      <div key={sIdx} className="grid grid-cols-12 text-[9.5px] sm:text-xs font-sans text-[#064e3b]">
                        <span className="col-span-4 font-bold text-[#064e3b] flex items-center gap-1.5 sm:gap-2">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#ea580c]" />
                          {spec.label}
                        </span>
                        <span className="col-span-8 text-[#064e3b]">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Action Buttons */}
                  <div className="pt-1 sm:pt-4 flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(PRODUCTS[0]);
                      }}
                      className="px-3.5 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-[8px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-white border border-[#064e3b]/20 text-[#064e3b] hover:border-[#064e3b] transition-colors cursor-pointer inline-flex items-center gap-1.5 sm:gap-2"
                    >
                      <span>XEM CHI TIẾT</span>
                      <ArrowRight size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleOpenQuote(PRODUCTS[0], e)}
                      className="px-3.5 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-[8px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-[#ea580c] text-white hover:bg-[#c2410c] transition-colors cursor-pointer shadow-sm"
                    >
                      NHẬN BÁO GIÁ
                    </button>
                  </div>
                </div>

                {/* Right 3D Model Stage Image */}
                <div className="lg:col-span-6 flex items-center justify-center p-0 sm:p-4">
                  <div className="relative w-full max-w-[180px] sm:max-w-[500px] aspect-[16/9] sm:aspect-[4/3] flex items-center justify-center">
                    <img
                      src={PRODUCTS[0].image}
                      alt={PRODUCTS[0].name}
                      className="w-full h-full object-contain filter contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ===================================================================
              SECONDARY GRID OF 6 PRODUCT CARDS (#02 TO #07)
             =================================================================== */}
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts
                .filter((p) => p.id !== "ton-cuon")
                .map((prod) => (
                  <article
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
                    className="kn-prod-reveal group relative mx-auto flex w-full min-w-0 max-w-[350px] flex-col justify-between overflow-hidden rounded-xl border border-[#064e3b]/20 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-[#ea580c] cursor-pointer sm:max-w-none sm:min-h-[460px] sm:p-6"
                  >
                    <div>
                      {/* Top Header Row */}
                      <div className="flex items-start justify-between border-b border-[#064e3b]/08 pb-2 sm:pb-3">
                        <div>
                          <span className="font-mono text-[9px] sm:text-xs font-bold text-[#ea580c] tracking-widest uppercase block">
                            {prod.index}
                          </span>
                          <h3 className="text-base sm:text-xl font-bold uppercase tracking-tight text-[#064e3b] group-hover:text-[#ea580c] transition-colors leading-tight pt-1">
                            {prod.name}
                          </h3>
                          <div className="font-mono text-[8px] sm:text-[11px] font-bold text-[#ea580c] uppercase tracking-wider pt-0.5">
                            {prod.subtags}
                          </div>
                        </div>
                      </div>

                      {/* 3D Model Stage Image Container */}
                      <div className="relative my-2.5 flex h-[112px] w-full items-center justify-center overflow-hidden rounded-lg border border-[#064e3b]/20/60 bg-[#ffffff] p-2 sm:my-4 sm:h-auto sm:aspect-[16/10] sm:p-4">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-contain filter contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Specs List */}
                      <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2 text-[9.5px] sm:text-xs font-sans text-[#064e3b]">
                        {prod.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="grid grid-cols-12 gap-1">
                            <span className="col-span-4 font-bold text-[#064e3b]">
                              {spec.label}
                            </span>
                            <span className="col-span-8 text-[#064e3b] line-clamp-1">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Action Buttons */}
                    <div className="mt-2.5 grid w-full min-w-0 grid-cols-2 gap-2 border-t border-[#064e3b]/08 pt-2.5 sm:mt-4 sm:pt-5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(prod);
                        }}
                        className="inline-flex min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border border-[#064e3b]/20 bg-white px-2 py-1.5 font-mono text-[7.5px] font-bold uppercase tracking-wider text-[#064e3b] transition-colors hover:border-[#064e3b] cursor-pointer sm:gap-1.5 sm:px-4 sm:py-2 sm:text-[11px]"
                      >
                        <span>XEM CHI TIẾT</span>
                        <ArrowRight size={12} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleOpenQuote(prod, e)}
                        className="min-w-0 whitespace-nowrap rounded-full bg-[#ea580c] px-2 py-1.5 font-mono text-[7.5px] font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#c2410c] cursor-pointer sm:px-4 sm:py-2 sm:text-[11px]"
                      >
                        NHẬN BÁO GIÁ
                      </button>
                    </div>

                  </article>
                ))}
          </div>



        </div>
      </section>

      {/* =========================================================================
          4. CUSTOM FABRICATION PROCESS SECTION (GIA CÔNG THEO YÊU CẦU)
         ========================================================================= */}
      <section className="kn-prod-reveal py-16 sm:py-24 px-6 md:px-14 bg-[#ffffff] border-t border-[#064e3b]/10">
        <div className="max-w-[1600px] mx-auto space-y-12">
          
          {/* Section Divider Header */}
          <div className="flex items-center justify-center gap-4">
            <span className="h-[1px] bg-[#064e3b]/15 flex-1 max-w-[200px] hidden sm:block" />
            <h2 className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-[#ea580c] uppercase text-center">
              GIA CÔNG THEO YÊU CẦU
            </h2>
            <span className="h-[1px] bg-[#064e3b]/15 flex-1 max-w-[200px] hidden sm:block" />
          </div>

          {/* 6 Step Icon Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {FABRICATION_STEPS.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.id}
                  className="relative bg-white border border-[#064e3b]/20 rounded-xl p-5 flex flex-col items-center justify-between text-center space-y-4 hover:border-[#ea580c] transition-all duration-300 shadow-sm group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#ffffff] border border-[#064e3b]/20 flex items-center justify-center text-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white transition-colors duration-300">
                    <IconComp size={20} strokeWidth={1.5} />
                  </div>

                  <p className="text-xs font-sans font-bold text-[#064e3b] leading-tight max-w-[140px]">
                    {step.title}
                  </p>

                  {/* Arrow Indicator for Desktop */}
                  {idx < FABRICATION_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-[#ea580c]">
                      <ChevronRight size={14} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. BOTTOM BANNER: ĐÃ CÓ QUY CÁCH CHO CÔNG TRÌNH?
         ========================================================================= */}
      <section className="kn-prod-reveal pb-20 sm:pb-28 px-6 md:px-14 bg-[#ffffff]">
        <div className="max-w-[1600px] mx-auto bg-[#ffffff] border border-[#064e3b]/20 rounded-2xl p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left Text Info */}
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#064e3b]">
                ĐÃ CÓ QUY CÁCH CHO CÔNG TRÌNH?
              </h2>
              <p className="text-xs sm:text-sm text-[#064e3b] font-sans leading-relaxed">
                Gửi danh mục, số lượng và yêu cầu gia công để nhận tư vấn và báo giá phù hợp.
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setQuoteProduct(PRODUCTS[0]);
                  setQuoteModalOpen(true);
                  setFormSubmitted(false);
                }}
                className="px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#ea580c] text-white hover:bg-[#c2410c] transition-colors cursor-pointer shadow-sm inline-flex items-center gap-2"
              >
                <span>GỬI YÊU CẦU BÁO GIÁ</span>
                <ArrowRight size={14} />
              </button>

              <Link
                href="/lien-he"
                className="px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white border border-[#064e3b]/20 text-[#064e3b] hover:border-[#064e3b] transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <PhoneCall size={14} className="text-[#ea580c]" />
                <span>LIÊN HỆ TƯ VẤN</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. INTERACTIVE SPECIFICATION DETAILS MODAL
         ========================================================================= */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-2.5 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-[#0E0E0D]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[340px] sm:max-w-[920px] bg-white border border-[#064e3b]/20 shadow-2xl rounded-xl sm:rounded-2xl p-3.5 sm:p-10 z-10 max-h-[88vh] sm:max-h-[90vh] overflow-y-auto font-sans text-[#064e3b]"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#064e3b]/15 bg-[#ffffff] hover:bg-[#064e3b] hover:text-white transition-colors flex items-center justify-center cursor-pointer z-20"
              >
                <X size={16} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-start">
                
                {/* Left 3D Stage Image */}
                <div className="md:col-span-5 space-y-3 sm:space-y-4">
                  <div className="w-full h-[178px] sm:h-auto sm:aspect-square bg-[#ffffff] border border-[#064e3b]/20 rounded-xl p-3 sm:p-6 flex items-center justify-center overflow-hidden">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full max-h-[145px] sm:max-h-none object-contain filter contrast-[1.05]"
                    />
                  </div>

                  <div className="p-3 sm:p-4 bg-[#ffffff] border border-[#064e3b]/20 rounded-xl space-y-1">
                    <span className="text-[9px] sm:text-[11px] font-mono font-bold text-[#ea580c] uppercase block tracking-wider">
                      CAM KẾT CHẤT LƯỢNG
                    </span>
                    <p className="text-[10px] sm:text-xs text-[#064e3b] font-bold leading-relaxed">
                      100% Phôi chính hãng · Đầy đủ CO/CQ xuất xưởng
                    </p>
                  </div>
                </div>

                {/* Right Details */}
                <div className="md:col-span-7 space-y-3.5 sm:space-y-5">
                  <div>
                    <span className="text-[9px] sm:text-xs font-mono font-bold tracking-widest text-[#ea580c] uppercase block mb-1">
                      {selectedProduct.index} / {selectedProduct.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold uppercase text-[#064e3b] leading-none">
                      {selectedProduct.name}
                    </h3>
                    <div className="font-mono text-[9px] sm:text-xs font-bold text-[#ea580c] uppercase tracking-wider pt-1">
                      {selectedProduct.subtags}
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-sm text-[#064e3b] leading-relaxed">
                    {selectedProduct.details}
                  </p>

                  {/* Specs Table */}
                  <div className="space-y-2 sm:space-y-3 pt-2.5 sm:pt-3 border-t border-[#064e3b]/10">
                    <span className="text-[9px] sm:text-xs font-mono font-bold uppercase text-[#064e3b] block tracking-wider">
                      THÔNG SỐ KỸ THUẬT QUY CÁCH
                    </span>
                    <div className="space-y-1.5 sm:space-y-2 bg-[#ffffff] p-3 sm:p-4 border border-[#064e3b]/20 rounded-lg">
                      {selectedProduct.specs.map((spec, i) => (
                        <div key={i} className="flex items-center justify-between gap-3 text-[10px] sm:text-xs font-sans">
                          <span className="font-bold text-[#064e3b]">{spec.label}:</span>
                          <span className="text-[#064e3b] font-mono text-right">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-[#064e3b]/10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    {selectedProduct.id !== "panel-eps" && (
                      <div className="flex-1">
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-[#064e3b] block tracking-wider mb-2">
                          THƯƠNG HIỆU CUNG ỨNG
                        </span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 pr-0 sm:pr-4">
                          {selectedProduct.brands.map((brand, bIdx) => (
                            <span
                              key={bIdx}
                              className="inline-block px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md border border-[#064e3b]/15 bg-white text-[9px] sm:text-[10px] font-bold text-[#064e3b] uppercase shadow-sm"
                            >
                              {brand}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        const targetProd = selectedProduct;
                        setSelectedProduct(null);
                        handleOpenQuote(targetProd);
                      }}
                      className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-[#ea580c] text-white font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider hover:bg-[#c2410c] transition-colors rounded-full shadow-sm cursor-pointer whitespace-nowrap"
                    >
                      Báo Giá Ngay
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          7. INSTANT QUOTE REQUEST MODAL
         ========================================================================= */}
      <AnimatePresence>
        {quoteModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuoteModalOpen(false)}
              className="fixed inset-0 bg-[#0E0E0D]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[560px] bg-white border border-[#064e3b]/20 shadow-2xl rounded-2xl p-6 sm:p-8 z-10 font-sans text-[#064e3b]"
            >
              <button
                onClick={() => setQuoteModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[#064e3b]/15 bg-[#ffffff] hover:bg-[#064e3b] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
              >
                <X size={14} />
              </button>

              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-[#ea580c] uppercase tracking-wider">
                      YÊU CẦU BÁO GIÁ NHANH
                    </span>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-[#064e3b]">
                      {quoteProduct?.name || "TÔN THÉP KIM NGÂN"}
                    </h3>
                    <p className="text-xs text-[#064e3b]">
                      Để lại thông tin, đội ngũ kỹ thuật Kim Ngân Steel sẽ gửi báo giá ưu đãi trong 15 phút.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-[#064e3b] mb-1">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#ffffff] border border-[#064e3b]/20 text-xs focus:outline-none focus:border-[#ea580c] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-[#064e3b] mb-1">
                        Số điện thoại Zalo *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0987 654 321"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#ffffff] border border-[#064e3b]/20 text-xs focus:outline-none focus:border-[#ea580c] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-[#064e3b] mb-1">
                        Số lượng & Quy cách yêu cầu (nếu có)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Ví dụ: 50 cuộn tôn mạ lạnh 0.4mm, giao về Thuận An Bình Dương..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#ffffff] border border-[#064e3b]/20 text-xs focus:outline-none focus:border-[#ea580c] transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    <span>GỬI YÊU CẦU NGAY</span>
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#ea580c]/10 text-[#ea580c] flex items-center justify-center mx-auto">
                    <Check size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-[#064e3b]">
                    GỬI YÊU CẦU THÀNH CÔNG!
                  </h3>
                  <p className="text-xs text-[#064e3b] max-w-sm mx-auto leading-relaxed">
                    Cảm ơn <strong className="text-[#064e3b]">{formData.name}</strong>. Chuyên viên báo giá Kim Ngân Steel sẽ gọi trực tiếp số <strong className="text-[#064e3b]">{formData.phone}</strong> trong 15 phút tới.
                  </p>
                  <button
                    type="button"
                    onClick={() => setQuoteModalOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-[#064e3b] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#ea580c] transition-colors cursor-pointer mt-2"
                  >
                    ĐÓNG CỬA SỔ
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
