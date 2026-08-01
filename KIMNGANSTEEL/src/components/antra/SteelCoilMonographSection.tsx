"use client";

import { motion } from "framer-motion";

export function SteelCoilMonographSection() {
  return (
    <section id="monograph" className="relative flex flex-col justify-between min-h-screen py-24 px-6 md:px-12 lg:px-20 bg-[#ffffff] border-b border-[#064e3b]/10 text-[#064e3b] overflow-hidden select-none">
      
      {/* Huge High-Contrast Editorial Serif Watermark Typography matching Image 2 1:1 */}
      <div className="absolute inset-0 flex flex-col justify-center items-start pl-6 md:pl-16 pointer-events-none opacity-[0.35] overflow-hidden select-none z-0">
        <span className="text-[16vw] lg:text-[13.5vw] font-serif font-extralight uppercase tracking-tight leading-[0.82] text-[#064e3b]">
          MATERIALS
        </span>
        <span className="text-[16vw] lg:text-[13.5vw] font-serif font-extralight uppercase tracking-tight leading-[0.82] text-[#064e3b]">
          FOR
        </span>
        <span className="text-[16vw] lg:text-[13.5vw] font-serif font-extralight uppercase tracking-tight leading-[0.82] text-[#064e3b]">
          LASTING
        </span>
        <span className="text-[16vw] lg:text-[13.5vw] font-serif font-extralight uppercase tracking-tight leading-[0.82] text-[#064e3b] ml-[14vw]">
          STRUCTURES
        </span>
      </div>

      <div className="relative z-10 max-w-[1560px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-200px)]">
        
        {/* Left Column: Copywriting & CTA matching Image 2 1:1 */}
        <div className="lg:col-span-5 flex flex-col items-start justify-center pr-0 lg:pr-8 z-10 pt-12 lg:pt-0">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-sm md:text-base text-[#064e3b] font-mono font-medium leading-relaxed max-w-md mb-12 uppercase tracking-wide"
          >
            CHÚNG TÔI CUNG CẤP GIẢI PHÁP VẬT LIỆU THÉP CHẤT LƯỢNG CAO CHO MỌI CÔNG TRÌNH. BỀN VỮNG HÔM NAY, VỮNG CHẮC TƯƠNG LAI.
          </motion.p>

          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            href="#products" 
            className="editorial-link text-xs uppercase tracking-[0.25em] text-[#064e3b] font-mono pb-1 border-b border-[#064e3b]"
          >
            KHÁM PHÁ →
          </motion.a>
        </div>

        {/* Center/Right Column: User's Corrugated Roofing Sheet with Multiply Blended Background & Preserved Ground Shadow */}
        <div className="lg:col-span-7 flex items-center justify-center relative w-full h-full min-h-[460px] md:min-h-[620px] pointer-events-auto">
          <motion.div
            initial={{ y: 80, scale: 0.95, opacity: 0 }}
            whileInView={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, margin: "-100px" }}
            className="relative w-full max-w-[640px] aspect-[4/3] flex items-center justify-center"
            data-cursor="ROOFING SHEET"
          >
            <img
              src="/corrugated_steel_sheet_3d.jpg"
              alt="Tấm Tôn Lợp Mái Kim Ngân Steel"
              className="w-full h-full object-contain mix-blend-multiply contrast-[1.05] brightness-[1.02] filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
            />
          </motion.div>
        </div>

      </div>

      {/* Bottom Bar: HUD indicators matching Image 2 1:1 (SCROLL •, CHẤT LƯỢNG | UY TÍN | BỀN VỮNG, 01 / 05) */}
      <div className="relative z-10 max-w-[1560px] w-full mx-auto flex items-center justify-between pt-8 border-t border-[#064e3b]/10 text-xs font-mono text-[#064e3b]">
        <div className="flex items-center gap-4">
          <div className="w-[1px] h-8 bg-[#064e3b]/30 -translate-y-2" />
          <span className="uppercase tracking-widest text-[#064e3b] font-medium">SCROLL •</span>
        </div>

        <div className="hidden sm:flex items-center gap-6 uppercase tracking-widest text-[#064e3b] font-mono text-xs">
          <span>CHẤT LƯỢNG</span>
          <span className="text-[#064e3b]/30">|</span>
          <span>UY TÍN</span>
          <span className="text-[#064e3b]/30">|</span>
          <span>BỀN VỮNG</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-bold text-[#064e3b] text-sm">01</span>
          <span className="text-[#064e3b]">/ 05</span>
          <div className="w-16 h-[1px] bg-[#064e3b]" />
        </div>
      </div>

    </section>
  );
}
