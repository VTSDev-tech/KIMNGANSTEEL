"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Users, ShieldCheck, Factory } from "lucide-react";
import { SiteFooter } from "@/components/antra/SiteFooter";

const STATS = [
  { label: "Năm Kinh Nghiệm", value: "15+" },
  { label: "Dự Án Đã Cấp", value: "2,500+" },
  { label: "Công Suất (Tấn/Tháng)", value: "500+" },
  { label: "Đại Lý Cấp 1", value: "3" },
];

const LEADERSHIP = [
  { name: "Ông Trần Văn B", role: "Giám Đốc Điều Hành", exp: "15 năm kinh nghiệm ngành thép" },
  { name: "Bà Nguyễn Thị C", role: "Trưởng Phòng Kinh Doanh", exp: "10 năm kinh nghiệm bán B2B" },
  { name: "Ông Lê Văn D", role: "Giám Đốc Sản Xuất", exp: "12 năm quản lý nhà máy" },
];

const CERTIFICATES = [
  { name: "Chứng nhận ISO 9001:2015", desc: "Hệ thống Quản lý Chất lượng" },
  { name: "Đại lý Cấp 1 Hoa Sen", desc: "Phân phối chính hãng Tôn Hoa Sen" },
  { name: "Đại lý Cấp 1 Hòa Phát", desc: "Phân phối chính hãng Thép Hòa Phát" },
  { name: "Chứng chỉ CO/CQ", desc: "Đầy đủ cho mọi lô hàng xuất xưởng" },
];

const PROCESS_STEPS = [
  { title: "Kiểm tra nguyên liệu", desc: "Kiểm định phôi thép, cuộn mạ nguyên bản 100% chính hãng trước khi nhập kho." },
  { title: "Gia công chính xác", desc: "Cán sóng, cắt xả băng theo đúng kích thước bản vẽ bằng hệ thống máy CNC hiện đại." },
  { title: "Kiểm định độ bền", desc: "Đo độ dày zem, kiểm tra độ bám dính mạ kẽm/màu trước khi đóng gói." },
  { title: "Bàn giao & Chứng nhận", desc: "Cấp kèm giấy chứng nhận chất lượng (CO/CQ) lúc giao hàng tại công trình." },
];

export default function AboutPage() {
  return (
    <main className="bg-[#080808] text-white min-h-screen pt-24 font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden flex items-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/nha_xuong.png" 
            alt="Kim Ngân Steel Factory" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/60 to-[#080808]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E4DB] to-[#A39A86] mb-6 drop-shadow-md">
              Vững nền móng – Bền công trình
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Kim Ngân Steel tự hào là đối tác cung ứng tôn thép hàng đầu, mang đến những giải pháp vật liệu xây dựng chất lượng, bền bỉ và tối ưu nhất cho mọi dự án.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Năng lực & Con số thực tế */}
      <section className="py-16 bg-[#111] border-y border-white/5">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#C99A5C] mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-400 uppercase tracking-widest font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Câu chuyện & Hành trình */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mb-16 text-center"
          >
            <h2 className="text-sm tracking-[0.2em] text-[#C99A5C] uppercase font-bold mb-4">Câu Chuyện Của Chúng Tôi</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-white">Hành trình kiến tạo sự vững chắc</h3>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#C99A5C] to-transparent mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gray-300 space-y-6 leading-relaxed text-lg"
            >
              <p>
                Được thành lập với tầm nhìn trở thành nhà cung cấp vật liệu xây dựng hàng đầu khu vực, <strong className="text-white font-semibold">Kim Ngân Steel</strong> đã không ngừng nỗ lực vươn lên, khẳng định vị thế vững chắc trong ngành công nghiệp tôn thép. Chúng tôi hiểu rằng, mỗi công trình đều bắt đầu từ một nền móng kiên cố và những vật liệu bền bỉ nhất.
              </p>
              <p>
                Với hơn 15 năm kinh nghiệm, Kim Ngân Steel sở hữu hệ thống nhà máy gia công hiện đại cùng năng lực cung ứng vượt trội lên đến 500 tấn/tháng. Chúng tôi tự hào là đại lý cấp 1 của các thương hiệu danh tiếng như Hoa Sen, Hòa Phát, NS BlueScope, mang đến cho nhà thầu và đại lý những sản phẩm thép mạ kẽm, tôn lạnh màu, xà gồ đạt tiêu chuẩn quốc tế.
              </p>
              <p>
                Không chỉ dừng lại ở việc cung cấp sản phẩm, định hướng của chúng tôi là trở thành đối tác chiến lược, đồng hành cùng khách hàng trong quá trình tối ưu hóa chi phí và đảm bảo tiến độ thi công, góp phần xây dựng nên những công trình bền vững với thời gian.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[450px] rounded-xl overflow-hidden border border-white/10 group"
            >
              <Image 
                src="/kho_logistics.png" 
                alt="Kim Ngan Steel History" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Đội ngũ Lãnh đạo */}
      <section className="py-24 bg-[#111]">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mb-16 text-center"
          >
            <h2 className="text-sm tracking-[0.2em] text-[#C99A5C] uppercase font-bold mb-4">Đội Ngũ Nòng Cốt</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-white">Những người dẫn đường</h3>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#C99A5C] to-transparent mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LEADERSHIP.map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#1a1a1a] border border-white/5 p-8 rounded-xl text-center hover:border-[#C99A5C]/30 transition-colors"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#333] to-[#111] rounded-full mb-6 flex items-center justify-center border border-white/10">
                  <Users className="w-10 h-10 text-[#C99A5C]/60" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{person.name}</h4>
                <p className="text-[#C99A5C] text-sm uppercase tracking-wider font-bold mb-4">{person.role}</p>
                <p className="text-gray-400 text-sm">{person.exp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Chứng nhận & Đối tác */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif text-white mb-8 flex items-center gap-4">
                <ShieldCheck className="text-[#C99A5C] w-8 h-8" />
                Chứng nhận & Giải thưởng
              </h3>
              <div className="space-y-4">
                {CERTIFICATES.map((cert, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 border border-white/5 bg-[#111] rounded-lg hover:border-[#C99A5C]/50 transition-colors">
                    <Award className="w-6 h-6 text-[#C99A5C] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold text-lg">{cert.name}</h4>
                      <p className="text-gray-400 text-sm mt-1">{cert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif text-white mb-8 flex items-center gap-4">
                <Factory className="text-[#C99A5C] w-8 h-8" />
                Quy trình & Cam kết
              </h3>
              <div className="relative border-l-2 border-white/10 pl-8 space-y-10 py-4 ml-4">
                {PROCESS_STEPS.map((step, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[43px] top-1 w-5 h-5 rounded-full bg-[#C99A5C] border-[4px] border-[#080808]" />
                    <h4 className="text-white font-semibold text-lg mb-2">{step.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
