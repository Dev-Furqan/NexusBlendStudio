import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary";

export function buttonVariants(variant: ButtonVariant = "primary") {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 font-display text-sm font-semibold text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

  return variant === "primary"
    ? `${base} bg-accent-gradient shadow-[0_8px_30px_rgba(124,58,237,.25),0_0_22px_rgba(6,229,198,.1)] hover:-translate-y-0.5 hover:shadow-[0_12px_38px_rgba(124,58,237,.34),0_0_28px_rgba(6,229,198,.18)] before:absolute before:inset-0 before:bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,.25)_45%,transparent_65%)] before:translate-x-[-140%] before:transition-transform before:duration-700 hover:before:translate-x-[140%]`
    : `${base} border border-white/15 bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,.05)] before:absolute before:inset-0 before:-z-10 before:bg-accent-gradient before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-0.5 hover:border-transparent hover:before:opacity-100 hover:shadow-[0_10px_30px_rgba(124,58,237,.22)]`;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ className = "", variant = "primary", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={`${buttonVariants(variant)} ${className}`} {...props} />;
}
