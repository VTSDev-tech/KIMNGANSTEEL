import { ArrowUpRight } from "lucide-react";

const stats = [
  ["15+", "Năm Kinh Nghiệm"],
  ["500+", "Tấn/Tháng Công Suất"],
  ["1000+", "Khách Hàng Đã Phục Vụ"],
  ["24H", "Giao Hàng Nhanh"],
];

export function StatsBand() {
  return (
    <section className="antra-stats-band" aria-label="Studio statistics">
      {stats.map(([value, label]) => (
        <div key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}

const capabilities = [
  { 
    id: "01",
    label: "Chất lượng rõ ràng", 
    desc: "Mọi sản phẩm tôn thép đều đi kèm chứng nhận (CO/CQ) và xuất xứ minh bạch từ nhà máy." 
  },
  { 
    id: "02",
    label: "Báo giá minh bạch", 
    desc: "Cung cấp bảng giá chi tiết theo từng quy cách, cam kết không phát sinh chi phí ẩn." 
  },
  { 
    id: "03",
    label: "Tiến độ chủ động", 
    desc: "Đội xe chuyên chở linh hoạt, đảm bảo vật tư đến công trình đúng thời gian đã hẹn." 
  },
  { 
    id: "04",
    label: "Hỗ trợ tận tâm", 
    desc: "Luôn đồng hành giải quyết mọi vấn đề kỹ thuật trước, trong và sau bán hàng." 
  },
];

export function ExpertiseSection() {
  return (
    <section className="antra-section antra-expertise items-start">
      <div className="antra-expertise-copy relative lg:sticky top-auto lg:top-32 mb-10 lg:mb-0">
        <p className="antra-kicker">CAM KẾT CỦA KIM NGÂN</p>
        <h2>Năng Lực Tạo Nên Sự <span>Tin Tưởng</span></h2>
        <p>
          Cung cấp sản phẩm đúng loại, báo giá minh bạch chi tiết, chủ động trao đổi lịch giao hàng và luôn tư vấn tận tâm dựa trên nhu cầu thực tế của công trình.
        </p>
        <a className="antra-outline-link mt-6 inline-flex" href="#contact">Liên Hệ Ngay <ArrowUpRight size={16} className="ml-2" /></a>
      </div>
      
      {/* Redesigned Luxury Commitment List */}
      <div className="w-full flex flex-col border-t border-[#B8AFA3]/20">
        {capabilities.map((item) => (
          <div 
            key={item.id} 
            className="group relative flex flex-col py-6 sm:py-8 border-b border-[#B8AFA3]/20 overflow-hidden cursor-default transition-colors duration-500 hover:bg-white/[0.02]"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10 px-2 sm:px-6">
              
              <div className="flex items-start gap-4 sm:gap-6">
                <span className="text-[#9C8A73] text-sm sm:text-base font-serif italic mt-1 font-light tracking-widest">
                  {item.id}
                </span>
                <div>
                  <h3 className="text-xl sm:text-[22px] font-bold uppercase tracking-widest text-[#F2F0EC] group-hover:text-[#9C8A73] transition-colors duration-300">
                    {item.label}
                  </h3>
                  <p className="text-sm text-[#A39E96] leading-[1.8] mt-3 font-light max-w-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex w-12 h-12 rounded-full border border-white/10 items-center justify-center group-hover:border-[#9C8A73] group-hover:bg-[#9C8A73] text-[#A39E96] group-hover:text-[#080808] transition-all duration-500 transform group-hover:rotate-45 flex-shrink-0 mt-1">
                <ArrowUpRight size={20} className="transition-transform duration-500" />
              </div>
            </div>

            {/* Premium hover gradient sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9C8A73]/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
