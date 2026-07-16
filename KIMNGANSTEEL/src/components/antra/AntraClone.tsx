"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { AboutSection } from "./AboutSection";
import { BlogSection } from "./BlogSection";
import { SiteFooter } from "./SiteFooter";
import { ContactFormSection } from "./ContactFormSection";
import { FloatingContact } from "./FloatingContact";
import { PartnerSection } from "./PartnerSection";

import { HeroSection } from "./HeroSection";
import { Factory3D } from "./Factory3D";
import { ProductSection } from "./ProductSection";
import { SteelCoilShowcase } from "./SteelCoilShowcase";
import { ExpertiseSection, StatsBand } from "./StatsExpertise";
import { PortfolioSection } from "./PortfolioSection";
import { ProcessSection } from "./ProcessSection";
import { ServicesSection } from "./ServicesSection";
import type { ProcessStep, ProjectCard, ServiceCard } from "@/types/antra";

gsap.registerPlugin(ScrollTrigger);

const services: ServiceCard[] = [
  { title: "Nhà Máy Cán Tôn Riêng", description: "Chủ động trong quá trình gia công, kiểm soát chất lượng và đáp ứng linh hoạt các yêu cầu về chiều dài, độ dày và quy cách sản phẩm.", icon: "⌁" },
  { title: "Giá Tận Gốc", description: "Sản phẩm được cung cấp trực tiếp từ nhà máy và các thương hiệu uy tín, hạn chế chi phí trung gian, tối ưu ngân sách cho khách hàng.", icon: "◌" },
  { title: "Giao Hàng Nhanh 24h", description: "Hệ thống kho bãi và phương tiện vận chuyển chủ động, hỗ trợ giao hàng nhanh đến công trình tại TP.HCM và các tỉnh lân cận.", icon: "◇" },
  { title: "Tư Vấn Đúng Nhu Cầu", description: "Đội ngũ kinh doanh hỗ trợ lựa chọn loại vật liệu, độ dày và quy cách phù hợp với từng hạng mục thi công.", icon: "≋" },
];

const projects: ProjectCard[] = [
  { title: "Nhà Xưởng Sản Xuất", category: "Công nghiệp", image: "/nha_xuong.png" },
  { title: "Kho Logistics", category: "Thương mại", image: "/kho_logistics.png" },
  { title: "Biệt Thự Tân Cổ Điển", category: "Dân dụng", image: "/neoclassical_villa.png" },
  { title: "Nhà Thép Tiền Chế", category: "Công nghiệp", image: "/nha_thep_tien_che.png" },
];

const steps: ProcessStep[] = [
  { title: "Tiếp nhận yêu cầu", description: "Xác nhận loại sản phẩm, quy cách, số lượng, thời gian và địa điểm giao hàng." },
  { title: "Chuẩn bị nguyên liệu", description: "Lựa chọn nguyên liệu phù hợp với yêu cầu kỹ thuật và mục đích sử dụng của công trình." },
  { title: "Gia công cán tôn", description: "Thiết lập máy móc và tiến hành gia công theo kích thước khách hàng yêu cầu." },
  { title: "Kiểm tra chất lượng", description: "Kiểm tra quy cách, số lượng và tình trạng bề mặt trước khi đóng gói." },
  { title: "Giao hàng công trình", description: "Sắp xếp phương tiện và giao hàng theo đúng thời gian hai bên đã thống nhất." },
];

export function AntraClone() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Prevent browser from restoring scroll position on reload
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      // Force scroll to top on mount
      window.scrollTo(0, 0);
    }

    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".antra-hero-kicker", { y: 18, opacity: 0, duration: 0.7 })
        .from(".antra-title-mask > span", { yPercent: 112, duration: 0.95, stagger: 0.045 }, "-=0.45")
        .from(".antra-hero-text, .antra-circle-link", { y: 24, opacity: 0, duration: 0.75, stagger: 0.08 }, "-=0.55")
        .from(".antra-hero-stat, .antra-hero-card", { y: 40, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.7");

      gsap.to(".antra-scroll", {
        y: 10,
        duration: 1.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".antra-hero-stat", {
        y: -10,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.utils.toArray<HTMLElement>(".antra-section, .antra-contact-panel, .antra-contact-form-section").forEach((section) => {
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

      gsap.utils.toArray<HTMLElement>(".antra-service-card, .antra-project-card, .antra-blog-card").forEach((card) => {
        gsap.fromTo(card, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.fromTo(".process-inner", 
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".antra-process-list",
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(".antra-stats-band div", 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".antra-stats-band",
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".antra-skill").forEach((skill) => {
        gsap.fromTo(
          skill,
          { "--skill-progress": "0%" },
          {
            "--skill-progress": skill.style.getPropertyValue("--skill") || "70%",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skill,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, root);

    const backTop = root.querySelector<HTMLElement>(".antra-back-top");
    const onScroll = () => {
      backTop?.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.55);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      context.revert();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={rootRef} className="antra-theme min-h-screen bg-[#080808] selection:bg-[#B8AFA3] selection:text-[#080808]">
      <main>
        <HeroSection />
        <PartnerSection />
        <AboutSection />
        <StatsBand />
        <ServicesSection services={services} />
        <Factory3D />
        <ProductSection />
        <SteelCoilShowcase />
        <ExpertiseSection />
        <PortfolioSection projects={projects} />
        <ProcessSection steps={steps} />
        <BlogSection />
        <ContactFormSection />
        <SiteFooter />
      </main>
      <a className="antra-back-top" href="#top" aria-label="Back to top">↑</a>
      <FloatingContact />
    </div>
  );
}
