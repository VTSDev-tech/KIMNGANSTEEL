"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SiteFooter } from "@/components/antra/SiteFooter";
import { MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: "Nhà xưởng KCN Sóng Thần 2",
    client: "Công ty Cổ phần Bao Bì X",
    volume: "5,000m² Tôn Lạnh Màu 0.45",
    image: "/nha_xuong.png",
    location: "Dĩ An, Bình Dương"
  },
  {
    name: "Dự án Nhà Thép Tiền Chế",
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
    name: "Kho bãi Logistics",
    client: "Công ty Vận chuyển S",
    volume: "Trọn gói Thép & Tôn mái",
    image: "/kho_logistics.png",
    location: "Bình Tân, TP.HCM"
  }
];

export default function ProjectsPage() {
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
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".antra-hero-kicker", { y: 20, opacity: 0, duration: 0.8 })
        .from(".antra-h1", { y: 40, opacity: 0, duration: 1 }, "-=0.5")
        .from(".antra-hero-text", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

      gsap.utils.toArray<HTMLElement>(".antra-section").forEach((section) => {
        gsap.from(section, {
          y: 80, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".antra-stagger-grid").forEach((grid) => {
        const items = grid.querySelectorAll(".antra-stagger-item");
        gsap.fromTo(items,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: grid, start: "top 90%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="antra-theme min-h-screen bg-[#080808] selection:bg-[#B8AFA3] selection:text-[#080808] pt-24 font-sans">
      
      {/* 1. Hero Section (Light) */}
      <section className="relative py-20 md:py-32 overflow-hidden flex items-center justify-center min-h-[50vh] bg-[#F2F0EC]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(156,138,115,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(156,138,115,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] z-0"></div>
        <div className="absolute bottom-10 -left-20 text-[6rem] lg:text-[12rem] font-bold text-[#e5e1da] opacity-30 pointer-events-none whitespace-nowrap select-none z-0">
          PROJECTS
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
          <p className="antra-hero-kicker text-[10px] font-bold tracking-[0.2em] uppercase text-[#9C8A73] mb-6">Dự Án</p>
          <h1 className="antra-h1 text-3xl md:text-5xl lg:text-7xl mb-6 uppercase font-light leading-[1.2] text-[#151413]">
            <span className="block">Công trình</span>
            <span className="block italic text-[#9C8A73]">Tiêu biểu</span>
          </h1>
          <p className="antra-hero-text text-[#555] text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Hàng ngàn công trình vững chãi trên khắp cả nước được xây dựng từ nguồn vật liệu do Kim Ngân Steel cung cấp.
          </p>
        </div>
      </section>

      {/* 2. Lưới Dự án (Dark) */}
      <section className="antra-section py-24 bg-[#080808]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl antra-stagger-grid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {PROJECTS.map((project, i) => (
              <div key={i} className="antra-stagger-item group cursor-pointer flex flex-col">
                <div className="relative h-[300px] md:h-[450px] w-full bg-white p-3 shadow-sm mb-8 transition-transform duration-700 group-hover:-translate-y-2">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image src={project.image} alt={project.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#9C8A73] text-[10px] uppercase font-bold tracking-[0.15em] mb-4">
                  <MapPin className="w-3 h-3" /> {project.location}
                </div>
                <h3 className="text-[1.5rem] font-light uppercase tracking-tight text-white mb-4 group-hover:text-[#9C8A73] transition-colors">{project.name}</h3>
                <div className="flex flex-col gap-2 text-[#666] text-[13px] font-light">
                  <span className="border-b border-[#222] pb-2"><strong>CĐT:</strong> {project.client}</span>
                  <span className="pt-1"><strong>Khối lượng:</strong> {project.volume}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Đối tác (Light Band) */}
      <section className="antra-section py-20 bg-[#F2F0EC] text-[#151413] border-y border-[#e5e1da] text-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-[10px] tracking-[0.2em] text-[#9C8A73] uppercase font-bold mb-12">Đối Tác & Thương Hiệu Phân Phối</h2>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div className="text-2xl lg:text-3xl font-light uppercase tracking-tight">HOA SEN GROUP</div>
            <div className="text-2xl lg:text-3xl font-light uppercase tracking-tight">HÒA PHÁT</div>
            <div className="text-2xl lg:text-3xl font-light uppercase tracking-tight">NS BLUESCOPE</div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
