"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { buttonVariants } from "./button";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

function Logo() {
  return (
    <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Nexus Blend home">
      <span className="relative size-9 overflow-hidden rounded-[10px] shadow-[0_0_24px_rgba(6,229,198,.2)] transition-transform duration-300 group-hover:rotate-6">
        <Image
          src="/logo.png"
          alt=""
          fill
          sizes="36px"
          className="object-cover"
          priority
        />
      </span>
      <span className="font-display text-[17px] font-semibold tracking-normal text-white">
        Nexus <span className="text-white/55">Blend</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuId = "site-mobile-navigation";
  const scrolled = scrollProgress > 0.4;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrollProgress(Math.min(window.scrollY / 140, 1));
    };
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const headerStyle = useMemo(() => {
    const mix = (start: number, end: number) => start + (end - start) * scrollProgress;
    return {
      top: `${mix(0, 18)}px`,
      maxWidth: `${mix(1440, 1120)}px`,
      borderRadius: `${mix(0, 24)}px`,
      paddingLeft: `${mix(32, 18)}px`,
      paddingRight: `${mix(32, 18)}px`,
      paddingTop: `${mix(20, 10)}px`,
      paddingBottom: `${mix(20, 10)}px`,
      backgroundColor: `rgba(12,14,20,${0.72 * scrollProgress})`,
      borderColor: `rgba(255,255,255,${0.09 * scrollProgress})`,
      boxShadow:
        scrollProgress > 0
          ? `0 20px 65px rgba(0,0,0,${0.38 * scrollProgress}), 0 0 30px rgba(124,58,237,${0.06 * scrollProgress})`
          : "0 0 0 rgba(0,0,0,0)",
    };
  }, [scrollProgress]);

  return (
    <header
      className="pointer-events-none fixed inset-x-0 z-50 mx-auto w-[calc(100%-24px)] border backdrop-blur-2xl transition-[padding,border-radius,background-color,border-color,box-shadow,top,max-width] duration-300"
      style={headerStyle}
    >
      <div className="pointer-events-auto flex items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  active ? "text-white" : "text-text-muted hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                {active ? (
                  <span className="absolute inset-x-3 bottom-0 h-px bg-gradient-to-r from-accent-violet to-accent-cyan shadow-[0_0_8px_#06E5C6]" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={`${buttonVariants("primary")} hidden md:inline-flex ${scrolled ? "!px-5 !py-2.5" : ""}`}
          >
            Get Started
          </Link>
          <button
            type="button"
            id="site-menu-button"
            className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white md:hidden"
            aria-controls={menuId}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
          <nav
            id={menuId}
            className="pointer-events-auto overflow-hidden md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mt-4 grid gap-1 rounded-3xl border border-white/[0.08] bg-surface/80 p-3 shadow-glass backdrop-blur-2xl">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    pathname === link.href ? "bg-white/[0.06] text-white" : "text-text-muted hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
    </header>
  );
}
