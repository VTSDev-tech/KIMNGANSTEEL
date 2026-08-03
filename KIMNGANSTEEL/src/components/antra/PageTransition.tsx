"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

let isInitialLoad = true;

export function PageTransition() {
  const pathname = usePathname();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // 1. Nếu là lần đầu tiên load web (F5), không hiện PageTransition
    if (isInitialLoad) {
      isInitialLoad = false;
      setShouldShow(false);
      return;
    }

    // 2. Nếu chuyển hướng về trang chủ và chưa từng xem IntroScreen -> IntroScreen sẽ hiện
    // => Không hiện PageTransition để tránh bị đụng 2 màn hình liên tiếp
    const hasSeenIntro = sessionStorage.getItem("kn_has_seen_intro");
    if (pathname === "/" && !hasSeenIntro) {
      setShouldShow(false);
      return;
    }
    
    // Các trường hợp chuyển trang bình thường khác -> Hiện PageTransition
    setShouldShow(true);
  }, [pathname]);

  if (!shouldShow) return null;

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
      
      {/* Logo & Typography */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Wrapper */}
        <motion.div 
          className="relative w-32 h-32 md:w-48 md:h-48 mb-4 flex justify-center items-center"
          initial={{ y: "50%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Sử dụng hình logo sạch và đã tách nền từ thư mục tải xuống */}
          <img 
            src="/logomoi.svg" 
            alt="Kim Ngân Steel Logo" 
            className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        <div className="overflow-hidden pb-2">
          <motion.h1 
            className="text-5xl md:text-[5rem] font-black text-white uppercase tracking-tighter leading-none"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            KIM NGÂN
          </motion.h1>
        </div>
        <div className="overflow-hidden pb-4 -mt-1 md:-mt-2">
          <motion.h1 
            className="text-5xl md:text-[5rem] font-black text-[#ea580c] uppercase tracking-tighter leading-none"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          >
            STEEL
          </motion.h1>
        </div>
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
