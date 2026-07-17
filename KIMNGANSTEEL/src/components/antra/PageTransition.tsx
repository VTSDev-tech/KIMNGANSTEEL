"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageTransition() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (previousPath.current === pathname) return;

    previousPath.current = pathname;
    setIsAnimating(true);

    const timer = window.setTimeout(() => {
      setIsAnimating(false);
    }, 720);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden bg-[#080808]"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(100% 0 0 0)" }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute left-0 top-0 h-1 w-full origin-left bg-[#C2BAB0]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.055)_0_1px,transparent_1px_150px)]" />
          <motion.div
            className="absolute left-1/2 top-1/2 h-px w-[min(420px,72vw)] -translate-x-1/2 -translate-y-1/2 bg-[#C2BAB0]/45"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0.35, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
