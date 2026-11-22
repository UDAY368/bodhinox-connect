import {
  ArrowRight,
  Check,
  CreditCard,
  FileSpreadsheet,
  KeyRound,
  Lock,
  ScrollText,
  ShieldCheck,
  ShoppingCart,
  Truck,
  UserCheck,
  Download,
  Webhook,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/home/SectionHeading";
import { ProductTour, type TourTab } from "@/components/home/ProductTour";
import { FaqList } from "@/components/pricing/FaqList";
import { MockStage } from "@/components/product/MockStage";
import { PhoneStage } from "@/components/product/Phone";
import { AiSummaryCard, KnowledgeCard } from "@/components/product/screens/AiScreen";
import { AdFunnelCard } from "@/components/product/screens/AdsScreen";
import { BookingPhone } from "@/components/product/screens/AppointmentsScreen";
import { FlowCanvasCard } from "@/components/product/screens/FlowBuilderScreen";
import { BroadcastReportScreen } from "@/components/product/screens/CampaignsScreen";
import { InstagramDmPhone } from "@/components/product/screens/InstagramScreen";
import { OrdersScreen } from "@/components/product/screens/SalesScreen";
import { AuditLogCard, NumbersHealthCard } from "@/components/product/screens/SettingsScreen";
import { StorefrontPhone } from "@/components/product/screens/StoreScreen";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cx } from "@/components/ui/cx";
import type { Faq } from "@/content/faqs";
import { getFeature } from "@/content/features";
import { industries } from "@/content/industries";
import { formatPrice, plans, trialNote } from "@/content/pricing";
import { site } from "@/content/site";

/* ------------------------------------------------------------------ */
/* Proof strip                                                         */
/* ------------------------------------------------------------------ */

