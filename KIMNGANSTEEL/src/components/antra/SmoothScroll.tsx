"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const unlockStaleScrollLock = () => {
      const body = document.body;
      const hasActiveOverlay =
        body.classList.contains("menu-open") ||
        body.classList.contains("search-open") ||
        document.querySelector("[data-scroll-lock='true']");

      if (!hasActiveOverlay) {
        document.documentElement.style.overflow = "";
        body.style.overflow = "";
        body.style.paddingRight = "";
      }
    };

    unlockStaleScrollLock();

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const refresh = () => {
      ScrollTrigger.refresh();
    };

    const refreshFrame = requestAnimationFrame(() => {
      unlockStaleScrollLock();
      ScrollTrigger.refresh();
    });

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
