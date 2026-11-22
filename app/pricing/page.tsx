import { ArrowRight, BadgePercent, Gift, IndianRupee, MessageSquare, Wallet } from "lucide-react";
import Link from "next/link";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { FaqList } from "@/components/pricing/FaqList";
import { PlanCards } from "@/components/pricing/PlanCards";
import { Breadcrumbs, Button, Container, Eyebrow, Section } from "@/components/ui";
import { pricingFaqs } from "@/content/faqs";
import { addOns, launchOffer, pricingNote, trialNote } from "@/content/pricing";
import { site } from "@/content/site";
import { faqPageJsonLd, JsonLd, pageMetadata, softwareApplicationJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing: WhatsApp and Instagram CRM plans",
  description:
    "Plans from ₹1,199 a month billed yearly: Starter, Growth and Scale, or Enterprise. Save 10% quarterly or 20% yearly. Zero markup on Meta message charges. GST extra.",
  path: "/pricing",
});

const whyCheaper = [
  {
    icon: Wallet,
    title: "Zero markup on messages",
    body: "Meta's charges are passed on at Meta's own rate from a prepaid wallet. Many providers add 10 to 30%.",
  },
  {
    icon: Gift,
    title: "Flows and AI included",
    body: "Chatbot flows and KHAGA AI credits come with every plan, not as monthly add-ons.",
  },
  {
    icon: BadgePercent,
    title: "No fee on your sales",
    body: "No commission on store orders or paid bookings. Your gateway and courier charge their own fees.",
  },
  {
    icon: MessageSquare,
    title: "Four tools in one",
    body: "WhatsApp CRM, Instagram DM automation, an online store and appointment booking on one bill.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden />
        <Container className="relative pt-10 pb-12 text-center md:pt-14 md:pb-14">
          <Breadcrumbs items={[{ name: "Pricing", path: "/pricing" }]} className="mb-8 flex justify-center" />
          <h1 className="mx-auto max-w-3xl text-hero">Simple plans in rupees. Zero markup on messages.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-muted-foreground">
            Every plan includes the WhatsApp and Instagram inbox, campaigns, flows, KHAGA AI, an online store and
            bookings. {trialNote}
          </p>
        </Container>
      </section>

      <Section labelledBy="plans-heading" spacing="none" className="pb-12 md:pb-16">
        <PlanCards headingId="plans-heading" />
        <p className="mt-6 text-center text-small text-muted-foreground">{pricingNote}</p>
      </Section>

      <Section labelledBy="offer-heading" spacing="tight">
        <div className="grid gap-6 rounded-3xl border border-primary/30 bg-primary-soft p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <Eyebrow>Launch offer</Eyebrow>
            <h2 id="offer-heading" className="mt-2 text-h3">
              {launchOffer.title}
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3">
            {launchOffer.points.map((p) => (
              <li key={p} className="rounded-2xl border border-border bg-card p-4 text-small text-foreground">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="why-heading" tone="surface">
        <div className="max-w-2xl">
          <Eyebrow>Why it costs less</Eyebrow>
          <h2 id="why-heading" className="mt-3 text-h2">
            The price you see is the price you pay
          </h2>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyCheaper.map((w) => (
            <li key={w.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <w.icon className="size-5" aria-hidden />
              </span>
              <p className="mt-4 font-semibold text-foreground">{w.title}</p>
              <p className="mt-1.5 text-small text-muted-foreground">{w.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="compare-heading">
        <h2 id="compare-heading" className="text-h2">
          Compare every plan
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Limits per workspace. Prices exclude 18% GST.
          <span className="sm:hidden"> Scroll the table sideways to see all four plans.</span>
        </p>
        <div className="mt-8">
          <ComparisonTable captionId="compare-caption" />
        </div>
      </Section>

      <Section labelledBy="addons-heading" tone="surface">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Add-ons</Eyebrow>
            <h2 id="addons-heading" className="mt-3 text-h2">
              Grow one piece at a time
            </h2>
            <p className="mt-4 text-muted-foreground">
              Add seats, numbers or AI credits without changing plans. Seat, number and Instagram add-ons get the same
              quarterly and yearly discounts. Prices exclude GST.
            </p>
          </div>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {addOns.map((a) => (
              <li key={a.name} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <span>
                  <span className="block text-foreground">{a.name}</span>
                  {a.note ? <span className="block text-[0.8125rem] text-muted-foreground">{a.note}</span> : null}
                </span>
                <span className="shrink-0 font-semibold tabular-nums">{a.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="charges-heading" spacing="tight">
        <div className="grid grid-cols-1 gap-8 rounded-3xl border border-border bg-card p-6 sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <IndianRupee className="size-5" aria-hidden />
            </span>
            <h2 id="charges-heading" className="mt-4 text-h3">
              How WhatsApp message charges work
            </h2>
          </div>
          <div className="space-y-4 lg:col-span-7">
            <p className="text-muted-foreground">
              Meta charges per delivered template message, by category (marketing, utility or authentication) and the
              customer&apos;s country. Each number gets 1,000 free service replies a month inside the 24-hour window;
              after that Meta charges replies at its utility rate. Messages customers send you are free, and so are
              replies after a click-to-WhatsApp ad within Meta&apos;s free entry window. We pass every charge on at
              Meta&apos;s published rate with zero markup, and show a campaign&apos;s cost before you send it.
            </p>
            <p>
              <Link
                href="/whatsapp-business-platform"
                className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary-hover"
              >
                How Bodhinox Connect uses the WhatsApp Business Platform
                <ArrowRight size={16} aria-hidden />
              </Link>
            </p>
          </div>
        </div>
      </Section>

      <Section labelledBy="faq-heading" tone="surface">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="faq-heading" className="text-h2">
              Pricing questions
            </h2>
            <p className="mt-3 text-muted-foreground">
              Something else on your mind? Write to{" "}
              <a href={site.mailto} className="text-primary underline underline-offset-4 hover:text-primary-hover">
                {site.email}
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={pricingFaqs} />
          </div>
        </div>
      </Section>

      <Section labelledBy="pricing-cta-heading">
        <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 id="pricing-cta-heading" className="text-h2">
              Try Growth free for 14 days
            </h2>
            <p className="mt-3 text-muted-foreground">No card needed. Your contacts, chats and settings stay with you.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={site.signupUrl} size="lg">
              Start free trial
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Book a demo
            </Button>
          </div>
        </div>
      </Section>

      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={faqPageJsonLd(pricingFaqs)} />
    </>
  );
}
