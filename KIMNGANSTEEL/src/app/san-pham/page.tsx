"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { SiteFooter } from "@/components/antra/SiteFooter";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  index: string;
  name: string;
  nameEn: string;
  category: string;
  image: string;
  modelSvg: string;
  specs: string[];
  desc: string;
  details: string;
  brands: string[];
  applications: string[];
  guarantee: string;
}

const PRODUCTS: Product[] = [
  {
    index: "01",
    name: "Tôn Cuộn Mạ Kẽm / Mạ Lạnh / Mạ Màu",
    nameEn: "Galvanized / Aluzinc / Prepainted Steel Coil",
    category: "Tôn Cuộn",
    image: "/roof_material.png",
    modelSvg: "/ton_lanh.svg",
    specs: ["Độ dày: 0.11 – 2.0 mm", "Mạ nhôm kẽm AZ50 - AZ150", "Khổ rộng: 914 - 1220 mm"],
    desc: "Nguyên liệu thép cán nguội chất lượng cao, chống ăn mòn vượt trội, phù hợp sản xuất công nghiệp và dân dụng.",
    details: "Tôn cuộn Kim Ngân Steel được nhập trực tiếp từ các nhà máy Tôn Đông Á, Pomina, Tiến Lợi. Bề mặt mạ nhôm kẽm hoặc mạ màu công nghệ cao bảo vệ lớp lõi thép trước môi trường khắc nghiệt.",
    brands: ["Tôn Đông Á", "Tôn Pomina", "Tôn Tiến Lợi"],
    applications: ["Cán tôn lợp mái", "Sản xuất xà gồ nhẹ", "Panel cách nhiệt & Cơ khí"],
    guarantee: "10 - 20 năm bảo hành thủng mạ",
  },
  {
    index: "02",
    name: "Tôn Lợp Cán Sóng / Seamlock / Kliplok",
    nameEn: "Roofing Sheets & Concealed Fastener",
    category: "Tôn Lợp",
    image: "/nha_xuong.png",
    modelSvg: "/ton_ma_mau.svg",
    specs: ["Biên dạng: 5 sóng, 9 sóng, Seamlock", "Chống dột: 100% tuyệt đối (Seamlock)", "Màu sắc: Đa dạng"],
    desc: "Biên dạng sóng công nghiệp và ngàm sập Seamlock chuyên dụng cho mái khẩu độ lớn.",
    details: "Tôn lợp chất lượng cao gia công trực tiếp tại nhà máy Kim Ngân. Khả năng cán trực tiếp tại công trình giúp tạo ra các tấm tôn siêu dài, liên kết không cần bắn vít chống dột hoàn toàn.",
    brands: ["Tôn Đông Á", "Tôn Tiến Lợi"],
    applications: ["Mái nhà xưởng quy mô lớn", "Kho bãi & Nhà thép tiền chế", "Nhà thi đấu & Sân bay"],
    guarantee: "10 - 20 năm bảo hành dột mái",
  },
  {
    index: "03",
    name: "Thép Hộp Mạ Kẽm / Thép Hộp Đen",
    nameEn: "Galvanized / Black Steel Square Tube",
    category: "Thép Hộp",
    image: "/thep_hop.svg",
    modelSvg: "/thep_hop_ma_kem.svg",
    specs: ["Biên dạng: Vuông / Chữ nhật", "Độ dày: 0.7 – 5.0 mm", "Tiêu chuẩn: ASTM A500 / TCVN"],
    desc: "Khả năng chịu tải nén và xoắn vượt trội, bề mặt đường hàn ERW phẳng mịn không nứt rạn.",
    details: "Thép hộp mạ kẽm chịu tải trọng lớn, chống gỉ sét ưu việt, chuyên dùng cho kết cấu nhà thép tiền chế, giàn giáo và các kết cấu chịu lực chính của công trình.",
    brands: ["Thép Hòa Phát", "Thép Việt Nhật"],
    applications: ["Cột chịu lực nhà thép", "Khung kèo giàn mái", "Khung cơ khí & Nội thất"],
    guarantee: "Cấp kèm CO/CQ gốc chính hãng",
  },
  {
    index: "04",
    name: "Ống Thép Tròn / Ống Hàn Mạ Kẽm",
    nameEn: "Galvanized / Welded Round Steel Pipe",
    category: "Thép Ống",
    image: "/thep_hop.svg",
    modelSvg: "/thep_ong_thep_hinh.svg",
    specs: ["Đường kính: DN15 - DN200", "Độ dày: 1.0 – 6.0 mm", "Tiêu chuẩn: BS 1387 / ASTM A53"],
    desc: "Ống thép chịu áp lực cao, dùng cho hệ thống phòng cháy chữa cháy và dẫn luồng.",
    details: "Sản phẩm ống thép tròn mạ kẽm từ Thép Việt Nhật và Hòa Phát có độ bền cơ học cao, lớp mạ kẽm đồng đều từ trong ra ngoài giúp chống lại ăn mòn hóa học.",
    brands: ["Thép Việt Nhật", "Thép Hòa Phát"],
    applications: ["Hệ thống PCCC & Dẫn nước", "Khung kết cấu tròn", "Trụ bảng hiệu & Cột đèn"],
    guarantee: "Bảo hành tiêu chuẩn xuất xưởng",
  },
  {
    index: "05",
    name: "Xà Gồ Mạ Kẽm C & Z",
    nameEn: "Galvanized Purlin C & Z",
    category: "Xà Gồ",
    image: "/purlin_cz.svg",
    modelSvg: "/xa_go_c_z.svg",
    specs: ["Mác thép: G350 - G450 MPa", "Quy cách: C100–C300 / Z150–Z300", "Đột lỗ: CNC tự động"],
    desc: "Giàn kết cấu thép nhẹ cường độ cao, thiết kế đột lỗ chính xác giúp thi công lắp dựng cực kỳ nhanh chóng.",
    details: "Xà gồ C và Z được cán từ thép cuộn cường độ cao G450. Hệ thống máy cán tự động đột lỗ Oval/Tròn chuẩn xác theo từng bản vẽ CAD 100%, đồng đều và sắc nét.",
    brands: ["Kim Ngân Gia Công (Nguyên liệu Hòa Phát/Hoa Sen)"],
    applications: ["Khung đòn tay xà gồ mái", "Hệ sườn vách nhà xưởng công nghiệp", "Giàn khung gác lửng"],
    guarantee: "10 - 15 năm bảo hành ăn mòn",
  },
  {
    index: "06",
    name: "Thép Cuộn / Thép Thanh Vằn Xây Dựng",
    nameEn: "Rebar & Wire Rod Steel",
    category: "Thép Xây Dựng",
    image: "/nha_thep_tien_che.png",
    modelSvg: "/thep_ong_thep_hinh.svg",
    specs: ["Quy cách: Ø6 - Ø32", "Tiêu chuẩn: TCVN 1651 / JIS G3112", "Mác thép: CB300, CB400, CB500"],
    desc: "Thép cốt bê tông cốt thép siêu bền cường độ cao, xương sống của mọi dự án hạ tầng.",
    details: "Thép thanh vằn và thép cuộn tròn trơn chuyên dụng cho móng, dầm, sàn bê tông cốt thép. Được sản xuất và kiểm định khắt khe bằng công nghệ của Hòa Phát.",
    brands: ["Thép Hòa Phát"],
    applications: ["Đổ móng & Dầm sàn bê tông", "Công trình dân dụng & cao tầng", "Cầu đường hạ tầng"],
    guarantee: "Chứng chỉ CO/CQ theo từng barem",
  },
  {
    index: "07",
    name: "Thép Hình Công Nghiệp H, I, U, V",
    nameEn: "Structural Steel Section H, I, U, V",
    category: "Thép Hình",
    image: "/nha_thep_tien_che.png",
    modelSvg: "/thep_ong_thep_hinh.svg",
    specs: ["Quy cách: H100-H400 / I100-I600 / V40-V150", "Tiêu chuẩn: JIS G3101", "Mác thép: SS400 / Q345B"],
    desc: "Thép kết cấu hạng nặng đúc khuôn định hình sẵn, tối ưu khả năng chịu mô men uốn và lực cắt.",
    details: "Thép hình chữ H, I, U, V đảm bảo độ cứng vững tuyệt đối cho kết cấu nhịp lớn. Sản phẩm chính hãng nhập trực tiếp từ Hòa Phát và các nhà máy uy tín.",
    brands: ["Thép Hòa Phát", "Posco Yamato"],
    applications: ["Cột trụ chính nhà xưởng", "Dầm chịu tải cần trục", "Khung gầm sàn công nghiệp"],
    guarantee: "Chứng chỉ chất lượng lô hàng",
  }
];

