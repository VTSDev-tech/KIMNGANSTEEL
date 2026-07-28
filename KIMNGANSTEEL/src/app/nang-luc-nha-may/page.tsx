"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { SiteFooter } from "@/components/antra/SiteFooter";
import { ArrowRight, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// 4 CORE CAPABILITIES
const CAPABILITIES = [
  { num: "15.000 m²", label: "DIỆN TÍCH NHÀ MÁY", desc: "Quy mô nhà xưởng gia công khép kín tại Phú Yên & Bình Dương." },
  { num: "06 Dây Chuyền", label: "CÁN TÔN CNC TỰ ĐỘNG", desc: "Hệ thống máy cán tôn sóng vuông, sóng tròn, xà gồ C/Z tự động." },
  { num: "500+ Tấn", label: "CÔNG SUẤT / THÁNG", desc: "Sản xuất liên tục 24/7 đáp ứng tiến độ các đại dự án." },
  { num: "24 Hours", label: "GIAO VẬN TẬN NƠI", desc: "Vận chuyển trực tiếp bằng đội xe tải chuyên dụng tới công trình." },
];

// 6 PRODUCTION WORKFLOW STEPS
const FACTORY_STEPS = [
  {
    num: "01",
    title: "Nguồn phôi thép chính hãng 100%",
    subtitle: "Tôn Đông Á · Hoa Sen · Hòa Phát",
    desc: "Chủ động nguồn phôi thép mạ kẽm nguyên cuộn chính hãng với đầy đủ chứng nhận nguồn gốc CO/CQ.",
    img: "/factory_story/1.svg",
  },
  {
    num: "02",
    title: "Kiểm tra độ dày zem & tiêu chuẩn mạ",
    subtitle: "Đo đạc chỉ số AZ & độ bền màng sơn",
    desc: "QC kiểm tra độ dày thực tế bằng thiết bị chuyên dụng, đảm bảo đúng quy cách zem trước khi sản xuất.",
    img: "/factory_story/2.svg",
  },
  {
    num: "03",
    title: "Gia công cán tôn CNC tự động",
    subtitle: "Lập trình chính xác theo bản vẽ",
    desc: "Cán tôn sóng vuông, sóng tròn, Seamlock điều khiển tự động bằng PLC CNC, cắt chiều dài chuẩn xác.",
    img: "/factory_story/3.svg",
  },
  {
    num: "04",
    title: "Chấn & đột lỗ xà gồ C/Z tự động",
    subtitle: "Tạo biên dạng xà gồ cường độ cao",
    desc: "Tự động đột lỗ theo đúng khoảng cách bản vẽ, giúp thi công lắp dựng khung kèo nhanh chóng.",
    img: "/factory_story/4.svg",
  },
  {
    num: "05",
    title: "Nghiệm thu QC & dán màng bảo vệ",
    subtitle: "Đồng bộ tem nhãn & dán màng PE",
    desc: "Kiểm tra màng sơn, dán tem thông số kỹ thuật và bọc màng PE chống trầy xước trong vận chuyển.",
    img: "/factory_story/5.svg",
  },
  {
    num: "06",
    title: "Giao vận 24h tới tận chân công trình",
    subtitle: "Đội xe tải trọng lớn giao vận thần tốc",
    desc: "Thành phẩm được đóng gói an toàn và giao tận chân công trình đúng số lượng và tiến độ 24h.",
    img: "/factory_story/6.svg",
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
      gsap.fromTo(
        ".kn-fact-opening-el",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" }
      );

      gsap.utils.toArray<HTMLElement>(".kn-fact-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
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
      className="antra-theme min-h-screen bg-[#F7F7F4] text-[#1A1918] selection:bg-[#1A1918] selection:text-[#F7F7F4] select-none font-sans"
    >
      {/* =========================================================================
          1. HERO SECTION — CLEAN MINIMALIST HEADER
         ========================================================================= */}
      <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 px-6 md:px-14 bg-[#F7F7F4] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto space-y-6">
          
          <div className="kn-fact-opening-el inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#1A1918]/[0.05] border border-[#1A1918]/12 text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#C28E5C] animate-pulse" />
            <span>03 / NĂNG LỰC SẢN XUẤT</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline">
            <div className="lg:col-span-7 space-y-3">
              <h1 className="kn-fact-opening-el text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1918] leading-[1.15]">
                Nhà máy cán tôn CNC &amp; <br />
                Kho vật liệu 15.000m²
              </h1>
              <p className="kn-fact-opening-el text-sm sm:text-base font-mono text-[#C28E5C] font-semibold">
                Đại lý chính thức Tôn Đông Á · Thương Hiệu Quốc Gia
              </p>
            </div>

            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-[#1A1918]/15 space-y-3">
              <p className="kn-fact-opening-el text-sm sm:text-base text-[#524D4A] font-sans leading-relaxed">
                Nhà máy trang bị 06 dây chuyền cán tôn CNC tự động khép kín, đáp ứng quy chuẩn kiểm định ISO 9001:2015 và tiến độ giao vận 24h bằng đội xe tải chuyên dụng tới tận chân công trình.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. REAL STOREFRONT PHOTO (PURE UNTOUCHED REAL IMAGE)
         ========================================================================= */}
      <section className="relative w-full bg-[#F7F7F4] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-14 py-8 md:py-12">
          <div className="relative w-full overflow-hidden border border-[#1A1918]/15 bg-[#ECE8DE] shadow-md">
            <img
              src="/nha-may-ton-kim-ngan-storefront.jpg"
              alt="Hình ảnh thực tế Nhà Máy Tôn Kim Ngân"
              className="w-full h-auto object-cover filter contrast-[1.03]"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CAPACITY METRICS GRID (4 CLEAN ARCHITECTURAL CARDS)
         ========================================================================= */}
      <section className="py-16 sm:py-24 px-6 md:px-14 bg-[#ECE8DE] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto space-y-10">
          
          <div className="flex items-center justify-between border-b border-[#1A1918]/12 pb-4">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase">
              04 / THÔNG SỐ NĂNG LỰC
            </span>
            <span className="text-xs font-mono text-[#524D4A] tracking-wider uppercase hidden sm:inline-block">
              CAPACITY METRICS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES.map((c) => (
              <div
                key={c.label}
                className="kn-fact-card bg-white p-6 border border-[#1A1918]/12 space-y-3 shadow-sm hover:border-[#1A1918] transition-colors"
              >
                <span className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-[#1A1918] block">
                  {c.num}
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-[#C28E5C] uppercase block">
                  {c.label}
                </span>
                <p className="text-xs text-[#524D4A] leading-relaxed pt-1">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. 6-STEP PRODUCTION WORKFLOW (CLEAN 3-COLUMN VISUAL GRID)
         ========================================================================= */}
      <section className="py-20 md:py-28 px-6 md:px-14 bg-[#F7F7F4] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto space-y-12">
          
          <div className="flex items-center justify-between border-b border-[#1A1918]/12 pb-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase block mb-1">
                05 / QUY TRÌNH SẢN XUẤT 6 BƯỚC
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#1A1918]">
                CHUẨN KIỂM ĐỊNH ISO 9001:2015
              </h2>
            </div>
            <span className="text-xs font-mono text-[#524D4A] tracking-wider uppercase hidden sm:inline-block">
              QUALITY CONTROL WORKFLOW
            </span>
          </div>

          {/* Clean 3-Column Visual Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACTORY_STEPS.map((step) => (
              <div
                key={step.num}
                className="kn-fact-card bg-white border border-[#1A1918]/15 p-6 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md hover:border-[#1A1918] transition-all"
              >
                {/* Step Header */}
                <div className="space-y-2 pb-3 border-b border-[#1A1918]/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#C28E5C] uppercase">
                      BƯỚC {step.num} / 06
                    </span>
                    <span className="text-[10px] font-mono text-[#8E857B] uppercase">
                      {step.subtitle}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1A1918] leading-snug">
                    {step.title}
                  </h3>
                </div>

                {/* Step Image Graphic */}
                <div className="relative w-full aspect-[4/3] bg-[#F7F7F4] border border-[#1A1918]/08 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-contain filter contrast-[1.03]"
                  />
                </div>

                {/* Step Description */}
                <p className="text-xs text-[#524D4A] font-sans leading-relaxed pt-1">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. CLOSING CTA SECTION
         ========================================================================= */}
      <section className="py-24 sm:py-32 px-6 md:px-14 bg-[#F7F7F4] text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#1A1918] leading-tight">
            Tham quan nhà máy hoặc nhận báo giá dự án?
          </h2>

          <p className="text-base sm:text-lg text-[#524D4A] font-sans max-w-2xl mx-auto">
            Nhà Máy Tôn Kim Ngân luôn sẵn sàng tiếp đón đại diện nhà thầu, chủ đầu tư thăm quan trực tiếp quy trình cán tôn tại nhà máy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/lien-he"
              className="w-full sm:w-auto px-8 py-4 bg-[#1A1918] text-[#F7F7F4] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#C28E5C] transition-all shadow-md text-center"
            >
              Liên hệ tư vấn kỹ thuật
            </Link>

            <Link
              href="/san-pham"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#1A1918] border border-[#1A1918] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#1A1918] hover:text-white transition-all text-center"
            >
              Xem danh mục sản phẩm
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}
