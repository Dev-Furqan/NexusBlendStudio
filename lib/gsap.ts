"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function createGsapContext(
  scope: Element | string,
  setup: gsap.ContextFunc,
) {
  const context = gsap.context(setup, scope);
  return () => context.revert();
}

export { gsap, ScrollTrigger };
