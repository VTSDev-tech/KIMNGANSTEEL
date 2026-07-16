import Image from "next/image";
import { Settings2, ArrowDownToLine, Factory, Activity } from "lucide-react";
import { SiteFooter } from "@/components/antra/SiteFooter";

export default function NangLucPage() {
  const processSteps = [
    { num: "01", title: "Nhập Nguyên Liệu", desc: "Tuyển chọn khắt khe các cuộn thép mạ kẽm, mạ lạnh từ các đối tác uy tín như Hoa Sen, Đông Á." },
    { num: "02", title: "Cắt Xẻ Băng", desc: "Máy xẻ băng tự động chia nhỏ cuộn thép lớn thành các cuộn nhỏ với kích thước chính xác theo yêu cầu." },
    { num: "03", title: "Gia Công Cán Định Hình", desc: "Hệ thống máy cán liên tục định hình biên dạng sóng tôn (5, 9, 11 sóng) hoặc biên dạng xà gồ C, Z." },
    { num: "04", title: "Kiểm Tra Chất Lượng (QC)", desc: "Sử dụng thiết bị đo laser kiểm tra độ dày, dung sai kích thước và chất lượng bề mặt mạ." },
    { num: "05", title: "Đóng Gói & Phân Phối", desc: "Thành phẩm được đóng đai thép an toàn, bọc màng bảo vệ trước khi cẩu lên xe tải giao hàng." },
  ];

  return (
    <main className="min-h-screen bg-[#080808] pt-[100px]">
      
      {/* Header */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-[rgba(216,212,206,0.1)]">
        <p className="text-[#B8AFA3] font-bold tracking-[0.2em] uppercase mb-4 text-sm">Năng lực sản xuất</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F2F0EC] uppercase tracking-tight leading-tight max-w-4xl">
          Hệ thống dây chuyền <br /> Hiện Đại
        </h1>
        <p className="text-[#999590] mt-6 text-xl max-w-2xl">
          Tiên phong ứng dụng công nghệ tự động hóa vào sản xuất, tối ưu hóa năng suất và kiểm soát chất lượng đầu ra đạt chuẩn cao nhất.
        </p>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-12 bg-[#121212] border-b border-[rgba(216,212,206,0.05)]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {[
            { label: "Sản lượng / tháng", value: "10,000+", unit: "Tấn" },
            { label: "Dây chuyền máy", value: "12", unit: "Hệ thống" },
            { label: "Diện tích xưởng", value: "5,000", unit: "m²" },
            { label: "Tỉ lệ sai hỏng", value: "<0.1", unit: "%" },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <p className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F2F0EC] mb-2">{stat.value}</p>
              <p className="text-[#B8AFA3] font-bold tracking-widest uppercase text-xs md:text-sm">{stat.unit}</p>
              <p className="text-[#999590] mt-4 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Machinery Focus */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[600px] group">
            <div className="absolute inset-0 bg-[#080808]/20 mix-blend-overlay z-10" />
            <Image 
              src="https://images.unsplash.com/photo-1621252179027-9c9886ed0195?auto=format&fit=crop&w=1200&q=85" 
              alt="Máy cán tôn CNC"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#080808] to-transparent z-20">
              <Factory className="w-8 h-8 text-[#B8AFA3] mb-4" />
              <h3 className="text-2xl font-bold text-[#F2F0EC] uppercase mb-2">Hệ thống máy cán tôn CNC</h3>
              <p className="text-[#999590]">Độ chính xác cao, tạo sóng sắc nét, chống trầy xước bề mặt.</p>
            </div>
          </div>
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[600px] group">
            <div className="absolute inset-0 bg-[#080808]/20 mix-blend-overlay z-10" />
            <Image 
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85" 
              alt="Máy đột xà gồ tự động"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#080808] to-transparent z-20">
              <Settings2 className="w-8 h-8 text-[#B8AFA3] mb-4" />
              <h3 className="text-2xl font-bold text-[#F2F0EC] uppercase mb-2">Máy cán & đột xà gồ</h3>
              <p className="text-[#999590]">Tự động đo chiều dài và đột lỗ chuẩn xác theo bản vẽ kết cấu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Process Timeline */}
      <section className="py-24 px-6 md:px-12 bg-[#121212]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0EC] uppercase">Quy trình sản xuất & QC</h2>
            <p className="text-[#999590] mt-4 max-w-2xl mx-auto text-lg">Mọi công đoạn đều được giám sát chặt chẽ, từ vật tư đầu vào đến thành phẩm đầu ra.</p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[rgba(216,212,206,0.1)] -translate-x-1/2" />
            
            <div className="space-y-12">
              {processSteps.map((step, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>
                    <h3 className="text-2xl font-bold text-[#F2F0EC] uppercase mb-3 flex items-center md:inline-flex gap-3">
                      <span className="text-[#B8AFA3] font-black">{step.num}</span>
                      {step.title}
                    </h3>
                    <p className="text-[#999590] leading-relaxed">{step.desc}</p>
                  </div>
                  
                  {/* Center Dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#B8AFA3] ring-4 ring-[#121212] z-10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
