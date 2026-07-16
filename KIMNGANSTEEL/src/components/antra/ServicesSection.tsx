import { ArrowUpRight } from "lucide-react";
import type { ServiceCard } from "@/types/antra";

type ServicesSectionProps = {
  services: ServiceCard[];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="antra-section antra-services">
      <div className="antra-section-heading">
        <p className="antra-kicker dark">ƯU ĐIỂM VƯỢT TRỘI</p>
        <h2>ĐIỂM KHÁC BIỆT <span>NỔI BẬT</span></h2>
        <p>Lý do Tôn Thép Kim Ngân luôn là sự lựa chọn hàng đầu của các nhà thầu và đại lý vật liệu xây dựng trên toàn quốc.</p>
      </div>
      <div className="antra-service-grid">
        {services.map((service) => (
          <article className="antra-service-card" key={service.title}>
            <div className="antra-service-top"><h3>{service.title}</h3><span>{service.icon}</span></div>
            <p className="text-justify">{service.description}</p>
            <a href="#projects" aria-label={`View ${service.title}`}><ArrowUpRight size={18} /></a>
          </article>
        ))}
      </div>
    </section>
  );
}
