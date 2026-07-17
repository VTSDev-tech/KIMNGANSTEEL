"use client";
import { useState } from "react";
import { Phone, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="antra-floating-contact fixed bottom-6 right-4 z-50 flex flex-col gap-3 items-center md:right-6 md:bottom-8 md:gap-3.5">
      {/* Contact Buttons Stack */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex flex-col gap-3 items-center"
          >
            {/* Zalo Button */}
            <a
              href="https://zalo.me/0934096794"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 md:w-12 md:h-12 bg-white rounded-full shadow-[0_4px_16px_rgba(0,104,255,0.25)] flex items-center justify-center hover:scale-110 transition-transform group relative border border-[#0068FF]/10"
              aria-label="Chat Zalo"
            >
              <span className="hidden md:block absolute right-full mr-4 bg-black/90 text-white text-xs px-2.5 py-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none font-sans tracking-wide">
                Chat Zalo
              </span>
              <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                {/* Official Zalo Speech Bubble */}
                <path 
                  d="M25 5C13.954 5 5 12.835 5 22.5c0 3.69 1.298 7.094 3.516 9.75l-2.266 6.8c-0.16 0.48 0.32 0.96 0.8 0.8l7.297-2.922C17.398 38.867 21.078 39.5 25 39.5c11.046 0 20-7.835 20-17.5S36.046 5 25 5z" 
                  fill="#0068FF"
                />
                {/* Letters "Zalo" in bold sans-serif */}
                <text 
                  x="25" 
                  y="26.5" 
                  textAnchor="middle" 
                  fill="white" 
                  fontSize="12.5" 
                  fontWeight="bold" 
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  letterSpacing="-0.04em"
                >
                  Zalo
                </text>
              </svg>
            </a>

            {/* Messenger Button */}
            <a
              href="https://m.me/kimngansteel"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 md:w-12 md:h-12 bg-white rounded-full shadow-[0_4px_16px_rgba(161,0,255,0.2)] flex items-center justify-center hover:scale-110 transition-transform group relative border border-purple-500/10"
              aria-label="Messenger"
            >
              <span className="hidden md:block absolute right-full mr-4 bg-black/90 text-white text-xs px-2.5 py-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none font-sans tracking-wide">
                Messenger
              </span>
              <svg viewBox="0 0 800 800" className="w-7.5 h-7.5">
                <defs>
                  <radialGradient id="floatingContactMessengerGradient" cx="101.9" cy="809" r="1.1" gradientTransform="matrix(800 0 0 -800 -81386 648000)" gradientUnits="userSpaceOnUse">
                    <stop offset="0" style={{ stopColor: "#0099FF" }} />
                    <stop offset="0.6" style={{ stopColor: "#A033FF" }} />
                    <stop offset="0.9" style={{ stopColor: "#FF5280" }} />
                    <stop offset="1" style={{ stopColor: "#FF7061" }} />
                  </radialGradient>
                </defs>
                {/* Messenger Bubble */}
                <path fill="url(#floatingContactMessengerGradient)" d="M400 0C174.7 0 0 165.1 0 388c0 116.6 47.8 217.4 125.6 287 6.5 5.8 10.5 14 10.7 22.8l2.2 71.2a32 32 0 0 0 44.9 28.3l79.4-35c6.7-3 14.3-3.5 21.4-1.6 36.5 10 75.3 15.4 115.8 15.4 225.3 0 400-165.1 400-388S625.3 0 400 0z" />
                {/* Messenger Lightning Bolt */}
                <path fill="#FFF" d="m159.8 501.5 117.5-186.4a60 60 0 0 1 86.8-16l93.5 70.1a24 24 0 0 0 28.9-.1l126.2-95.8c16.8-12.8 38.8 7.4 27.6 25.3L522.7 484.9a60 60 0 0 1-86.8 16l-93.5-70.1a24 24 0 0 0-28.9.1l-126.2 95.8c-16.8 12.8-38.8-7.3-27.5-25.2z" />
              </svg>
            </a>

            {/* Phone Button with Pulse Animation */}
            <a
              href="tel:0934096794"
              className="relative w-11 h-11 md:w-13 md:h-13 bg-[#C99A5C] rounded-full shadow-[0_4px_20px_rgba(201,154,92,0.4)] flex items-center justify-center hover:scale-110 transition-transform group"
              aria-label="Gọi điện thoại"
            >
              <span className="hidden md:block absolute right-full mr-4 bg-black/90 text-white text-xs px-2.5 py-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none font-sans tracking-wide">
                Gọi 0934 096 794
              </span>
              <div className="absolute inset-0 rounded-full border border-[#C99A5C] animate-[ping_1.5s_ease-in-out_infinite] opacity-75"></div>
              <Phone size={20} className="text-white animate-[wiggle_1s_ease-in-out_infinite] md:size-[22px]" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 md:w-12 md:h-12 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border border-[#C99A5C]/20 z-10"
        aria-label="Toggle contact menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <ChevronUp size={22} className="text-[#C99A5C]" />
        </motion.div>
      </button>
    </div>
  );
}
