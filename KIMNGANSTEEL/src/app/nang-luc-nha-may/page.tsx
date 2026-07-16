"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SiteFooter } from "@/components/antra/SiteFooter";
import { Settings, Maximize, Zap, ShieldCheck } from "lucide-react";

const CAPABILITIES = [
  { icon: <Zap className="w-8 h-8 text-[#C99A5C]" />, title: "Công Suất Lớn", desc: "Hơn 500 tấn/tháng, đáp ứng tiến độ mọi dự án." },
  { icon: <Settings className="w-8 h-8 text-[#C99A5C]" />, title: "5 Dây Chuyền", desc: "Tự động hóa hoàn toàn, cán sóng và xả băng chính xác." },
  { icon: <Maximize className="w-8 h-8 text-[#C99A5C]" />, title: "Kho Bãi Rộng", desc: "Sức chứa hàng ngàn tấn phôi, luôn sẵn sàng xuất xưởng." },
  { icon: <ShieldCheck className="w-8 h-8 text-[#C99A5C]" />, title: "Kiểm Định Kỹ", desc: "Đo lường độ dày, độ bám kẽm trước khi đóng gói." },
];

const GALLERY = [
  "/nha_xuong.png",
  "/kho_logistics.png",
  "/ton_can_song.svg",
  "/thep_cuon_ma_kem.svg"
];

export default function FactoryPage() {
  return (
    <main className="bg-[#080808] text-white min-h-screen pt-24 font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative py-20 overflow-hidden flex items-center justify-center min-h-[40vh]">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/nha_xuong.png" alt="Nhà xưởng" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/60 to-[#080808]" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E4DB] to-[#A39A86] mb-4">
              Năng Lực Sản Xuất
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Hệ thống nhà máy hiện đại, quy trình khép kín, tối ưu hóa từ nguyên liệu đầu vào đến thành phẩm.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Tổng quan năng lực */}
      <section className="py-20 bg-[#111]">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CAPABILITIES.map((cap, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1a1a1a] p-8 rounded-xl border border-white/5 hover:border-[#C99A5C]/40 transition-colors flex flex-col items-center text-center"
              >
                <div className="mb-6 bg-[#080808] p-4 rounded-full border border-white/10">
                  {cap.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{cap.title}</h3>
                <p className="text-gray-400 text-sm">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Quy trình sản xuất */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#C99A5C] mb-4">Quy trình gia công & cán tôn</h2>
            <p className="text-gray-400">Từ cuộn mạ nguyên bản đến mái tôn hoàn thiện</p>
          </motion.div>

          <div className="space-y-12">
            {[
              { step: "01", title: "Nhập & Kiểm tra cuộn thép gốc", desc: "Tất cả cuộn mạ (Hoa Sen, Hòa Phát) được cân, đo độ dày, dán tem mã vạch trước khi nhập kho." },
              { step: "02", title: "Đưa vào máy xả băng / cán sóng", desc: "Máy tự động kéo cuộn mạ đi qua hệ thống lô cán để tạo hình sóng vuông, sóng ngói hoặc xả băng theo kích thước yêu cầu." },
              { step: "03", title: "Cắt CNC chính xác", desc: "Cắt tôn theo đúng chiều dài bản vẽ bằng hệ thống dao cắt CNC, sai số dưới 1mm." },
              { step: "04", title: "KCS & Đóng gói", desc: "Nhân viên KCS kiểm tra bề mặt không trầy xước, dán nilon bảo vệ, bó gọn bằng đai thép để chuẩn bị lên xe cẩu." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-[#111] p-8 rounded-xl border border-white/5"
              >
                <div className="text-5xl font-bold font-serif text-[#C99A5C]/20 shrink-0">{item.step}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Thư viện hình ảnh */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-12 text-center">Hình Ảnh Nhà Máy & Kho Bãi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GALLERY.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden group"
              >
                <Image src={img} alt="Hình ảnh nhà máy" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
