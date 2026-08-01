"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const CERTS = [
  {
    id: "giay-phep-kd",
    title: "Giấy Chứng Nhận Đăng Ký Doanh Nghiệp",
    desc: "Cấp bởi Sở Kế Hoạch & Đầu Tư tỉnh Bình Dương",
    image: "/certificates/giay-phep-kd.png",
  },
  {
    id: "dai-ly-dong-a",
    title: "Giấy Chứng Nhận Đại Lý Chính Thức",
    desc: "Đại lý phân phối cấp 1 của Tôn Đông Á",
    image: "/certificates/dai-ly-dong-a.png",
  },
  {
    id: "nha-phan-phoi-viet-nhat",
    title: "Giấy Chứng Nhận Nhà Phân Phối",
    desc: "Nhà phân phối chính thức Thép Việt Nhật (VSP)",
    image: "/certificates/giaithuong.svg",
  },
];

export function CertificatesGallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".kn-cert-card",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={containerRef} className="py-20 md:py-28 px-6 md:px-14 bg-[#ffffff] border-b border-[#064e3b]/10">
        <div className="max-w-[1600px] mx-auto space-y-12">
          
          <div className="border-b border-[#064e3b]/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#ea580c] uppercase block mb-3">
                LEGAL & CERTIFICATIONS
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#064e3b]">
                HỒ SƠ PHÁP LÝ & CHỨNG NHẬN
              </h2>
            </div>
            <p className="text-sm text-[#064e3b] max-w-sm leading-relaxed font-sans md:text-right">
              Kim Ngân Steel hoạt động minh bạch, tuân thủ pháp luật và được ủy quyền phân phối chính thức bởi các Tập đoàn hàng đầu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CERTS.map((cert) => (
              <div 
                key={cert.id} 
                className="kn-cert-card group cursor-pointer space-y-4"
                onClick={() => setSelectedImage(cert.image)}
              >
                <div className="w-full aspect-[4/3] bg-white border border-[#064e3b]/10 overflow-hidden relative shadow-sm group-hover:shadow-md group-hover:border-[#ea580c]/50 transition-all duration-500">
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-4 py-2 bg-white/10 border border-white/30 text-white text-xs font-mono tracking-widest uppercase rounded backdrop-blur-md">
                      Xem Chi Tiết
                    </span>
                  </div>
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1 px-1">
                  <h3 className="text-sm font-bold uppercase tracking-tight text-[#064e3b] group-hover:text-[#ea580c] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-[#064e3b] font-sans">
                    {cert.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-[#064e3b]/95 backdrop-blur-lg cursor-zoom-out"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 max-w-5xl w-full max-h-[90vh] bg-transparent flex flex-col items-center"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 sm:-right-12 text-white/50 hover:text-white transition-colors"
                aria-label="Đóng"
              >
                <X size={32} />
              </button>
              
              <img 
                src={selectedImage} 
                alt="Certificate Fullscreen" 
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain shadow-2xl border border-white/10"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
