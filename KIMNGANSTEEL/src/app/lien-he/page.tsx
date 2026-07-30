"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Route,
} from "lucide-react";

const OFFICIAL_CONTACT = {
  company: "Công ty TNHH Tôn Thép Kim Ngân",
  taxCode: "3702871412",
  representative: "Trần Thị Ngọc Hương",
  address: "262 Đường DT742, Khu Phố 1, Phường Vĩnh Tân, TP Hồ Chí Minh, Việt Nam",
  phone: "0707 079 900",
  phoneHref: "0707079900",
  email: "tonthepkimngan20@gmail.com",
};

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Địa chỉ",
    value: OFFICIAL_CONTACT.address,
  },
  {
    icon: Phone,
    label: "Hotline",
    value: OFFICIAL_CONTACT.phone,
  },
  {
    icon: Mail,
    label: "Email",
    value: OFFICIAL_CONTACT.email,
  },
];

const PROMISES = [
  "Báo giá trực tiếp theo quy cách vật tư",
  "Hỗ trợ tư vấn tôn cuộn, thép hộp, thép ống, thép hình và xà gồ",
  "Cung cấp thông tin doanh nghiệp và chứng từ theo yêu cầu",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMsg("Vui lòng nhập họ và tên.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg("Vui lòng nhập số điện thoại.");
      return;
    }
    if (!formData.content.trim()) {
      setErrorMsg("Vui lòng nhập nội dung yêu cầu.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F2] text-[#1A1918] pt-24 md:pt-28 pb-12">
      <section className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.06fr_0.78fr] gap-7 lg:gap-10 items-start">
          <div>
            <p className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-[#C28E5C]">
              LIÊN HỆ & BÁO GIÁ
            </p>
            <h1 className="mt-5 max-w-3xl font-sans font-bold text-[34px] leading-[1.05] sm:text-[46px] lg:text-[52px] tracking-tight text-[#111]">
              Liên hệ trực tiếp với Kim Ngân Steel
            </h1>
          </div>

          <div className="hidden lg:block h-16 w-px bg-[#C28E5C]/45 mt-7" />

          <p className="max-w-xl pt-1 lg:pt-9 text-sm md:text-base leading-relaxed text-[#3F3A36]">
            Đội ngũ kinh doanh Kim Ngân Steel tiếp nhận yêu cầu vật tư, tư vấn
            thông số kỹ thuật và gửi báo giá theo thông tin doanh nghiệp chính thức.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[0.86fr_1fr] gap-8 lg:gap-14 items-start">
          <aside className="pt-1">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-[-0.02em]">
              {OFFICIAL_CONTACT.company}
            </h2>
            <p className="mt-2 font-mono text-xs text-[#625B54]">
              Mã số thuế: {OFFICIAL_CONTACT.taxCode} · ĐDPL: {OFFICIAL_CONTACT.representative}
            </p>
            <div className="mt-4 h-[2px] w-14 bg-[#C28E5C]" />

            <div className="mt-6 space-y-5">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-4">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C28E5C]/45 text-[#C28E5C]">
                      <Icon size={16} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide">
                        {item.label}
                      </p>
                      <p className="mt-1 max-w-lg text-sm leading-relaxed text-[#2D2925]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="my-7 h-px w-full bg-[#1A1918]/12" />

            <div className="space-y-3">
              {PROMISES.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[#2F2B27]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C9A36C] text-white">
                    <Check size={13} strokeWidth={2.4} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>

          <section className="rounded-2xl border border-[#1A1918]/10 bg-white/88 p-5 shadow-[0_18px_55px_rgba(33,28,22,0.08)] backdrop-blur sm:p-6">
            {submitted ? (
              <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="text-[#C28E5C]" size={38} strokeWidth={1.8} />
                <h3 className="mt-4 text-xl font-black uppercase tracking-tight">
                  Đã ghi nhận yêu cầu
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-[#625B54]">
                  Kim Ngân Steel sẽ liên hệ lại để tư vấn kỹ thuật và gửi báo giá.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      phone: "",
                      email: "",
                      company: "",
                      content: "",
                    });
                  }}
                  className="mt-6 rounded-md border border-[#1A1918]/15 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:border-[#C28E5C] hover:text-[#C28E5C]"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                    <AlertCircle size={15} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="Họ và tên"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên"
                  />
                  <Field
                    label="Số điện thoại"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={OFFICIAL_CONTACT.phone}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Nhập email"
                  />
                  <Field
                    label="Tên công ty / dự án"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nhập tên công ty hoặc dự án"
                  />
                </div>

                <label className="block">
                  <span className="text-xs font-bold text-[#2A2622]">
                    Nội dung yêu cầu <span className="text-[#C28E5C]">*</span>
                  </span>
                  <textarea
                    name="content"
                    rows={4}
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Nhập nội dung yêu cầu, quy cách, số lượng, thời gian giao hàng,..."
                    className="mt-2 w-full resize-y rounded-md border border-[#1A1918]/12 bg-white px-3 py-3 text-sm outline-none transition placeholder:text-[#1A1918]/35 focus:border-[#C28E5C] focus:ring-2 focus:ring-[#C28E5C]/15"
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-md bg-[#111] px-5 py-3.5 font-mono text-xs font-black uppercase tracking-[0.13em] text-white transition hover:bg-[#C28E5C] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      Gửi yêu cầu báo giá
                      <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </section>
        </div>

        {/* =========================================================================
            ULTRA-PREMIUM ARCHITECTURAL GOOGLE MAPS SHOWCASE
           ========================================================================= */}
        <section className="mt-10 overflow-hidden rounded-2xl border border-[#E2DDD3] bg-white shadow-md transition-all duration-300">
          
          {/* Card Header Bar */}
          <div className="flex flex-col gap-4 border-b border-[#1A1918]/10 bg-[#FAF9F5] p-5 sm:p-7 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C28E5C]">
                BẢN ĐỒ ĐỊNH VỊ CÔNG TY
              </span>
              <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-[#1A1918] sm:text-2xl">
                CÔNG TY TNHH TÔN THÉP KIM NGÂN
              </h3>
              <p className="text-xs text-[#524D4A] font-sans">
                {OFFICIAL_CONTACT.address}
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+Ty+T%C3%B4n+Th%C3%A9p+Kim+Ng%C3%A2n,+262+%C4%90%C6%B0%E1%BB%9Dng+DT742,+Ph%C6%B0%E1%BB%9Dng+V%C4%A9nh+T%C3%A2n"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1A1918] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#C28E5C] shrink-0"
            >
              <Route size={15} />
              <span>MỞ CHỈ ĐƯỜNG</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Map Stage with Floating Location Badge */}
          <div className="relative h-[340px] w-full sm:h-[420px] lg:h-[460px] bg-[#FAF9F5]">
            <iframe
              title="Bản đồ vị trí Công Ty Tôn Thép Kim Ngân"
              src="https://maps.google.com/maps?q=C%C3%B4ng%20Ty%20T%C3%B4n%20Th%C3%A9p%20Kim%20Ng%C3%A2n%2C%20262%20%C4%90%C6%B0%E1%BB%9Dng%20DT742%2C%20Ph%C6%B0%E1%BB%9Dng%20V%C4%A9nh%20T%C3%A2n&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full pointer-events-none filter contrast-[1.04] saturate-[0.88] brightness-[0.98]"
            />

            {/* Floating Location Overlay Badge */}
            <div className="absolute bottom-5 left-5 z-10 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md border border-[#E2DDD3] p-4 rounded-xl shadow-lg max-w-sm">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F5] border border-[#C28E5C]/30 text-[#C28E5C] flex items-center justify-center shrink-0">
                <MapPin size={20} strokeWidth={1.8} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#C28E5C] uppercase block">
                  KIM NGÂN STEEL
                </span>
                <p className="text-xs font-bold text-[#1A1918] truncate">
                  262 Đường DT742, P. Vĩnh Tân
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+Ty+T%C3%B4n+Th%C3%A9p+Kim+Ng%C3%A2n,+262+%C4%90%C6%B0%E1%BB%9Dng+DT742,+Ph%C6%B0%E1%BB%9Dng+V%C4%A9nh+T%C3%A2n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-[#C28E5C] hover:underline inline-flex items-center gap-0.5"
                >
                  Xem chi tiết chỉ đường ↗
                </a>
              </div>
            </div>

          </div>
        </section>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-[#2A2622]">
        {label} {required && <span className="text-[#C28E5C]">*</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 h-10 w-full rounded-md border border-[#1A1918]/12 bg-white px-3 text-sm outline-none transition placeholder:text-[#1A1918]/35 focus:border-[#C28E5C] focus:ring-2 focus:ring-[#C28E5C]/15"
      />
    </label>
  );
}
