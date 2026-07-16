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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    // Cuộn vùng chứa sang phải một đoạn bằng 1/4 chiều rộng của thẻ đầu tiên
    // để tạo hiệu ứng thẻ đầu tiên bị cắt mất 1/4 ở mép trái.
    if (scrollRef.current && scrollRef.current.firstChild) {
      const firstCard = scrollRef.current.firstChild as HTMLElement;
      scrollRef.current.scrollLeft = firstCard.offsetWidth / 4;
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="products" className="py-24 bg-[#F2F0EC] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#7a7570] mb-4">SẢN PHẨM</p>
            <h2 className="text-[2rem] md:text-[2.6rem] lg:text-[3rem] font-light uppercase tracking-tight leading-[1.2] text-[#2a2925]">
              VẬT LIỆU XÂY DỰNG CHÍNH HÃNG
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full select-none">
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex overflow-x-auto hide-scrollbar pb-16 items-start gap-4 w-full pr-4 md:pr-8 transition-all ${
            isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
          }`}
        >
          {products.map((product, index) => (
            <article 
              key={product.id} 
              className={`flex-none w-[75vw] sm:w-[45vw] md:w-[35vw] lg:w-[22vw] snap-center relative aspect-[3/4] overflow-hidden group cursor-pointer bg-black ${
                index % 2 !== 0 ? 'mt-6 lg:mt-10' : ''
              }`}
            >
              <img 
                src={product.image} 
                alt={product.name}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover object-[center_top] scale-[1.05] transition-transform duration-1000 group-hover:scale-110 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex flex-col justify-end h-full">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-xl lg:text-2xl font-light uppercase tracking-wider leading-tight mb-4">
                    {product.name}
                  </h3>
                  
                  <div className="opacity-0 h-0 overflow-hidden group-hover:opacity-100 group-hover:h-auto transition-all duration-500 delay-100">
                    <ul className="space-y-2 mb-4">
                      {product.specs.map((spec, i) => (
                        <li key={i} className="flex items-center text-[11px] text-white/70 tracking-wide uppercase">
                          <span className="w-1 h-1 bg-[#C99A5C] rounded-full mr-2" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C99A5C]">
                      Chi tiết <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
