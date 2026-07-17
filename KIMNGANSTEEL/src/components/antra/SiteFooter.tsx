import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="relative bg-[#151413] text-[#F2F0EC] pt-16 pb-28 px-5 sm:px-6 md:px-10 lg:px-12 lg:pt-24 lg:pb-12 w-full border-t border-[rgba(216,212,206,0.05)] overflow-hidden">
      {/* Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#B8AFA3] rounded-full blur-[150px] opacity-[0.04] pointer-events-none transform -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D8D4CE] rounded-full blur-[120px] opacity-[0.02] pointer-events-none transform translate-y-1/3 translate-x-1/3"></div>
      
      {/* Subtle Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(216,212,206,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(216,212,206,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)]"></div>

      <div className="relative max-w-[1400px] mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 lg:mb-24">
          
          {/* Left Column (Span 6) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <Link href="/" className="mb-8 lg:mb-10 flex items-center gap-3">
              <Image 
                src="/KIMNGANLOGO.svg" 
                alt="Kim Ngân Steel" 
                width={400} 
                height={400} 
                className="h-20 sm:h-24 lg:h-32 w-auto opacity-100 brightness-0 invert"
              />
            </Link>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-normal leading-snug mb-7 lg:mb-8 max-w-full uppercase text-[#D8D4CE]">
              Xây dựng nền móng vững chắc <br className="hidden lg:block" /> cho công trình của bạn.
            </h2>
            <a 
              href="/lien-he" 
              className="inline-flex min-h-11 items-center justify-center border border-[#444] px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm tracking-[0.14em] sm:tracking-[0.2em] uppercase hover:bg-[#F2F0EC] hover:text-[#151413] transition-colors"
            >
              Nhận Báo Giá Ngay
            </a>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Navigation Column (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-[#9C8A73] text-[11px] font-bold tracking-[0.2em] uppercase mb-5 lg:mb-8">
              Điều Hướng
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-col sm:gap-0 sm:space-y-3 text-[3.4vw] sm:text-[14px] lg:text-[15px] whitespace-nowrap">
              <li><a href="/gioi-thieu" className="text-[#B8AFA3] hover:text-[#F2F0EC] transition-colors">Giới thiệu</a></li>
              <li><a href="/san-pham" className="text-[#B8AFA3] hover:text-[#F2F0EC] transition-colors">Sản phẩm</a></li>
              <li><a href="/nang-luc-nha-may" className="text-[#B8AFA3] hover:text-[#F2F0EC] transition-colors">Năng lực nhà máy</a></li>
              <li><a href="/du-an" className="text-[#B8AFA3] hover:text-[#F2F0EC] transition-colors">Dự án</a></li>
              <li><a href="/kinh-nghiem" className="text-[#B8AFA3] hover:text-[#F2F0EC] transition-colors">Kinh nghiệm</a></li>
              <li><a href="/lien-he" className="text-[#B8AFA3] hover:text-[#F2F0EC] transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          {/* Contact Column (Span 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-[#9C8A73] text-[11px] font-bold tracking-[0.2em] uppercase mb-5 lg:mb-8">
              Liên Hệ
            </h3>
            <ul className="space-y-2.5 lg:space-y-4 text-[#B8AFA3] text-[3.2vw] sm:text-[14px] lg:text-[15px] whitespace-nowrap">
              <li className="flex items-start gap-2.5 lg:gap-3.5">
                <div className="w-4 lg:w-5 flex justify-center mt-[2px] lg:mt-[3px] flex-shrink-0">
                  <MapPin size={16} className="text-[#9C8A73]" />
                </div>
                <span className="leading-relaxed min-w-0">
                  262 đường DT742, Vĩnh Tân, Tân Uyên, Tp. HCM
                </span>
              </li>
              <li className="flex items-start gap-2.5 lg:gap-3.5">
                <div className="w-4 lg:w-5 flex justify-center mt-[2px] lg:mt-[3px] flex-shrink-0">
                  <Phone size={16} className="text-[#9C8A73]" />
                </div>
                <span className="leading-relaxed min-w-0">Hotline: 090 123 4567</span>
              </li>
              <li className="flex items-start gap-2.5 lg:gap-3.5">
                <div className="w-4 lg:w-5 flex justify-center mt-[2px] lg:mt-[3px] flex-shrink-0">
                  <Phone size={16} className="text-[#9C8A73]" />
                </div>
                <span className="leading-relaxed min-w-0">Kinh doanh: 090 987 6543</span>
              </li>
              <li className="flex items-start gap-2.5 lg:gap-3.5">
                <div className="w-4 lg:w-5 flex justify-center mt-[2px] lg:mt-[3px] flex-shrink-0">
                  <Mail size={16} className="text-[#9C8A73]" />
                </div>
                <a href="mailto:sales@kimngansteel.vn" className="leading-relaxed min-w-0 break-words hover:text-[#F2F0EC] transition-colors">sales@kimngansteel.vn</a>
              </li>
              <li className="flex items-start gap-2.5 lg:gap-3.5">
                <div className="w-4 lg:w-5 flex justify-center mt-[2px] lg:mt-[3px] flex-shrink-0">
                  <Globe size={16} className="text-[#9C8A73]" />
                </div>
                <a href="https://kimngansteel.vn" className="leading-relaxed min-w-0 break-words hover:text-[#F2F0EC] transition-colors">kimngansteel.vn</a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#333] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[#777] text-xs">
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
