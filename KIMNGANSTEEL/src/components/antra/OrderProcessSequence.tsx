"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ORDER_PROCESS_STEPS = [
  {
    num: "01",
    title: "TIẾP NHẬN NHU CẦU",
    desc: "Tiếp nhận chủng loại sản phẩm, quy cách, số lượng và yêu cầu giao hàng từ khách hàng.",
    img: "/factory_story/1.svg",
  },
  {
    num: "02",
    title: "TƯ VẤN SẢN PHẨM",
    desc: "Tư vấn lựa chọn tôn, thép và xà gồ phù hợp với nhu cầu sử dụng và ngân sách.",
    img: "/factory_story/2.svg",
  },
  {
    num: "03",
    title: "CHUẨN BỊ NGUỒN HÀNG",
    desc: "Kiểm tra nguồn sản phẩm, chủng loại và khả năng đáp ứng đơn hàng.",
    img: "/factory_story/3.svg",
  },
  {
    num: "04",
    title: "GIA CÔNG THEO YÊU CẦU",
    desc: "Thực hiện gia công các sản phẩm phù hợp với quy cách và nhu cầu thực tế của khách hàng.",
    img: "/factory_story/4.svg",
  },
  {
    num: "05",
    title: "KIỂM TRA TRƯỚC GIAO HÀNG",
    desc: "Kiểm tra số lượng, chủng loại và tình trạng sản phẩm trước khi bàn giao.",
    img: "/factory_story/5.svg",
  },
  {
    num: "06",
    title: "VẬN CHUYỂN VÀ BÀN GIAO",
    desc: "Tổ chức giao nhận hàng hóa tới địa điểm theo thỏa thuận với khách hàng.",
    img: "/factory_story/6.svg",
  },
];

