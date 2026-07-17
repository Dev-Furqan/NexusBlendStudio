"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { CustomCursor } from "./custom-cursor";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    import("@/lib/lenis").then(({ setupSmoothScroll }) => {
      if (cancelled) return;
      cleanup = setupSmoothScroll();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <>
      {children}
      <CustomCursor />
    </>
  );
}
