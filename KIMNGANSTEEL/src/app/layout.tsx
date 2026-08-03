import type { Metadata } from "next";
import { Dancing_Script, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/antra/Header";
import { SiteFooter } from "@/components/antra/SiteFooter";
import { PageTransition } from "@/components/antra/PageTransition";
import { CustomCursor } from "@/components/antra/CustomCursor";
import { SmoothScroll } from "@/components/antra/SmoothScroll";
import { LanguageProvider } from "@/components/antra/LanguageProvider";

const navItems = [
  { label: "Trang Chủ", href: "/" },
  { label: "Giới Thiệu", href: "/gioi-thieu" },
  { label: "Sản Phẩm", href: "/san-pham" },
  { label: "Năng Lực Nhà Máy", href: "/nang-luc-nha-may" },
  { label: "Liên Hệ", href: "/lien-he#contact" },
];

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kim Ngân Steel",
  description: "Nhà máy sản xuất, cung cấp tôn thép chất lượng cao Kim Ngân Steel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${dancingScript.variable} ${beVietnamPro.variable} h-full`}>
      <body className="min-h-full bg-[#0E0E0D] text-[#F4F2EC] antialiased">
        <LanguageProvider>
          <SmoothScroll>
            <CustomCursor />
            <Header navItems={navItems} />
            {children}
            <SiteFooter />
            <PageTransition />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
