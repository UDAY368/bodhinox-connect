import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatGuideDate } from "@/components/guides/GuideLayout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { features } from "@/content/features";
import { guides } from "@/content/guides";
import { absoluteUrl, site } from "@/content/site";
import { JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "WhatsApp Business guides",
  description:
    "Practical guides for Indian businesses on the WhatsApp Business API, marketing campaigns customers welcome, and chatbots and AI agents that help.",
  path: "/guides",
});

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${site.name} guides`,
  itemListElement: guides.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: absoluteUrl(g.href),
    name: g.title,
  })),
};

export default function Page() {
  return (
    <Container className="pt-10 pb-16 md:pt-14 md:pb-24">
      <Breadcrumbs items={[{ name: "Guides", path: "/guides" }]} />

      <header className="mt-10 max-w-3xl">
        <Eyebrow>Guides</Eyebrow>
        <h1 className="mt-3 text-hero">WhatsApp for business, explained plainly</h1>
        <p className="mt-5 text-lead text-muted">
          Practical guides for Indian business owners. How the WhatsApp Business API works and what it costs, how to run
          campaigns people welcome, and how to use chatbots and AI agents without losing the personal touch.
        </p>
      </header>

      <section aria-labelledby="all-guides" className="mt-14 md:mt-20">
        <h2 id="all-guides" className="sr-only">
          All guides
        </h2>
        <ol className="divide-y divide-line border-y border-line">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <article className="grid gap-4 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8 md:py-10">
                <div className="max-w-2xl">
                  <h3 className="text-h3">
                    <Link href={guide.href} className="underline-offset-4 hover:text-copper hover:underline">
                      {guide.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-body text-muted">{guide.description}</p>
                  <p className="mt-4 font-mono text-micro text-muted">
                    <time dateTime={guide.dateModified}>{formatGuideDate(guide.dateModified)}</time> ·{" "}
                    {guide.readingMinutes} min read
                  </p>
                </div>
                <Link
                  href={guide.href}
                  className="inline-flex items-center gap-2 self-start text-small font-semibold text-copper underline-offset-4 hover:text-copper-hover hover:underline"
                >
                  Read the guide
                  <span className="sr-only">: {guide.title}</span>
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="by-feature" className="mt-16 md:mt-24">
        <h2 id="by-feature" className="text-h2 max-w-2xl">
          See how it works in the product
        </h2>
        <p className="mt-4 max-w-2xl text-body text-muted">
          Each guide links to the part of {site.name} that does the work. You can also go straight to a feature.
        </p>
        <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li key={f.slug}>
              <Link href={f.href} className="text-body text-ink underline underline-offset-4 hover:text-copper">
                {f.seoTitle}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <JsonLd data={itemListJsonLd} />
    </Container>
  );
}
