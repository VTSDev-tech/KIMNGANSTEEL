"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { heroSequenceFrames } from "./heroSequenceManifest";
import Image from "next/image";

const DEV_SKIP_INTRO = false;

const lockPageScroll = () => {
  document.body.dataset.scrollLock = "true";
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
};

const unlockPageScroll = () => {
  delete document.body.dataset.scrollLock;
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
};

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerpieceRef = useRef<HTMLDivElement>(null);
  const leftModelRef = useRef<HTMLDivElement>(null);
  const rightModelRef = useRef<HTMLDivElement>(null);
  const loadingContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useLayoutEffect(() => {
    if (DEV_SKIP_INTRO) {
      setShouldRender(false);
      onComplete();
      return;
    }
    lockPageScroll();
    return () => unlockPageScroll();
  }, [onComplete]);

  // Progress bar & preload
  useEffect(() => {
    if (!shouldRender || DEV_SKIP_INTRO) return;

    heroSequenceFrames.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
    });

    const drawObj = { val: 0 };
    const tween = gsap.to(drawObj, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(drawObj.val)),
      onComplete: () => setIsReady(true),
    });

    return () => { tween.kill(); };
  }, [shouldRender]);

  // Reveal animation after loading
  useEffect(() => {
    if (!isReady || !shouldRender) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Fade out loading bar
      tl.to(loadingContainerRef.current, {
        opacity: 0,
        y: 6,
        duration: 0.3,
        ease: "power2.out",
      });

      // Reveal centerpiece
      tl.fromTo(
        centerpieceRef.current,
        { opacity: 0, y: 16, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power3.out" },
        "-=0.1"
      );

      // Slide in left model
      tl.fromTo(
        leftModelRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" },
        "-=0.55"
      );

      // Slide in right model
      tl.fromTo(
        rightModelRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" },
        "<"
      );

      // Reveal HUD & CTA
      tl.fromTo(
        [hudRef.current, ctaRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isReady, shouldRender]);

  const completeIntro = () => {
    setShouldRender(false);
    unlockPageScroll();
    onComplete();
  };

  const handleEnter = () => {
    if (!isReady || isEntering) return;
    setIsEntering(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: completeIntro });

      tl.to(
        [leftModelRef.current, rightModelRef.current],
        { opacity: 0, y: 30, duration: 0.4, ease: "power2.in", stagger: 0.05 },
        0
      );
      tl.to(
        [hudRef.current, ctaRef.current],
        { opacity: 0, duration: 0.25, ease: "power2.out" },
        0
      );
      tl.to(
        centerpieceRef.current,
        { opacity: 0, y: -20, scale: 0.96, duration: 0.55, ease: "power3.inOut" },
        0.1
      );
      tl.to(
        containerRef.current,
        { opacity: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleEnter();
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-white text-[#064e3b]"
    >
      {/* ── Background: bright warm-white center radial ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_68%_72%_at_50%_46%,#FFFFFF_0%,#FFFFFF_55%,#ffffff_100%)]" />

      {/* ── Very subtle fine grid ── */}
      <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,rgba(26,25,24,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,25,24,0.11)_1px,transparent_1px)] [background-size:64px_64px] md:[background-size:80px_80px]" />

      {/* ── Full-screen crosshair lines ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[rgba(26,25,24,0.09)] -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[rgba(26,25,24,0.09)]" />
      </div>

      {/* ── Architectural concentric rings ── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 700 700"
          className="h-[620px] w-[620px] md:h-[min(88vw,900px)] md:w-[min(88vw,900px)] opacity-60"
          fill="none"
        >
          {/* Outer ring */}
          <circle cx="350" cy="350" r="320" stroke="rgba(26,25,24,0.13)" strokeWidth="0.8" />
          {/* Main ring */}
          <circle cx="350" cy="350" r="232" stroke="rgba(26,25,24,0.18)" strokeWidth="0.9" />
          {/* Dashed inner ring */}
          <circle cx="350" cy="350" r="168" stroke="rgba(26,25,24,0.13)" strokeWidth="0.7" strokeDasharray="5 10" />
          {/* Innermost ring */}
          <circle cx="350" cy="350" r="80" stroke="rgba(26,25,24,0.08)" strokeWidth="0.6" />
          {/* Cross hairs inside ring */}
          <line x1="50" y1="350" x2="650" y2="350" stroke="rgba(26,25,24,0.10)" strokeWidth="0.7" />
          <line x1="350" y1="50" x2="350" y2="650" stroke="rgba(26,25,24,0.10)" strokeWidth="0.7" />
          {/* Accent gold dots */}
          <circle cx="350" cy="118" r="3" fill="#ea580c" />
          <circle cx="350" cy="582" r="3" fill="#ea580c" />
          <circle cx="118" cy="350" r="3" fill="#ea580c" />
          <circle cx="582" cy="350" r="3" fill="#ea580c" />
          {/* Corner crosshair marks */}
          <line x1="92" y1="92" x2="104" y2="92" stroke="rgba(26,25,24,0.28)" strokeWidth="1.2" />
          <line x1="98" y1="86" x2="98" y2="98" stroke="rgba(26,25,24,0.28)" strokeWidth="1.2" />
          <line x1="596" y1="92" x2="608" y2="92" stroke="rgba(26,25,24,0.28)" strokeWidth="1.2" />
          <line x1="602" y1="86" x2="602" y2="98" stroke="rgba(26,25,24,0.28)" strokeWidth="1.2" />
          <line x1="92" y1="608" x2="104" y2="608" stroke="rgba(26,25,24,0.28)" strokeWidth="1.2" />
          <line x1="98" y1="602" x2="98" y2="614" stroke="rgba(26,25,24,0.28)" strokeWidth="1.2" />
          <line x1="596" y1="608" x2="608" y2="608" stroke="rgba(26,25,24,0.28)" strokeWidth="1.2" />
          <line x1="602" y1="602" x2="602" y2="614" stroke="rgba(26,25,24,0.28)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* ── HUD labels ── */}
      <div
        ref={hudRef}
        className="pointer-events-none absolute inset-0 z-20 font-mono text-[10px] tracking-[0.22em] text-[#064e3b] opacity-0 p-7 md:p-10"
      >
        <div className="absolute top-8 left-7 flex items-center gap-2 md:left-10 md:top-10">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ea580c]" />
          <span className="font-bold uppercase">Kim Ngân Steel</span>
        </div>
        <div className="absolute top-8 right-7 hidden text-right text-[#064e3b] sm:block md:right-10 md:top-10">
          Tôn thép&nbsp;&nbsp;|&nbsp;&nbsp;Gia công&nbsp;&nbsp;|&nbsp;&nbsp;Phân phối
        </div>
      </div>

      {/* ── Left product model — fades right + top ── */}
      <div
        ref={leftModelRef}
        className="pointer-events-none absolute -bottom-3 -left-12 z-10 hidden opacity-0 sm:block"
        style={{
          width: "clamp(330px, 30vw, 520px)",
          height: "40vh",
          WebkitMaskImage: "linear-gradient(to top right, black 48%, rgba(0,0,0,.96) 68%, transparent 94%)",
          maskImage: "linear-gradient(to top right, black 48%, rgba(0,0,0,.96) 68%, transparent 94%)",
        }}
      >
        <img
          src="/model-intro1.svg"
          alt="Tôn cuộn và tôn tấm Kim Ngân Steel"
          className="w-full h-full object-contain drop-shadow-[0_24px_44px_rgba(26,25,24,0.16)]"
          style={{ objectPosition: "left bottom" }}
          draggable={false}
        />
      </div>

      {/* ── Right product model — fades left + top ── */}
      <div
        ref={rightModelRef}
        className="pointer-events-none absolute bottom-0 right-0 z-10 hidden opacity-0 sm:block"
        style={{
          width: "clamp(350px, 33vw, 560px)",
          height: "40vh",
          WebkitMaskImage: "linear-gradient(to top left, black 48%, rgba(0,0,0,.96) 68%, transparent 94%)",
          maskImage: "linear-gradient(to top left, black 48%, rgba(0,0,0,.96) 68%, transparent 94%)",
        }}
      >
        <img
          src="/model-intro2.svg"
          alt="Thép hộp, thép hình và tôn cán sóng Kim Ngân Steel"
          className="w-full h-full object-contain drop-shadow-[0_24px_44px_rgba(26,25,24,0.16)]"
          style={{ objectPosition: "right bottom" }}
          draggable={false}
        />
      </div>

      {/* ── Centerpiece: Logo + Tagline — TRUE CENTER ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={centerpieceRef}
          className="relative z-20 flex flex-col items-center text-center opacity-0 px-4"
          style={{ marginTop: "-2vh" }}
        >
          {/* Big 3D Logo */}
          <div className="mb-1 flex items-center justify-center overflow-visible"
            style={{ width: "clamp(280px, 35vw, 520px)", height: "clamp(280px, 35vw, 520px)" }}
          >
            <img
              src="/partners/logo.svg"
              alt="Kim Ngân Steel Logo"
              className="w-full h-full scale-[1.18] object-contain drop-shadow-[0_28px_56px_rgba(26,25,24,0.24)]"
            />
          </div>

          {/* Tagline */}
          <p
            className="font-mono uppercase text-[#064e3b]"
            style={{ fontSize: "clamp(9px, 0.85vw, 12px)", letterSpacing: "0.28em" }}
          >
            Vật liệu bền vững cho công trình hiện đại
          </p>
        </div>
      </div>


      {/* ── Loading bar + CTA ── */}
      <div className="pointer-events-none absolute bottom-10 md:bottom-14 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center">
        <div ref={loadingContainerRef} className="flex flex-col items-center font-mono">
          <div className="relative h-[1.5px] w-[180px] overflow-hidden rounded-full bg-[#064e3b]/12">
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#064e3b] transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 text-[9px] tracking-[0.24em] text-[#064e3b] font-mono">
            ĐANG TẢI {progress.toString().padStart(2, "0")}%
          </div>
        </div>

        <div
          ref={ctaRef}
          className="absolute -top-1 flex flex-col items-center gap-2.5 opacity-0"
        >
          <span className="whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-[0.34em] text-[#ea580c]">
            Nhấn để khám phá
          </span>
          <span className="block h-px w-44 bg-[#ea580c]/55" />
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none" className="animate-bounce text-[#ea580c]">
            <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* ── Invisible full-screen click ── */}
      <button
        onClick={handleEnter}
        onKeyDown={handleKeyDown}
        className="absolute inset-0 z-40 h-full w-full cursor-pointer opacity-0"
        aria-label="Vào trang chủ Kim Ngân Steel"
        disabled={!isReady || isEntering}
      />
    </div>
  );
}
