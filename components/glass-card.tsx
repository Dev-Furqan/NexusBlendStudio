import type { HTMLAttributes } from "react";

export function GlassCard({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`glass-card group relative rounded-3xl p-px ${className}`} data-cursor="interactive" {...props}>
      <div className="relative z-10 h-full rounded-[calc(1.5rem-1px)] border border-white/[0.06] bg-surface/65 p-6 shadow-glass backdrop-blur-2xl">
        {children}
      </div>
    </div>
  );
}
