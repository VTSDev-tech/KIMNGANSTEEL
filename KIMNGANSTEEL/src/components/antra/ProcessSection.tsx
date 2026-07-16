import type { ProcessStep } from "@/types/antra";

type ProcessSectionProps = {
  steps: ProcessStep[];
};

export function ProcessSection({ steps }: ProcessSectionProps) {
  return (
    <section id="process" className="antra-section antra-process">
      <div className="antra-section-heading compact !w-full !max-w-5xl mx-auto">
        <p className="antra-kicker dark">NĂNG LỰC NHÀ MÁY</p>
        <h2 className="!text-[clamp(1.5rem,3vw,2.5rem)]">CHỦ ĐỘNG SẢN XUẤT <br className="hidden md:block" /> <span className="whitespace-nowrap">KIỂM SOÁT CHẤT LƯỢNG</span></h2>
        <p style={{ marginTop: 16 }}>Nhà máy cán tôn của Kim Ngân được tổ chức theo quy trình rõ ràng, từ khâu tiếp nhận nguyên liệu, thiết lập thông số, cán tạo hình, kiểm tra thành phẩm đến đóng gói và vận chuyển. Mỗi đơn hàng được kiểm tra về quy cách, độ dày, chiều dài và chất lượng bề mặt trước khi bàn giao.</p>
      </div>
      <div className="antra-process-list">
        {steps.map((step, index) => (
          <article key={step.title} className="antra-process-step overflow-hidden">
            <div className="process-inner">
              <span className="process-number">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{step.title}</h3><p className="text-justify">{step.description}</p></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
