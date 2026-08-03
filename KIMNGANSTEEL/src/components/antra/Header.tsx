"use client";

import { Languages, Menu, Phone, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types/antra";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

type HeaderProps = {
  navItems: NavItem[];
};

const SEARCHABLE_ITEMS = [
  // Products
  { name: "Tôn Lạnh", type: "Sản Phẩm", href: "/san-pham", desc: "Tôn chống nóng cao cấp, mạ hợp kim nhôm kẽm AZ." },
  { name: "Tôn Màu", type: "Sản Phẩm", href: "/san-pham", desc: "Đa dạng 40+ màu sắc, sơn phủ bền màu 10 năm." },
  { name: "Tôn Cán Sóng", type: "Sản Phẩm", href: "/san-pham", desc: "Cán 5/9/11 sóng phục vụ lợp nhà xưởng khẩu độ lớn." },
  { name: "Thép Cuộn Mạ Kẽm", type: "Sản Phẩm", href: "/san-pham", desc: "Nguyên liệu phôi thép cuộn chất lượng cao ASTM." },
  { name: "Thép Hộp Mạ Kẽm", type: "Sản Phẩm", href: "/san-pham", desc: "Khung kèo mái nhà xây dựng, chống rỉ sét bền lâu." },
  { name: "Thép Ống & Thép Hình", type: "Sản Phẩm", href: "/san-pham", desc: "Thép hình H, I, U, V phục vụ công nghiệp nặng." },
  { name: "Thép Tấm Đen", type: "Sản Phẩm", href: "/san-pham", desc: "Kết cấu chịu tải trọng lớn, thép tấm cán nóng SS400." },
  { name: "Xà Gồ C / Z", type: "Sản Phẩm", href: "/san-pham", desc: "Hệ giàn mái nhà tiền chế cường độ cao G350." },
  // Guides
  { name: "Cách chọn độ dày tôn lợp phù hợp cho nhà xưởng", type: "Kinh Nghiệm", href: "/kinh-nghiem", desc: "Độ dày tôn lợp ảnh hưởng đến tuổi thọ công trình." },
  { name: "Kinh nghiệm thi công mái tôn chống dột hiệu quả mùa mưa", type: "Kinh Nghiệm", href: "/kinh-nghiem", desc: "Những lỗi phổ biến khi lợp tôn và cách khắc phục." },
  { name: "Phân biệt Tôn Lạnh và Tôn Mạ Kẽm: Loại nào tốt hơn?", type: "Kinh Nghiệm", href: "/kinh-nghiem", desc: "So sánh toàn diện hai dòng vật liệu phổ biến nhất." },
  { name: "Tiêu chuẩn ASTM và JIS trong thép xây dựng là gì?", type: "Kinh Nghiệm", href: "/kinh-nghiem", desc: "Các tiêu chuẩn quốc tế ASTM A653, JIS G3302." },
  // General Pages
  { name: "Giới thiệu doanh nghiệp Kim Ngân Steel", type: "Giới Thiệu", href: "/gioi-thieu", desc: "Năng lực cung ứng tôn thép hàng đầu miền Nam." },
  { name: "Năng lực nhà máy và quy trình sản xuất", type: "Nhà Máy", href: "/nang-luc-nha-may", desc: "Hệ thống máy cán tôn hiện đại đạt tiêu chuẩn ISO." },
  { name: "Liên hệ và nhận báo giá tôn thép", type: "Liên Hệ", href: "/lien-he", desc: "Hỗ trợ tư vấn kỹ thuật và báo giá 24/7." },
];

export function Header({ navItems }: HeaderProps) {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsHidden(false);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrollingDown = scrollY > lastScrollY;
          const shouldHide = isScrollingDown && scrollY > 100 && !isMenuOpen && !isSearchOpen;

          setIsHidden(shouldHide);
          setIsScrolled(scrollY > 40);
          lastScrollY = Math.max(scrollY, 0);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen, isSearchOpen]);

  // Lock body scroll and set global classes when mobile menu or search is open
  useEffect(() => {
    const unlockPageScroll = () => {
      delete document.body.dataset.scrollLock;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };

    if (isMenuOpen || isSearchOpen) {
      document.body.classList.toggle("menu-open", isMenuOpen);
      document.body.classList.toggle("search-open", isSearchOpen);
      document.body.dataset.scrollLock = "true";
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("menu-open");
      document.body.classList.remove("search-open");
      unlockPageScroll();
    }
    return () => {
      document.body.classList.remove("menu-open");
      document.body.classList.remove("search-open");
      unlockPageScroll();
    };
  }, [isMenuOpen, isSearchOpen]);

  // Focus input field when search modal opens
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const removeVietnameseTones = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  };

  const cleanQuery = removeVietnameseTones(searchQuery.trim());
  const filteredResults = cleanQuery === ""
    ? []
    : SEARCHABLE_ITEMS.filter((item) =>
        removeVietnameseTones(item.name).includes(cleanQuery) ||
        removeVietnameseTones(item.desc).includes(cleanQuery)
      );

  const popularSuggestions = [
    "Tôn Lạnh",
    "Thép Hộp",
    "Chọn độ dày tôn",
    "Báo giá liên hệ",
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    searchInputRef.current?.focus();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-[300] w-full pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between px-6 md:px-14 border-b select-none bg-white/95 backdrop-blur-xl border-[#064e3b]/10 shadow-sm ${
          isHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        } ${
          isScrolled
            ? "py-3 md:py-3.5 shadow-md"
            : "py-4 md:py-5"
        }`}
      >
        {/* Brand Logo */}
        <Link className="flex items-center group shrink-0" href="/" aria-label="Kim Ngân Steel">
          <Image
            src="/partners/logo.svg"
            alt="Kim Ngân Steel"
            width={160}
            height={160}
            priority
            className="w-[80px] md:w-[100px] lg:w-[130px] h-auto object-contain filter contrast-125 transition-transform duration-300 group-hover:scale-105 origin-left"
          />
        </Link>

        {/* Clean Editorial Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`relative text-[13px] uppercase tracking-wide font-sans py-1.5 transition-colors group flex items-center ${
                  isActive ? "text-[#ea580c] font-bold" : "text-[#064e3b] hover:text-[#ea580c] font-medium"
                }`}
              >
                <span>{item.label}</span>
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#ea580c] transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Hotline */}
          <a
            href="tel:0707079900"
            className="hidden xl:flex items-center gap-2 text-[13px] font-sans font-bold text-[#064e3b] hover:text-[#ea580c] transition-colors"
          >
            <Phone size={15} className="text-[#ea580c]" />
            <span className="tracking-wide">0707 079 900</span>
          </a>


          {/* CTA Quote Button */}
          <a
            href="/lien-he#contact"
            className="px-6 py-2.5 rounded-full bg-[#064e3b] text-[#ffffff] font-sans text-[13px] font-bold uppercase tracking-wider hover:bg-[#ea580c] hover:text-[#ffffff] transition-all duration-300 shadow-sm"
          >
            Báo Giá
          </a>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="relative z-[310] lg:hidden flex h-11 w-11 min-h-11 min-w-11 shrink-0 touch-manipulation items-center justify-center text-[#064e3b] transition-colors hover:text-[#ea580c] cursor-pointer pointer-events-auto"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Yodezeen Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.24, 1, 0.36, 1] }}
            className="fixed inset-0 z-[400] flex flex-col justify-between overflow-y-auto overscroll-contain bg-[#ffffff]/98 backdrop-blur-2xl px-6 md:px-16 py-8 md:py-12 text-[#064e3b] pointer-events-auto"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between max-w-[1440px] mx-auto w-full border-b border-[#064e3b]/10 pb-6">
              <Link className="flex items-center gap-3" href="/" onClick={() => setIsMenuOpen(false)}>
                <Image
                  src="/logomoi.svg"
                  alt="Kim Ngân Steel"
                  width={64}
                  height={64}
                  priority
                />
                <span className="font-bold text-xl tracking-tighter uppercase font-sans">
                  KIM NGÂN<span className="text-[#ea580c] font-light ml-1">STEEL</span>
                </span>
              </Link>

              <button
                type="button"
                className="relative z-[410] w-12 h-12 shrink-0 touch-manipulation rounded-full border border-[#064e3b]/15 bg-[#064e3b]/5 hover:bg-[#064e3b]/20 flex items-center justify-center text-[#064e3b] transition-all cursor-pointer pointer-events-auto"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>


            {/* Overlay Content */}
            <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-1 py-10">
              <nav className="flex flex-col gap-4">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.5, ease: [0.24, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`group flex items-center justify-between text-2xl sm:text-4xl md:text-5xl font-light tracking-tight transition-colors py-3 border-b border-[#064e3b]/5 ${
                          isActive ? "text-[#ea580c] font-normal" : "text-[#064e3b]/80 hover:text-[#ea580c]"
                        }`}
                      >
                        <span className="uppercase">{item.label}</span>
                        <span className="text-xs font-mono text-[#ea580c]/60 mr-auto ml-4 opacity-0 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                        <span className="text-2xl font-mono text-[#ea580c] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">↗</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="hidden lg:flex flex-col gap-6 border-l border-[#064e3b]/10 pl-12 py-4">
                <span className="text-xs uppercase tracking-[0.25em] text-[#ea580c] font-medium">
                  KIM NGÂN STEEL — NHÀ MÁY CÁN TÔN & VẬT LIỆU XÂY DỰNG
                </span>
                <p className="text-sm font-light text-[#064e3b]/60 leading-relaxed max-w-md">
                  Giải pháp tôn thép hàng đầu miền Nam với dây chuyền tự động hóa CNC hiện đại, chủ động nguyên liệu phôi mạ nhôm kẽm AZ tiêu chuẩn quốc tế.
                </p>
                <div className="mt-6 pt-6 border-t border-[#064e3b]/10 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-[#064e3b]/80 font-mono">
                    <Phone size={16} className="text-[#ea580c]" />
                    <span>Hotline 24/7: <a href="tel:0707079900" className="hover:text-[#ea580c] underline transition-colors">0707 079 900</a></span>
                  </div>
                  <p className="text-xs text-[#064e3b]/50 font-mono">Địa chỉ: 262 Đường DT742, Khu Phố 1, Phường Vĩnh Tân, TP. HCM</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[120] bg-[#ffffff]/95 backdrop-blur-xl flex flex-col items-center justify-start pt-24 md:pt-32 px-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[#064e3b]/10 flex items-center justify-center text-[#064e3b]/70 hover:text-[#064e3b] hover:border-[#064e3b]/40 transition-all cursor-pointer"
              aria-label="Close search"
            >
              <X size={18} />
            </button>

            <div className="w-full max-w-[640px] flex flex-col items-center">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#064e3b]/60 mb-6">
                Tìm kiếm thông tin
              </p>

              {/* Input field wrapper */}
              <div className="relative w-full border-b border-[#064e3b]/20 focus-within:border-white transition-colors pb-3 flex items-center">
                <Search size={22} className="text-[#064e3b]/30 mr-4" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nhập tôn lạnh, thép hộp, kinh nghiệm..."
                  className="w-full bg-transparent text-[#064e3b] text-xl sm:text-2xl font-light focus:outline-none placeholder-[#064e3b]/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[#064e3b]/40 hover:text-[#064e3b] p-1"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Suggestions */}
              {searchQuery.trim() === "" && (
                <div className="w-full mt-8 animate-fadeIn">
                  <p className="text-[11px] font-semibold text-[#064e3b]/40 uppercase tracking-wider mb-3">
                    Gợi ý tìm kiếm phổ biến
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {popularSuggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSuggestionClick(s)}
                        className="px-4 py-2 bg-[#064e3b]/5 hover:bg-[#064e3b]/10 text-[#064e3b]/80 hover:text-[#064e3b] text-xs tracking-wide rounded border border-[#064e3b]/5 hover:border-[#064e3b]/20 transition-all cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results */}
              {searchQuery.trim() !== "" && (
                <div className="w-full mt-10 overflow-y-auto max-h-[50vh] pr-2 space-y-4">
                  <p className="text-[11px] font-semibold text-[#064e3b]/40 uppercase tracking-wider mb-2">
                    Kết quả tìm kiếm ({filteredResults.length})
                  </p>

                  {filteredResults.length > 0 ? (
                    <div className="divide-y divide-white/5 border border-[#064e3b]/5 bg-[#064e3b]/5">
                      {filteredResults.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-start justify-between p-4 hover:bg-[#064e3b]/5 transition-all group cursor-pointer"
                        >
                          <div className="flex-1 pr-6">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[9px] font-mono tracking-widest text-[#064e3b] uppercase bg-[#064e3b]/10 px-2 py-0.5 border border-[#064e3b]/20">
                                {item.type}
                              </span>
                            </div>
                            <h4 className="text-sm font-medium text-[#064e3b] group-hover:text-[#064e3b] transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-xs text-[#064e3b]/50 font-light mt-1 line-clamp-1">
                              {item.desc}
                            </p>
                          </div>
                          <div className="flex items-center h-full pt-4">
                            <span className="text-[#064e3b]/20 group-hover:text-[#064e3b] group-hover:translate-x-1 transition-all">
                              →
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 border border-dashed border-[#064e3b]/10 rounded-lg">
                      <p className="text-sm text-[#064e3b]/40 font-light">
                        Không tìm thấy kết quả phù hợp cho "{searchQuery}"
                      </p>
                      <p className="text-xs text-[#064e3b]/20 mt-1 font-light">
                        Thử tìm kiếm với từ khóa khác như "tôn", "thép", "kèo mái".
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
