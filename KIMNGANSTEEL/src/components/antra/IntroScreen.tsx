
"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { heroSequenceFrames } from './heroSequenceManifest';

const DEV_SKIP_INTRO = false;

const lockPageScroll = () => {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
};

const unlockPageScroll = () => {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerpieceRef = useRef<HTMLDivElement>(null);
  const hudSvgRef = useRef<SVGSVGElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const tilesGridRef = useRef<HTMLDivElement>(null);
  
  // UI Elements
  const loadingContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  // Lock scrolling while intro is active
  useLayoutEffect(() => {
    if (DEV_SKIP_INTRO) {
      setShouldRender(false);
      onComplete();
      return;
    }
    lockPageScroll();
    return () => unlockPageScroll();
  }, [onComplete]);

  // Preload Assets & Smooth Guaranteed Drawing Intro Animation
  useEffect(() => {
    if (!shouldRender || DEV_SKIP_INTRO) return;

    // 1. Asset preloading in background
    heroSequenceFrames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // 2. Guaranteed smooth drawing timeline (1.8 seconds)
    const drawObj = { val: 0 };
    gsap.to(drawObj, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        const cur = Math.round(drawObj.val);
        setProgress(cur);
        
        // Update SVG stroke dash offsets
        if (hudSvgRef.current) {
          const drawables = hudSvgRef.current.querySelectorAll('.cad-draw');
          drawables.forEach((el) => {
            const path = el as SVGPathElement;
            const length = path.getTotalLength ? path.getTotalLength() : 600;
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length * (1 - cur / 100)}`;
          });
        }
      },
      onComplete: () => {
        setIsReady(true);
      }
    });

  }, [shouldRender]);

  // Blueprint Completion Sequence
  useEffect(() => {
    if (!isReady || !shouldRender) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Fade out preloader percentage bar
      tl.to(loadingContainerRef.current, { opacity: 0, duration: 0.3, ease: "power2.inOut" });

      // 2. Light Sweep across the logo
      tl.fromTo(scanLineRef.current,
        { left: "-20%", opacity: 0 },
        { left: "120%", opacity: 0.7, duration: 1.2, ease: "power2.inOut" },
        "+=0.1"
      );

      // 3. Reveal HUD elements and Click Instruction
      tl.to(hudRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6");
      tl.fromTo(textRef.current,
        { opacity: 0, y: 10, letterSpacing: "0.1em" },
        { opacity: 1, y: 0, letterSpacing: "0.3em", duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

    }, containerRef);

    return () => ctx.revert();
  }, [isReady, shouldRender]);

  // Option 3: 3D Floor Tile Sink Transition Engine
  const handleEnter = () => {
    if (!isReady || isEntering) return;
    setIsEntering(true);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setShouldRender(false);
          unlockPageScroll();
          onComplete();
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setShouldRender(false);
          unlockPageScroll();
          onComplete();
        }
      });

      // 1. Hide HUD & text instantly
      tl.to([hudRef.current, textRef.current, loadingContainerRef.current], { opacity: 0, duration: 0.2 }, 0);

      // 2. Scale & fade logo centerpiece
      tl.to(centerpieceRef.current, {
        scale: 1.3,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in"
      }, 0);

      // 3. Option 3: 3D Grid Tiles Staggered Flip & Sink Animation
      if (tilesGridRef.current) {
        const tiles = tilesGridRef.current.querySelectorAll('.grid-tile');
        
        tl.to(tiles, {
          rotateX: 90,
          rotateY: -30,
          z: -400,
          opacity: 0,
          scale: 0.6,
          duration: 1.2,
          ease: "power3.inOut",
          stagger: {
            grid: [4, 6],
            from: "center",
            amount: 0.8
          }
        }, 0.1);
      }

      // 4. Overall container fade out seamless finish
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.4");

    }, containerRef);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleEnter();
    }
  };

  if (!shouldRender) return null;

  // Generate 24 Tiles (4 rows x 6 cols) for 3D Tile Sink Effect
  const tileCount = 24;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#ECE8DE] text-[#1A1918] [perspective:1200px]"
    >
      {/* Option 3: 3D Floor Tiles Layer (4x6 Grid) */}
      <div 
        ref={tilesGridRef}
        className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none z-0 [transform-style:preserve-3d]"
      >
        {Array.from({ length: tileCount }).map((_, i) => (
          <div 
            key={i}
            className="grid-tile w-full h-full bg-[#ECE8DE] border border-[#1A1918]/10 [transform-style:preserve-3d] origin-center"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(26, 25, 24, 0.04) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(26, 25, 24, 0.04) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}
          />
        ))}
      </div>

      {/* 2. Central Official KIM NGÂN STEEL Logo & CAD Compass Layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4 z-10">
        
        {/* Technical CAD Compass SVG */}
        <svg
          ref={hudSvgRef}
          viewBox="0 0 800 800"
          className="absolute w-[600px] h-[600px] overflow-visible pointer-events-none"
        >
          <g stroke="rgba(26, 25, 24, 0.25)" strokeWidth="1" fill="none">
            <line className="cad-draw" x1="50" y1="400" x2="750" y2="400" strokeDasharray="4 4" />
            <line className="cad-draw" x1="400" y1="50" x2="400" y2="750" strokeDasharray="4 4" />
            <circle className="cad-draw" cx="400" cy="400" r="260" strokeWidth="1.2" />
            <circle className="cad-draw" cx="400" cy="400" r="280" strokeDasharray="3 6" />
            <circle className="cad-draw" cx="400" cy="400" r="180" strokeDasharray="6 6" />
            
            {/* Axis Degree Markers */}
            <circle className="cad-draw" cx="400" cy="140" r="3" fill="#1A1918" />
            <circle className="cad-draw" cx="400" cy="660" r="3" fill="#1A1918" />
            <circle className="cad-draw" cx="140" cy="400" r="3" fill="#1A1918" />
            <circle className="cad-draw" cx="660" cy="400" r="3" fill="#1A1918" />
          </g>
        </svg>

        {/* Official Brand Logo & Name Centerpiece */}
        <div 
          ref={centerpieceRef}
          className="relative flex flex-col items-center text-center z-10 p-8 [transform-style:preserve-3d]"
        >
          {/* Official Logo Image */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6 flex items-center justify-center">
            <img 
              src="/KIMNGANLOGO.svg" 
              alt="Kim Ngân Steel Logo" 
              className="w-full h-full object-contain drop-shadow-[0_4px_20px_rgba(26,25,24,0.08)]"
            />
          </div>

          {/* Typography */}
          <h1 className="text-2xl md:text-3xl font-bold tracking-[0.25em] text-[#1A1918] uppercase mb-2">
            KIM NGÂN STEEL
          </h1>
          <p className="text-[11px] font-mono tracking-[0.3em] text-[#8E857B] uppercase">
            NHÀ MÁY CÁN TÔN &amp; GIA CÔNG THÉP
          </p>

          {/* Light Sweep Effect */}
          <div 
            ref={scanLineRef}
            className="absolute top-0 bottom-0 w-[100px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none transform -skew-x-12 opacity-0"
          />
        </div>
      </div>

      {/* 3. Architectural Technical HUD Header & Footer */}
      <div 
        ref={hudRef}
        className="absolute inset-0 pointer-events-none z-[20] opacity-0 p-8 md:p-12 font-mono text-[10px] tracking-widest text-[#1A1918]"
      >
        {/* Corner Crosshairs */}
        <div className="absolute top-8 left-8 w-8 h-[1px] bg-[#1A1918]/30" />
        <div className="absolute top-8 left-8 w-[1px] h-8 bg-[#1A1918]/30" />
        
        <div className="absolute top-8 right-8 w-8 h-[1px] bg-[#1A1918]/30" />
        <div className="absolute top-8 right-8 w-[1px] h-8 bg-[#1A1918]/30" />
        
        <div className="absolute bottom-8 left-8 w-8 h-[1px] bg-[#1A1918]/30" />
        <div className="absolute bottom-8 left-8 w-[1px] h-8 bg-[#1A1918]/30" />
        
        <div className="absolute bottom-8 right-8 w-8 h-[1px] bg-[#1A1918]/30" />
        <div className="absolute bottom-8 right-8 w-[1px] h-8 bg-[#1A1918]/30" />

        {/* Technical Header */}
        <div className="absolute top-10 left-12 flex items-center gap-2 text-[#1A1918]">
          <span className="w-2 h-2 rounded-full bg-[#1A1918] animate-pulse" />
          <span className="font-bold">● ARCHITECTURAL STEEL SOLUTIONS</span>
        </div>

        <div className="absolute top-10 right-12 text-[#8E857B] text-right">
          EST. 2024 &nbsp;|&nbsp; HO CHI MINH CITY
        </div>

        <div className="absolute bottom-10 left-12 text-[#8E857B]">
          SYSTEM: BRAND CAD GENESIS
        </div>
        <div className="absolute bottom-10 right-12 text-[#1A1918] text-right font-bold">
          STATUS: READY
        </div>
      </div>

      {/* 4. Accessible Interactive Layer */}
      <button
        onClick={handleEnter}
        onKeyDown={handleKeyDown}
        className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-30"
        aria-label="Vào trang chủ Kim Ngân Steel"
        disabled={!isReady || isEntering}
      />

      {/* 5. Loading & Interaction UI */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-[25]">
        
        {/* Loader Progress Bar */}
        <div ref={loadingContainerRef} className="flex flex-col items-center font-mono">
          <div className="relative w-[240px] h-[2px] bg-[#1A1918]/10 overflow-hidden rounded-full">
            <div 
              ref={lineRef}
              className="absolute left-0 top-0 bottom-0 bg-[#1A1918] transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div 
            ref={percentageRef}
            className="mt-4 text-[#8E857B] text-[9px] tracking-[0.25em]"
          >
            INITIALIZING BRAND {progress.toString().padStart(2, '0')}%
          </div>
        </div>

        {/* Ready Instruction */}
        <div className="absolute top-0 flex h-full items-center justify-center">
          <div 
            ref={textRef}
            className="text-[#1A1918] font-sans text-[11px] font-bold uppercase whitespace-nowrap opacity-0 tracking-[0.3em]"
          >
            Nhấn để khám phá
          </div>
        </div>

      </div>
    </div>
  );
}
