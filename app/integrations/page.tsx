import { ArrowRight, HeartPulse, KeyRound, RefreshCw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/home/SectionHeading";
import { MockStage } from "@/components/product/MockStage";
import { IntegrationsScreen } from "@/components/product/screens/SettingsScreen";
import { Badge, Breadcrumbs, Button, Container, Section } from "@/components/ui";
import { integrationGroups, statusLabel } from "@/content/integrations";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Integrations: Shopify, Razorpay and more",
  description:
    "Connect Bodhinox Connect to Shopify, WooCommerce, Razorpay, Shiprocket, Meta catalogue and ads, Google Sheets and webhooks, with health checks on each.",
  path: "/integrations",
});

const healthPoints = [
  {
    icon: HeartPulse,
    title: "One health panel",
    body: "Settings shows the last success or the last error for WhatsApp, Instagram, Meta Ads, your store, payments and courier, so a broken connection is visible before a customer notices.",
  },
  {
    icon: KeyRound,
    title: "Keys stored encrypted",
    body: "API keys and secrets for Razorpay, Shiprocket and your store are checked with the provider before they are saved, then stored encrypted. They are never shown in full again.",
  },
  {
    icon: ShieldCheck,
    title: "Signed webhooks, both ways",
    body: "Incoming events from Razorpay, Shopify and WooCommerce are accepted only with a valid signature. Events we send to you carry an HMAC signature you can verify.",
  },
  {
    icon: RefreshCw,
    title: "Retries, not silent failures",
    body: "Failed webhook deliveries are retried with backoff. An endpoint that keeps failing is paused, and owners and admins are told, with a delivery log to check.",
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden />
        <Container className="relative pt-10 pb-12 text-center md:pt-14 md:pb-16">
          <Breadcrumbs items={[{ name: "Integrations", path: "/integrations" }]} className="mb-8 flex justify-center" />
          <h1 className="mx-auto max-w-3xl text-hero">Connect the tools you already use</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-muted-foreground">
            Bring in orders from Shopify and WooCommerce, take payments with Razorpay, ship with Shiprocket, and send
            every event to your own systems. Each connection is set up from Settings, without code.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={site.signupUrl} size="lg">
              Start free
            </Button>
            <Button href="/developers" variant="secondary" size="lg" iconRight={<ArrowRight size={18} aria-hidden />}>
              API and webhooks
            </Button>
          </div>
          <div className="mx-auto mt-14 max-w-[1200px]">
            <MockStage
              designWidth={1280}
              label="Settings, Integrations: Shopify, WooCommerce, Razorpay, Zoom, Shiprocket, Google Sheets and Webhooks cards with connection status, and an integration health panel."
            >
              <IntegrationsScreen height={720} />
            </MockStage>
          </div>
        </Container>
      </section>

      <Section labelledBy="catalogue-heading" tone="surface">
        <SectionHeading
          id="catalogue-heading"
          eyebrow="Every integration"
          title="Stores, payments, shipping, Meta and your own code"
          intro="Built for how Indian businesses sell: UPI first, cash on delivery where you need it, and couriers that send tracking to the customer's WhatsApp."
        />
        <div className="mt-12 space-y-12">
          {integrationGroups.map((group) => (
            <div key={group.id} className="grid gap-6 lg:grid-cols-[16rem_1fr] lg:gap-10">
              <div>
                <h3 id={`group-${group.id}`} className="text-h3">
                  {group.title}
                </h3>
                <p className="mt-1.5 text-small text-muted-foreground">{group.blurb}</p>
              </div>
              <ul aria-labelledby={`group-${group.id}`} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item) => (
                  <li key={item.name} className="flex flex-col rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <item.icon className="size-5" aria-hidden />
                      </span>
                      <Badge tone={item.status === "available" ? "success" : "warning"}>{statusLabel[item.status]}</Badge>
                    </div>
                    <p className="mt-4 font-semibold text-foreground">{item.name}</p>
                    <p className="mt-1 flex-1 text-small text-muted-foreground">{item.line}</p>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="mt-4 inline-flex items-center gap-1 text-small font-medium text-primary hover:text-primary-hover"
                        aria-label={`More about ${item.name}`}
                      >
                        Learn more <ArrowRight className="size-3.5" aria-hidden />
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="health-heading">
        <SectionHeading
          id="health-heading"
          eyebrow="Reliability"
          title="How connections stay healthy"
          intro="Integrations fail quietly in most tools. Here they are checked, signed and retried, and you can see their state at any time."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {healthPoints.map((p) => (
            <li key={p.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <p.icon className="size-5" aria-hidden />
              </span>
              <p className="mt-4 font-semibold text-foreground">{p.title}</p>
              <p className="mt-1.5 text-small text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="integrations-cta-heading" tone="surface">
        <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card-2 p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 id="integrations-cta-heading" className="text-h2">
              Need something that is not listed?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Use webhooks and the public API to connect almost anything, including Zapier. Or tell us what you use and
              we will help you set it up.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Talk to us
            </Button>
            <Button href="/developers" variant="secondary" size="lg">
              See the API
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
