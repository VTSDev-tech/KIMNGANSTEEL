"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type HotspotItem = {
  id: string;
  label: string;
  text: string;
  dotTop: string;
  dotLeft: string;
  labelTop?: string;
  labelLeft?: string;
  lineDirection: "top-up" | "left-left" | "bottom-down" | "right-right";
  lineWidth?: string;
  lineHeight?: string;
};

type MaterialItem = {
  id: string;
  name: string;
  subName: string;
  type: string;
  image: string;
  displayAsset: string;
  hotspots: HotspotItem[];
  specs: { label: string; value: string }[];
  applications: string[];
  standards: string[];
};

const MATERIALS_DATA: MaterialItem[] = [
  {
    id: "ton-cuon",
    name: "TÔN CUỘN",
    subName: "Steel Coil",
    type: "Tôn Cuộn Tiêu Chuẩn",
    image: "/ton_ma_kem_1.svg",
    displayAsset: "/ton_ma_kem_1.svg",
    hotspots: [
      { id: "h1", label: "01 BỀ MẶT SÁNG BÓNG", text: "Lớp mạ kẽm/mạ hợp kim chống ăn mòn", dotTop: "24%", dotLeft: "63%", lineDirection: "top-up", lineHeight: "45px" },
      { id: "h2", label: "02 ĐỘ DÀY CÁN", text: "Đa dạng độ dày từ 0.20mm đến 1.20mm", dotTop: "48%", dotLeft: "45%", lineDirection: "left-left", lineWidth: "140px" },
      { id: "h3", label: "03 KHỔ RỘNG", text: "Khổ tiêu chuẩn 1.200mm / 1.220mm", dotTop: "66%", dotLeft: "44%", lineDirection: "left-left", lineWidth: "135px" },
      { id: "h4", label: "04 TRỌNG LƯỢNG", text: "Cuộn lớn từ 3 - 8 tấn", dotTop: "82%", dotLeft: "53%", lineDirection: "bottom-down", lineHeight: "40px" },
      { id: "h5", label: "05 ĐÓNG GÓI", text: "Bọc chống ẩm, cố định đai thép", dotTop: "56%", dotLeft: "68%", lineDirection: "right-right", lineWidth: "55px" },
    ],
    specs: [
      { label: "Độ dày", value: "0.20 - 1.20 mm" },
      { label: "Khổ rộng", value: "914 - 1.250 mm" },
      { label: "Lớp mạ", value: "Z60 - Z275 / AZ50 - AZ150" },
      { label: "Tiêu chuẩn", value: "JIS G 3302 / JIS G 3321" },
    ],
    applications: ["Cán tôn lợp mái nhà xưởng", "Sản xuất ống thép, thép hộp", "Xà gồ cán nguội"],
    standards: ["JIS G 3302", "ASTM A653", "AS 1397"],
  },
  {
    id: "thep-hop",
    name: "THÉP HỘP",
    subName: "Steel Tube",
    type: "Thép Hộp Vuông & Chữ Nhật",
    image: "/thep_hop.svg",
    displayAsset: "/thep_hop.svg",
    hotspots: [
      { id: "h1", label: "01 ĐƯỜNG HÀN ERW", text: "Mối hàn cao tần siêu âm chắc chắn", dotTop: "30%", dotLeft: "58%", lineDirection: "top-up", lineHeight: "45px" },
      { id: "h2", label: "02 ĐỘ DÀY THÀNH", text: "Đa dạng độ dày từ 0.7mm đến 3.5mm", dotTop: "40%", dotLeft: "50%", lineDirection: "left-left", lineWidth: "155px" },
      { id: "h3", label: "03 LỚP MẠ KẼM", text: "Bảo vệ bề mặt chống gỉ sét", dotTop: "54%", dotLeft: "51%", lineDirection: "left-left", lineWidth: "160px" },
      { id: "h4", label: "04 QUY CÁCH", text: "Vuông 12x12 đến 100x100mm", dotTop: "72%", dotLeft: "57%", lineDirection: "bottom-down", lineHeight: "40px" },
      { id: "h5", label: "05 BÓ KỆ", text: "Đóng bó tiêu chuẩn 6m/cây", dotTop: "50%", dotLeft: "67%", lineDirection: "right-right", lineWidth: "55px" },
    ],
    specs: [
      { label: "Quy cách vuông", value: "12x12 đến 100x100 mm" },
      { label: "Quy cách chữ nhật", value: "10x20 đến 100x200 mm" },
      { label: "Độ dày", value: "0.7 - 3.5 mm" },
      { label: "Chiều dài", value: "6m (Cắt theo yêu cầu)" },
    ],
    applications: ["Khung giàn chịu lực", "Lan can, cửa cổng", "Kết cấu thép dân dụng"],
    standards: ["ASTM A500", "TCVN 3783"],
  },
  {
    id: "thep-ong",
    name: "THÉP ỐNG",
    subName: "Steel Pipe",
    type: "Thép ỐNG Tròn Đen / Mạ Kẽm",
    image: "/thep_ong.svg",
    displayAsset: "/thep_ong.svg",
    hotspots: [
      { id: "h1", label: "01 ĐƯỜNG KÍNH ĐA DẠNG", text: "Từ Ø21.2mm đến Ø114.3mm", dotTop: "30%", dotLeft: "58%", lineDirection: "top-up", lineHeight: "45px" },
      { id: "h2", label: "02 ĐỘ DÀY TƯỜNG ỐNG", text: "Từ 0.9mm đến 4.0mm chịu lực tốt", dotTop: "40%", dotLeft: "50%", lineDirection: "left-left", lineWidth: "155px" },
      { id: "h3", label: "03 BỀ MẶT THÉP", text: "Ống đen hoặc mạ kẽm bảo vệ", dotTop: "54%", dotLeft: "51%", lineDirection: "left-left", lineWidth: "160px" },
      { id: "h4", label: "04 MỐI HÀN TỰ ĐỘNG", text: "Công nghệ hàn cao tần", dotTop: "72%", dotLeft: "57%", lineDirection: "bottom-down", lineHeight: "40px" },
      { id: "h5", label: "05 ỨNG DỤNG", text: "Sử dụng cho ống nước, PCCC, giàn giáo", dotTop: "50%", dotLeft: "67%", lineDirection: "right-right", lineWidth: "55px" },
    ],
    specs: [
      { label: "Đường kính ngoài", value: "Ø21.2 - Ø114.3 mm" },
      { label: "Độ dày", value: "0.9 - 4.0 mm" },
      { label: "Chiều dài", value: "6m tiêu chuẩn" },
      { label: "Bề mặt", value: "Đen / Mạ kẽm" },
    ],
    applications: ["Hệ thống PCCC", "Ống dẫn nước", "Khung giàn giáo chịu lực"],
    standards: ["BS 1387:1985", "ASTM A53"],
  },
  {
    id: "ton-lop",
    name: "TÔN LỢP",
    subName: "Roofing Sheet",
    type: "Tôn Lợp Cán Sóng Lạnh / Màu",
    image: "/ton_can_song.svg",
    displayAsset: "/ton_can_song.svg",
    hotspots: [
      { id: "h1", label: "01 CẤU TRÚC BIÊN DẠNG", text: "Sóng vuông cứng cáp, thoát nước tốt", dotTop: "32%", dotLeft: "59%", lineDirection: "top-up", lineHeight: "45px" },
      { id: "h2", label: "02 ĐỘ DÀY BỀ MẶT", text: "Đa dạng từ 0.30mm đến 0.60mm", dotTop: "42%", dotLeft: "47%", lineDirection: "left-left", lineWidth: "155px" },
      { id: "h3", label: "03 SỐ LƯỢNG SÓNG", text: "Tôn 5 sóng, 9 sóng, 11 sóng", dotTop: "58%", dotLeft: "46%", lineDirection: "left-left", lineWidth: "150px" },
      { id: "h4", label: "04 CHIỀU CAO SÓNG", text: "Chiều cao sóng tiêu chuẩn 21-32mm", dotTop: "72%", dotLeft: "56%", lineDirection: "bottom-down", lineHeight: "40px" },
      { id: "h5", label: "05 ỨNG DỤNG", text: "Mái nhà xưởng, biệt thự dân dụng", dotTop: "50%", dotLeft: "67%", lineDirection: "right-right", lineWidth: "55px" },
    ],
    specs: [
      { label: "Biên dạng", value: "5 sóng / 9 sóng / 11 sóng" },
      { label: "Độ dày", value: "0.30 - 0.60 mm" },
      { label: "Khổ hữu dụng", value: "1.000 - 1.070 mm" },
      { label: "Chiều dài", value: "Cắt theo yêu cầu" },
    ],
    applications: ["Lợp mái nhà xưởng", "Lợp mái nhà ở, kho bãi", "Vách ngăn che chắn"],
    standards: ["JIS G 3312", "TCVN 7471"],
  },
  {
    id: "purlin-c",
    name: "XÀ GỒ C",
    subName: "C - Purlin",
    type: "Xà Gồ Mạ Kẽm Định Hình C",
    image: "/xa_go_z.svg",
    displayAsset: "/xa_go_z.svg",
    hotspots: [
      { id: "h1", label: "01 ĐỤC LỖ TỰ ĐỘNG", text: "Đột lỗ oval, lỗ tròn vi tính theo bản vẽ thiết kế", dotTop: "34%", dotLeft: "57%", lineDirection: "top-up", lineHeight: "45px" },
      { id: "h2", label: "02 CƯỜNG ĐỘ THÉP CAO", text: "Thép mạ kẽm cường độ cao G350 - G450 MPa", dotTop: "44%", dotLeft: "45%", lineDirection: "left-left", lineWidth: "140px" },
      { id: "h3", label: "03 TIẾT DIỆN HÌNH C", text: "Mặt cắt hình chữ C ôm sát khung chịu lực công trình", dotTop: "60%", dotLeft: "47%", lineDirection: "left-left", lineWidth: "155px" },
      { id: "h4", label: "04 QUY CÁCH C", text: "Chiều cao C80 - C300mm, độ dày 1.5mm - 3.2mm", dotTop: "72%", dotLeft: "55%", lineDirection: "bottom-down", lineHeight: "40px" },
      { id: "h5", label: "05 TRỌNG LƯỢNG", text: "Phù hợp khung giàn đòn tay, vách nhà xưởng", dotTop: "50%", dotLeft: "67%", lineDirection: "right-right", lineWidth: "55px" },
    ],
    specs: [
      { label: "Chiều cao C", value: "C80 - C300 mm" },
      { label: "Độ dày", value: "1.5 - 3.2 mm" },
      { label: "Cường độ thép", value: "G350 - G450 MPa" },
      { label: "Lớp mạ kẽm", value: "Z120 - Z275 (g/m²)" },
      { label: "Đột lỗ vi tính", value: "Đột lỗ oval/tròn tự động" },
      { label: "Xuất xứ", value: "Hoa Sen, Nam Kim, POSCO, BlueScope" },
    ],
    applications: ["Đòn tay lợp mái nhà xưởng công nghiệp", "Khung vách công trình nhà thép tiền chế", "Hệ đòn đệm sàn nâng chịu lực"],
    standards: ["JIS G 3302 (Nhật Bản)", "ASTM A653 (Mỹ)", "AS 1397 (Úc)", "TCVN 7471"],
  },
  {
    id: "purlin-z",
    name: "XÀ GỒ Z",
    subName: "Z - Purlin",
    type: "Xà Gồ Mạ Kẽm Nối Chồng",
    image: "/xa_go_z_update.svg",
    displayAsset: "/xa_go_z_update.svg",
    hotspots: [
      { id: "h1", label: "01 CÁNH CHÊNH NỐI CHỒNG", text: "Khả năng gối chồng (Lap) tăng cứng khẩu độ nhà xưởng", dotTop: "30%", dotLeft: "59%", lineDirection: "top-up", lineHeight: "45px" },
      { id: "h2", label: "02 CƯỜNG ĐỘ THÉP CAO", text: "Thép mạ kẽm cường độ cao G350 - G450 MPa", dotTop: "44%", dotLeft: "45%", lineDirection: "left-left", lineWidth: "140px" },
      { id: "h3", label: "03 ĐỤC LỖ TỰ ĐỘNG", text: "Đột lỗ oval, lỗ tròn vi tính theo bản vẽ thiết kế", dotTop: "60%", dotLeft: "47%", lineDirection: "left-left", lineWidth: "155px" },
      { id: "h4", label: "04 QUY CÁCH Z", text: "Chiều cao Z150 - Z300mm, độ dày 1.5mm - 3.2mm", dotTop: "72%", dotLeft: "55%", lineDirection: "bottom-down", lineHeight: "40px" },
      { id: "h5", label: "05 TRỌNG LƯỢNG", text: "Phù hợp công trình mái khẩu độ lớn >24m", dotTop: "50%", dotLeft: "67%", lineDirection: "right-right", lineWidth: "55px" },
    ],
    specs: [
      { label: "Chiều cao Z", value: "Z150 - Z300 mm" },
      { label: "Độ dày", value: "1.5 - 3.2 mm" },
      { label: "Cường độ thép", value: "G350 - G450 MPa" },
      { label: "Lớp mạ kẽm", value: "Z120 - Z275 (g/m²)" },
      { label: "Gối chồng (Lap)", value: "Tăng chịu tải 25%" },
      { label: "Xuất xứ", value: "Hoa Sen, Nam Kim, POSCO, BlueScope" },
    ],
    applications: ["Mái khẩu độ lớn >24m nhà xưởng công nghiệp", "Khung vách nhà thép tiền chế", "Hệ đòn tay trung chuyển kho bãi"],
    standards: ["JIS G 3302 (Nhật Bản)", "ASTM A653 (Mỹ)", "AS 1397 (Úc)", "TCVN 7471"],
  },
  {
    id: "thep-xay-dung",
    name: "THÉP XÂY DỰNG",
    subName: "Construction Steel",
    type: "Thép Vằn / Thép Cuộn Bê Tông",
    image: "/luoi_thep.svg", // Giữ hình lưới thép làm demo thép xây dựng
    displayAsset: "/luoi_thep.svg",
    hotspots: [
      { id: "h1", label: "01 ĐƯỜNG KÍNH THÉP", text: "Từ D10 đến D32 đối với thép vằn", dotTop: "30%", dotLeft: "55%", lineDirection: "top-up", lineHeight: "45px" },
      { id: "h2", label: "02 GÂN THÉP BỀ MẶT", text: "Tăng độ bám dính cốt thép và bê tông", dotTop: "42%", dotLeft: "42%", lineDirection: "left-left", lineWidth: "135px" },
      { id: "h3", label: "03 MẠC THÉP CHỊU LỰC", text: "CB300-V, CB400-V, CB500-V", dotTop: "58%", dotLeft: "44%", lineDirection: "left-left", lineWidth: "145px" },
      { id: "h4", label: "04 THÉP CUỘN TRƠN", text: "Đường kính D6, D8 cho đai cốt thép", dotTop: "72%", dotLeft: "52%", lineDirection: "bottom-down", lineHeight: "40px" },
      { id: "h5", label: "05 BÓ KIỆN", text: "Đóng bó tiêu chuẩn 11.7m/cây", dotTop: "50%", dotLeft: "67%", lineDirection: "right-right", lineWidth: "55px" },
    ],
    specs: [
      { label: "Đường kính thép vằn", value: "D10 - D32" },
      { label: "Đường kính thép cuộn", value: "D6 - D8" },
      { label: "Mác thép", value: "CB300V / CB400V / CB500V" },
      { label: "Chiều dài", value: "11.7m / Cuộn" },
    ],
    applications: ["Móng công trình", "Dầm, cột, sàn bê tông cốt thép", "Xây dựng dân dụng & công nghiệp"],
    standards: ["TCVN 1651", "JIS G 3112"],
  },
  {
    id: "thep-hinh",
    name: "THÉP HÌNH",
    subName: "Structural Steel",
    type: "Thép Hình H, U, I, V",
    image: "/thep_hinh.svg",
    displayAsset: "/thep_hinh.svg",
    hotspots: [
      { id: "h1", label: "01 ĐA DẠNG TIẾT DIỆN", text: "Hình chữ H, U, I, V đa quy cách", dotTop: "30%", dotLeft: "59%", lineDirection: "top-up", lineHeight: "45px" },
      { id: "h2", label: "02 ĐỘ DÀY BỤNG THÉP", text: "Phân bố tiết diện tối ưu chịu tải trọng", dotTop: "44%", dotLeft: "45%", lineDirection: "left-left", lineWidth: "140px" },
      { id: "h3", label: "03 MẠC THÉP CÔNG NGHIỆP", text: "SS400, A36, Q235, Q345", dotTop: "60%", dotLeft: "47%", lineDirection: "left-left", lineWidth: "155px" },
      { id: "h4", label: "04 ĐỘ CỨNG CAO", text: "Không biến dạng dưới lực ép/kéo ngang", dotTop: "72%", dotLeft: "55%", lineDirection: "bottom-down", lineHeight: "40px" },
      { id: "h5", label: "05 QUY CÁCH CHIỀU DÀI", text: "Chiều dài tiêu chuẩn 6m, 12m", dotTop: "50%", dotLeft: "67%", lineDirection: "right-right", lineWidth: "55px" },
    ],
    specs: [
      { label: "Chủng loại", value: "H, I, U, V" },
      { label: "Mác thép", value: "SS400 / A36 / Q235 / Q345" },
      { label: "Chiều dài", value: "6m / 12m" },
      { label: "Bề mặt", value: "Đen / Mạ kẽm nhúng nóng" },
    ],
    applications: ["Khung nhà thép tiền chế", "Cầu đường, dầm cầu trục", "Kết cấu máy móc hạng nặng"],
    standards: ["JIS G 3101", "ASTM A36"],
  }
];

