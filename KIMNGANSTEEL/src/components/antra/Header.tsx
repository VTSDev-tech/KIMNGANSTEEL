"use client";

import { Menu, Phone, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types/antra";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  { name: "Dự án công trình tiêu biểu", type: "Dự Án", href: "/du-an", desc: "Cung cấp tôn thép cho biệt thự, nhà xưởng quy mô lớn." },
  { name: "Liên hệ và nhận báo giá tôn thép", type: "Liên Hệ", href: "/lien-he", desc: "Hỗ trợ tư vấn kỹ thuật và báo giá 24/7." },
];

export function Header({ navItems }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsHidden(false); // Reset visibility when navigating to a new page
    setIsMenuOpen(false); // Close mobile menu drawer when navigation completes
    setIsSearchOpen(false); // Close search overlay when navigation completes

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollY = window.scrollY;

      // The footer sits at the bottom of the page.
      // Hiding the header when scrolled within 450px of the page bottom is extremely reliable.
      const threshold = 450;
      const isNearBottom = scrollY + clientHeight >= scrollHeight - threshold;

      if (scrollHeight > clientHeight + 100) {
        setIsHidden(isNearBottom);
      } else {
        setIsHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Lock body scroll and set global classes when mobile menu or search is open
  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.classList.toggle("menu-open", isMenuOpen);
      document.body.classList.toggle("search-open", isSearchOpen);
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("menu-open");
      document.body.classList.remove("search-open");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.classList.remove("menu-open");
      document.body.classList.remove("search-open");
      document.body.style.overflow = "";
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
      <header className={`antra-header is-scrolled ${isHidden ? "is-hidden" : ""}`}>
        <Link className="antra-logo" href="/" aria-label="Kim Ngân Steel">
          <Image
            src="/KIMNGANLOGO.svg"
            alt="Kim Ngân Steel"
            width={84}
            height={84}
            priority
            className="antra-logo-image"
          />
        </Link>
        <nav className="antra-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={isActive ? "text-[#C2BAB0] font-bold border-b-2 border-[#C2BAB0] pb-1" : "hover:text-[#C2BAB0] transition-colors pb-1 border-b-2 border-transparent"}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="antra-header-actions">
          <a className="antra-call" href="tel:0934096794">
            <Phone size={16} />
            <span><small>Hotline</small>0934 096 794</span>
          </a>
          <a className="antra-quote" href="#contact">Nhận báo giá</a>
          <button 
            className="antra-icon-button" 
            onClick={() => {
              setSearchQuery("");
              setIsSearchOpen(true);
            }} 
            aria-label="Search"
          >
            <Search size={17} />
          </button>
          <button 
            className="antra-icon-button antra-menu-btn flex items-center justify-center" 
            onClick={() => setIsMenuOpen(true)} 
            aria-label="Open menu"
          >
            <Menu size={20} className="text-white" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#080808]/98 backdrop-blur-lg px-6 py-6 antra-menu-drawer"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
              <Link className="antra-logo" href="/">
                <Image
                  src="/KIMNGANLOGO.svg"
                  alt="Kim Ngân Steel"
                  width={72}
                  height={72}
                  priority
                />
              </Link>
              <button
                className="antra-icon-button w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <nav className="flex flex-col gap-4 mb-10 pl-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-[17px] font-medium tracking-wide block py-1.5 transition-colors ${
                        isActive ? "text-[#C2BAB0] font-semibold" : "text-[#D8D4CE]/90 hover:text-[#C2BAB0]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Drawer Footer Info */}
            <div className="mt-auto border-t border-white/10 pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C2BAB0]/10 border border-[#C2BAB0]/30 flex items-center justify-center text-[#C2BAB0]">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-[#777] uppercase tracking-wider font-bold">Hotline 24/7</p>
                  <a href="tel:0934096794" className="text-white text-lg font-medium hover:text-[#C2BAB0] transition-colors">0934 096 794</a>
                </div>
              </div>
              <p className="text-xs text-[#555] font-light leading-relaxed">
                Khu Công Nghiệp Sóng Thần, Dĩ An, Bình Dương
              </p>
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
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-start pt-24 md:pt-32 px-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all cursor-pointer"
              aria-label="Close search"
            >
              <X size={18} />
            </button>

            <div className="w-full max-w-[640px] flex flex-col items-center">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#9CA3AF] mb-6">
                Tìm kiếm thông tin
              </p>

              {/* Input field wrapper */}
              <div className="relative w-full border-b border-white/20 focus-within:border-white transition-colors pb-3 flex items-center">
                <Search size={22} className="text-white/30 mr-4" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nhập tôn lạnh, thép hộp, kinh nghiệm..."
                  className="w-full bg-transparent text-white text-xl sm:text-2xl font-light focus:outline-none placeholder-white/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-white/40 hover:text-white p-1"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Suggestions */}
              {searchQuery.trim() === "" && (
                <div className="w-full mt-8 animate-fadeIn">
                  <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3">
                    Gợi ý tìm kiếm phổ biến
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {popularSuggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSuggestionClick(s)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs tracking-wide rounded border border-white/5 hover:border-white/20 transition-all cursor-pointer"
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
                  <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">
                    Kết quả tìm kiếm ({filteredResults.length})
                  </p>

                  {filteredResults.length > 0 ? (
                    <div className="divide-y divide-white/5 border border-white/5 bg-[#111]/30">
                      {filteredResults.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-start justify-between p-4 hover:bg-white/5 transition-all group cursor-pointer"
                        >
                          <div className="flex-1 pr-6">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[9px] font-mono tracking-widest text-[#E5E7EB] uppercase bg-white/10 px-2 py-0.5 border border-white/20">
                                {item.type}
                              </span>
                            </div>
                            <h4 className="text-sm font-medium text-white group-hover:text-[#E5E7EB] transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-xs text-white/50 font-light mt-1 line-clamp-1">
                              {item.desc}
                            </p>
                          </div>
                          <div className="flex items-center h-full pt-4">
                            <span className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all">
                              →
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 border border-dashed border-white/10 rounded-lg">
                      <p className="text-sm text-white/40 font-light">
                        Không tìm thấy kết quả phù hợp cho "{searchQuery}"
                      </p>
                      <p className="text-xs text-white/20 mt-1 font-light">
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
