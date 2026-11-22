import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { MockStage } from "@/components/product/MockStage";
import { PhoneStage } from "@/components/product/Phone";
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
        <li key={b} className="flex gap-3 text-body text-foreground">
          <Check size={18} strokeWidth={2.25} className="mt-1 shrink-0 text-primary" aria-hidden />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

/** Start free trial plus Book a demo. */
export function CtaButtons({ className }: { className?: string }) {
  return (
    <div className={cx("flex flex-wrap gap-3", className)}>
      <Button href={site.signupUrl} size="lg" iconRight={<ArrowRight size={18} aria-hidden />}>
        Start free trial
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
          Try it free for 14 days. No card needed.
        </h2>
        <p className="mt-4 text-lead text-muted-foreground">
          Connect your WhatsApp number and Instagram account, bring in your contacts and try it with your own
          customers. If you want a walk-through first, book a demo and we will set it up with you.
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
          <p className="mt-4 text-muted-foreground">
            Something else on your mind? Write to{" "}
            <a href={site.mailto} className="text-primary underline underline-offset-4 hover:text-primary-hover">
              {site.email}
            </a>
            .
          </p>
        </div>
        <div className="divide-y divide-border border-y border-border lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.question} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-h3 text-foreground [&::-webkit-details-marker]:hidden">
                {f.question}
                <ChevronDown
                  size={20}
                  className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="max-w-reading pb-6 text-muted-foreground">{f.answer}</p>
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
      <ul className="mt-6 divide-y divide-border border-y border-border">
        {items.map((f) => (
          <li key={f.slug}>
            <Link
              href={f.href}
              className="group grid gap-1 py-5 transition-colors duration-200 md:grid-cols-12 md:items-baseline md:gap-6"
            >
              <span className="flex items-center gap-2 font-display text-h3 text-foreground group-hover:text-primary md:col-span-4">
                {f.title}
                <ArrowRight size={18} className="shrink-0" aria-hidden />
              </span>
              <span className="text-muted-foreground md:col-span-8">{f.summary}</span>
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
          <div className="mt-6 space-y-5 text-body text-foreground [&_h3]:mt-10 [&_h3]:text-h3 [&_p]:text-pretty">
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
  "whatsapp-forms": "whatsapp-chatbots-ai-agents",
  instagram: "whatsapp-chatbots-ai-agents",
  ads: "whatsapp-marketing-campaigns",
  appointments: "whatsapp-business-api-india",
};

/**
 * A highlight row: heading, short copy and a focused product visual, alternating
 * sides. Use 2-4 of these between the hero and the long-form copy.
 */
export function HighlightRow({
  id,
  eyebrow,
  heading,
  children,
  visual,
  flip = false,
}: {
  id: string;
  eyebrow?: string;
  heading: string;
  children: ReactNode;
  visual: ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={cx(flip && "lg:order-2")}>
        {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
        <h2 id={id} className="text-[clamp(1.75rem,1.4rem+1.2vw,2.375rem)] leading-[1.12] tracking-[-0.03em]">
          {heading}
        </h2>
        <div className="mt-4 space-y-4 text-lead text-muted-foreground">{children}</div>
      </div>
      <div className={cx("min-w-0", flip && "lg:order-1")}>{visual}</div>
    </div>
  );
}

/** Wraps HighlightRows in a section with generous spacing. */
export function Highlights({ children, label = "Highlights" }: { children: ReactNode; label?: string }) {
  return (
    <section aria-label={label} className="py-16 md:py-24">
      <Container className="flex flex-col gap-20 md:gap-28">{children}</Container>
    </section>
  );
}

/** Soft panel behind a product visual. */
export function VisualPanel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("rounded-3xl border border-border bg-card-2 p-4 sm:p-6", className)}>{children}</div>;
}

/** A full product screen (1280 wide) for a pillar hero. */
export function HeroScreen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <MockStage designWidth={1280} label={label} className="mx-auto max-w-[1200px]">
      {children}
    </MockStage>
  );
}

/** A product visual on a soft panel, scaled from its design width. */
export function ScreenVisual({
  label,
  designWidth,
  children,
  className,
}: {
  label: string;
  designWidth: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <VisualPanel className={className}>
      <MockStage designWidth={designWidth} label={label}>
        {children}
      </MockStage>
    </VisualPanel>
  );
}

/** A customer-side phone preview on the drawing-board stage. */
export function PhoneVisual({ label, children }: { label: string; children: ReactNode }) {
  return (
    <PhoneStage className="py-10">
      <MockStage designWidth={320} label={label} className="max-w-[300px]">
        {children}
      </MockStage>
    </PhoneStage>
  );
}

function ReadNext({ slug }: { slug: FeatureSlug }) {
  const guide = guides.find((g) => g.slug === relatedGuide[slug]);
  const linkClass = "text-primary underline underline-offset-4 hover:text-primary-hover";
  return (
    <p className="mt-10 max-w-reading text-body text-muted-foreground">
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
  /** Extra block after the capability list. */
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

      <section className="relative overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[640px]" aria-hidden />
        <Container className="relative pt-8 pb-6 md:pt-10">
          <Breadcrumbs
            items={[
              { name: "Features", path: "/features" },
              { name: feature.shortTitle, path: feature.href },
            ]}
          />
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-small font-medium text-foreground">
              <feature.icon className="size-4 text-primary" aria-hidden />
              {feature.title}
            </p>
            <h1 className="mt-5 text-hero">{h1}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lead text-muted-foreground">{lead}</p>
            <CtaButtons className="mt-8 justify-center" />
          </div>
          <div className="relative mx-auto mt-14 max-w-[1200px] animate-rise">{heroVisual}</div>
        </Container>
      </section>

      {children}

      <Section id="included" labelledBy="included-heading" tone="surface">
        <div className="max-w-reading">
          <Eyebrow className="mb-3">What you get</Eyebrow>
          <h2 id="included-heading" className="text-h2">
            {bulletsHeading}
          </h2>
          {bulletsIntro ? <p className="mt-4 text-lead text-muted-foreground">{bulletsIntro}</p> : null}
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
