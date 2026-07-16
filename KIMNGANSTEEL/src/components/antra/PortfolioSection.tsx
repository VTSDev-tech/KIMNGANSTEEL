"use client";

import { ArrowUpRight } from "lucide-react";
import type { ProjectCard } from "@/types/antra";
import { useRef, useState } from "react";
import gsap from "gsap";

type PortfolioSectionProps = {
  projects: ProjectCard[];
};

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Sử dụng useRef cho các biến thay đổi liên tục để KHÔNG kích hoạt React re-render gây giật lag
  const dragData = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    velocity: 0,
    lastX: 0,
    lastTime: 0
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    dragData.current.isDown = true;
    dragData.current.startX = e.pageX - scrollRef.current.offsetLeft;
    dragData.current.scrollLeft = scrollRef.current.scrollLeft;
    dragData.current.lastX = e.pageX;
    dragData.current.lastTime = Date.now();
    dragData.current.velocity = 0;
    
    setIsDragging(false);
    gsap.killTweensOf(scrollRef.current);
  };

  const handleMouseUpOrLeave = () => {
    dragData.current.isDown = false;
    
    if (isDragging && scrollRef.current) {
      const { velocity } = dragData.current;
      const momentum = velocity * 400; 
      gsap.to(scrollRef.current, {
        scrollLeft: scrollRef.current.scrollLeft - momentum,
        duration: Math.min(Math.abs(velocity), 1.5) + 0.5,
        ease: "power3.out",
        overwrite: "auto"
      });
      setTimeout(() => setIsDragging(false), 50);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragData.current.isDown || !scrollRef.current) return;
    e.preventDefault();
    
    // Chỉ set state 1 lần duy nhất khi bắt đầu kéo
    if (!isDragging) setIsDragging(true);
    
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - dragData.current.startX) * 1.5;
    
    // Cập nhật DOM trực tiếp không qua React render
    scrollRef.current.scrollLeft = dragData.current.scrollLeft - walk;

    const now = Date.now();
    const dt = now - dragData.current.lastTime;
    if (dt > 0) {
      dragData.current.velocity = (e.pageX - dragData.current.lastX) / dt;
      dragData.current.lastX = e.pageX;
      dragData.current.lastTime = now;
    }
  };

  return (
    <section id="projects" className="antra-section antra-projects">
      <div className="antra-split-heading">
        <div><p className="antra-kicker">DỰ ÁN TIÊU BIỂU</p><h2>Vật Liệu Đồng Hành Cùng Nhiều <span>Công Trình.</span></h2></div>
        <p className="text-justify">Sản phẩm của Kim Ngân được cung cấp cho nhiều hạng mục như nhà dân dụng, nhà kho, nhà xưởng sản xuất, mái che, công trình cơ khí và các dự án xây dựng công nghiệp.</p>
      </div>
      <div 
        className="antra-project-grid" 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
      >
        {projects.map((project) => (
          <article 
            className="antra-project-card select-none" 
            key={project.title}
            onClick={(e) => { if (isDragging) e.preventDefault(); }}
          >
            <div style={{ backgroundImage: `url(${project.image})`, pointerEvents: isDragging ? 'none' : 'auto' }} />
            <span className="pointer-events-none">{project.category}</span>
            <h3 className="pointer-events-none">{project.title}</h3>
            <a href="#contact" aria-label={`Start a project like ${project.title}`} className={isDragging ? 'pointer-events-none' : ''}>
              <ArrowUpRight size={18} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
