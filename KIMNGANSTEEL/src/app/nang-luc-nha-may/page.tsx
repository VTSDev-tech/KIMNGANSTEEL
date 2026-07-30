"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { 
  Building2, 
  Cog, 
  Truck, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight, 
  PhoneCall,
  Layers3,
  Sliders,
  Wrench,
  Layers,
  Box,
  CircleDot,
  CheckCircle2,
  Award,
  Users,
  Target,
  Lightbulb,
  MapPin,
  Mail,
  Phone,
  FileText,
  UserCheck
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// =============================================================================
// CENTRALIZED SOURCE OF TRUTH (VERIFIED COMPANY DATA OBJECT)
// =============================================================================
export const VERIFIED_COMPANY_DATA = {
  companyName: "CÔNG TY TNHH TÔN THÉP KIM NGÂN",
  brandNameEn: "KIM NGAN STEEL",
  address: "262 Đường DT742, Khu Phố 1, Phường Vĩnh Tân, TP Hồ Chí Minh, Việt Nam",
  taxCode: "3702871412",
  email: "tonthepkimngan20@gmail.com",
  phone: "0707 079 900",
  legalRep: "Trần Thị Ngọc Hương",
  statement:
    "Công ty TNHH Tôn Thép Kim Ngân đầu tư hệ thống máy móc, phương tiện vận tải và trang thiết bị phục vụ hoạt động sản xuất xà gồ, thép ống, tôn và các sản phẩm thép khác. Trong quá trình hoạt động, Kim Ngân đã cung cấp nhiều sản phẩm tôn thép cho các dự án trên thị trường, đồng thời mang đến các giải pháp giúp khách hàng tiết kiệm thời gian và chi phí.",
  categories: [
    "Tôn cuộn",
    "Tôn lớp",
    "Thép hộp",
    "Thép ống",
    "Thép hình",
    "Thép xây dựng",
    "Xà gồ",
  ],
  brands: ["Tôn Đông Á", "Thép Việt Nhật", "Hòa Phát", "Pomina", "Tiến Lợi"],
};

// 0. DISTRIBUTED BRANDS WITH LOGOS
const VERIFIED_DISTRIBUTED_BRANDS = [
  { name: "Tôn Đông Á", logo: "/partners/ton-dong-a.png" },
  { name: "Thép Việt Nhật", logo: "/partners/thep-viet-nhat.png" },
  { name: "Hòa Phát", logo: "/partners/hoa-phat.png" },
  { name: "Pomina", logo: "/partners/pomina.png" },
  { name: "Tiến Lợi", logo: "/partners/tien-loi-group.png" },
];

// 1. OPERATIONAL STRENGTHS DATA (4 NON-NUMERIC CAPABILITY BLOCKS)
const OPERATIONAL_STRENGTHS = [
  {
    title: "MÁY MÓC CHUYÊN DỤNG",
    desc: "Trang thiết bị phục vụ sản xuất và kinh doanh tôn, xà gồ, thép ống và các sản phẩm thép.",
    icon: Cog,
  },
  {
    title: "PHƯƠNG TIỆN VẬN TẢI",
    desc: "Chủ động phương tiện phục vụ giao nhận hàng hóa và đáp ứng nhu cầu của khách hàng.",
    icon: Truck,
  },
  {
    title: "DANH MỤC ĐA DẠNG",
    desc: "Tôn cuộn, tôn lớp, thép hộp, thép ống, thép hình, thép xây dựng và xà gồ.",
    icon: Layers,
  },
  {
    title: "GIẢI PHÁP TỐI ƯU",
    desc: "Hỗ trợ khách hàng tiết kiệm thời gian, chi phí và lựa chọn sản phẩm phù hợp với nhu cầu.",
    icon: ShieldCheck,
  },
];

// 2. PRODUCT CATEGORY SHORTCUTS DATA (EXACTLY 7 VERIFIED CATEGORIES)
const PRODUCT_CATEGORIES = [
  { name: "Tôn cuộn", icon: Layers },
  { name: "Tôn lớp", icon: Layers3 },
  { name: "Xà gồ", icon: Cog },
  { name: "Thép hộp", icon: Box },
  { name: "Thép ống", icon: CircleDot },
  { name: "Thép hình", icon: Building2 },
  { name: "Thép xây dựng", icon: Wrench },
];

