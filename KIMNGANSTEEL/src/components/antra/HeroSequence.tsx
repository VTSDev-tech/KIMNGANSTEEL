"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroSequenceFrames } from "./heroSequenceManifest";

interface HeroSequenceProps {
  className?: string;
}

gsap.registerPlugin(ScrollTrigger);

const frameCameraFixes: Array<{ scale: number; x: number; y: number }> = [
  { scale: 1, x: 0, y: 0 },
  { scale: 1, x: 0, y: 0 },
  { scale: 1, x: 0, y: 0 },
  { scale: 1, x: 0, y: 0 },
  { scale: 1, x: 0, y: 0 },
  { scale: 1, x: 0, y: 0 },
  { scale: 1, x: 0, y: 0 },
  { scale: 1, x: 0, y: 0 },
  { scale: 1, x: 0, y: 0 },
  { scale: 1, x: 0, y: 0 },
  { scale: 1, x: 0, y: 0 },
];

function drawFrameImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
  alpha: number,
  camera = { scale: 1, x: 0, y: 0 },
  fit: "cover" | "contain" = "cover"
) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = canvasWidth / canvasHeight;
  const useHeight =
    fit === "cover" ? imageRatio > canvasRatio : imageRatio < canvasRatio;
  const baseWidth = useHeight ? canvasHeight * imageRatio : canvasWidth;
  const baseHeight = useHeight ? canvasHeight : canvasWidth / imageRatio;
  const drawWidth = baseWidth * camera.scale;
  const drawHeight = baseHeight * camera.scale;
  const x = (canvasWidth - drawWidth) / 2 + canvasWidth * camera.x;
  const y = (canvasHeight - drawHeight) / 2 + canvasHeight * camera.y;

  context.globalAlpha = alpha;
  context.drawImage(image, x, y, drawWidth, drawHeight);
  context.globalAlpha = 1;
}

function smoothStep(value: number) {
  return value * value * (3 - 2 * value);
}

