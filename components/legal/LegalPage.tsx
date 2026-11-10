import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Prose } from "@/components/ui/Prose";
import { legalLinks } from "@/content/nav";
import { pageDate, type DatedPath } from "@/content/seo";

export type LegalSection = {
  /** Anchor id, used by the table of contents. Keep stable: Meta reviewers and customers may link to it. */
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  title: string;
  /** Short name for the breadcrumb trail. */
  crumb: string;
  /** Route path. Its "Last updated" date comes from PAGE_DATES in content/seo.ts. */
  path: DatedPath;
  intro: ReactNode;
  sections: LegalSection[];
};

const related = [
  { href: legalLinks.privacy, label: "Privacy policy" },
  { href: legalLinks.terms, label: "Terms of service" },
  { href: legalLinks.dataDeletion, label: "Data deletion" },
  { href: legalLinks.acceptableUse, label: "Acceptable use and messaging policy" },
];

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

/**
 * Shared shell for the legal pages: breadcrumbs, one H1, the last-updated
 * date, a table of contents of anchor links and the text in Prose style.
 * Everything is static HTML.
 */
export function LegalPage({ title, crumb, path, intro, sections }: LegalPageProps) {
  const updated = pageDate(path);
  const others = related.filter((r) => r.href !== path);
  return (
    <Container className="py-12 md:py-20">
      <Breadcrumbs items={[{ name: crumb, path }]} className="mb-8" />

      <header className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-h2">{title}</h1>
        <p className="mt-4 font-mono text-small text-muted">
          Last updated: <time dateTime={updated}>{formatDate(updated)}</time>
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
        <nav aria-labelledby="toc-heading" className="lg:sticky lg:top-24 lg:self-start">
          <h2 id="toc-heading" className="font-mono text-micro font-medium tracking-[0.08em] text-muted uppercase">
            On this page
          </h2>
          <ol className="mt-3 space-y-1 border-l border-line text-small">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="-ml-px block border-l border-transparent py-1 pl-4 text-muted transition-colors duration-200 hover:border-copper hover:text-ink"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0">
          <Prose as="article">
            {intro}
            {sections.map((s) => (
              // Fragments keep each h2 and its text as direct children of Prose, which spaces them.
              <Fragment key={s.id}>
                <h2 id={s.id} className="scroll-mt-24">
                  {s.title}
                </h2>
                {s.content}
              </Fragment>
            ))}
          </Prose>

          <aside aria-labelledby="related-heading" className="mt-16 max-w-reading border-t border-line pt-8">
            <h2 id="related-heading" className="text-h3">
              Related policies
            </h2>
            <ul className="mt-4 space-y-2">
              {others.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-copper underline underline-offset-4 hover:text-copper-hover">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </Container>
  );
}
