import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cx } from "@/components/ui/cx";
import { features, type FeatureSlug } from "@/content/features";

type FeatureSubNavProps =
  /** On /features: in-page links to each pillar section. */
  | { mode: "anchors" }
  /** On a pillar page: links to every pillar page, the current one marked. */
  | { mode: "pages"; current: FeatureSlug };

const linkClass =
  "inline-flex h-11 items-center rounded-full px-3 text-small whitespace-nowrap transition-colors duration-200";

/**
 * Sticky second-level navigation for the features section. It sits under the
 * 64px site header. Scrolls sideways inside itself on narrow screens, so the
 * page never does.
 */
export function FeatureSubNav(props: FeatureSubNavProps) {
  const current = props.mode === "pages" ? props.current : undefined;
  return (
    <nav aria-label="Features" className="sticky top-16 z-30 border-b border-border bg-glass backdrop-blur-xl">
      <Container>
        <ul className="flex gap-1 overflow-x-auto py-1 [scrollbar-width:thin]">
          {props.mode === "pages" ? (
            <li className="shrink-0">
              <Link href="/features" className={cx(linkClass, "text-muted-foreground hover:bg-accent hover:text-foreground")}>
                All features
              </Link>
            </li>
          ) : null}
          {features.map((f) => {
            const active = f.slug === current;
            return (
              <li key={f.slug} className="shrink-0">
                <Link
                  href={props.mode === "anchors" ? `#${f.anchor}` : f.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    linkClass,
                    active ? "bg-primary-soft font-semibold text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {f.shortTitle}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
