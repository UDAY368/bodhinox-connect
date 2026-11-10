import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { cx } from "@/components/ui/cx";
import { ChatThread, DeviceFrame, StatRow, TemplateCard, WindowFrame } from "@/components/mockups";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "./SectionHeading";

type Spotlight = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  link: { href: string; label: string };
  visual: ReactNode;
};

/* ---- 1. AI agent ------------------------------------------------------- */

const aiVisual = (
  <DeviceFrame label="The AI agent answers a delivery and returns question from the business's own FAQ, then hands a refund request to a team member.">
    <ChatThread
      contact={{ name: "Rohit Mehta", meta: "AI agent on · knowledge base: Store FAQ" }}
      items={[
        { kind: "day", label: "Today, 11:08 pm" },
        { from: "customer", content: "Do you deliver to Nagpur? And how long do I have to return a pair?", time: "23:08" },
        {
          from: "business",
          content: (
            <span className="block">
              <span className="block">
                Yes, we deliver to Nagpur in 3 to 5 working days. You can return unworn shoes within 7 days of
                delivery.
              </span>
              <span className="mt-1.5 block font-mono text-[0.6875rem] text-muted">AI agent · from Store FAQ</span>
            </span>
          ),
          time: "23:08",
          status: "read",
        },
        { from: "customer", content: "My last order arrived damaged. I want a refund.", time: "23:10" },
        { kind: "system", text: "Refund request · handed to the support team" },
        {
          from: "business",
          content: "Sorry about that. I have passed this to our support team and someone will reply here by 10 am.",
          time: "23:10",
          status: "delivered",
        },
      ]}
      composer={false}
    />
  </DeviceFrame>
);

/* ---- 2. Campaigns ------------------------------------------------------ */

const campaignVisual = (
  <WindowFrame
    label="A Diwali campaign report: an approved marketing template, illustrative delivery, read, reply and click figures, and a follow-up queued for people who read but did not reply."
    title="Campaigns / Diwali offer"
    toolbar={<Badge tone="success">Sent</Badge>}
  >
    <div className="grid gap-4">
      <TemplateCard
        category="Marketing"
        name="diwali_offer_2026"
        header="Our Diwali collection is here"
        body={"Hi {{1}}, use code {{2}} for 15% off until Sunday."}
        footer="Reply STOP to opt out"
        buttons={["Shop the collection"]}
      />
      <div className="flex flex-col gap-4">
        <StatRow
          stats={[
            { label: "Delivered", value: "4,812", hint: "of 4,950 sent" },
            { label: "Read", value: "3,960", emphasis: true },
            { label: "Replied", value: "642" },
            { label: "Clicked", value: "1,105" },
          ]}
          caption="Illustrative figures"
        />
        <div className="rounded-xl border border-line bg-bg p-3">
          <p className="font-mono text-micro text-muted">Retarget</p>
          <p className="mt-1 text-small text-ink">Read but did not reply</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-small text-ink tabular-nums">3,318 contacts</span>
            <span className="rounded-full bg-copper-soft px-2.5 py-0.5 font-mono text-micro text-copper-ink">
              Follow-up scheduled · Sat 10:00
            </span>
          </div>
        </div>
      </div>
    </div>
  </WindowFrame>
);

/* ---- 3. Store and payments --------------------------------------------- */

