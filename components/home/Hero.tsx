import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ChatThread, DeviceFrame } from "@/components/mockups";
import type { ChatItem } from "@/components/mockups";
import { site } from "@/content/site";

const proofPoints = [
  "Built on the official WhatsApp Business Platform (Cloud API)",
  "Connect your own number with Meta's Embedded Signup",
  "Made for India: INR pricing, GST invoices, Razorpay",
];

/** A product question answered and paid for in chat. Arrives in sequence; ticks turn to read. */
const heroChat: ChatItem[] = [
  { kind: "day", label: "Today" },
  { from: "customer", content: "Hi, is the indigo cotton kurta available in size M?", time: "10:41" },
  { kind: "system", text: "Customer service window open · 23h 59m left" },
  {
    from: "business",
    content: "Yes, 4 left in M. It is ₹1,299 with free delivery in Pune. Shall I send a payment link?",
    time: "10:41",
    status: "read",
  },
  { from: "customer", content: "Yes please", time: "10:42" },
  {
    from: "business",
    content: (
      <span className="block">
        <span className="block">Here is your secure link. You can pay by UPI, card or net banking.</span>
        <span className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2">
          <span className="font-mono text-micro whitespace-nowrap text-muted">Razorpay · UPI</span>
          <span className="font-mono text-small font-medium whitespace-nowrap text-copper">Pay ₹1,299</span>
        </span>
      </span>
    ),
    time: "10:42",
    status: "read",
  },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-10 pb-16 md:pt-16 md:pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          {/* One H1: the category phrase (what searchers type) plus the tagline. */}
          <h1 id="hero-title">
            <Eyebrow as="span" className="block">
              WhatsApp CRM and marketing platform for Indian businesses
            </Eyebrow>{" "}
            <span className="mt-4 block max-w-[14ch] text-hero">Every customer conversation, connected.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lead text-muted">
            {site.name} is a WhatsApp CRM and marketing platform for Indian businesses. Run your inbox, campaigns,
            automation, AI agent and store in one place, and turn chats into sales.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={site.signupUrl} size="lg" iconRight={<ArrowRight size={18} aria-hidden />}>
              Start free
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Book a demo
            </Button>
          </div>
          <p className="mt-3 text-small text-muted">No card needed to start.</p>
          <ul className="mt-10 space-y-2.5 border-t border-line pt-6">
            {proofPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-small text-ink">
                <Check size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-success" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <DeviceFrame label="A WhatsApp chat in Bodhinox Connect: a customer asks about a kurta, the business replies with the price and sends a Razorpay UPI payment link, and both replies show as read.">
          <ChatThread
            contact={{ name: "Ananya Rao", meta: "+91 98•• ••• 210 · Retail" }}
            items={heroChat}
            animate
            stepMs={850}
            staticCount={4}
            className="min-h-[30rem]"
          />
        </DeviceFrame>
      </Container>
    </section>
  );
}