export function ReplacesStrip() {
  const items = [
    { k: "1", v: "workspace for WhatsApp and Instagram" },
    { k: "4", v: "tools replaced: CRM, DM automation, store builder, booking" },
    { k: "0%", v: "markup on Meta message charges" },
    { k: "0%", v: "fee on your orders and bookings" },
  ];
  return (
    <section aria-label="Bodhinox Connect at a glance" className="border-y border-border bg-card">
      <Container className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
        {items.map((i) => (
          <div key={i.v} className="px-4 py-7 text-center md:py-9">
            <p className="text-[2.25rem] leading-none font-bold tracking-tight text-foreground">{i.k}</p>
            <p className="mx-auto mt-2 max-w-[22ch] text-small text-muted-foreground">{i.v}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Product tour                                                        */
/* ------------------------------------------------------------------ */

export function ProductTourSection() {
  const tabs: TourTab[] = [
    {
      id: "inbox",
      label: "Inbox",
      title: "One inbox for WhatsApp and Instagram",
      description: "Queues, 24-hour window rings, notes, AI summaries and human handoff in one shared inbox.",
      href: "/features/team-inbox",
      screenLabel: "Shared inbox with conversation list, an AI agent reply, an internal note, a payment link and a contact panel.",
    },
    {
      id: "contacts",
      label: "Contacts",
      title: "A CRM built around the chat",
      description: "Every contact with tags, custom fields, consent, owner and a full timeline.",
      href: "/features/crm-analytics",
      screenLabel: "Contacts table with tags, owners, consent status and source.",
    },
    {
      id: "automation",
      label: "Automation",
      title: "Flows, rules and sequences",
      description: "Chatbots for WhatsApp and Instagram, built on a visual canvas, tested with a dry run.",
      href: "/features/automation",
      screenLabel: "Automation list with flows, their triggers, runs and live switches.",
    },
    {
      id: "campaigns",
      label: "Campaigns",
      title: "Broadcasts that report revenue",
      description: "See delivered, read, replied, orders and revenue for every campaign.",
      href: "/features/campaigns",
      screenLabel: "Campaigns list with delivery, read, reply, order and revenue counts.",
    },
    {
      id: "ai",
      label: "AI",
      title: "KHAGA AI agents",
      description: "Agents that answer from your knowledge, on WhatsApp and Instagram, and know when to hand over.",
      href: "/features/ai-agent",
      screenLabel: "AI agents with channels, conversations handled and share solved without a person.",
    },
    {
      id: "sales",
      label: "Sales",
      title: "Pipelines, orders and payments",
      description: "Move deals through stages and track every order from payment to delivery.",
      href: "/features/crm-analytics",
      screenLabel: "Sales pipeline board with deals in New Lead, Qualified, Proposal Sent, Negotiation and Won.",
    },
    {
      id: "products",
      label: "Products",
      title: "A catalogue that syncs with Meta",
      description: "Products with variants, stock and collections, ready for chat, catalogue messages and your store.",
      href: "/features/commerce",
      screenLabel: "Product catalogue grid with prices, stock and live switches.",
    },
    {
      id: "store",
      label: "Store",
      title: "Your own online store",
      description: "Pick a template, edit the theme, share the link or QR code, and take orders on WhatsApp.",
      href: "/features/commerce",
      screenLabel: "Online store settings with setup checklist, shop address, QR code and theme editor.",
    },
    {
      id: "analytics",
      label: "Analytics",
      title: "Reports your team will actually read",
      description: "Response times, resolution, channel split, busiest hours, revenue and AI performance.",
      href: "/features/crm-analytics",
      screenLabel: "Analytics overview with conversation metrics, charts and needs-attention list.",
    },
  ];

  return (
    <Section id="tour" labelledBy="tour-title" spacing="default">
      <SectionHeading
        id="tour-title"
        eyebrow="The product"
        title="Everything your team needs, exactly where they expect it"
        intro="The same sections you will see on day one: Inbox and Contacts to engage; Automation, Campaigns and AI to grow; Sales, Products and Store to sell."
        className="mx-auto mb-10 text-center"
      />
      <ProductTour tabs={tabs} />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Feature rows                                                        */
/* ------------------------------------------------------------------ */

function FeatureRow({
  id,
  eyebrow,
  title,
  body,
  points,
  href,
  linkLabel,
  visual,
  flip = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  href: string;
  linkLabel: string;
  visual: ReactNode;
  flip?: boolean;
}) {
  return (
    <div className={cx("grid items-center gap-10 lg:gap-14", flip ? "lg:grid-cols-[1.25fr_0.75fr]" : "lg:grid-cols-[0.75fr_1.25fr]")}>
      <div className={cx(flip && "lg:order-2")}>
        <p className="text-small font-semibold text-primary">{eyebrow}</p>
        <h3 id={id} className="mt-3 text-[clamp(1.75rem,1.4rem+1.2vw,2.375rem)] leading-[1.12] tracking-[-0.03em]">
          {title}
        </h3>
        <p className="mt-4 text-lead text-muted-foreground">{body}</p>
        <ul className="mt-6 space-y-2.5">
          {points.map((p) => (
            <li key={p} className="flex gap-2.5 text-foreground">
              <Check className="mt-1 size-4 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <Link href={href} className="mt-7 inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary-hover">
          {linkLabel} <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className={cx(flip && "lg:order-1")}>{visual}</div>
    </div>
  );
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("rounded-3xl border border-border bg-card-2 p-4 sm:p-6", className)}>{children}</div>;
}

export function FeatureRows() {
  return (
    <Section labelledBy="rows-title" tone="surface">
      <SectionHeading
        id="rows-title"
        eyebrow="Engage · Grow · Sell"
        title="From the first message to the paid order"
        intro="Each part works on its own and gets better together: a comment becomes a chat, the chat becomes a lead, the lead pays in the chat."
        className="mx-auto text-center"
      />
      <div className="mt-16 flex flex-col gap-24 md:mt-20 md:gap-32">
        <FeatureRow
          id="row-instagram"
          eyebrow="Instagram automation"
          title="Turn comments and story replies into conversations"
          body="Someone comments PRICE on your reel. They get a DM with the link in seconds, follow you for the reward, and land in the same inbox as your WhatsApp chats."
          points={[
            "Auto-DM links to everyone who comments a keyword",
            "Grow followers from comments and collect leads from story replies",
            "Conversation starters, menu, default reply and AI comment replies",
          ]}
          href="/features/instagram"
          linkLabel="Explore Instagram automation"
          visual={
            <PhoneStage className="py-10">
              <MockStage designWidth={320} label="An Instagram DM sent automatically after a reel comment, with a link button and a follow prompt." className="max-w-[300px]">
                <InstagramDmPhone />
              </MockStage>
            </PhoneStage>
          }
        />
        <FeatureRow
          flip
          id="row-campaigns"
          eyebrow="Campaigns"
          title="Broadcasts that show the money, not just the ticks"
          body="Send approved templates to a live segment, then see who read, replied, clicked and bought. Retarget everyone else in two clicks."
          points={[
            "Segments, lists, CSV and exclusions, scheduled up to 90 days ahead",
            "Carousel, one-time code and limited-time offer templates",
            "Orders and revenue attributed to each campaign",
          ]}
          href="/features/campaigns"
          linkLabel="Explore campaigns"
          visual={
            <Panel>
              <MockStage designWidth={1280} label="A campaign report with delivered, read, replied and clicked counts, orders, revenue and a retarget option.">
                <BroadcastReportScreen />
              </MockStage>
            </Panel>
          }
        />
        <FeatureRow
          id="row-automation"
          eyebrow="Flows and automation"
          title="Build the chatbot on a canvas, not in a spreadsheet"
          body="Drag steps for messages, questions, conditions, AI replies, payment links and bookings. Dry-run it, publish a version, and watch every run."
          points={[
            "Triggers for keywords, first messages, template buttons, tags, orders and Instagram comments",
            "Versioned publishing with dry run, run inspection and replay",
            "Rules and sequences for WhatsApp and Instagram",
          ]}
          href="/features/automation"
          linkLabel="Explore flows and automation"
          visual={
            <Panel>
              <MockStage designWidth={720} label="A chatbot flow on the visual canvas: keyword trigger, message with buttons, condition, AI reply, payment link and handoff.">
                <FlowCanvasCard />
              </MockStage>
            </Panel>
          }
        />
        <FeatureRow
          flip
          id="row-ai"
          eyebrow="KHAGA AI"
          title="AI agents that answer from your knowledge, and know when to stop"
          body="Give each agent a role, a tone and your documents, website and FAQs. It answers at any hour on WhatsApp and Instagram, and hands sensitive or unsure chats to your team."
          points={[
            "Several agents, each with its own channels and working hours",
            "Handoff rules, confidence limits and a full activity log",
            "Summaries, suggested replies and lead scores for your team",
          ]}
          href="/features/ai-agent"
          linkLabel="Explore KHAGA AI"
          visual={
            <Panel className="grid gap-4 sm:grid-cols-[1.4fr_1fr] sm:items-start">
              <MockStage designWidth={620} label="Knowledge sources for an AI agent: documents, website pages and FAQs.">
                <KnowledgeCard />
              </MockStage>
              <MockStage designWidth={380} label="An AI summary with intent, lead score and a suggested reply.">
                <AiSummaryCard />
              </MockStage>
            </Panel>
          }
        />
        <FeatureRow
          id="row-store"
          eyebrow="Products, store and payments"
          title="Your own online store, with checkout on WhatsApp"
          body="Publish a store from your catalogue with a ready-made template. Share the link or QR code, take UPI payments through Razorpay or cash on delivery, and ship with Shiprocket."
          points={[
            "Theme editor, pages, reviews and shop reports",
            "Buyers order with a WhatsApp code or by sending their cart",
            "Shopify and WooCommerce order messages, no fee on orders",
          ]}
          href="/features/commerce"
          linkLabel="Explore the store"
          visual={
            <PhoneStage className="gap-6 py-10">
              <MockStage designWidth={320} label="The public online store on a phone, with products, prices and an Order on WhatsApp button." className="max-w-[280px]">
                <StorefrontPhone />
              </MockStage>
            </PhoneStage>
          }
        />
        <FeatureRow
          flip
          id="row-bookings"
          eyebrow="Appointments"
          title="Bookings that confirm and remind themselves"
          body="Share a booking page. Customers pick a service and a slot, confirm on WhatsApp, pay in advance if you want, and get reminders 24 hours and 2 hours before."
          points={[
            "Services, practitioners, locations and weekly hours",
            "Paid appointments through Razorpay",
            "Outcomes, no-shows and follow-up tasks",
          ]}
          href="/features/appointments"
          linkLabel="Explore appointments"
          visual={
            <PhoneStage className="py-10">
              <MockStage designWidth={320} label="A booking confirmed on WhatsApp with a code, followed by a reminder message." className="max-w-[300px]">
                <BookingPhone />
              </MockStage>
            </PhoneStage>
          }
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Ads + numbers                                                       */
/* ------------------------------------------------------------------ */

export function AdsAndChannels() {
  return (
    <Section labelledBy="ads-title">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col rounded-3xl border border-border bg-card p-6 sm:p-8">
          <Badge tone="primary" className="self-start">Meta Ads</Badge>
          <h2 id="ads-title" className="mt-4 text-[1.75rem] leading-tight tracking-[-0.025em]">
            Follow every click-to-WhatsApp ad to the order
          </h2>
          <p className="mt-3 text-muted-foreground">
            Spend, conversations started, cost per conversation, leads and orders, in one funnel.
          </p>
          <div className="mt-6 flex-1">
            <MockStage designWidth={600} label="Ad funnel from ad clicks to conversations, leads and orders, with cost per conversation.">
              <AdFunnelCard />
            </MockStage>
          </div>
          <Link href="/features/ads" className="mt-6 inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary-hover">
            Explore ads reporting <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="flex flex-col rounded-3xl border border-border bg-card p-6 sm:p-8">
          <Badge tone="success" className="self-start">Official platform</Badge>
          <h2 className="mt-4 text-[1.75rem] leading-tight tracking-[-0.025em]">Your numbers, healthy and in plain sight</h2>
          <p className="mt-3 text-muted-foreground">
            Connect your own numbers with Meta&apos;s Embedded Signup. Quality, messaging limit and name status stay
            visible, so nothing surprises you on a big send.
          </p>
          <div className="mt-6 flex-1">
            <MockStage designWidth={520} label="Two WhatsApp numbers with quality rating, messaging limit and display name status, and an Instagram account.">
              <NumbersHealthCard />
            </MockStage>
          </div>
          <Link
            href="/whatsapp-business-platform"
            className="mt-6 inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary-hover"
          >
            How we use the WhatsApp Business Platform <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Integrations                                                        */
/* ------------------------------------------------------------------ */

const integrationTiles = [
  { name: "Shopify", line: "Orders, payments and abandoned carts", icon: ShoppingCart },
  { name: "WooCommerce", line: "Order messages from WordPress", icon: ShoppingCart },
  { name: "Razorpay", line: "Payment links, UPI, cards", icon: CreditCard },
  { name: "Shiprocket", line: "Shipments and tracking", icon: Truck },
  { name: "Meta catalogue", line: "Products in chat", icon: FileSpreadsheet },
  { name: "Google Sheets", line: "Rows from your flows", icon: FileSpreadsheet },
  { name: "Webhooks", line: "Signed events to your systems", icon: Webhook },
  { name: "Public API", line: "Scoped keys for your code", icon: KeyRound },
];

export function IntegrationsSection() {
  return (
    <Section labelledBy="integrations-title" tone="surface">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            id="integrations-title"
            eyebrow="Integrations"
            title="Connect the tools you already use"
            intro="Bring orders in from Shopify and WooCommerce, take payments with Razorpay, ship with Shiprocket, and send every event to your own systems."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/integrations" variant="secondary">
              See all integrations
            </Button>
            <Button href="/developers" variant="ghost" iconRight={<ArrowRight size={16} aria-hidden />}>
              API and webhooks
            </Button>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {integrationTiles.map((t) => (
            <li key={t.name} className="rounded-2xl border border-border bg-card p-4">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <t.icon className="size-5" aria-hidden />
              </span>
              <p className="mt-3 text-small font-semibold text-foreground">{t.name}</p>
              <p className="mt-0.5 text-[0.8125rem] leading-snug text-muted-foreground">{t.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Trust                                                               */
/* ------------------------------------------------------------------ */

export function TrustSection() {
  const points = [
    { icon: Lock, title: "Workspace isolation", body: "Every workspace is kept apart at the database level." },
    { icon: UserCheck, title: "Roles and permissions", body: "Owner, admin, agent and viewer, with per-feature access." },
    { icon: KeyRound, title: "Two-factor sign-in", body: "Authenticator codes with recovery codes, and session control." },
    { icon: ScrollText, title: "Audit log", body: "Search who did what, and export it as CSV." },
    { icon: ShieldCheck, title: "Consent built in", body: "Opt-in records with source and date, STOP and START handled." },
    { icon: Download, title: "Your data, your call", body: "Export the workspace any time, delete contacts or the workspace." },
  ];
  return (
    <Section labelledBy="trust-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            id="trust-title"
            eyebrow="Security and privacy"
            title="Built for customer data from day one"
            intro="Your customers trust you with their numbers and their chats. The platform is built to keep that trust."
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p.title} className="flex gap-3">
                <p.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span>
                  <span className="block font-semibold text-foreground">{p.title}</span>
                  <span className="mt-0.5 block text-small text-muted-foreground">{p.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/security" className="mt-8 inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary-hover">
            Read about security <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <Panel>
          <MockStage designWidth={620} label="Audit log listing team actions with time, person and details.">
            <AuditLogCard />
          </MockStage>
        </Panel>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */

export function IndustriesSection() {
  return (
    <Section labelledBy="industries-title" tone="surface">
      <SectionHeading
        id="industries-title"
        eyebrow="Solutions"
        title="Made for the way Indian businesses sell"
        className="mx-auto text-center"
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((i) => (
          <li key={i.slug}>
            <Link
              href={`/solutions#${i.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-soft"
            >
              <p className="text-h3">{i.name}</p>
              <p className="mt-2 flex-1 text-muted-foreground">{i.summary}</p>
              <p className="mt-5 flex flex-wrap gap-1.5">
                {i.features.map((f) => (
                  <Badge key={f} tone="neutral">
                    {getFeature(f).shortTitle}
                  </Badge>
                ))}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing teaser                                                      */
/* ------------------------------------------------------------------ */

export function PricingTeaserSection() {
  return (
    <Section labelledBy="pricing-teaser-title">
      <SectionHeading
        id="pricing-teaser-title"
        eyebrow="Pricing"
        title="Simple plans in rupees. Zero markup on messages."
        intro={`Every plan includes the inbox, Instagram, campaigns, flows, AI, store and bookings. ${trialNote}`}
        className="mx-auto text-center"
      />
      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((p) => (
          <li
            key={p.id}
            className={cx(
              "relative flex flex-col rounded-2xl border bg-card p-6",
              p.popular ? "border-primary shadow-[0_0_0_1px_var(--primary)]" : "border-border",
            )}
          >
            <div className="flex items-center justify-between">
              <p className="text-h3">{p.name}</p>
              {p.popular ? <Badge tone="primary">Most popular</Badge> : null}
            </div>
            <p className="mt-4 flex items-baseline gap-1">
              {p.price.yearly === null ? (
                <>
                  <span className="text-small text-muted-foreground">from</span>
                  <span className="text-[2rem] font-bold tracking-tight">{formatPrice(p.fromPrice ?? null)}</span>
                </>
              ) : (
                <span className="text-[2rem] font-bold tracking-tight">{formatPrice(p.price.yearly)}</span>
              )}
              <span className="text-small text-muted-foreground">/ month</span>
            </p>
            <p className="text-[0.8125rem] text-muted-foreground">
              {p.price.yearly === null ? "Billed yearly, + GST" : `Billed yearly · ${formatPrice(p.price.monthly)} monthly · + GST`}
            </p>
            <p className="mt-4 flex-1 text-small text-muted-foreground">{p.description}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Button href="/pricing" variant="secondary" iconRight={<ArrowRight size={16} aria-hidden />}>
          Compare plans
        </Button>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ + final CTA                                                     */
/* ------------------------------------------------------------------ */

export function HomeFaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <Section labelledBy="faq-title" tone="surface">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          id="faq-title"
          eyebrow="Questions"
          title="Good to know"
          intro={
            <>
              Something else? <Link href="/contact" className="text-primary hover:text-primary-hover">Ask us</Link> and we
              will reply within a working day.
            </>
          }
        />
        <FaqList faqs={faqs} />
      </div>
    </Section>
  );
}

export function FinalCtaSection() {
  return (
    <section aria-labelledby="final-cta-title" className="py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card px-6 pt-14 text-center sm:px-12">
          <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/bodhinox-mark@2x.webp" alt="" width={56} height={56} className="mx-auto size-14" />
            <h2 id="final-cta-title" className="mx-auto mt-6 max-w-2xl text-h2">
              Connect your number and send your first message today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lead text-muted-foreground">
              {trialNote} Bring your team, your catalogue and your customers. We will help you move.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={site.signupUrl} size="lg" iconRight={<ArrowRight size={18} aria-hidden />}>
                Start free trial
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Book a demo
              </Button>
            </div>
            <div className="mx-auto mt-14 max-w-[1000px] [mask-image:linear-gradient(to_bottom,black_45%,transparent)]">
              <MockStage designWidth={1280} label="The Bodhinox Connect orders screen.">
                <OrdersScreen height={520} />
              </MockStage>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

