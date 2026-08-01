"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HeroAssemblyProps {
  className?: string;
}

gsap.registerPlugin(ScrollTrigger);

const steelModules = [
  { x: 452, y: 190, w: 132, r: -20, fx: -360, fy: -180 },
  { x: 560, y: 165, w: 156, r: 9, fx: 120, fy: -240 },
  { x: 682, y: 184, w: 148, r: -10, fx: 350, fy: -190 },
  { x: 432, y: 318, w: 178, r: 28, fx: -390, fy: 20 },
  { x: 585, y: 300, w: 154, r: -22, fx: 240, fy: -8 },
  { x: 724, y: 322, w: 168, r: 18, fx: 410, fy: 58 },
  { x: 450, y: 454, w: 142, r: -14, fx: -270, fy: 220 },
  { x: 592, y: 486, w: 210, r: 0, fx: 0, fy: 280 },
  { x: 782, y: 452, w: 138, r: 14, fx: 300, fy: 220 },
];

export function HeroAssembly({ className = "" }: HeroAssemblyProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blueprintRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<SVGSVGElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const scrollSection = section?.closest<HTMLElement>(".hero-scroll-sequence");
    const blueprint = blueprintRef.current;
    const modules = modulesRef.current;
    const logo = logoRef.current;
    const scan = scanRef.current;
    const content = contentRef.current;
    if (!section || !scrollSection || !blueprint || !modules || !logo || !scan || !content) return;

    const ctx = gsap.context(() => {
      const drawLines = Array.from(
        blueprint.querySelectorAll<SVGPathElement | SVGLineElement | SVGPolylineElement>(".blueprint-draw"),
      );
      const anchors = Array.from(blueprint.querySelectorAll<HTMLElement>(".blueprint-anchor"));
      const moduleEls = Array.from(modules.querySelectorAll<SVGGElement>(".steel-module"));
      const logoParts = Array.from(logo.querySelectorAll<SVGElement>(".logo-final-part"));
      const copyEls = Array.from(content.querySelectorAll<HTMLElement>(".assembly-copy"));

      drawLines.forEach((line) => {
        const length = typeof line.getTotalLength === "function" ? line.getTotalLength() : 1000;
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      });

      gsap.set(anchors, { autoAlpha: 0, scale: 0.2, transformOrigin: "50% 50%" });
      gsap.set(moduleEls, {
        autoAlpha: 0,
        x: (_, el: SVGGElement) => Number(el.dataset.fx ?? 0),
        y: (_, el: SVGGElement) => Number(el.dataset.fy ?? 0),
        rotate: (_, el: SVGGElement) => Number(el.dataset.r ?? 0) * -1.35,
        transformOrigin: "50% 50%",
      });
      gsap.set(logo, { autoAlpha: 1 });
      gsap.set(logoParts, {
        autoAlpha: 0,
        y: 18,
        scale: 0.96,
        filter: "blur(8px)",
        transformOrigin: "50% 50%",
      });
      gsap.set(scan, { autoAlpha: 0, xPercent: -90 });
      gsap.set(copyEls, { autoAlpha: 0, y: 24 });

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        gsap.set(drawLines, { strokeDashoffset: 0 });
        gsap.set(anchors, { autoAlpha: 1, scale: 1 });
        gsap.set(moduleEls, { autoAlpha: 0 });
        gsap.set(logoParts, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" });
        gsap.set(copyEls, { autoAlpha: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "none" } });

      timeline
        .to(drawLines, {
          strokeDashoffset: 0,
          duration: 1,
          stagger: 0.03,
          ease: "power2.out",
        })
        .to(
          anchors,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.42,
            stagger: 0.03,
            ease: "back.out(1.65)",
          },
          0.28,
        )
        .to(
          moduleEls,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotate: (_, el: SVGGElement) => Number(el.dataset.r ?? 0),
            duration: 1.28,
            stagger: { each: 0.052, from: "center" },
            ease: "power3.out",
          },
          0.86,
        )
        .to(scan, { autoAlpha: 0.85, xPercent: 74, duration: 1.2, ease: "sine.inOut" }, 1)
        .to(scan, { autoAlpha: 0, duration: 0.42, ease: "sine.out" }, ">-0.16")
        .to(
          moduleEls,
          {
            autoAlpha: 0,
            scale: 0.74,
            duration: 0.62,
            stagger: 0.02,
            ease: "power2.inOut",
          },
          2.08,
        )
        .to(blueprint, { autoAlpha: 0.24, duration: 0.78, ease: "sine.out" }, 2.18)
        .to(
          logoParts,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.72,
            stagger: { each: 0.055, from: "start" },
            ease: "power3.out",
          },
          2.32,
        )
        .to(
          copyEls,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.11,
            ease: "power3.out",
          },
          3.08,
        )
        .to({}, { duration: 0.8 });

      ScrollTrigger.create({
        trigger: scrollSection,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        animation: timeline,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={`hero-assembly relative h-full min-h-svh overflow-hidden ${className}`}>
      <div ref={blueprintRef} className="hero-assembly-blueprint" aria-hidden="true">
        <svg viewBox="0 0 1200 760" preserveAspectRatio="none">
          <path className="blueprint-draw" d="M206 594 H996" />
          <path className="blueprint-draw" d="M270 520 L580 222 L914 520" />
          <path className="blueprint-draw" d="M410 190 V614" />
          <path className="blueprint-draw" d="M600 140 V628" />
          <path className="blueprint-draw" d="M790 190 V614" />
          <polyline className="blueprint-draw" points="376,492 478,388 586,478 704,360 824,492" />
          <line className="blueprint-draw" x1="330" y1="548" x2="520" y2="548" />
          <line className="blueprint-draw" x1="682" y1="548" x2="872" y2="548" />
        </svg>
        {[
          ["18%", "68%"],
          ["34%", "55%"],
          ["50%", "29%"],
          ["66%", "55%"],
          ["82%", "68%"],
        ].map(([left, top]) => (
          <span key={`${left}-${top}`} className="blueprint-anchor" style={{ left, top }} />
        ))}
      </div>

      <div className="hero-assembly-museum" aria-hidden="true" />
      <div ref={scanRef} className="hero-assembly-scan" aria-hidden="true" />

      <svg ref={modulesRef} className="hero-assembly-modules" viewBox="0 0 1200 760" aria-hidden="true">
        <defs>
          <linearGradient id="heroModuleSteel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="22%" stopColor="#ffffff" />
            <stop offset="46%" stopColor="#064e3b" />
            <stop offset="72%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
          <filter id="heroModuleShadow" x="-50%" y="-60%" width="200%" height="220%">
            <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#064e3b" floodOpacity="0.2" />
          </filter>
        </defs>
        {steelModules.map((module) => (
          <g
            key={`${module.x}-${module.y}`}
            className="steel-module"
            data-fx={module.fx}
            data-fy={module.fy}
            data-r={module.r}
            transform={`translate(${module.x} ${module.y})`}
          >
            <rect
              x={module.w / -2}
              y="-12"
              width={module.w}
              height="24"
              rx="3"
              fill="url(#heroModuleSteel)"
              filter="url(#heroModuleShadow)"
            />
            <line x1={module.w / -2 + 12} y1="-8" x2={module.w / 2 - 12} y2="-8" stroke="rgba(255,255,255,0.42)" />
            <line x1={module.w / -2 + 12} y1="7" x2={module.w / 2 - 12} y2="7" stroke="rgba(26,25,24,0.22)" />
          </g>
        ))}
      </svg>

      <svg
        ref={logoRef}
        className="hero-assembly-logo"
        viewBox="0 0 520 660"
        role="img"
        aria-label="Kim Ngân Steel logo"
      >
        <defs>
          <linearGradient id="heroLogoSteel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="17%" stopColor="#ffffff" />
            <stop offset="42%" stopColor="#064e3b" />
            <stop offset="63%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
          <linearGradient id="heroLogoGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="48%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <filter id="heroLogoShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="22" stdDeviation="17" floodColor="#064e3b" floodOpacity="0.22" />
          </filter>
        </defs>
        <g filter="url(#heroLogoShadow)">
          <g className="logo-final-part">
            <path
              d="M118 70 L118 318 M118 202 L232 70 M150 202 L250 318"
              fill="none"
              stroke="url(#heroLogoSteel)"
              strokeWidth="34"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            <path
              d="M118 70 L118 318 M118 202 L232 70 M150 202 L250 318"
              fill="none"
              stroke="url(#heroLogoGold)"
              strokeWidth="5"
              strokeLinejoin="miter"
            />
          </g>
          <g className="logo-final-part">
            <path
              d="M282 318 L282 70 L386 318 L386 70"
              fill="none"
              stroke="url(#heroLogoSteel)"
              strokeWidth="34"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            <path
              d="M282 318 L282 70 L386 318 L386 70"
              fill="none"
              stroke="url(#heroLogoGold)"
              strokeWidth="5"
              strokeLinejoin="miter"
            />
          </g>
          <path
            className="logo-final-part"
            d="M96 358 C148 414 228 438 260 438 C292 438 372 414 424 358"
            fill="none"
            stroke="url(#heroLogoSteel)"
            strokeWidth="28"
            strokeLinecap="square"
          />
          <path
            className="logo-final-part"
            d="M86 378 C144 452 224 482 260 482 C296 482 378 452 434 378"
            fill="none"
            stroke="url(#heroLogoGold)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text className="logo-final-part hero-logo-name" x="260" y="570" textAnchor="middle">
            KIM NGÂN
          </text>
          <text className="logo-final-part hero-logo-steel" x="260" y="638" textAnchor="middle">
            STEEL
          </text>
        </g>
      </svg>

      <div ref={contentRef} className="hero-assembly-content">
        <p className="assembly-copy hero-assembly-kicker">From blueprint to structure</p>
        <h1 className="assembly-copy">Kim Ngân Steel</h1>
        <p className="assembly-copy hero-assembly-sub">
          Từ bản vẽ, vật liệu thép được gia công chuẩn xác để dựng nền cho công trình bền vững.
        </p>
      </div>

      <div className="hero-assembly-footer" aria-hidden="true">
        <span>01 / Technical build</span>
        <i />
        <span>Scroll to assemble</span>
      </div>
    </div>
  );
}
