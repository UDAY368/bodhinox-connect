import type { ReactNode } from "react";
import { cx } from "./cx";

type ProseProps = { children: ReactNode; className?: string; as?: "div" | "article" };

/**
 * Styles long-form text (legal pages, guides): h2, h3, p, lists, links,
 * tables, code, blockquote, hr. Keeps a comfortable reading width.
 * The page H1 goes outside Prose.
 */
export function Prose({ children, className, as: Tag = "div" }: ProseProps) {
  return <Tag className={cx("prose-bx", className)}>{children}</Tag>;
}
