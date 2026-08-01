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
  "NHÀ THÉP TIỀN CHẾ KHỔ RỘNG": "WIDE-SPAN PRE-ENGINEERED STEEL BUILDING",
  "KCN PHÚ MỸ, BÀ RỊA - VŨNG TÀU": "PHU MY INDUSTRIAL PARK, BA RIA - VUNG TAU",
  "Nhà Thép Khổ Rộng - 30,000 m² - 2024": "Wide-Span Steel Building - 30,000 m² - 2024",
  "Tôn Seamlock Chống Rò Rỉ": "Leak-Proof Seamlock Roofing",
  "Cột Thép Hình H SS400": "SS400 H-Beam Steel Column",
  "Xà Gồ Z Nối Chồng Cường Độ Cao": "High-Strength Overlapping Z-Purlin",
  "Tôn Cách Nhiệt Glasswool": "Glasswool Insulated Roofing",
  "Nhà máy và kho vật liệu được tổ chức để chủ động từ nguyên liệu đầu vào đến thành phẩm.": "The factory and material warehouse are organized to take initiative from input materials to finished products.",
  "Vui lòng cung cấp quy cách, độ dày và khối lượng vật tư dự kiến. Đội ngũ kinh doanh Kim Ngân Steel sẽ tiếp nhận yêu cầu và gửi báo giá theo thông tin doanh nghiệp chính thức.": "Please provide specifications, thickness, and estimated material volume. The Kim Ngan Steel sales team will receive your request and send an official quote.",
  "01 / VĂN PHÒNG & KHO XƯỞNG": "01 / OFFICE & WAREHOUSE",
  "02 / HOTLINE TƯ VẤN 24/7": "02 / 24/7 CONSULTATION HOTLINE",
  "03 / EMAIL BÁO GIÁ CÔNG TRÌNH": "03 / PROJECT QUOTE EMAIL",
  "HỌ VÀ TÊN *": "FULL NAME *",
  "SỐ ĐIỆN THOẠI *": "PHONE NUMBER *",
  "NHU CẦU QUY CÁCH & KHỐI LƯỢNG VẬT TƯ *": "MATERIAL SPECS & VOLUME NEEDED *",
  "Điền thông tin bên dưới để nhận tư vấn thông số kỹ thuật và báo giá chi tiết.": "Fill out the information below to receive technical consultation and a detailed quote.",
  "GIA CÔNG CÁN TÔN & PHÂN PHỐI THÉP XÂY DỰNG CHẤT LƯỢNG CAO.": "ROLL FORMING & DISTRIBUTION OF HIGH-QUALITY CONSTRUCTION STEEL.",
  "ĐIỀU HƯỚNG": "NAVIGATION",
  "Liên hệ báo giá": "Contact for Quote",
  "THÔNG TIN": "INFORMATION",
  "262 Đường DT742, Khu Phố 1, P. Vĩnh Tân, TP. HCM": "262 DT742 Road, Quarter 1, Vinh Tan Ward, HCMC",
  "MST: 3702871412": "TAX ID: 3702871412",
  "MST:": "TAX ID:",
  "NHÀ XƯỞNG SẢN XUẤT TỰ ĐỘNG HÓA": "AUTOMATED PRODUCTION FACTORY",
  "KCN VSIP II, BÌNH DƯƠNG": "VSIP II INDUSTRIAL PARK, BINH DUONG",
  "Nhà Xưởng Công Nghiệp - 15,000 m² - 2025": "Industrial Factory - 15,000 m² - 2025",
  "TRUNG TÂM LOGISTICS THÔNG MINH": "SMART LOGISTICS CENTER",
  "Địa Điểm:": "Location:",
  "Quy Mô / Năm:": "Scale / Year:",
  "Hạng Mục:": "Category:",
  "TP. THỦ ĐỨC, TP.HCM": "THU DUC CITY, HCMC",
  "22,000 m² - 2025": "22,000 m² - 2025",
  "Vách Bao Che Chống Nóng & Hệ Khung Thép": "Heat-Insulating Wall Cladding & Steel Frame System",
  "VẬT LIỆU ỨNG DỤNG:": "APPLIED MATERIALS:",
  "Tôn Vách Mạ Màu Sóng Vuông": "Color-Coated Square Wave Wall Panel",
  "Thép Hộp Vuông 200x200 mm": "Square Steel Tube 200x200 mm",
  "Xà Gồ C Mạ Kẽm Z275": "Z275 Galvanized C-Purlin",
  "Tôn Lấy Sáng Polycarbonate": "Polycarbonate Skylight Roofing",
  "XEM CHI TIẾT CASE STUDY": "VIEW CASE STUDY DETAILS",
  "TỔ HỢP THƯƠNG MẠI & TỔNG KHO KỸ THUẬT": "COMMERCIAL COMPLEX & TECHNICAL WAREHOUSE",
  "KCN LONG THÀNH, ĐỒNG NAI": "LONG THANH INDUSTRIAL PARK, DONG NAI",
  "18,500 m² - 2024": "18,500 m² - 2024",
  "Kết Cấu Khung Kèo Mái Vòm & Tôn Mạ Màu": "Arch Roof Truss Structure & Color-Coated Roofing",
  "Tôn Mạ Màu Khổ Rộng": "Wide Color-Coated Roofing",
  "Thép Khung Kèo Tiền Chế Q345B": "Q345B Pre-Engineered Steel Truss",
  "Tôn Sóng Vuông Vách 9 Sóng": "9-Wave Square Wave Wall Panel",
  "Máng Xối Thép Mạ Kẽm": "Galvanized Steel Gutter",
  "ỨNG DỤNG VẬT LIỆU": "MATERIAL APPLICATIONS",
  "TRONG CÔNG TRÌNH": "IN CONSTRUCTION",
  "ỨNG DỤNG VẬT LIỆU TRONG CÔNG TRÌNH": "MATERIAL APPLICATIONS IN CONSTRUCTION",
  "LIÊN HỆ TRỰC TIẾP VỚI KIM NGÂN STEEL": "CONTACT KIM NGAN STEEL DIRECTLY",
  "CÔNG TY TNHH TÔN THÉP KIM NGÂN": "KIM NGAN STEEL CO., LTD",
  "ĐỊA CHỈ": "ADDRESS",
  "262 Đường DT742, Khu Phố 1, Phường Vĩnh Tân, TP Hồ Chí Minh, Việt Nam": "262 DT742 Road, Quarter 1, Vinh Tan Ward, Ho Chi Minh City, Vietnam",
  "HOTLINE": "HOTLINE",
  "EMAIL": "EMAIL",
  "Báo giá trực tiếp theo quy cách vật tư": "Direct quotes based on material specifications",
  "Hỗ trợ tư vấn tôn cuộn, thép hộp, thép ống, thép hình và xà gồ": "Consultation for steel coils, tubes, pipes, structural steel, and purlins",
  "Cung cấp thông tin doanh nghiệp và chứng từ theo yêu cầu": "Provide company info and documentation upon request",
  "Đội ngũ kinh doanh Kim Ngân Steel tiếp nhận yêu cầu vật tư, tư vấn thông số kỹ thuật và gửi báo giá theo thông tin doanh nghiệp chính thức.": "Kim Ngan Steel's sales team receives material requests, provides technical specs consultation, and sends official corporate quotes.",
  "Nhập họ và tên": "Enter full name",
  "Nhập email": "Enter email",
  "Nhập tên công ty hoặc dự án": "Enter company or project name",
  "Nhập nội dung yêu cầu, quy cách, số lượng, thời gian giao hàng....": "Enter request details, specs, quantity, delivery time...",
  "03 / NĂNG LỰC SẢN XUẤT": "03 / PRODUCTION CAPACITY",
  "NĂNG LỰC GIA CÔNG VÀ PHÂN PHỐI TÔN THÉP": "STEEL FABRICATION & DISTRIBUTION CAPACITY",
  "Đầu tư máy móc, phương tiện vận tải và trang thiết bị chuyên dụng phục vụ sản xuất, kinh doanh tôn thép.": "Investing in machinery, transport vehicles, and specialized equipment for steel production and business.",
  "Công ty TNHH Tôn Thép Kim Ngân đầu tư hệ thống máy móc, phương tiện vận tải và trang thiết bị phục vụ hoạt động sản xuất xà gồ, thép ống, tôn và các sản phẩm thép khác. Trong quá trình hoạt động, Kim Ngân đã cung cấp nhiều sản phẩm tôn thép cho các dự án trên thị trường, đồng thời mang đến các giải pháp giúp khách hàng tiết kiệm thời gian và chi phí.": "Kim Ngan Steel Co., Ltd. invests in machinery, transport, and equipment to produce purlins, steel pipes, roofing, and other steel products. In our operations, Kim Ngan has supplied numerous steel products for market projects, while delivering solutions that help clients save time and costs.",
  "NĂNG LỰC VẬN HÀNH": "OPERATIONAL CAPACITY",
  "MÁY MÓC CHUYÊN DỤNG": "SPECIALIZED MACHINERY",
  "Trang thiết bị phục vụ sản xuất và kinh doanh tôn, xà gồ, thép ống và các sản phẩm thép.": "Equipment for the production and business of roofing, purlins, steel pipes, and steel products.",
  "PHƯƠNG TIỆN VẬN TẢI": "TRANSPORT VEHICLES",
  "Chủ động phương tiện phục vụ giao nhận hàng hóa và đáp ứng nhu cầu của khách hàng.": "Proactive transport fleet for goods delivery and meeting customer demands.",
  "DANH MỤC ĐA DẠNG": "DIVERSE PORTFOLIO",
  "Tôn cuộn, tôn lợp, thép hộp, thép ống, thép hình, thép xây dựng và xà gồ.": "Steel coil, roofing sheet, steel tube, steel pipe, structural steel, construction steel, and purlins.",
  "GIẢI PHÁP TỐI ƯU": "OPTIMAL SOLUTIONS",
  "Hỗ trợ khách hàng tiết kiệm thời gian, chi phí và lựa chọn sản phẩm phù hợp với nhu cầu.": "Assisting customers to save time, costs, and select products suited to their needs.",
  "01 / DANH MỤC SẢN PHẨM": "01 / PRODUCT PORTFOLIO",
  "VẬT LIỆU THÉP CHO MỌI QUY MÔ CÔNG TRÌNH": "STEEL MATERIALS FOR PROJECTS OF ALL SCALES",
  "Gia công theo quy cách": "Custom specifications",
  "Giao vận 24h": "24h delivery",
  "01 / CÂU CHUYỆN KIM NGÂN": "01 / KIM NGAN STORY",
  "MỘT DẤU ẤN ĐƯỢC XÂY BẰNG SỰ TIN CẬY.": "A MARK BUILT ON TRUST.",
  "Gia công cán tôn, phân phối vật liệu chính hãng và đồng hành cùng tiến độ công trình.": "Roll-forming roofing, distributing genuine materials, and accompanying project progress.",
  "KHÁM PHÁ CÂU CHUYỆN": "EXPLORE THE STORY",
  "NHÀ MÁY & KHO BÃI": "FACTORY & WAREHOUSE",
  "DÂY CHUYỀN CÁN TÔN CNC": "CNC ROLL FORMING LINES",
  "GIAO VẬN TẬN CHÂN CÔNG TRÌNH": "DELIVERY TO PROJECT SITE",
  "NỖ LỰC": "EFFORT",
  "CHUYÊN NGHIỆP": "PROFESSIONAL",
  "SÁNG TẠO": "INNOVATIVE",
  "UY TÍN": "TRUST",
  "BỀN VỮNG": "DURABILITY",
  "01 / QUY MÔ NHÀ MÁY": "01 / FACTORY SCALE",
  "NHÀ MÁY CÁN TÔN": "ROOFING PRODUCTION FACTORY",
  "GIA CÔNG THÉP TRỰC TIẾP": "DIRECT STEEL FABRICATION",
  "KIM NGÂN STEEL": "KIM NGAN STEEL",
  "Vật liệu vững chắc": "Solid Materials",
  "VẬT LIỆU VỮNG CHẮC": "SOLID MATERIALS",
  "TÔN CUỘN": "STEEL COIL",
  "Tôn Cuộn Tiêu Chuẩn": "Standard Steel Coil",
  "01 BỀ MẶT SÁNG BÓNG": "01 SHINY SURFACE",
  "Lớp mạ kẽm/mạ hợp kim chống ăn mòn": "Anti-corrosion zinc/alloy coating",
  "02 ĐỘ DÀY CÁN": "02 ROLLING THICKNESS",
  "03 KHỔ RỘNG": "03 WIDTH",
  "Khổ tiêu chuẩn 1.200mm / 1.220mm": "Standard width 1,200mm / 1,220mm",
  "04 TRỌNG LƯỢNG": "04 WEIGHT",
  "Cuộn lớn từ 3 - 8 tấn": "Large coils from 3 - 8 tons",
  "05 ĐÓNG GÓI": "05 PACKAGING",
  "Bọc chống ẩm, cố định đai thép": "Moisture-proof wrapping, steel strapping",
  "0.20 - 1.20 mm": "0.20 - 1.20 mm",
  "914 - 1.250 mm": "914 - 1,250 mm",
  "Cán tôn lợp mái nhà xưởng": "Corrugated roofing for factories",
  "Sản xuất ống thép, thép hộp": "Production of steel pipes, tubes",
  "Xà gồ cán nguội": "Cold-rolled purlins",
  "THÉP HỘP": "STEEL TUBE",
  "Thép Hộp Vuông & Chữ Nhật": "Square & Rectangular Steel Tube",
  "01 ĐƯỜNG HÀN ERW": "01 ERW WELDING",
  "Mối hàn cao tần siêu âm chắc chắn": "Solid high-frequency ultrasonic weld",
  "02 ĐỘ DÀY THÀNH": "02 WALL THICKNESS",
  "Đa dạng độ dày từ 0.7mm đến 3.5mm": "Varied thickness from 0.7mm to 3.5mm",
  "03 LỚP MẠ KẼM": "03 ZINC COATING",
  "Bảo vệ bề mặt chống gỉ sét": "Anti-rust surface protection",
  "04 QUY CÁCH": "04 SPECIFICATIONS",
  "Vuông 12x12 đến 100x100mm": "Square 12x12 to 100x100mm",
  "05 BÓ KỆ": "05 BUNDLING",
  "Đóng bó tiêu chuẩn 6m/cây": "Standard bundling 6m/piece",
  "Quy cách vuông": "Square specs",
  "12x12 đến 100x100 mm": "12x12 to 100x100 mm",
  "Quy cách chữ nhật": "Rectangular specs",
  "10x20 đến 100x200 mm": "10x20 to 100x200 mm",
  "0.7 - 3.5 mm": "0.7 - 3.5 mm",
  "Chiều dài": "Length",
  "6m (Cắt theo yêu cầu)": "6m (Cut to order)",
  "Khung giàn chịu lực": "Load-bearing frames",
  "Lan can, cửa cổng": "Railings, gates",
  "Kết cấu thép dân dụng": "Civil steel structures",
  "THÉP ỐNG": "STEEL PIPE",
  "Thép ỐNG Tròn Đen / Mạ Kẽm": "Black / Galvanized Round Steel Pipe",
  "01 ĐƯỜNG KÍNH ĐA DẠNG": "01 VARIED DIAMETERS",
  "Từ Ø21.2mm đến Ø114.3mm": "From Ø21.2mm to Ø114.3mm",
  "02 ĐỘ DÀY TƯỜNG ỐNG": "02 WALL THICKNESS",
  "Từ 0.9mm đến 4.0mm chịu lực tốt": "From 0.9mm to 4.0mm, strong bearing",
  "03 BỀ MẶT THÉP": "03 STEEL SURFACE",
  "Ống đen hoặc mạ kẽm bảo vệ": "Black pipe or galvanized protection",
  "04 MỐI HÀN TỰ ĐỘNG": "04 AUTOMATIC WELDING",
  "Công nghệ hàn cao tần": "High-frequency welding tech",
  "Sử dụng cho ống nước, PCCC, giàn giáo": "Used for water pipes, fire protection, scaffolding",
  "Đường kính ngoài": "Outer diameter",
  "Ø21.2 - Ø114.3 mm": "Ø21.2 - Ø114.3 mm",
  "0.9 - 4.0 mm": "0.9 - 4.0 mm",
  "6m tiêu chuẩn": "6m standard",
  "Bề mặt": "Surface",
  "Đen / Mạ kẽm": "Black / Galvanized",
  "Hệ thống PCCC": "Fire protection systems",
  "Ống dẫn nước": "Water pipes",
  "Khung giàn giáo chịu lực": "Load-bearing scaffolding frames",
  "TÔN LỢP": "ROOFING SHEET",
  "Tôn Lợp Cán Sóng Lạnh / Màu": "Cold / Color Corrugated Roofing",
  "01 CẤU TRÚC BIÊN DẠNG": "01 PROFILE STRUCTURE",
  "Sóng vuông cứng cáp, thoát nước tốt": "Sturdy square wave, good drainage",
  "02 ĐỘ DÀY BỀ MẶT": "02 SURFACE THICKNESS",
  "Đa dạng từ 0.30mm đến 0.60mm": "Varied from 0.30mm to 0.60mm",
  "03 SỐ LƯỢNG SÓNG": "03 NUMBER OF WAVES",
  "Tôn 5 sóng, 9 sóng, 11 sóng": "5-wave, 9-wave, 11-wave roofing",
  "04 CHIỀU CAO SÓNG": "04 WAVE HEIGHT",
  "Chiều cao sóng tiêu chuẩn 21-32mm": "Standard wave height 21-32mm",
  "Mái nhà xưởng, biệt thự dân dụng": "Factory roofs, civil villas",
  "Biên dạng": "Profile",
  "5 sóng / 9 sóng / 11 sóng": "5 waves / 9 waves / 11 waves",
  "0.30 - 0.60 mm": "0.30 - 0.60 mm",
  "Khổ hữu dụng": "Usable width",
  "1.000 - 1.070 mm": "1,000 - 1,070 mm",
  "Cắt theo yêu cầu": "Cut to order",
  "Lợp mái nhà xưởng": "Factory roofing",
  "Lợp mái nhà ở, kho bãi": "Residential and warehouse roofing",
  "Vách ngăn che chắn": "Shielding partitions",
  "XÀ GỒ C": "C-PURLIN",
  "Xà Gồ Mạ Kẽm Định Hình C": "Galvanized C-shaped Purlin",
  "01 ĐỤC LỖ TỰ ĐỘNG": "01 AUTOMATIC PUNCHING",
  "Đột lỗ oval, lỗ tròn vi tính theo bản vẽ thiết kế": "Computerized oval/round punching per design",
  "02 CƯỜNG ĐỘ THÉP CAO": "02 HIGH STEEL STRENGTH",
  "Thép mạ kẽm cường độ cao G350 - G450 MPa": "High-strength galvanized steel G350 - G450 MPa",
  "03 TIẾT DIỆN HÌNH C": "03 C-SECTION",
  "Mặt cắt hình chữ C ôm sát khung chịu lực công trình": "C-shaped cross-section hugs the structural frame",
  "04 QUY CÁCH C": "04 C SPECIFICATIONS",
  "Chiều cao C80 - C300mm, độ dày 1.5mm - 3.2mm": "Height C80 - C300mm, thickness 1.5mm - 3.2mm",
  "Phù hợp khung giàn đòn tay, vách nhà xưởng": "Suitable for purlin frames, factory walls",
  "Chiều cao C": "C Height",
  "C80 - C300 mm": "C80 - C300 mm",
  "1.5 - 3.2 mm": "1.5 - 3.2 mm",
  "Cường độ thép": "Steel strength",
  "G350 - G450 MPa": "G350 - G450 MPa",
  "Z120 - Z275 (g/m²)": "Z120 - Z275 (g/m²)",
  "Đột lỗ vi tính": "Computer punching",
  "Đột lỗ oval/tròn tự động": "Automatic oval/round punching",
  "Xuất xứ": "Origin",
  "Hoa Sen, Nam Kim, POSCO, BlueScope": "Hoa Sen, Nam Kim, POSCO, BlueScope",
  "Đòn tay lợp mái nhà xưởng công nghiệp": "Industrial factory roof purlins",
  "Khung vách công trình nhà thép tiền chế": "Pre-engineered steel building wall frames",
  "Hệ đòn đệm sàn nâng chịu lực": "Load-bearing raised floor joist system",
  "XÀ GỒ Z": "Z-PURLIN",
  "Xà Gồ Mạ Kẽm Nối Chồng": "Overlapping Galvanized Purlin",
  "01 CÁNH CHÊNH NỐI CHỒNG": "01 OVERLAPPING FLANGE",
  "Khả năng gối chồng (Lap) tăng cứng khẩu độ nhà xưởng": "Lapping capability increases factory span stiffness",
  "04 QUY CÁCH Z": "04 Z SPECIFICATIONS",
  "Chiều cao Z150 - Z300mm, độ dày 1.5mm - 3.2mm": "Height Z150 - Z300mm, thickness 1.5mm - 3.2mm",
  "Phù hợp công trình mái khẩu độ lớn >24m": "Suitable for large span roofs >24m",
  "Chiều cao Z": "Z Height",
  "Z150 - Z300 mm": "Z150 - Z300 mm",
  "Gối chồng (Lap)": "Lapping (Lap)",
  "Tăng chịu tải 25%": "Increases load-bearing by 25%",
  "Mái khẩu độ lớn >24m nhà xưởng công nghiệp": "Large span roofs >24m for industrial factories",
  "Khung vách nhà thép tiền chế": "Pre-engineered steel wall frames",
  "Hệ đòn tay trung chuyển kho bãi": "Warehouse transfer purlin system",
  "THÉP XÂY DỰNG": "CONSTRUCTION STEEL",
  "Thép Cuộn & Thép Cây Cốt Bê Tông": "Coil & Rebar Concrete Steel",
  "01 GÂN THÉP BÁM DÍNH": "01 ADHESIVE STEEL RIBS",
  "Gân vằn sâu giúp bám dính bê tông tối đa": "Deep ribs for maximum concrete adhesion",
  "02 ĐƯỜNG KÍNH ĐA DẠNG": "02 VARIED DIAMETERS",
  "Thép cuộn Ø6-Ø8, thép cây Ø10-Ø32": "Coil Ø6-Ø8, rebar Ø10-Ø32",
  "03 MÁC THÉP CAO": "03 HIGH STEEL GRADE",
  "CB300, CB400, CB500 chịu lực kéo/uốn tốt": "CB300, CB400, CB500 good tensile/bending strength",
  "04 THƯƠNG HIỆU UY TÍN": "04 REPUTABLE BRANDS",
  "Hòa Phát, Pomina, Miền Nam, Việt Nhật": "Hoa Phat, Pomina, Mien Nam, Viet Nhat",
  "05 ỨNG DỤNG": "05 APPLICATIONS",
  "Cốt thép bê tông móng, cột, dầm, sàn": "Concrete reinforcement for foundations, columns, beams, slabs",
  "Loại thép": "Steel type",
  "Cuộn (Trơn) / Cây (Vằn)": "Coil (Plain) / Rebar (Ribbed)",
  "Đường kính": "Diameter",
  "Cuộn: Ø6, Ø8 / Cây: Ø10 - Ø32": "Coil: Ø6, Ø8 / Rebar: Ø10 - Ø32",
  "Mác thép": "Steel grade",
  "CB300-V, CB400-V, CB500-V": "CB300-V, CB400-V, CB500-V",
  "Đóng gói": "Packaging",
  "Cuộn (~1 tấn) / Bó cây (~2.5 tấn)": "Coil (~1 ton) / Rebar bundle (~2.5 tons)",
  "Đổ móng, cột, dầm sàn bê tông cốt thép": "Casting foundations, columns, reinforced concrete beams",
  "Thi công hạ tầng cầu đường, thủy lợi": "Infrastructure construction for roads and bridges",
  "Công trình dân dụng và công nghiệp nặng": "Civil engineering and heavy industrial works",
  "THÉP HÌNH": "STRUCTURAL STEEL",
  "Thép Hình H, U, I, V": "H, U, I, V Structural Steel",
  "01 ĐA DẠNG TIẾT DIỆN": "01 VARIED SECTIONS",
  "Hình chữ H, U, I, V đa quy cách": "H, U, I, V sections in varied specs",
  "02 ĐỘ DÀY BỤNG THÉP": "02 WEB THICKNESS",
  "Phân bố tiết diện tối ưu chịu tải trọng": "Optimized cross-section distribution for load bearing",
  "03 MÁC THÉP CÔNG NGHIỆP": "03 INDUSTRIAL STEEL GRADE",
  "SS400, A36, Q235, Q345": "SS400, A36, Q235, Q345",
  "04 ĐỘ CỨNG CAO": "04 HIGH RIGIDITY",
  "Không biến dạng dưới lực ép/kéo ngang": "No deformation under lateral compressive/tensile forces",
  "05 QUY CÁCH CHIỀU DÀI": "05 LENGTH SPECIFICATIONS",
  "Chiều dài tiêu chuẩn 6m, 12m": "Standard length 6m, 12m",
  "Chủng loại": "Category",
  "H, I, U, V": "H, I, U, V",
  "SS400 / A36 / Q235 / Q345": "SS400 / A36 / Q235 / Q345",
  "6m / 12m": "6m / 12m",
  "Đen / Mạ kẽm nhúng nóng": "Black / Hot-dip galvanized",
  "Khung kèo nhà thép tiền chế": "Pre-engineered steel building frames",
  "Dầm cẩu trục, đòn cân": "Crane girders, weighbridges",
  "Cột điện cao thế, tháp ăng ten": "High-voltage towers, antenna masts",
  "VẬT LIỆU": "MATERIALS",
  "Khám phá": "Explore",
  "NHẬN BÁO GIÁ SẢN PHẨM": "REQUEST PRODUCT QUOTE",
  "CHẤT LƯỢNG ỔN ĐỊNH": "CONSISTENT QUALITY",
  "CÔNG NGHỆ HIỆN ĐẠI": "MODERN TECHNOLOGY",
  "GIAO HÀNG NHANH CHÓNG": "FAST DELIVERY",
  "HỖ TRỢ KỸ THUẬT": "TECHNICAL SUPPORT",
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
