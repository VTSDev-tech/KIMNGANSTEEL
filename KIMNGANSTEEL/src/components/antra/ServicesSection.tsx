import { ArrowUpRight } from "lucide-react";
import type { ServiceCard } from "@/types/antra";

type ServicesSectionProps = {
  services: ServiceCard[];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-32 bg-[#ECE8DE] border-b border-[#1A1918]/10 text-[#1A1918]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-20">
          <span className="editorial-subhead text-[#6B655F] block mb-4">
            COMPETITIVE CAPABILITIES
          </span>
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tight text-[#1A1918]">
            ĐIỂM KHÁC BIỆT NỔI BẬT
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#1A1918]/15">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className="group p-8 md:p-10 flex flex-col justify-between min-h-[340px] border-r border-b border-[#1A1918]/15 transition-colors duration-500 hover:bg-black/[0.03]"
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <span className="text-xs font-mono text-[#6B655F]">0{idx + 1}</span>
                  <span className="text-sm font-mono text-[#1A1918]">{service.icon}</span>
                </div>
                <h3 className="text-lg md:text-xl font-light uppercase tracking-tight text-[#1A1918] group-hover:text-[#8E857B] transition-colors mb-4">
                  {service.title}
                </h3>
                <p className="text-xs text-[#524D4A] font-light leading-relaxed">{service.description}</p>
              </div>

              <div className="pt-6 border-t border-[#1A1918]/15 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B655F]">KIM NGÂN PRECISION</span>
                <span className="text-sm text-[#1A1918] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
