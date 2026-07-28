import type { ProcessStep } from "@/types/antra";

type ProcessSectionProps = {
  steps: ProcessStep[];
};

export function ProcessSection({ steps }: ProcessSectionProps) {
  return (
    <section id="process" className="py-24 bg-[#080808] border-b border-white/10 text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C2BAB0] font-medium block mb-3">
            QUY TRÌNH NĂNG LỰC NHÀ MÁY
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            CHỦ ĐỘNG SẢN XUẤT · KIỂM SOÁT CHẤT LƯỢNG
          </h2>
          <p className="text-white/60 text-sm font-light mt-4 max-w-2xl leading-relaxed">
            Nhà máy cán tôn Kim Ngân tổ chức quy trình chuẩn khép kín từ khâu phôi mạ, nắn sóng CNC, kiểm định độ dày ±1mm tới khi xuất xưởng tận công trình.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group bg-[#0d0d0d] p-8 flex flex-col justify-between min-h-[300px] hover:bg-[#141414] transition-colors relative"
            >
              <div>
                <span className="text-4xl font-extrabold font-mono text-[#C2BAB0]/30 group-hover:text-[#C2BAB0] transition-colors block mb-6">
                  0{index + 1}
                </span>
                <h3 className="text-base font-bold uppercase tracking-wider text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-xs text-white/60 font-light leading-relaxed">{step.description}</p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/5 text-[10px] font-mono text-[#C2BAB0]/60 uppercase tracking-widest">
                Bước {index + 1} / {steps.length}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
