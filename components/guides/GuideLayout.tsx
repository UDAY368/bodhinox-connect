import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Prose } from "@/components/ui/Prose";
import type { Guide } from "@/content/guides";
import { site } from "@/content/site";
import { articleJsonLd, JsonLd } from "@/lib/seo";

export type TocItem = { id: string; title: string };
export type RelatedLink = { label: string; href: string; note: string };

export function formatGuideDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

type GuideLayoutProps = {
  guide: Guide;
  toc: TocItem[];
  related: RelatedLink[];
  children: ReactNode;
};

/**
 * Shell for one long-form guide: breadcrumbs, a single H1, a table of
 * contents, the article body in Prose, related product pages and the
 * Article JSON-LD. Section H2s in the body must use the ids in `toc`.
 */
export function GuideLayout({ guide, toc, related, children }: GuideLayoutProps) {
  const tocId = `toc-${guide.slug}`;
  const modified = guide.dateModified !== guide.datePublished;
  return (
    <>
      <Container className="pt-10 pb-16 md:pt-14 md:pb-24">
        <Breadcrumbs
          items={[
            { name: "Guides", path: "/guides" },
            { name: guide.seoTitle, path: guide.href },
          ]}
        />

        <header className="mt-10 max-w-3xl">
          <Eyebrow>Guide</Eyebrow>
          <h1 className="mt-3 text-hero">{guide.title}</h1>
          <p className="mt-5 text-lead text-muted-foreground">{guide.description}</p>
          <p className="mt-6 text-micro text-muted-foreground">
            By the {site.name} team · Published <time dateTime={guide.datePublished}>{formatGuideDate(guide.datePublished)}</time>
            {modified ? (
              <>
                {" "}
                · Updated <time dateTime={guide.dateModified}>{formatGuideDate(guide.dateModified)}</time>
              </>
            ) : null}{" "}
            · {guide.readingMinutes} min read
          </p>
        </header>

        <div className="mt-12 grid gap-10 border-t border-border pt-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-labelledby={tocId} className="lg:sticky lg:top-24 lg:self-start">
            <h2 id={tocId} className="text-micro font-semibold tracking-[0.04em] text-muted-foreground uppercase">
              On this page
            </h2>
            <ol className="mt-4 space-y-2.5 border-l border-border pl-4 text-small">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-foreground underline-offset-4 hover:text-primary hover:underline">
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0">
            <Prose as="article">{children}</Prose>

            <aside aria-labelledby={`related-${guide.slug}`} className="mt-16 max-w-reading border-t border-border pt-10">
              <h2 id={`related-${guide.slug}`} className="text-h3">
                Where this happens in {site.name}
              </h2>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-start justify-between gap-4 py-4 underline-offset-4"
                    >
                      <span>
                        <span className="block font-semibold text-foreground group-hover:underline">{link.label}</span>
                        <span className="mt-0.5 block text-small text-muted-foreground">{link.note}</span>
                      </span>
                      <ArrowRight size={18} aria-hidden className="mt-1 shrink-0 text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={site.signupUrl}>Start free</Button>
                <Button href="/contact" variant="secondary">
                  Book a demo
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </Container>
      <JsonLd
        data={articleJsonLd({
          title: guide.title,
          description: guide.description,
          path: guide.href,
          datePublished: guide.datePublished,
          dateModified: guide.dateModified,
        })}
      />
    </>
  );
}
