import Image from "next/image";
import { ShieldCheck, Zap, Handshake, Target, Compass, Award } from "lucide-react";
import { SiteFooter } from "@/components/antra/SiteFooter";

export default function GioiThieuPage() {
  return (
    <main className="min-h-screen bg-[#080808] pt-[100px]">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=2000&q=85')" }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#080808]/50 via-transparent to-[#080808]" />
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <p className="text-[#B8AFA3] font-bold tracking-[0.2em] uppercase mb-4 text-sm">Về Kim Ngân Steel</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#F2F0EC] uppercase tracking-tight leading-tight">
            Nền tảng vững chắc <br className="hidden md:block" /> cho mọi công trình
          </h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0EC] uppercase mb-8 leading-tight">
              Hành trình kiến tạo <br /> chuẩn mực vật liệu
            </h2>
            <div className="space-y-6 text-[#999590] text-lg leading-relaxed">
              <p>
                Được thành lập với tầm nhìn trở thành đối tác cung ứng vật liệu xây dựng hàng đầu, Công ty TNHH Tôn Thép Kim Ngân đã không ngừng đầu tư vào hệ thống dây chuyền gia công hiện đại và đa dạng hóa nguồn sản phẩm.
              </p>
              <p>
                Từ một nhà phân phối quy mô vừa, chúng tôi đã vươn lên thành đơn vị cung cấp toàn diện các dòng tôn cuộn, tôn cán sóng, thép hộp và xà gồ cho hàng ngàn dự án công nghiệp lẫn dân dụng khắp cả nước.
              </p>
              <p>
                Sự thấu hiểu sâu sắc về đặc tính vật liệu cùng kinh nghiệm thực chiến giúp Kim Ngân Steel luôn đưa ra giải pháp tối ưu nhất, cân bằng giữa chi phí, kỹ thuật và độ bền công trình.
              </p>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] w-full">
            <Image 
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=85" 
              alt="Kim Ngan Steel Factory" 
              fill
              className="object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute -bottom-8 -left-8 bg-[#121212] p-8 border border-[rgba(216,212,206,0.1)] hidden md:block">
              <p className="text-5xl font-black text-[#F2F0EC] mb-2">15+</p>
              <p className="text-[#B8AFA3] font-medium tracking-wide uppercase text-sm">Năm Kinh Nghiệm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 md:px-12 bg-[#121212] border-y border-[rgba(216,212,206,0.05)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0EC] uppercase">Giá trị cốt lõi</h2>
            <p className="text-[#999590] mt-4 max-w-2xl mx-auto text-lg">Những nguyên tắc bất di bất dịch định hình cách chúng tôi vận hành và phục vụ khách hàng.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: ShieldCheck, 
                title: "Chất lượng tuyệt đối", 
                desc: "Cam kết 100% sản phẩm đạt tiêu chuẩn kỹ thuật nghiêm ngặt trước khi xuất xưởng."
              },
              { 
                icon: Zap, 
                title: "Tốc độ linh hoạt", 
                desc: "Hệ thống máy móc hiện đại cho phép gia công cực nhanh, đáp ứng ngay cả các đơn hàng gấp."
              },
              { 
                icon: Handshake, 
                title: "Uy tín đối tác", 
                desc: "Lấy sự chính trực làm gốc, báo giá minh bạch, giao hàng đúng hẹn, đồng hành dài lâu."
              },
              { 
                icon: Target, 
                title: "Tập trung giải pháp", 
                desc: "Không chỉ bán vật liệu, chúng tôi tư vấn giải pháp tối ưu cho từng đặc thù công trình."
              },
              { 
                icon: Compass, 
                title: "Định hướng tương lai", 
                desc: "Liên tục cập nhật công nghệ cán tôn mới nhất, nâng cao năng suất và chất lượng thành phẩm."
              },
              { 
                icon: Award, 
                title: "Trách nhiệm xã hội", 
                desc: "Đảm bảo môi trường làm việc an toàn, đóng góp tích cực vào sự phát triển cộng đồng."
              }
            ].map((item, index) => (
              <div key={index} className="p-8 border border-[rgba(216,212,206,0.1)] hover:border-[#B8AFA3] transition-colors group bg-[#0A0A0A]">
                <item.icon className="w-10 h-10 text-[#555] group-hover:text-[#F2F0EC] transition-colors mb-6" />
                <h3 className="text-xl font-bold text-[#F2F0EC] mb-4">{item.title}</h3>
                <p className="text-[#999590] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
