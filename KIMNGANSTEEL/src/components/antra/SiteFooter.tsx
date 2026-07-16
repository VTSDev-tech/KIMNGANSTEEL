import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative bg-[#151413] text-[#F2F0EC] pt-24 pb-12 px-6 md:px-12 w-full border-t border-[rgba(216,212,206,0.05)] overflow-hidden">
      {/* Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#B8AFA3] rounded-full blur-[150px] opacity-[0.04] pointer-events-none transform -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D8D4CE] rounded-full blur-[120px] opacity-[0.02] pointer-events-none transform translate-y-1/3 translate-x-1/3"></div>
      
      {/* Subtle Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(216,212,206,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(216,212,206,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)]"></div>

      <div className="relative max-w-[1400px] mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          
          {/* Left Column (Span 6) */}
          <div className="md:col-span-6 flex flex-col items-start">
            <Link href="/" className="mb-10 flex items-center gap-3">
              <Image 
                src="/KIMNGANLOGO.svg" 
                alt="Kim Ngân Steel" 
                width={400} 
                height={400} 
                className="h-24 md:h-32 w-auto opacity-100 brightness-0 invert"
              />
            </Link>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-normal leading-snug mb-8 max-w-full uppercase text-[#D8D4CE]">
              Xây dựng nền móng vững chắc <br className="hidden lg:block" /> cho công trình của bạn.
            </h2>
            <a 
              href="/lien-he" 
              className="inline-block border border-[#444] px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-[#F2F0EC] hover:text-[#151413] transition-colors"
            >
              Nhận Báo Giá Ngay
            </a>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Navigation Column (Span 2) */}
          <div className="md:col-span-2">
            <h3 className="text-[#9C8A73] text-[11px] font-bold tracking-[0.2em] uppercase mb-8">
              Điều Hướng
            </h3>
            <ul className="space-y-3">
              <li><a href="/gioi-thieu" className="text-[#B8AFA3] hover:text-[#F2F0EC] text-[15px] transition-colors">Giới thiệu</a></li>
              <li><a href="/san-pham" className="text-[#B8AFA3] hover:text-[#F2F0EC] text-[15px] transition-colors">Sản phẩm</a></li>
              <li><a href="/nang-luc-nha-may" className="text-[#B8AFA3] hover:text-[#F2F0EC] text-[15px] transition-colors">Năng lực nhà máy</a></li>
              <li><a href="/du-an" className="text-[#B8AFA3] hover:text-[#F2F0EC] text-[15px] transition-colors">Dự án</a></li>
              <li><a href="/tin-tuc" className="text-[#B8AFA3] hover:text-[#F2F0EC] text-[15px] transition-colors">Tin tức</a></li>
              <li><a href="/lien-he" className="text-[#B8AFA3] hover:text-[#F2F0EC] text-[15px] transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          {/* Contact Column (Span 3) */}
          <div className="md:col-span-3">
            <h3 className="text-[#9C8A73] text-[11px] font-bold tracking-[0.2em] uppercase mb-8">
              Liên Hệ
            </h3>
            <ul className="space-y-4 text-[#B8AFA3] text-[15px]">
              <li className="flex items-start gap-3.5">
                <div className="w-5 flex justify-center mt-[3px] flex-shrink-0">
                  <MapPin size={18} className="text-[#9C8A73]" />
                </div>
                <span className="leading-relaxed">
                  262 đường DT742, Vĩnh Tân,<br/>
                  Tân Uyên, Tp. HCM
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <div className="w-5 flex justify-center mt-[3px] flex-shrink-0">
                  <Phone size={18} className="text-[#9C8A73]" />
                </div>
                <span className="leading-relaxed">Hotline: 090 123 4567</span>
              </li>
              <li className="flex items-start gap-3.5">
                <div className="w-5 flex justify-center mt-[3px] flex-shrink-0">
                  <Phone size={18} className="text-[#9C8A73]" />
                </div>
                <span className="leading-relaxed">Kinh doanh: 090 987 6543</span>
              </li>
              <li className="flex items-start gap-3.5">
                <div className="w-5 flex justify-center mt-[3px] flex-shrink-0">
                  <Mail size={18} className="text-[#9C8A73]" />
                </div>
                <a href="mailto:sales@kimngansteel.vn" className="leading-relaxed hover:text-[#F2F0EC] transition-colors">sales@kimngansteel.vn</a>
              </li>
              <li className="flex items-start gap-3.5">
                <div className="w-5 flex justify-center mt-[3px] flex-shrink-0">
                  <Globe size={18} className="text-[#9C8A73]" />
                </div>
                <a href="https://kimngansteel.vn" className="leading-relaxed hover:text-[#F2F0EC] transition-colors">kimngansteel.vn</a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#333] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[#777] text-xs">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-center md:text-left">
            <p>© 2026 KIM NGÂN STEEL.</p>
          </div>
          <div>
            <p className="tracking-[0.1em] uppercase">Kim Ngan Steel</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
