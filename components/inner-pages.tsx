"use client";

import {
  ArrowUpRight,
  Check,
  Clock3,
  Code2,
  Compass,
  Gem,
  HeartHandshake,
  Mail,
  MapPin,
  Megaphone,
  PenTool,
  Pin,
  Phone,
  Quote,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { FormEvent, ReactNode, RefObject } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { projectCategories, projects, type Project } from "@/lib/projects";
import { Button, buttonVariants } from "./button";
import { GlassCard } from "./glass-card";
import { ProjectCard as PortfolioProjectCard } from "./project-card";
import { SectionEyebrow } from "./section-heading";

type Icon = typeof Code2;

const missionVision = [
  {
    title: "Mission",
    description:
      "To help ambitious brands turn ideas into refined digital products through strategy, design, and precise engineering.",
    icon: Target,
  },
  {
    title: "Vision",
    description:
      "To become the creative technology partner teams trust when they need digital experiences that feel beautiful, useful, and built to last.",
    icon: Compass,
  },
];

const timeline = [
  { year: "2016", title: "Founded", description: "Nexus Blend began with a focused belief: design and code work best when they grow together." },
  { year: "2018", title: "First Studio", description: "We expanded into a dedicated studio and delivered larger product, brand, and web experiences." },
  { year: "2020", title: "Remote Growth", description: "Our team moved into a flexible global workflow and helped clients launch through rapid change." },
  { year: "2022", title: "Full Service", description: "Strategy, design, development, marketing, and support became one connected delivery system." },
  { year: "2024", title: "Innovation", description: "We sharpened our motion, automation, and product systems to build faster without losing craft." },
];

const values = [
  {
    title: "Excellence",
    description: "We sweat the details, from interface rhythm to production performance, because polished work compounds.",
    icon: Gem,
  },
  {
    title: "Passion",
    description: "We bring curiosity and ownership to every brief, treating each project like a chance to make something memorable.",
    icon: Sparkles,
  },
  {
    title: "Collaboration",
    description: "Clear communication, shared context, and honest iteration keep our clients close to the work as it evolves.",
    icon: HeartHandshake,
  },
];

const services = [
  {
    title: "Web Development",
    description: "High-performance websites and applications built with clean architecture, responsive behavior, and scalable foundations.",
    icon: Code2,
    checklist: ["Frontend development", "Backend systems", "API integration", "CMS setup", "Performance tuning", "Launch support"],
  },
  {
    title: "Web Design",
    description: "Elegant, conversion-minded interfaces that give your brand a clear digital presence across every screen size.",
    icon: PenTool,
    checklist: ["UX research", "Wireframes", "Visual design", "Design systems", "Responsive layouts", "Prototype reviews"],
  },
  {
    title: "Mobile Apps",
    description: "Polished mobile experiences for startups and growing teams, designed around speed, clarity, and everyday usability.",
    icon: Smartphone,
    checklist: ["iOS design", "Android design", "Cross-platform builds", "User flows", "App testing", "Release guidance"],
  },
  {
    title: "Digital Marketing",
    description: "Campaigns, content, and optimization strategies that help the right people find you and take action.",
    icon: Megaphone,
    checklist: ["SEO strategy", "Paid campaigns", "Content planning", "Analytics setup", "Conversion tracking", "Growth reports"],
  },
  {
    title: "Pinterest Management",
    description: "Monthly pin design and scheduling for Etsy sellers, Shopify boutiques, and bloggers who want Pinterest to drive sales without the daily workload.",
    icon: Pin,
    checklist: ["Canva template packs", "Tailwind-ready pin layouts", "Monthly pin design", "Pin scheduling", "Keyword optimization", "Performance reporting"],
  },
  {
    title: "Brand Identity",
    description: "Distinct visual systems that give your business a recognizable voice, from logos to launch-ready brand assets.",
    icon: Sparkles,
    checklist: ["Logo direction", "Color systems", "Typography", "Brand guidelines", "Social assets", "Launch kits"],
  },
  {
    title: "UI/UX Strategy",
    description: "Structured product thinking that turns complex user needs into intuitive flows, screens, and measurable outcomes.",
    icon: Search,
    checklist: ["Journey mapping", "Information architecture", "Usability audits", "Product strategy", "User testing", "UX documentation"],
  },
  {
    title: "E-commerce Solutions",
    description: "Storefronts and shopping experiences built to make browsing easier, checkout faster, and management simpler.",
    icon: ShoppingBag,
    checklist: ["Product catalogs", "Checkout flows", "Payment setup", "Inventory logic", "Email flows", "Store analytics"],
  },
  {
    title: "Maintenance & Support",
    description: "Reliable technical care after launch, keeping your site stable, secure, updated, and ready for the next move.",
    icon: ShieldCheck,
    checklist: ["Bug fixes", "Security updates", "Content changes", "Monitoring", "Backups", "Priority support"],
  },
];

const testimonials = [
  {
    name: "Jennifer Williams",
    role: "Founder & CEO, Lumina Labs",
    quote:
      "Nexus Blend transformed our vision into a digital experience beyond what we imagined. Their creativity, precision, and commitment made them feel like part of our own team.",
  },
  {
    name: "Michael Thompson",
    role: "Creative Director, Thumbrush",
    quote:
      "The team understood our customers quickly and delivered a storefront that feels premium, fast, and easy to manage. The launch was smoother than we expected.",
  },
  {
    name: "Lisa Anderson",
    role: "Marketing Lead, BrightPath",
    quote:
      "Their mix of strategy and design helped us clarify our message and turn traffic into real inquiries. Every review felt thoughtful and focused.",
  },
  {
    name: "Robert Chang",
    role: "Product Lead, MediConnect AI",
    quote:
      "Nexus Blend handled complex dashboard requirements with calm precision. The final product made our data easier to understand and easier to act on.",
  },
  {
    name: "Amanda Foster",
    role: "Operations Manager, EstatePoint",
    quote:
      "They brought structure to a messy brief and shaped it into a beautiful property experience. Communication was clear from kickoff to launch.",
  },
  {
    name: "David Park",
    role: "Co-founder, ScaleNest",
    quote:
      "Fast, collaborative, and detail-oriented. Nexus Blend gave us a site that finally matched the quality of the work we do for our clients.",
  },
];

const testimonialStats = [
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 250, suffix: "+", label: "Projects Completed" },
  { value: 98, suffix: "%", label: "On-Time Delivery" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

function usePageMotion(root: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!root.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("@/lib/gsap").then(({ gsap }) => {
      if (cancelled || !root.current) return;
      const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.from("[data-page-header] > *", {
          opacity: 0,
          y: 28,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-section]").forEach((section) => {
          gsap.from(section.querySelectorAll("[data-reveal]"), {
            opacity: 0,
            y: 42,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 78%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-timeline-node]").forEach((node) => {
          gsap.from(node, {
            opacity: 0,
            y: 34,
            scale: 0.96,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: node, start: "top 82%", once: true },
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
          const strength = Number(element.dataset.magnetic) || 0.14;
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
          cleanups.push(() => {
            element.removeEventListener("mousemove", onMove);
            element.removeEventListener("mouseleave", onLeave);
          });
        });
      }
      }, root);

      cleanup = () => {
        cleanups.forEach((dispose) => dispose());
        ctx.revert();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [root]);
}

export function AboutPage() {
  const root = useRef<HTMLElement>(null);
  usePageMotion(root);

  return (
    <main ref={root} className="overflow-hidden" aria-label="About Nexus Blend">
      <PageHeader
        eyebrow="ABOUT"
        title="About Nexus Blend"
        description="We are a multidisciplinary team blending strategy, design, and code to create digital experiences that feel precise, memorable, and built for growth."
      />
      <section data-reveal-section className="relative py-20 sm:py-28">
        <SectionGlow side="right" />
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {missionVision.map(({ title, description, icon: Icon }) => (
              <GlassCard key={title} data-reveal>
                <IconBox icon={Icon} />
                <h2 className="mt-8 font-display text-3xl font-semibold tracking-normal text-white">{title}</h2>
                <p className="mt-4 leading-7 text-text-muted">{description}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>
      <section className="relative border-y border-white/[0.055] bg-white/[0.012] py-20 sm:py-28">
        <Container>
          <SectionIntro eyebrow="OUR JOURNEY" title="From 2016 Founded to 2024 Innovation" />
          <div className="relative mt-14">
            <div className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent-violet via-accent-cyan to-accent-magenta shadow-[0_0_18px_rgba(6,229,198,.35)] md:left-1/2" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <article key={`${item.year}-${item.title}`} data-timeline-node className={`relative grid gap-5 pl-12 md:grid-cols-2 md:pl-0 ${index % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"}`}>
                  <span className="absolute left-[0.55rem] top-2 z-10 size-4 rounded-full border border-accent-cyan/70 bg-background shadow-[0_0_22px_rgba(6,229,198,.8)] md:left-[calc(50%-0.5rem)]" />
                  <GlassCard className={index % 2 === 0 ? "md:mr-10" : "md:ml-10"}>
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent-cyan">{item.year}</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-normal text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-text-muted">{item.description}</p>
                  </GlassCard>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section data-reveal-section className="py-20 sm:py-28">
        <Container>
          <SectionIntro eyebrow="OUR VALUES" title="The principles behind every launch" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map(({ title, description, icon: Icon }) => (
              <GlassCard key={title} data-reveal>
                <IconBox icon={Icon} />
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-normal text-white">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-text-muted">{description}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>
      <section data-reveal-section className="relative pb-28">
        <SectionGlow side="left" />
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div data-reveal><SectionEyebrow>TEAM</SectionEyebrow></div>
              <h2 data-reveal className="mt-4 font-display text-4xl font-semibold tracking-normal text-white sm:text-5xl">Meet the people shaping the work</h2>
              <p data-reveal className="mt-5 max-w-xl leading-7 text-text-muted">
                A focused group of designers, developers, strategists, and creative problem-solvers shaping digital work with care.
              </p>
              <div data-reveal className="mt-8"><MagneticLink href="/contact">Meet the Team <ArrowUpRight size={16} /></MagneticLink></div>
            </div>
            <div data-reveal className="grid gap-4 md:grid-cols-3 md:gap-5">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="relative aspect-square rounded-full p-px shadow-[0_0_30px_rgba(124,58,237,.16)]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-violet via-accent-cyan to-accent-magenta opacity-70 blur-sm" />
                  <div className="relative grid h-full rounded-full border border-white/10 bg-surface/80 place-items-center backdrop-blur-xl">
                    <Users className="text-white/35" size={index % 2 === 0 ? 24 : 20} strokeWidth={1.5} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export function ServicesPage() {
  const root = useRef<HTMLElement>(null);
  usePageMotion(root);

  return (
    <main ref={root} className="overflow-hidden" aria-label="Nexus Blend services">
      <PageHeader
        eyebrow="SERVICES"
        title="Services"
        description="Comprehensive design, development, marketing, and support services for brands that want their digital presence to work beautifully."
      />
      <section data-reveal-section className="relative py-20 sm:py-28">
        <SectionGlow side="right" />
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map(({ title, description, icon: Icon, checklist }, index) => (
              <GlassCard key={title} data-reveal>
                <div className="flex flex-col gap-7 sm:flex-row sm:items-start">
                  <div className="shrink-0">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-cyan">{String(index + 1).padStart(2, "0")} /</p>
                    <div className="mt-5"><IconBox icon={Icon} /></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-3xl font-semibold tracking-normal text-white">{title}</h2>
                    <p className="mt-4 text-sm leading-6 text-text-muted">{description}</p>
                    <ul className="mt-6 grid gap-3 md:grid-cols-2">
                      {checklist.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                          <Check size={15} className="shrink-0 text-accent-cyan" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7">
                      <MagneticLink href="/contact" variant="secondary">Get Quote <ArrowUpRight size={16} /></MagneticLink>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>
      <ClosingCta title="Ready to Start Your Project?" description="Let's create something amazing together" />
    </main>
  );
}

export function PortfolioPage() {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<"All" | Project["category"]>("All");
  usePageMotion(root);

  const filteredProjects = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  return (
    <main ref={root} className="overflow-hidden" aria-label="Nexus Blend portfolio">
      <PageHeader
        eyebrow="PORTFOLIO"
        title="Portfolio"
        description="A focused selection of digital products and brand experiences designed to feel sharp, useful, and ready for growth."
      />
      <section data-reveal-section className="relative py-20 sm:py-28">
        <SectionGlow side="left" />
        <Container>
          <div data-reveal className="flex flex-wrap gap-3 rounded-full border border-white/[0.08] bg-white/[0.025] p-2 backdrop-blur-xl">
            {(["All", ...projectCategories] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
                className={`rounded-full px-5 py-2.5 font-display text-sm font-semibold transition-all duration-300 ${
                  filter === item
                    ? "bg-accent-gradient text-white shadow-[0_8px_24px_rgba(124,58,237,.24)]"
                    : "text-text-muted hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <PortfolioProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

export function TestimonialsPage() {
  const root = useRef<HTMLElement>(null);
  usePageMotion(root);

  return (
    <main ref={root} className="overflow-hidden" aria-label="Nexus Blend testimonials">
      <PageHeader
        eyebrow="TESTIMONIALS"
        title="Testimonials"
        description="Client stories from teams who trusted Nexus Blend to shape, launch, and refine their digital presence."
      />
      <section data-reveal-section className="relative py-20 sm:py-28">
        <SectionGlow side="right" />
        <Container>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((testimonial) => (
              <GlassCard key={testimonial.name} data-reveal className="min-h-[320px]">
                <Quote size={28} strokeWidth={1.5} className="text-accent-cyan/80" />
                <blockquote className="mt-6 text-sm leading-7 text-white/78">&quot;{testimonial.quote}&quot;</blockquote>
                <div className="mt-7 flex gap-1 text-accent-cyan">
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} fill="currentColor" />)}
                </div>
                <div className="mt-6 border-t border-white/[0.07] pt-5">
                  <p className="font-display font-semibold text-white">{testimonial.name}</p>
                  <p className="mt-1 text-xs text-text-muted">{testimonial.role}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>
      <StatsBand stats={testimonialStats} />
      <ClosingCta title="Ready to Start Your Project?" description="Let's create something amazing together" />
    </main>
  );
}

export function ContactPage() {
  const root = useRef<HTMLElement>(null);
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  usePageMotion(root);

  const updateField = (field: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSuccess(false);
    setSubmitError("");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!values.name.trim()) nextErrors.name = "Name is required.";
    if (!values.email.trim()) nextErrors.email = "Email is required.";
    if (!values.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!values.message.trim()) nextErrors.message = "Message is required.";
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Message could not be sent right now.");
      }

      setIsSubmitting(false);
      setSuccess(true);
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(error instanceof Error ? error.message : "Message could not be sent right now.");
    }
  };

  return (
    <main ref={root} className="overflow-hidden" aria-label="Contact Nexus Blend">
      <PageHeader
        eyebrow="CONTACT"
        title="Contact"
        description="Tell us what you are building. We will review the details and help shape the next practical step for your project."
      />
      <section data-reveal-section className="relative py-20 sm:py-28">
        <SectionGlow side="left" />
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <GlassCard data-reveal>
              <form onSubmit={onSubmit} noValidate className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Name" name="name" value={values.name} error={errors.name} onChange={(value) => updateField("name", value)} />
                  <Field label="Email" name="email" type="email" value={values.email} error={errors.email} onChange={(value) => updateField("email", value)} />
                </div>
                <Field label="Subject" name="subject" value={values.subject} error={errors.subject} onChange={(value) => updateField("subject", value)} />
                <Field label="Message" name="message" value={values.message} error={errors.message} onChange={(value) => updateField("message", value)} multiline onChangeText={(value) => updateField("message", value)} />
                <div className="flex flex-wrap items-center gap-4">
                  <Button type="submit" disabled={isSubmitting} className="gap-2">
                    {isSubmitting ? "Sending..." : "Send Message"} <Send size={16} />
                  </Button>
                  {success ? <p className="text-sm text-accent-cyan">Message received. We&apos;ll get back to you shortly.</p> : null}
                  {submitError ? <p className="text-sm text-accent-magenta">{submitError}</p> : null}
                </div>
              </form>
            </GlassCard>
            <GlassCard data-reveal>
              <SectionEyebrow>CONTACT INFO</SectionEyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-normal text-white">Let&apos;s talk through the details</h2>
              <div className="mt-8 grid gap-5">
                <InfoItem icon={Mail} title="Email" detail="nexusblendd@gmail.com" />
                <InfoItem icon={Phone} title="Phone" detail="+92 332 3658045" />
                <InfoItem icon={Clock3} title="Office Hours" detail="Monday - Saturday, 10:00 AM - 7:00 PM" />
              </div>
              <div className="mt-8 rounded-3xl border border-white/[0.08] bg-white/[0.035] p-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent-gradient text-white">
                    <MapPin size={19} />
                  </span>
                  <div>
                    <p className="font-display font-semibold text-white">Karachi, Pakistan</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-muted">Office Location</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </section>
    </main>
  );
}

function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_25%,rgba(124,58,237,.18),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(6,229,198,.1),transparent_32%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:74px_74px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      <Container>
        <header data-page-header className="max-w-4xl">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-normal text-white sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-text-muted sm:text-lg sm:leading-8">{description}</p>
        </header>
      </Container>
    </section>
  );
}

function SectionIntro({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="max-w-3xl">
      <div data-reveal><SectionEyebrow>{eyebrow}</SectionEyebrow></div>
      <h2 data-reveal className="mt-4 font-display text-4xl font-semibold leading-[1.06] tracking-normal text-white sm:text-5xl">{title}</h2>
    </header>
  );
}

function Container({ children }: { children: ReactNode }) {
  return <div className="relative mx-auto w-full max-w-[1280px] px-6 sm:px-8">{children}</div>;
}

function SectionGlow({ side }: { side: "left" | "right" }) {
  return <div className={`pointer-events-none absolute top-1/3 size-[28rem] rounded-full blur-[130px] ${side === "left" ? "-left-64 bg-accent-violet/[0.07]" : "-right-64 bg-accent-cyan/[0.055]"}`} />;
}

function IconBox({ icon: Icon }: { icon: Icon }) {
  return (
    <span className="grid size-12 place-items-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-accent-violet/20 to-accent-cyan/10 text-accent-cyan shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
      <Icon size={21} strokeWidth={1.7} />
    </span>
  );
}

function MagneticLink({ href, variant = "primary", children }: { href: string; variant?: "primary" | "secondary"; children: ReactNode }) {
  return <Link href={href} data-magnetic="0.2" className={`${buttonVariants(variant)} gap-2`}>{children}</Link>;
}

function StatsBand({ stats }: { stats: typeof testimonialStats }) {
  return (
    <section data-reveal-section className="border-y border-white/[0.06] bg-white/[0.018] py-16">
      <Container>
        <div className="grid gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} data-reveal className={`text-center ${index > 0 ? "lg:border-l lg:border-white/[0.07]" : ""}`}>
              <strong data-stat-value={stat.value} data-stat-suffix={stat.suffix} className="bg-gradient-to-r from-[#a78bfa] to-accent-cyan bg-clip-text font-display text-4xl font-semibold tracking-normal text-transparent sm:text-5xl">0{stat.suffix}</strong>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ClosingCta({ title, description }: { title: string; description: string }) {
  return (
    <section data-reveal-section className="relative overflow-hidden border-t border-white/[0.05] py-28 sm:py-36">
      <div className="cta-glow absolute left-[18%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent-violet/20 blur-[110px]" />
      <div className="cta-glow absolute right-[18%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent-cyan/12 blur-[110px] [animation-delay:-4s]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
        <div data-reveal className="mx-auto grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-accent-cyan"><Sparkles size={20} /></div>
        <h2 data-reveal className="mt-7 font-display text-4xl font-semibold tracking-normal text-white sm:text-6xl">{title}</h2>
        <p data-reveal className="mt-5 text-base text-text-muted sm:text-lg">{description}</p>
        <div data-reveal className="mt-9 flex justify-center"><MagneticLink href="/contact">Get in Touch <ArrowUpRight size={16} /></MagneticLink></div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  error,
  type = "text",
  multiline = false,
  onChange,
  onChangeText,
}: {
  label: string;
  name: string;
  value: string;
  error?: string;
  type?: string;
  multiline?: boolean;
  onChange: (value: string) => void;
  onChangeText?: (value: string) => void;
}) {
  const fieldId = `contact-${name}`;
  const errorId = `${fieldId}-error`;
  const inputClass =
    "w-full rounded-2xl border border-white/[0.09] bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-accent-cyan/50 focus:bg-white/[0.055]";
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">{label}</span>
      {multiline ? (
        <textarea
          id={fieldId}
          name={name}
          required
          value={value}
          onChange={(event) => (onChangeText || onChange)(event.target.value)}
          placeholder={label}
          rows={6}
          className={`${inputClass} mt-2 resize-none`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={label}
          className={`${inputClass} mt-2`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      )}
      {error ? <span id={errorId} className="mt-2 block text-xs text-accent-magenta">{error}</span> : null}
    </label>
  );
}

function InfoItem({ icon: Icon, title, detail }: { icon: Icon; title: string; detail: string }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-white/[0.08] text-accent-cyan">
        <Icon size={18} strokeWidth={1.7} />
      </span>
      <div>
        <p className="font-display text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-text-muted">{detail}</p>
      </div>
    </div>
  );
}
