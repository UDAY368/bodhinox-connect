import Link from "next/link";
import { breadcrumbJsonLd, JsonLd, type Crumb } from "@/lib/seo";
import { cx } from "./cx";

type BreadcrumbsProps = {
  /** Trail after Home. The last item is the current page. */
  items: Crumb[];
  className?: string;
};

/**
 * Visible breadcrumb trail plus its BreadcrumbList JSON-LD, so the two never
 * disagree. Use once at the top of every inner page.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={cx("font-mono text-micro text-muted", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="underline-offset-4 hover:text-ink hover:underline">
                      {c.name}
                    </Link>
                    <span aria-hidden>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
