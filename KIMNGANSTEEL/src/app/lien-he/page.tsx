import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { SiteFooter } from "@/components/antra/SiteFooter";

export default function LienHePage() {
  return (
    <main className="min-h-screen bg-[#080808] pt-[100px] flex flex-col">
      
      {/* Header */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        <p className="text-[#B8AFA3] font-bold tracking-[0.2em] uppercase mb-4 text-sm">Liên hệ với chúng tôi</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F2F0EC] uppercase tracking-tight leading-tight max-w-4xl">
          Sẵn Sàng Hợp Tác <br /> Phát Triển
        </h1>
      </section>

      {/* Main Content Split */}
      <section className="flex-grow pb-24 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Info & Map */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center border border-[rgba(216,212,206,0.1)]">
                    <MapPin size={18} className="text-[#B8AFA3]" />
                  </div>
                  <h3 className="text-[#F2F0EC] font-bold uppercase tracking-wider">Trụ sở & Nhà máy</h3>
                </div>
                <p className="text-[#999590] leading-relaxed pl-13">
                  Lô C2, Đường số 5, KCN Tân Bình<br />
                  Phường Tây Thạnh, Quận Tân Phú<br />
                  TP. Hồ Chí Minh
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center border border-[rgba(216,212,206,0.1)]">
                    <Phone size={18} className="text-[#B8AFA3]" />
                  </div>
                  <h3 className="text-[#F2F0EC] font-bold uppercase tracking-wider">Điện thoại</h3>
                </div>
                <div className="text-[#999590] leading-relaxed pl-13">
                  <p>Hotline: 090 123 4567</p>
                  <p>Kinh doanh: 090 987 6543</p>
                  <p>Kỹ thuật: 028 3815 1234</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center border border-[rgba(216,212,206,0.1)]">
                    <Mail size={18} className="text-[#B8AFA3]" />
                  </div>
                  <h3 className="text-[#F2F0EC] font-bold uppercase tracking-wider">Email</h3>
                </div>
                <p className="text-[#999590] leading-relaxed pl-13">
                  info@kimngansteel.vn<br />
                  sales@kimngansteel.vn
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center border border-[rgba(216,212,206,0.1)]">
                    <Clock size={18} className="text-[#B8AFA3]" />
                  </div>
                  <h3 className="text-[#F2F0EC] font-bold uppercase tracking-wider">Giờ làm việc</h3>
                </div>
                <p className="text-[#999590] leading-relaxed pl-13">
                  Thứ 2 - Thứ 7: 07:30 - 17:00<br />
                  Chủ nhật: Nghỉ
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative w-full h-[300px] border border-[rgba(216,212,206,0.1)] grayscale hover:grayscale-0 transition-all duration-700">
              <Image 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=85" 
                alt="Map location"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#080808]/20 mix-blend-overlay" />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-[#121212] p-8 md:p-12 border border-[rgba(216,212,206,0.1)] relative">
            <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-[#B8AFA3] opacity-30" />
            
            <h2 className="text-2xl font-bold text-[#F2F0EC] uppercase mb-2">Gửi Yêu Cầu Báo Giá</h2>
            <p className="text-[#999590] mb-8">Chúng tôi sẽ phản hồi trong vòng 2 giờ làm việc.</p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold tracking-widest uppercase text-[#999590]">Họ và Tên *</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-[#080808] border border-[rgba(216,212,206,0.1)] text-[#F2F0EC] px-4 py-3 focus:outline-none focus:border-[#B8AFA3] transition-colors"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold tracking-widest uppercase text-[#999590]">Số điện thoại *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full bg-[#080808] border border-[rgba(216,212,206,0.1)] text-[#F2F0EC] px-4 py-3 focus:outline-none focus:border-[#B8AFA3] transition-colors"
                    placeholder="090 123 4567"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="company" className="text-xs font-bold tracking-widest uppercase text-[#999590]">Tên Công Ty (Tùy chọn)</label>
                <input 
                  type="text" 
                  id="company" 
                  className="w-full bg-[#080808] border border-[rgba(216,212,206,0.1)] text-[#F2F0EC] px-4 py-3 focus:outline-none focus:border-[#B8AFA3] transition-colors"
                  placeholder="Công ty CP Xây Dựng..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold tracking-widest uppercase text-[#999590]">Nhu cầu vật tư *</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-[#080808] border border-[rgba(216,212,206,0.1)] text-[#F2F0EC] px-4 py-3 focus:outline-none focus:border-[#B8AFA3] transition-colors resize-none"
                  placeholder="Vui lòng mô tả chi tiết loại tôn, độ dày, khối lượng dự kiến..."
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full bg-[#F2F0EC] text-[#080808] font-black uppercase tracking-widest py-4 px-8 flex items-center justify-center gap-3 hover:bg-[#B8AFA3] transition-colors"
              >
                Gửi Yêu Cầu
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
