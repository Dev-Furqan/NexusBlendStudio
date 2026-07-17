"use client";

import {
  ArrowUpRight,
  Code2,
  Headphones,
  Megaphone,
  PenTool,
  Quote,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { projects } from "@/lib/projects";
import { buttonVariants } from "./button";
import { GlassCard } from "./glass-card";
import { ProjectCard } from "./project-card";
import { SectionEyebrow } from "./section-heading";

type Icon = typeof Code2;

const services: { title: string; description: string; icon: Icon }[] = [
  {
    title: "Web Development",
    description: "Fast, scalable websites engineered for seamless performance and lasting growth.",
    icon: Code2,
  },
  {
    title: "Web Design",
    description: "Distinctive, intuitive interfaces designed to turn attention into meaningful action.",
    icon: PenTool,
  },
  {
    title: "Mobile Apps",
    description: "Polished mobile experiences that feel effortless on every screen and platform.",
    icon: Smartphone,
  },
  {
    title: "Digital Marketing",
    description: "Data-led campaigns that build awareness, attract audiences, and drive results.",
    icon: Megaphone,
  },
];

const features: { title: string; description: string; icon: Icon; number: string }[] = [
  {
    title: "Expert Team",
    description: "A focused team of designers, developers, and strategists committed to exceptional craft.",
    icon: Users,
    number: "01",
  },
  {
    title: "Fast Delivery",
    description: "Clear processes and agile collaboration keep ambitious projects moving without compromise.",
    icon: Zap,
    number: "02",
  },
  {
    title: "24/7 Support",
    description: "Dependable support whenever you need it, from launch day through every stage of growth.",
    icon: Headphones,
    number: "03",
  },
];

const stats = [
  { value: 150, suffix: "+", label: "Projects Completed" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 25, suffix: "+", label: "Team Members" },
];

export function HomePage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const listenerCleanups: Array<() => void> = [];
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("@/lib/gsap").then(({ gsap }) => {
      if (cancelled || !root.current) return;
      const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        heroTimeline
          .from("[data-hero-eyebrow]", { opacity: 0, y: 18, duration: 0.7 })
          .from("[data-hero-line]", { opacity: 0, yPercent: 105, rotateX: -12, stagger: 0.11, duration: 0.95 }, "-=0.35")
          .from("[data-hero-copy]", { opacity: 0, y: 24, duration: 0.75 }, "-=0.45")
          .from("[data-hero-actions] > *", { opacity: 0, y: 18, stagger: 0.1, duration: 0.65 }, "-=0.4")
          .from("[data-hero-detail]", { opacity: 0, y: 12, duration: 0.6 }, "-=0.25");

        gsap.to("[data-mesh='one']", {
          xPercent: 12,
          yPercent: 10,
          rotate: 16,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to("[data-mesh='two']", {
          xPercent: -14,
          yPercent: 12,
          scale: 1.12,
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to("[data-mesh-layer]", {
          yPercent: 24,
          ease: "none",
          scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 1.1 },
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-section]").forEach((section) => {
          const children = section.querySelectorAll("[data-reveal]");
          gsap.from(children, {
            opacity: 0,
            y: 42,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 78%", once: true },
          });
        });

        root.current?.querySelectorAll<HTMLElement>("[data-stat-value]").forEach((element) => {
          const target = Number(element.dataset.statValue || 0);
          const suffix = element.dataset.statSuffix || "";
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
            onUpdate: () => {
              element.textContent = `${Math.round(counter.value)}${suffix}`;
            },
          });
        });
      } else {
        root.current?.querySelectorAll<HTMLElement>("[data-stat-value]").forEach((element) => {
          element.textContent = `${element.dataset.statValue || "0"}${element.dataset.statSuffix || ""}`;
        });
      }

      if (!prefersReducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        root.current?.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
          const strength = Number(element.dataset.magnetic) || 0.18;
          const moveX = gsap.quickTo(element, "x", { duration: 0.45, ease: "power3.out" });
          const moveY = gsap.quickTo(element, "y", { duration: 0.45, ease: "power3.out" });
          const onMove = (event: MouseEvent) => {
            const bounds = element.getBoundingClientRect();
            moveX((event.clientX - bounds.left - bounds.width / 2) * strength);
            moveY((event.clientY - bounds.top - bounds.height / 2) * strength);
          };
          const onLeave = () => {
            moveX(0);
            moveY(0);
          };
          element.addEventListener("mousemove", onMove);
          element.addEventListener("mouseleave", onLeave);
          listenerCleanups.push(() => {
            element.removeEventListener("mousemove", onMove);
            element.removeEventListener("mouseleave", onLeave);
          });
        });
      }
      }, root);

      cleanup = () => {
        listenerCleanups.forEach((dispose) => dispose());
        ctx.revert();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <main ref={root} className="overflow-hidden" aria-label="Nexus Blend home page">
      <Hero />
      <Services />
      <WhyChooseUs />
      <FeaturedProjects />
      <Stats />
      <Testimonial />
      <ClosingCta />
    </main>
  );
}

