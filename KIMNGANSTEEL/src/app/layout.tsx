import type { Metadata } from "next";
import { Be_Vietnam_Pro, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/antra/Header";
import { FloatingContact } from "@/components/antra/FloatingContact";

const navItems = [
  { label: "Trang Chủ", href: "/" },
  { label: "Giới Thiệu", href: "/gioi-thieu" },
  { label: "Sản Phẩm", href: "/san-pham" },
  { label: "Năng Lực Nhà Máy", href: "/nang-luc-nha-may" },
  { label: "Dự Án", href: "/du-an" },
  { label: "Kinh Nghiệm", href: "/kinh-nghiem" },
  { label: "Liên Hệ", href: "/lien-he" },
];

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
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
    <html lang="en" className={`${beVietnam.variable} ${dancingScript.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-background text-foreground antialiased bg-[#080808]">
        <Header navItems={navItems} />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
