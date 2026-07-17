"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SiteFooter } from "@/components/antra/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

const BLOG_POSTS = [
  {
    title: "Cách chọn độ dày tôn lợp phù hợp cho nhà xưởng công nghiệp",
    category: "Kiến Thức",
    date: "12",
    month: "07",
    year: "2026",
    readTime: "5 phút đọc",
    excerpt: "Độ dày tôn lợp ảnh hưởng trực tiếp đến tuổi thọ công trình và chi phí bảo trì về lâu dài. Hướng dẫn chọn đúng theo từng hạng mục.",
    image: "/nha_xuong.png",
    featured: true,
  },
  {
    title: "Kinh nghiệm thi công mái tôn chống dột hiệu quả mùa mưa",
    category: "Thi Công",
    date: "05",
    month: "07",
    year: "2026",
    readTime: "4 phút đọc",
    excerpt: "Những lỗi phổ biến khi lợp tôn và cách khắc phục để đảm bảo mái không thấm dột trong mùa mưa bão.",
    image: "/nha_thep_tien_che.png",
  },
  {
    title: "Phân biệt Tôn Lạnh và Tôn Mạ Kẽm: Loại nào tốt hơn?",
    category: "Kiến Thức",
    date: "28",
    month: "06",
    year: "2026",
    readTime: "4 phút đọc",
    excerpt: "So sánh toàn diện hai dòng vật liệu phổ biến nhất hiện nay về độ bền, chi phí và phạm vi ứng dụng trong xây dựng.",
    image: "/cong_trinh_dan_dung.png",
  },
  {
    title: "Tiêu chuẩn ASTM và JIS trong thép xây dựng là gì?",
    category: "Tiêu Chuẩn",
    date: "15",
    month: "06",
    year: "2026",
    readTime: "6 phút đọc",
    excerpt: "Tìm hiểu các tiêu chuẩn quốc tế ASTM A653, JIS G3302 và cách đọc chứng chỉ kiểm tra chất lượng thép.",
    image: "/3d_steel_model.png",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Kiến Thức": "#9CA3AF",
  "Thi Công": "#9C8A73",
  "Tiêu Chuẩn": "#8a7a9e",
};

export default function BlogPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-kicker", { y: 20, opacity: 0, duration: 0.7 })
        .from(".hero-title", { y: 40, opacity: 0, duration: 1 }, "-=0.5")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".featured-card", { y: 50, opacity: 0, duration: 1 }, "-=0.6");

      gsap.from(".post-row", {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".posts-section", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <div ref={rootRef} className="min-h-screen bg-[#080808] pt-24 font-sans selection:bg-[#B8AFA3] selection:text-[#080808]">

      {/* ─── Hero ─── */}
      <section className="relative py-20 md:py-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        {/* Background image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/nha_xuong.png" alt="Kinh Nghiệm Kim Ngân Steel" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/60 to-[#080808]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-5xl text-center flex flex-col items-center">
          <p className="hero-kicker text-[10px] font-bold tracking-[0.2em] uppercase text-[#C2BAB0] mb-6">Kim Ngân Steel — Kinh Nghiệm &amp; Tư Vấn</p>
          <h1 className="hero-title text-3xl md:text-5xl lg:text-7xl mb-6 uppercase font-light leading-[1.2]">
            <span className="block text-white">Kinh Nghiệm</span>
            <span className="block italic text-[#C2BAB0]">&amp; Tư Vấn Vật Tư</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-[#C2BAB0]/50" />
            <p className="hero-sub text-[#888] text-sm font-light max-w-md leading-relaxed">
              Chia sẻ cẩm nang thi công tôn thép hữu ích và cập nhật biến động giá thép hàng tuần.
            </p>
            <div className="w-8 h-px bg-[#C2BAB0]/50" />
          </div>
        </div>
      </section>

      {/* ─── Featured Post ─── */}
      <section className="bg-[#080808] py-12 border-b border-[#111]">
        <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
          <div className="featured-card group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#1a1a1a] hover:border-[#9C8A73]/30 transition-colors duration-500 overflow-hidden">
            {/* Image */}
            <div className="relative h-[280px] md:h-[420px] overflow-hidden bg-[#111]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1.5" style={{ background: CATEGORY_COLORS[featured.category] + "25", color: CATEGORY_COLORS[featured.category] }}>
                  {featured.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="bg-[#0a0a0a] p-10 md:p-14 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#444]">{featured.date}/{featured.month}/{featured.year}</span>
                  <span className="w-px h-3 bg-[#333]" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#444]">{featured.readTime}</span>
                </div>
                <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#9C8A73] mb-4">Bài nổi bật</p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white uppercase leading-[1.2] tracking-tight mb-6 group-hover:text-[#E8E4DB] transition-colors duration-300">
                  {featured.title}
                </h2>
                <p className="text-[#666] text-[14px] font-light leading-[1.8]">{featured.excerpt}</p>
              </div>
              <div className="mt-10 pt-8 border-t border-[#1a1a1a] flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9C8A73] group-hover:tracking-[0.3em] transition-all duration-300">
                  Đọc Bài →
                </span>
                <span className="text-[10px] text-[#333] font-bold tracking-widest uppercase">01</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Rest Posts ─── */}
      <section className="posts-section bg-[#080808] py-16">
        <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">

          {/* Header */}
          <div className="flex items-center gap-6 mb-10 pb-6 border-b border-[#1a1a1a]">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#444]">Bài viết gần đây</span>
            <div className="flex-1 h-px bg-[#1a1a1a]" />
          </div>

          {/* Post rows */}
          <div className="space-y-0">
            {rest.map((post, i) => (
              <div
                key={i}
                className="post-row group cursor-pointer grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0 border-b border-[#111] hover:border-[#9C8A73]/20 hover:bg-[#0a0a0a] transition-all duration-300 py-8"
              >
                {/* Left: content */}
                <div className="flex flex-col md:flex-row gap-8 items-start pr-0 md:pr-10">
                  {/* Date */}
                  <div className="shrink-0 hidden md:flex flex-col items-center w-14 pt-1">
                    <span className="text-3xl font-black text-[#333] group-hover:text-[#9C8A73] transition-colors duration-300 leading-none tabular-nums">{post.date}</span>
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[#555] mt-1">{post.month}/{post.year}</span>
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-[9px] font-black tracking-[0.25em] uppercase px-2.5 py-1"
                        style={{ background: (CATEGORY_COLORS[post.category] ?? "#9C8A73") + "18", color: CATEGORY_COLORS[post.category] ?? "#9C8A73" }}
                      >
                        {post.category}
                      </span>
                      <span className="text-[10px] text-[#666] font-bold tracking-wide">{post.readTime}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-light text-[#ddd] group-hover:text-white uppercase leading-snug tracking-tight transition-colors duration-300 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-[#777] text-[13px] font-light leading-relaxed hidden md:block">{post.excerpt}</p>
                  </div>
                </div>

                {/* Right: image + arrow */}
                <div className="flex items-center gap-6 shrink-0">
                  <div className="relative w-28 h-20 md:w-36 md:h-24 overflow-hidden bg-[#111] hidden md:block">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover opacity-50 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 border border-[#1e1e1e] text-[#333] group-hover:border-[#9C8A73] group-hover:text-[#9C8A73] transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Newsletter CTA ─── */}
      <section className="bg-[#F2F0EC] py-20 border-t border-[#e5e1da]">
        <div className="container mx-auto px-6 md:px-12 max-w-[1280px] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#9C8A73] mb-3">Nhận cập nhật</p>
            <h3 className="text-2xl md:text-3xl font-light text-[#151413] uppercase leading-tight">
              Bảng giá thép<br />
              <span className="text-[#9C8A73]">mỗi tuần</span>
            </h3>
          </div>
          <a
            href="/lien-he"
            className="inline-block bg-[#151413] text-white text-[11px] font-black uppercase tracking-[0.25em] px-10 py-4 hover:bg-[#9CA3AF] transition-colors duration-300 whitespace-nowrap"
          >
            Liên Hệ Đăng Ký →
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