const CATEGORIES = ["Tất Cả", "Tôn Cuộn", "Tôn Lợp", "Thép Hộp", "Thép Ống", "Xà Gồ", "Thép Xây Dựng", "Thép Hình"];

export default function ProductsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Tất Cả");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".kn-prod-kicker", { y: 20, opacity: 0, duration: 0.8 })
        .from(".kn-prod-h1", { y: 40, opacity: 0, duration: 1 }, "-=0.5")
        .from(".kn-prod-desc", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

      gsap.utils.toArray<HTMLElement>(".kn-prod-card, .kn-prod-section").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
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

  const filteredProducts = activeCategory === "Tất Cả"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div
      ref={rootRef}
      className="antra-theme min-h-screen bg-[#F7F7F4] text-[#1A1918] selection:bg-[#1A1918] selection:text-[#F7F7F4] select-none font-sans"
    >
      {/* 1. HERO MONOGRAPH HEADER */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-14 border-b border-[#1A1918]/10 bg-[#F7F7F4]">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <div className="kn-prod-kicker flex items-center gap-3 text-xs font-mono font-bold tracking-[0.3em] text-[#C28E5C]">
            <span className="w-2 h-2 rounded-full bg-[#C28E5C]" />
            <span className="uppercase">CHAPTER 02 / MATERIAL ARCHIVE 2026</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-2">
            <h1 className="kn-prod-h1 text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#1A1918] leading-[0.92] max-w-5xl">
              DANH MỤC VẬT LIỆU<br />
              <span className="italic font-sans text-[#C28E5C] font-normal lowercase">
                architectural specification.
              </span>
            </h1>

            <p className="kn-prod-desc text-xs sm:text-sm text-[#524D4A] font-sans max-w-md leading-relaxed">
              Tổng hợp đầy đủ quy cách, tiêu chuẩn mạ và thông số kỹ thuật của các dòng tôn lợp, xà gồ C/Z và thép hộp mạ kẽm Kim Ngân Steel.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS */}
      <section className="py-6 px-6 md:px-14 bg-[#F7F7F4] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer border ${
                    isActive
                      ? "bg-[#1A1918] text-[#F7F7F4] border-[#1A1918]"
                      : "bg-white text-[#524D4A] border-[#1A1918]/15 hover:border-[#1A1918]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:block font-mono text-xs text-[#524D4A]">
            HIỂN THỊ <span className="text-[#C28E5C] font-bold">{filteredProducts.length}</span> / {PRODUCTS.length} CHỦNG LOẠI
          </div>
        </div>
      </section>

      {/* 3. PRODUCT ARCHIVE GRID */}
      <section className="kn-prod-section py-16 md:py-24 px-6 md:px-14 bg-[#F7F7F4]">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <motion.article
                  key={p.index}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedProduct(p)}
                  className="group relative bg-white border border-[#1A1918]/12 p-8 flex flex-col justify-between hover:border-[#C28E5C] transition-all duration-300 shadow-sm cursor-pointer min-h-[480px]"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-[#1A1918]/10 pb-4">
                    <span className="text-xs font-mono font-bold text-[#C28E5C] tracking-widest uppercase">
                      {p.index} / {p.category}
                    </span>
                    <span className="text-[11px] font-mono text-[#524D4A] uppercase tracking-wider">
                      SPECIFICATION
                    </span>
                  </div>

                  {/* SVG 3D Model Display */}
                  <div className="relative w-full aspect-[4/3] my-6 flex items-center justify-center bg-[#F7F7F4] border border-[#1A1918]/08 p-6 overflow-hidden">
                    <img
                      src={p.modelSvg}
                      alt={p.name}
                      className="w-full h-full object-contain filter contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Title & Info */}
                  <div className="space-y-4 pt-2">
                    <div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight text-[#1A1918] group-hover:text-[#C28E5C] transition-colors leading-tight">
                        {p.name}
                      </h3>
                      <p className="text-[11px] font-mono text-[#524D4A] uppercase tracking-widest pt-1">
                        {p.nameEn}
                      </p>
                    </div>

                    <p className="text-xs text-[#524D4A] leading-relaxed line-clamp-2">
                      {p.desc}
                    </p>

                    <div className="pt-4 border-t border-[#1A1918]/10 flex items-center justify-between text-xs font-mono font-bold text-[#1A1918]">
                      <span className="group-hover:text-[#C28E5C] transition-colors">
                        XEM THÔNG SỐ CHI TIẾT
                      </span>
                      <span className="text-[#C28E5C] group-hover:translate-x-1 transition-transform duration-300">
                       
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-10">
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
              className="relative w-full max-w-[940px] bg-white border border-[#1A1918]/20 shadow-2xl p-6 sm:p-10 z-10 max-h-[90vh] overflow-y-auto font-sans text-[#1A1918]"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 font-mono text-xs font-bold uppercase tracking-widest text-[#1A1918] hover:text-[#C28E5C] cursor-pointer"
              >
                [ ĐÓNG X ]
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5 space-y-4">
                  <div className="w-full aspect-square bg-[#F7F7F4] border border-[#1A1918]/10 p-6 flex items-center justify-center">
                    <img
                      src={selectedProduct.modelSvg}
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4 bg-[#F7F7F4] border border-[#1A1918]/10 space-y-2">
                    <span className="text-[11px] font-mono font-bold text-[#C28E5C] uppercase block">
                      BẢO HÀNH CHÍNH HÃNG
                    </span>
                    <p className="text-xs text-[#1A1918] font-bold">
                      {selectedProduct.guarantee}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest text-[#C28E5C] uppercase block mb-1">
                      {selectedProduct.index} / {selectedProduct.category}
                    </span>
                    <h3 className="text-3xl font-bold uppercase text-[#1A1918]">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-xs font-mono text-[#524D4A] uppercase tracking-widest">
                      {selectedProduct.nameEn}
                    </p>
                  </div>

                  <p className="text-xs text-[#524D4A] leading-relaxed text-justify">
                    {selectedProduct.details}
                  </p>

                  <div className="space-y-3 pt-2 border-t border-[#1A1918]/10">
                    <span className="text-xs font-mono font-bold uppercase text-[#1A1918] block">
                      QUY CÁCH KỸ THUẬT TIÊU CHUẨN
                    </span>
                    <div className="space-y-2">
                      {selectedProduct.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#524D4A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C28E5C]" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1A1918]/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-[#524D4A] block">THƯƠNG HIỆU PHÂN PHỐI</span>
                      <span className="text-xs font-bold uppercase text-[#1A1918]">
                        {selectedProduct.brands.join(" · ")}
                      </span>
                    </div>

                    <Link
                      href="/lien-he"
                      onClick={() => setSelectedProduct(null)}
                      className="px-6 py-3 bg-[#1A1918] text-[#F7F7F4] font-bold text-xs uppercase tracking-widest hover:bg-[#C28E5C] hover:text-[#1A1918] transition-colors"
                    >
                      Báo Giá Ngay
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}
