"use client";

import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function setupSmoothScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1,
  });
  const updateScrollTrigger = () => ScrollTrigger.update();
  const updateLenis = (time: number) => lenis.raf(time * 1000);

  lenis.on("scroll", updateScrollTrigger);
  gsap.ticker.add(updateLenis);
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.off("scroll", updateScrollTrigger);
    gsap.ticker.remove(updateLenis);
    lenis.destroy();
  };
}
