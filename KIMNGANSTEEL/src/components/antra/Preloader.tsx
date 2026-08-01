"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    // 0.85s total cinematic opening duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="fixed inset-0 z-[10000] pointer-events-none select-none overflow-hidden font-sans">
          
          {/* TOP ARCHITECTURAL SHUTTER PANEL */}
          <motion.div
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.75, ease: [0.77, 0, 0.175, 1], delay: 0.25 }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#064e3b] border-b border-[#ea580c]/30 flex flex-col justify-between p-8 md:p-14 z-20"
          >
            <div className="flex items-center justify-between font-mono text-[11px] text-[#ea580c] font-bold tracking-[0.3em] uppercase">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] animate-pulse" />
                KIM NGÂN STEEL
              </span>
              <span className="hidden sm:inline-block text-[#ffffff]">ARCHITECTURAL LUXURY</span>
            </div>

            {/* Top Half Branding Text */}
            <div className="flex items-end justify-center h-full pb-3">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tight text-[#ffffff]"
              >
                KIM NGÂN
              </motion.h1>
            </div>
          </motion.div>

          {/* BOTTOM ARCHITECTURAL SHUTTER PANEL */}
          <motion.div
            initial={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.75, ease: [0.77, 0, 0.175, 1], delay: 0.25 }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#064e3b] border-t border-[#ea580c]/30 flex flex-col justify-between p-8 md:p-14 z-20"
          >
            {/* Bottom Half Branding Text */}
            <div className="flex items-start justify-center h-full pt-3">
              <motion.h1
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tight text-[#ea580c]"
              >
                STEEL
              </motion.h1>
            </div>

            <div className="flex items-center justify-between font-mono text-[11px] text-[#ffffff] tracking-[0.25em] uppercase">
              <span>EST. 2011 · VIETNAM</span>
              <span className="text-[#ea580c] font-bold">SCENE 01 / OPENING</span>
            </div>
          </motion.div>

          {/* CENTER METALLIC GLOW BEAM PULSE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.1, 1.3] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          >
            <div className="w-48 h-48 md:w-96 md:h-96 rounded-full bg-[#ea580c]/20 blur-3xl" />
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
