import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="bg-[#ECE8DE] text-[#1A1918] pt-24 pb-12 px-6 md:px-12 lg:px-24 w-full border-t border-[#1A1918]/10">
      <div className="max-w-[1440px] mx-auto flex flex-col justify-between min-h-[300px]">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20 border-b border-[#1A1918]/10">
          <div className="md:col-span-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#6B655F] block mb-4">
              KIM NGÂN STEEL ARCHITECTURE
            </span>
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-tight text-[#1A1918] max-w-md">
              Gia công cán tôn & phân phối thép xây dựng chất lượng cao.
            </h2>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#6B655F] block mb-4">
              ĐIỀU HƯỚNG
            </span>
            <ul className="space-y-2 text-xs font-mono text-[#524D4A]">
              <li><a href="/gioi-thieu" className="editorial-link text-[#1A1918]">Giới thiệu</a></li>
              <li><a href="/san-pham" className="editorial-link text-[#1A1918]">Sản phẩm</a></li>
              <li><a href="/nang-luc-nha-may" className="editorial-link text-[#1A1918]">Năng lực nhà máy</a></li>
              <li><a href="/lien-he" className="editorial-link text-[#1A1918]">Liên hệ báo giá</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#6B655F] block mb-4">
              THÔNG TIN
            </span>
            <div className="space-y-2 text-xs font-mono text-[#524D4A]">
              <p className="text-[#1A1918] font-bold">Hotline: 0707 079 900</p>
              <p>Email: tonthepkimngan20@gmail.com</p>
              <p>262 Đường DT742, Khu Phố 1, P. Vĩnh Tân, TP. HCM</p>
              <p>MST: 3702871412</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#6B655F]">
          <p>© 2026 KIM NGÂN STEEL. ALL RIGHTS RESERVED.</p>
          <p>EUROPEAN ARCHITECTURAL EDITORIAL</p>
        </div>

      </div>
    </footer>
  );
}
