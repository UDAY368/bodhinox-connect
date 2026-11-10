import type { ElementType, ReactNode } from "react";
import { cx } from "./cx";

type ContainerProps = {
  children: ReactNode;
  /** "site" is 1200px, "prose" is the long-form reading width. */
  size?: "site" | "prose";
  as?: ElementType;
  className?: string;
};

/** Centred content column with 16px gutters on mobile, 24px on tablet, 32px on desktop. */
export function Container({ children, size = "site", as: Tag = "div", className }: ContainerProps) {
  return (
    <Tag className={cx("mx-auto w-full px-4 sm:px-6 lg:px-8", size === "site" ? "max-w-site" : "max-w-reading", className)}>
      {children}
    </Tag>
  );
}
