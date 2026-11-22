import type { ReactNode } from "react";
import { cx } from "./cx";

type BadgeProps = {
  children: ReactNode;
  /**
   * neutral for labels, primary for "Most popular", success for "Live" or
   * "Approved", warning for "Coming soon" style notes, outline for quiet tags.
   */
  tone?: "neutral" | "primary" | "success" | "warning" | "outline";
  className?: string;
};

const tones = {
  neutral: "bg-muted text-foreground",
  primary: "bg-primary-soft text-primary-strong",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  outline: "border border-border text-muted-foreground",
} as const;

/** The CRM's 20px pill badge. */
export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex h-6 items-center gap-1 rounded-full px-2.5 text-[0.75rem] font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
