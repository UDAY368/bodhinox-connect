import type { ReactNode } from "react";
import { cx } from "./cx";

type BadgeProps = {
  children: ReactNode;
  /** neutral for labels, copper for "Most popular", success for "Approved", outline for "Coming soon". */
  tone?: "neutral" | "copper" | "success" | "outline";
  className?: string;
};

const tones = {
  neutral: "bg-sunken text-ink",
  copper: "bg-copper-soft text-copper-ink",
  success: "bg-sunken text-success",
  outline: "border border-line-strong text-muted",
} as const;

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-micro font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
