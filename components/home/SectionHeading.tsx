import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cx } from "@/components/ui/cx";

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
};

/** Left-aligned H2 block used by every home section. `id` goes on the H2 for aria-labelledby. */
export function SectionHeading({ id, eyebrow, title, intro, className }: SectionHeadingProps) {
  return (
    <div className={cx("max-w-2xl", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className={cx("text-h2", eyebrow && "mt-3")}>
        {title}
      </h2>
      {intro ? <p className="mt-4 text-lead text-muted">{intro}</p> : null}
    </div>
  );
}
