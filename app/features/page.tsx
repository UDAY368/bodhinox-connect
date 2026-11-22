import Link from "next/link";
import { ArrowRight, BadgeCheck, Code2, Plug, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { FeatureSubNav } from "@/components/features/FeatureSubNav";
import { CtaButtons, FeatureBullets, FeatureCta, VisualPanel } from "@/components/features/PillarPage";
import { MockStage } from "@/components/product/MockStage";
import { AdsScreen } from "@/components/product/screens/AdsScreen";
import { AiAgentsScreen } from "@/components/product/screens/AiScreen";
import { AppointmentsScreen } from "@/components/product/screens/AppointmentsScreen";
import { BroadcastReportScreen } from "@/components/product/screens/CampaignsScreen";
import { ContactsScreen } from "@/components/product/screens/ContactsScreen";
import { FlowBuilderScreen } from "@/components/product/screens/FlowBuilderScreen";
import { FormBuilderScreen } from "@/components/product/screens/FormsScreen";
import { InboxScreen } from "@/components/product/screens/InboxScreen";
import { InstagramScreen } from "@/components/product/screens/InstagramScreen";
import { StoreScreen } from "@/components/product/screens/StoreScreen";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { cx } from "@/components/ui/cx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { featureGroups, features, featuresIn, type FeatureSlug } from "@/content/features";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "WhatsApp and Instagram CRM features",
  description:
    "Every Bodhinox Connect feature: shared inbox, CRM, WhatsApp Forms, Instagram automation, chatbot flows, campaigns, Meta Ads, KHAGA AI, online store and bookings.",
  path: "/features",
});

const H = 720;

/** The product screen shown beside each feature, with what it shows. */
const screens: Record<FeatureSlug, { label: string; screen: ReactNode }> = {
  "team-inbox": {
    label: "The shared inbox with WhatsApp and Instagram chats, an open conversation and the contact panel.",
    screen: <InboxScreen height={H} />,
  },
  "crm-analytics": {
    label: "Contacts table with tags, owners, WhatsApp consent status and source.",
    screen: <ContactsScreen height={H} />,
  },
  "whatsapp-forms": {
    label: "The WhatsApp Forms builder with screens, field settings and a live phone preview.",
    screen: <FormBuilderScreen height={H} />,
  },
  instagram: {
    label: "Instagram tools with comment-to-DM, follower growth and story reply automations, and results for the last 7 days.",
    screen: <InstagramScreen height={H} />,
  },
  automation: {
    label: "The visual flow builder with a chatbot flow from trigger to payment link and handoff.",
    screen: <FlowBuilderScreen height={H} />,
  },
  campaigns: {
    label: "A campaign report with delivered, read, replied and clicked counts, orders and revenue.",
    screen: <BroadcastReportScreen height={H} />,
  },
  ads: {
    label: "Meta Ads overview with spend, conversations started, cost per conversation, leads and a funnel from ad click to order.",
    screen: <AdsScreen height={H} />,
  },
  "ai-agent": {
    label: "KHAGA AI agents with their channels, conversations handled and share solved without a person.",
    screen: <AiAgentsScreen height={H} />,
  },
  commerce: {
    label: "Online store settings with the shop link, QR code, theme template and a live preview.",
    screen: <StoreScreen height={H} />,
  },
  appointments: {
    label: "The appointments schedule for the week, with bookings, items that need attention and follow-up tasks.",
    screen: <AppointmentsScreen height={H} />,
  },
};

