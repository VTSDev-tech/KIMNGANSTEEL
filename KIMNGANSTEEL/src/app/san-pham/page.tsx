"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SiteFooter } from "@/components/antra/SiteFooter";
import { AlertCircle, Truck, Percent, PhoneCall } from "lucide-react";

const PRODUCTS = [
  {
    category: "Tôn Lợp & Cán Sóng",
    items: [
      { name: "Tôn Lạnh", image: "/ton_lanh_ton_mau.svg", desc: "Tôn chống nóng cao cấp, mạ nhôm kẽm siêu bền." },
      { name: "Tôn Màu", image: "/ton_lanh_ton_mau1.svg", desc: "Đa dạng màu sắc, cán sóng vuông, sóng ngói thẩm mỹ." },
      { name: "Tôn Cán Sóng", image: "/ton_can_song.svg", desc: "Cán sóng 5, 9, 11 sóng phục vụ lợp mái nhà xưởng." }
    ]
  },
  {
    category: "Thép Xây Dựng",
    items: [
      { name: "Thép Cuộn Mạ Kẽm", image: "/thep_cuon_ma_kem.svg", desc: "Nguyên liệu phôi thép cuộn chất lượng cao." },
      { name: "Thép Hộp Mạ Kẽm", image: "/thep_hop_ma_kem.svg", desc: "Thép hộp vuông, hộp chữ nhật chống rỉ sét." },
      { name: "Thép Ống & Thép Hình", image: "/thep_ong_thep_hinh.svg", desc: "Thép ống đúc, ống hàn và các loại thép hình I, U, V, H." },
      { name: "Thép Tấm Đen", image: "/thep_tam_den.svg", desc: "Thép tấm chịu lực ứng dụng trong cơ khí công nghiệp." },
      { name: "Xà Gồ C/Z", image: "/xa_go_c_z.svg", desc: "Xà gồ mạ kẽm cường độ cao đục lỗ theo yêu cầu." },
    ]
  }
];

export default function ProductsPage() {
  return (
    <main className="bg-[#080808] text-white min-h-screen pt-24 font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative py-20 overflow-hidden flex items-center justify-center min-h-[40vh]">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/kho_logistics.png" alt="Kho bãi Kim Ngân Steel" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/60 to-[#080808]" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E4DB] to-[#A39A86] mb-4">
              Danh Mục Sản Phẩm
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Đa dạng chủng loại, quy cách chuẩn quốc tế. Cung ứng số lượng lớn cho mọi dự án công trình.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Cảnh báo Giá */}
      <section className="py-8 bg-[#111] border-y border-[#C99A5C]/20">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[#C99A5C]">
            <AlertCircle className="w-8 h-8 shrink-0" />
            <p className="text-sm md:text-base font-semibold">
              GIÁ CẬP NHẬT THEO TUẦN THEO BIẾN ĐỘNG THỊ TRƯỜNG THÉP.<br/>
              <span className="text-gray-400 font-normal">Để nhận bảng giá mới nhất kèm chiết khấu tốt nhất, vui lòng liên hệ trực tiếp.</span>
            </p>
          </div>
          <a href="/lien-he" className="flex items-center gap-2 bg-[#C99A5C] text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-colors shrink-0">
            <PhoneCall className="w-5 h-5" />
            Nhận Báo Giá Ngay
          </a>
        </div>
      </section>

      {/* 3. Lưới Sản Phẩm */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-24">
          {PRODUCTS.map((category, idx) => (
            <div key={idx}>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-serif text-white mb-10 pb-4 border-b border-white/10 flex items-center"
              >
                <div className="w-2 h-8 bg-[#C99A5C] mr-4" />
                {category.category}
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#111] rounded-xl overflow-hidden border border-white/5 hover:border-[#C99A5C]/40 transition-colors group"
                  >
                    <div className="relative h-64 w-full bg-[#1a1a1a] p-8 flex items-center justify-center">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Chính sách Bán hàng */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-center text-2xl font-serif text-[#C99A5C] mb-10">Chính Sách Bán Hàng Dành Cho Đại Lý & Nhà Thầu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4 bg-[#111] p-6 rounded-lg border border-white/5">
              <Percent className="w-10 h-10 text-[#C99A5C] shrink-0" />
              <div>
                <h4 className="font-bold text-lg text-white mb-1">Chiết khấu hấp dẫn</h4>
                <p className="text-gray-400 text-sm">Giảm ngay 3–5% cho các đơn hàng khối lượng lớn trên 10 tấn. Chính sách công nợ linh hoạt cho đại lý thân thiết.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-[#111] p-6 rounded-lg border border-white/5">
              <Truck className="w-10 h-10 text-[#C99A5C] shrink-0" />
              <div>
                <h4 className="font-bold text-lg text-white mb-1">Giao hàng miễn phí</h4>
                <p className="text-gray-400 text-sm">Hỗ trợ vận chuyển tận công trình miễn phí khu vực nội tỉnh. Giao đúng tiến độ, đổi trả 7 ngày nếu lỗi nhà sản xuất.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
