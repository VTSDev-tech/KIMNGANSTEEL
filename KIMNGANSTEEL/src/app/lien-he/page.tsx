"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteFooter } from "@/components/antra/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".antra-hero-kicker", { y: 20, opacity: 0, duration: 0.8 })
        .from(".antra-h1", { y: 40, opacity: 0, duration: 1 }, "-=0.5")
        .from(".antra-hero-text", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

      gsap.utils.toArray<HTMLElement>(".antra-section").forEach((section) => {
        gsap.from(section, {
          y: 80, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="antra-theme min-h-screen bg-[#F2F0EC] selection:bg-[#B8AFA3] selection:text-[#080808] pt-24 font-sans text-[#151413]">
      
      {/* 1. Hero Section (Light) */}
      <section className="relative py-20 overflow-hidden flex items-center justify-center min-h-[40vh]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(156,138,115,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(156,138,115,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] z-0"></div>
        <div className="absolute bottom-10 left-10 text-[6rem] lg:text-[12rem] font-bold text-[#e5e1da] opacity-30 pointer-events-none whitespace-nowrap select-none z-0">
          CONTACT
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
          <p className="antra-hero-kicker text-[10px] font-bold tracking-[0.2em] uppercase text-[#9C8A73] mb-6">Liên Hệ</p>
          <h1 className="antra-h1 text-3xl md:text-5xl lg:text-7xl mb-6 uppercase font-light leading-[1.2]">
            <span className="block">Bắt đầu</span>
            <span className="block italic text-[#9C8A73]">Dự án của bạn</span>
          </h1>
          <p className="antra-hero-text text-[#555] text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ tư vấn kỹ thuật và cung cấp báo giá tốt nhất.
          </p>
        </div>
      </section>

      {/* 2. Contact Info & Form (Dark) */}
      <section className="antra-section py-24 bg-[#080808] text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Cột trái: Thông tin */}
            <div className="space-y-16">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9C8A73] mb-4">Thông Tin Doanh Nghiệp</p>
                <h2 className="text-3xl font-light uppercase tracking-tight mb-2">Kim Ngân Steel</h2>
                <p className="text-[#666] text-sm">MST: 0312XXXXXX</p>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-[#9C8A73] text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Trụ sở & Nhà Máy</p>
                  <p className="text-lg font-light leading-relaxed">123 Đường Công Nghiệp,<br/>Khu Công Nghiệp Sóng Thần,<br/>Dĩ An, Bình Dương</p>
                </div>
                <div>
                  <p className="text-[#9C8A73] text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Điện thoại / Zalo</p>
                  <p className="text-2xl font-light">0934 096 794</p>
                </div>
                <div>
                  <p className="text-[#9C8A73] text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Email</p>
                  <p className="text-lg font-light">sales@kimngansteel.com</p>
                </div>
              </div>
            </div>

            {/* Cột phải: Form */}
            <div className="bg-[#111] border border-[#222] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#9C8A73] opacity-5 rounded-bl-full pointer-events-none" />

              <h3 className="text-2xl font-light uppercase tracking-tight mb-2 relative z-10">Nhận Báo Giá Nhanh</h3>
              <p className="text-[#666] text-sm font-light mb-10 relative z-10">Vui lòng để lại thông tin, chúng tôi sẽ liên hệ lại trong vòng 15 phút.</p>
              
              <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.1em] text-[#9C8A73]">Họ và Tên</label>
                    <input type="text" className="w-full bg-[#161616] border border-[#333] px-4 py-3 text-white focus:outline-none focus:border-[#9C8A73] transition-all rounded-sm font-light text-sm hover:border-[#555]" placeholder="Nhập tên của bạn" required />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.1em] text-[#9C8A73]">Số điện thoại</label>
                    <input type="tel" className="w-full bg-[#161616] border border-[#333] px-4 py-3 text-white focus:outline-none focus:border-[#9C8A73] transition-all rounded-sm font-light text-sm hover:border-[#555]" placeholder="0909..." required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.1em] text-[#9C8A73]">Sản Phẩm Quan Tâm</label>
                  <select className="w-full bg-[#161616] border border-[#333] px-4 py-3 text-white focus:outline-none focus:border-[#9C8A73] transition-all rounded-sm font-light text-sm hover:border-[#555] appearance-none cursor-pointer">
                    <option className="bg-[#111]">Tôn Lợp / Tôn Lạnh</option>
                    <option className="bg-[#111]">Thép Hộp / Thép Ống</option>
                    <option className="bg-[#111]">Thép Hình / Thép Tấm</option>
                    <option className="bg-[#111]">Xà Gồ C/Z</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.1em] text-[#9C8A73]">Lời Nhắn (Không bắt buộc)</label>
                  <textarea rows={3} className="w-full bg-[#161616] border border-[#333] px-4 py-3 text-white focus:outline-none focus:border-[#9C8A73] transition-all rounded-sm font-light text-sm hover:border-[#555] resize-none" placeholder="Nhập nội dung yêu cầu..."></textarea>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-white text-[#151413] hover:bg-[#9C8A73] hover:text-white font-bold text-[13px] uppercase tracking-[0.1em] py-4 transition-all hover:shadow-[0_0_20px_rgba(156,138,115,0.4)]">
                    Gửi Yêu Cầu
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
