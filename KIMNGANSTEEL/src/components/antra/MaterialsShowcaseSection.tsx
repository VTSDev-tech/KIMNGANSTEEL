"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function MaterialsShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".kn-hero-bg-text span, .kn-hero-sheet, .kn-hero-copy, .kn-hero-link", {
          clearProps: "all",
          opacity: 1,
        });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "bottom 18%",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          ".kn-hero-bg-text span",
          { yPercent: 18, opacity: 0.08 },
          { yPercent: 0, opacity: 1, stagger: 0.04, duration: 0.34 },
          0
        )
        .fromTo(
          ".kn-hero-copy",
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.28 },
          0.12
        )
        .fromTo(
          ".kn-hero-link",
          { x: -28, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.24 },
          0.22
        )
        .fromTo(
          ".kn-hero-sheet",
          { xPercent: 10, yPercent: 9, rotate: -4, scale: 0.9, opacity: 0 },
          { xPercent: 0, yPercent: 0, rotate: 0, scale: 1, opacity: 1, duration: 0.42 },
          0.08
        )
        .to(".kn-hero-bg-text", { yPercent: -4, duration: 0.18 }, 0.78)
        .to(".kn-hero-sheet", { yPercent: -4, scale: 1.035, duration: 0.18 }, 0.78)
        .to(".kn-hero-copy", { y: -16, duration: 0.18 }, 0.78);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="materials-showcase" className="kn-hero">
      <div className="kn-hero-bg-text" aria-hidden="true">
        <span>Materials</span>
        <span>For</span>
        <span>Lasting</span>
        <span>Structures</span>
      </div>

      <div className="kn-hero-sheet">
        <img
          src="/tonbackground.svg"
          alt="Tấm tôn cán sóng"
          className="kn-hero-sheet-image"
        />
      </div>

      <div className="kn-hero-copy">
        <p>
          Chúng tôi cung cấp giải pháp vật liệu thép chất lượng cao cho mọi công trình.
          Bền vững hôm nay, vững chắc tương lai.
        </p>
        <a
          href="#material-explorer"
          className="kn-hero-link"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("material-explorer")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Khám phá <span>→</span>
        </a>
      </div>

      <div className="kn-hero-scroll" aria-hidden="true">
        <span />
        <p>Scroll</p>
      </div>

      <div className="kn-hero-tags" aria-label="Giá trị thương hiệu">
        <span>Chất lượng</span>
        <span>Uy tín</span>
        <span>Bền vững</span>
      </div>

      <div className="kn-hero-index" aria-hidden="true">
        <strong>01</strong>
        <span>/ 05</span>
        <i />
      </div>
    </section>
  );
}
