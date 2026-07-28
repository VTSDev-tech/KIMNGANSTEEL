"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function EditorialScrollFlow() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP & TABLET SEAMLESS TRANSITION FLOW
      mm.add("(min-width: 768px)", () => {
        const explorer = document.getElementById("material-explorer");
        const application = document.getElementById("building-applications");
        const projects = document.getElementById("projects");

        // -----------------------------------------------------------
        // TRANSITION A: MATERIAL EXPLORER -> MATERIAL APPLICATION
        // -----------------------------------------------------------
        if (explorer && application) {
          const carousel = explorer.querySelector(".kn-explorer-carousel");
          const panel = explorer.querySelector(".kn-explorer-panel");
          const visual = explorer.querySelector(".kn-explorer-visual");

          const appHeader = application.querySelector(".kn-app-header");
          const museumModel = application.querySelector(".kn-app-museum-model");
          const hotspots = application.querySelectorAll(".kn-app-hotspot-item");
          const appPanel = application.querySelector(".kn-app-info-panel");

          // 1. Near end of Material Explorer, fade carousel, panel & annotations first
          const tlA = gsap.timeline({
            scrollTrigger: {
              trigger: explorer,
              start: "bottom 90%",
              end: "bottom 20%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

          if (carousel) tlA.to(carousel, { opacity: 0, y: -20, ease: "none" }, 0);
          if (panel) tlA.to(panel, { opacity: 0, y: -20, ease: "none" }, 0);
          if (visual) {
            tlA.to(visual, { scale: 0.98, y: -30, opacity: 0.6, ease: "none" }, 0);
          }

          // 2. Material Application enters seamlessly without dead space
          if (appHeader && museumModel) {
            gsap.fromTo(
              appHeader,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: application,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );

            gsap.fromTo(
              museumModel,
              { opacity: 0, scale: 1.02, y: 40 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: application,
                  start: "top 70%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (hotspots.length > 0) {
            gsap.fromTo(
              hotspots,
              { opacity: 0, scale: 0.95 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: application,
                  start: "top 60%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (appPanel) {
            gsap.fromTo(
              appPanel,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: application,
                  start: "top 55%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }

        // -----------------------------------------------------------
        // TRANSITION B: MATERIAL APPLICATION -> FEATURED PROJECTS
        // -----------------------------------------------------------
        if (application && projects) {
          const appPanel = application.querySelector(".kn-app-info-panel");
          const museumModel = application.querySelector(".kn-app-museum-model");
          const hotspots = application.querySelectorAll(".kn-app-hotspot-item");

          const firstProjectImg = projects.querySelector("img");

          const tlB = gsap.timeline({
            scrollTrigger: {
              trigger: application,
              start: "bottom 85%",
              end: "bottom 15%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

          if (appPanel) tlB.to(appPanel, { opacity: 0, y: -20, ease: "none" }, 0);
          if (hotspots.length > 0) tlB.to(hotspots, { opacity: 0, ease: "none" }, 0);

          if (museumModel) {
            tlB.to(museumModel, { scale: 0.97, opacity: 0.35, y: -30, ease: "none" }, 0);
          }

          // Restrained crossfade to first real project photograph
          if (firstProjectImg) {
            gsap.fromTo(
              firstProjectImg,
              { opacity: 0.6, scale: 1.02 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: projects,
                  start: "top 75%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }
      });
    });

    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleRefresh);
    window.addEventListener("orientationchange", handleRefresh);

    return () => {
      window.removeEventListener("resize", handleRefresh);
      window.removeEventListener("orientationchange", handleRefresh);
      ctx.revert();
    };
  }, []);

  return null;
}
