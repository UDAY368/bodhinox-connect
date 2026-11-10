import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeatureSubNav } from "@/components/features/FeatureSubNav";
import { CtaButtons, FeatureBullets, FeatureCta } from "@/components/features/PillarPage";
import { pillarMockups } from "@/components/features/PillarMockups";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { cx } from "@/components/ui/cx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { comingSoon, features, type FeatureSlug } from "@/content/features";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "WhatsApp inbox, campaigns and AI features",
  description:
    "Every Bodhinox Connect feature: shared team inbox, WhatsApp broadcasts, chatbot flows, AI agent, store with Razorpay payments, and a CRM with analytics.",
  path: "/features",
});

/** Descriptive link text to each pillar page. */
const moreLinks: Record<FeatureSlug, string> = {
  "team-inbox": "See the shared team inbox",
  campaigns: "See WhatsApp broadcasts and campaigns",
  automation: "See chatbot flows and automation",
  "ai-agent": "See the WhatsApp AI agent",
  commerce: "See the WhatsApp store and payments",
  "crm-analytics": "See the WhatsApp CRM and analytics",
};

export default function Page() {
  return (
    <>
      <FeatureSubNav mode="anchors" />

      <Container className="pt-8 pb-16 md:pt-10 md:pb-20">
        <Breadcrumbs items={[{ name: "Features", path: "/features" }]} />
        <div className="mt-10 max-w-3xl">
          <Eyebrow>Features</Eyebrow>
          <h1 className="mt-4 text-hero">Everything you need to run customer conversations on WhatsApp</h1>
          <p className="mt-6 max-w-2xl text-lead text-muted">
            Bodhinox Connect is built on the official WhatsApp Business Platform. It brings your team inbox, campaigns,
            chatbot flows, AI agent, store and customer CRM into one place, so you answer faster, sell more in chat and
            spend less time on repeat work.
          </p>
          <CtaButtons className="mt-8" />
        </div>
      </Container>

      {features.map((f, i) => {
        const Mockup = pillarMockups[f.slug];
        const Icon = f.icon;
        const headingId = `${f.anchor}-heading`;
        const flip = i % 2 === 1;
        return (
          <Section
            key={f.slug}
            id={f.anchor}
            labelledBy={headingId}
            tone={flip ? "surface" : "default"}
            divider={!flip}
            className="scroll-mt-10"
          >
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className={cx("lg:col-span-6", flip && "lg:order-2 lg:col-start-7")}>
                <Icon size={28} strokeWidth={1.75} className="text-copper" aria-hidden />
                <h2 id={headingId} className="mt-4 text-h2">
                  {f.title}
                </h2>
                <p className="mt-4 text-lead text-muted">{f.summary}</p>
                <FeatureBullets bullets={f.bullets} columns={1} className="mt-8" />
                <Link
                  href={f.href}
                  className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-copper underline-offset-4 hover:text-copper-hover hover:underline"
                >
                  {moreLinks[f.slug]}
                  <ArrowRight size={18} aria-hidden />
                </Link>
              </div>
              <div className={cx("min-w-0 lg:col-span-6", flip ? "lg:order-1" : "lg:col-start-7")}>
                <Mockup />
              </div>
            </div>
          </Section>
        );
      })}

      <Section labelledBy="coming-soon-heading" divider spacing="tight">
        <div className="flex max-w-reading flex-col gap-3">
          <Badge tone="outline" className="self-start">
            Coming soon
          </Badge>
          <h2 id="coming-soon-heading" className="text-h3">
            {comingSoon[0].title}
          </h2>
          <p className="text-muted">{comingSoon[0].summary} It is not live yet. Today the inbox handles WhatsApp.</p>
        </div>
      </Section>

      <FeatureCta />
    </>
  );
}