export function OrderProcessSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // We only enable horizontal scroll on desktop (lg and up)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
      
      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#ffffff] text-[#064e3b] overflow-hidden border-t border-b border-[#064e3b]/10"
    >
      {/* Background with Grid Pattern */}
      <div className="absolute inset-0 bg-[#f8fafc] pointer-events-none z-0">
        <svg className="absolute inset-0 w-full h-full opacity-[0.25]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="op-dot-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#064e3b" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#op-dot-grid)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff] via-transparent to-[#ffffff] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-transparent to-[#ffffff] pointer-events-none" />
      </div>

      {/* Desktop View (Horizontal Scroll) */}
      <div className="hidden lg:flex h-screen items-center" ref={trackRef}>
        
        {/* Intro Panel (Pins to the left initially) */}
        <div className="w-[100vw] lg:w-[45vw] shrink-0 flex items-center justify-start pl-6 lg:pl-32 relative z-10">
          <div className="max-w-xl text-left space-y-6">
            <span className="text-sm font-mono font-bold tracking-[0.3em] text-[#ea580c] uppercase">
              QUY TRÌNH 6 BƯỚC
            </span>
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-tight text-[#064e3b] leading-[1.1]">
              QUY TRÌNH<br/>PHỤC VỤ ĐƠN HÀNG
            </h2>
            <p className="text-sm lg:text-base text-[#064e3b]/80 max-w-lg leading-relaxed text-justify">
              Quy trình phục vụ chuyên nghiệp, minh bạch và đảm bảo giao nhận hàng hóa tới khách hàng đúng thỏa thuận.
            </p>
            {/* Scroll Indicator */}
            <div className="flex flex-col items-start gap-3 pt-12 opacity-80">
              <span className="text-xs font-mono uppercase tracking-widest text-[#064e3b]">Cuộn ngang</span>
              <div className="w-16 h-px bg-[#064e3b]/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-[#ea580c] animate-[slideRight_1.5s_infinite_linear]" />
              </div>
            </div>
          </div>
        </div>

        {/* Steps Track */}
        <div className="flex shrink-0 pr-32 pl-16 lg:pl-0 gap-12 lg:gap-16 items-center h-full relative">
          
          {/* Background is clean without tracking lines */}
          
          {ORDER_PROCESS_STEPS.map((step, idx) => (
            <div 
              key={step.num} 
              className="w-[24vw] h-[55vh] shrink-0 relative rounded-xl overflow-hidden group shadow-lg border border-black/10"
            >
              {/* Background Image */}
              <img 
                src={step.img} 
                alt={step.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
              />
              
              {/* Bottom Gradient for Text */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#022119] via-[#064e3b]/90 to-transparent pointer-events-none" />
              
              {/* Number Top Left - Glass Badge */}
              <div className="absolute top-6 left-6 pointer-events-none">
                <div className="w-16 h-16 bg-white/95 backdrop-blur-md rounded-lg flex flex-col items-center justify-center shadow-lg border border-white/60">
                  <span className="text-3xl font-black text-[#ea580c] tracking-tighter leading-none">{step.num}</span>
                </div>
              </div>

              {/* Content Bottom */}
              <div className="absolute bottom-8 left-8 right-8 flex flex-col pointer-events-none">
                <h3 className="text-3xl font-bold uppercase tracking-tight text-white leading-tight mb-4 drop-shadow-md pr-12">
                  {step.title}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed max-w-[85%]">
                  {step.desc}
                </p>
                
                {/* Arrow Icon */}
                <div className="absolute bottom-0 right-0 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}

          {/* End CTA Panel */}
          <div className="w-[100vw] lg:w-[45vw] shrink-0 flex flex-col justify-center items-start pl-12 lg:pl-24 pr-12 relative z-10 space-y-6">
            <div className="w-16 h-1.5 bg-[#ea580c] mb-2" />
            <h2 className="text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#064e3b] leading-tight">
              SẴN SÀNG CHO<br/>DỰ ÁN CỦA BẠN?
            </h2>
            <p className="text-base text-[#064e3b]/80 max-w-sm leading-relaxed text-justify">
              Kết nối ngay với đội ngũ chuyên gia của Kim Ngân Steel để nhận tư vấn kỹ thuật và báo giá chi tiết cho công trình.
            </p>
            <a 
              href="/lien-he"
              className="inline-flex items-center justify-center bg-[#ea580c] hover:bg-[#c24100] text-white font-bold py-3.5 px-8 rounded-full transition-colors duration-300 gap-2 mt-4 shadow-md shadow-[#ea580c]/20"
            >
              LIÊN HỆ NGAY
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile View (Vertical Flow) */}
      <div className="lg:hidden py-20 px-6 space-y-16">
        <div className="text-left space-y-4">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#ea580c] uppercase block">
            QUY TRÌNH 6 BƯỚC
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight leading-tight text-[#064e3b]">
            QUY TRÌNH<br/>PHỤC VỤ ĐƠN HÀNG
          </h2>
          <p className="text-xs sm:text-sm text-[#064e3b]/80 leading-relaxed max-w-md text-justify">
            Quy trình phục vụ chuyên nghiệp, minh bạch và đảm bảo giao nhận hàng hóa tới khách hàng đúng thỏa thuận.
          </p>
        </div>

        <div className="space-y-12">
          {ORDER_PROCESS_STEPS.map((step) => (
            <div key={step.num} className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-black/10">
              <img 
                src={step.img} 
                alt={step.title}
                className="absolute inset-0 w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#022119] via-[#064e3b]/90 to-transparent pointer-events-none" />
              
              {/* Number Top Left - Glass Badge */}
              <div className="absolute top-5 left-5 pointer-events-none">
                <div className="w-12 h-12 bg-white/95 backdrop-blur-md rounded-md flex flex-col items-center justify-center shadow-lg border border-white/60">
                  <span className="text-2xl font-black text-[#ea580c] tracking-tighter leading-none">{step.num}</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-col pointer-events-none">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white leading-tight mb-3 drop-shadow-md pr-10">
                  {step.title}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed pr-4">
                  {step.desc}
                </p>
                <div className="absolute bottom-0 right-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile End CTA */}
        <div className="pt-8 border-t border-[#064e3b]/10 flex flex-col space-y-5">
          <div className="w-12 h-1 bg-[#ea580c]" />
          <h2 className="text-3xl font-bold uppercase tracking-tight text-[#064e3b] leading-tight">
            SẴN SÀNG CHO<br/>DỰ ÁN?
          </h2>
          <p className="text-sm text-[#064e3b]/80 leading-relaxed text-justify">
            Kết nối ngay với đội ngũ chuyên gia của Kim Ngân Steel để nhận tư vấn kỹ thuật.
          </p>
          <a 
            href="/lien-he"
            className="inline-flex items-center justify-center bg-[#ea580c] hover:bg-[#c24100] text-white font-bold py-3.5 px-8 rounded-full transition-colors duration-300 gap-2 shadow-md shadow-[#ea580c]/20 w-max mt-2"
          >
            LIÊN HỆ NGAY
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>

    </section>
  );
}
