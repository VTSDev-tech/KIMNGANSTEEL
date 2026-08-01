"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "VIEW";
        setCursorText(text);
        setIsHovered(true);
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:flex items-center justify-center rounded-full border border-[#ffffff]/30"
      animate={{
        x: mousePosition.x - (isHovered ? 32 : 4),
        y: mousePosition.y - (isHovered ? 32 : 4),
        width: isHovered ? 64 : 8,
        height: isHovered ? 64 : 8,
        backgroundColor: isHovered ? "rgba(244, 242, 236, 0.05)" : "#ffffff",
        backdropFilter: isHovered ? "blur(4px)" : "none",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.4 }}
    >
      {isHovered && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[9px] font-medium tracking-[0.2em] text-[#ffffff] uppercase text-center select-none"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
