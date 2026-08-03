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

const companyLocation = {
  company: "Công ty TNHH Tôn Thép Kim Ngân",
  taxCode: "3702871412",
  representative: "Trần Thị Ngọc Hương",
  address:
    "262 Đường DT742, Khu Phố 1, Phường Vĩnh Tân, TP Hồ Chí Minh, Việt Nam",
  phone: "0707 079 900",
  phoneHref: "0707079900",
  email: "tonthepkimngan20@gmail.com",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng%20Ty%20TNHH%20T%C3%B4n%20Th%C3%A9p%20Kim%20Ng%C3%A2n%2C%20262%20%C4%90%C6%B0%E1%BB%9Dng%20DT742%2C%20Khu%20Ph%E1%BB%91%201%2C%20Ph%C6%B0%E1%BB%9Dng%20V%C4%A9nh%20T%C3%A2n%2C%20TP%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vi%E1%BB%87t%20Nam",
  mapsEmbedSrc:
    "https://maps.google.com/maps?q=C%C3%B4ng%20Ty%20TNHH%20T%C3%B4n%20Th%C3%A9p%20Kim%20Ng%C3%A2n%2C%20262%20%C4%90%C6%B0%E1%BB%9Dng%20DT742%2C%20Ph%C6%B0%E1%BB%9Dng%20V%C4%A9nh%20T%C3%A2n&t=&z=15&ie=UTF8&iwloc=&output=embed",
};

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Địa chỉ",
    value: companyLocation.address,
  },
  {
    icon: Phone,
    label: "Hotline",
    value: companyLocation.phone,
  },
  {
    icon: Mail,
    label: "Email",
    value: companyLocation.email,
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
  const [copied, setCopied] = useState(false);

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

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(companyLocation.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available — silently ignore
    }
  };

  return (
    <main className="min-h-screen bg-[#ffffff] text-[#064e3b] pt-24 md:pt-28 pb-12">
      <section className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.06fr_0.78fr] gap-7 lg:gap-10 items-start">
          <div>
            <p className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-[#ea580c]">
              LIÊN HỆ & BÁO GIÁ
            </p>
            <h1 className="mt-5 max-w-3xl font-sans font-bold text-[34px] leading-[1.25] sm:text-[46px] lg:text-[52px] tracking-tight text-[#064e3b]">
              LIÊN HỆ TRỰC TIẾP VỚI KIM NGÂN STEEL
            </h1>
          </div>

          <div className="hidden lg:block h-16 w-px bg-[#ea580c]/45 mt-7" />

          <p className="max-w-xl pt-1 lg:pt-9 text-sm md:text-base leading-relaxed text-[#064e3b]">
            Đội ngũ kinh doanh Kim Ngân Steel tiếp nhận yêu cầu vật tư, tư vấn
            thông số kỹ thuật và gửi báo giá theo thông tin doanh nghiệp chính thức.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[0.86fr_1fr] gap-8 lg:gap-14 items-start">
          <aside className="pt-1">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-[-0.02em]">
              {companyLocation.company}
            </h2>
            <div className="mt-4 h-[2px] w-14 bg-[#ea580c]" />

            <div className="mt-6 space-y-5">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-4">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#ea580c]/45 text-[#ea580c]">
                      <Icon size={16} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide">
                        {item.label}
                      </p>
                      <p className="mt-1 max-w-lg text-sm leading-relaxed text-[#064e3b]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="my-7 h-px w-full bg-[#064e3b]/12" />

            <div className="space-y-3">
              {PROMISES.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[#064e3b]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ea580c] text-white">
                    <Check size={13} strokeWidth={2.4} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>

          <section className="rounded-2xl border border-[#064e3b]/10 bg-white/88 p-5 shadow-[0_18px_55px_rgba(33,28,22,0.08)] backdrop-blur sm:p-6">
            {submitted ? (
              <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="text-[#ea580c]" size={38} strokeWidth={1.8} />
                <h3 className="mt-4 text-xl font-black uppercase tracking-tight">
                  Đã ghi nhận yêu cầu
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-[#064e3b]">
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
                  className="mt-6 rounded-md border border-[#064e3b]/15 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:border-[#ea580c] hover:text-[#ea580c]"
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
                    placeholder={companyLocation.phone}
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
                  <span className="text-xs font-bold text-[#064e3b]">
                    Nội dung yêu cầu <span className="text-[#ea580c]">*</span>
                  </span>
                  <textarea
                    name="content"
                    rows={4}
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Nhập nội dung yêu cầu, quy cách, số lượng, thời gian giao hàng,..."
                    className="mt-2 w-full resize-y rounded-md border border-[#064e3b]/12 bg-white px-3 py-3 text-sm outline-none transition placeholder:text-[#064e3b]/35 focus:border-[#ea580c] focus:ring-2 focus:ring-[#ea580c]/15"
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-md bg-[#111] px-5 py-3.5 font-mono text-xs font-black uppercase tracking-[0.13em] text-white transition hover:bg-[#ea580c] disabled:opacity-60"
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

        {/* ================= BẢN ĐỒ ĐỊNH VỊ ================= */}
        <section className="relative mt-10 overflow-hidden rounded-lg border border-[#064e3b]/10 bg-[#ffffff] shadow-[0_20px_45px_rgba(17,17,17,0.08)]">
          <div className="relative h-[620px] sm:h-[640px] lg:h-[700px] overflow-hidden">
            <iframe
              title="Bản đồ vị trí Công Ty Tôn Thép Kim Ngân"
              src={companyLocation.mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-[#000]/30 pointer-events-none" />
            <div className="absolute inset-y-0 left-0 hidden w-[42%] bg-gradient-to-r from-[#000]/92 via-[#000]/48 to-transparent lg:block" />
            <div className="absolute inset-y-0 left-0 hidden h-full w-[42%] lg:flex z-20">
              <div className="flex h-full items-start px-8 py-6 lg:py-10">
                <div className="max-w-[340px]">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.32em] text-[#ffffff]/90">
                    VỊ TRÍ NHÀ MÁY
                  </span>
                  <h3 className="mt-5 text-4xl font-bold tracking-[-0.03em] leading-[1.02] text-[#ffffff] sm:text-5xl antialiased drop-shadow-2xl">
                    TÌM ĐẾN
                    <span className="block text-[#ea580c]">KIM NGÂN STEEL</span>
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-white font-medium">
                    Địa chỉ nhà máy và văn phòng Kim Ngân Steel tại Đường DT742, Phường Vĩnh Tân, TP Hồ Chí Minh.
                  </p>
                  <a
                    href={companyLocation.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#ea580c] bg-transparent px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#ffffff] transition hover:bg-[#c2410c] hover:text-[#064e3b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#ffffff]"
                  >
                    <MapPin size={16} />
                    Mở trên Google Maps ↗
                  </a>
                </div>
              </div>
            </div>

            <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col px-5 py-6 sm:px-8 lg:px-0">
              <div className="lg:hidden mb-6 rounded-[22px] border border-[#064e3b]/10 bg-[#ffffff] p-5 shadow-[0_18px_35px_rgba(17,17,17,0.08)]">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.32em] text-[#064e3b]">
                  VỊ TRÍ NHÀ MÁY
                </span>
                <h3 className="mt-4 text-3xl font-bold tracking-[-0.03em] leading-tight text-[#064e3b]">
                  TÌM ĐẾN
                  <span className="block text-[#ea580c]">KIM NGÂN STEEL</span>
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#064e3b]">
                  Địa chỉ nhà máy và văn phòng Kim Ngân Steel tại Đường DT742, Phường Vĩnh Tân, TP Hồ Chí Minh.
                </p>
                <a
                  href={companyLocation.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#ea580c] bg-transparent px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#064e3b] transition hover:bg-[#c2410c] hover:text-[#064e3b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#ffffff]"
                >
                  <MapPin size={16} />
                  Mở trên Google Maps ↗
                </a>
              </div>

              <div className="relative h-[420px] sm:h-[480px] lg:h-[700px]">
                <a
                  href={companyLocation.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 rounded-[24px] border border-[#064e3b]/10 bg-[#ffffff] px-5 py-4 text-center shadow-[0_18px_36px_rgba(17,17,17,0.14)] transition hover:border-[#ea580c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c]/30"
                  aria-label="Mở Google Maps vị trí Kim Ngân Steel"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ea580c] text-white shadow-[0_12px_24px_rgba(201,143,88,0.24)]">
                    <MapPin size={18} strokeWidth={1.8} />
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#064e3b]">
                    KIM NGÂN STEEL
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#ea580c] shadow-[0_0_0_4px_rgba(201,143,88,0.16)] motion-safe:animate-pulse" />
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
      <span className="text-xs font-bold text-[#064e3b]">
        {label} {required && <span className="text-[#ea580c]">*</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 h-10 w-full rounded-md border border-[#064e3b]/12 bg-white px-3 text-sm outline-none transition placeholder:text-[#064e3b]/35 focus:border-[#ea580c] focus:ring-2 focus:ring-[#ea580c]/15"
      />
    </label>
  );
}