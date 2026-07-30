# Kế hoạch Triển khai Kim Ngân Steel — Tổng quan Codebase

> **Dành cho các tác vụ agentic:** YÊU CẦU KỸ NĂNG PHỤ: Sử dụng superpowers:subagent-driven-development (khuyến nghị) hoặc superpowers:executing-plans để triển khai kế hoạch này theo từng nhiệm vụ. Các bước sử dụng cú pháp dấu tích (`- [ ]`) để theo dõi tiến độ.

**Mục tiêu:** Ghi lại kiến trúc, trạng thái hiện tại và các khoảng trống của website Kim Ngân Steel để mọi kế hoạch triển khai tiếp theo có ngữ cảnh đầy đủ.

**Kiến trúc:** Next.js 16 App Router, React 19, Tailwind CSS 4. Trang chủ dùng scroll-driven hero (GSAP + Three.js). Các trang con là client components tự chứa data + animation. Layout global bọc Header, Footer, SmoothScroll (Lenis), CustomCursor, LanguageProvider (i18n DOM-based).

**Công nghệ sử dụng:** Next.js 16.2, React 19, GSAP 3.15, Framer Motion 12, Lenis, Three.js / React Three Fiber, Tailwind 4, shadcn/ui, Lucide icons.

---

## Bản đồ Tệp (File Structure)

```
KimNganSteel/
├── README.md                          # Chỉ có tiêu đề repo
├── package.json                       # Workspace root (minimal)
└── KIMNGANSTEEL/                      # Ứng dụng Next.js chính
    ├── package.json                   # ai-website-clone-template v0.3.1
    ├── next.config.ts                 # output: standalone, Unsplash images
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx             # Root layout + nav + providers
    │   │   ├── page.tsx               # → AntraClone (trang chủ)
    │   │   ├── globals.css            # Design tokens, antra-theme, hero CSS
    │   │   ├── gioi-thieu/page.tsx    # About (~1048 dòng, inline data)
    │   │   ├── san-pham/page.tsx      # Products (~927 dòng, inline data)
    │   │   ├── nang-luc-nha-may/page.tsx  # Factory (~595 dòng)
    │   │   ├── lien-he/page.tsx       # Contact + Google Maps
    │   │   └── du-an/page.tsx         # redirect("/")
    │   ├── components/
    │   │   ├── antra/                 # 30+ section components
    │   │   └── ui/button.tsx          # shadcn button
    │   ├── types/antra.ts             # NavItem, ServiceCard, ProjectCard, ProcessStep
    │   └── lib/utils.ts               # cn() helper
    ├── public/                        # SVG models, assets (một phần thiếu — xem Gaps)
    └── scripts/sync-hero-sequence.mjs   # Pre-dev/build: sync hero SVG frames
```

### Trách nhiệm từng lớp

| Tệp / Thư mục | Trách nhiệm |
|---|---|
| `layout.tsx` | Font (Be Vietnam Pro, Dancing Script), metadata, shell toàn site |
| `AntraClone.tsx` | Orchestrator trang chủ: IntroScreen gate, GSAP scroll reveals, 10 sections |
| `HeroSection` → `HeroSequence` | Sticky scroll hero 680–800svh, frame animation từ SVG sequence |
| `LanguageProvider.tsx` | i18n vi/en qua DOM MutationObserver + dictionary ~157 entries |
| `Header.tsx` | Nav, search overlay, language toggle, mobile menu |
| `gioi-thieu/page.tsx` | Monolith: hero, brand system pin, financial metrics, timeline, certs |
| `san-pham/page.tsx` | Monolith: 7 products, filter, modals báo giá |
| `nang-luc-nha-may/page.tsx` | Monolith: VERIFIED_COMPANY_DATA, process, brands |
| `lien-he/page.tsx` | Form mock submit, official contact, embedded map |

---

## Trang & Route

| Route | Trạng thái | Ghi chú |
|---|---|---|
| `/` | Hoàn thiện cao | IntroScreen (sessionStorage), 10 sections |
| `/gioi-thieu` | Hoàn thiện cao | GSAP pin brand system, cert lightbox |
| `/san-pham` | Hoàn thiện cao | 7 sản phẩm, filter, 2 modals |
| `/nang-luc-nha-may` | Hoàn thiện cao | Dữ liệu verified công ty |
| `/lien-he` | Hoàn thiện vừa | Form chỉ mock (setTimeout), chưa API |
| `/du-an` | Redirect → `/` | PortfolioSection link `/du-an` bị broken |
| `/kinh-nghiem` | **ĐÃ XÓA** | Header search vẫn trỏ tới route này → 404 |

---

## Trang chủ — Sections trong `AntraClone`

1. `IntroScreen` — gate lần đầu (sessionStorage `kn_has_seen_intro`)
2. `HeroSection` — scroll sequence
3. `PrecisionStackSection`
4. `BuildStatementSection`
5. `MaterialsManifestoSection`
6. `MaterialExplorerSection` — interactive 3D materials
7. `BuildingApplicationSection` — hotspot museum
8. `PortfolioSection` — featured projects
9. `FactoryStorySection`
10. `PartnersSection`
11. `ContactFormSection`

