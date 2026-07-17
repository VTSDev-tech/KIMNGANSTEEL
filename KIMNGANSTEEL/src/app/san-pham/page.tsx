"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { SiteFooter } from "@/components/antra/SiteFooter";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  index: string;
  name: string;
  nameEn: string;
  category: string;
  image: string;
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
    name: "Tôn Lạnh",
    nameEn: "Cold Rolled Steel",
    category: "Tôn Lợp",
    image: "/roof_material.png",
    specs: ["Độ dày: 0.28 – 0.65 mm", "Mạ hợp kim nhôm kẽm AZ"],
    desc: "Khả năng phản xạ nhiệt vượt trội, chống nóng và chống rỉ sét ưu việt.",
    details: "Tôn lạnh Kim Ngân được sản xuất trên dây chuyền công nghệ hiện đại, mạ hợp kim nhôm kẽm AZ với tỉ lệ tối ưu. Sản phẩm có khả năng phản xạ nhiệt cực tốt, giúp công trình luôn mát mẻ và chống chịu ăn mòn hiệu quả gấp 4 lần tôn kẽm thông thường.",
    brands: ["Hoa Sen", "Đông Á", "Nam Kim"],
    applications: ["Lợp mái nhà dân dụng", "Lợp mái nhà xưởng", "Làm vách ngăn công trình"],
    guarantee: "10 - 20 năm chống thủng",
  },
  {
    index: "02",
    name: "Tôn Màu",
    nameEn: "Color Coated Sheet",
    category: "Tôn Lợp",
    image: "/roof_material.png",
    specs: ["Bảng màu: 40+ màu sắc", "Biên dạng: Sóng vuông / sóng ngói"],
    desc: "Màng sơn bền vững, thẩm mỹ cao cho các công trình hiện đại.",
    details: "Tôn lạnh màu cao cấp kết hợp lõi thép mạ nhôm kẽm kiên cố và lớp sơn phủ cao cấp. Màng sơn chống phai màu, chống bám bẩn và chống trầy xước vượt trội, mang lại vẻ ngoài thẩm mỹ hiện đại và sang trọng cho mọi kiến trúc.",
    brands: ["Hoa Sen", "Đông Á", "Nam Kim", "BlueScope"],
    applications: ["Mái biệt thự", "Mái nhà phố", "Hệ thống vách bao che"],
    guarantee: "10 năm không phai màu sơn",
  },
  {
    index: "03",
    name: "Tôn Cán Sóng",
    nameEn: "Corrugated Sheet",
    category: "Tôn Lợp",
    image: "/roof_material.png",
    specs: ["Biên dạng: 5 / 9 / 11 sóng", "Cán biên dạng theo yêu cầu"],
    desc: "Khả năng thoát nước nhanh, chịu lực võng lớn cho nhà xưởng rộng.",
    details: "Dòng tôn chuyên dụng được cán sóng chính xác bằng máy CNC công suất lớn. Thiết kế sóng tối ưu giúp thoát nước cực nhanh khi mưa lớn, giảm thiểu tiếng ồn và tăng cường độ cứng của tấm tôn, chuyên dùng cho các nhà thép tiền chế và xưởng lớn.",
    brands: ["Hòa Phát", "Hoa Sen", "Đông Á"],
    applications: ["Mái nhà xưởng công nghiệp", "Trại chăn nuôi", "Kho bãi logistics"],
    guarantee: "10 - 15 năm độ bền vật liệu",
  },
  {
    index: "04",
    name: "Thép Cuộn Mạ Kẽm",
    nameEn: "Galvanized Coil",
    category: "Thép Xây Dựng",
    image: "/coil_material.png",
    specs: ["Trọng lượng mạ: G60 - G90", "Tiêu chuẩn: ASTM A653 / JIS G3302"],
    desc: "Bề mặt mạ kẽm bóng đẹp, nguyên liệu nền tảng bền bỉ vô song.",
    details: "Thép cuộn mạ kẽm chất lượng cao phục vụ chế tạo xà gồ, ống thép, và cơ khí chính xác. Lớp mạ kẽm bám dính cực chắc chắn, dẻo dai giúp bảo vệ lõi thép bên trong khỏi quá trình oxy hóa ngoài môi trường tự nhiên.",
    brands: ["Hòa Phát", "Hoa Sen", "Nam Kim"],
    applications: ["Cán xà gồ", "Chế tạo ống dẫn", "Gia công cơ khí, tấm lợp"],
    guarantee: "Đầy đủ chứng chỉ CO/CQ",
  },
  {
    index: "05",
    name: "Thép Hộp Mạ Kẽm",
    nameEn: "Square Hollow Section",
    category: "Thép Xây Dựng",
    image: "/pipe_material.png",
    specs: ["Biên dạng: Vuông / Chữ nhật", "Độ dày thành: 0.7 – 3.0 mm"],
    desc: "Khả năng chịu lực xoắn và nén vượt trội, thi công nhanh gọn.",
    details: "Thép hộp mạ kẽm Kim Ngân là sự lựa chọn hàng đầu cho các kết cấu khung kèo mái, lan can, và giàn giáo xây dựng. Khả năng chịu tải trọng xoắn, uốn cong cực tốt cùng bề mặt chống gỉ sét tối đa.",
    brands: ["Hòa Phát", "Hoa Sen", "Vina One"],
    applications: ["Khung kèo mái nhà", "Giàn giáo chịu lực", "Kết cấu cơ khí dân dụng"],
    guarantee: "Bảo hành gỉ sét 5 - 10 năm",
  },
  {
    index: "06",
    name: "Thép Ống & Thép Hình",
    nameEn: "Pipe & Structural Steel",
    category: "Thép Xây Dựng",
    image: "/pipe_material.png",
    specs: ["Dạng thép: I, U, V, H, Ống Đúc", "Đường kính: Ø21 – Ø219"],
    desc: "Kết cấu thép siêu trường siêu trọng cho công nghiệp nặng.",
    details: "Các chủng loại thép hình tiêu chuẩn chất lượng cao phục vụ các hạng mục kết cấu chịu lực cực lớn như nhà thép tiền chế, cầu đường, cẩu trục chân đế. Thép ống đúc và hàn siêu dày chuyên dẫn khí, nước áp lực lớn.",
    brands: ["Hòa Phát", "Posco Yamato", "An Khánh"],
    applications: ["Cột trụ chịu lực chính", "Hệ dầm cầu trục", "Đường ống công nghiệp áp lực cao"],
    guarantee: "Chứng chỉ chất lượng tiêu chuẩn quốc tế",
  },
  {
    index: "07",
    name: "Thép Tấm Đen",
    nameEn: "Black Steel Plate",
    category: "Thép Xây Dựng",
    image: "/coil_material.png",
    specs: ["Độ dày tấm: 4 – 25 mm", "Mác thép: SS400 / Q345B"],
    desc: "Độ phẳng tuyệt đối, mác thép chuẩn chịu lực va đập cực tốt.",
    details: "Thép tấm cán nóng chuyên dụng cho chế tạo bồn bể chứa dầu khí, đóng tàu, cơ khí chế tạo máy và gia công bản mã xây dựng. Độ dày đồng đều, khả năng hàn cắt gia công tạo hình dễ dàng.",
    brands: ["Formosa Ha Tinh", "Nhập khẩu Trung Quốc/Hàn Quốc"],
    applications: ["Chế tạo bản mã", "Làm bồn bể công nghiệp", "Sàn xe tải trọng nặng, đóng tàu"],
    guarantee: "Đầy đủ hóa đơn và CO/CQ gốc",
  },
  {
    index: "08",
    name: "Xà Gồ C / Z",
    nameEn: "Purlin C / Z",
    category: "Thép Xây Dựng",
    image: "/purlin_material.png",
    specs: ["Mác thép: G350 - G450", "Quy cách: C100 – C300 / Z150 - Z300"],
    desc: "Giàn kết cấu thép nhẹ, bền dẻo dai lắp dựng cực nhanh.",
    details: "Xà gồ mạ kẽm cường độ cao biên dạng C và Z được cắt và đột lỗ tự động theo chính xác bản vẽ thiết kế. Trọng lượng nhẹ giúp giảm tải trọng móng nhưng vẫn đảm bảo khả năng chịu lực uốn mái tuyệt đối.",
    brands: ["Hòa Phát", "Hoa Sen", "Kim Ngân Gia Công"],
    applications: ["Hệ giàn mái nhà tiền chế", "Đòn tay xà gồ nhà xưởng", "Khung sàn gác lửng"],
    guarantee: "Bảo hành chống ăn mòn 10 năm",
  },
];

