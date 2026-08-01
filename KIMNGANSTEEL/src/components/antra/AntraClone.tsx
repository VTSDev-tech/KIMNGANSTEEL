"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { ContactFormSection } from "./ContactFormSection";

import { HeroSection } from "./HeroSection";
import { IntroScreen } from './IntroScreen';
import { PrecisionStackSection } from "./PrecisionStackSection";
import { BuildStatementSection } from "./BuildStatementSection";
import { MaterialsManifestoSection } from "./MaterialsManifestoSection";
import { MaterialExplorerSection } from "./MaterialExplorerSection";
import { BuildingApplicationSection } from "./BuildingApplicationSection";
import { EditorialScrollFlow } from "./EditorialScrollFlow";

import { FactoryStorySection } from "./FactoryStorySection";
import { CoreValuesSection } from "./CoreValuesSection";
import { PartnersSection } from "./PartnersSection";
import type { ProcessStep, ProjectCard, ServiceCard } from "@/types/antra";

gsap.registerPlugin(ScrollTrigger);

const unlockPageScroll = () => {
  delete document.body.dataset.scrollLock;
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
};

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
  const [gateOpen, setGateOpen] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      unlockPageScroll();

      const hasSeen = sessionStorage.getItem("kn_has_seen_intro");
      if (!hasSeen) {
        setGateOpen(false);
      }

      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.scrollTo(0, 0);
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.clearScrollMemory();
          ScrollTrigger.refresh();
        }
      }, 20);
    }

    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      // 1. Text Reveal Animations for Titles & Statements
      gsap.utils.toArray<HTMLElement>("h1:not(.premium-hero-title), h2, .editorial-statement").forEach((heading) => {
        gsap.fromTo(
          heading,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            scrollTrigger: {
              trigger: heading,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 2. Section Fade & Lift Transitions
      gsap.utils.toArray<HTMLElement>("section:not(.premium-hero):not(.kn-hero):not(.build-statement-section):not(.precision-stack-section)").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.8 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
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

  const handleIntroComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("kn_has_seen_intro", "true");
      unlockPageScroll();
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    }
    setGateOpen(true);
  };

  return (
    <>
      {!gateOpen && <IntroScreen onComplete={handleIntroComplete} />}
      <div ref={rootRef} className="antra-theme min-h-screen bg-[#ffffff] text-[#064e3b] selection:bg-[#064e3b] selection:text-[#ffffff]">
        <main className="relative z-10">
        <HeroSection />
        <PrecisionStackSection />
        <BuildStatementSection />

        <MaterialsManifestoSection />
        <MaterialExplorerSection />
        <BuildingApplicationSection />

        <FactoryStorySection />
        <PartnersSection />
        <ContactFormSection />
      </main>
      </div>
    </>
  );
}
