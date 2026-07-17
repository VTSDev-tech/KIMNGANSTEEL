
export function AboutSection() {
  return (
    <section id="about" className="relative pt-12 lg:pt-16 pb-0 px-6 md:px-12 lg:px-24 bg-[#F2F0EC] overflow-hidden">
      
      {/* Subtle Architectural Grid Pattern for the entire section */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(156,138,115,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(156,138,115,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] z-0"></div>

      {/* Huge Watermark Text at Section Level */}
      <div className="absolute bottom-10 -right-20 text-[8rem] lg:text-[15rem] font-bold text-[#e5e1da] opacity-30 pointer-events-none whitespace-nowrap select-none z-0" style={{ letterSpacing: '-0.05em', lineHeight: 1 }}>
        SINCE 2009
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col relative">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C2BAB0] mb-6">Về Chúng Tôi</p>
          <h2 className="text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] font-light leading-[1.2] text-[#151413] uppercase tracking-tight mb-8">
            ĐỐI TÁC VẬT LIỆU<br/>ĐÁNG TIN CẬY<br/>CỦA MỌI CÔNG TRÌNH
          </h2>
          <p className="text-[#555] text-[15px] leading-relaxed font-light text-justify mb-12">
            Công ty TNHH Tôn Thép Kim Ngân hoạt động trong lĩnh vực gia công cán tôn và phân phối vật liệu xây dựng. Chúng tôi phục vụ đa dạng khách hàng, từ nhà thầu xây dựng, chủ đầu tư nhà xưởng, đại lý phân phối đến khách hàng cá nhân có nhu cầu sửa chữa và xây dựng nhà ở với chất lượng cao nhất.
          </p>
          <div className="self-start">
            <div className="text-4xl lg:text-5xl text-[#151413] mb-2 opacity-90 -rotate-2" style={{ fontFamily: "var(--font-dancing-script), cursive" }}>Kim Ngân</div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C2BAB0] mt-2">GIÁM ĐỐC</p>
          </div>
        </div>

        {/* Right: The Image (Gallery Passepartout Style) */}
        <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
          
          {/* Decorative Offset Block (Top Right) */}
          <div className="absolute -top-8 -right-8 w-[80%] h-[80%] max-w-[300px] max-h-[300px] border border-[#d8d4ce] bg-transparent z-0 hidden md:block"></div>
          
          {/* Decorative Dot Pattern Block behind the image (Bottom Left) */}
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[radial-gradient(#C99A5C_2px,transparent_2px)] bg-[size:16px_16px] opacity-30 z-0"></div>

          {/* The white padding acts as a matting/passepartout frame to isolate the raw photo */}
          <div className="relative z-10 w-full aspect-[16/10] bg-white p-3 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] transform transition-transform duration-700 hover:-translate-y-2">
            <img 
              src="/KimNganSteel.svg" 
              alt="Nhà máy Kim Ngân Steel" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

      </div>
    </section>
  );
}
