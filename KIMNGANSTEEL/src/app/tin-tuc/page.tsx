"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SiteFooter } from "@/components/antra/SiteFooter";
import { Calendar, ArrowRight } from "lucide-react";

const BLOG_POSTS = [
  {
    title: "Bảng giá thép xây dựng cập nhật mới nhất Tuần 2/2026",
    category: "Thị trường",
    date: "12/07/2026",
    image: "/kho_logistics.png",
    excerpt: "Cập nhật bảng giá thép hộp, xà gồ, tôn lạnh từ các thương hiệu lớn như Hòa Phát, Hoa Sen. Biến động giá giảm nhẹ so với tuần trước."
  },
  {
    title: "Cách chọn độ dày tôn lợp phù hợp cho nhà xưởng công nghiệp",
    category: "Kiến thức",
    date: "05/07/2026",
    image: "/nha_xuong.png",
    excerpt: "Độ dày tôn quyết định tuổi thọ và khả năng chống chịu bão gió của nhà xưởng. Cùng tìm hiểu tiêu chuẩn zem phù hợp cho từng khu vực."
  },
  {
    title: "Kinh nghiệm thi công mái tôn chống dột hiệu quả mùa mưa",
    category: "Thi công",
    date: "28/06/2026",
    image: "/nha_thep_tien_che.png",
    excerpt: "Hướng dẫn kỹ thuật bắn vít, dán silicon và xử lý khe hở giữa các tấm tôn để chống dột tuyệt đối cho công trình dân dụng và công nghiệp."
  },
  {
    title: "Phân biệt Tôn Lạnh và Tôn Mạ Kẽm: Loại nào tốt hơn?",
    category: "Kiến thức",
    date: "15/06/2026",
    image: "/ton_lanh_ton_mau.svg",
    excerpt: "So sánh chi tiết về cấu tạo lớp mạ, tuổi thọ, khả năng chống nóng và giá thành giữa tôn lạnh và tôn kẽm truyền thống."
  }
];

export default function BlogPage() {
  return (
    <main className="bg-[#080808] text-white min-h-screen pt-24 font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative py-20 overflow-hidden flex items-center justify-center min-h-[40vh]">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image src="/kho_logistics.png" alt="Tin tức" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-[#080808]/80 to-[#080808]" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E4DB] to-[#A39A86] mb-4">
              Kiến Thức & Cập Nhật
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Thông tin thị trường, bảng giá và cẩm nang kinh nghiệm vật liệu xây dựng.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Lưới Bài Viết */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-[#C99A5C]/40 transition-colors cursor-pointer"
              >
                <div className="relative h-56 w-full overflow-hidden bg-[#1a1a1a]">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-[#C99A5C] text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-[#C99A5C] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-[#C99A5C] text-sm font-bold uppercase tracking-wider group-hover:gap-4 transition-all">
                    Đọc tiếp <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
