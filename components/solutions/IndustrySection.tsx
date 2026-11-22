import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { MockStage } from "@/components/product/MockStage";
import { PhoneStage } from "@/components/product/Phone";
import { BookingPageCard, BookingPhone } from "@/components/product/screens/AppointmentsScreen";
import { FormPhone } from "@/components/product/screens/FormsScreen";
import { OrdersScreen, PipelineScreen } from "@/components/product/screens/SalesScreen";
import { StorefrontPhone } from "@/components/product/screens/StoreScreen";
import { Button, cx, Section } from "@/components/ui";
import { getFeature } from "@/content/features";
import type { Industry } from "@/content/industries";
import { site } from "@/content/site";
import { FlowSequence } from "./FlowSequence";

type IndustrySectionProps = {
  industry: Industry;
  /** Odd sections put the visual on the left at desktop width. */
  flip?: boolean;
};

function Phone({ label, children }: { label: string; children: ReactNode }) {
  return (
    <PhoneStage className="py-10">
      <MockStage designWidth={320} label={label} className="max-w-[300px]">
        {children}
      </MockStage>
    </PhoneStage>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return <div className="rounded-3xl border border-border bg-card-2 p-4 sm:p-6">{children}</div>;
}

/** The most relevant product screen for each industry, keyed by slug. */
const visuals: Record<string, ReactNode> = {
  "retail-d2c": (
    <Panel>
      <MockStage designWidth={1280} label="Orders screen listing orders from WhatsApp, the store and Instagram with payment and status, and an open order with its Shiprocket shipment.">
        <OrdersScreen height={720} />
      </MockStage>
    </Panel>
  ),
  "clinics-wellness": (
    <Phone label="A booking confirmed on WhatsApp with a code, followed by a reminder message before the visit.">
      <BookingPhone />
    </Phone>
  ),
  education: (
    <Phone label="A WhatsApp Form on a phone collecting a name and a choice from a list, step 1 of 3.">
      <FormPhone />
    </Phone>
  ),
  "real-estate": (
    <Panel>
      <MockStage designWidth={1280} label="Sales pipeline board with deals in New Lead, Qualified, Proposal Sent, Negotiation and Won.">
        <PipelineScreen height={720} />
      </MockStage>
    </Panel>
  ),
  "services-appointments": (
    <Panel>
      <MockStage designWidth={560} label="Public booking page: pick a service and practitioner, then a date and a free time slot." className="mx-auto max-w-[560px]">
        <BookingPageCard />
      </MockStage>
    </Panel>
  ),
  restaurants: (
    <Phone label="An online store on a phone with products, prices and an Order on WhatsApp button.">
      <StorefrontPhone />
    </Phone>
  ),
};

/** One industry on /solutions: the problem, the features that help, a product screen and an example flow. */
export function IndustrySection({ industry, flip = false }: IndustrySectionProps) {
  const headingId = `${industry.slug}-heading`;
  const visual = visuals[industry.slug];
  return (
    <Section id={industry.slug} labelledBy={headingId} tone={flip ? "surface" : "default"}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id={headingId} className="text-h2">
            {industry.name}
          </h2>
          <p className="mt-3 text-lead text-muted-foreground">{industry.summary}</p>

          <h3 className="mt-8 text-small font-semibold text-primary">The problem</h3>
          <p className="mt-2 text-foreground">{industry.problem}</p>

          <h3 className="mt-8 text-small font-semibold text-primary">What helps</h3>
          <ul className="mt-3 grid gap-3">
            {industry.features.map((slug) => {
              const f = getFeature(slug);
              const Icon = f.icon;
              return (
                <li key={slug}>
                  <Link
                    href={f.href}
                    className="group flex gap-3 rounded-2xl border border-border bg-card p-4 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-soft"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5 font-semibold text-foreground">
                        {f.shortTitle}
                        <ArrowRight
                          className="size-4 text-primary transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                      <span className="mt-0.5 block text-small text-muted-foreground">{f.summary}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={site.signupUrl} aria-label={`Start free for ${industry.name.toLowerCase()}`}>
              Start free
            </Button>
            <Button href="/contact" variant="secondary" aria-label={`Book a demo for ${industry.name.toLowerCase()}`}>
              Book a demo
            </Button>
          </div>
        </div>

        <div className={cx("min-w-0", flip && "lg:order-first")}>{visual}</div>
      </div>

      <FlowSequence title={`Example flow for ${industry.name.toLowerCase()}`} steps={industry.exampleFlow} className="mt-12" />
    </Section>
  );
}