const CATEGORIES = ["Tất Cả", "Tôn Lợp", "Thép Xây Dựng"];

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
        .from(".hero-kicker", { y: 20, opacity: 0, duration: 0.8 })
        .from(".hero-title", { y: 40, opacity: 0, duration: 1 }, "-=0.5")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");
    }, root);
    return () => ctx.revert();
  }, []);

  const filteredProducts = activeCategory === "Tất Cả"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div ref={rootRef} className="min-h-screen bg-[#080808] pt-24 font-sans selection:bg-[#B8AFA3] selection:text-[#080808]">

      {/* ─── Hero Section ─── */}
      <section className="relative py-20 md:py-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        {/* Background image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/pipe_material.png" alt="Sản phẩm Kim Ngân Steel" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/60 to-[#080808]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-5xl text-center flex flex-col items-center">
          <p className="hero-kicker text-[10px] font-bold tracking-[0.2em] uppercase text-[#C2BAB0] mb-6">Kim Ngân Steel — Danh Mục</p>
          <h1 className="hero-title text-3xl md:text-5xl lg:text-7xl mb-6 uppercase font-light leading-[1.2]">
            <span className="block text-white">Sản Phẩm</span>
            <span className="block italic text-[#C2BAB0]">Chất Lượng Cao</span>
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-8 h-px bg-[#C2BAB0]/50" />
            <p className="hero-sub text-[#888] text-sm font-light tracking-wide">
              {PRODUCTS.length} sản phẩm · Quy cách chuẩn quốc tế · Sẵn hàng kho lớn
            </p>
            <div className="w-8 h-px bg-[#C2BAB0]/50" />
          </div>
        </div>
      </section>

      {/* ─── Category Filter Tabs ─── */}
      <section className="py-8 bg-[#080808]">
        <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
          <div className="flex flex-wrap gap-3 items-center border-b border-white/5 pb-6">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer rounded-full border border-white/10 hover:border-white/40"
                  style={{ color: isActive ? "#080808" : "#999" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-[#C2BAB0] rounded-full z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Visual Grid Product List ─── */}
      <section className="py-12 bg-[#080808]">
        <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => {
                return (
                  <motion.article
                    key={p.index}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => setSelectedProduct(p)}
                    className="group relative aspect-[3/4.2] bg-[#111] border border-white/5 overflow-hidden cursor-pointer flex flex-col justify-between p-6 hover:border-white/40 transition-colors"
                  >
                    {/* Product Background Image */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 select-none pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />
                    </div>

                    {/* Card Header Info */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-[#E5E7EB] uppercase bg-black/60 px-2.5 py-1 rounded border border-white/5">
                        {p.category}
                      </span>
                      <span className="text-[11px] font-mono font-bold tracking-widest text-[#444] group-hover:text-[#C2BAB0] transition-colors">
                        {p.index}
                      </span>
                    </div>

                    {/* Card Bottom Content */}
                    <div className="relative z-10 mt-auto">
                      <h3 className="text-xl font-medium text-white uppercase tracking-wide group-hover:text-[#C2BAB0] transition-colors leading-tight">
                        {p.name}
                      </h3>
                      <p className="text-[9px] tracking-widest text-white/40 uppercase mt-1">
                        {p.nameEn}
                      </p>

                      {/* Short Specs Bullet List */}
                      <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {p.specs.map((spec, i) => (
                          <li key={i} className="flex items-center text-[10px] text-[#B8AFA3] tracking-wide uppercase">
                            <span className="w-1.5 h-1.5 bg-[#C2BAB0] rounded-full mr-2 shrink-0" />
                            <span className="truncate">{spec}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Action button */}
                      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C2BAB0] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Chi tiết <ArrowRight size={11} />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ─── Product Detail Modal ─── */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-[820px] bg-[#121212] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_24px_80px_rgba(0,0,0,0.6)] max-h-[85vh] md:max-h-[580px] overflow-y-auto md:overflow-visible z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              {/* Left Column: Image Area */}
              <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-full bg-black overflow-hidden flex-shrink-0">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono tracking-widest text-[#E5E7EB] uppercase bg-black/60 px-2 py-0.5 rounded border border-white/5">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-2xl font-light text-white uppercase mt-2">{selectedProduct.name}</h3>
                  <p className="text-[9px] tracking-widest text-white/40 uppercase mt-0.5">{selectedProduct.nameEn}</p>
                </div>
              </div>

              {/* Right Column: Detailed Specs Content */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9CA3AF] mb-2">Giới Thiệu Sản Phẩm</h4>
                    <p className="text-xs text-[#D8D4CE]/90 leading-relaxed font-light text-justify">{selectedProduct.details}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9CA3AF] mb-2">Thương Hiệu</h4>
                      <p className="text-xs text-white/80 font-light">{selectedProduct.brands.join(", ")}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9CA3AF] mb-2">Bảo Hành</h4>
                      <p className="text-xs text-white/80 font-light">{selectedProduct.guarantee}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9CA3AF] mb-2">Ứng Dụng Thực Tế</h4>
                    <ul className="space-y-1">
                      {selectedProduct.applications.map((app, index) => (
                        <li key={index} className="flex items-center text-xs text-white/80 font-light">
                          <span className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full mr-2 shrink-0" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Call-to-action button */}
                <div className="pt-8 mt-auto">
                  <Link
                    href="/lien-he"
                    onClick={() => setSelectedProduct(null)}
                    className="w-full bg-[#C2BAB0] text-[#080808] font-bold uppercase tracking-[0.1em] py-3 flex items-center justify-center gap-2.5 hover:bg-white hover:text-black transition-colors rounded-sm text-xs"
                  >
                    Nhận Báo Giá Ngay
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── CTA Strip ─── */}
      <section className="bg-[#F2F0EC] py-20">
        <div className="container mx-auto px-6 md:px-12 max-w-[1280px] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#9CA3AF] mb-3">Chính sách thương mại</p>
            <h3 className="text-2xl md:text-4xl font-light text-[#151413] uppercase leading-tight">
              Chiết khấu đến <span className="text-[#9CA3AF]">5%</span><br />
              <span className="text-[#9CA3AF] text-xl md:text-3xl">cho đại lý & nhà thầu</span>
            </h3>
          </div>
          <div className="flex flex-col gap-3 text-right">
            <p className="text-[#666] text-sm font-light">Giao hàng miễn phí nội tỉnh</p>
            <p className="text-[#666] text-sm font-light">Đổi trả 7 ngày nếu lỗi nhà sản xuất</p>
            <Link href="/lien-he" className="mt-2 inline-block bg-[#151413] text-white text-[11px] font-black uppercase tracking-[0.25em] px-8 py-3.5 hover:bg-[#9CA3AF] transition-colors duration-300">
              Nhận Báo Giá →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
