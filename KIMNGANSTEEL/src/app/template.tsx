"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Hiệu ứng màn đen (Curtain Wipe) - Vuốt ngược lên để mở trang */}
      <motion.div
        initial={{ top: 0, height: "100vh" }}
        animate={{ top: "-100vh", height: "100vh" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: "#111111", // Màu nhám đen của Thép
          zIndex: 9999,
          pointerEvents: "none"
        }}
      />
      
      {/* Hiệu ứng nội dung toàn trang: Fade in & Slide up */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}
