"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SceneData = {
  num: string;
  image: string;
  label: string;
  title: string;
  paragraph: string;
};

const SCENES: SceneData[] = [
  {
    num: "01",
    image: "/factory_story/1.svg",
    label: "FACTORY EXTERIOR",
    title: "NƠI MỌI SẢN PHẨM\nBẮT ĐẦU",
    paragraph: "Nhà máy và kho vật liệu được tổ chức để chủ động từ nguyên liệu đầu vào đến thành phẩm.",
  },
  {
    num: "02",
    image: "/factory_story/2.svg",
    label: "RAW MATERIALS",
    title: "NGUYÊN LIỆU\nĐƯỢC LỰA CHỌN",
    paragraph: "Nguồn thép phù hợp được lựa chọn theo độ dày, lớp mạ và yêu cầu của từng công trình.",
  },
  {
    num: "03",
    image: "/factory_story/3.svg",
    label: "ROLL FORMING",
    title: "GIA CÔNG\nVỚI ĐỘ CHÍNH XÁC CAO",
    paragraph: "Dây chuyền cán tôn được thiết lập theo đúng biên dạng, kích thước và số lượng yêu cầu.",
  },
  {
    num: "04",
    image: "/factory_story/4.svg",
    label: "QUALITY CONTROL",
    title: "KIỂM SOÁT\nTRƯỚC KHI XUẤT XƯỞNG",
    paragraph: "Độ dày, biên dạng và bề mặt sản phẩm được kiểm tra trước khi bàn giao.",
  },
  {
    num: "05",
    image: "/factory_story/5.svg",
    label: "LOGISTICS",
    title: "ĐÚNG SỐ LƯỢNG.\nĐÚNG TIẾN ĐỘ.",
    paragraph: "Thành phẩm được đóng gói và vận chuyển an toàn đến công trình.",
  },
  {
    num: "06",
    image: "/factory_story/6.svg",
    label: "REAL-WORLD APPLICATION",
    title: "FROM FACTORY\nTO STRUCTURE.",
    paragraph: "Vật liệu hoàn thiện trở thành một phần của những công trình thực tế.",
  },
];

