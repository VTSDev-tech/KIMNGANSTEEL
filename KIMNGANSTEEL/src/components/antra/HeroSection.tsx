"use client";

import { HeroSequence } from "./HeroSequence";

export function HeroSection() {
  return (
    <section
      id="top"
      className="hero-scroll-sequence relative h-[800svh] bg-[#f7f7f5]"
      aria-label="Kim Ngan Steel hero assembly"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-[#f7f7f5]">
        <HeroSequence className="h-svh w-full" />
      </div>
    </section>
  );
}
