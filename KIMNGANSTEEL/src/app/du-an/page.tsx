import Image from "next/image";
import { Quote } from "lucide-react";
import { SiteFooter } from "@/components/antra/SiteFooter";

export default function DuAnPage() {
  const projects = [
    { title: "Khu công nghiệp Mỹ Phước 3", category: "Nhà xưởng công nghiệp", year: "2025", span: "col-span-1 md:col-span-2 row-span-2", img: "https://images.unsplash.com/photo-1541888087405-eb10bb073f1c?auto=format&fit=crop&w=1200&q=85" },
    { title: "Trung tâm Logistics Tân Bình", category: "Kho bãi thương mại", year: "2025", span: "col-span-1 md:col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1590218731307-e81816e879bb?auto=format&fit=crop&w=800&q=85" },
    { title: "Khu phức hợp thể thao đa năng", category: "Công trình dân dụng", year: "2024", span: "col-span-1 md:col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=85" },
    { title: "Nhà máy dệt may giai đoạn 2", category: "Nhà xưởng công nghiệp", year: "2024", span: "col-span-1 md:col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1517480132332-6a6839d3752e?auto=format&fit=crop&w=800&q=85" },
    { title: "Siêu thị Mega Mall chi nhánh 4", category: "Thương mại dịch vụ", year: "2023", span: "col-span-1 md:col-span-2 row-span-1", img: "https://images.unsplash.com/photo-1498661694102-0a3793edbe74?auto=format&fit=crop&w=1200&q=85" },
  ];

  const testimonials = [
    { quote: "Chất lượng tôn cán sóng rất đều và đẹp. Điều tôi ấn tượng nhất là khả năng cung ứng khối lượng lớn trong thời gian ngắn của Kim Ngân, giúp dự án của chúng tôi kịp tiến độ cất nóc trước mùa mưa.", author: "Anh Trần Quang Minh", role: "Giám đốc dự án - Xây dựng Hòa Bình" },
    { quote: "Là đối tác nhập hàng nhiều năm, tôi rất yên tâm về giá cả và sự minh bạch của Kim Ngân Steel. Hàng luôn đủ vạch ly, đúng rem, không bao giờ có tình trạng trộn hàng kém chất lượng.", author: "Chị Lê Thị Thanh Mai", role: "Đại lý phân phối VLXD - Bình Dương" },
    { quote: "Mảng xà gồ đột lỗ tự động của Kim Ngân giúp anh em thi công tiết kiệm rất nhiều thời gian lắp ráp tại công trường. Kích thước chuẩn xác gần như tuyệt đối.", author: "Kỹ sư Hoàng Văn Thái", role: "Chỉ huy trưởng - Công ty Kết Cấu Thép" },
  ];

  return (
    <main className="min-h-screen bg-[#080808] pt-[100px]">
      
      {/* Header */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-[rgba(216,212,206,0.1)]">
        <p className="text-[#B8AFA3] font-bold tracking-[0.2em] uppercase mb-4 text-sm">Dự án tiêu biểu</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F2F0EC] uppercase tracking-tight leading-tight max-w-4xl">
          Dấu ấn qua từng <br /> Công trình
        </h1>
        <p className="text-[#999590] mt-6 text-xl max-w-2xl">
          Tự hào là nhà cung cấp vật liệu đáng tin cậy cho hàng ngàn dự án công nghiệp, thương mại và dân dụng trên toàn quốc.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {projects.map((project, idx) => (
            <div key={idx} className={`relative group overflow-hidden ${project.span}`}>
              <div className="absolute inset-0 bg-[#080808]/40 mix-blend-overlay z-10 transition-all duration-500 group-hover:bg-[#080808]/20" />
              <Image 
                src={project.img} 
                alt={project.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent z-20 opacity-90 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[#B8AFA3] font-bold tracking-widest uppercase text-xs mb-2">
                  {project.category} • {project.year}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-[#F2F0EC] uppercase">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 bg-[#121212] border-t border-[rgba(216,212,206,0.05)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0EC] uppercase">Sự tín nhiệm</h2>
            <p className="text-[#999590] mt-4 max-w-2xl mx-auto text-lg">Phản hồi từ các đối tác và khách hàng đã đồng hành cùng Kim Ngân Steel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="p-8 md:p-10 border border-[rgba(216,212,206,0.1)] bg-[#0A0A0A] relative flex flex-col justify-between">
                <div>
                  <Quote className="w-10 h-10 text-[#222] mb-6 absolute top-8 left-8" />
                  <p className="text-[#F2F0EC] text-lg leading-relaxed relative z-10 italic mt-8">&quot;{test.quote}&quot;</p>
                </div>
                <div className="mt-8 pt-6 border-t border-[rgba(216,212,206,0.1)]">
                  <p className="font-bold text-[#F2F0EC]">{test.author}</p>
                  <p className="text-[#B8AFA3] text-sm mt-1">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
