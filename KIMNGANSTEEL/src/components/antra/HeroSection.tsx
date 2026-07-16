"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MATERIALS = [
  { id: 'coil', name: 'Thép Cuộn Mạ Kẽm', src: '/trangtri/coil.svg' },
  { id: 'sheet', name: 'Tôn Lợp Mái', src: '/trangtri/sheet.svg' },
  { id: 'pipe', name: 'Thép Ống Đúc', src: '/trangtri/pipe.svg' },
  { id: 'purlin', name: 'Khung Xà Gồ', src: '/trangtri/purlin.svg' },
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMaterial = MATERIALS[activeIndex];

  return (
    <section id="top" className="relative flex flex-col justify-start min-h-screen pt-[84px] md:pt-[90px] overflow-hidden bg-[#080808]">
      
      {/* Technical Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(rgba(242, 240, 236, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(242, 240, 236, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          backgroundPosition: 'center center'
        }}
        aria-hidden="true"
      />
      
      {/* Radial Light */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_50%,_rgba(184,175,163,0.1)_0%,_transparent_70%)]" />

      {/* Main Grid Layout */}
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-[48%_52%] flex-grow relative z-10">
        
        {/* Left Column */}
        <div className="flex flex-col justify-center pl-6 md:pl-12 lg:pl-16 xl:pl-24 py-8 lg:py-4">
          
          <div className="inline-flex items-center gap-4 mb-4 antra-hero-kicker">
            <div className="w-0.5 h-4 bg-[#B8AFA3]"></div>
            <span className="text-[#D8D4CE] font-bold tracking-[0.15em] uppercase text-[10px] md:text-[11px]">
              GIA CÔNG CÁN TÔN · PHÂN PHỐI VẬT LIỆU XÂY DỰNG
            </span>
          </div>
          
          <h1 className="mb-6 antra-hero-text">
            <span className="block text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[2.8rem] xl:text-[3.2rem] font-bold leading-[1.2] tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E4DB] to-[#A39A86] pb-2">
              TÔN THÉP<br />CHẤT LƯỢNG CAO
            </span>
            <span className="block text-[1.4rem] sm:text-[1.6rem] md:text-[1.8rem] font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#D8D4CE] to-[#9C8A73] mt-4 leading-[1.2] tracking-wide">
              Giao nhanh tận công trình
            </span>
          </h1>
          
          <p className="text-[#A39E96] text-[15px] md:text-[16px] leading-[1.8] font-light italic mb-10 max-w-[500px] antra-hero-text">
            Tôn Thép Kim Ngân chuyên gia công cán tôn và phân phối tôn thép, xà gồ, thép hộp, thép ống cho nhà thầu, nhà xưởng và đại lý. Chủ động nhà máy, đúng quy cách, giá cạnh tranh và giao hàng nhanh theo tiến độ.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10 antra-hero-text">
            <a 
              href="#quote" 
              className="group relative inline-flex items-center justify-center gap-3 bg-[#F2F0EC] hover:bg-[#D8D4CE] text-[#080808] font-semibold px-8 py-4 rounded-none transition-colors uppercase tracking-[0.15em] text-[12px]"
            >
              <span>Nhận báo giá</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#products" 
              className="inline-flex items-center justify-center gap-3 bg-transparent border border-[#B8AFA3]/30 hover:border-[#B8AFA3] text-[#B8AFA3] hover:text-[#F2F0EC] font-semibold px-8 py-4 rounded-none transition-colors uppercase tracking-[0.15em] text-[12px]"
            >
              <span>Sản phẩm</span>
            </a>
          </div>

        </div>

        {/* Right Column: Interactive Image Switcher */}
        <div className="relative w-full h-[60vh] lg:h-auto min-h-[400px] flex flex-col items-center justify-center p-8 group">
          
          {/* Vertical Pagination (Original Design) */}
          <div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30">
            {MATERIALS.map((mat, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button 
                  key={mat.id} 
                  onClick={() => setActiveIndex(idx)} 
                  className="flex items-center gap-4 cursor-pointer bg-transparent border-none p-0 outline-none group/btn"
                >
                  <div 
                    className="transition-all duration-500 ease-in-out h-[1px]" 
                    style={{ 
                      width: isActive ? '48px' : '20px', 
                      backgroundColor: isActive ? '#E8E4DB' : 'rgba(255,255,255,0.2)',
                      boxShadow: isActive ? '0 0 10px rgba(232,228,219,0.3)' : 'none'
                    }} 
                  />
                  <span 
                    className="font-sans tracking-widest text-xs transition-all duration-500" 
                    style={{ 
                      color: isActive ? '#E8E4DB' : 'rgba(255,255,255,0.3)', 
                      textShadow: isActive ? '0 0 10px rgba(232,228,219,0.2)' : 'none' 
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Floating Title Overlay */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[55%] z-40 flex flex-col items-center pointer-events-none">
            <div className="relative h-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h3 
                  key={activeIndex} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }} 
                  transition={{ duration: 0.4, ease: "easeOut" }} 
                  className="absolute font-sans font-semibold text-xl md:text-2xl tracking-[0.15em] uppercase whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E4DB] to-[#A39A86] drop-shadow-[0_4px_12px_rgba(255,255,255,0.1)] ml-[0.15em]"
                >
                  {activeMaterial.name}
                </motion.h3>
              </AnimatePresence>
            </div>
            <motion.div 
              key={`line-${activeIndex}`} 
              initial={{ scaleX: 0, opacity: 0 }} 
              animate={{ scaleX: 1, opacity: 1 }} 
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }} 
              className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#C99A5C] to-transparent mt-3 origin-center" 
            />
          </div>

          {/* Main Large Image */}
          <div className="relative w-full max-w-[800px] h-[400px] md:h-[600px] flex items-center justify-center pl-16 lg:pl-32">
            <AnimatePresence mode="wait">
                <motion.img 
                  key={activeMaterial.id}
                  src={activeMaterial.src} 
                  alt={activeMaterial.name}
                  className="absolute w-[100%] max-w-[550px] object-contain select-none z-10 pointer-events-none"
                  draggable="false"
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
