"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==================== MODELS DATA ====================
const MODELS = [
  { 
    id: 'sheet', name: 'Tôn Lợp Mái', 
    desc: 'Tôn cán sóng Kim Ngân siêu bền, chống rỉ sét, chịu thời tiết khắc nghiệt.', 
    imgSrc: '/trangtri/sheet.svg', 
    top: '25%', left: '35%', 
    direction: 'left' 
  },
  { 
    id: 'pipe', name: 'Cột Thép Tròn', 
    desc: 'Thép ống đúc siêu cứng, chịu lực nén tốt. Dùng làm trụ đỡ chịu lực chính.', 
    imgSrc: '/trangtri/pipe.svg', 
    top: '65%', left: '80%', 
    direction: 'right' 
  },
  { 
    id: 'purlin', name: 'Khung Xà Gồ', 
    desc: 'Hệ giàn thép C/Z mạ kẽm nhẹ, không gỉ, lắp ráp nhanh chóng.', 
    imgSrc: '/trangtri/purlin.svg', 
    top: '55%', left: '20%', 
    direction: 'left' 
  },
  { 
    id: 'coil', name: 'Thép Cuộn', 
    desc: 'Thép mạ kẽm cường độ cao, nguyên liệu nền tảng cho mọi cấu kiện thép.', 
    imgSrc: '/trangtri/coil.svg', 
    top: '85%', left: '65%', 
    direction: 'right' 
  }
];

