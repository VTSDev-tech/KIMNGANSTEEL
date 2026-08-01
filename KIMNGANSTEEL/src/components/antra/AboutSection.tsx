
export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-[#ffffff] border-b border-[#064e3b]/10 text-[#064e3b] overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-20">
        
        {/* Magazine Spread Headline & Supporting Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="editorial-subhead text-[#064e3b] block mb-6">
              EXECUTIVE STATEMENT
            </span>
            <h2 className="editorial-statement text-[#064e3b]">
              Hơn 15 năm làm chủ công nghệ gia công cán tôn và phân phối thép xây dựng tiêu chuẩn chất lượng cao.
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pl-8 border-l border-[#064e3b]/15">
            <p className="text-sm text-[#064e3b] font-light leading-relaxed">
              Kim Ngân Steel là đối tác đáng tin cậy cung ứng phôi thép cuộn, tôn lạnh màu, xà gồ C/Z và thép hộp mạ kẽm cho các công trình nhà xưởng công nghiệp, dự án thương mại và dân dụng trên khắp cả nước.
            </p>
          </div>
        </div>

        {/* Full-Bleed Atmospheric Factory Photo */}
        <div data-cursor="FACTORY" className="relative w-full aspect-[21/9] min-h-[320px] overflow-hidden border border-[#064e3b]/15 group cursor-pointer shadow-lg">
          <img 
            src="/nha_xuong.png" 
            alt="Kim Ngân Steel Production Facility" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#ffffff]/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 text-xs font-mono text-[#064e3b] bg-white/80 px-3 py-1 backdrop-blur-sm">
            CƠ SỞ SẢN XUẤT KIM NGÂN STEEL — DĨ AN, BÌNH DƯƠNG
          </div>
        </div>

      </div>
    </section>
  );
}
