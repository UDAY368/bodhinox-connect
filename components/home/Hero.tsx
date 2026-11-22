import { ArrowRight, Check } from "lucide-react";
import { MockStage } from "@/components/product/MockStage";
import { HomeScreen } from "@/components/product/screens/HomeScreen";
import { InboxScreen } from "@/components/product/screens/InboxScreen";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

const proofPoints = [
  "Official WhatsApp Business Platform",
  "WhatsApp + Instagram in one inbox",
  "Zero markup on Meta message charges",
  "INR billing and GST invoices",
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-14 md:pt-20">
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[720px]" aria-hidden />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-small text-muted-foreground shadow-[0_1px_2px_#0000000a]">
            <span className="size-1.5 rounded-full bg-success" aria-hidden />
            WhatsApp and Instagram CRM for Indian businesses
          </p>
          {/* One H1: the category phrase plus the tagline. */}
          <h1 id="hero-title" className="mt-6 text-hero">
            <span className="sr-only">WhatsApp CRM and marketing platform: </span>
            Every customer conversation, <span className="text-primary">connected.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lead text-muted-foreground">
            Inbox, contacts, campaigns, chatbot flows, KHAGA AI agents, an online store, payments and bookings. One
            workspace for WhatsApp and Instagram, so your team answers faster and sells more.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={site.signupUrl} size="lg" iconRight={<ArrowRight size={18} aria-hidden />}>
              Start free trial
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Book a demo
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {proofPoints.map((point) => (
              <li key={point} className="flex items-center gap-1.5 text-small text-muted-foreground">
                <Check size={15} strokeWidth={2.5} className="shrink-0 text-primary" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto mt-14 max-w-[1200px] animate-rise md:mt-16">
          <div className="hidden sm:block">
            <MockStage
              designWidth={1280}
              label="The Bodhinox Connect dashboard: live KPIs for conversations, new contacts, open deal value, messages, revenue, bookings, ad spend and AI, with quick actions, a conversations chart, pipeline value and a setup checklist."
            >
              <HomeScreen height={800} />
            </MockStage>
          </div>
          <div className="sm:hidden">
            <MockStage
              designWidth={1280}
              label="The Bodhinox Connect inbox with WhatsApp and Instagram chats, an AI agent answering a customer and a Razorpay payment link."
            >
              <InboxScreen height={760} withPanel={false} />
            </MockStage>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden />
        </div>
      </Container>
    </section>
  );
}
