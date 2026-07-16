export function PartnerSection() {
  const partners = [
    { name: "HÒA PHÁT", desc: "GROUP" },
    { name: "posco", desc: "VST" },
    { name: "SSSC", desc: "TÔN PHƯƠNG NAM" },
    { name: "NSBlueScope", desc: "Vietnam" },
    { name: "TON DONG A", desc: "" },
    { name: "VĨNH TƯỜNG", desc: "SAINT-GOBAIN" },
    { name: "secoin", desc: "KẾT TINH GIÁ TRỊ" },
  ];

  return (
    <section className="bg-[#080808] py-16 md:py-24 border-t border-[rgba(216,212,206,0.05)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="flex items-center justify-center gap-6 mb-16 opacity-80">
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-[#555]"></div>
          <p className="text-[#D8D4CE] text-[11px] font-bold tracking-[0.2em] uppercase">ĐỐI TÁC & KHÁCH HÀNG</p>
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-[#555]"></div>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            
            {/* First Set */}
            <div className="flex items-center gap-x-16 md:gap-x-24 px-8 md:px-12">
              {partners.map((p) => (
                <div 
                  key={`set1-${p.name}`} 
                  className="flex flex-col items-center justify-center text-center opacity-50 hover:opacity-100 transition-all duration-300 cursor-default min-w-[120px]"
                >
                  <span className={`text-xl md:text-2xl font-bold text-[#F2F0EC] ${p.name === 'posco' || p.name === 'secoin' ? 'lowercase tracking-normal' : 'tracking-wider'} leading-none`}>
                    {p.name}
                  </span>
                  {p.desc && (
                    <span className="text-[9px] md:text-[10px] text-[#999590] tracking-[0.2em] uppercase mt-1.5 leading-none">
                      {p.desc}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Second Set (Duplicate for seamless loop) */}
            <div className="flex items-center gap-x-16 md:gap-x-24 px-8 md:px-12">
              {partners.map((p) => (
                <div 
                  key={`set2-${p.name}`} 
                  className="flex flex-col items-center justify-center text-center opacity-50 hover:opacity-100 transition-all duration-300 cursor-default min-w-[120px]"
                >
                  <span className={`text-xl md:text-2xl font-bold text-[#F2F0EC] ${p.name === 'posco' || p.name === 'secoin' ? 'lowercase tracking-normal' : 'tracking-wider'} leading-none`}>
                    {p.name}
                  </span>
                  {p.desc && (
                    <span className="text-[9px] md:text-[10px] text-[#999590] tracking-[0.2em] uppercase mt-1.5 leading-none">
                      {p.desc}
                    </span>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