// 3. ORDER-SERVICE PROCESS (6 VERIFIED STEPS - ZERO UNSUPPORTED CLAIMS)
const ORDER_PROCESS_STEPS = [
  {
    num: "01",
    title: "TIẾP NHẬN NHU CẦU",
    desc: "Tiếp nhận chủng loại sản phẩm, quy cách, số lượng và yêu cầu giao hàng từ khách hàng.",
    img: "/factory_story/1.svg",
  },
  {
    num: "02",
    title: "TƯ VẤN SẢN PHẨM",
    desc: "Tư vấn lựa chọn tôn, thép và xà gồ phù hợp với nhu cầu sử dụng và ngân sách.",
    img: "/factory_story/2.svg",
  },
  {
    num: "03",
    title: "CHUẨN BỊ NGUỒN HÀNG",
    desc: "Kiểm tra nguồn sản phẩm, chủng loại và khả năng đáp ứng đơn hàng.",
    img: "/factory_story/3.svg",
  },
  {
    num: "04",
    title: "GIA CÔNG THEO YÊU CẦU",
    desc: "Thực hiện gia công các sản phẩm phù hợp với quy cách và nhu cầu thực tế của khách hàng.",
    img: "/factory_story/4.svg",
  },
  {
    num: "05",
    title: "KIỂM TRA TRƯỚC GIAO HÀNG",
    desc: "Kiểm tra số lượng, chủng loại và tình trạng sản phẩm trước khi bàn giao.",
    img: "/factory_story/5.svg",
  },
  {
    num: "06",
    title: "VẬN CHUYỂN VÀ BÀN GIAO",
    desc: "Tổ chức giao nhận hàng hóa tới địa điểm theo thỏa thuận với khách hàng.",
    img: "/factory_story/6.svg",
  },
];

// 4. BRAND COMMITMENTS (GIÁ TRỊ VẬN HÀNH)
const BRAND_COMMITMENTS = [
  {
    title: "CHẤT LƯỢNG",
    desc: "Kim Ngân xem việc đảm bảo chất lượng là mục tiêu chiến lược trong quá trình phát triển.",
    icon: Award,
  },
  {
    title: "CHUYÊN NGHIỆP",
    desc: "Đội ngũ sản xuất và kinh doanh luôn sẵn sàng hỗ trợ, giải đáp nhu cầu của khách hàng.",
    icon: Users,
  },
  {
    title: "NỖ LỰC",
    desc: "Tập thể Kim Ngân không ngừng củng cố năng lực để đồng hành cùng khách hàng và đối tác.",
    icon: Target,
  },
  {
    title: "SÁNG TẠO",
    desc: "Liên tục tìm tòi, cải tiến và nâng cao chất lượng sản phẩm cùng như khả năng phục vụ.",
    icon: Lightbulb,
  },
];

