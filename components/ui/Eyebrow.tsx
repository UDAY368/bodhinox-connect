import type { ReactNode } from "react";
import { cx } from "./cx";

type EyebrowProps = { children: ReactNode; className?: string; as?: "p" | "span" };

/** Small label above a heading, in the primary colour. Not a heading itself. */
export function Eyebrow({ children, className, as: Tag = "p" }: EyebrowProps) {
  return <Tag className={cx("text-small font-semibold text-primary", className)}>{children}</Tag>;
}
