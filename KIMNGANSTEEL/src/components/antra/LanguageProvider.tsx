"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type SiteLanguage = "vi" | "en";

type LanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const TRANSLATIONS: Record<string, string> = {
  "Trang chủ": "Home",
  "Giới thiệu": "About",
  "Sản phẩm": "Products",
  "Năng lực nhà máy": "Factory Capability",
  "Dự án": "Projects",
  "Kinh nghiệm": "Insights",
  "Liên hệ": "Contact",
  "Báo giá": "Get a Quote",
  "Tôn thép": "Steel Products",
  "Gia công": "Fabrication",
  "Phân phối": "Distribution",
  "Vật liệu bền vững cho công trình hiện đại":
    "Lasting materials for modern structures",
  "Nhấn để khám phá": "Enter to Explore",
  "Đang tải": "Loading",
  "Khám phá": "Explore",
  "Khám phá sản phẩm": "Explore Products",
  "Nhận báo giá": "Request a Quote",
  "Nhận báo giá sản phẩm": "Request Product Quote",
  "Xem chi tiết sản phẩm": "View Product Details",
  "Chất lượng": "Quality",
  "Uy tín": "Trust",
  "Bền vững": "Durability",
  "Nhà máy": "Factory",
  "Năng lực sản xuất": "Production Capability",
  "Năng lực thi công": "Construction Capability",
  "Hành trình Kim Ngân": "Kim Ngan Journey",
  "Hành trình thương hiệu": "Brand Journey",
  "Từ nguồn vật liệu đến giá trị công trình":
    "From raw materials to lasting structures",
  "Nguồn hàng chính hãng": "Certified Materials",
  "Chủ động theo quy cách": "Made to Specification",
  "Kiểm soát xuyên suốt": "End-to-End Quality Control",
  "Giao nhận linh hoạt": "Flexible Delivery",
  "Phục vụ đa dạng đối tác": "Serving Every Partner",
  "Một hệ thống khép kín. Một cam kết xuyên suốt.":
    "One integrated system. One enduring commitment.",
  "Các đối tác tiêu biểu": "Strategic Partners",
  "Nhận báo giá tôn thép trực tiếp": "Request a Direct Steel Quote",
  "Gửi yêu cầu báo giá vật tư": "Request a Material Quote",
  "Gửi yêu cầu báo giá": "Submit Quote Request",
  "Gửi yêu cầu thành công!": "Request Submitted Successfully!",
  "Họ và tên": "Full Name",
  "Số điện thoại": "Phone Number",
  "Tên dự án / công ty (tùy chọn)": "Project / Company (Optional)",
  "Nhu cầu quy cách & khối lượng vật tư":
    "Required Specifications & Quantity",
  "Văn phòng & kho xưởng": "Office & Warehouse",
  "Hotline tư vấn 24/7": "24/7 Consultation Hotline",
  "Email báo giá công trình": "Project Quotation Email",
  "Đang xem": "Viewing",
  "Thông số": "Specifications",
  "Ứng dụng": "Applications",
  "Tiêu chuẩn": "Standards",
  "Tôn mạ kẽm": "Galvanized Steel",
  "Tôn mạ màu": "Pre-painted Steel",
  "Tôn lạnh": "Cold Rolled Steel",
  "Thép hộp": "Steel Tube",
  "Xà gồ C": "C-Purlin",
  "Xà gồ Z": "Z-Purlin",
  "Tôn cán sóng": "Corrugated Roofing Sheet",
  "Khám phá vật liệu": "Explore Materials",
  "Kéo để xoay": "Drag to Rotate",
  "Hạng mục": "Category",
  "Khung thép": "Steel Frame",
  "Mái và bao che": "Roofing & Cladding",
  "Scroll để khám phá": "Scroll to Explore",
  "Từ nhà máy đến công trình, một quy trình được kiểm soát chặt chẽ.":
    "From factory to project, every stage is tightly controlled.",
  "Nơi mọi sản phẩm bắt đầu": "Where Every Product Begins",
  "Nguyên liệu được lựa chọn": "Materials Selected with Care",
  "Gia công với độ chính xác cao": "Precision Fabrication",
  "Kiểm soát trước khi xuất xưởng": "Inspected Before Dispatch",
  "Đúng số lượng. Đúng tiến độ.": "Right Quantity. Right on Time.",
  "Vững từ vật liệu. Bền cùng công trình.":
    "Built on Strong Materials. Made to Last.",
  "Quy mô nhà máy": "Factory Scale",
  "Nhà máy cán tôn": "Roofing Production Factory",
  "Gia công thép trực tiếp": "Direct Steel Fabrication",
  "Kiến tạo công trình bền vững": "Building Lasting Structures",
  "Nhà máy cán tôn trực tiếp. Giá cạnh tranh. Giao hàng nhanh 24h.":
    "Direct roofing production. Competitive pricing. Fast 24-hour delivery.",
  "Chính xác trong từng chi tiết": "Precision in Every Detail",
  "Chất lượng trên từng tấm tôn": "Quality in Every Panel",
  "Giữ vững kết cấu bền lâu": "Strength that Endures",
  "Giá trị cốt lõi": "Core Values",
  "Giá trị": "Values",
  "Cốt lõi": "Core",
  "Chuyên nghiệp": "Professional",
  "Sáng tạo": "Innovative",
  "Chúng tôi cung cấp giải pháp vật liệu thép chất lượng cao cho mọi công trình. Bền vững hôm nay, vững chắc tương lai.":
    "We provide high-quality steel solutions for every project. Sustainable today, resilient tomorrow.",
  "Tương tác để tìm hiểu cấu tạo, thông số và ứng dụng của từng loại vật liệu.":
    "Interact to explore the construction, specifications, and applications of each material.",
  "Lớp mạ kẽm": "Zinc Coating",
  "Giúp chống ăn mòn, tăng độ bền vượt trội":
    "Improves corrosion resistance and long-term durability",
  "Bề mặt sáng mịn, đa dạng màu sắc và hoa văn":
    "A smooth finish available in varied colors and patterns",
  "Độ dày": "Thickness",
  "Đa dạng độ dày từ 0.20mm đến 1.20mm":
    "Thickness options from 0.20mm to 1.20mm",
  "Khổ rộng": "Width",
  "Khổ rộng tiêu chuẩn từ 600mm đến 1.250mm":
    "Standard widths from 600mm to 1,250mm",
  "Trọng lượng": "Weight",
  "Trọng lượng cuộn": "Coil Weight",
  "Đáp ứng tiêu chuẩn kỹ thuật từng công trình":
    "Engineered to meet each project's technical requirements",
  "Mạ Kẽm Cuộn": "Galvanized Steel Coil",
  "Sáng bóng / Mờ": "Gloss / Matte",
  "Lưới thép": "Steel Mesh",
  "Đạt tiêu chuẩn quốc tế": "International Standards",
  "Dây chuyền sản xuất tiên tiến": "Advanced Production Lines",
  "Đúng tiến độ, đúng cam kết": "On Schedule, as Promised",
  "Tư vấn giải pháp tối ưu": "Optimized Technical Advice",
  "Ứng dụng vật liệu trong công trình":
    "Material Applications in Construction",
  "Trải nghiệm thực tế cách sắp xếp và phối hợp các chủng loại vật liệu tôn thép Kim Ngân Steel trong kết cấu nhà xưởng công nghiệp.":
    "Explore how Kim Ngan Steel materials work together in real industrial structures.",
  "Hệ mái bao che": "Roofing & Cladding System",
  "Tôn mái": "Roofing Sheet",
  "Tôn Mạ Màu / Tôn Cán Sóng":
    "Pre-painted / Corrugated Roofing",
  "Giải pháp lợp mái tối ưu cho nhà xưởng công nghiệp và công trình thương mại, chịu lực cao, phản nhiệt tốt và độ bền màu trên 15 năm.":
    "An optimized roofing solution for industrial and commercial buildings, engineered for strength, heat reflection, and lasting color.",
  "Kiểu sóng": "Profile",
  "5 sóng / 9 sóng vuông": "5-wave / 9-wave square profile",
  "Lớp mạ": "Coating",
  "Nhôm kẽm / Sơn màu Polyester":
    "Aluminum-zinc / Polyester color coating",
  "Bảo hành": "Warranty",
  "10 - 20 năm": "10 - 20 years",
  "Công trình tiêu biểu": "Featured Projects",
};

