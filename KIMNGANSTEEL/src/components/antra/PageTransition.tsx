"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition() {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden bg-[#080808]"
      initial={{ y: "0%", opacity: 1 }}
      animate={{ y: "-100%", opacity: 1 }}
      transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_150px)]" />
      <motion.div
        className="absolute left-0 top-0 h-1 w-full origin-left bg-[#C2BAB0]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-x-6 top-1/2 flex -translate-y-1/2 flex-col items-center gap-5 text-center">
        <motion.p
          className="text-[10px] font-black uppercase tracking-[0.48em] text-[#B4A28A]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          Kim Ngân Steel
        </motion.p>
        <motion.div
          className="h-px w-[min(420px,70vw)] bg-[#C2BAB0]/45"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        />
      </div>
    </motion.div>
  );
}
