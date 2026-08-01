import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="relative bg-[#064e3b] text-[#ffffff] pt-24 pb-12 px-6 md:px-12 lg:px-24 w-full border-t border-[#ffffff]/10">
      <div className="max-w-[1440px] mx-auto flex flex-col justify-between min-h-[300px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20 border-b border-[#ffffff]/10">
          <div className="md:col-span-6 flex flex-col md:flex-row items-start gap-6 lg:gap-10">
            <div className="shrink-0 mb-6 md:mb-0 mt-2">
              <Image
                src="/partners/logo.svg"
                alt="Kim Ngân Steel logo"
                width={160}
                height={160}
                className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain brightness-0 invert opacity-90"
                priority
              />
            </div>
            <div>
              <div className="mb-4">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/60">
                  KIM NGÂN STEEL ARCHITECTURE
                </span>
              </div>
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-tight text-[#ffffff] max-w-md">
              Gia công cán tôn & phân phối thép xây dựng chất lượng cao.
            </h2>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/60 block mb-4">
              ĐIỀU HƯỚNG
            </span>
            <ul className="space-y-2 text-xs font-mono text-[#ffffff]">
              <li><a href="/gioi-thieu" className="editorial-link text-[#ffffff]">Giới thiệu</a></li>
              <li><a href="/san-pham" className="editorial-link text-[#ffffff]">Sản phẩm</a></li>
              <li><a href="/nang-luc-nha-may" className="editorial-link text-[#ffffff]">Năng lực nhà máy</a></li>
              <li><a href="/lien-he" className="editorial-link text-[#ffffff]">Liên hệ báo giá</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/60 block mb-4">
              THÔNG TIN
            </span>
            <div className="space-y-2 text-xs font-mono text-[#ffffff]">
              <p className="text-[#ffffff] font-bold">Hotline: 0707 079 900</p>
              <p>Email: tonthepkimngan20@gmail.com</p>
              <p>262 Đường DT742, Khu Phố 1, P. Vĩnh Tân, TP. HCM</p>
              <p>MST: 3702871412</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/60">
          <p>© 2026 KIM NGÂN STEEL. ALL RIGHTS RESERVED.</p>
          <p>EUROPEAN ARCHITECTURAL EDITORIAL</p>
        </div>

      </div>
    </footer>
  );
}
