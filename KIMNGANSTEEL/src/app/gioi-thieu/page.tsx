"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, ChevronRight, ChevronLeft, X, Maximize2, ShieldCheck, CheckCircle2, Truck, Handshake, Cog, Layers3, Building2, Minus, Plus, FileText, ExternalLink, CreditCard } from "lucide-react";
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
    subtitle: "Xây dựng nền móng vững chắc từ niềm tin của những công trình đầu tiên.",
    desc: "Khởi đầu từ một doanh nghiệp thương mại nhỏ cung ứng tôn lợp và thép mạ cho các nhà thầu địa phương, Kim Ngân Steel đặt sự minh bạch về nguồn gốc và độ dày vật liệu làm nguyên tắc sống còn.",
    image: "/nha-may-ton-kim-ngan-storefront.jpg",
    caption: "Cơ sở sản xuất & nhà máy thực tế Kim Ngân Steel — Phú Yên",
    cta: { label: "Xem cơ sở sản xuất", href: "/nang-luc-nha-may" },
  },
  {
    number: "02",
    label: "MỞ RỘNG",
    title: "Đầu tư năng lực gia công, kho vận và nguồn hàng",
    subtitle: "Chủ động quy trình sản xuất và sở hữu hệ thống máy cán tôn CNC.",
    desc: "Đứng trước nhu cầu khắt khe của các công trình công nghiệp quy mô lớn, chúng tôi mở rộng quy mô nhà máy cán tôn tự động, đầu tư dàn máy chấn xà gồ C/Z và thiết lập hợp tác chiến lược trực tiếp với các nhà máy sản xuất tôn thép hàng đầu Việt Nam.",
    image: "/ton-dong-a-bang.svg",
    caption: "Hệ thống nguồn hàng thép mạ kẽm chính hãng nguyên cuộn",
    cta: { label: "Xem năng lực gia công", href: "/nang-luc-nha-may" },
  },
  {
    number: "03",
    label: "HÔM NAY",
    title: "Phục vụ nhà thầu, chủ đầu tư và hệ thống đại lý",
    subtitle: "Vận hành chuỗi giao vận 24h tới tận chân công trình toàn quốc.",
    desc: "Hôm nay, Kim Ngân Steel tự hào là đối tác chiến lược tin cậy của hàng trăm nhà thầu xây dựng, xưởng gia công tôn và đại lý vật liệu. Với tốc độ giao vận 24h và chứng nhận chất lượng ISO, chúng tôi cam kết bảo chứng độ bền cho mọi công trình.",
    image: "/nha_xuong.png",
    caption: "Năng lực sản xuất và giao vận cho công trình quy mô lớn",
    cta: { label: "Xem hệ thống giao vận", href: "/lien-he" },
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

// 6. LEGAL AND CERTIFICATIONS DATA (Section 5)
const CERTIFICATES = [
  {
    id: "giay-phep-kd",
    seqNum: "01",
    title: "GIẤY CHỨNG NHẬN ĐĂNG KÝ DOANH NGHIỆP",
    issuer: "Sở Kế hoạch & Đầu tư tỉnh Bình Dương",
    code: "3702871412",
    pagesCount: 2,
    meta: "2 trang",
    images: ["/certificates/giayto-1.svg", "/certificates/giayto-2.svg"],
    tag: "PHÁP LÝ DOANH NGHIỆP",
  },
  {
    id: "dai-ly-chinh-thuc",
    seqNum: "02",
    title: "GIẤY CHỨNG NHẬN ĐẠI LÝ CHÍNH THỨC",
    issuer: "Tôn Đông Á",
    code: "TDA-2024-KN",
    pagesCount: 1,
    meta: "1 trang",
    images: ["/certificates/giay-chung-nhan-dai-ly-chinh-thuc.svg"],
    tag: "ỦY QUYỀN PHÂN PHỐI CHÍNH THỨC",
  },
  {
    id: "nha-phan-phoi",
    seqNum: "03",
    title: "GIẤY CHỨNG NHẬN NHÀ PHÂN PHỐI",
    issuer: "Thép Việt Nhật",
    code: "VNJP-DIST-09",
    pagesCount: 1,
    meta: "1 trang",
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
    delete document.body.dataset.scrollLock;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, []);

  useEffect(() => {
    if (selectedCertModal) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.dataset.scrollLock = "true";
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
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
        delete document.body.dataset.scrollLock;
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        window.removeEventListener("wheel", preventOutsideWheel, { capture: true } as any);
        window.removeEventListener("touchmove", preventOutsideTouch, { capture: true } as any);

        if (typeof ScrollTrigger !== "undefined") {
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

    const refreshScrollTriggers = () => ScrollTrigger.refresh();
    const refreshFrame = window.requestAnimationFrame(refreshScrollTriggers);
    window.addEventListener("load", refreshScrollTriggers, { once: true });

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
      // 3. Factory Brand System — Pinned Scroll Annotations
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const brandSystemEl = root.querySelector<HTMLElement>(".kn-brand-system-section");
        if (!brandSystemEl) return;

        const annotations = gsap.utils.toArray<HTMLElement>(".kn-system-annotation", brandSystemEl);
        const model = brandSystemEl.querySelector<HTMLElement>(".kn-system-model");
        const closing = brandSystemEl.querySelector<HTMLElement>(".kn-system-closing");
        const navDots = gsap.utils.toArray<HTMLElement>(".kn-system-nav-dot", brandSystemEl);

        gsap.set(annotations, { autoAlpha: 0, y: 14 });
        gsap.set(closing, { autoAlpha: 0, y: 14 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".kn-brand-system-pin",
            start: "top top",
            end: "+=120%",
            scrub: 0.5,
            pin: ".kn-brand-system-pin",
            pinSpacing: true,
            anticipatePin: 0.6,
            fastScrollEnd: false,
            invalidateOnRefresh: true,
          },
        });

        tl.to(model, { y: -8, duration: 0.18, ease: "none" }, 0.05);
        annotations.forEach((annotation, index) => {
          const at = 0.14 + index * 0.12;
          tl.to(annotation, { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" }, at);
          
          if (navDots[index]) {
            const innerDot = navDots[index].querySelector("div:last-child");
            const outerRing = navDots[index].querySelector("div:first-child");
            tl.to(innerDot, { backgroundColor: "#C28E5C", duration: 0.1 }, at);
            tl.to(outerRing, { autoAlpha: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, at);
          }
        });
        tl.to(closing, { autoAlpha: 1, y: 0, duration: 0.14, ease: "power2.out" }, 0.82);
      });

      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        const brandSystemEl = root.querySelector<HTMLElement>(".kn-brand-system-section");
        if (!brandSystemEl) return;
        gsap.set(
          gsap.utils.toArray<HTMLElement>(".kn-system-annotation, .kn-system-line, .kn-system-dot, .kn-system-closing", brandSystemEl),
          { clearProps: "all", autoAlpha: 1 }
        );
      });

      // 4. Section Subtle Reveal (Exclude pinned brand system section to prevent opacity: 0 blank white bug)
      gsap.utils.toArray<HTMLElement>(".kn-about-section:not(.kn-brand-system-section)").forEach((section) => {
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

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", refreshScrollTriggers);
      ctx.revert();
    };
  }, []);

  const currentCert = CERTIFICATES[activeCertIndex];

  return (
    <div
      ref={rootRef}
      className="antra-theme min-h-screen bg-[#F7F7F4] text-[#1A1918] selection:bg-[#1A1918] selection:text-[#F7F7F4] select-none font-sans"
    >
      {/* =========================================================================
          1. HERO — TWO-COLUMN: TEXT LEFT + 3D BILLBOARD IMAGE RIGHT (1-TO-1 MATCH WITH FIGMA MOCKUP)
         ========================================================================= */}
      <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 px-6 md:px-12 xl:px-16 bg-[#F7F7F4] border-b border-[#1A1918]/10 overflow-hidden">
        <div className="max-w-[1480px] xl:max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
          
          {/* LEFT COLUMN: TEXT CONTENT (5 Cols) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6 z-10 lg:pr-2">
            {/* Eyebrow */}
            <div className="kn-about-opening-el inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C28E5C]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C28E5C]">01 / CÂU CHUYỆN KIM NGÂN</span>
            </div>

            {/* Headline */}
            <h1 className="kn-about-opening-el text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.9rem] font-bold uppercase tracking-tight text-[#1A1918] leading-[1.04]">
              MỘT DẤU ẤN<br />
              ĐƯỢC XÂY BẰNG<br />
              SỰ TIN CẬY.
            </h1>

            {/* Description */}
            <p className="kn-about-opening-el text-sm sm:text-base text-[#524D4A] font-sans leading-relaxed font-normal max-w-md">
              Gia công cán tôn, phân phối vật liệu chính hãng và đồng hành cùng tiến độ công trình.
            </p>

            {/* Button */}
            <div className="kn-about-opening-el pt-1 pb-2">
              <Link
                href="/gioi-thieu"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1A1918] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#C28E5C] transition-all duration-300 shadow-md group"
              >
                <span>KHÁM PHÁ CÂU CHUYỆN</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 3 Quick Stats Row */}
            <div className="kn-about-opening-el grid grid-cols-3 gap-3 pt-2 w-full max-w-[540px]">
              {/* Stat 1: Factory */}
              <div className="space-y-1">
                <div className="flex h-7 w-7 items-center justify-start text-[#C28E5C]">
                  <Building2 size={22} strokeWidth={1.5} />
                </div>
                <div className="font-mono font-bold text-2xl sm:text-3xl text-[#C28E5C]">
                  15.000 <span className="text-xs font-normal text-[#524D4A] ml-0.5">m²</span>
                </div>
                <p className="text-[9px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider text-[#524D4A] leading-tight whitespace-nowrap">
                  NHÀ MÁY &amp; KHO BÃI
                </p>
              </div>

              {/* Stat 2: CNC Line */}
              <div className="space-y-1 border-l border-[#1A1918]/15 pl-3.5">
                <div className="flex h-7 w-7 items-center justify-start text-[#C28E5C]">
                  <Cog size={22} strokeWidth={1.5} />
                </div>
                <div className="font-mono font-bold text-2xl sm:text-3xl text-[#C28E5C]">
                  06
                </div>
                <p className="text-[9px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider text-[#524D4A] leading-tight whitespace-nowrap">
                  DÂY CHUYỀN CÁN TÔN CNC
                </p>
              </div>

              {/* Stat 3: Shipping */}
              <div className="space-y-1 border-l border-[#1A1918]/15 pl-3.5">
                <div className="flex h-7 w-7 items-center justify-start text-[#C28E5C]">
                  <Truck size={22} strokeWidth={1.5} />
                </div>
                <div className="font-mono font-bold text-2xl sm:text-3xl text-[#C28E5C]">
                  24h
                </div>
                <p className="text-[9px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider text-[#524D4A] leading-tight whitespace-nowrap">
                  GIAO VẬN TẬN CHÂN CÔNG TRÌNH
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D BILLBOARD STRUCTURE (Positioned close to left text, exactly like Image 2) */}
          <div className="lg:col-span-7 kn-about-opening-el relative flex items-center justify-start lg:-ml-4 xl:-ml-8">
            <div className="relative w-full max-w-[880px] xl:max-w-[1020px]">
              <img
                src="/model-kim-ngan-4.svg"
                alt="Bảng hiệu Tôn Đông Á Kim Ngân Steel"
                className="relative z-10 w-full h-auto object-contain drop-shadow-[0_28px_52px_rgba(26,25,24,0.16)]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. BRAND SYSTEM — ARCHITECTURAL FACTORY ANNOTATIONS
         ========================================================================= */}
      <section className="kn-about-section kn-brand-system-section relative overflow-hidden bg-[#FAF9F5] border-b border-[#1A1918]/10">
        <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,25,24,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,25,24,0.035)_1px,transparent_1px)] bg-[size:12.5vw_18vh]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_56%_48%,rgba(255,255,255,0.96)_0%,rgba(247,247,244,0.35)_48%,rgba(226,222,212,0.58)_100%)]" />
        </div>

        <div className="kn-brand-system-pin relative min-h-screen lg:h-screen lg:min-h-0 px-6 py-16 md:px-14 lg:py-0 flex items-center">
          
          {/* Vertical Scroll Progress Indicator (Far Left Margin) */}
          <div className="hidden lg:flex absolute left-6 xl:left-10 top-1/2 -translate-y-1/2 flex-col items-center gap-5 z-40">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="kn-system-nav-dot relative flex items-center justify-center w-4 h-4">
                {/* Active Outer Ring */}
                <div className={`absolute inset-0 rounded-full border border-[#C28E5C] transition-all duration-300 ${i === 0 ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} />
                {/* Dot */}
                <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === 0 ? "bg-[#C28E5C]" : "bg-[#1A1918]/25"}`} />
              </div>
            ))}
          </div>

          <div className="relative mx-auto w-full max-w-[1760px]">
            {/* Top Bar Label */}
            <div className="relative z-20 flex items-center justify-between border-b border-[#1A1918]/12 pb-4">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#1A1918]/70 uppercase">02 / HÀNH TRÌNH THƯƠNG HIỆU</span>
              <span className="hidden sm:inline-block text-[10px] font-mono tracking-[0.22em] text-[#1A1918]/65 uppercase">STICKY BRAND STORY</span>
            </div>

            <div className="relative mt-8 lg:mt-0 lg:min-h-[calc(100vh-92px)] flex flex-col justify-center">
              {/* ── Intro Block (top-left) ── */}
              <div className="relative z-20 max-w-[460px] xl:max-w-[500px] lg:absolute lg:left-0 lg:top-[5vh]">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#C28E5C]" />
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#C28E5C]">HÀNH TRÌNH KIM NGÂN</span>
                </div>
                <h2 className="text-[clamp(1.75rem,2.6vw,3.1rem)] font-bold leading-[1.12] tracking-tight text-[#1A1918]">
                  <span className="block whitespace-nowrap">Từ nguồn vật liệu</span>
                  <span className="block whitespace-nowrap">đến giá trị công trình</span>
                </h2>
                <div className="mt-4 h-0.5 w-12 bg-[#C28E5C]" />
                <p className="mt-4 text-xs sm:text-sm leading-[1.85] text-[#524D4A] max-w-[310px] sm:max-w-[330px]">
                  Một hệ thống khép kín kết nối nguồn hàng chính hãng, năng lực gia công, kiểm soát chất lượng và giao vận tới công trình.
                </p>
              </div>

              {/* ── Factory Model (center hero) & Annotations ── */}
              <div className="relative z-10 mx-auto w-full flex min-h-[460px] lg:min-h-[calc(100vh-130px)] items-center justify-center lg:pl-[360px] xl:pl-[400px] lg:pr-[360px] xl:pr-[400px]">
                <div className="relative flex aspect-[1.34/1] w-full max-w-[620px] items-center justify-center xl:max-w-[700px] 2xl:max-w-[760px]">
                  <div className="absolute left-[8%] right-[10%] bottom-[7%] h-9 rounded-[50%] bg-[#1A1918]/10 blur-xl" />
                  <img src="/model-kim-ngan.svg" alt="Mô hình 3D nhà máy Kim Ngân Steel" className="kn-system-model relative z-10 mx-auto block w-full object-contain drop-shadow-[0_24px_48px_rgba(26,25,24,0.14)]" />

                  {/* ══════ ANNOTATIONS (1-to-1 match with Figma mockup) ══════ */}

                  {/* 01. NGUỒN VẬT LIỆU — Top Left (above main roof, L-shaped elbow line) */}
                  <div className="kn-system-annotation hidden lg:block absolute -top-[15%] left-[8%] z-30 w-[210px]">
                    {/* Vertical line down */}
                    <span className="kn-system-line absolute left-[40px] -bottom-[32px] w-px h-[32px] bg-[#1A1918]/25" />
                    {/* Horizontal line right */}
                    <span className="kn-system-line absolute left-[40px] -bottom-[32px] w-[50px] h-px bg-[#1A1918]/25" />
                    {/* Vertical line down to roof */}
                    <span className="kn-system-line absolute left-[90px] -bottom-[50px] w-px h-[18px] bg-[#1A1918]/25" />
                    {/* Dot on roof */}
                    <span className="kn-system-dot absolute left-[86.5px] -bottom-[56px] h-2 w-2 rounded-full bg-[#C28E5C] ring-2 ring-white shadow-[0_0_6px_rgba(194,142,92,0.8)]" />

                    <div className="border-t border-[#1A1918]/25 pt-2.5">
                      <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-[#C28E5C]/60 text-[#1A1918]">
                        <Layers3 size={19} strokeWidth={1.5} />
                      </div>
                      <span className="block text-[9px] font-mono font-bold tracking-[0.22em] text-[#C28E5C] uppercase">01. NGUỒN VẬT LIỆU</span>
                      <h3 className="mt-0.5 text-xs sm:text-sm font-bold leading-tight text-[#1A1918]">Nguồn hàng chính hãng</h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#524D4A]">Tôn thép được cung cấp từ các thương hiệu uy tín và kiểm soát rõ nguồn gốc.</p>
                    </div>
                  </div>

                  {/* 02. GIA CÔNG — Top Right (above right roof, L-shaped elbow line) */}
                  <div className="kn-system-annotation hidden lg:block absolute -top-[15%] -right-[12%] z-30 w-[210px]">
                    {/* Horizontal line left */}
                    <span className="kn-system-line absolute -left-[45px] top-[24px] w-[45px] h-px bg-[#1A1918]/25" />
                    {/* Vertical line down to roof */}
                    <span className="kn-system-line absolute -left-[45px] top-[24px] w-px h-[60px] bg-[#1A1918]/25" />
                    {/* Dot on side roof */}
                    <span className="kn-system-dot absolute -left-[48.5px] top-[84px] h-2 w-2 rounded-full bg-[#C28E5C] ring-2 ring-white shadow-[0_0_6px_rgba(194,142,92,0.8)]" />

                    <div className="border-t border-[#1A1918]/25 pt-2.5">
                      <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-[#C28E5C]/60 text-[#1A1918]">
                        <Cog size={19} strokeWidth={1.5} />
                      </div>
                      <span className="block text-[9px] font-mono font-bold tracking-[0.22em] text-[#C28E5C] uppercase">02. GIA CÔNG</span>
                      <h3 className="mt-0.5 text-xs sm:text-sm font-bold leading-tight text-[#1A1918]">Chủ động theo quy cách</h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#524D4A]">Cán tôn và sản xuất xà gồ đảm bảo độ chính xác, đáp ứng mọi yêu cầu của công trình.</p>
                    </div>
                  </div>

                  {/* 03. CHẤT LƯỢNG — Middle Left (outside front gate, pushed left to clear entrance pillar) */}
                  <div className="kn-system-annotation hidden lg:block absolute top-[48%] -left-[34%] xl:-left-[30%] z-30 w-[190px]">
                    <span className="kn-system-line absolute -right-[90px] top-0 h-px w-[90px] bg-[#1A1918]/25" />
                    <span className="kn-system-dot absolute -right-[96px] -top-[3.5px] h-2 w-2 rounded-full bg-[#C28E5C] ring-2 ring-white shadow-[0_0_6px_rgba(194,142,92,0.8)]" />
                    <div className="border-t border-[#1A1918]/25 pt-2.5">
                      <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-[#C28E5C]/60 text-[#1A1918]">
                        <ShieldCheck size={19} strokeWidth={1.5} />
                      </div>
                      <span className="block text-[9px] font-mono font-bold tracking-[0.22em] text-[#C28E5C] uppercase">03. CHẤT LƯỢNG</span>
                      <h3 className="mt-0.5 text-xs sm:text-sm font-bold leading-tight text-[#1A1918]">Kiểm soát xuyên suốt</h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#524D4A]">Theo dõi độ dày, bề mặt và tiêu chuẩn vật liệu trước khi xuất kho.</p>
                    </div>
                  </div>

                  {/* 04. KHO VẬN — Middle Right (at right warehouse driveway, pushed right to clear wall) */}
                  <div className="kn-system-annotation hidden lg:block absolute top-[44%] -right-[30%] xl:-right-[26%] z-30 w-[190px]">
                    <span className="kn-system-line absolute -left-[85px] top-0 h-px w-[85px] bg-[#1A1918]/25" />
                    <span className="kn-system-dot absolute -left-[91px] -top-[3.5px] h-2 w-2 rounded-full bg-[#C28E5C] ring-2 ring-white shadow-[0_0_6px_rgba(194,142,92,0.8)]" />
                    <div className="border-t border-[#1A1918]/25 pt-2.5">
                      <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-[#C28E5C]/60 text-[#1A1918]">
                        <Truck size={19} strokeWidth={1.5} />
                      </div>
                      <span className="block text-[9px] font-mono font-bold tracking-[0.22em] text-[#C28E5C] uppercase">04. KHO VẬN</span>
                      <h3 className="mt-0.5 text-xs sm:text-sm font-bold leading-tight text-[#1A1918]">Giao nhận linh hoạt</h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#524D4A]">Chủ động kho hàng và phương tiện để đáp ứng tiến độ giao nhận.</p>
                    </div>
                  </div>

                  {/* 05. ĐỒNG HÀNH — Bottom Center (at front truck) */}
                  <div className="kn-system-annotation hidden lg:block absolute -bottom-[14%] left-[24%] z-30 w-[200px]">
                    <span className="kn-system-line absolute left-1/2 -top-[32px] w-px h-[32px] bg-[#1A1918]/25" />
                    <span className="kn-system-dot absolute left-[calc(50%-3.5px)] -top-[38px] h-2 w-2 rounded-full bg-[#C28E5C] ring-2 ring-white shadow-[0_0_6px_rgba(194,142,92,0.8)]" />
                    <div className="border-t border-[#1A1918]/25 pt-2.5">
                      <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-[#C28E5C]/60 text-[#1A1918]">
                        <Handshake size={19} strokeWidth={1.5} />
                      </div>
                      <span className="block text-[9px] font-mono font-bold tracking-[0.22em] text-[#C28E5C] uppercase">05. ĐỒNG HÀNH</span>
                      <h3 className="mt-0.5 text-xs sm:text-sm font-bold leading-tight text-[#1A1918]">Phục vụ đa dạng đối tác</h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#524D4A]">Cung cấp vật liệu cho nhà thầu, chủ đầu tư và hệ thống đại lý trên toàn quốc.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Closing Block (Bottom-Right, exactly as Figma mockup) ── */}
              <div className="kn-system-closing relative z-20 mt-8 lg:absolute lg:right-0 lg:bottom-[3vh] lg:w-[360px] xl:w-[380px]">
                <span className="text-[#C28E5C] font-serif text-3xl leading-none font-bold block mb-1">“</span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug text-[#1A1918]">
                  Một hệ thống khép kín.<br />
                  Một cam kết xuyên suốt.
                </h3>
                <p className="mt-3 mb-5 text-xs sm:text-sm text-[#524D4A] leading-relaxed">
                  Từ cuộn thép đầu vào đến vật liệu được giao tận công trình.
                </p>
                <Link
                  href="/nang-luc-nha-may"
                  className="inline-flex items-center gap-2.5 border border-[#C28E5C] bg-[#C28E5C] px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white hover:bg-[#A87646] hover:border-[#A87646] transition-all shadow-[0_4px_14px_rgba(194,142,92,0.35)] group"
                >
                  <span>KHÁM PHÁ NĂNG LỰC SẢN XUẤT</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-white" />
                </Link>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:hidden">
              {[
                ["01. NGUỒN VẬT LIỆU", "Nguồn hàng chính hãng", "Tôn thép được cung cấp từ các thương hiệu uy tín và kiểm soát rõ nguồn gốc."],
                ["02. GIA CÔNG", "Chủ động theo quy cách", "Cán tôn và sản xuất xà gồ phù hợp với yêu cầu của từng công trình."],
                ["03. CHẤT LƯỢNG", "Kiểm soát xuyên suốt", "Theo dõi độ dày, bề mặt và tiêu chuẩn vật liệu trước khi xuất kho."],
                ["04. KHO VẬN", "Giao nhận linh hoạt", "Chủ động kho hàng và phương tiện để đáp ứng tiến độ giao nhận."],
                ["05. ĐỒNG HÀNH", "Phục vụ đa dạng đối tác", "Cung cấp vật liệu cho nhà thầu, chủ đầu tư và hệ thống đại lý."],
              ].map(([label, title, desc]) => (
                <div key={label} className="border-t border-[#1A1918]/14 pt-4">
                  <span className="block text-[10px] font-mono font-bold tracking-[0.24em] text-[#C28E5C] uppercase">{label}</span>
                  <h3 className="mt-2 text-lg font-bold leading-tight text-[#1A1918]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#524D4A]">{desc}</p>
                </div>
              ))}
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
              03 / NĂNG LỰC TÀI CHÍNH &amp; UY TÍN
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
              04 / CỘT MỐC PHÁT TRIỂN
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
          6. LEGAL AND CERTIFICATIONS — 1-TO-1 FIGMA MOCKUP SHOWCASE
         ========================================================================= */}
      <section className="kn-about-section py-16 sm:py-24 px-6 md:px-14 bg-[#FAF9F5] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          {/* Section Header Bar */}
          <div className="flex items-center justify-between border-b border-[#1A1918]/12 pb-4">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase">
              05 / HỒ SƠ PHÁP LÝ &amp; CHỨNG NHẬN CHÍNH THỨC
            </span>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#524D4A] tracking-wider uppercase">
              <span>VERIFIED DOCUMENTS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C28E5C]" />
            </div>
          </div>

          {/* Main 2-Column Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-2">
            
            {/* LEFT COLUMN (6 Cols): Accordion & Info */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              {/* Headline & Description */}
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold uppercase tracking-tight text-[#1A1918] leading-[1.1]">
                  MINH BẠCH TRONG PHÁP LÝ.<br />
                  VỮNG VÀNG TRONG HỢP TÁC.
                </h2>
                <p className="text-sm sm:text-base text-[#524D4A] font-sans leading-relaxed max-w-lg">
                  Hồ sơ minh bạch, chứng nhận rõ ràng và được công nhận bởi các đối tác chiến lược.
                </p>
              </div>

              {/* Accordion List */}
              <div className="space-y-3.5 pt-1">
                {CERTIFICATES.map((cert, idx) => {
                  const isSelected = activeCertIndex === idx;
                  return (
                    <div
                      key={cert.id}
                      onClick={() => {
                        setActiveCertIndex(idx);
                        setActiveCertPageIndex(0);
                      }}
                      className={`relative w-full rounded-none border transition-all duration-300 cursor-pointer overflow-hidden ${
                        isSelected
                          ? "bg-[#F0ECE1] border-[#E0DACB] border-l-[5px] border-l-[#C28E5C] shadow-sm p-5 sm:p-6"
                          : "bg-white/40 border-[#1A1918]/12 border-l-2 border-l-transparent hover:bg-white/80 p-4 sm:p-5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <span
                            className={`font-mono text-base sm:text-lg font-bold transition-colors ${
                              isSelected ? "text-[#C28E5C]" : "text-[#1A1918]/45"
                            }`}
                          >
                            {cert.seqNum}
                          </span>

                          <div className="space-y-1">
                            <h3
                              className={`text-sm sm:text-base font-bold uppercase tracking-tight transition-colors ${
                                isSelected ? "text-[#1A1918]" : "text-[#1A1918]/75"
                              }`}
                            >
                              {cert.title}
                            </h3>

                            <p className="text-xs text-[#524D4A] font-sans">
                              {cert.issuer}
                            </p>
                          </div>
                        </div>

                        {/* Plus/Minus Toggle Circle Button */}
                        <div
                          className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "border-[#C28E5C] bg-white text-[#C28E5C]"
                              : "border-[#1A1918]/25 bg-transparent text-[#1A1918]/60"
                          }`}
                        >
                          {isSelected ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
                        </div>
                      </div>

                      {/* Expanded Active Details */}
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-[#1A1918]/10 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCertModal({ title: cert.title, images: cert.images });
                            }}
                            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#C28E5C] hover:text-[#A87646] tracking-wider transition-colors cursor-pointer group"
                          >
                            <span>Xem bản gốc</span>
                            <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </button>

                          <span className="text-xs font-mono text-[#8E857B]">
                            {cert.meta}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN (6 Cols): Document Stage with Natural A4 Portrait Ratio */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="bg-[#F7F5EE] border border-[#E2DDD3] p-4 sm:p-5 rounded-xl shadow-sm flex flex-col items-center justify-between w-full sm:w-auto">
                
                {/* Natural A4 Portrait Paper Frame (1 : 1.414 Ratio) */}
                <div className="relative h-[460px] sm:h-[510px] aspect-[1/1.414] bg-white border border-[#E2DDD3] shadow-[0_14px_36px_rgba(0,0,0,0.07)] flex items-center justify-center p-2 sm:p-3 overflow-hidden rounded-md my-auto">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={`${activeCertIndex}-${activeCertPageIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute inset-0 w-full h-full flex items-center justify-center p-2"
                    >
                      <img
                        src={CERTIFICATES[activeCertIndex].images[activeCertPageIndex] || CERTIFICATES[activeCertIndex].images[0]}
                        alt={CERTIFICATES[activeCertIndex].title}
                        className="w-full h-full object-contain filter contrast-[1.03]"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Control Bar */}
                <div className="w-full pt-3 border-t border-[#E2DDD3] flex items-center justify-between mt-3">
                  {/* Page Switcher Arrow Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={activeCertPageIndex === 0}
                      onClick={() => setActiveCertPageIndex((prev) => Math.max(0, prev - 1))}
                      className="w-8 h-8 rounded-full border border-[#D8D5CF] bg-white text-[#1A1918] hover:bg-[#C28E5C] hover:text-white hover:border-[#C28E5C] transition-colors flex items-center justify-center disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#1A1918] disabled:hover:border-[#D8D5CF] cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <span className="font-mono text-xs font-bold text-[#1A1918]">
                      0{activeCertPageIndex + 1} / 0{CERTIFICATES[activeCertIndex].images.length}
                    </span>

                    <button
                      type="button"
                      disabled={activeCertPageIndex >= CERTIFICATES[activeCertIndex].images.length - 1}
                      onClick={() => setActiveCertPageIndex((prev) => Math.min(CERTIFICATES[activeCertIndex].images.length - 1, prev + 1))}
                      className="w-8 h-8 rounded-full border border-[#D8D5CF] bg-white text-[#1A1918] hover:bg-[#C28E5C] hover:text-white hover:border-[#C28E5C] transition-colors flex items-center justify-center disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#1A1918] disabled:hover:border-[#D8D5CF] cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedCertModal({ title: CERTIFICATES[activeCertIndex].title, images: CERTIFICATES[activeCertIndex].images })}
                    className="inline-flex items-center gap-2 font-mono text-xs text-[#524D4A] hover:text-[#C28E5C] transition-colors cursor-pointer"
                  >
                    <Maximize2 size={14} />
                    <span>Toàn màn hình</span>
                  </button>
                </div>

              </div>
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

    </div>
  );
}