export function MaterialExplorerSection() {
  const [selectedId, setSelectedId] = useState<string>("ton-cuon");
  const [activeTab, setActiveTab] = useState<"specs" | "apps" | "stds">("specs");
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeMaterial = MATERIALS_DATA.find((m) => m.id === selectedId) || MATERIALS_DATA[0];

  const handleScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="material-explorer" className="relative py-10 md:py-32 bg-[#ffffff] border-b border-[#064e3b]/10 text-[#064e3b] select-none overflow-hidden">
      {/* Top Expanding Gold Accent Line Transition */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ea580c] to-transparent origin-center z-30"
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 lg:px-16">
        
        {/* Main 1:1 Reference Stage Grid: Fixed Height Stage & Spec Panel matching Reference 1:1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch mb-8 md:mb-12 lg:min-h-[470px]">
          
          {/* Left Column: Section Header, Intro & Drag Hint Button (3 Cols) matching Reference */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex flex-col justify-between pt-2 lg:pt-8 z-20"
          >
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#ea580c] font-sans font-semibold block mb-2 sm:mb-3">
                MATERIAL EXPLORER
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#064e3b] leading-[1.05] mb-3 sm:mb-6">
                KHÁM PHÁ<br />VẬT LIỆU
              </h2>

              <p className="text-[11px] sm:text-sm text-[#064e3b] font-sans max-w-[280px] leading-relaxed mb-4 sm:mb-8">
                Tương tác để tìm hiểu cấu tạo, thông số và ứng dụng của từng loại vật liệu.
              </p>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#ea580c]/60 bg-white/40 backdrop-blur-sm text-xs font-sans text-[#ea580c] font-medium self-start shadow-sm mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]" />
              <span>KÉO ĐỂ XOAY</span>
            </div>
          </motion.div>

          {/* Center Column: WIDE HOTSPOT STAGE (6 Cols, w-full max-w-[680px]) - Zero Text Overlap */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1.0, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center h-[260px] sm:h-[390px] lg:h-[470px] p-0 sm:p-2 overflow-visible group"
          >
            
            {/* Center Studio Image Render Box with Expanded 680px Hotspot Canvas */}
            <div className="relative w-full max-w-[360px] sm:max-w-[560px] lg:max-w-[680px] h-[250px] sm:h-[380px] lg:h-[460px] flex items-center justify-center z-10">
              <AnimatePresence>
                <motion.div
                  key={activeMaterial.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Metal Image Renders Centered at Middle 360px Width */}
                  <img
                    src={activeMaterial.displayAsset}
                    alt={activeMaterial.name}
                    className="w-[255px] h-[225px] sm:w-[330px] sm:h-[295px] lg:w-[360px] lg:h-[320px] object-contain mix-blend-multiply filter contrast-[1.04] brightness-[1.01]"
                  />

                  {/* Hotspots Nested Inside 680px Canvas - Pointer Lines Extend OUTSIDE Metal Graphic */}
                  {activeMaterial.hotspots.map((spot) => {
                    const topPos = spot.dotTop;
                    const leftPos = spot.dotLeft;
                    const hLine = spot.lineWidth || "140px";
                    const vLine = spot.lineHeight || "45px";

                    return (
                      <div key={spot.id}>
                        {/* 1. Double Concentric Amber Dot Pin */}
                        <div
                          style={{ top: topPos, left: leftPos }}
                          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        >
                          <div className="relative flex items-center justify-center">
                            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#ea580c] bg-[#ea580c]/20 flex items-center justify-center shadow-sm">
                              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ea580c]" />
                            </span>
                          </div>
                        </div>

                        {spot.lineDirection === "top-up" && (
                          <>
                            <div
                              style={{
                                top: "calc(" + topPos + " - " + vLine + ")",
                                left: leftPos,
                                height: vLine,
                              }}
                              className="absolute z-10 w-[1px] bg-[#064e3b]/60 pointer-events-none hidden md:block"
                            />
                            <div
                              style={{
                                top: "calc(" + topPos + " - " + vLine + " - 8px)",
                                left: leftPos,
                              }}
                              className="absolute z-20 -translate-y-full -translate-x-1/2 whitespace-nowrap text-center pointer-events-none max-w-[220px] hidden md:block"
                            >
                              <span className="font-bold block text-[#064e3b] text-xs font-sans uppercase tracking-wide mb-0.5 whitespace-nowrap">
                                {spot.label}
                              </span>
                              <span className="text-[11px] text-[#064e3b] font-sans font-normal leading-tight block">
                                {spot.text}
                              </span>
                            </div>
                          </>
                        )}

                        {spot.lineDirection === "left-left" && (
                          <>
                            <div
                              style={{
                                top: topPos,
                                left: "calc(" + leftPos + " - " + hLine + ")",
                                width: hLine,
                              }}
                              className="absolute z-10 h-[1px] bg-[#064e3b]/60 pointer-events-none hidden md:block"
                            />
                            <div
                              style={{
                                top: topPos,
                                left: "calc(" + leftPos + " - " + hLine + " - 12px)",
                              }}
                              className="absolute z-20 -translate-y-1/2 -translate-x-full text-right pointer-events-none w-[200px] hidden md:block"
                            >
                              <span className="font-bold block text-[#064e3b] text-xs font-sans uppercase tracking-wide mb-0.5 whitespace-nowrap">
                                {spot.label}
                              </span>
                              <span className="text-[11px] text-[#064e3b] font-sans font-normal leading-tight block">
                                {spot.text}
                              </span>
                            </div>
                          </>
                        )}

                        {spot.lineDirection === "bottom-down" && (
                          <>
                            <div
                              style={{
                                top: topPos,
                                left: leftPos,
                                height: vLine,
                              }}
                              className="absolute z-10 w-[1px] bg-[#064e3b]/60 pointer-events-none hidden md:block"
                            />
                            <div
                              style={{
                                top: "calc(" + topPos + " + " + vLine + " + 8px)",
                                left: leftPos,
                              }}
                              className="absolute z-20 -translate-x-1/2 whitespace-nowrap text-center pointer-events-none max-w-[220px] hidden md:block"
                            >
                              <span className="font-bold block text-[#064e3b] text-xs font-sans uppercase tracking-wide mb-0.5 whitespace-nowrap">
                                {spot.label}
                              </span>
                              <span className="text-[11px] text-[#064e3b] font-sans font-normal leading-tight block">
                                {spot.text}
                              </span>
                            </div>
                          </>
                        )}

                        {spot.lineDirection === "right-right" && (
                          <>
                            <div
                              style={{
                                top: topPos,
                                left: leftPos,
                                width: hLine,
                              }}
                              className="absolute z-10 h-[1px] bg-[#064e3b]/60 pointer-events-none hidden md:block"
                            />
                            <div
                              style={{
                                top: topPos,
                                left: "calc(" + leftPos + " + " + hLine + " + 6px)",
                              }}
                              className="absolute z-20 -translate-y-1/2 text-left pointer-events-none max-w-[145px] hidden md:block"
                            >
                              <span className="font-bold block text-[#064e3b] text-xs font-sans uppercase tracking-wide mb-0.5 whitespace-nowrap">
                                {spot.label}
                              </span>
                              <span className="text-[11px] text-[#064e3b] font-sans font-normal leading-tight block">
                                {spot.text}
                              </span>
                            </div>
                          </>
                        )}

                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>

          {/* Right Column: FIXED HEIGHT Spec Card ("ĐANG XEM") (3 Cols) - Zero Height Jump */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 mx-auto flex h-auto min-h-0 w-full max-w-[300px] flex-col overflow-hidden rounded-xl border border-[#064e3b]/10 bg-white p-3 shadow-[0_12px_36px_rgba(0,0,0,0.05)] z-20 sm:h-[430px] sm:w-full sm:max-w-none sm:p-5 md:h-[470px] md:p-7"
          >
            
            <div className="flex-1 flex flex-col min-h-0">
              <div className="shrink-0">
                {/* Header: Pure Text Kicker + Type */}
                <div className="flex items-center justify-between pb-1.5 mb-0.5">
                  <span className="text-[8px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.22em] sm:tracking-[0.25em] text-[#064e3b]">
                    ĐANG XEM
                  </span>
                  <span className="max-w-[120px] text-right text-[9px] sm:max-w-none sm:text-xs font-sans text-[#064e3b]">{activeMaterial.type}</span>
                </div>

                {/* Main Title & Amber Subtitle */}
                <h3 className="text-lg sm:text-3xl font-bold uppercase tracking-tight text-[#064e3b] mb-0.5 sm:mb-1">
                  {activeMaterial.name}
                </h3>
                <p className="text-[8px] sm:text-xs font-sans font-semibold text-[#ea580c] uppercase tracking-widest mb-2 sm:mb-5">
                  {activeMaterial.subName}
                </p>

                {/* Sub Tabs: THÔNG SỐ | ỨNG DỤNG | TIÊU CHUẨN */}
                <div className="flex items-center justify-between gap-1.5 sm:gap-6 border-b border-[#064e3b]/10 pb-1.5 sm:pb-3 mb-1.5 sm:mb-4 text-[8px] sm:text-xs font-sans font-semibold">
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={"pb-1 uppercase tracking-wider transition-colors relative " + (activeTab === "specs" ? "text-[#064e3b] font-bold" : "text-[#064e3b] hover:text-[#064e3b]")}
                  >
                    THÔNG SỐ
                    {activeTab === "specs" && <motion.div layoutId="activeTabExplorer" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ea580c]" />}
                  </button>

                  <button
                    onClick={() => setActiveTab("apps")}
                    className={"pb-1 uppercase tracking-wider transition-colors relative " + (activeTab === "apps" ? "text-[#064e3b] font-bold" : "text-[#064e3b] hover:text-[#064e3b]")}
                  >
                    ỨNG DỤNG
                    {activeTab === "apps" && <motion.div layoutId="activeTabExplorer" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ea580c]" />}
                  </button>

                  <button
                    onClick={() => setActiveTab("stds")}
                    className={"pb-1 uppercase tracking-wider transition-colors relative " + (activeTab === "stds" ? "text-[#064e3b] font-bold" : "text-[#064e3b] hover:text-[#064e3b]")}
                  >
                    TIÊU CHUẨN
                    {activeTab === "stds" && <motion.div layoutId="activeTabExplorer" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ea580c]" />}
                  </button>
                </div>
              </div>

              {/* Fixed Height Tab Content — 220px, scrollable if needed */}
              <div className="max-h-[150px] sm:h-[190px] md:h-[220px] overflow-y-auto flex flex-col justify-start pr-1">
                <AnimatePresence mode="wait">
                  {activeTab === "specs" && (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-0 font-sans text-[9px] sm:text-xs"
                    >
                      {activeMaterial.specs.map((s) => (
                        <div key={s.label} className="flex items-center justify-between gap-2 py-0.5 sm:py-1.5 border-b border-[#064e3b]/06">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#ea580c] inline-block shrink-0" />
                            <span className="text-[#064e3b] font-medium">{s.label}</span>
                          </div>
                          <span className="font-bold text-[#064e3b] text-right">{s.value}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "apps" && (
                    <motion.div
                      key="apps"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-0.5 font-sans text-xs text-[#064e3b]"
                    >
                      {activeMaterial.applications.map((app, i) => (
                        <div key={i} className="flex items-start gap-2.5 py-1.5 border-b border-[#064e3b]/06">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] inline-block shrink-0 mt-1.5" />
                          <span>{app}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "stds" && (
                    <motion.div
                      key="stds"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-0.5 font-sans text-xs text-[#064e3b]"
                    >
                      {activeMaterial.standards.map((std, i) => (
                        <div key={i} className="flex items-center gap-2.5 py-1.5 border-b border-[#064e3b]/06">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] inline-block shrink-0" />
                          <span className="font-semibold text-[#064e3b]">{std}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* CTA Button — pinned to bottom */}
            <div className="pt-2 sm:pt-3 mt-auto border-t border-[#064e3b]/10 shrink-0">
              <a
                href="#contact"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 sm:py-3.5 sm:px-5 rounded-xl bg-[#064e3b] hover:bg-[#ea580c] text-[#ffffff] hover:text-[#064e3b] font-sans text-[8px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm"
              >
                <span>NHẬN BÁO GIÁ SẢN PHẨM</span>
                <span className="text-sm">→</span>
              </a>
            </div>

          </motion.div>

        </div>
      </div>

      {/* BOTTOM SECTION WITH SUBTLE DECORATIVE GLOW */}
      <div className="w-full pt-8 pb-16 mt-8 relative">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.08]">
          <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] bg-[#064e3b] rounded-full blur-[80px]"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-[#ea580c] rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 lg:px-16 relative z-10">

        {/* Bottom Single Horizontal Scroll Row (8 Material Cards + Left/Right Nav Arrows) matching Image 2 1:1 */}
        <motion.div 

          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center gap-3 pt-6"
        >
          
          {/* Left Scroll Arrow Button */}
          <button
            onClick={() => handleScroll("left")}
            className="w-10 h-10 rounded-full bg-white border border-[#064e3b]/15 shadow-sm flex items-center justify-center text-[#064e3b] text-lg shrink-0 cursor-pointer hover:bg-[#064e3b] hover:text-white transition-all duration-200 z-10"
            aria-label="Scroll left"
          >
            ‹
          </button>

          {/* Single Row Flex Container (Never Wraps, 100% Guaranteed 1 Row) */}
          <div
            ref={carouselRef}
            className="flex items-center gap-4 overflow-x-auto scroll-smooth w-full py-3 px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {MATERIALS_DATA.map((mat) => {
              const isSelected = mat.id === selectedId;
              return (
                <button
                  key={mat.id}
                  onClick={() => setSelectedId(mat.id)}
                  className={"min-w-[155px] md:min-w-[170px] max-w-[185px] shrink-0 flex flex-col items-center justify-between p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer " + (isSelected ? "bg-white border-[#ea580c] shadow-md -translate-y-1 ring-1 ring-[#ea580c]" : "bg-white/60 border-[#064e3b]/10 hover:bg-white/90 hover:border-[#064e3b]/20")}
                >
                  <div className="w-16 h-16 mb-3 flex items-center justify-center p-1.5">
                    <img src={mat.image} alt={mat.name} className="w-full h-full object-contain filter contrast-110" />
                  </div>
                  <div>
                    <h4 className="text-xs font-sans font-bold text-[#064e3b] tracking-tight whitespace-nowrap">{mat.name}</h4>
                    <span className="text-[10px] font-sans text-[#064e3b] block uppercase tracking-wider mt-0.5">{mat.subName}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Scroll Arrow Button */}
          <button
            onClick={() => handleScroll("right")}
            className="w-10 h-10 rounded-full bg-white border border-[#064e3b]/15 shadow-sm flex items-center justify-center text-[#064e3b] text-lg shrink-0 cursor-pointer hover:bg-[#064e3b] hover:text-white transition-all duration-200 z-10"
            aria-label="Scroll right"
          >
            ›
          </button>

        </motion.div>

        {/* Bottom Brand Values HUD Bar matching Reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 mt-12 border-t border-[#064e3b]/15 text-xs font-sans text-[#064e3b]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white border border-[#064e3b]/15 shadow-sm flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#ea580c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <strong className="text-[#064e3b] block uppercase font-bold tracking-tight">CHẤT LƯỢNG ỔN ĐỊNH</strong>
              <span className="text-[11px] text-[#064e3b]">Đạt tiêu chuẩn quốc tế</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white border border-[#064e3b]/15 shadow-sm flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#ea580c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <strong className="text-[#064e3b] block uppercase font-bold tracking-tight">CÔNG NGHỆ HIỆN ĐẠI</strong>
              <span className="text-[11px] text-[#064e3b]">Dây chuyền sản xuất tiên tiến</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white border border-[#064e3b]/15 shadow-sm flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#ea580c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.75 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h11.25s1.5 0 1.5 1.5v6.75s0 1.5-1.5 1.5H3.75s-1.5 0-1.5-1.5V8.25s0-1.5 1.5-1.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 9.75h2.625c.621 0 1.18.37 1.417.944l1.308 3.27a1.5 1.5 0 01.15.636v1.9a1.5 1.5 0 01-1.5 1.5h-1" />
              </svg>
            </div>
            <div>
              <strong className="text-[#064e3b] block uppercase font-bold tracking-tight">GIAO HÀNG NHANH CHÓNG</strong>
              <span className="text-[11px] text-[#064e3b]">Đúng tiến độ, đúng cam kết</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white border border-[#064e3b]/15 shadow-sm flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#ea580c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <strong className="text-[#064e3b] block uppercase font-bold tracking-tight">HỖ TRỢ KỸ THUẬT</strong>
              <span className="text-[11px] text-[#064e3b]">Tư vấn giải pháp tối ưu</span>
            </div>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
}
