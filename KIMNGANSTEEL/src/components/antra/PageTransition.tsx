"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      key={pathname}
      className="fixed inset-0 z-[10000] pointer-events-none flex flex-col justify-center items-center bg-[#043326] overflow-hidden"
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_150px)]" />
      
      {/* Huge Typography */}
      <div className="relative z-10 overflow-hidden">
        <motion.h1 
          className="text-6xl md:text-[9rem] font-black text-white uppercase tracking-tighter leading-none"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          KIM NGÂN
        </motion.h1>
      </div>
      <div className="relative z-10 overflow-hidden -mt-1 md:-mt-4">
        <motion.h1 
          className="text-6xl md:text-[9rem] font-black text-[#ea580c] uppercase tracking-tighter leading-none"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        >
          STEEL
        </motion.h1>
      </div>

      {/* Modern Progress Line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <motion.span 
          className="font-mono text-[10px] text-white/50 tracking-[0.3em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Khởi tạo không gian
        </motion.span>
        <div className="w-[40vw] max-w-[240px] h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#ea580c]"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
