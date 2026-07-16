"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Award, Users, ShieldCheck, Factory } from "lucide-react";
import { SiteFooter } from "@/components/antra/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Năm Kinh Nghiệm", value: "15+" },
  { label: "Dự Án Đã Cấp", value: "2500+" },
  { label: "Công Suất (Tấn)", value: "500+" },
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
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      // Hero Animation
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".antra-hero-kicker", { y: 20, opacity: 0, duration: 0.8 })
        .from(".antra-h1", { y: 40, opacity: 0, duration: 1 }, "-=0.5")
        .from(".antra-hero-text", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

      // Scroll Sections Animation
      gsap.utils.toArray<HTMLElement>(".antra-section").forEach((section) => {
        gsap.from(section, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Cards Stagger Animation
      gsap.utils.toArray<HTMLElement>(".antra-card-grid").forEach((grid) => {
        const cards = grid.querySelectorAll(".antra-card-item");
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      
      // Timeline items Stagger
      gsap.utils.toArray<HTMLElement>(".antra-timeline-grid").forEach((grid) => {
        const items = grid.querySelectorAll(".antra-timeline-item");
        gsap.fromTo(items,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

    }, root);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="antra-theme min-h-screen bg-[#080808] selection:bg-[#B8AFA3] selection:text-[#080808] pt-24 font-sans">
      
      {/* 1. Hero Section (Dark) */}
      <section className="relative py-20 md:py-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/nha_xuong.png" alt="Kim Ngân Steel Factory" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/60 to-[#080808]" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-5xl text-center flex flex-col items-center">
          <p className="antra-hero-kicker text-[10px] font-bold tracking-[0.2em] uppercase text-[#C99A5C] mb-6">Giới Thiệu</p>
          <h1 className="antra-h1 text-3xl md:text-5xl lg:text-7xl mb-6 uppercase font-light leading-[1.2] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E4DB] to-[#A39A86]">
            <span className="block">Vững nền móng</span>
            <span className="block italic text-[#C99A5C]">Bền công trình</span>
          </h1>
          <p className="antra-hero-text text-[#888] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Kim Ngân Steel tự hào là đối tác cung ứng tôn thép hàng đầu, mang đến những giải pháp vật liệu chất lượng, bền bỉ và tối ưu nhất cho mọi dự án.
          </p>
        </div>
      </section>

      {/* 2. Câu chuyện & Hành trình (Light Section - like AboutSection) */}
      <section className="antra-section relative py-24 px-6 md:px-12 lg:px-24 bg-[#F2F0EC] overflow-hidden text-[#151413]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(156,138,115,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(156,138,115,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] z-0"></div>
        <div className="absolute bottom-10 -left-20 text-[6rem] lg:text-[12rem] font-bold text-[#e5e1da] opacity-30 pointer-events-none whitespace-nowrap select-none z-0">
          HISTORY
        </div>
        <div className="container mx-auto max-w-6xl relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="w-full lg:w-1/2 flex flex-col relative">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9C8A73] mb-6">Câu Chuyện Của Chúng Tôi</p>
            <h2 className="text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] font-light leading-[1.2] uppercase tracking-tight mb-8">
              Hành trình kiến tạo<br/><span className="text-[#9C8A73]">sự vững chắc</span>
            </h2>
            <div className="text-[#555] text-[15px] leading-relaxed font-light text-justify mb-8 space-y-4">
              <p>Được thành lập với tầm nhìn trở thành nhà cung cấp vật liệu xây dựng hàng đầu khu vực, Kim Ngân Steel đã không ngừng nỗ lực vươn lên, khẳng định vị thế vững chắc trong ngành công nghiệp tôn thép.</p>
              <p>Với hơn 15 năm kinh nghiệm, chúng tôi tự hào là đại lý cấp 1 của Hoa Sen, Hòa Phát, NS BlueScope, mang đến cho nhà thầu và đại lý những sản phẩm thép mạ kẽm, tôn lạnh màu đạt tiêu chuẩn quốc tế.</p>
            </div>
            <div className="self-start">
              <div className="text-4xl lg:text-5xl mb-2 opacity-90 -rotate-2" style={{ fontFamily: "var(--font-dancing-script), cursive" }}>Kim Ngân</div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            <div className="absolute -top-8 -right-8 w-[80%] h-[80%] max-w-[300px] max-h-[300px] border border-[#d8d4ce] bg-transparent z-0 hidden md:block"></div>
            <div className="relative z-10 w-full aspect-[16/10] bg-white p-3 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
              <Image src="/kho_logistics.png" alt="Lịch sử Kim Ngân Steel" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Năng lực & Con số thực tế (Dark Band) */}
      <section className="antra-section py-16 bg-[#111] border-y border-white/5">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl antra-card-grid">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <div key={i} className="antra-card-item flex flex-col items-center justify-center py-6">
                <div className="text-4xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E4DB] to-[#A39A86] mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-[11px] text-[#9C8A73] uppercase tracking-[0.2em] font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Đội ngũ Lãnh đạo (Dark Section) */}
      <section className="antra-section py-24 bg-[#080808]">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col items-center mb-16 text-center">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9C8A73] mb-6">Đội Ngũ Nòng Cốt</p>
            <h2 className="text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] font-light leading-[1.2] uppercase tracking-tight text-white">
              Những người dẫn đường
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 antra-card-grid">
            {LEADERSHIP.map((person, i) => (
              <div key={i} className="antra-card-item bg-[#111] border border-white/5 p-8 rounded-none flex flex-col items-center text-center hover:border-[#9C8A73]/40 transition-colors">
                <div className="w-20 h-20 bg-[#1a1a1a] rounded-full mb-6 flex items-center justify-center border border-white/10">
                  <Users className="w-8 h-8 text-[#9C8A73]" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{person.name}</h4>
                <p className="text-[#9C8A73] text-[10px] uppercase tracking-[0.1em] font-bold mb-4">{person.role}</p>
                <p className="text-[#666] text-sm font-light">{person.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Chứng nhận & Đối tác (Light Section) */}
      <section className="antra-section py-24 relative bg-[#F2F0EC] text-[#151413]">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="antra-card-grid">
              <h3 className="text-2xl font-light uppercase tracking-tight mb-8 flex items-center gap-4">
                <ShieldCheck className="text-[#9C8A73] w-6 h-6" />
                Chứng nhận & Giải thưởng
              </h3>
              <div className="space-y-4">
                {CERTIFICATES.map((cert, i) => (
                  <div key={i} className="antra-card-item flex items-start gap-4 p-5 bg-white border border-[#d8d4ce] shadow-sm">
                    <Award className="w-6 h-6 text-[#9C8A73] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg">{cert.name}</h4>
                      <p className="text-[#666] text-[13px] mt-1 font-light">{cert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="antra-timeline-grid">
              <h3 className="text-2xl font-light uppercase tracking-tight mb-8 flex items-center gap-4">
                <Factory className="text-[#9C8A73] w-6 h-6" />
                Quy trình & Cam kết
              </h3>
              <div className="relative border-l border-[#d8d4ce] pl-8 space-y-10 py-4 ml-4">
                {PROCESS_STEPS.map((step, i) => (
                  <div key={i} className="antra-timeline-item relative">
                    <div className="absolute -left-[37px] top-1 w-3 h-3 rounded-full bg-[#9C8A73] border-[3px] border-[#F2F0EC]" />
                    <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                    <p className="text-[#666] text-[13px] leading-relaxed font-light">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