**Import nhưng không render:** `CoreValuesSection`, `EditorialScrollFlow`

**Components tồn tại nhưng không được dùng ở đâu:** `ServicesSection`, `ProcessSection`, `AboutSection`, `ProductSection`, `FinancialCapabilitySection`, `CertificatesGallerySection`, `Preloader`, `HeroAssembly`

---

## Design System

| Token | Giá trị | Dùng cho |
|---|---|---|
| `#1A1918` | Ink / text chính | Headlines, buttons |
| `#C28E5C` | Gold accent | Eyebrows, CTAs, highlights |
| `#ECE8DE` / `#FAF9F5` / `#F7F7F4` | Backgrounds sáng | Sections |
| `#0E0E0D` | Dark shell | Body wrapper layout |
| `#524D4A` | Muted text | Body copy |
| Font sans | Be Vietnam Pro | Toàn site |
| Font mono | system monospace | Labels, tracking uppercase |
| `.antra-theme` | Class wrapper | Override theme per page |

---

## Dữ liệu Công ty (Source of Truth)

Hai nơi lặp lại — cần hợp nhất nếu mở rộng:

- `nang-luc-nha-may/page.tsx` → `VERIFIED_COMPANY_DATA`
- `lien-he/page.tsx` → `OFFICIAL_CONTACT`

```
Công ty TNHH Tôn Thép Kim Ngân
MST: 3702871412
ĐDPL: Trần Thị Ngọc Hương
Địa chỉ: 262 Đường DT742, Khu Phố 1, P. Vĩnh Tân, TP.HCM
Phone: 0707 079 900
Email: tonthepkimngan20@gmail.com
```

---

## Gaps & Rủi ro (Phát hiện từ audit)

### 1. Broken links
- `/kinh-nghiem` — page deleted, Header search có 4 mục trỏ tới
- `/du-an` — redirect home, PortfolioSection CTA broken

### 2. Assets thiếu trong `public/` (code tham chiếu nhưng glob chỉ thấy 11 SVG mới)
Code reference nhiều file không có trong glob: `/nha_xuong.png`, `/ton_can_song.svg`, `/partners/*.svg`, `/certificates/*.svg`, `/factory_story/*.svg`, hero sequence numbered SVGs, v.v.

### 3. i18n không đầy đủ
- `LanguageProvider` dịch text node exact-match — uppercase nav ("Trang Chủ" vs "Trang chủ") không khớp
- Nội dung dài trong page monoliths không có trong dictionary
- Không dịch attributes (aria-label, alt)

### 4. Forms không có backend
- `ContactFormSection`, `san-pham` quote modal, `lien-he` form — tất cả mock client-side

### 5. Không có test suite
- `package.json` scripts: lint, typecheck, build — không có jest/vitest/playwright config riêng

### 6. Monolith pages
- `gioi-thieu`, `san-pham` >900 dòng mỗi file — khó bảo trì, khó i18n

### 7. Data duplication
- Product data trong `san-pham/page.tsx` vs `MaterialExplorerSection` vs `ProductSection` (unused)

---

## Luồng Kỹ thuật Quan trọng

### Hero Sequence
```
npm run dev
  → predev: sync-hero-sequence.mjs
  → đọc public/hero-sequence/*.svg (numbered)
  → HeroSequence.tsx animate frames theo scroll (GSAP ScrollTrigger)
```

### Smooth Scroll
`SmoothScroll.tsx` wraps Lenis; tương tác với GSAP ScrollTrigger (cần refresh sau IntroScreen)

### Scroll Lock
Pattern lặp: `document.body.dataset.scrollLock`, overflow hidden — dùng trong IntroScreen, cert modal, lightbox

---

## Các Workstream Đề xuất (Kế hoạch con — chọn 1 để triển khai)

| # | Workstream | Ưu tiên | Phạm vi chính |
|---|---|---|---|
| A | Sửa broken routes | Cao | `/du-an`, `/kinh-nghiem`, Header search |
| B | Centralize company + product data | Cao | `src/data/company.ts`, `src/data/products.ts` |
| C | Form backend (email/API) | Trung bình | API route + validation + spam protection |
| D | i18n refactor | Trung bình | next-intl hoặc structured translations |
| E | Asset audit & missing files | Cao | Script verify references vs public/ |
| F | Tách monolith pages | Thấp | Extract sections → components |
| G | Test & CI | Trung bình | Playwright smoke + typecheck in CI |

---

## Self-Review

**1. Spec coverage:** Đây là tài liệu khảo sát, không có spec tính năng cụ thể — gaps được liệt kê để chọn workstream.

**2. Placeholder scan:** Không có TBD/TODO trong tài liệu này.

**3. Type consistency:** N/A — không có code tasks trong overview này.

---

## Bước Tiếp theo

Chọn **một workstream** (A–G) hoặc mô tả tính năng mới → tạo kế hoạch triển khai chi tiết (TDD, bite-sized tasks) riêng tại:

`docs/superpowers/plans/2026-07-30-<feature-name>.md`
