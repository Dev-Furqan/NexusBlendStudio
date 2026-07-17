import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Project, ProjectAccent } from "@/lib/projects";
import { GlassCard } from "./glass-card";

const accentClasses: Record<ProjectAccent, { glow: string; line: string; text: string }> = {
  red: {
    glow: "from-red-500/30 via-accent-magenta/18 to-transparent",
    line: "from-red-500 to-accent-magenta",
    text: "text-red-300",
  },
  coral: {
    glow: "from-orange-400/28 via-accent-magenta/16 to-transparent",
    line: "from-orange-300 to-accent-magenta",
    text: "text-orange-200",
  },
  mint: {
    glow: "from-emerald-300/24 via-accent-cyan/16 to-transparent",
    line: "from-emerald-300 to-accent-cyan",
    text: "text-emerald-200",
  },
  violet: {
    glow: "from-accent-violet/30 via-accent-magenta/14 to-transparent",
    line: "from-accent-violet to-accent-magenta",
    text: "text-violet-200",
  },
  cyan: {
    glow: "from-accent-cyan/24 via-accent-violet/14 to-transparent",
    line: "from-accent-cyan to-accent-violet",
    text: "text-cyan-200",
  },
};

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const accent = accentClasses[project.accent];

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      data-magnetic="0.055"
      data-reveal
      className="block h-full"
      aria-label={`Open ${project.title} project`}
    >
      <GlassCard className="project-card h-full">
        <div className="relative h-56 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#090b10]">
          <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow}`} />
          <Image
            src={project.thumbnail}
            alt={`${project.title} website thumbnail`}
            fill
            sizes="(min-width: 1280px) 31vw, (min-width: 768px) 46vw, 92vw"
            priority={priority}
            className="object-cover object-top opacity-[0.92] transition duration-500 group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/72 via-background/8 to-transparent" />
          <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r ${accent.line}`} />
        </div>
        <div className="pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${accent.text}`}>{project.category}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-normal text-white">{project.title}</h3>
            </div>
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/60 transition-all duration-300 group-hover:border-accent-cyan/30 group-hover:bg-accent-cyan/10 group-hover:text-accent-cyan">
              <ArrowUpRight size={17} />
            </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-text-muted">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-[10px] text-white/45">
                {item}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </a>
  );
}
