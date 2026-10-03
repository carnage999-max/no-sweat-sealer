export type ButtonVariant = "primary" | "ghost" | "paper" | "paper-ghost";
export type ButtonSize = "md" | "sm" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold leading-none whitespace-nowrap transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#1ac8f4,#5aa9ff)] text-void shadow-[0_8px_28px_-8px_rgb(26_200_244_/_0.7)] hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_rgb(26_200_244_/_0.9)]",
  ghost: "border border-white/20 bg-white/[0.03] text-ice backdrop-blur hover:-translate-y-0.5 hover:border-cyan hover:text-cyan",
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