export function HeroSequence({ className = "" }: HeroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const playbackRef = useRef({ target: 0, current: 0, raf: 0 });
  
  // Refs for Blueprint Animation Elements
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);
  const path4Ref = useRef<SVGPathElement>(null); // Additional detail line
  const svgLayerRef = useRef<HTMLDivElement>(null);

  const brandRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadFrame = (src: string) =>
      new Promise<HTMLImageElement>((resolve) => {
        const image = new Image();
        image.decoding = "async";
        image.src = src;
        image.onload = () => resolve(image);
        image.onerror = () => resolve(image);
      });

    Promise.all(heroSequenceFrames.map(loadFrame)).then((images) => {
      if (cancelled) return;
      imagesRef.current = images;
      requestAnimationFrame(() => setIsReady(true));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    if (!isReady || typeof window === "undefined") return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const section = container?.closest<HTMLElement>(".hero-scroll-sequence");
    if (!container || !canvas || !section) return;

    const p1 = path1Ref.current;
    const p2 = path2Ref.current;
    const p3 = path3Ref.current;
    const p4 = path4Ref.current;
    const svgLayer = svgLayerRef.current;
    
    const brandElement = brandRef.current;

    const images = imagesRef.current;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context || images.length === 0) return;

    const isTouchViewport =
      window.matchMedia("(max-width: 767px), (pointer: coarse)").matches ||
      "ontouchstart" in window;

    // Initialize SVG Path Dash Arrays
    [p1, p2, p3, p4].forEach((p) => {
      if (p) {
        const length = p.getTotalLength();
        p.style.strokeDasharray = length.toString();
        p.style.strokeDashoffset = length.toString();
      }
    });

    const renderFrame = (progress: number) => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * pixelRatio));
      const height = Math.max(1, Math.round(canvas.clientHeight * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.fillStyle = "#f7f7f5";
      context.fillRect(0, 0, width, height);

      const framePosition = gsap.utils.clamp(0, images.length - 1, progress * (images.length - 1));
      const currentIndex = Math.floor(framePosition);
      const nextIndex = Math.min(images.length - 1, currentIndex + 1);
      const rawBlend = framePosition - currentIndex;
      const blend = smoothStep(rawBlend);
      const currentImage = images[currentIndex];
      const nextImage = images[nextIndex];
      const currentCamera = frameCameraFixes[currentIndex] ?? frameCameraFixes[0];
      const nextCamera = frameCameraFixes[nextIndex] ?? currentCamera;
      const fit = window.matchMedia("(max-width: 767px)").matches
        ? "contain"
        : "cover";

      drawFrameImage(context, currentImage, width, height, 1, currentCamera, fit);

      if (nextImage !== currentImage) {
        drawFrameImage(context, nextImage, width, height, blend, nextCamera, fit);
      }
    };

    const tick = () => {
      const playback = playbackRef.current;
      playback.current +=
        (playback.target - playback.current) * (isTouchViewport ? 0.22 : 0.16);
      if (Math.abs(playback.target - playback.current) < 0.0005) {
        playback.current = playback.target;
      }

      renderFrame(playback.current);

      const prog = playback.current;

      // --- BLUEPRINT DRAWING ANIMATIONS ---
      
      // Path 1 (Base width dimension) active from 0.1 to 0.4
      if (p1) {
        const p1Len = p1.getTotalLength();
        const p1Prog = gsap.utils.clamp(0, 1, (prog - 0.1) / 0.3);
        p1.style.strokeDashoffset = (p1Len * (1 - p1Prog)).toString();
      }

      // Path 2 (Vertical pillar dimension) active from 0.2 to 0.5
      if (p2) {
        const p2Len = p2.getTotalLength();
        const p2Prog = gsap.utils.clamp(0, 1, (prog - 0.2) / 0.3);
        p2.style.strokeDashoffset = (p2Len * (1 - p2Prog)).toString();
      }

      // Path 3 (Roof span dimension) active from 0.4 to 0.7
      if (p3) {
        const p3Len = p3.getTotalLength();
        const p3Prog = gsap.utils.clamp(0, 1, (prog - 0.4) / 0.3);
        p3.style.strokeDashoffset = (p3Len * (1 - p3Prog)).toString();
      }

      // Path 4 (Detail corner line) active from 0.3 to 0.6
      if (p4) {
        const p4Len = p4.getTotalLength();
        const p4Prog = gsap.utils.clamp(0, 1, (prog - 0.3) / 0.3);
        p4.style.strokeDashoffset = (p4Len * (1 - p4Prog)).toString();
      }

      // Reveal Brand Content cleanly over Frame 11 (between 75% and 100% progress)
      if (brandElement) {
        const brandProgress = gsap.utils.clamp(0, 1, (prog - 0.85) / 0.15);
        gsap.set(brandElement, {
          opacity: brandProgress,
          y: (1 - brandProgress) * 24,
          pointerEvents: brandProgress > 0.5 ? 'auto' : 'none'
        });
      }

      // Cinematic Majestic Camera Zoom (1.0 -> 1.12)
      const currentScale = 1 + prog * (isTouchViewport ? 0.04 : 0.12);
      gsap.set([canvas, svgLayer], { scale: currentScale, transformOrigin: "center center" });

      // Fade out Blueprint SVG Layer at the end
      if (svgLayer) {
        const svgOpacity = 1 - gsap.utils.clamp(0, 1, (prog - 0.85) / 0.15);
        gsap.set(svgLayer, { opacity: svgOpacity });
      }

      // Fade out Initial Intro Title
      if (introRef.current) {
        const introOpacity = 1 - gsap.utils.clamp(0, 1, prog / 0.15);
        gsap.set(introRef.current, { opacity: introOpacity, y: (1 - introOpacity) * -30 });
      }

      playback.raf = requestAnimationFrame(tick);
    };

    const ctx = gsap.context(() => {
      renderFrame(0);
      playbackRef.current.raf = requestAnimationFrame(tick);

      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: "none" },
        onUpdate: () => {
          playbackRef.current.target = timeline.progress();
        },
      });

      timeline.to({}, { duration: 1 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: isTouchViewport ? 1.15 : 2,
        animation: timeline,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });

      const resize = () => {
        renderFrame(playbackRef.current.current);
        // Recalculate SVG lengths on resize if needed
        [p1, p2, p3, p4].forEach((p) => {
          if (p) {
            const length = p.getTotalLength();
            p.style.strokeDasharray = length.toString();
          }
        });
      };
      
      window.addEventListener("resize", resize);
      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        window.removeEventListener("resize", resize);
      };
    }, container);

    return () => {
      cancelAnimationFrame(playbackRef.current.raf);
      ctx.revert();
    };
  }, [isReady]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full min-h-svh w-full overflow-hidden bg-[#f7f7f5] ${className}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      {!isReady ? (
        <img
          src={heroSequenceFrames[0]}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain md:object-cover pointer-events-none select-none"
        />
      ) : null}

      {/* PURE BLUEPRINT SVG DRAWING LAYER (No heavy HTML boxes) */}
      <div ref={svgLayerRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <svg className="w-full h-full opacity-60" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          {/* Defs for arrow markers */}
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#1A1918" />
            </marker>
            <marker id="dot" markerWidth="4" markerHeight="4" refX="2" refY="2">
              <circle cx="2" cy="2" r="2" fill="#1A1918" />
            </marker>
            <marker id="crosshair" markerWidth="10" markerHeight="10" refX="5" refY="5">
              <path d="M 5 0 L 5 10 M 0 5 L 10 5" stroke="#C28E5C" strokeWidth="0.5" fill="none" />
            </marker>
          </defs>

          {/* Top Left Angle Detail */}
          <g>
            <path
              ref={path4Ref}
              d="M 200 200 L 250 200 L 250 250"
              stroke="#1A1918"
              strokeWidth="1"
              fill="none"
              strokeDasharray="2 2"
              markerStart="url(#crosshair)"
              markerEnd="url(#crosshair)"
            />
            <text x="210" y="190" fill="#1A1918" fontSize="10" fontFamily="monospace" letterSpacing="1">ANGLE: 90°</text>
          </g>

          {/* Path 1: Base width dimension (bottom) */}
          <g>
            <path
              ref={path1Ref}
              d="M 500 850 L 1400 850"
              stroke="#1A1918"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 4"
              markerStart="url(#arrow)"
              markerEnd="url(#arrow)"
            />
            <text x="950" y="840" fill="#1A1918" fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="2">DIMENSION: 15,000m²</text>
          </g>

          {/* Path 2: Pillar height dimension (left) */}
          <g>
            <path
              ref={path2Ref}
              d="M 450 750 L 450 350"
              stroke="#1A1918"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 4"
              markerStart="url(#arrow)"
              markerEnd="url(#arrow)"
            />
            <text x="435" y="550" fill="#1A1918" fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="2" transform="rotate(-90 435 550)">ELEVATION: + 12.5M</text>
          </g>

          {/* Path 3: Roof span dimension (top angle) */}
          <g>
            <path
              ref={path3Ref}
              d="M 600 250 L 1300 250"
              stroke="#C28E5C"
              strokeWidth="1"
              fill="none"
              strokeDasharray="2 4"
              markerStart="url(#dot)"
              markerEnd="url(#dot)"
            />
            <path d="M 950 250 L 950 220" stroke="#C28E5C" strokeWidth="1" strokeDasharray="2 2" />
            <text x="950" y="210" fill="#C28E5C" fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="1">MATERIAL: AZ150 SPAN</text>
          </g>
          
          {/* Static minimal architectural elements (Crosshairs) */}
          <circle cx="200" cy="850" r="10" stroke="#1A1918" strokeWidth="0.5" fill="none" />
          <path d="M 195 850 L 205 850 M 200 845 L 200 855" stroke="#1A1918" strokeWidth="0.5" />
          
          <circle cx="1600" cy="200" r="10" stroke="#1A1918" strokeWidth="0.5" fill="none" />
          <path d="M 1595 200 L 1605 200 M 1600 195 L 1600 205" stroke="#1A1918" strokeWidth="0.5" />
        </svg>
      </div>

      {/* INITIAL OPENING TITLE & SCROLL CUE (Fades out on scroll) */}
      <div
        ref={introRef}
        className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-14 max-w-[1600px] mx-auto pointer-events-none"
      >
        <div className="max-w-2xl space-y-6 pt-12">
          <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-[0.3em] text-[#C28E5C]">
            <span className="w-2 h-2 rounded-full bg-[#C28E5C] animate-pulse" />
            <span className="uppercase">01 / QUY MÔ NHÀ MÁY</span>
          </div>
          <div className="space-y-1 font-sans">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-[#1A1918] leading-[0.98] uppercase drop-shadow-sm">
              NHÀ MÁY CÁN TÔN
            </h1>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-[#1A1918] leading-[0.98] uppercase drop-shadow-sm">
              GIA CÔNG THÉP TRỰC TIẾP
            </h1>
          </div>
          
          <div className="pt-8">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-[#1A1918]/5 border border-[#1A1918]/10 backdrop-blur-sm shadow-sm animate-bounce">
              <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-[#1A1918] uppercase">
                SCROLL TO INITIALIZE
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1A1918]">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Brand Content Revealed Over Frame 11 */}
      <div
        ref={brandRef}
        className="absolute inset-0 z-30 flex flex-col justify-center px-6 md:px-14 max-w-[1600px] mx-auto pointer-events-none opacity-0"
      >
        <div className="max-w-2xl space-y-6 pointer-events-auto pt-12">
          <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-[0.3em] text-[#C28E5C]">
            <span className="w-2 h-2 rounded-full bg-[#C28E5C]" />
            <span className="uppercase">KIM NGÂN STEEL</span>
          </div>

          <div className="space-y-1 font-sans">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-[#1A1918] leading-[0.98] uppercase">
              Vật liệu vững chắc
            </h1>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-[#1A1918] leading-[0.98] uppercase">
              Kiến tạo công trình bền vững
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-[#524D4A] font-sans leading-relaxed max-w-md">
            Nhà máy cán tôn trực tiếp. Giá cạnh tranh. Giao hàng nhanh 24h.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#materials-showcase"
              className="px-7 py-3.5 rounded-full bg-[#1A1918] text-[#F7F7F4] font-bold text-xs uppercase tracking-widest hover:bg-[#C28E5C] hover:text-[#1A1918] transition-colors duration-300 shadow-md"
            >
              Khám phá sản phẩm
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full border border-[#1A1918]/30 bg-white/60 backdrop-blur-md text-[#1A1918] font-bold text-xs uppercase tracking-widest hover:bg-[#1A1918] hover:text-[#F7F7F4] transition-colors duration-300"
            >
              Nhận báo giá
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