const storeVisual = (
  <DeviceFrame label="A WhatsApp order: the customer checks out a cart, pays by UPI through a Razorpay link, gets a GST invoice and a Shiprocket tracking link.">
    <ChatThread
      contact={{ name: "Kavya Iyer", meta: "Order #1042 · 2 items" }}
      items={[
        {
          from: "customer",
          content: (
            <span className="block">
              <span className="block font-medium">Cart · 2 items</span>
              <span className="mt-1 flex justify-between gap-4 font-mono text-micro text-muted">
                <span>Filter coffee, 500 g × 2</span>
                <span>₹780</span>
              </span>
            </span>
          ),
          time: "18:02",
        },
        {
          from: "business",
          content: (
            <span className="block">
              <span className="block">Thanks, Kavya. Your total is ₹780 including GST.</span>
              <span className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2">
                <span className="font-mono text-micro text-muted">Razorpay · UPI</span>
                <span className="font-mono text-small font-medium text-copper">Pay ₹780</span>
              </span>
            </span>
          ),
          time: "18:02",
          status: "read",
        },
        { kind: "system", text: "Payment received · ₹780 · UPI" },
        {
          from: "business",
          content: "Paid, thank you. Your GST invoice is attached. We will ship today.",
          time: "18:04",
          status: "read",
        },
        {
          from: "business",
          content: (
            <span className="block">
              <span className="block">Your order is on the way with Shiprocket.</span>
              <span className="mt-1 block font-mono text-micro text-copper-ink">Track shipment</span>
            </span>
          ),
          time: "Next day, 11:20",
          status: "delivered",
        },
      ]}
      composer={false}
    />
  </DeviceFrame>
);

const spotlights: Spotlight[] = [
  {
    id: "spotlight-ai",
    eyebrow: "AI agent",
    title: "Answers at 11 pm, from your own knowledge",
    body:
      "Give the AI agent your website, documents and FAQs. It replies to customers at any hour in your tone, and passes anything sensitive to a person on your team.",
    points: [
      "Handoff keywords, a confidence threshold and a limit on turns",
      "Refunds, complaints and other sensitive topics go to a human",
      "An activity log shows every decision the agent made",
    ],
    link: { href: "/features/ai-agent", label: "How the WhatsApp AI agent works" },
    visual: aiVisual,
  },
  {
    id: "spotlight-campaigns",
    eyebrow: "Campaigns",
    title: "See who read your offer, and follow up with the rest",
    body:
      "Send an approved template to a segment, a tag or a CSV. Track delivery, reads, replies and clicks, then send a follow-up to people who read and did not reply.",
    points: [
      "Marketing, Utility and Authentication templates, with Meta approval status",
      "Scheduling, pacing and personalised variables",
      "STOP opt-outs are respected in every send",
    ],
    link: { href: "/features/campaigns", label: "More on WhatsApp broadcast campaigns" },
    visual: campaignVisual,
  },
  {
    id: "spotlight-store",
    eyebrow: "Store and payments",
    title: "From cart to UPI payment to shipping, inside the chat",
    body:
      "Customers browse your catalogue, fill a cart and pay through a Razorpay link without leaving WhatsApp. You get the order with a GST invoice and ship it with Shiprocket.",
    points: [
      "UPI, cards, net banking and cash on delivery",
      "Orders, returns, refunds, GST invoices and receipts",
      "Shiprocket pickup and tracking sent to the customer",
    ],
    link: { href: "/features/commerce", label: "More on the WhatsApp store and Razorpay payments" },
    visual: storeVisual,
  },
];

export function Spotlights() {
  return (
    <Section labelledBy="spotlights-title" divider>
      <SectionHeading
        id="spotlights-title"
        eyebrow="A closer look"
        title="What a working day looks like in Bodhinox Connect"
      />
      <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
        {spotlights.map((s, i) => (
          <article
            key={s.id}
            aria-labelledby={s.id}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div className={cx(i % 2 === 1 && "lg:order-2")}>
              <p className="font-mono text-micro font-medium tracking-[0.08em] text-copper uppercase">{s.eyebrow}</p>
              <h3 id={s.id} className="mt-3 max-w-lg text-[1.75rem] leading-tight tracking-[-0.02em]">
                {s.title}
              </h3>
              <p className="mt-4 max-w-lg text-body text-muted">{s.body}</p>
              <ul className="mt-6 max-w-lg space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-body text-ink">
                    <Check size={18} strokeWidth={2.25} className="mt-1 shrink-0 text-copper" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={s.link.href}
                className="mt-7 inline-flex items-center gap-1.5 font-semibold text-copper underline-offset-4 hover:text-copper-hover hover:underline"
              >
                {s.link.label}
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
            <div className={cx("min-w-0", i % 2 === 1 && "lg:order-1")}>{s.visual}</div>
          </article>
        ))}
      </div>
    </Section>
  );
}
