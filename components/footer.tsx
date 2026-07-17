import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "All Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
];

export function Footer() {
  return (
    <footer className="relative bg-[#07080d]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-violet/45 to-transparent shadow-[0_0_18px_rgba(124,58,237,.18)]" />
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-16 sm:px-8 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.45fr_.75fr_.9fr_1.2fr] lg:gap-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Nexus Blend home">
              <span className="relative size-11 overflow-hidden rounded-xl shadow-[0_0_24px_rgba(6,229,198,.16)]">
                <Image
                  src="/logo.png"
                  alt=""
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <span className="font-display text-xl font-semibold tracking-normal text-white">
                Nexus <span className="text-white/50">Blend</span>
              </span>
            </Link>
            <p className="mt-5 max-w-[300px] text-sm leading-7 text-text-muted">
              Blending Design and Code into Digital Perfection.
            </p>
            <div className="mt-6 flex gap-2.5">
              {[
                { label: "LinkedIn", icon: <LinkedInIcon />, href: "https://www.linkedin.com/company/nexus-blend-studio/" },
                { label: "Instagram", icon: <InstagramIcon />, href: "https://www.instagram.com/nexus.blend/" },
                { label: "X", icon: <XIcon />, href: "https://x.com/home" },
                { label: "Facebook", icon: <FacebookIcon />, href: "https://www.facebook.com/profile.php?id=61576414331904" },
              ].map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/30 hover:text-accent-cyan hover:shadow-[0_0_20px_rgba(6,229,198,.12)]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Services" links={serviceLinks} />

          <div>
            <h2 className="font-display text-sm font-semibold text-white">Contact</h2>
            <ul className="mt-5 space-y-4 text-sm text-text-muted">
              <li>
                <a className="flex items-center gap-3 transition-colors hover:text-white" href="mailto:nexusblendd@gmail.com">
                  <Mail size={16} className="shrink-0 text-accent-cyan" />
                  nexusblendd@gmail.com
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3 transition-colors hover:text-white" href="tel:+923323658045">
                  <Phone size={16} className="shrink-0 text-accent-cyan" />
                  +92 332 3658045
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="shrink-0 text-accent-cyan" />
                Karachi, Pakistan
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.06] pt-7 text-center text-xs text-text-muted sm:text-left">
          © 2026 Nexus Blend. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function SocialSvg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function InstagramIcon() {
  return <SocialSvg><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" /></SocialSvg>;
}

function LinkedInIcon() {
  return <SocialSvg><path d="M6 9v9M6 6.2v.1M10.5 18v-5.1c0-2.4 3.5-2.6 3.5 0V18M10.5 9v9M18 18v-5.8c0-4.7-5.3-4.5-7.5-2" /></SocialSvg>;
}

function XIcon() {
  return <SocialSvg><path d="M5 4l14 16M19 4L5 20" /></SocialSvg>;
}

function FacebookIcon() {
  return <SocialSvg><path d="M14.5 4H13a4 4 0 0 0-4 4v3H6.5v3H9v6h3v-6h2.8l.7-3H12V8.5A1.5 1.5 0 0 1 13.5 7h1z" /></SocialSvg>;
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-display text-sm font-semibold text-white">{title}</h2>
      <ul className="mt-5 space-y-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-text-muted transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