// ==================== MAIN COMPONENT ====================
export function Factory3D() {
  const [activePart, setActivePart] = useState<number | null>(null);

  // Auto-close popup when scrolling
  useEffect(() => {
    if (activePart !== null) {
      const handleScroll = () => setActivePart(null);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [activePart]);

  return (
    <section id="factory-3d" className="w-full h-screen min-h-[600px] bg-[#F8F9FA] flex flex-col items-center pt-[90px] pb-8 overflow-hidden relative">
      {/* BACKGROUND DESIGN */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* 1. Architectural Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8A796312_1px,transparent_1px),linear-gradient(to_bottom,#8A796312_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        {/* 2. Vignette Fade (Hides grid at the edges) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_20%,#F8F9FA_100%)]" />
        
        {/* 3. Center Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[#9C8A73]/10 rounded-full blur-[100px]" />

        {/* 4. Blueprint Accent Lines */}
        <div className="absolute top-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8A796320] to-transparent" />
        <div className="absolute bottom-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8A796320] to-transparent" />
        <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#8A796320] to-transparent" />
        <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#8A796320] to-transparent" />
        
        {/* 5. Corner Crosshairs */}
        <div className="absolute top-[10%] left-[10%] w-8 h-8 border-t border-l border-[#8A796330]" />
        <div className="absolute top-[10%] right-[10%] w-8 h-8 border-t border-r border-[#8A796330]" />
        <div className="absolute bottom-[10%] left-[10%] w-8 h-8 border-b border-l border-[#8A796330]" />
        <div className="absolute bottom-[10%] right-[10%] w-8 h-8 border-b border-r border-[#8A796330]" />
      </div>

      <div className="text-center mb-2 px-4 flex-none relative z-10">
         <p className="text-[#9C8A73] font-mono tracking-widest text-xs font-bold uppercase mb-1 drop-shadow-sm">Ứng dụng thực tế</p>
         <h2 className="text-2xl md:text-4xl font-bold text-gray-900 uppercase tracking-tight mb-1 drop-shadow-sm">Mô Hình Vật Tư Công Trình</h2>
         <p className="text-gray-500 max-w-2xl mx-auto text-[10px] md:text-sm hidden sm:block">Khám phá chi tiết các loại vật liệu thép Kim Ngân được ứng dụng thực tế trong thi công công trình dân dụng cao cấp.</p>
      </div>

      <div className="relative flex-1 min-h-0 w-full flex items-center justify-center px-4">
        {/* MẶT NẠ 2D: HÌNH ẢNH BIỆT THỰ */}
        <div className="relative h-full max-h-full max-w-full aspect-square flex items-center justify-center">
          <img 
            src="/villa_isolated.png" 
            alt="Biệt thự" 
            className="w-full h-full object-contain cursor-default select-none mix-blend-multiply" 
            draggable="false"
            onClick={() => setActivePart(null)}
          />

          {/* HOTSPOTS */}
          {MODELS.map((model, index) => (
            <HtmlHotspot 
              key={model.id}
              model={model}
              isActive={activePart === index}
              onClick={() => setActivePart(isActive => isActive === index ? null : index)} 
              delay={0.2 + index * 0.2} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== 2D HOTSPOT COMPONENT WITH 2D POPUP ====================
function HtmlHotspot({ model, isActive, onClick, delay }: { model: { id: string, name: string, desc: string, imgSrc: string, top: string, left: string, direction: string }, isActive: boolean, onClick: () => void, delay: number }) {
  // 'direction' is which way the popup should open relative to the dot.
  // 'left' means popup is placed to the left of the dot (to not overlap the house).
  // 'right' means popup is placed to the right of the dot.
  const opensLeft = model.direction === 'left';

  return (
    <motion.div 
      className="absolute z-40" 
      style={{ top: model.top, left: model.left, transform: 'translate(-50%, -50%)', zIndex: isActive ? 50 : 40 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
    >
      {/* Nút Dot (Điểm đánh dấu trên nhà) */}
      <div className="relative group cursor-pointer flex items-center justify-center w-12 h-12" onClick={onClick}>
        <div className={`w-6 h-6 rounded-full transition-all duration-300 shadow-[0_2px_8px_rgba(156,138,115,0.4)] relative z-10 flex items-center justify-center ${isActive ? 'bg-[#8A7963] scale-110' : 'bg-[#9C8A73] border-[3px] border-white group-hover:bg-[#B3A18A] group-hover:scale-110'}`}>
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
        {!isActive && <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#9C8A73]/40 animate-ping" />}
      </div>

      {/* Popup chi tiết vật tư */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className={`pointer-events-auto flex items-center gap-3 md:gap-4
              fixed bottom-6 left-4 w-[calc(100vw-76px)] sm:w-[320px] bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex-col text-center z-50 border border-[#8A7963]/20
              md:absolute md:bottom-auto md:left-auto md:top-1/2 md:translate-y-[-50%] md:w-auto md:max-w-none md:bg-transparent md:backdrop-blur-none md:p-0 md:rounded-none md:shadow-none md:border-none
              ${opensLeft ? 'md:right-full md:mr-[80px] md:flex-row-reverse md:text-right' : 'md:left-full md:ml-[80px] md:flex-row md:text-left'}
            `}
          >
            {/* Vạch kẻ ngang nối từ điểm neo ra ngoài popup - CHỈ HIỂN THỊ TRÊN MÁY TÍNH */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`absolute hidden md:block top-1/2 -translate-y-1/2 h-[1px] bg-[#9C8A73] ${opensLeft ? '-right-[80px] origin-right' : '-left-[80px] origin-left'}`}
              style={{ width: '80px' }}
            />

            {/* Soft Radial Glow - CHỈ HIỂN THỊ TRÊN MÁY TÍNH */}
            <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0)_75%)] scale-[2.2] -z-10 pointer-events-none" />

            {/* Static SVG Image */}
            <img 
              src={model.imgSrc} 
              alt={model.name}
              className="w-20 h-20 md:w-32 md:h-32 object-contain relative z-10 drop-shadow-[0_10px_15px_rgba(0,0,0,0.1)] select-none mix-blend-multiply md:mix-blend-normal"
              draggable="false"
            />

            {/* Typography */}
            <div className={`flex flex-col relative z-10 w-full md:w-64 shrink-0 text-center ${opensLeft ? 'md:text-right' : 'md:text-left'}`}>
              <span className="text-[#9C8A73] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-1 md:mb-1">
                Chi Tiết Vật Tư
              </span>
              <h4 className="text-lg md:text-2xl font-black text-gray-900 uppercase tracking-tight mb-2 md:mb-2 leading-none whitespace-nowrap">
                {model.name}
              </h4>
              <p className="text-xs md:text-[13px] text-gray-600 leading-relaxed font-medium">
                {model.desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
