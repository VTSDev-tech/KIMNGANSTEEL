"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteFooter } from "@/components/antra/SiteFooter";
import { MapPin, Phone, Mail, CheckCircle2, ArrowUpRight, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    company: "",
    specs: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".kn-cnt-opening-el",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      ref={rootRef}
      className="antra-theme min-h-screen bg-[#F7F7F4] text-[#1A1918] selection:bg-[#1A1918] selection:text-[#F7F7F4] select-none font-sans"
    >
      {/* =========================================================================
          1. HERO OPENING HEADER
         ========================================================================= */}
      <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 px-6 md:px-14 bg-[#F7F7F4] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto space-y-6">
          
          <div className="kn-cnt-opening-el inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#1A1918]/[0.05] border border-[#1A1918]/12 text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#C28E5C] animate-pulse" />
            <span>06 / LIÊN HỆ &amp; BÁO GIÁ VẬT TƯ</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline">
            <div className="lg:col-span-7 space-y-3">
              <h1 className="kn-cnt-opening-el text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1918] leading-[1.15]">
                Liên hệ trực tiếp với <br />
                Kim Ngân Steel
              </h1>
              <p className="kn-cnt-opening-el text-sm sm:text-base font-mono text-[#C28E5C] font-semibold">
                Tiếp nhận bản vẽ &amp; phản hồi báo giá trong vòng 15 phút
              </p>
            </div>

            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-[#1A1918]/15 space-y-3">
              <p className="kn-cnt-opening-el text-sm sm:text-base text-[#524D4A] font-sans leading-relaxed">
                Đội ngũ kỹ sư kinh doanh Kim Ngân Steel trực tiếp tiếp nhận yêu cầu khối lượng, hỗ trợ bóc tách bản vẽ và gửi báo giá gốc từ nhà máy với ưu đãi tốt nhất.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. CONTACT DETAILS & EXACT FORM CARD (MATCHING USER SCREENSHOT)
         ========================================================================= */}
      <section className="py-16 sm:py-24 px-6 md:px-14 bg-[#F7F7F4] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: OFFICIAL CONTACT INFORMATION */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-3 border-b border-[#1A1918]/12 pb-6">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#C28E5C] uppercase block">
                THÔNG TIN DOANH NGHIỆP
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#1A1918]">
                CÔNG TY TNHH TÔN THÉP KIM NGÂN
              </h2>
              <p className="text-xs font-mono text-[#524D4A]">
                Mã số thuế: 3702871412 · Đạt tiêu chuẩn ISO 9001:2015
              </p>
            </div>

            {/* Contact Details Hairline List */}
            <div className="divide-y divide-[#1A1918]/12 border-t border-b border-[#1A1918]/12">
              
              {/* Address */}
              <div className="py-5 space-y-1">
                <span className="text-xs font-mono font-bold text-[#C28E5C] uppercase tracking-wider block">
                  01 / ĐỊA CHỈ NHÀ MÁY &amp; VĂN PHÒNG
                </span>
                <p className="text-base sm:text-lg font-bold text-[#1A1918] leading-snug">
                  262 Đường DT742, Khu Phố 1, P. Vĩnh Tân, TP. HCM
                </p>
                <p className="text-xs text-[#524D4A]">
                  Hệ thống kho bãi lưu trữ &amp; nhà máy cán tôn 15.000m²
                </p>
              </div>

              {/* Phone */}
              <div className="py-5 space-y-1">
                <span className="text-xs font-mono font-bold text-[#C28E5C] uppercase tracking-wider block">
                  02 / HOTLINE 24/7 &amp; ZALO KINH DOANH
                </span>
                <a
                  href="tel:0707079900"
                  className="text-2xl sm:text-3xl font-bold font-mono text-[#1A1918] hover:text-[#C28E5C] transition-colors block"
                >
                  0707 079 900
                </a>
                <p className="text-xs text-[#524D4A]">
                  Hỗ trợ tư vấn kỹ thuật &amp; tiếp nhận báo giá nhanh
                </p>
              </div>

              {/* Email */}
              <div className="py-5 space-y-1">
                <span className="text-xs font-mono font-bold text-[#C28E5C] uppercase tracking-wider block">
                  03 / EMAIL TIẾP NHẬN BẢN VẼ
                </span>
                <a
                  href="mailto:tonthepkimngan20@gmail.com"
                  className="text-base sm:text-lg font-bold font-mono text-[#1A1918] hover:text-[#C28E5C] transition-colors block"
                >
                  tonthepkimngan20@gmail.com
                </a>
              </div>

              {/* Delivery Promise */}
              <div className="py-5 space-y-2">
                <span className="text-xs font-mono font-bold text-[#C28E5C] uppercase tracking-wider block">
                  04 / CAM KẾT THƯƠNG MẠI KIM NGÂN STEEL
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#524D4A] font-sans pt-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C28E5C]" />
                    <span>Báo giá trực tiếp tận gốc từ nhà máy, tối ưu ngân sách</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C28E5C]" />
                    <span>Cam kết giao vận thần tốc 24h tới tận chân công trình</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C28E5C]" />
                    <span>Cung cấp đầy đủ chứng chỉ chất lượng CO/CQ kèm theo</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: EXACT REPLICA FORM CARD MATCHING USER SCREENSHOT */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-black/5 p-8 sm:p-12 shadow-xl relative">
            
            <div className="mb-8 border-b border-[#1A1918]/10 pb-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1918] uppercase">
                GỬI YÊU CẦU BÁO GIÁ VẬT TƯ
              </h3>
              <p className="text-xs sm:text-sm text-[#524D4A] font-sans mt-1.5">
                Điền thông tin bên dưới để nhận tư vấn thông số kỹ thuật và báo giá chi tiết.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#121212] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-2xl font-bold uppercase text-[#1A1918]">
                  GỬI YÊU CẦU THÀNH CÔNG!
                </h4>
                <p className="text-xs sm:text-sm text-[#524D4A] max-w-md mx-auto leading-relaxed">
                  Đội ngũ kỹ thuật Kim Ngân Steel đang chuẩn bị bảng báo giá chi tiết và sẽ liên hệ trực tiếp với bạn ngay lập tức.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#121212] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-black transition-all cursor-pointer"
                >
                  Gửi yêu cầu báo giá khác
                </button>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                
                {/* Full Name & Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="input_name" className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#6B655F] block">
                      HỌ VÀ TÊN *
                    </label>
                    <input 
                      type="text" 
                      id="input_name" 
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-transparent border-b border-[#1A1918]/20 pb-2 text-sm text-[#1A1918] placeholder:text-[#1A1918]/30 focus:outline-none focus:border-black transition-colors font-medium"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="input_phone" className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#6B655F] block">
                      SỐ ĐIỆN THOẠI *
                    </label>
                    <input 
                      type="tel" 
                      id="input_phone" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-[#1A1918]/20 pb-2 text-sm text-[#1A1918] placeholder:text-[#1A1918]/30 focus:outline-none focus:border-black transition-colors font-medium font-mono"
                      placeholder="0707 079 900"
                    />
                  </div>
                </div>

                {/* Company / Project Name */}
                <div className="space-y-2">
                  <label htmlFor="input_company" className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#6B655F] block">
                    TÊN DỰ ÁN / CÔNG TY (TÙY CHỌN)
                  </label>
                  <input 
                    type="text" 
                    id="input_company" 
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-transparent border-b border-[#1A1918]/20 pb-2 text-sm text-[#1A1918] placeholder:text-[#1A1918]/30 focus:outline-none focus:border-black transition-colors font-medium"
                    placeholder="Công ty CP Xây dựng / Tên công trình..."
                  />
                </div>

                {/* Material Specifications & Volume */}
                <div className="space-y-2">
                  <label htmlFor="input_specs" className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#6B655F] block">
                    NHU CẦU QUY CÁCH &amp; KHỐI LƯỢNG VẬT TƯ *
                  </label>
                  <input 
                    type="text"
                    id="input_specs" 
                    required
                    value={formData.specs}
                    onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                    className="w-full bg-transparent border-b border-[#1A1918]/20 pb-2 text-sm text-[#1A1918] placeholder:text-[#1A1918]/30 focus:outline-none focus:border-black transition-colors font-medium"
                    placeholder="Ví dụ: 500m tôn mạ màu 5 sóng 0.45mm, 10 tấn xà gồ C200..."
                  />
                </div>

                {/* Pill-Rounded Submit Button */}
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full py-4 px-6 rounded-full bg-[#121212] hover:bg-black text-white font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>GỬI YÊU CẦU BÁO GIÁ</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </section>

      {/* =========================================================================
          3. REAL STOREFRONT & GOOGLE MAPS SHOWCASE
         ========================================================================= */}
      <section className="py-16 sm:py-24 px-6 md:px-14 bg-[#ECE8DE] border-b border-[#1A1918]/10">
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1918]/12 pb-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#C28E5C] uppercase block mb-1">
                BẢN ĐỒ VỊ TRÍ NHÀ MÁY
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#1A1918]">
                262 Đường DT742, Phường Vĩnh Tân, TP. HCM
              </h3>
            </div>

            <a
              href="https://maps.google.com/?q=262+DT742+Vinh+Tan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#1A1918] hover:text-[#C28E5C] transition-colors"
            >
              <span>Mở chỉ đường Google Maps</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="relative w-full aspect-[21/9] min-h-[380px] max-h-[540px] overflow-hidden border border-[#1A1918]/15 shadow-sm bg-[#ECE8DE]">
            <iframe
              title="Bản đồ vị trí Nhà Máy Tôn Kim Ngân"
              src="https://maps.google.com/maps?q=262+DT742,+Vinh+Tan,+Tan+Uyen,+Binh+Duong&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[380px] filter contrast-[1.03]"
            />
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}
