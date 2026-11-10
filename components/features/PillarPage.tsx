import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cx } from "@/components/ui/cx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { getFeature, type Feature, type FeatureSlug } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { guides } from "@/content/guides";
import { site } from "@/content/site";
import { faqPageJsonLd, JsonLd } from "@/lib/seo";
import { FeatureSubNav } from "./FeatureSubNav";

/* --------------------------------------------------------------------------
   Small building blocks, shared by /features and the six pillar pages
   -------------------------------------------------------------------------- */

/** The full capability list for a pillar, straight from content/features.ts. */
export function FeatureBullets({
  bullets,
  columns = 2,
  className,
}: {
  bullets: string[];
  /** Two columns from the md breakpoint, or always one. */
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul className={cx("grid gap-x-10 gap-y-3", columns === 2 && "md:grid-cols-2", className)}>
      {bullets.map((b) => (
        <li key={b} className="flex gap-3 text-body text-ink">
          <Check size={18} strokeWidth={2.25} className="mt-1 shrink-0 text-copper" aria-hidden />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

/** Start free plus Book a demo. */
export function CtaButtons({ className }: { className?: string }) {
  return (
    <div className={cx("flex flex-wrap gap-3", className)}>
      <Button href={site.signupUrl} size="lg" iconRight={<ArrowRight size={18} aria-hidden />}>
        Start free
      </Button>
      <Button href="/contact" variant="secondary" size="lg">
        Book a demo
      </Button>
    </div>
  );
}

/** Closing call to action band. */
export function FeatureCta({ id = "feature-cta" }: { id?: string }) {
  return (
    <Section tone="surface" divider labelledBy={id}>
      <div className="max-w-2xl">
        <h2 id={id} className="text-h2">
          Start free today. No card needed.
        </h2>
        <p className="mt-4 text-lead text-muted">
          Connect your WhatsApp number, bring in your contacts and try it with your own customers. If you want a
          walk-through first, book a demo and we will set it up with you.
        </p>
        <CtaButtons className="mt-8" />
      </div>
    </Section>
  );
}

/**
 * FAQs as native <details>, plus FAQPage JSON-LD built from the same array so
 * the visible text and the structured data always match.
 */
export function FeatureFaqs({ faqs, id = "faq" }: { faqs: Faq[]; id?: string }) {
  return (
    <Section labelledBy={id} divider>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id={id} className="text-h2">
            Questions
          </h2>
          <p className="mt-4 text-muted">
            Something else on your mind? Write to{" "}
            <a href={site.mailto} className="text-copper underline underline-offset-4 hover:text-copper-hover">
              {site.email}
            </a>
            .
          </p>
        </div>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.question} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-h3 text-ink [&::-webkit-details-marker]:hidden">
                {f.question}
                <ChevronDown
                  size={20}
                  className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="max-w-reading pb-6 text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqPageJsonLd(faqs)} />
    </Section>
  );
}

/** Links to related pillar pages, as a plain divided list. */
export function RelatedPillars({ slugs, id = "related" }: { slugs: FeatureSlug[]; id?: string }) {
  const items = slugs.map(getFeature);
  return (
    <Section labelledBy={id} tone="sunken" spacing="tight">
      <h2 id={id} className="text-h3">
        Works well with
      </h2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {items.map((f) => (
          <li key={f.slug}>
            <Link
              href={f.href}
              className="group grid gap-1 py-5 transition-colors duration-200 md:grid-cols-12 md:items-baseline md:gap-6"
            >
              <span className="flex items-center gap-2 font-display text-h3 text-ink group-hover:text-copper md:col-span-4">
                {f.title}
                <ArrowRight size={18} className="shrink-0" aria-hidden />
              </span>
              <span className="text-muted md:col-span-8">{f.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/**
 * One block of long-form copy: an H2, its paragraphs, and an optional aside
 * (usually a mock-up) beside it on wide screens.
 */
export function CopySection({
  id,
  eyebrow,
  heading,
  children,
  aside,
  tone = "default",
}: {
  id: string;
  eyebrow?: string;
  heading: string;
  children: ReactNode;
  aside?: ReactNode;
  tone?: "default" | "surface" | "sunken";
}) {
  const headingId = `${id}-heading`;
  return (
    <Section id={id} labelledBy={headingId} tone={tone} divider={tone === "default"}>
      <div className={cx("grid gap-12", aside ? "lg:grid-cols-12 lg:items-start" : undefined)}>
        <div className={cx("max-w-reading", aside ? "lg:col-span-6" : undefined)}>
          {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
          <h2 id={headingId} className="text-h2">
            {heading}
          </h2>
          <div className="mt-6 space-y-5 text-body text-ink [&_h3]:mt-10 [&_h3]:text-h3 [&_p]:text-pretty">
            {children}
          </div>
        </div>
        {aside ? <div className="min-w-0 lg:col-span-6 lg:col-start-7 lg:sticky lg:top-36">{aside}</div> : null}
      </div>
    </Section>
  );
}

/** The guide that goes deeper on each pillar's topic. */
const relatedGuide: Record<FeatureSlug, string> = {
  "team-inbox": "whatsapp-business-api-india",
  campaigns: "whatsapp-marketing-campaigns",
  automation: "whatsapp-chatbots-ai-agents",
  "ai-agent": "whatsapp-chatbots-ai-agents",
  commerce: "whatsapp-business-api-india",
  "crm-analytics": "whatsapp-marketing-campaigns",
};

function ReadNext({ slug }: { slug: FeatureSlug }) {
  const guide = guides.find((g) => g.slug === relatedGuide[slug]);
  const linkClass = "text-copper underline underline-offset-4 hover:text-copper-hover";
  return (
    <p className="mt-10 max-w-reading text-body text-muted">
      {guide ? (
        <>
          Read next: <Link href={guide.href} className={linkClass}>{guide.title}</Link>.{" "}
        </>
      ) : null}
      <Link href="/pricing" className={linkClass}>
        See which plans include each feature
      </Link>
      .
    </p>
  );
}

/* --------------------------------------------------------------------------
   Pillar page shell
   -------------------------------------------------------------------------- */

type PillarPageProps = {
  feature: Feature;
  /** The page's single H1, carrying the target keyword. */
  h1: string;
  /** One or two sentences under the H1. */
  lead: string;
  /** Mock-up beside the hero copy. */
  heroVisual: ReactNode;
  /** Long-form sections (CopySection) between the hero and the capability list. */
  children: ReactNode;
  /** H2 over the capability list, e.g. "Everything in the team inbox". */
  bulletsHeading: string;
  /** Optional copy under the capability list heading. */
  bulletsIntro?: string;
  faqs: Faq[];
  related: FeatureSlug[];
  /** Extra block after the capability list, e.g. the Instagram coming-soon note. */
  afterBullets?: ReactNode;
};

export function PillarPage({
  feature,
  h1,
  lead,
  heroVisual,
  children,
  bulletsHeading,
  bulletsIntro,
  faqs,
  related,
  afterBullets,
}: PillarPageProps) {
  return (
    <>
      <FeatureSubNav mode="pages" current={feature.slug} />

      <Container className="pt-8 pb-16 md:pt-10 md:pb-24">
        <Breadcrumbs
          items={[
            { name: "Features", path: "/features" },
            { name: feature.shortTitle, path: feature.href },
          ]}
        />
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Eyebrow>{feature.title}</Eyebrow>
            <h1 className="mt-4 text-hero">{h1}</h1>
            <p className="mt-6 max-w-xl text-lead text-muted">{lead}</p>
            <CtaButtons className="mt-8" />
          </div>
          <div className="min-w-0 lg:col-span-6 lg:col-start-7">{heroVisual}</div>
        </div>
      </Container>

      {children}

      <Section id="included" labelledBy="included-heading" tone="surface">
        <div className="max-w-reading">
          <Eyebrow className="mb-3">What you get</Eyebrow>
          <h2 id="included-heading" className="text-h2">
            {bulletsHeading}
          </h2>
          {bulletsIntro ? <p className="mt-4 text-lead text-muted">{bulletsIntro}</p> : null}
        </div>
        <FeatureBullets bullets={feature.bullets} className="mt-10" />
        {afterBullets}
        <ReadNext slug={feature.slug} />
      </Section>

      <FeatureFaqs faqs={faqs} />
      <RelatedPillars slugs={related} />
      <FeatureCta />
    </>
  );
}
