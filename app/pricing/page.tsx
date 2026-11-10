import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { FaqList } from "@/components/pricing/FaqList";
import { PlanCards } from "@/components/pricing/PlanCards";
import { Breadcrumbs, Button, Container, Eyebrow, Section } from "@/components/ui";
import { pricingFaqs } from "@/content/faqs";
import { pricingNote } from "@/content/pricing";
import { site } from "@/content/site";
import { faqPageJsonLd, JsonLd, pageMetadata, softwareApplicationJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing: WhatsApp CRM plans in INR",
  description:
    "Bodhinox Connect plans in INR: Free, Basic at ₹1,499 and Pro at ₹3,999 a month, or Enterprise. Yearly billing gives two months free. GST extra.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <Container className="pt-10 pb-12 md:pt-14 md:pb-16">
        <Breadcrumbs items={[{ name: "Pricing", path: "/pricing" }]} className="mb-8" />
        <h1 className="max-w-3xl text-hero">Simple plans in rupees</h1>
        <p className="mt-5 max-w-2xl text-lead text-muted">
          Start free with your own WhatsApp number. Move to Basic or Pro when your team and your sends grow. Every
          price is in INR, per workspace, per month.
        </p>
      </Container>

      <Section labelledBy="plans-heading" spacing="none" className="pb-16 md:pb-24">
        <PlanCards headingId="plans-heading" />
      </Section>

      <Section labelledBy="charges-heading" tone="sunken" spacing="tight">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>What you pay for</Eyebrow>
            <h2 id="charges-heading" className="mt-3 text-h3">
              Meta message charges and GST
            </h2>
          </div>
          <div className="space-y-4 lg:col-span-7">
            <p className="text-lead">{pricingNote}</p>
            <p className="text-muted">
              Our plans cover the software: the inbox, campaigns, flows, AI agent, store and CRM. Meta charges your
              business directly for WhatsApp messages. Meta sets its rates by message category (Marketing, Utility
              or Authentication) and by the customer&apos;s country, and treats replies inside the 24-hour customer
              service window differently from template messages. Its pricing page has the current rates.
            </p>
            <p>
              <Link
                href="/whatsapp-business-platform"
                className="inline-flex items-center gap-1.5 font-semibold text-copper underline-offset-4 hover:text-copper-hover hover:underline"
              >
                How Bodhinox Connect uses the WhatsApp Business Platform
                <ArrowRight size={16} aria-hidden />
              </Link>
            </p>
          </div>
        </div>
      </Section>

      <Section labelledBy="compare-heading">
        <h2 id="compare-heading" className="text-h2">
          Compare every plan
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Limits per workspace. Prices exclude 18% GST.
          <span className="sm:hidden"> Scroll the table sideways to see all four plans.</span>
        </p>
        <div className="mt-8">
          <ComparisonTable captionId="compare-caption" />
        </div>
      </Section>

      <Section labelledBy="faq-heading" divider>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="faq-heading" className="text-h2">
              Pricing questions
            </h2>
            <p className="mt-3 text-muted">
              Something else on your mind? Write to{" "}
              <a href={site.mailto} className="text-copper underline underline-offset-4 hover:text-copper-hover">
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

      <Section labelledBy="pricing-cta-heading" tone="surface" divider>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="pricing-cta-heading" className="text-h2">
              Start on Free. Upgrade when you need to.
            </h2>
            <p className="mt-3 text-muted">No card needed. Your contacts, chats and settings stay with you.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={site.signupUrl} size="lg">
              Start free
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