export function FactoryStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNum, setActiveNum] = useState<string>("01");
  const [progressPercent, setProgressPercent] = useState<number>(0);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Shared cinematic timeline across desktop, tablet, and mobile.
      mm.add("(min-width: 320px)", () => {
        if (prefersReducedMotion) return;

        const container = containerRef.current;
        const introText = document.getElementById("factory-intro-text");

        if (!container) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${window.innerHeight * (window.innerWidth < 768 ? 5.5 : 8)}`,
            pin: true,
            scrub: window.innerWidth < 768 ? 0.75 : 1.2,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              setProgressPercent(p);
              if (p < 0.18) setActiveNum("01");
              else if (p < 0.34) setActiveNum("02");
              else if (p < 0.50) setActiveNum("03");
              else if (p < 0.66) setActiveNum("04");
              else if (p < 0.82) setActiveNum("05");
              else setActiveNum("06");
            },
          },
        });

        // 0. Intro Opening Text (0% to ~5%)
        if (introText) {
          tl.fromTo(
            introText,
            { opacity: 1, y: 0, filter: "blur(0px)" },
            { opacity: 0, y: -40, filter: "blur(10px)", duration: 0.05, ease: "power2.in" },
            0
          );
        }

        // SCENE 1 (0.05 -> 0.20): WOW Aperture Expand + 3D Parallax Depth Focus
        const img1 = document.getElementById("factory-img-1");
        const txt1 = document.getElementById("factory-txt-1");
        if (img1 && txt1) {
          tl.fromTo(
            img1,
            { clipPath: "inset(100% 0% 0% 0%)", scale: 1.25, filter: "blur(12px) brightness(0.4)", opacity: 0 },
            { clipPath: "inset(0% 0% 0% 0%)", scale: 1, filter: "blur(0px) brightness(0.92)", opacity: 1, duration: 0.035, ease: "power3.out" },
            0.05
          );
          tl.fromTo(
            txt1,
            { opacity: 0, y: 50, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.035, ease: "power3.out" },
            0.055
          );
          // Long Hold from 0.085 to 0.17
          tl.to(
            img1,
            { scale: 0.88, filter: "blur(12px) brightness(0.3)", opacity: 0, duration: 0.03, ease: "power3.in" },
            0.17
          );
          tl.to(
            txt1,
            { opacity: 0, y: -35, filter: "blur(8px)", duration: 0.03, ease: "power3.in" },
            0.17
          );
        }

        // SCENE 2 (0.21 -> 0.36): Horizontal Shutter Reveal + 3D Depth
        const img2 = document.getElementById("factory-img-2");
        const txt2 = document.getElementById("factory-txt-2");
        if (img2 && txt2) {
          tl.fromTo(
            img2,
            { clipPath: "inset(0% 100% 0% 0%)", scale: 1.25, filter: "blur(12px) brightness(0.4)", opacity: 0 },
            { clipPath: "inset(0% 0% 0% 0%)", scale: 1, filter: "blur(0px) brightness(0.92)", opacity: 1, duration: 0.035, ease: "power3.out" },
            0.21
          );
          tl.fromTo(
            txt2,
            { opacity: 0, y: 50, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.035, ease: "power3.out" },
            0.215
          );
          // Long Hold from 0.245 to 0.33
          tl.to(
            img2,
            { scale: 0.88, filter: "blur(12px) brightness(0.3)", opacity: 0, duration: 0.03, ease: "power3.in" },
            0.33
          );
          tl.to(
            txt2,
            { opacity: 0, y: -35, filter: "blur(8px)", duration: 0.03, ease: "power3.in" },
            0.33
          );
        }

        // SCENE 3 (0.37 -> 0.52): WOW Radial Circle Explosion + Parallax Focus
        const img3 = document.getElementById("factory-img-3");
        const txt3 = document.getElementById("factory-txt-3");
        if (img3 && txt3) {
          tl.fromTo(
            img3,
            { clipPath: "circle(0% at 50% 50%)", scale: 1.3, filter: "blur(14px) brightness(0.4)", opacity: 0 },
            { clipPath: "circle(150% at 50% 50%)", scale: 1, filter: "blur(0px) brightness(0.92)", opacity: 1, duration: 0.035, ease: "power3.out" },
            0.37
          );
          tl.fromTo(
            txt3,
            { opacity: 0, y: 50, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.035, ease: "power3.out" },
            0.375
          );
          // Long Hold from 0.405 to 0.49
          tl.to(
            img3,
            { scale: 0.88, filter: "blur(12px) brightness(0.3)", opacity: 0, duration: 0.03, ease: "power3.in" },
            0.49
          );
          tl.to(
            txt3,
            { opacity: 0, y: -35, filter: "blur(8px)", duration: 0.03, ease: "power3.in" },
            0.49
          );
        }

        // SCENE 4 (0.53 -> 0.68): Vertical Wipe Down + Lens Focus
        const img4 = document.getElementById("factory-img-4");
        const txt4 = document.getElementById("factory-txt-4");
        if (img4 && txt4) {
          tl.fromTo(
            img4,
            { clipPath: "inset(0% 0% 100% 0%)", scale: 1.25, filter: "blur(12px) brightness(0.4)", opacity: 0 },
            { clipPath: "inset(0% 0% 0% 0%)", scale: 1, filter: "blur(0px) brightness(0.92)", opacity: 1, duration: 0.035, ease: "power3.out" },
            0.53
          );
          tl.fromTo(
            txt4,
            { opacity: 0, y: 50, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.035, ease: "power3.out" },
            0.535
          );
          // Long Hold from 0.565 to 0.65
          tl.to(
            img4,
            { scale: 0.88, filter: "blur(12px) brightness(0.3)", opacity: 0, duration: 0.03, ease: "power3.in" },
            0.65
          );
          tl.to(
            txt4,
            { opacity: 0, y: -35, filter: "blur(8px)", duration: 0.03, ease: "power3.in" },
            0.65
          );
        }

        // SCENE 5 (0.69 -> 0.84): Shutter Wipe Right + Parallax Depth
        const img5 = document.getElementById("factory-img-5");
        const txt5 = document.getElementById("factory-txt-5");
        if (img5 && txt5) {
          tl.fromTo(
            img5,
            { clipPath: "inset(0% 100% 0% 0%)", scale: 1.25, filter: "blur(12px) brightness(0.4)", opacity: 0 },
            { clipPath: "inset(0% 0% 0% 0%)", scale: 1, filter: "blur(0px) brightness(0.92)", opacity: 1, duration: 0.035, ease: "power3.out" },
            0.69
          );
          tl.fromTo(
            txt5,
            { opacity: 0, y: 50, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.035, ease: "power3.out" },
            0.695
          );
          // Long Hold from 0.725 to 0.81
          tl.to(
            img5,
            { scale: 0.88, filter: "blur(12px) brightness(0.3)", opacity: 0, duration: 0.03, ease: "power3.in" },
            0.81
          );
          tl.to(
            txt5,
            { opacity: 0, y: -35, filter: "blur(8px)", duration: 0.03, ease: "power3.in" },
            0.81
          );
        }

        // SCENE 6 (0.85 -> 0.98): Grand Finale Circle Explosion Reveal
        const img6 = document.getElementById("factory-img-6");
        const txt6 = document.getElementById("factory-txt-6");
        if (img6 && txt6) {
          tl.fromTo(
            img6,
            { clipPath: "circle(0% at 50% 50%)", scale: 1.3, filter: "blur(14px) brightness(0.4)", opacity: 0 },
            { clipPath: "circle(150% at 50% 50%)", scale: 1, filter: "blur(0px) brightness(0.92)", opacity: 1, duration: 0.035, ease: "power3.out" },
            0.85
          );
          tl.fromTo(
            txt6,
            { opacity: 0, y: 50, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.035, ease: "power3.out" },
            0.855
          );
          // Finale Hold until 0.96
          tl.to(
            img6,
            { opacity: 0.8, filter: "blur(4px)", duration: 0.03, ease: "none" },
            0.96
          );
          tl.to(
            txt6,
            { opacity: 0.5, filter: "blur(2px)", duration: 0.03, ease: "none" },
            0.96
          );
        }
      });
    }, containerRef);

    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleRefresh);
    window.addEventListener("orientationchange", handleRefresh);

    return () => {
      window.removeEventListener("resize", handleRefresh);
      window.removeEventListener("orientationchange", handleRefresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="factory-story"
      className="relative bg-[#1A1918] text-[#F7F5F0] select-none"
    >
      {/* =========================================================================
          DESKTOP / TABLET: ONE SINGLE STICKY FRAME PINNED VIA GSAP
         ========================================================================= */}
      <div className="block relative w-full">
        
        {/* ONE Sticky Viewport Frame (Pin-spacer target) */}
        <div
          id="factory-sticky-frame"
          className="relative h-svh w-full overflow-hidden bg-[#1A1918]"
        >
          
          {/* Layered Images (Positioned at exact same 100vw x 100vh frame) */}
          {SCENES.map((scene, idx) => (
            <div
              key={scene.num}
              id={`factory-img-${idx + 1}`}
              className="absolute inset-0 w-full h-full opacity-0 pointer-events-none transition-none"
              style={{ willChange: "opacity, transform, clip-path, filter" }}
            >
              <img
                src={scene.image}
                alt={scene.label}
                className="w-full h-full object-cover filter contrast-[1.04] brightness-[0.92]"
              />
              {/* Balanced Center Dark Gradient Overlay for Maximum Text Contrast */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.78) 100%)",
                }}
              />
            </div>
          ))}

          {/* Top-Right Minimal Progress Counter & Thin Line */}
          <div className="absolute top-8 right-8 lg:top-12 lg:right-12 z-30 flex flex-col items-end gap-2 font-mono text-xs text-[#F7F5F0] pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#C28E5C] text-sm">{activeNum}</span>
              <span className="opacity-30">/</span>
              <span className="opacity-50">06</span>
            </div>
            <div className="w-24 h-[1px] bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C28E5C] transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, progressPercent * 100))}%` }}
              />
            </div>
          </div>

          {/* Opening Brief Intro Text (Centered in middle) */}
          <div
            id="factory-intro-text"
            className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-[860px] mx-auto px-6 z-20 space-y-4 pointer-events-none"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#C28E5C] font-sans font-bold block">
              FACTORY STORY
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-tight text-[#F7F5F0] leading-[1.08] font-sans">
              BEHIND EVERY PRODUCT<br />
              IS A CONTROLLED PROCESS.
            </h2>
          </div>

          {/* Consistent Text Block Layers (Centered in middle for all 6 scenes) */}
          {SCENES.map((scene, idx) => (
            <div
              key={`text-${scene.num}`}
              id={`factory-txt-${idx + 1}`}
              className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-[780px] mx-auto px-6 z-20 opacity-0 pointer-events-none space-y-4 font-sans"
              style={{ willChange: "opacity, transform, filter" }}
            >
              <div className="flex items-center justify-center gap-3 font-mono text-xs text-[#C28E5C] font-semibold tracking-widest">
                <span>{scene.num} / 06</span>
                <span className="opacity-30">·</span>
                <span className="uppercase tracking-[0.25em]">{scene.label}</span>
              </div>

              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#F7F5F0] leading-[1.1] whitespace-pre-line">
                {scene.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#D1CCC5] font-sans leading-relaxed max-w-[540px]">
                {scene.paragraph}
              </p>
            </div>
          ))}

        </div>

      </div>

      {/* =========================================================================
          MOBILE VIEWPORT (max-width: 767px): CLEAN VERTICAL DOCUMENT FLOW
         ========================================================================= */}
      <div className="hidden py-16 px-6 space-y-16">
        
        {/* Mobile Intro Header */}
        <div className="space-y-3 pb-8 border-b border-white/10 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C28E5C] font-sans font-bold block">
            FACTORY STORY
          </span>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-[#F7F5F0] leading-tight">
            BEHIND EVERY PRODUCT IS A CONTROLLED PROCESS.
          </h2>
        </div>

        {/* Mobile Vertical Flow of 6 Scenes */}
        <div className="space-y-14">
          {SCENES.map((scene) => (
            <div key={scene.num} className="space-y-4 text-center">
              {/* Mobile Image (Aspect 4/5, object-cover) */}
              <div className="w-full aspect-[4/5] relative overflow-hidden bg-[#242321]">
                <img
                  src={scene.image}
                  alt={scene.label}
                  className="w-full h-full object-cover filter contrast-[1.04] brightness-[0.98]"
                />
              </div>

              {/* Mobile Text Block */}
              <div className="space-y-2 pt-2 flex flex-col items-center">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#C28E5C] font-bold tracking-widest">
                  <span>{scene.num} / 06</span>
                  <span className="opacity-40">·</span>
                  <span className="uppercase tracking-wider">{scene.label}</span>
                </div>

                <h3 className="text-2xl font-bold uppercase tracking-tight text-[#F7F5F0] leading-tight whitespace-pre-line">
                  {scene.title}
                </h3>

                <p className="text-xs text-[#A39D97] leading-relaxed max-w-[420px]">
                  {scene.paragraph}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
