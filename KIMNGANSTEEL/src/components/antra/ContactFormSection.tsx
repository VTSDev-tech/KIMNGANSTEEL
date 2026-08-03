"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    company: "",
    specs: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ fullName: "", phone: "", company: "", specs: "" });
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    } catch (err) {
      setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-14 bg-[#ffffff] border-b border-[#064e3b]/10 text-[#064e3b] select-none">
      <div className="max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 space-y-8 pt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-[0.25em] text-[#ea580c] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
              <span>05 / LIÊN HỆ &amp; BÁO GIÁ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-sans font-bold uppercase tracking-tight text-[#064e3b] leading-[1.12]">
              NHẬN BÁO GIÁ TÔN THÉP TRỰC TIẾP
            </h2>

            <p className="text-xs sm:text-sm text-[#064e3b] font-sans leading-relaxed max-w-lg">
              Vui lòng cung cấp quy cách, độ dày và khối lượng vật tư dự kiến. Đội ngũ kinh doanh Kim Ngân Steel sẽ tiếp nhận yêu cầu và gửi báo giá theo thông tin doanh nghiệp chính thức.
            </p>
          </div>

          <div className="pt-6 border-t border-[#064e3b]/15 space-y-5 text-xs font-sans text-[#064e3b]">
            <div className="space-y-1">
              <p className="font-mono font-bold text-[#ea580c] uppercase tracking-wider">01 / VĂN PHÒNG &amp; KHO XƯỞNG</p>
              <p className="text-sm font-bold text-[#064e3b]">262 Đường DT742, Khu Phố 1, Phường Vĩnh Tân, TP Hồ Chí Minh, Việt Nam</p>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#064e3b]/10">
              <p className="font-mono font-bold text-[#ea580c] uppercase tracking-wider">02 / HOTLINE TƯ VẤN 24/7</p>
              <p className="font-mono text-[#064e3b] font-bold text-xl">0707 079 900</p>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#064e3b]/10">
              <p className="font-mono font-bold text-[#ea580c] uppercase tracking-wider">03 / EMAIL BÁO GIÁ CÔNG TRÌNH</p>
              <p className="font-mono text-[#064e3b] font-bold text-sm">tonthepkimngan20@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white rounded-xl sm:rounded-2xl border border-black/5 p-5 sm:p-8 md:p-12 shadow-xl relative">
          <div className="mb-6 sm:mb-8 border-b border-[#064e3b]/10 pb-4 sm:pb-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-bold tracking-tight text-[#064e3b] leading-[1.06] antialiased">
              GỬI YÊU CẦU BÁO GIÁ VẬT TƯ
            </h3>
            <p className="text-xs sm:text-sm text-[#064e3b] font-sans mt-1.5">
              Điền thông tin bên dưới để nhận tư vấn thông số kỹ thuật và báo giá chi tiết.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#064e3b] text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-2xl font-bold uppercase text-[#064e3b]">
                GỬI YÊU CẦU THÀNH CÔNG!
              </h4>
              <p className="text-xs sm:text-sm text-[#064e3b] max-w-md mx-auto leading-relaxed">
                Đội ngũ Kim Ngân Steel đang chuẩn bị bảng báo giá chi tiết và sẽ liên hệ trực tiếp với bạn trong thời gian sớm nhất.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#064e3b] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-black transition-all"
              >
                Gửi yêu cầu báo giá khác
              </button>
            </div>
          ) : (
            <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <label htmlFor="input_name" className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#064e3b] block">
                    HỌ VÀ TÊN *
                  </label>
                  <input
                    type="text"
                    id="input_name"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-transparent border-b border-[#064e3b]/20 pb-2 text-sm text-[#064e3b] placeholder:text-[#064e3b]/30 focus:outline-none focus:border-black transition-colors font-medium"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="input_phone" className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#064e3b] block">
                    SỐ ĐIỆN THOẠI *
                  </label>
                  <input
                    type="tel"
                    id="input_phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-[#064e3b]/20 pb-2 text-sm text-[#064e3b] placeholder:text-[#064e3b]/30 focus:outline-none focus:border-black transition-colors font-medium font-mono"
                    placeholder="0707 079 900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="input_company" className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#064e3b] block">
                  TÊN DỰ ÁN / CÔNG TY (TÙY CHỌN)
                </label>
                <input
                  type="text"
                  id="input_company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-transparent border-b border-[#064e3b]/20 pb-2 text-sm text-[#064e3b] placeholder:text-[#064e3b]/30 focus:outline-none focus:border-black transition-colors font-medium"
                  placeholder="Công ty CP Xây dựng / Tên công trình..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="input_specs" className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#064e3b] block">
                  NHU CẦU QUY CÁCH &amp; KHỐI LƯỢNG VẬT TƯ *
                </label>
                <input
                  type="text"
                  id="input_specs"
                  required
                  value={formData.specs}
                  onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                  className="w-full bg-transparent border-b border-[#064e3b]/20 pb-2 text-sm text-[#064e3b] placeholder:text-[#064e3b]/30 focus:outline-none focus:border-black transition-colors font-medium"
                  placeholder="Ví dụ: 500m tôn mạ màu 5 sóng 0.45mm, 10 tấn xà gồ C200..."
                />
              </div>

              <div className="pt-2">
                {error && (
                  <p className="text-red-600 text-xs font-mono font-bold mb-4 bg-red-50 p-3 rounded-md border border-red-100">
                    LỖI: {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 sm:py-4 sm:px-6 rounded-full bg-[#064e3b] hover:bg-black text-white font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? "ĐANG GỬI YÊU CẦU..." : "GỬI YÊU CẦU BÁO GIÁ"}</span>
                  {!isSubmitting && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
