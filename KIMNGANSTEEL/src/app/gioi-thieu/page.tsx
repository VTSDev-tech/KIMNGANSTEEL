"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { SiteFooter } from "@/components/antra/SiteFooter";
import { ArrowRight, ChevronRight, X, Maximize2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// =============================================================================
// DATA ARCHITECTURE
// =============================================================================

// 3. STICKY BRAND STORY CHAPTERS
const BRAND_STORY_CHAPTERS = [
  {
    number: "01",
    label: "KHỞI ĐẦU",
    title: "Từ một đơn vị cung ứng vật liệu",
    subtitle: "Xây dựng móng vững chắc từ lòng tin của những công trình đầu tiên",
    desc: "Khởi đầu từ một doanh nghiệp thương mại nhỏ cung ứng tôn lợp và thép mạ cho các nhà thầu địa phương, Kim Ngân Steel đặt sự minh bạch về nguồn gốc và độ dày vật liệu làm nguyên tắc sống còn.",
    image: "/nha-may-ton-kim-ngan-storefront.jpg",
    caption: "CƠ SỞ TRỤ SỞ & NHÀ MÁY THỰC TẾ KIM NGÂN STEEL · PHÚ YÊN",
  },
  {
    number: "02",
    label: "MỞ RỘNG",
    title: "Đầu tư năng lực gia công, kho vận và nguồn hàng",
    subtitle: "Chủ động quy trình sản xuất và sở hữu hệ thống máy cán tôn CNC",
    desc: "Đứng trước nhu cầu khắt khe của các công trình công nghiệp quy mô lớn, chúng tôi mở rộng quy mô nhà máy cán tôn tự động, đầu tư dàn máy chấn xà gồ C/Z và thiết lập hợp tác chiến lược trực tiếp với các nhà máy sản xuất tôn thép hàng đầu Việt Nam.",
    image: "/steel_coil_monograph.jpg",
    caption: "HỆ THỐNG NGUỒN HÀNG THÉP MẠ KẼM CHÍNH HÃNG NGUYÊN CUỘN",
  },
  {
    number: "03",
    label: "HÔM NAY",
    title: "Phục vụ nhà thầu, chủ đầu tư và hệ thống đại lý",
    subtitle: "Vận hành chuỗi giao vận 24h tới tận chân công trình toàn quốc",
    desc: "Hôm nay, Kim Ngân Steel tự hào là đối tác chiến lược tin cậy của hàng trăm nhà thầu xây dựng, xưởng gia công và đại lý vật liệu. Với tốc độ giao vận 24h và chứng nhận chất lượng ISO, chúng tôi cam kết bảo chứng độ bền cho mọi công trình.",
    image: "/nha_xuong.png",
    caption: "NHÀ MÁY NĂNG LỰC SẢN XUẤT CÁN TÔN CNC QUY MÔ 15.000 M²",
  },
];

// 4. FINANCIAL CREDIBILITY METRICS
const FINANCIAL_METRICS = [
  {
    value: "720,2",
    unit: "TỶ VNĐ",
    label: "Doanh thu năm 2024",
    subtext: "Tăng trưởng bền vững +86% giai đoạn 2022–2024",
  },
  {
    value: "3,81",
    unit: "TỶ VNĐ",
    label: "Lợi nhuận trước thuế",
    subtext: "Minh bạch năng lực tài chính & nghĩa vụ thuế",
  },
  {
    value: "3,05",
    unit: "TỶ VNĐ",
    label: "Lợi nhuận sau thuế",
    subtext: "Bảo chứng dòng tiền & năng lực thanh khoản",
  },
];

// 5. TIMELINE MILESTONES DATA
const MILESTONES = [
  {
    year: "2011",
    title: "Khởi đầu",
    subtitle: "Cung ứng vật liệu tôn thép thương mại",
    desc: "Thành lập đơn vị cung ứng vật liệu tôn mạ kẽm chính hãng cho các nhà thầu dân dụng và xưởng cơ khí.",
    image: "/nha-may-ton-kim-ngan-storefront.jpg",
    tag: "KHỞI TẠO UY TÍN",
  },
  {
    year: "2018",
    title: "Mở rộng năng lực",
    subtitle: "Đầu tư nhà máy cán tôn CNC tự động",
    desc: "Trang bị dây chuyền máy cán tôn sóng vuông, sóng tròn và máy chấn xà gồ C/Z tự động hiện đại.",
    image: "/steel_coil_monograph.jpg",
    tag: "ĐẦU TƯ CÔNG NGHỆ",
  },
  {
    year: "2022",
    title: "Đối tác chiến lược",
    subtitle: "Ủy quyền Đại lý cấp 1 chính thức",
    desc: "Chính thức ký kết trở thành Đại lý cấp 1 ủy quyền phân phối tôn thép từ Tập đoàn Tôn Đông Á, Hoa Sen, Hòa Phát.",
    image: "/nha_xuong.png",
    tag: "ĐẠI LÝ CHÍNH THỨC",
  },
  {
    year: "2026",
    title: "Tự động hóa và số hóa",
    subtitle: "Chuẩn hóa ISO 9001:2015 & Giao vận 24h",
    desc: "Số hóa quy trình đặt hàng, quản trị kho vận tự động và cam kết giao hàng trong 24h tới tận chân công trình.",
    image: "/hero-corrugated-sheet-cutout.png",
    tag: "SỐ HÓA & GIAO VẬN 24H",
  },
];

// 6. LEGAL AND CERTIFICATIONS DATA (Section 6)
const CERTIFICATES = [
  {
    id: "giay-phep-kd",
    seqNum: "01",
    title: "Giấy chứng nhận đăng ký doanh nghiệp",
    issuer: "Sở Kế hoạch & Đầu tư tỉnh Bình Dương",
    meta: "2 trang",
    images: ["/certificates/giayto-1.svg", "/certificates/giayto-2.svg"],
    tag: "PHÁP LÝ DOANH NGHIỆP (2 TRANG)",
  },
  {
    id: "dai-ly-chinh-thuc",
    seqNum: "02",
    title: "Giấy chứng nhận đại lý chính thức",
    issuer: "Tôn Đông Á",
    meta: "1 trang",
    images: ["/certificates/giay-chung-nhan-dai-ly-chinh-thuc.svg"],
    tag: "ỦY QUYỀN PHÂN PHỐI CHÍNH THỨC",
  },
  {
    id: "nha-phan-phoi",
    seqNum: "03",
    title: "Giấy chứng nhận nhà phân phối",
    issuer: "Thép Việt Nhật",
    meta: "Chứng nhận đối tác",
    images: ["/certificates/giay-chung-nhan-nha-phan-phoi.svg"],
    tag: "CHỨNG NHẬN ĐỐI TÁC",
  },
];

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  
  // Interactive States
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const [activeCertPageIndex, setActiveCertPageIndex] = useState(0);
  const [selectedCertModal, setSelectedCertModal] = useState<{ title: string; images: string[] } | null>(null);

  // ---------------------------------------------------------------------------
  // LIGHTBOX ACCESSIBLE SCROLL LOCK WITH CAPTURE-PHASE WHEEL INTERCEPTOR
  // ---------------------------------------------------------------------------
  useEffect(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, []);

  useEffect(() => {
    if (selectedCertModal) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.getAll().forEach((st) => st.disable(false));
      }

      const preventOutsideWheel = (e: WheelEvent) => {
        const scrollArea = document.getElementById("cert-modal-scroll-area");
        if (scrollArea && scrollArea.contains(e.target as Node)) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      };

      const preventOutsideTouch = (e: TouchEvent) => {
        const scrollArea = document.getElementById("cert-modal-scroll-area");
        if (scrollArea && scrollArea.contains(e.target as Node)) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      };

      window.addEventListener("wheel", preventOutsideWheel, { capture: true, passive: false });
      window.addEventListener("touchmove", preventOutsideTouch, { capture: true, passive: false });

      return () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        window.removeEventListener("wheel", preventOutsideWheel, { capture: true } as any);
        window.removeEventListener("touchmove", preventOutsideTouch, { capture: true } as any);

        if (typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.getAll().forEach((st) => st.enable(false));
          ScrollTrigger.refresh();
        }
      };
    }
  }, [selectedCertModal]);

  // ---------------------------------------------------------------------------
  // GSAP RESTRAINED SCROLL ANIMATION & STICKY STORYTELLING OBSERVER
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // 1. Opening Section Fade-in
      gsap.fromTo(
        ".kn-about-opening-el",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power2.out",
        }
      );

      // 2. Cinematic Factory Image Subtle Scale Transition (1.04 -> 1.0)
      const factoryImg = root.querySelector(".kn-about-factory-img img");
      if (factoryImg) {
        gsap.fromTo(
          factoryImg,
          { scale: 1.04 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".kn-about-factory-img",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // 3. Sticky Storytelling Chapter Trigger Observer
      const storyTriggers = root.querySelectorAll(".kn-story-chapter-trigger");
      storyTriggers.forEach((chapterEl, idx) => {
        ScrollTrigger.create({
          trigger: chapterEl,
          start: "top 60%",
          end: "bottom 60%",
          onEnter: () => setActiveStoryIndex(idx),
          onEnterBack: () => setActiveStoryIndex(idx),
        });
      });

      // 4. Section Subtle Reveal
      gsap.utils.toArray<HTMLElement>(".kn-about-section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const currentCert = CERTIFICATES[activeCertIndex];

  return (
    <div
      ref={rootRef}
      className="antra-theme min-h-screen bg-[#F7F7F4] text-[#1A1918] selection:bg-[#1A1918] selection:text-[#F7F7F4] select-none font-sans"
    >
      {/* =========================================================================
          1. OPENING SECTION — INDUSTRIAL EDITORIAL STATEMENT
         ========================================================================= */}
      <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 px-6 md:px-14 bg-[#F7F7F4] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto space-y-6">
          
          {/* Eyebrow */}
          <div className="kn-about-opening-el inline-flex items-center gap-3 text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#C28E5C]" />
            <span>01 / CÂU CHUYỆN KIM NGÂN</span>
          </div>

          {/* Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline">
            <div className="lg:col-span-8 space-y-2">
              <h1 className="kn-about-opening-el text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#1A1918] leading-[1.1]">
                VỮNG TỪ VẬT LIỆU. <br />
                BỀN CÙNG CÔNG TRÌNH.
              </h1>
              <p className="kn-about-opening-el text-xs sm:text-sm font-mono text-[#C28E5C] tracking-widest lowercase pt-1">
                crafted with precision &amp; architectural integrity.
              </p>
            </div>

            <div className="lg:col-span-4 lg:pl-6 lg:border-l lg:border-[#1A1918]/15 space-y-4">
              <p className="kn-about-opening-el text-sm sm:text-base text-[#524D4A] font-sans leading-relaxed font-normal">
                Kim Ngân Steel gia công cán tôn và phân phối vật liệu thép cho nhà thầu, nhà xưởng và hệ thống đại lý trên toàn quốc.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. FACTORY IMAGE — CINEMATIC FULL-WIDTH EDITORIAL BANNER (21:9)
         ========================================================================= */}
      <section className="relative w-full bg-[#F7F7F4] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-14 py-8 md:py-12">
          
          {/* 21:9 Wide Editorial Image Container */}
          <div className="kn-about-factory-img relative w-full aspect-[21/9] min-h-[320px] max-h-[640px] overflow-hidden rounded-none border border-[#1A1918]/15 bg-[#1A1918]">
            <img
              src="/nha-may-ton-kim-ngan-storefront.jpg"
              alt="Nhà Máy Tôn Kim Ngân - Đại lý chính thức Tôn Đông Á"
              className="w-full h-full object-cover filter contrast-[1.03]"
            />
            
            {/* Minimalist Lower Edge Caption */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-3 bg-[#1A1918]/70 backdrop-blur-md px-4 py-2 text-[#F7F7F4] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C28E5C]" />
              <span className="font-mono text-[11px] sm:text-xs tracking-widest font-bold uppercase">
                01 / CƠ SỞ THỰC TẾ NHÀ MÁY TÔN KIM NGÂN · ĐÔNG HÒA, PHÚ YÊN
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. STICKY BRAND STORY — TWO-COLUMN SCROLL-DRIVEN CHAPTERS
         ========================================================================= */}
      <section className="kn-about-section relative py-20 md:py-28 px-6 md:px-14 bg-[#F7F7F4] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Section Eyebrow Header */}
          <div className="flex items-center justify-between border-b border-[#1A1918]/12 pb-4 mb-12 sm:mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase">
              03 / HÀNH TRÌNH THƯƠNG HIỆU
            </span>
            <span className="text-xs font-mono text-[#524D4A] tracking-wider uppercase hidden sm:inline-block">
              STICKY BRAND STORY
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
            
            {/* Left Column: 3 Scroll-Driven Chapters */}
            <div className="lg:col-span-6 space-y-24 sm:space-y-36 py-6">
              {BRAND_STORY_CHAPTERS.map((chap, idx) => {
                const isActive = activeStoryIndex === idx;
                return (
                  <div
                    key={chap.number}
                    className={`kn-story-chapter-trigger transition-all duration-500 space-y-4 ${
                      isActive ? "opacity-100" : "opacity-35 hover:opacity-75"
                    }`}
                  >
                    <div className="flex items-center gap-3 font-mono text-xs font-bold tracking-widest text-[#C28E5C] uppercase">
                      <span>{chap.number} /</span>
                      <span>{chap.label}</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#1A1918] leading-tight">
                      {chap.title}
                    </h2>

                    <p className="text-sm sm:text-base text-[#C28E5C] font-mono font-medium">
                      {chap.subtitle}
                    </p>

                    <p className="text-sm sm:text-base text-[#524D4A] font-sans leading-relaxed pt-2 max-w-xl font-normal">
                      {chap.desc}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => setActiveStoryIndex(idx)}
                        className={`font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-colors ${
                          isActive ? "text-[#1A1918]" : "text-[#8E857B]"
                        }`}
                      >
                        <span>XEM CHI TIẾT GIAI ĐOẠN</span>
                        <ChevronRight size={14} className={isActive ? "translate-x-1 transition-transform" : ""} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Sticky Large Image Display */}
            <div className="lg:col-span-6 sticky top-28 sm:top-36 w-full">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-none border border-[#1A1918]/15 bg-[#ECE8DE] shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStoryIndex}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={BRAND_STORY_CHAPTERS[activeStoryIndex].image}
                      alt={BRAND_STORY_CHAPTERS[activeStoryIndex].title}
                      className="w-full h-full object-cover filter contrast-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Dynamic Image Caption */}
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center gap-3 bg-[#1A1918]/85 backdrop-blur-md px-4 py-2.5 text-white border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-[#C28E5C]" />
                      <span className="font-mono text-[11px] sm:text-xs tracking-wider font-bold uppercase truncate">
                        {BRAND_STORY_CHAPTERS[activeStoryIndex].caption}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. KEY NUMBERS — REFINED LIGHT FINANCIAL CREDIBILITY SECTION
         ========================================================================= */}
      <section className="kn-about-section py-20 md:py-28 px-6 md:px-14 bg-[#ECE8DE] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto space-y-12">
          
          <div className="flex items-center justify-between border-b border-[#1A1918]/12 pb-4">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase">
              04 / NĂNG LỰC TÀI CHÍNH &amp; UY TÍN
            </span>
            <span className="text-xs font-mono text-[#524D4A] tracking-wider uppercase hidden sm:inline-block">
              FINANCIAL AUDIT 2024
            </span>
          </div>

          {/* Clean Common Baseline Financial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#1A1918]/15 pt-2">
            {FINANCIAL_METRICS.map((metric, idx) => (
              <div
                key={metric.label}
                className={`flex flex-col justify-between pt-6 md:pt-0 ${
                  idx > 0 ? "md:pl-10 lg:pl-14" : ""
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl lg:text-7xl font-bold font-sans tracking-tight text-[#1A1918]">
                      {metric.value}
                    </span>
                    <span className="text-lg sm:text-xl font-mono font-bold text-[#C28E5C] tracking-wider">
                      {metric.unit}
                    </span>
                  </div>

                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1A1918]">
                    {metric.label}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#524D4A] font-sans leading-relaxed pt-1">
                    {metric.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. MILESTONES — TRUE HORIZONTAL INTERACTIVE TIMELINE
         ========================================================================= */}
      <section className="kn-about-section py-16 md:py-22 px-5 md:px-10 bg-[#F7F7F4] border-b border-[#1A1918]/10">
        <div className="max-w-[1500px] mx-auto space-y-10">
          
          <div className="flex items-center justify-between border-b border-[#1A1918]/12 pb-4">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase">
              05 / CỘT MỐC PHÁT TRIỂN
            </span>
            <span className="text-xs font-mono text-[#524D4A] tracking-wider uppercase hidden sm:inline-block">
              HORIZONTAL TIMELINE
            </span>
          </div>

          {/* Desktop Horizontal Interactive Timeline Track */}
          <div className="hidden md:block space-y-12">
            
            {/* Continuous Axis Line with Stops */}
            <div className="relative w-full border-b-2 border-[#1A1918]/15 pb-8 flex items-center justify-between">
              {MILESTONES.map((m, idx) => {
                const isActive = activeMilestoneIndex === idx;
                return (
                  <button
                    key={m.year}
                    onClick={() => setActiveMilestoneIndex(idx)}
                    onMouseEnter={() => setActiveMilestoneIndex(idx)}
                    className="relative group text-left flex flex-col items-center cursor-pointer focus:outline-none"
                  >
                    <span
                      className={`text-2xl lg:text-3xl font-mono font-bold transition-all duration-300 ${
                        isActive ? "text-[#C28E5C] scale-110" : "text-[#1A1918]/50 group-hover:text-[#1A1918]"
                      }`}
                    >
                      {m.year}
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1918] mt-1">
                      {m.title}
                    </span>

                    {/* Timeline Node Point */}
                    <span
                      className={`absolute -bottom-[41px] w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? "bg-[#C28E5C] border-[#1A1918] scale-125 shadow-md"
                          : "bg-[#F7F7F4] border-[#1A1918]/30 group-hover:border-[#1A1918]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Detailed Showcase Panel */}
            <div className="p-8 lg:p-12 rounded-none border border-[#1A1918]/15 bg-[#ECE8DE] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#C28E5C] uppercase block">
                  {MILESTONES[activeMilestoneIndex].tag}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold uppercase text-[#1A1918]">
                  {MILESTONES[activeMilestoneIndex].year} · {MILESTONES[activeMilestoneIndex].title}
                </h3>
                <p className="text-sm font-mono text-[#C28E5C] font-semibold">
                  {MILESTONES[activeMilestoneIndex].subtitle}
                </p>
                <p className="text-sm lg:text-base text-[#524D4A] font-sans leading-relaxed pt-1">
                  {MILESTONES[activeMilestoneIndex].desc}
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[16/10] overflow-hidden border border-[#1A1918]/15 shadow-sm bg-white">
                  <img
                    src={MILESTONES[activeMilestoneIndex].image}
                    alt={MILESTONES[activeMilestoneIndex].title}
                    className="w-full h-full object-cover filter contrast-[1.03]"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Mobile Vertical Timeline Track */}
          <div className="block md:hidden space-y-8 border-l-2 border-[#1A1918]/15 pl-6 ml-2">
            {MILESTONES.map((m, idx) => (
              <div key={m.year} className="relative space-y-2">
                <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#C28E5C] border-2 border-[#F7F7F4]" />
                <span className="text-xl font-mono font-bold text-[#C28E5C] block">
                  {m.year}
                </span>
                <h3 className="text-lg font-bold text-[#1A1918] uppercase">
                  {m.title}
                </h3>
                <p className="text-xs font-mono font-semibold text-[#8E857B]">
                  {m.subtitle}
                </p>
                <p className="text-xs text-[#524D4A] leading-relaxed pt-1">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. LEGAL AND CERTIFICATIONS — FEATURED PREVIEW + SELECTABLE ARCHIVE LIST
         ========================================================================= */}
      <section className="kn-about-section py-20 md:py-28 px-6 md:px-14 bg-[#F5F3EE] border-b border-[#D8D5CF]">
        <div className="max-w-[1600px] mx-auto space-y-10">
          
          {/* Section Header */}
          <div className="space-y-3 border-b border-[#D8D5CF] pb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase">
                06 / HỒ SƠ PHÁP LÝ &amp; CHỨNG NHẬN CHÍNH THỨC
              </span>
              <span className="text-xs font-mono text-[#524D4A] tracking-wider uppercase hidden sm:inline-block">
                VERIFIED DOCUMENTS
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#524D4A] font-sans">
              Hồ sơ minh bạch, chứng nhận rõ ràng và được công nhận bởi các đối tác chiến lược.
            </p>
          </div>

          {/* 60/40 Split Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column (60%): Large Active Document Preview Stage (Butter-smooth GPU Fade, Zero Jitter/Layout Shift) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="bg-[#EEEAE2] border border-[#D8D5CF] p-4 sm:p-6 rounded-none flex flex-col items-center justify-center shadow-sm w-full max-w-lg min-h-[480px] sm:min-h-[540px]">
                
                {/* Snug White Paper Mat Frame with Fixed Stage Bounds */}
                <div className="relative bg-white p-3 sm:p-4 border border-[#D8D5CF] shadow-[0_8px_25px_rgba(0,0,0,0.06)] flex items-center justify-center w-full h-[420px] sm:h-[460px] overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={`${activeCertIndex}-${activeCertPageIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute inset-0 w-full h-full flex items-center justify-center p-3 sm:p-4"
                    >
                      <img
                        src={CERTIFICATES[activeCertIndex].images[activeCertPageIndex] || CERTIFICATES[activeCertIndex].images[0]}
                        alt={CERTIFICATES[activeCertIndex].title}
                        className="w-auto h-auto max-h-full max-w-full object-contain filter contrast-[1.03]"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Page Switcher for Multi-page Documents */}
                {CERTIFICATES[activeCertIndex].images.length > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#D8D5CF] w-full mt-4">
                    {CERTIFICATES[activeCertIndex].images.map((_, pageIdx) => (
                      <button
                        key={pageIdx}
                        type="button"
                        onClick={() => setActiveCertPageIndex(pageIdx)}
                        aria-label={`Chuyển sang trang ${pageIdx + 1}`}
                        className={`px-3 py-1 text-xs font-mono font-bold border transition-all ${
                          activeCertPageIndex === pageIdx
                            ? "bg-[#121212] text-white border-[#121212]"
                            : "bg-[#EEEAE2] text-[#121212] border-[#D8D5CF] hover:border-[#121212]"
                        }`}
                      >
                        TRANG {pageIdx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Primary Action Button Below Stage */}
              <div className="w-full max-w-lg pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedCertModal({ title: CERTIFICATES[activeCertIndex].title, images: CERTIFICATES[activeCertIndex].images })}
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[#121212] hover:text-[#C28E5C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C28E5C] cursor-pointer"
                >
                  <span>Xem tài liệu gốc ↗</span>
                </button>

                <span className="text-xs font-mono text-[#8E857B]">
                  {CERTIFICATES[activeCertIndex].meta}
                </span>
              </div>
            </div>

            {/* Right Column (40%): Selectable Archive List */}
            <div className="lg:col-span-5 space-y-3">
              {CERTIFICATES.map((cert, idx) => {
                const isSelected = activeCertIndex === idx;
                return (
                  <button
                    key={cert.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setActiveCertIndex(idx);
                      setActiveCertPageIndex(0);
                    }}
                    className={`w-full text-left p-5 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C28E5C] cursor-pointer ${
                      isSelected
                        ? "bg-[#EEEAE2] border-[#D8D5CF] border-l-4 border-l-[#C28E5C]"
                        : "bg-transparent border-[#D8D5CF] border-l-2 border-l-transparent hover:border-[#121212]/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`font-mono text-xs font-bold tracking-widest transition-colors ${
                          isSelected ? "text-[#C28E5C]" : "text-[#8E857B]"
                        }`}
                      >
                        {cert.seqNum}
                      </span>
                      
                      <span className="text-xs font-mono text-[#8E857B] shrink-0">
                        {cert.meta}
                      </span>
                    </div>

                    <h3
                      className={`text-base font-bold uppercase pt-2 transition-colors ${
                        isSelected ? "text-[#121212]" : "text-[#121212]/70"
                      }`}
                    >
                      {cert.title}
                    </h3>

                    <p className="text-xs font-mono text-[#524D4A] pt-1">
                      {cert.issuer}
                    </p>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          7. CLOSING CTA — SIMPLE & SPACIOUS
         ========================================================================= */}
      <section className="py-24 sm:py-32 px-6 md:px-14 bg-[#F7F7F4] border-t border-[#1A1918]/10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#1A1918] leading-tight">
            Sẵn sàng đồng hành cùng công trình của bạn?
          </h2>

          <p className="text-base sm:text-lg text-[#524D4A] font-sans max-w-2xl mx-auto font-normal">
            Liên hệ ngay với đội ngũ tư vấn kỹ thuật Kim Ngân Steel để nhận báo giá chi tiết và hỗ trợ tiến độ giao vận 24h.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/san-pham"
              className="w-full sm:w-auto px-8 py-4 bg-[#1A1918] text-[#F7F7F4] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#C28E5C] transition-all shadow-md text-center"
            >
              Khám phá sản phẩm
            </Link>

            <Link
              href="/lien-he"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#1A1918] border border-[#1A1918] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#1A1918] hover:text-white transition-all text-center"
            >
              Liên hệ báo giá
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          ACCESSIBLE LIGHTBOX MODAL
         ========================================================================= */}
      <AnimatePresence>
        {selectedCertModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertModal(null)}
              className="absolute inset-0 bg-[#1A1918]/65 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-5xl max-h-[92vh] bg-[#F7F7F4] border border-[#1A1918]/15 rounded-none p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col items-center text-[#1A1918]"
            >
              {/* Header */}
              <div className="w-full flex items-center justify-between border-b border-[#1A1918]/12 pb-3 mb-4">
                <div>
                  <h3 className="text-sm md:text-base font-bold uppercase tracking-wider text-[#1A1918]">
                    {selectedCertModal.title}
                  </h3>
                  <p className="text-xs font-mono font-medium text-[#C28E5C] mt-0.5">
                    {selectedCertModal.images.length > 1
                      ? `TÀI LIỆU GỒM ${selectedCertModal.images.length} TRANG BẢN GỐC`
                      : "BẢN GỐC CHỨNG NHẬN"}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCertModal(null)}
                  className="w-9 h-9 rounded-full bg-[#1A1918]/5 border border-[#1A1918]/15 flex items-center justify-center text-[#1A1918] hover:bg-[#1A1918] hover:text-white transition-all cursor-pointer"
                  aria-label="Đóng"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scroll Container */}
              <div id="cert-modal-scroll-area" className="w-full overflow-y-auto max-h-[78vh] pr-1">
                <div className={`flex ${selectedCertModal.images.length > 1 ? "flex-col md:flex-row" : "flex-col"} gap-6 items-center justify-center`}>
                  {selectedCertModal.images.map((imgSrc, idx) => (
                    <div key={idx} className="flex flex-col items-center bg-white p-3 sm:p-4 border border-[#1A1918]/12 shadow-sm w-fit max-w-full">
                      <div className="w-full text-center pb-2 mb-3 border-b border-[#1A1918]/08 flex items-center justify-between gap-4">
                        <span className="text-[11px] font-mono text-[#C28E5C] font-bold uppercase">
                          TRANG {idx + 1} / {selectedCertModal.images.length}
                        </span>
                        <span className="text-[10px] font-mono text-[#8E857B]">VECTOR HD</span>
                      </div>
                      <img
                        src={imgSrc}
                        alt={`${selectedCertModal.title} Trang ${idx + 1}`}
                        className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}
