"use client";
import { MessageCircle, Phone, Globe } from "lucide-react";

export function FloatingContact() {
  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-4 items-center">
      {/* Zalo Button */}
      <a
        href="https://zalo.me/0901234567"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform group relative"
      >
        <span className="absolute right-full mr-4 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
          Chat Zalo
        </span>
        {/* Placeholder for Zalo Logo, using MessageCircle for now */}
        <MessageCircle size={24} className="text-[#0068FF]" />
      </a>

      {/* Messenger Button */}
      <a
        href="#"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform group relative"
      >
        <span className="absolute right-full mr-4 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
          Messenger
        </span>
        <Globe size={24} className="text-[#0A7CFF]" />
      </a>

      {/* Phone Button with Pulse Animation */}
      <a
        href="tel:0901234567"
        className="relative w-14 h-14 bg-[#C99A5C] rounded-full shadow-[0_0_15px_rgba(201,154,92,0.5)] flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <span className="absolute right-full mr-4 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
          Gọi 090 123 4567
        </span>
        {/* Ringing animation rings */}
        <div className="absolute inset-0 rounded-full border-2 border-[#C99A5C] animate-[ping_1.5s_ease-in-out_infinite] opacity-75"></div>
        <Phone size={24} className="text-white animate-[wiggle_1s_ease-in-out_infinite]" />
      </a>
    </div>
  );
}
