import type { ReactNode } from "react";
import { Container } from "./Container";
import { cx } from "./cx";

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** id of the heading that names this section, for aria-labelledby. */
  labelledBy?: string;
  /** "default" sits on the page background, "surface" on white, "sunken" on a quiet band. */
  tone?: "default" | "surface" | "sunken";
  /** Vertical rhythm: "default" 64/96px, "tight" 40/64px, "none" for custom spacing. */
  spacing?: "default" | "tight" | "none";
  /** Wrap children in a site-width Container (default true). */
  contained?: boolean;
  /** Draw a hairline above the section. */
  divider?: boolean;
  className?: string;
};

const toneClass = { default: "", surface: "bg-card", sunken: "bg-muted" } as const;
const spacingClass = { default: "py-16 md:py-24", tight: "py-10 md:py-16", none: "" } as const;

export function Section({
  children,
  id,
  labelledBy,
  tone = "default",
  spacing = "default",
  contained = true,
  divider = false,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(toneClass[tone], spacingClass[spacing], divider && "border-t border-border", className)}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