const PLACEHOLDER_TRANSLATIONS: Record<string, string> = {
  "Nguyễn Văn A": "John Smith",
  "Công ty CP Xây dựng / Tên công trình...":
    "Company / Project name...",
  "Ví dụ: 500m tôn mạ màu 5 sóng 0.45mm, 10 tấn xà gồ C200...":
    "Example: 500m of 0.45mm pre-painted roofing, 10 tons of C200 purlins...",
};

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function lookupTranslation(value: string) {
  const normalized = normalizeText(value);
  if (!normalized) return null;

  const direct = TRANSLATIONS[normalized];
  if (direct) return direct;

  const lower = normalized.toLocaleLowerCase("vi");
  const key = Object.keys(TRANSLATIONS).find(
    (item) => item.toLocaleLowerCase("vi") === lower,
  );
  return key ? TRANSLATIONS[key] : null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SiteLanguage>("vi");
  const originalTextRef = useRef(new Map<Text, string>());
  const originalPlaceholdersRef = useRef(
    new Map<HTMLInputElement | HTMLTextAreaElement, string>(),
  );

  const setLanguage = useCallback((nextLanguage: SiteLanguage) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("kim-ngan-language", nextLanguage);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("kim-ngan-language");
    if (stored === "vi" || stored === "en") {
      setLanguageState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;

    const originalText = originalTextRef.current;
    const originalPlaceholders = originalPlaceholdersRef.current;

    const translateTextNode = (node: Text) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style, noscript")) return;

      if (language === "vi") {
        const original = originalText.get(node);
        if (original !== undefined) node.nodeValue = original;
        return;
      }

      const value = node.nodeValue ?? "";
      const translated = lookupTranslation(value);
      if (!translated) return;

      if (!originalText.has(node)) originalText.set(node, value);
      const leading = value.match(/^\s*/)?.[0] ?? "";
      const trailing = value.match(/\s*$/)?.[0] ?? "";
      node.nodeValue = `${leading}${translated}${trailing}`;
    };

    const translateElement = (root: ParentNode) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let current = walker.nextNode();
      while (current) {
        translateTextNode(current as Text);
        current = walker.nextNode();
      }

      root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        "input[placeholder], textarea[placeholder]",
      ).forEach((field) => {
        if (!originalPlaceholders.has(field)) {
          originalPlaceholders.set(field, field.placeholder);
        }
        const original = originalPlaceholders.get(field) ?? "";
        field.placeholder =
          language === "en"
            ? PLACEHOLDER_TRANSLATIONS[original] ?? original
            : original;
      });
    };

    translateElement(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            translateTextNode(node as Text);
          } else if (node instanceof Element) {
            translateElement(node);
          }
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
