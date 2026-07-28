"use client";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  specs: string[];
};

const products: Product[] = [
  {
    id: "ton-lanh-mau",
    name: "Tôn Lạnh & Tôn Màu",
    description: "Độ bền cao, chống ăn mòn vượt trội, đa dạng màu sắc và biên dạng sóng (5 sóng, 9 sóng, 11 sóng, ngói).",
    image: "/ton_lanh_ton_mau1.svg",
    specs: ["Độ dày: 0.25 - 0.50mm", "Thương hiệu: Hoa Sen, Đông Á, Nam Kim", "Bảo hành: Lên đến 20 năm"],
  },
  {
    id: "thep-hop",
    name: "Thép Hộp Mạ Kẽm",
    description: "Ứng dụng đa dạng trong xây dựng dân dụng, khung xưởng, cơ khí. Bề mặt sáng bóng, chịu lực tốt.",
    image: "/thep_hop_ma_kem.svg",
    specs: ["Quy cách: Đa dạng (Vuông, Chữ nhật)", "Độ dày: 0.7 - 3.0mm", "Thương hiệu: Hòa Phát, Hoa Sen"],
  },
  {
    id: "xa-go",
    name: "Xà Gồ C / Z",
    description: "Khả năng chịu lực võng tốt, chuyên dụng cho kết cấu mái nhà xưởng, nhà tiền chế khẩu độ lớn.",
    image: "/xa_go_c_z.svg",
    specs: ["Độ dày: 1.5 - 3.0mm", "Bản bụng: 80 - 300mm", "Bề mặt: Mạ kẽm cường độ cao"],
  },
  {
    id: "thep-ong",
    name: "Thép Ống & Thép Hình",
    description: "Thép ống đen, thép ống mạ kẽm và các loại thép hình U, I, V, H chuyên phục vụ công nghiệp nặng.",
    image: "/thep_ong_thep_hinh.svg",
    specs: ["Quy cách: Ø21 - Ø219", "Tiêu chuẩn: ASTM, JIS", "Sẵn hàng tại kho số lượng lớn"],
  },
  {
    id: "ton-can-song",
    name: "Tôn Cán Sóng",
    description: "Nội dung đang được cập nhật...",
    image: "/ton_can_song.svg",
    specs: ["Thông số 1", "Thông số 2"],
  },
  {
    id: "thep-cuon",
    name: "Thép Cuộn Mạ Kẽm",
    description: "Nội dung đang được cập nhật...",
    image: "/thep_cuon_ma_kem.svg",
    specs: ["Thông số 1", "Thông số 2"],
  },
  {
    id: "thep-tam",
    name: "Thép Tấm Đen",
    description: "Nội dung đang được cập nhật...",
    image: "/thep_tam_den.svg",
    specs: ["Thông số 1", "Thông số 2"],
  },
  {
    id: "luoi-thep",
    name: "Lưới Thép Công Nghiệp",
    description: "Nội dung đang được cập nhật...",
    image: "/luoi_thep_cong_nghiep.svg",
    specs: ["Thông số 1", "Thông số 2"],
  }
];

export function ProductSection() {
  const [activeMaterial, setActiveMaterial] = useState<number>(0);

  return (
    <section id="products" className="py-32 bg-[#ECE8DE] border-b border-[#1A1918]/10 text-[#1A1918]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <span className="editorial-subhead text-[#6B655F] block mb-4">
              EDITORIAL MATERIAL INDEX
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light uppercase tracking-tight text-[#1A1918]">
              VẬT LIỆU XÂY DỰNG CAO CẤP
            </h2>
          </div>
          <a
            href="/san-pham"
            className="editorial-link text-xs uppercase tracking-[0.25em] text-[#1A1918] font-mono pb-1 self-start md:self-auto"
          >
            Tất Cả Quy Cách ↗
          </a>
        </div>

        {/* Editorial Index List */}
        <div className="flex flex-col border-t border-[#1A1918]/10">
          {products.slice(0, 4).map((prod, index) => {
            const isHovered = activeMaterial === index;
            return (
              <div
                key={prod.id}
                data-cursor="MATERIAL"
                onMouseEnter={() => setActiveMaterial(index)}
                className="group relative py-10 md:py-14 border-b border-[#1A1918]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer transition-colors duration-500 hover:bg-black/[0.03] px-2 md:px-6"
              >
                <div className="flex items-baseline gap-6 md:gap-12">
                  <span className="text-xs font-mono text-[#6B655F]">0{index + 1}</span>
                  <div>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-light uppercase tracking-tight text-[#1A1918] group-hover:text-[#8E857B] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs md:text-sm text-[#524D4A] font-light mt-2 max-w-xl">
                      {prod.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8 self-end lg:self-auto">
                  <div className="hidden sm:flex flex-col items-end text-xs font-mono text-[#6B655F]">
                    {prod.specs.slice(0, 2).map((spec, i) => (
                      <span key={i}>{spec}</span>
                    ))}
                  </div>
                  <span className="text-lg text-[#1A1918] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    ↗
                  </span>
                </div>

                {/* Quiet Floating Material Preview Photo */}
                <div 
                  className={`hidden lg:block absolute right-48 top-1/2 -translate-y-1/2 w-64 h-40 pointer-events-none overflow-hidden border border-[#1A1918]/15 bg-white shadow-xl transition-all duration-700 ${
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover opacity-95"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
