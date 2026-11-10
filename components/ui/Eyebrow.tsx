import type { ReactNode } from "react";
import { cx } from "./cx";

type EyebrowProps = { children: ReactNode; className?: string; as?: "p" | "span" };

/** Small mono label above a heading. Not a heading itself. */
export function Eyebrow({ children, className, as: Tag = "p" }: EyebrowProps) {
  return (
    <Tag className={cx("font-mono text-micro font-medium tracking-[0.08em] text-muted uppercase", className)}>
      {children}
    </Tag>
  );
}
