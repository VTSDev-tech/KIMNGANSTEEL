import Image from "next/image";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { SiteFooter } from "@/components/antra/SiteFooter";

export default function SanPhamPage() {
  const categories = [
    {
      title: "Tôn Lạnh & Tôn Màu",
      desc: "Vật liệu lợp mái và ốp vách tối ưu, khả năng chống ăn mòn cao, đa dạng biên dạng sóng (5 sóng, 9 sóng, 11 sóng, sóng ngói).",
      image: "https://images.unsplash.com/photo-1623910385970-d86b7ba9045b?auto=format&fit=crop&w=1200&q=85",
      specs: ["Độ dày: 0.25mm - 0.50mm", "Khổ rộng: 1200mm", "Thương hiệu: Hoa Sen, Đông Á, Nam Kim", "Tiêu chuẩn: JIS G3321 / ASTM A792"]
    },
    {
      title: "Thép Hộp & Thép Ống",
      desc: "Sản phẩm thép hộp mạ kẽm và đen dùng trong kết cấu thép, cơ khí chế tạo, khung sườn nhà xưởng với độ bền chịu lực vượt trội.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
      specs: ["Quy cách vuông: 12x12 - 100x100", "Quy cách chữ nhật: 13x26 - 60x120", "Độ dày: 0.7mm - 3.0mm", "Thương hiệu: Hòa Phát, Sendo"]
    },
    {
      title: "Xà Gồ C & Z",
      desc: "Xà gồ thép mạ kẽm cường độ cao, đột lỗ theo thiết kế công trình. Ứng dụng làm hệ giàn đỡ mái nhà xưởng, nhà thép tiền chế.",
      image: "https://images.unsplash.com/photo-1533096894038-f99a34bc6e8b?auto=format&fit=crop&w=1200&q=85",
      specs: ["Chiều cao tiết diện: 80mm - 300mm", "Độ dày: 1.5mm - 3.0mm", "Lỗ đột: Oval, Tròn theo bản vẽ", "Chất liệu: Thép mạ kẽm G450"]
    }
  ];

  return (
    <main className="min-h-screen bg-[#080808] pt-[100px]">
      
      {/* Header */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-[rgba(216,212,206,0.1)]">
        <p className="text-[#B8AFA3] font-bold tracking-[0.2em] uppercase mb-4 text-sm">Danh mục cung cấp</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F2F0EC] uppercase tracking-tight leading-tight max-w-4xl">
          Giải Pháp Vật Liệu <br /> Toàn Diện
        </h1>
        <p className="text-[#999590] mt-6 text-xl max-w-2xl">
          Các dòng sản phẩm tôn thép chất lượng cao được sản xuất và phân phối trực tiếp, đáp ứng nghiêm ngặt các tiêu chuẩn kỹ thuật xây dựng.
        </p>
      </section>

      {/* Product Categories */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto space-y-24">
        {categories.map((cat, idx) => (
          <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
            
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative aspect-[4/3] group">
              <div className="absolute inset-0 bg-[#F2F0EC]/5 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0" />
              <Image 
                src={cat.image} 
                alt={cat.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              {/* Corner decor */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B8AFA3] z-20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B8AFA3] z-20" />
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0EC] uppercase mb-6">{cat.title}</h2>
              <p className="text-[#999590] text-lg leading-relaxed mb-8">{cat.desc}</p>
              
              <div className="bg-[#121212] border border-[rgba(216,212,206,0.1)] p-6 md:p-8 mb-8">
                <h3 className="text-[#F2F0EC] font-bold uppercase tracking-wide mb-6 flex items-center gap-2">
                  <FileText size={20} className="text-[#B8AFA3]" />
                  Thông số kỹ thuật
                </h3>
                <ul className="space-y-4">
                  {cat.specs.map((spec, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-3 text-[#999590]">
                      <CheckCircle2 size={18} className="text-[#B8AFA3] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="flex items-center gap-3 text-[#F2F0EC] font-bold tracking-widest uppercase text-sm border-b border-[#B8AFA3] pb-1 hover:text-[#B8AFA3] transition-colors group">
                Nhận Báo Giá Ngay
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
