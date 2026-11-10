import { ArrowRight, Check, ChevronDown, Download, FolderLock, KeyRound, ScrollText, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { cx } from "@/components/ui/cx";
import { comingSoon, features } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { industries } from "@/content/industries";
import { formatPrice, plans } from "@/content/pricing";
import { site } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

const textLink =
  "inline-flex items-center gap-1.5 font-semibold text-copper underline-offset-4 hover:text-copper-hover hover:underline";

/* ---- 2. Problem to outcome -------------------------------------------- */

const shifts = [
  {
    from: "Missed chats",
    to: "Every message answered",
    detail: "One shared inbox for every number, with an AI agent that replies after hours.",
  },
  {
    from: "Manual follow-ups",
    to: "Automated journeys",
    detail: "Flows and automations send the reminder, the payment link and the next step for you.",
  },
  {
    from: "Scattered tools",
    to: "One platform",
    detail: "Chats, campaigns, orders, payments and contacts sit together, so nothing gets copied by hand.",
  },
];

export function ProblemOutcome() {
  return (
    <Section labelledBy="shift-title" tone="surface" spacing="tight" divider>
      <h2 id="shift-title" className="sr-only">
        What changes when you use Bodhinox Connect
      </h2>
      <ul className="grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
        {shifts.map((s) => (
          <li key={s.from} className="md:px-8 md:first:pl-0 md:last:pr-0">
            <p className="text-small text-muted line-through decoration-line-strong">{s.from}</p>
            <p className="mt-1 flex items-center gap-2 font-display text-h3 font-semibold text-ink">
              <ArrowRight size={20} className="shrink-0 text-copper" aria-hidden />
              <span>{s.to}</span>
            </p>
            <p className="mt-2 text-small text-muted">{s.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---- 3. Six pillars ----------------------------------------------------- */

export function Pillars() {
  const instagram = comingSoon[0];
  return (
    <Section labelledBy="pillars-title">
      <SectionHeading
        id="pillars-title"
        eyebrow="The platform"
        title="Six tools your team uses every day, in one place"
        intro="Bodhinox Connect is a WhatsApp CRM and marketing platform. Each part works on its own and shares the same contacts, chats and orders."
      />
      <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <li key={f.slug} className="border-t border-line pt-6">
              <Icon size={24} strokeWidth={1.75} className="text-copper" aria-hidden />
              <h3 className="mt-4 text-h3">{f.title}</h3>
              <p className="mt-2 text-body text-muted">{f.summary}</p>
              <Link href={f.href} className={cx(textLink, "mt-4 text-small")}>
                See more<span className="sr-only"> about {f.title}</span>
                <ArrowRight size={14} aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
      {instagram ? (
        <p className="mt-12 flex flex-wrap items-center gap-3 text-small text-muted">
          <Badge tone="outline">Coming soon</Badge>
          <span>{instagram.summary}</span>
        </p>
      ) : null}
    </Section>
  );
}

/* ---- 4. How it works ---------------------------------------------------- */

const steps = [
  {
    title: "Connect your WhatsApp number",
    body: "Sign up, then link your WhatsApp Business Account through Meta's Embedded Signup. The account and number stay in your name.",
  },
  {
    title: "Import your contacts",
    body: "Upload a CSV, or let contacts build up as customers message you. Add tags and custom fields as you go.",
  },
  {
    title: "Launch a campaign or a flow",
    body: "Send an approved template to a segment, or publish a chat flow that answers, qualifies and books on its own.",
  },
  {
    title: "Watch replies and sales in one dashboard",
    body: "See response times, campaign reads, orders and revenue together, and step into any chat when you need to.",
  },
];

export function HowItWorks() {
  return (
    <Section labelledBy="how-title" tone="sunken">
      <SectionHeading id="how-title" eyebrow="How it works" title="Up and running in four steps" />
      <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, i) => (
          <li key={step.title}>
            <span className="font-mono text-small font-medium text-copper tabular-nums" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-h3">{step.title}</h3>
            <p className="mt-2 text-body text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ---- 6. Outcomes -------------------------------------------------------- */

const aims = [
  { value: "Under 5 min", label: "Faster first reply", detail: "The AI agent and quick replies answer while your team is busy." },
  { value: "1 in 4 return", label: "More repeat orders", detail: "Customers who opted in hear about new stock and come back to buy." },
  { value: "10 hrs a week", label: "Fewer manual hours", detail: "Reminders, payment links and follow-ups go out without copy and paste." },
];

export function Outcomes() {
  return (
    <Section labelledBy="aims-title" divider>
      <SectionHeading
        id="aims-title"
        eyebrow="Outcomes"
        title="What teams aim for"
        intro="These are illustrative goals that teams set when they move their WhatsApp work into one place. They are not measured customer results."
      />
      <dl className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {aims.map((a) => (
          <div key={a.label} className="border-t border-line-strong pt-6">
            <dt className="text-small font-semibold text-ink">{a.label}</dt>
            <dd className="mt-2 font-display text-h2 font-semibold text-copper tabular-nums">{a.value}</dd>
            <dd className="mt-2 text-body text-muted">{a.detail}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 font-mono text-micro text-muted">Illustrative figures: what teams aim for, not results.</p>
    </Section>
  );
}

/* ---- 7. Industries ------------------------------------------------------ */

export function Industries() {
  return (
    <Section labelledBy="industries-title" tone="surface" divider>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading
          id="industries-title"
          eyebrow="Solutions"
          title="Built for the way Indian businesses sell"
          intro="See how shops, clinics, schools, property teams, service firms and kitchens use Bodhinox Connect day to day."
        />
        <div>
          <ul className="flex flex-wrap gap-3">
            {industries.map((ind) => (
              <li key={ind.slug}>
                <Link
                  href={`/solutions#${ind.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-bg px-4 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:border-copper hover:text-copper"
                >
                  {ind.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/solutions" className={cx(textLink, "mt-8")}>
            See every solution
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ---- 8. Trust and security --------------------------------------------- */

const trustItems = [
  {
    icon: FolderLock,
    title: "Workspace isolation",
    body: "Each workspace's contacts, chats and orders are kept apart from every other workspace.",
  },
  {
    icon: Users,
    title: "Role-based access",
    body: "Owner, admin, agent and viewer roles decide who can see and change what.",
  },
  {
    icon: KeyRound,
    title: "Two-factor sign-in",
    body: "Add a second step at sign-in so a stolen password is not enough.",
  },
  {
    icon: ScrollText,
    title: "Audit log",
    body: "See a record of important actions in your workspace: who did what, and when.",
  },
  {
    icon: Download,
    title: "Data export and deletion",
    body: "Export your workspace at any time, and delete it or your account yourself from Settings.",
  },
];

export function Trust() {
  return (
    <Section labelledBy="trust-title">
      <SectionHeading
        id="trust-title"
        eyebrow="Trust and security"
        title="Your customers' data stays yours"
        intro="Your WhatsApp Business Account and number stay in your name. Here is how we protect what flows through them."
      />
      <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {trustItems.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex gap-4">
            <Icon size={22} strokeWidth={1.75} className="mt-1 shrink-0 text-copper" aria-hidden />
            <div>
              <h3 className="text-[1.125rem] leading-snug">{title}</h3>
              <p className="mt-1 text-body text-muted">{body}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-small">
        <Link href="/whatsapp-business-platform" className={textLink}>
          How we use the WhatsApp Business Platform
        </Link>
        <Link href="/privacy" className={textLink}>
          Read the privacy policy
        </Link>
        <Link href="/data-deletion" className={textLink}>
          How to delete your data
        </Link>
      </div>
    </Section>
  );
}

/* ---- 9. Pricing teaser -------------------------------------------------- */

export function PricingTeaser() {
  const shown = plans.filter((p) => p.id !== "enterprise");
  return (
    <Section labelledBy="pricing-title" tone="sunken">
      <SectionHeading
        id="pricing-title"
        eyebrow="Pricing"
        title="Start free. Pay as your team grows."
        intro="Prices are in rupees per month. Enterprise plans are priced to your volume."
      />
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {shown.map((plan) => (
          <li
            key={plan.id}
            className={cx(
              "flex flex-col rounded-card border bg-surface p-6",
              plan.popular ? "border-copper" : "border-line",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-h3">{plan.name}</h3>
              {plan.popular ? <Badge tone="copper">Most popular</Badge> : null}
            </div>
            <p className="mt-2 text-small text-muted">{plan.description}</p>
            <p className="mt-6 flex items-baseline gap-1.5">
              <span className="font-mono text-[2rem] leading-none font-medium text-ink tabular-nums">
                {formatPrice(plan.monthly)}
              </span>
              <span className="text-small text-muted">per month</span>
            </p>
            <ul className="mt-6 flex-1 space-y-2.5">
              {plan.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-small text-ink">
                  <Check size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-copper" aria-hidden />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <Button
              href={plan.cta.kind === "signup" ? site.signupUrl : "/contact"}
              variant={plan.popular ? "primary" : "secondary"}
              className="mt-8 w-full"
              aria-label={`${plan.cta.label} on the ${plan.name} plan`}
            >
              {plan.cta.label}
            </Button>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-2xl text-small text-muted">
        Prices exclude 18% GST. Meta bills WhatsApp message charges separately at its published rates.
      </p>
      <Link href="/pricing" className={cx(textLink, "mt-6")}>
        Compare all plans
        <ArrowRight size={16} aria-hidden />
      </Link>
    </Section>
  );
}

/* ---- 10. FAQ ------------------------------------------------------------ */

export function HomeFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <Section labelledBy="faq-title">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title="Questions owners ask us"
          intro={
            <>
              Something else on your mind? Write to{" "}
              <a href={site.mailto} className="text-copper underline underline-offset-4 hover:text-copper-hover">
                {site.email}
              </a>
              .
            </>
          }
        />
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 text-body font-semibold text-ink [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <ChevronDown
                  size={20}
                  className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="max-w-2xl pb-6 text-body text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---- 11. Final CTA ------------------------------------------------------ */

export function FinalCta() {
  return (
    <Section labelledBy="cta-title" tone="surface" divider>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 id="cta-title" className="text-h2">
            Start free today. No card needed.
          </h2>
          <p className="mt-4 text-lead text-muted">
            Connect your number, invite your team and send your first reply from one inbox.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={site.signupUrl} size="lg" iconRight={<ArrowRight size={18} aria-hidden />}>
            Start free
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Book a demo
          </Button>
        </div>
      </div>
    </Section>
  );
}
