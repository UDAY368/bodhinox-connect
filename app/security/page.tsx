import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/home/SectionHeading";
import { MockStage } from "@/components/product/MockStage";
import { AuditLogCard, RolesCard } from "@/components/product/screens/SettingsScreen";
import { Breadcrumbs, Button, Container, Section } from "@/components/ui";
import { legalLinks, messagingCompliance, privacyControls, securityPillars, type SecurityPoint } from "@/content/security";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Security and privacy",
  description:
    "How Bodhinox Connect protects customer data: workspace isolation, roles, two-factor sign-in, audit log, encrypted secrets, consent records and data deletion.",
  path: "/security",
});

function PointCard({ point, className = "bg-card" }: { point: SecurityPoint; className?: string }) {
  return (
    <li className={`rounded-2xl border border-border p-6 ${className}`}>
      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <point.icon className="size-5" aria-hidden />
      </span>
      <p className="mt-4 font-semibold text-foreground">{point.title}</p>
      <p className="mt-1.5 text-small text-muted-foreground">{point.body}</p>
    </li>
  );
}

export default function SecurityPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden />
        <Container className="relative pt-10 pb-12 text-center md:pt-14 md:pb-16">
          <Breadcrumbs items={[{ name: "Security", path: "/security" }]} className="mb-8 flex justify-center" />
          <h1 className="mx-auto max-w-3xl text-hero">Built for customer data from day one</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-muted-foreground">
            Your customers trust you with their numbers and their chats. Here is how {site.name} keeps each workspace
            apart, controls who sees what, and gives you and your customers control over the data.
          </p>
        </Container>
      </section>

      <Section labelledBy="pillars-heading" spacing="none" className="pb-16 md:pb-24">
        <h2 id="pillars-heading" className="sr-only">
          How the platform is protected
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {securityPillars.map((p) => (
            <PointCard key={p.title} point={p} />
          ))}
        </ul>
      </Section>

      <Section labelledBy="access-heading" tone="surface">
        <SectionHeading
          id="access-heading"
          eyebrow="Access and accountability"
          title="Decide who can do what, and see what they did"
          intro="Give agents the inbox without the settings, give viewers reports without the chats, and keep a record of every sensitive change."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="rounded-3xl border border-border bg-card-2 p-4 sm:p-6">
            <MockStage
              designWidth={620}
              label="Team roles: owner, admin, agent and viewer, with the features each role can use."
            >
              <RolesCard />
            </MockStage>
          </div>
          <div className="rounded-3xl border border-border bg-card-2 p-4 sm:p-6">
            <MockStage designWidth={620} label="Audit log listing team actions with time, person and details, with search and CSV export.">
              <AuditLogCard />
            </MockStage>
          </div>
        </div>
      </Section>

      <Section labelledBy="privacy-heading">
        <SectionHeading
          id="privacy-heading"
          eyebrow="Privacy controls"
          title="Your data, and your customers' choices, respected"
          intro="Consent and deletion are part of the product, not a support ticket."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {privacyControls.map((p) => (
            <PointCard key={p.title} point={p} />
          ))}
        </ul>
      </Section>

      <Section labelledBy="compliance-heading" tone="surface">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              id="compliance-heading"
              eyebrow="Messaging compliance"
              title="WhatsApp's rules, built in"
              intro="The platform follows Meta's rules for you, so a busy team cannot break them by accident."
            />
            <Link
              href="/whatsapp-business-platform"
              className="mt-6 inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary-hover"
            >
              How we use the WhatsApp Business Platform <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {messagingCompliance.map((p) => (
              <PointCard key={p.title} point={p} className="bg-card-2" />
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="legal-heading">
        <SectionHeading
          id="legal-heading"
          eyebrow="Policies"
          title="Read the details"
          intro={
            <>
              Questions about security or a data request? Write to{" "}
              <a href={site.mailto} className="text-primary underline underline-offset-4 hover:text-primary-hover">
                {site.email}
              </a>
              .
            </>
          }
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {legalLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span className="flex items-center gap-1.5 font-semibold text-foreground">
                  {l.label}
                  <ArrowRight
                    className="size-4 text-primary transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
                <span className="mt-1.5 text-small text-muted-foreground">{l.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="security-cta-heading" tone="surface">
        <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card-2 p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 id="security-cta-heading" className="text-h2">
              Have a security questionnaire?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Send it over. We will answer it plainly, and walk your team through the controls on a call.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Talk to us
            </Button>
            <Button href={site.signupUrl} variant="secondary" size="lg">
              Start free
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