export default function FactoryPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".kn-fact-hero-left", {
        opacity: 0,
        x: -25,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".kn-fact-reveal").forEach((el) => {
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

  return (
    <div
      ref={rootRef}
      className="antra-theme min-h-screen bg-[#FAF9F5] text-[#1A1918] selection:bg-[#1A1918] selection:text-[#F7F7F4] select-none font-sans"
    >
      {/* =========================================================================
          1. HERO SHOWCASE SECTION (VERIFIED SOURCE OF TRUTH)
         ========================================================================= */}
      <section className="relative pt-20 sm:pt-36 pb-10 sm:pb-16 px-4 sm:px-6 md:px-14 bg-[#FAF9F5] overflow-hidden">
        <div className="max-w-[1600px] mx-auto space-y-8 sm:space-y-12">
          
          {/* Main Hero Split Container */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center min-h-[420px] sm:min-h-[560px]">
            
            {/* Left Content Side */}
            <div className="kn-fact-hero-left lg:col-span-6 z-10 py-6 pr-0 lg:pr-8 space-y-5">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase">
                <span>03 / NĂNG LỰC SẢN XUẤT</span>
              </div>

              {/* Verified Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] font-sans font-bold uppercase tracking-tight text-[#1A1918] leading-[1.12]">
                NĂNG LỰC GIA CÔNG<br />
                VÀ PHÂN PHỐI TÔN THÉP
              </h1>

              {/* Verified Supporting Line */}
              <div className="text-xs sm:text-sm font-sans font-bold text-[#C28E5C] tracking-wide pt-0.5">
                Đầu tư máy móc, phương tiện vận tải và trang thiết bị chuyên dụng phục vụ sản xuất, kinh doanh tôn thép.
              </div>

              {/* Gold Accent Line */}
              <div className="w-14 h-[2px] bg-[#C28E5C]/60 my-3" />

              {/* Verified Body Copy */}
              <p className="text-xs sm:text-sm text-[#524D4A] font-sans leading-relaxed text-justify max-w-full sm:max-w-xl">
                {VERIFIED_COMPANY_DATA.statement}
              </p>

            </div>

            {/* Right Factory Image Side with Soft Gentle Gradient Mask */}
            <div className="lg:col-span-6 relative w-full h-[280px] sm:h-[420px] lg:h-[540px] rounded-xl overflow-hidden shadow-sm border border-[#E2DDD3]/60">
              <img
                src="/model-nangluc.svg"
                alt="Nhà Máy Tôn Kim Ngân - KIM NGAN STEEL"
                className="w-full h-full object-cover object-center sm:object-right filter contrast-[1.03]"
              />
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/60 to-transparent pointer-events-none" />
            </div>

          </div>

          {/* ===================================================================
              2. OPERATIONAL STRENGTHS (4 NON-NUMERIC CAPABILITY BLOCKS)
             =================================================================== */}
          <div className="kn-fact-reveal space-y-6">
            <div className="border-b border-[#1A1918]/12 pb-3">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase">
                NĂNG LỰC VẬN HÀNH
              </span>
            </div>

            <div className="bg-white border border-[#E2DDD3] rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:divide-x lg:divide-[#E2DDD3]">
                {OPERATIONAL_STRENGTHS.map((block, idx) => {
                  const IconComp = block.icon;
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col justify-between space-y-3 ${
                        idx > 0 ? "lg:pl-8" : ""
                      }`}
                    >
                      <div className="w-11 h-11 rounded-full border border-[#C28E5C]/30 bg-[#FAF9F5] text-[#C28E5C] flex items-center justify-center shrink-0">
                        <IconComp size={20} strokeWidth={1.5} />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-sans text-base sm:text-lg font-bold uppercase text-[#1A1918] tracking-tight">
                          {block.title}
                        </h3>
                        <p className="text-xs text-[#524D4A] font-sans leading-relaxed pt-0.5">
                          {block.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===================================================================
              3. PRODUCT CAPABILITY CATEGORIES (EXACTLY 7 CATEGORIES)
             =================================================================== */}
          <div className="kn-fact-reveal space-y-6 pt-2">
            <div className="flex items-center justify-center gap-4">
              <span className="h-[1px] bg-[#1A1918]/15 flex-1 max-w-[240px] hidden sm:block" />
              <h2 className="text-xs font-mono font-bold tracking-[0.2em] text-[#C28E5C] uppercase text-center">
                DANH MỤC NĂNG LỰC SẢN XUẤT &amp; PHÂN PHỐI
              </h2>
              <span className="h-[1px] bg-[#1A1918]/15 flex-1 max-w-[240px] hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
              {PRODUCT_CATEGORIES.map((cat, idx) => {
                const IconComp = cat.icon;
                return (
                  <Link
                    key={idx}
                    href="/san-pham"
                    className="bg-white border border-[#E2DDD3] rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2.5 hover:border-[#C28E5C] hover:shadow-sm transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#FAF9F5] text-[#C28E5C] flex items-center justify-center group-hover:bg-[#C28E5C] group-hover:text-white transition-colors duration-300">
                      <IconComp size={18} strokeWidth={1.5} />
                    </div>

                    <span className="text-xs font-sans font-bold text-[#1A1918] group-hover:text-[#C28E5C] transition-colors">
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. ORDER-SERVICE PROCESS SECTION (6 VERIFIED STEPS)
         ========================================================================= */}
      <section className="kn-fact-reveal py-16 sm:py-24 px-6 md:px-14 bg-[#FAF9F5] border-t border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto space-y-10">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1A1918]/12 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase block">
                QUY TRÌNH 6 BƯỚC
              </span>
              <h2 className="text-2xl sm:text-4xl font-sans font-bold uppercase tracking-tight text-[#1A1918]">
                QUY TRÌNH PHỤC VỤ ĐƠN HÀNG
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#524D4A] font-sans max-w-md leading-relaxed">
              Quy trình phục vụ đơn hàng chuyên nghiệp, minh bạch và đảm bảo giao nhận hàng hóa tới khách hàng đúng thỏa thuận.
            </p>
          </div>

          {/* 6 Step Visual Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ORDER_PROCESS_STEPS.map((step) => (
              <div
                key={step.num}
                className="bg-white border border-[#E2DDD3] rounded-xl p-6 flex flex-col justify-between space-y-5 shadow-sm hover:border-[#C28E5C] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between border-b border-[#1A1918]/08 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-[#C28E5C] border border-[#C28E5C]/30 px-2.5 py-0.5 rounded-md bg-[#FAF9F5]">
                      {step.num}
                    </span>
                    <h3 className="text-sm sm:text-base font-sans font-bold text-[#1A1918] uppercase tracking-tight">
                      {step.title}
                    </h3>
                  </div>

                  <span className="text-[#C28E5C] group-hover:translate-x-1 transition-transform">
                    <ChevronRight size={16} />
                  </span>
                </div>

                <div className="relative w-full aspect-[16/10] bg-[#F7F5EE] border border-[#E2DDD3]/60 rounded-lg p-3 flex items-center justify-center overflow-hidden">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-contain filter contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <p className="text-xs text-[#524D4A] font-sans leading-relaxed pt-1">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. BRAND COMMITMENTS (GIÁ TRỊ VẬN HÀNH)
         ========================================================================= */}
      <section className="kn-fact-reveal py-16 sm:py-20 px-6 md:px-14 bg-[#FAF9F5] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          <div className="border-b border-[#1A1918]/12 pb-3">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase">
              CAM KẾT THƯƠNG HIỆU
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-bold uppercase tracking-tight text-[#1A1918] pt-1">
              GIÁ TRỊ VẬN HÀNH
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_COMMITMENTS.map((c, idx) => {
              const IconComp = c.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E2DDD3] rounded-xl p-6 space-y-4 shadow-sm hover:border-[#C28E5C] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FAF9F5] text-[#C28E5C] border border-[#C28E5C]/30 flex items-center justify-center group-hover:bg-[#C28E5C] group-hover:text-white transition-colors duration-300">
                    <IconComp size={18} strokeWidth={1.5} />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-sans text-base sm:text-lg font-bold uppercase tracking-tight text-[#1A1918]">
                      {c.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#524D4A] font-sans leading-relaxed pt-1">
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>



      {/* =========================================================================
          6. DISTRIBUTED BRANDS (CÁC THƯƠNG HIỆU PHÂN PHỐI CHÍNH - LOGO DISPLAY)
         ========================================================================= */}
      <section className="kn-fact-reveal py-16 sm:py-20 px-6 md:px-14 bg-[#FAF9F5] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          <div className="space-y-2 border-b border-[#1A1918]/12 pb-4">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase block">
              ĐỐI TÁC CUNG ỨNG
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-bold uppercase tracking-tight text-[#1A1918]">
              CÁC THƯƠNG HIỆU PHÂN PHỐI CHÍNH
            </h2>
            <p className="text-xs sm:text-sm text-[#524D4A] font-sans pt-1">
              Kim Ngân phân phối nhiều dòng sản phẩm tôn thép từ các thương hiệu uy tín trên thị trường Việt Nam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {VERIFIED_DISTRIBUTED_BRANDS.map((brand, bIdx) => (
              <div
                key={bIdx}
                className="bg-white border border-[#E2DDD3] rounded-xl p-5 text-center flex flex-col items-center justify-between space-y-3 hover:border-[#C28E5C] shadow-sm hover:shadow-md transition-all duration-300 group min-h-[120px]"
              >
                <div className="h-10 sm:h-12 w-full flex items-center justify-center p-1 my-auto">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={`max-h-full object-contain filter contrast-[1.03] group-hover:scale-105 transition-transform duration-300 ${brand.logo.includes("ton-dong-a") || brand.logo.includes("hoa-phat") || brand.logo.includes("pomina") || brand.logo.includes("tien-loi-group") ? "max-w-[150px]" : "max-w-[130px]"}`}
                  />
                </div>
                <span className="font-sans font-bold text-xs sm:text-sm text-[#1A1918] group-hover:text-[#C28E5C] transition-colors block pt-1 border-t border-[#1A1918]/08 w-full">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. FINAL CONSULTATION CTA BANNER
         ========================================================================= */}
      <section className="kn-fact-reveal py-16 sm:py-24 px-6 md:px-14 bg-[#FAF9F5]">
        <div className="max-w-[1600px] mx-auto bg-[#F4F1EA] border border-[#E2DDD3] rounded-2xl p-8 sm:p-14 shadow-sm text-center relative overflow-hidden">
          
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#1A1918_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-bold uppercase tracking-tight text-[#1A1918] leading-tight">
              CẦN TƯ VẤN SẢN PHẨM<br />
              HOẶC NHẬN BÁO GIÁ?
            </h2>

            <p className="text-xs sm:text-sm text-[#524D4A] font-sans max-w-xl mx-auto leading-relaxed">
              Gửi nhu cầu về chủng loại, số lượng và quy cách để Kim Ngân hỗ trợ tư vấn sản phẩm phù hợp.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/lien-he"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1A1918] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#C28E5C] transition-colors shadow-sm text-center"
              >
                LIÊN HỆ TƯ VẤN
              </Link>

              <Link
                href="/san-pham"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white border border-[#1A1918]/20 text-[#1A1918] font-mono text-xs font-bold uppercase tracking-wider hover:border-[#1A1918] transition-colors text-center"
              >
                XEM DANH MỤC SẢN PHẨM
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. CONTACT INFORMATION SUMMARY CARD
         ========================================================================= */}
      <section className="kn-fact-reveal pb-20 sm:pb-28 px-6 md:px-14 bg-[#FAF9F5]">
        <div className="max-w-[1600px] mx-auto bg-white border border-[#E2DDD3] rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-[#1A1918]/10 pb-3">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#C28E5C] uppercase">
              THÔNG TIN DOANH NGHIỆP TỔNG HỢP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-[#524D4A] font-sans">
            <div className="flex items-start gap-3">
              <Building2 size={18} className="text-[#C28E5C] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1A1918] block pb-0.5">Tên doanh nghiệp:</span>
                <span>{VERIFIED_COMPANY_DATA.companyName}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#C28E5C] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1A1918] block pb-0.5">Địa chỉ trụ sở chính:</span>
                <span>{VERIFIED_COMPANY_DATA.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText size={18} className="text-[#C28E5C] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1A1918] block pb-0.5">Mã số thuế:</span>
                <span className="font-mono font-bold text-[#1A1918]">{VERIFIED_COMPANY_DATA.taxCode}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={18} className="text-[#C28E5C] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1A1918] block pb-0.5">Điện thoại liên hệ:</span>
                <span className="font-mono font-bold text-[#1A1918]">{VERIFIED_COMPANY_DATA.phone}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={18} className="text-[#C28E5C] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1A1918] block pb-0.5">Email chính thức:</span>
                <span className="font-mono">{VERIFIED_COMPANY_DATA.email}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <UserCheck size={18} className="text-[#C28E5C] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1A1918] block pb-0.5">Người đại diện pháp luật:</span>
                <span>{VERIFIED_COMPANY_DATA.legalRep}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
