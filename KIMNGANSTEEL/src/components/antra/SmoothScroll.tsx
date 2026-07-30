"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const unlockStaleScrollLock = () => {
      const body = document.body;
      const hasActiveOverlay =
        body.classList.contains("menu-open") ||
        body.classList.contains("search-open") ||
        body.dataset.scrollLock === "true";

      if (!hasActiveOverlay) {
        document.documentElement.style.overflow = "";
        body.style.overflow = "";
        body.style.paddingRight = "";
      }
    };

    unlockStaleScrollLock();

    const isTouchViewport =
      window.matchMedia("(max-width: 767px), (pointer: coarse)").matches ||
      "ontouchstart" in window;

    const refreshScrollTriggers = () => {
      unlockStaleScrollLock();
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
    };

    // Native touch scrolling avoids Lenis fighting momentum-based mobile scroll.
    if (isTouchViewport) {
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      const refreshFrame = requestAnimationFrame(() => {
        unlockStaleScrollLock();
        window.scrollTo(0, 0);
        refreshScrollTriggers();
      });
      const handleRefresh = () => refreshScrollTriggers();
      const staleLockWatchdog = window.setInterval(unlockStaleScrollLock, 700);

      window.addEventListener("load", handleRefresh, { once: true });
      window.addEventListener("resize", handleRefresh);
      window.addEventListener("orientationchange", handleRefresh);

      return () => {
        cancelAnimationFrame(refreshFrame);
        window.clearInterval(staleLockWatchdog);
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
        window.removeEventListener("resize", handleRefresh);
        window.removeEventListener("orientationchange", handleRefresh);
      };
    }

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
      unlockStaleScrollLock();
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
    };

    const refreshFrame = requestAnimationFrame(() => {
      unlockStaleScrollLock();
      lenis.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
    });

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    const staleLockWatchdog = window.setInterval(() => {
      const hasActiveOverlay =
        document.body.classList.contains("menu-open") ||
        document.body.classList.contains("search-open") ||
        document.body.dataset.scrollLock === "true";

      if (!hasActiveOverlay) {
        unlockStaleScrollLock();
        lenis.start();
      }
    }, 700);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      window.clearInterval(staleLockWatchdog);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
