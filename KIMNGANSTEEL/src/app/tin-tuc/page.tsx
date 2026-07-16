import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { SiteFooter } from "@/components/antra/SiteFooter";

export default function TinTucPage() {
  const featuredPost = {
    title: "Dự báo biến động giá thép xây dựng quý 3/2026: Đâu là giải pháp cho nhà thầu?",
    category: "Thị trường",
    date: "10 Tháng 7, 2026",
    excerpt: "Trước áp lực chi phí nguyên liệu đầu vào và cước vận tải tăng cao, thị trường tôn thép đang chứng kiến những đợt điều chỉnh giá liên tục. Các nhà thầu xây dựng cần có chiến lược gì để đảm bảo ngân sách công trình?",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85"
  };

  const recentPosts = [
    {
      title: "Kim Ngân Steel đầu tư máy cán xà gồ Z công suất lớn",
      category: "Nội bộ",
      date: "05 Tháng 7, 2026",
      excerpt: "Nhằm đáp ứng nhu cầu khắt khe của các dự án nhà thép tiền chế, chúng tôi vừa đưa vào vận hành hệ thống cán xà gồ Z tự động hoàn toàn.",
      img: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=85"
    },
    {
      title: "Cách phân biệt tôn mạ kẽm và tôn lạnh mạ màu chuẩn xác",
      category: "Kiến thức",
      date: "28 Tháng 6, 2026",
      excerpt: "Nhiều khách hàng vẫn nhầm lẫn giữa hai loại vật liệu này dẫn đến việc sử dụng sai mục đích làm giảm tuổi thọ công trình.",
      img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=85"
    },
    {
      title: "Tổng quan xu hướng sử dụng vật liệu xanh trong nhà công nghiệp",
      category: "Xu hướng",
      date: "15 Tháng 6, 2026",
      excerpt: "Việc sử dụng các loại tôn lợp phản xạ nhiệt và vật liệu có khả năng tái chế đang trở thành tiêu chuẩn mới trong thiết kế nhà xưởng.",
      img: "https://images.unsplash.com/photo-1541888087405-eb10bb073f1c?auto=format&fit=crop&w=800&q=85"
    }
  ];

  return (
    <main className="min-h-screen bg-[#080808] pt-[100px]">
      
      {/* Header */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-[rgba(216,212,206,0.1)]">
        <p className="text-[#B8AFA3] font-bold tracking-[0.2em] uppercase mb-4 text-sm">Tin tức & Sự kiện</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F2F0EC] uppercase tracking-tight leading-tight max-w-4xl">
          Cập nhật thị trường <br /> Tôn thép
        </h1>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="group cursor-pointer">
          <div className="relative aspect-[2/1] md:aspect-[2.5/1] w-full overflow-hidden mb-8">
            <div className="absolute inset-0 bg-[#080808]/20 mix-blend-overlay z-10" />
            <Image 
              src={featuredPost.img} 
              alt={featuredPost.title}
              fill
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
          </div>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 text-sm font-bold tracking-wider uppercase mb-4">
              <span className="text-[#F2F0EC] bg-[#222] px-3 py-1">{featuredPost.category}</span>
              <span className="text-[#999590] flex items-center gap-2"><Calendar size={16}/> {featuredPost.date}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0EC] group-hover:text-[#B8AFA3] transition-colors mb-4">{featuredPost.title}</h2>
            <p className="text-[#999590] text-lg leading-relaxed mb-6">{featuredPost.excerpt}</p>
            <span className="flex items-center gap-3 text-[#F2F0EC] font-bold tracking-widest uppercase text-sm group-hover:text-[#B8AFA3] transition-colors">
              Đọc tiếp bài viết
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-[rgba(216,212,206,0.1)]">
        <h3 className="text-2xl font-bold text-[#F2F0EC] uppercase mb-10">Tin mới nhất</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {recentPosts.map((post, idx) => (
            <div key={idx} className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[16/9] w-full overflow-hidden mb-6">
                <div className="absolute inset-0 bg-[#080808]/20 mix-blend-overlay z-10" />
                <Image 
                  src={post.img} 
                  alt={post.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs font-bold tracking-wider uppercase mb-3">
                  <span className="text-[#B8AFA3]">{post.category}</span>
                  <span className="text-[#555]">•</span>
                  <span className="text-[#777]">{post.date}</span>
                </div>
                <h4 className="text-xl font-bold text-[#F2F0EC] group-hover:text-[#B8AFA3] transition-colors mb-3 leading-tight line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-[#999590] line-clamp-3 mb-6 flex-grow">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-[#F2F0EC] font-bold tracking-widest uppercase text-xs group-hover:text-[#B8AFA3] transition-colors mt-auto">
                  Đọc tiếp
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
