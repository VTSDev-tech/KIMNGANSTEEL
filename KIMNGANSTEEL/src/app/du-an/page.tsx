"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SiteFooter } from "@/components/antra/SiteFooter";
import { MapPin, Building2, HardHat } from "lucide-react";

const PROJECTS = [
  {
    name: "Nhà xưởng KCN Sóng Thần 2",
    client: "Công ty Cổ phần Bao Bì X",
    volume: "5,000m² Tôn Lạnh Màu 0.45",
    image: "/nha_xuong.png",
    location: "Dĩ An, Bình Dương"
  },
  {
    name: "Dự án Nhà Thép Tiền Chế Logistic",
    client: "Tập đoàn Vận tải V",
    volume: "200 Tấn Thép Hộp & Xà Gồ C",
    image: "/nha_thep_tien_che.png",
    location: "Bến Lức, Long An"
  },
  {
    name: "Khu Biệt Thự Tân Cổ Điển",
    client: "Công ty Đầu tư Bất Động Sản N",
    volume: "1,200m² Tôn Ngói Ruby",
    image: "/cong_trinh_dan_dung.png",
    location: "Quận 9, TP.HCM"
  },
  {
    name: "Kho bãi Logistics Trung tâm",
    client: "Công ty Vận chuyển S",
    volume: "Trọn gói Thép & Tôn mái",
    image: "/kho_logistics.png",
    location: "Bình Tân, TP.HCM"
  }
];

export default function ProjectsPage() {
  return (
    <main className="bg-[#080808] text-white min-h-screen pt-24 font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative py-20 overflow-hidden flex items-center justify-center min-h-[40vh]">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/nha_thep_tien_che.png" alt="Dự án" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/60 to-[#080808]" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E4DB] to-[#A39A86] mb-4">
              Dự Án Tiêu Biểu
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Hàng ngàn công trình vững chãi trên khắp cả nước được xây dựng từ nguồn vật liệu do Kim Ngân Steel cung cấp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Lưới Dự án */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PROJECTS.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden mb-6 border border-white/10">
                  <Image 
                    src={project.image} 
                    alt={project.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-[#C99A5C] text-black px-3 py-1 rounded-full text-sm font-bold">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-[#C99A5C] transition-colors">{project.name}</h3>
                
                <div className="flex flex-col gap-2 text-gray-400 text-sm">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-white/50" />
                    <span><strong>Chủ đầu tư:</strong> {project.client}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HardHat className="w-5 h-5 text-white/50" />
                    <span><strong>Khối lượng:</strong> {project.volume}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Đối tác */}
      <section className="py-20 bg-[#111] border-t border-white/5 text-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-sm tracking-[0.2em] text-[#C99A5C] uppercase font-bold mb-12">Đối Tác & Thương Hiệu Phân Phối</h2>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Giả lập logo đối tác */}
            <div className="text-2xl font-bold font-serif">HOA SEN GROUP</div>
            <div className="text-2xl font-bold font-serif">HÒA PHÁT</div>
            <div className="text-2xl font-bold font-serif">NS BLUESCOPE</div>
            <div className="text-2xl font-bold font-serif">VINAONE</div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
