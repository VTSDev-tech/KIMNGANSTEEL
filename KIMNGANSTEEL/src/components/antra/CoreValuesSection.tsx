"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Users, TrendingUp, Lightbulb } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CORE_VALUES = [
  {
    title: "Chất Lượng",
    icon: ShieldCheck,
    desc: "Nhận thấy chất lượng và uy tín là yếu tố quyết định sự thỏa mãn của khách hàng là chìa khóa của thành công, chúng tôi xem việc đảm bảo chất lượng là mục tiêu chiến lược trong sự nghiệp phát triển của mình.",
  },
  {
    title: "Chuyên Nghiệp",
    icon: Users,
    desc: "Được vận hành bởi đội ngũ sản xuất và kinh doanh chuyên nghiệp, công nhân lành nghề, luôn nhiệt tình giải đáp thắc mắc với phương châm mang đến sự tin tưởng và hài lòng nhất.",
  },
  {
    title: "Nỗ Lực",
    icon: TrendingUp,
    desc: "Chúng tôi tin tưởng rằng với tập thể đoàn kết, vững mạnh cùng sự ủng hộ của Quý khách hàng, chúng tôi chắc chắn sẽ gặt hái được nhiều thành công hơn nữa trong tương lai.",
  },
  {
    title: "Sáng Tạo",
    icon: Lightbulb,
    desc: "Không ngừng tìm tòi, phát triển, cải tiến, nâng cao chất lượng sản phẩm cũng như đổi mới năng lực sản xuất để mang lại những giá trị tiện ích thiết thực nhất.",
  },
];

export function CoreValuesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".kn-value-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-28 px-6 md:px-14 bg-[#F7F7F4] border-b border-[#1A1918]/10 text-[#1A1918]">
      <div className="max-w-[1600px] mx-auto space-y-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C28E5C] uppercase block mb-4">
              CORE VALUES
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold uppercase tracking-tight leading-[1.05] max-w-2xl">
              CHẤT LƯỢNG THƯỚC ĐO HÀNG ĐẦU CHO SỰ PHÁT TRIỂN
            </h2>
          </div>
          <p className="text-sm text-[#524D4A] max-w-md leading-relaxed font-sans border-l border-[#C28E5C]/30 pl-6">
            Bốn nền tảng cốt lõi định hình văn hóa và phương châm hoạt động của Kim Ngân Steel, hướng tới sự đồng hành bền vững cùng đối tác.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {CORE_VALUES.map((val, idx) => (
            <div 
              key={idx} 
              className="kn-value-card group p-8 bg-white border border-[#1A1918]/10 hover:border-[#C28E5C] transition-colors duration-300 flex flex-col justify-between space-y-8 min-h-[320px]"
            >
              <div className="w-14 h-14 bg-[#ECE8DE] rounded-none flex items-center justify-center text-[#1A1918] group-hover:bg-[#C28E5C] group-hover:text-white transition-colors duration-300">
                <val.icon strokeWidth={1.5} size={28} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  {val.title}
                </h3>
                <p className="text-xs text-[#524D4A] leading-relaxed font-sans text-justify">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