const platform = [
  {
    href: "/integrations",
    title: "Integrations",
    body: "Razorpay, Shiprocket, Shopify, WooCommerce, Google Sheets and webhooks, with a health check on every connection.",
    icon: Plug,
  },
  {
    href: "/developers",
    title: "Developers",
    body: "A public API with scoped keys and signed webhooks, so your own systems stay in step with your workspace.",
    icon: Code2,
  },
  {
    href: "/security",
    title: "Security",
    body: "Workspace isolation, roles, two-factor sign-in, an audit log, consent records and data export.",
    icon: ShieldCheck,
  },
  {
    href: "/whatsapp-business-platform",
    title: "Official WhatsApp Business Platform",
    body: "Your own numbers on Meta's Cloud API, connected with Embedded Signup, with approved templates and the 24-hour window.",
    icon: BadgeCheck,
  },
];

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden />
        <Container className="relative pt-8 pb-16 md:pt-10 md:pb-20">
          <Breadcrumbs items={[{ name: "Features", path: "/features" }]} />
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <Eyebrow>Features</Eyebrow>
            <h1 className="mt-4 text-hero">One workspace for WhatsApp, Instagram and selling in chat</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lead text-muted-foreground">
              Bodhinox Connect runs on the official WhatsApp Business Platform. Your team inbox, CRM, forms, Instagram
              automation, chatbot flows, campaigns, ads reporting, KHAGA AI agents, online store and bookings live in one
              place, so you answer faster, sell more in chat and spend less time on repeat work.
            </p>
            <CtaButtons className="mt-8 justify-center" />
          </div>
        </Container>
      </section>

      <FeatureSubNav mode="anchors" />

      {featureGroups.map((group) => (
        <div key={group.id}>
          <Section labelledBy={`group-${group.id}`} tone="sunken" spacing="tight" divider>
            <p className="text-small font-semibold text-primary">{group.label}</p>
            <h2 id={`group-${group.id}`} className="mt-2 text-h2">
              {group.blurb}
            </h2>
          </Section>

          {featuresIn(group.id).map((f) => {
            const flip = features.indexOf(f) % 2 === 1;
            const Icon = f.icon;
            const headingId = `${f.anchor}-heading`;
            const visual = screens[f.slug];
            return (
              <Section
                key={f.slug}
                id={f.anchor}
                labelledBy={headingId}
                tone={flip ? "surface" : "default"}
                className="scroll-mt-32"
              >
                <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                  <div className={cx("lg:col-span-5", flip && "lg:order-2 lg:col-start-8")}>
                    <p className="inline-flex items-center gap-2 text-small font-semibold text-primary">
                      <Icon className="size-4" aria-hidden />
                      {group.label}
                    </p>
                    <h3 id={headingId} className="mt-3 text-h2">
                      {f.title}
                    </h3>
                    <p className="mt-4 text-lead text-muted-foreground">{f.summary}</p>
                    <FeatureBullets bullets={f.bullets} columns={1} className="mt-8" />
                    <Link
                      href={f.href}
                      className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline-offset-4 hover:text-primary-hover hover:underline"
                    >
                      Explore {f.shortTitle}
                      <ArrowRight size={18} aria-hidden />
                    </Link>
                  </div>
                  <div className={cx("min-w-0 lg:col-span-7", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-6")}>
                    <VisualPanel>
                      <MockStage designWidth={1280} label={visual.label}>
                        {visual.screen}
                      </MockStage>
                    </VisualPanel>
                  </div>
                </div>
              </Section>
            );
          })}
        </div>
      ))}

      <Section labelledBy="platform-heading" divider>
        <div className="max-w-reading">
          <Eyebrow className="mb-3">Platform</Eyebrow>
          <h2 id="platform-heading" className="text-h2">
            Built to connect, and built to be trusted
          </h2>
          <p className="mt-4 text-lead text-muted-foreground">
            Under every feature sits the same platform: official Meta APIs, the tools you already use, and controls over
            who can see what.
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platform.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-colors duration-200 hover:border-primary"
              >
                <p.icon className="size-6 text-primary" aria-hidden />
                <span className="mt-4 text-h3 text-foreground group-hover:text-primary">{p.title}</span>
                <span className="mt-2 flex-1 text-muted-foreground">{p.body}</span>
                <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-primary">
                  Learn more <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <FeatureCta />
    </>
  );
}
