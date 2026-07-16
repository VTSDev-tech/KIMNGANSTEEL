import { Grid3X3, Phone, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { NavItem } from "@/types/antra";

type HeaderProps = {
  navItems: NavItem[];
};

export function Header({ navItems }: HeaderProps) {
  return (
    <header className="antra-header is-scrolled">
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
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>{item.label}</Link>
        ))}
      </nav>
      <div className="antra-header-actions">
        <a className="antra-call" href="tel:0934096794">
          <Phone size={16} />
          <span><small>Hotline</small>0934 096 794</span>
        </a>
        <a className="antra-quote" href="#contact">Nhận báo giá</a>
        <button className="antra-icon-button" aria-label="Search"><Search size={17} /></button>
        <button className="antra-icon-button" aria-label="Open menu"><Grid3X3 size={17} /></button>
      </div>
    </header>
  );
}
