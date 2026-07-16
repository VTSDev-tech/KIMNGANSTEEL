"use client";

import { motion } from "framer-motion";
import { SiteFooter } from "@/components/antra/SiteFooter";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-[#080808] text-white min-h-screen pt-24 font-sans">
      
      {/* 1. Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E4DB] to-[#A39A86] mb-4">
              Liên Hệ Kim Ngân Steel
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ tư vấn kỹ thuật và cung cấp báo giá tốt nhất cho dự án của bạn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Contact Info & Form */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Cột trái: Thông tin */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl font-serif text-white mb-6">Thông Tin Doanh Nghiệp</h2>
                <h3 className="text-xl font-bold text-[#C99A5C] mb-2">Công ty TNHH Tôn Thép Kim Ngân</h3>
                <p className="text-gray-400 mb-8">MST: 0312XXXXXX</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-[#111] p-6 rounded-xl border border-white/5">
                  <MapPin className="w-8 h-8 text-[#C99A5C] shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">Trụ sở & Nhà Máy</h4>
                    <p className="text-gray-400">123 Đường Công Nghiệp, Khu Công Nghiệp Sóng Thần, Dĩ An, Bình Dương</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#111] p-6 rounded-xl border border-white/5">
                  <Phone className="w-8 h-8 text-[#C99A5C] shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">Điện thoại / Zalo</h4>
                    <p className="text-gray-400">0934 096 794 - Hỗ trợ 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#111] p-6 rounded-xl border border-white/5">
                  <Mail className="w-8 h-8 text-[#C99A5C] shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">Email Phòng Kinh Doanh</h4>
                    <p className="text-gray-400">sales@kimngansteel.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#111] p-6 rounded-xl border border-white/5">
                  <Clock className="w-8 h-8 text-[#C99A5C] shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">Giờ làm việc</h4>
                    <p className="text-gray-400">Thứ Hai - Thứ Bảy: 07:30 - 17:00<br/>Chủ Nhật: Nghỉ</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cột phải: Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#111] border border-white/10 p-8 md:p-12 rounded-2xl"
            >
              <h3 className="text-2xl font-serif text-white mb-2">Nhận Báo Giá Nhanh</h3>
              <p className="text-gray-400 text-sm mb-8">Vui lòng để lại thông tin, chúng tôi sẽ liên hệ lại trong vòng 15 phút.</p>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-bold">Họ và Tên <span className="text-[#C99A5C]">*</span></label>
                    <input type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C99A5C] transition-colors" placeholder="Nguyễn Văn A" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-bold">Số điện thoại / Zalo <span className="text-[#C99A5C]">*</span></label>
                    <input type="tel" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C99A5C] transition-colors" placeholder="0909..." required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-bold">Loại Sản Phẩm Quan Tâm</label>
                  <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-[#C99A5C] transition-colors appearance-none">
                    <option>Tôn Lợp / Tôn Lạnh</option>
                    <option>Thép Hộp / Thép Ống</option>
                    <option>Thép Hình / Thép Tấm</option>
                    <option>Xà Gồ C/Z</option>
                    <option>Khác (Ghi rõ ở Lời nhắn)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-bold">Lời nhắn / Khối lượng dự kiến</label>
                  <textarea rows={4} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C99A5C] transition-colors" placeholder="Ví dụ: Cần báo giá 5 tấn tôn lạnh dày 4 zem..."></textarea>
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full bg-[#C99A5C] hover:bg-white text-black font-bold text-lg py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    Gửi Yêu Cầu <Send className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Bằng việc gửi form, bạn đồng ý với <a href="#" className="text-[#C99A5C] hover:underline">Chính sách bảo mật (Privacy Policy)</a> của chúng tôi. Dữ liệu của bạn được cam kết bảo mật tuyệt đối.
                </p>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Bản đồ */}
      <section className="h-[400px] w-full mt-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15671.306161474272!2d106.7456747!3d10.9015093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d82f7c000001%3A0x6b7724213791a45!2sKhu%20c%C3%B4ng%20nghi%E1%BB%87p%20S%C3%B3ng%20Th%E1%BA%A7n%201!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <SiteFooter />
    </main>
  );
}
