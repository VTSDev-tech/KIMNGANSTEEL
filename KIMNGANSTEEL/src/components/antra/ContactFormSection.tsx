import { Mail, MapPin, Phone, Send } from "lucide-react";

export function ContactFormSection() {
  return (
    <section className="antra-contact-form-section !bg-[#080808] !text-[#F2F0EC] !border-t !border-[rgba(216,212,206,0.1)]">
      
      {/* Copy (Right side on desktop, Top on mobile) */}
      <div className="antra-contact-copy md:col-start-2 md:row-start-1">
        <p className="antra-kicker">FORM NHẬN BÁO GIÁ</p>
        <h2 className="text-[#F2F0EC]">
          NHẬN BÁO GIÁ TÔN THÉP{" "}
          <span className="!text-transparent bg-clip-text bg-gradient-to-br from-[#C99A5C] via-[#ffffff] to-[#4A4D54] drop-shadow-lg inline-block">
            NHANH
          </span>
        </h2>
        <p className="!text-[#999590]">
          Vui lòng để lại thông tin sản phẩm, quy cách và số lượng cần mua. Đội ngũ Kim Ngân sẽ liên hệ tư vấn và gửi báo giá phù hợp trong thời gian sớm nhất.
        </p>
        <div className="antra-contact-mini !text-[#F2F0EC] mt-8 space-y-4">
          <span className="flex items-center gap-3">
            <MapPin size={20} className="text-[#B8AFA3]" /> 262 đường DT742, Vĩnh Tân, Tân Uyên, Tp. HCM
          </span>
          <span className="flex items-center gap-3">
            <Mail size={20} className="text-[#B8AFA3]" /> sales@kimngansteel.vn
          </span>
          <span className="flex items-center gap-3">
            <Phone size={20} className="text-[#B8AFA3]" /> 090 123 4567
          </span>
        </div>
      </div>

      {/* Form (Left side on desktop, Bottom on mobile) */}
      <div className="bg-[#121212] p-8 md:p-12 border border-[rgba(216,212,206,0.1)] relative md:col-start-1 md:row-start-1">
        <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-[#B8AFA3] opacity-30" />
        
        <h2 className="text-2xl font-bold text-[#F2F0EC] uppercase mb-2">Gửi Yêu Cầu Báo Giá</h2>
        <p className="text-[#999590] mb-8">Chúng tôi sẽ phản hồi trong vòng 2 giờ làm việc.</p>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="hp_name" className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#999590]/80">Họ và Tên *</label>
              <input 
                type="text" 
                id="hp_name" 
                className="w-full bg-transparent border-b border-[rgba(216,212,206,0.2)] text-[#F2F0EC] text-[15px] font-medium px-0 py-2 focus:outline-none focus:border-[#C99A5C] transition-colors placeholder:text-[#999590]/30 placeholder:font-normal"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="hp_phone" className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#999590]/80">Số điện thoại *</label>
              <input 
                type="tel" 
                id="hp_phone" 
                className="w-full bg-transparent border-b border-[rgba(216,212,206,0.2)] text-[#F2F0EC] text-[15px] font-medium px-0 py-2 focus:outline-none focus:border-[#C99A5C] transition-colors placeholder:text-[#999590]/30 placeholder:font-normal"
                placeholder="090 123 4567"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="hp_company" className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#999590]/80">Tên Công Ty (Tùy chọn)</label>
            <input 
              type="text" 
              id="hp_company" 
              className="w-full bg-transparent border-b border-[rgba(216,212,206,0.2)] text-[#F2F0EC] text-[15px] font-medium px-0 py-2 focus:outline-none focus:border-[#C99A5C] transition-colors placeholder:text-[#999590]/30 placeholder:font-normal"
              placeholder="Công ty CP Xây Dựng..."
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="hp_message" className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#999590]/80">Nhu cầu vật tư *</label>
            <textarea 
              id="hp_message" 
              rows={2}
              className="w-full bg-transparent border-b border-[rgba(216,212,206,0.2)] text-[#F2F0EC] text-[15px] font-medium px-0 py-2 focus:outline-none focus:border-[#C99A5C] transition-colors resize-none placeholder:text-[#999590]/30 placeholder:font-normal"
              placeholder="Vui lòng mô tả chi tiết loại tôn, độ dày, khối lượng dự kiến..."
            ></textarea>
          </div>

          <button 
            type="button" 
            className="w-full bg-[#F2F0EC] text-[#080808] font-bold uppercase tracking-[0.1em] py-3.5 flex items-center justify-center gap-3 hover:bg-[#C99A5C] hover:text-[#080808] transition-colors rounded-[1px]"
          >
            Gửi Yêu Cầu
            <Send size={18} />
          </button>
        </form>
      </div>

    </section>
  );
}
