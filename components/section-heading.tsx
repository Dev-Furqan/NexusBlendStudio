type SectionEyebrowProps = {
  children: string;
  className?: string;
};

export function SectionEyebrow({ children, className = "" }: SectionEyebrowProps) {
  const label = children.replace(/^\/\/\s*/, "");
  return (
    <p className={`font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-accent-cyan ${className}`}>
      <span className="text-accent-violet">{"//"}</span> {label}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header>
      {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
      <h2 className="mt-3 font-display text-4xl font-semibold tracking-normal text-text-primary">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl leading-7 text-text-muted">{description}</p> : null}
    </header>
  );
}
