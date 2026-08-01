import { ArrowUpRight } from "lucide-react";
import type { ServiceCard } from "@/types/antra";

type ServicesSectionProps = {
  services: ServiceCard[];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-32 bg-[#ffffff] border-b border-[#064e3b]/10 text-[#064e3b]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-20">
          <span className="editorial-subhead text-[#064e3b] block mb-4">
            COMPETITIVE CAPABILITIES
          </span>
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tight text-[#064e3b]">
            ĐIỂM KHÁC BIỆT NỔI BẬT
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#064e3b]/15">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className="group p-8 md:p-10 flex flex-col justify-between min-h-[340px] border-r border-b border-[#064e3b]/15 transition-colors duration-500 hover:bg-black/[0.03]"
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <span className="text-xs font-mono text-[#064e3b]">0{idx + 1}</span>
                  <span className="text-sm font-mono text-[#064e3b]">{service.icon}</span>
                </div>
                <h3 className="text-lg md:text-xl font-light uppercase tracking-tight text-[#064e3b] group-hover:text-[#064e3b] transition-colors mb-4">
                  {service.title}
                </h3>
                <p className="text-xs text-[#064e3b] font-light leading-relaxed">{service.description}</p>
              </div>

              <div className="pt-6 border-t border-[#064e3b]/15 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#064e3b]">KIM NGÂN PRECISION</span>
                <span className="text-sm text-[#064e3b] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