function Hero() {
  return (
    <section data-hero className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32 sm:pt-40">
      <div data-mesh-layer className="pointer-events-none absolute inset-0 -top-28">
        <div data-mesh="one" className="absolute left-[-12%] top-[4%] h-[58vw] max-h-[720px] min-h-[420px] w-[58vw] min-w-[420px] rounded-[42%_58%_63%_37%] bg-accent-violet/20 blur-[120px]" />
        <div data-mesh="two" className="absolute right-[-10%] top-[13%] h-[48vw] max-h-[640px] min-h-[360px] w-[48vw] min-w-[360px] rounded-[61%_39%_46%_54%] bg-accent-cyan/10 blur-[130px]" />
        <div className="absolute left-[38%] top-[34%] size-[24rem] rounded-full bg-accent-magenta/[0.055] blur-[130px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:74px_74px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="relative mx-auto w-full max-w-[1280px] px-6 sm:px-8">
        <div className="max-w-[1000px]">
          <div data-hero-eyebrow>
            <SectionEyebrow>DIGITAL MARKETING · DESIGN · DEVELOPMENT</SectionEyebrow>
          </div>
          <h1 className="mt-7 font-display text-[clamp(2.55rem,12vw,7.2rem)] leading-[0.94] tracking-normal text-white [perspective:800px]">
            <span className="block overflow-hidden pb-[0.08em]"><span data-hero-line className="block font-light">Blending Design</span></span>
            <span className="block overflow-hidden pb-[0.08em]"><span data-hero-line className="block font-semibold">and Code into</span></span>
            <span className="block overflow-hidden pb-[0.1em]"><span data-hero-line className="block bg-gradient-to-r from-white via-[#b7a6ff] to-accent-cyan bg-clip-text font-semibold text-transparent">Digital Perfection</span></span>
          </h1>
          <p data-hero-copy className="mt-7 max-w-2xl text-base leading-7 text-text-muted sm:text-lg sm:leading-8">
            We craft exceptional digital experiences that seamlessly merge stunning design with powerful code.
          </p>
          <div data-hero-actions className="mt-9 flex flex-wrap gap-4">
            <MagneticLink href="/portfolio" variant="primary">View Our Work <ArrowUpRight size={16} /></MagneticLink>
            <MagneticLink href="/contact" variant="secondary">Get in Touch</MagneticLink>
          </div>
        </div>
        <div data-hero-detail className="absolute bottom-[-14vh] right-8 hidden items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/35 lg:flex">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/35" /> Scroll to explore
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section data-reveal-section className="relative py-24 sm:py-32">
      <SectionGlow side="right" />
      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionIntro eyebrow="OUR SERVICES" title="Comprehensive solutions for your digital needs" />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, description, icon: Icon }, index) => (
            <GlassCard key={title} data-reveal className="min-h-[270px]">
              <div className="flex h-full flex-col">
                <span className="grid size-12 place-items-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-accent-violet/20 to-accent-cyan/10 text-accent-cyan shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
                  <Icon size={21} strokeWidth={1.7} />
                </span>
                <span className="ml-auto -mt-10 font-mono text-[10px] text-white/20">0{index + 1}</span>
                <h3 className="mt-auto font-display text-xl font-semibold tracking-normal text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-text-muted">{description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
        <div data-reveal className="mt-10 flex justify-end">
          <TextLink href="/services">View All Services</TextLink>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section data-reveal-section className="relative border-y border-white/[0.045] bg-white/[0.012] py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionIntro eyebrow="WHY NEXUS BLEND" title="Experience the difference of working with experts" />
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {features.map(({ title, description, icon: Icon, number }) => (
            <article key={title} data-reveal className="relative border-l border-white/[0.08] pl-7 sm:pl-8">
              <span className="absolute -left-px top-0 h-16 w-px bg-gradient-to-b from-accent-cyan to-transparent shadow-[0_0_12px_#06E5C6]" />
              <div className="flex items-center justify-between">
                <Icon size={24} strokeWidth={1.6} className="text-accent-cyan" />
                <span className="font-mono text-xs text-white/20">{number}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-semibold tracking-normal text-white">{title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-7 text-text-muted">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section data-reveal-section className="relative py-24 sm:py-32">
      <SectionGlow side="left" />
      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionIntro eyebrow="FEATURED WORK" title="Showcasing our latest and greatest work" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
        <div data-reveal className="mt-10 flex justify-end">
          <TextLink href="/portfolio">View Full Portfolio</TextLink>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section data-reveal-section className="border-y border-white/[0.06] bg-white/[0.018] py-16">
      <div className="mx-auto grid max-w-[1280px] gap-y-10 px-6 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} data-reveal className={`text-center ${index > 0 ? "lg:border-l lg:border-white/[0.07]" : ""}`}>
            <strong data-stat-value={stat.value} data-stat-suffix={stat.suffix} className="bg-gradient-to-r from-[#a78bfa] to-accent-cyan bg-clip-text font-display text-4xl font-semibold tracking-normal text-transparent sm:text-5xl">0{stat.suffix}</strong>
            <p className="mt-2 text-xs uppercase tracking-[0.12em] text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section data-reveal-section className="relative py-24 sm:py-32">
      <SectionGlow side="right" />
      <div className="relative mx-auto max-w-[900px] px-6 text-center sm:px-8">
        <div data-reveal><SectionEyebrow className="justify-center">CLIENT STORIES</SectionEyebrow></div>
        <div data-reveal className="mt-10">
          <GlassCard className="text-left sm:text-center">
            <Quote size={34} strokeWidth={1.4} className="mx-auto text-accent-cyan/75" />
            <blockquote className="mx-auto mt-7 max-w-3xl font-display text-2xl font-medium leading-[1.45] tracking-normal text-white sm:text-3xl">
              &quot;Nexus Blend transformed our vision into a digital experience beyond what we imagined. Their creativity, precision, and commitment made them feel like part of our own team.&quot;
            </blockquote>
            <div className="mt-7 flex justify-center gap-1 text-accent-cyan">{[1,2,3,4,5].map((star) => <Star key={star} size={14} fill="currentColor" />)}</div>
            <div className="mt-6">
              <p className="font-display font-semibold text-white">Jennifer Williams</p>
              <p className="mt-1 text-xs text-text-muted">Founder & CEO, Lumina Labs</p>
            </div>
          </GlassCard>
        </div>
        <div data-reveal className="mt-9 flex justify-center"><TextLink href="/testimonials">View All Testimonials</TextLink></div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section data-reveal-section className="relative overflow-hidden border-t border-white/[0.05] py-28 sm:py-36">
      <div className="cta-glow absolute left-[18%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent-violet/20 blur-[110px]" />
      <div className="cta-glow absolute right-[18%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent-cyan/12 blur-[110px] [animation-delay:-4s]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
        <div data-reveal className="mx-auto grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-accent-cyan"><Sparkles size={20} /></div>
        <h2 data-reveal className="mt-7 font-display text-4xl font-semibold tracking-normal text-white sm:text-6xl">Ready to Start Your Project?</h2>
        <p data-reveal className="mt-5 text-base text-text-muted sm:text-lg">Let&apos;s create something amazing together</p>
        <div data-reveal className="mt-9 flex justify-center"><MagneticLink href="/contact" variant="primary">Get in Touch <ArrowUpRight size={16} /></MagneticLink></div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="max-w-3xl">
      <div data-reveal><SectionEyebrow>{eyebrow}</SectionEyebrow></div>
      <h2 data-reveal className="mt-4 font-display text-4xl font-semibold leading-[1.06] tracking-normal text-white sm:text-5xl lg:text-6xl">{title}</h2>
    </header>
  );
}

function SectionGlow({ side }: { side: "left" | "right" }) {
  return <div className={`pointer-events-none absolute top-1/3 size-[28rem] rounded-full blur-[130px] ${side === "left" ? "-left-64 bg-accent-violet/[0.07]" : "-right-64 bg-accent-cyan/[0.055]"}`} />;
}

function MagneticLink({ href, variant, children }: { href: string; variant: "primary" | "secondary"; children: ReactNode }) {
  return <Link href={href} data-magnetic="0.22" className={`${buttonVariants(variant)} gap-2`}>{children}</Link>;
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} data-magnetic="0.12" className="group inline-flex items-center gap-2 font-display text-sm font-semibold text-white"><span className="border-b border-white/20 pb-1 transition-colors group-hover:border-accent-cyan group-hover:text-accent-cyan">{children}</span><ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>;
}
