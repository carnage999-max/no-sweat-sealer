export type ButtonVariant = "primary" | "ghost" | "paper" | "paper-ghost";
export type ButtonSize = "md" | "sm" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold leading-none whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-cyan text-void hover:bg-[#62dcf7]",
  ghost: "border border-line-strong text-ice hover:border-cyan hover:text-cyan",
  paper: "bg-ink text-ice hover:bg-[#15303f]",
  "paper-ghost": "border border-ink/30 text-ink hover:border-ink hover:bg-ink/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2.5 text-[0.875rem]",
  md: "px-6 py-3.5 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

/** Class string for anything that should look like a button (links included). */
export function btn(variant: ButtonVariant = "primary", size: ButtonSize = "md"): string {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}
