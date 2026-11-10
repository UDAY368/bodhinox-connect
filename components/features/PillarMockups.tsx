import { CreditCard, FileText, Package, Truck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cx } from "@/components/ui/cx";
import {
  Avatar,
  ChatThread,
  DeviceFrame,
  InboxList,
  StatRow,
  TemplateCard,
  WindowFrame,
} from "@/components/mockups";

/*
 * Product mock-ups for the features section. Every name, number and order
 * here is made up to show how a screen looks. Figures carry the
 * "Illustrative figures" caption wherever they could be read as results.
 */

/* ----------------------------- Team inbox ------------------------------ */

export function InboxMockup() {
  return (
    <WindowFrame
      label="Shared inbox with five WhatsApp chats, each showing its status, the teammate it is assigned to and a tag"
      title="Inbox / All numbers"
      toolbar={<Badge tone="copper">3 open</Badge>}
      flush
    >
      <InboxList
        items={[
          {
            name: "Ananya Rao",
            preview: "Can I change the delivery address for order 1042?",
            time: "10:42",
            unread: 2,
            status: "open",
            assignee: "Priya",
            tag: "COD",
            active: true,
          },
          {
            name: "Rohit Malhotra",
            preview: "Is the blue kurta back in size L?",
            time: "10:31",
            status: "open",
            handledBy: "AI",
          },
          {
            name: "Fatima Shaikh",
            preview: "Sharing the payment screenshot now",
            time: "10:12",
            unread: 1,
            status: "waiting",
            assignee: "Accounts",
          },
          {
            name: "Karthik Iyer",
            preview: "Booked for Saturday 11 am, thank you",
            time: "09:58",
            status: "resolved",
            assignee: "Arjun",
            tag: "VIP",
          },
          {
            name: "Meera Joshi",
            preview: "Do you ship to Guwahati?",
            time: "Yesterday",
            status: "open",
            assignee: "Sales",
          },
        ]}
      />
    </WindowFrame>
  );
}

export function HandoffMockup() {
  return (
    <DeviceFrame label="Chat where the bot answers a stock question, then a teammate takes over and leaves an internal note for a colleague">
      <ChatThread
        contact={{ name: "Ananya Rao", meta: "+91 98•• ••• 210 · assigned to Priya" }}
        items={[
          { kind: "day", label: "Today" },
          { from: "customer", content: "Hi, I ordered yesterday. Can I change the delivery address?", time: "10:40" },
          {
            from: "business",
            content: "Sure. Please share your order number and the new address.",
            time: "10:40",
            status: "read",
          },
          { from: "customer", content: "Order 1042. New address is in Indiranagar, Bengaluru.", time: "10:41" },
          { kind: "system", text: "Bot paused · Priya took over" },
          { kind: "system", text: "Note: @Arjun please check if 1042 has shipped" },
          {
            from: "business",
            content: "Thanks Ananya. I am checking with our dispatch team and will confirm in 10 minutes.",
            time: "10:42",
            status: "delivered",
          },
        ]}
        composerText="Reply, or / for quick replies"
      />
    </DeviceFrame>
  );
}

/* ------------------------------ Campaigns ------------------------------ */

export function CampaignReportMockup() {
  return (
    <WindowFrame
      label="Campaign report for a festive offer: sent, delivered, read, replied and clicked counts, with a follow-up to people who did not read"
      title="Campaigns / Festive offer"
      toolbar={<Badge tone="success">Completed</Badge>}
    >
      <StatRow
        stats={[
          { label: "Sent", value: "4,820" },
          { label: "Delivered", value: "4,701", hint: "97.5%" },
          { label: "Read", value: "3,912", hint: "83.2%", emphasis: true },
          { label: "Replied", value: "611" },
          { label: "Clicked", value: "1,054" },
        ]}
        caption="Illustrative figures"
      />
      <div className="mt-5 rounded-xl border border-line p-4">
        <p className="font-mono text-micro text-muted">Retarget</p>
        <ul className="mt-2 divide-y divide-line text-small">
          <li className="flex items-center justify-between gap-3 py-2">
            <span className="text-ink">Delivered, not read</span>
            <span className="font-mono text-muted">789</span>
          </li>
          <li className="flex items-center justify-between gap-3 py-2">
            <span className="text-ink">Read, no reply</span>
            <span className="font-mono text-muted">3,301</span>
          </li>
          <li className="flex items-center justify-between gap-3 py-2">
            <span className="text-ink">Failed, ready to retry</span>
            <span className="font-mono text-muted">119</span>
          </li>
        </ul>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex h-8 items-center rounded-control bg-copper px-3 text-small font-semibold text-on-copper">
            Follow up
          </span>
          <span className="font-mono text-micro text-muted">Scheduled · Sat 10:00 · 200 per minute</span>
        </div>
      </div>
    </WindowFrame>
  );
}

export function TemplateMockup() {
  return (
    <div role="img" aria-label="Two message templates: an approved Marketing template with a name variable and buttons, and a Utility template in review" className="grid gap-4 sm:grid-cols-2">
      <TemplateCard
        category="Marketing"
        name="festive_offer_2026"
        header="Festive week offer"
        body={"Hi {{1}}, your favourite cushions are 20% off till Sunday. Use code {{2}} at checkout."}
        footer="Reply STOP to opt out"
        buttons={["Shop now", "Not interested"]}
        status="Approved"
      />
      <TemplateCard
        category="Utility"
        name="order_shipped"
        body={"Hi {{1}}, order {{2}} has shipped. Track it here: {{3}}"}
        status="In review"
      />
    </div>
  );
}

/* ----------------------------- Automation ------------------------------ */

type FlowNode = { kind: string; text: string; branch?: string[] };

const flowNodes: FlowNode[] = [
  { kind: "Trigger", text: "Keyword: \"order status\"" },
  { kind: "Question", text: "Please share your order number" },
  { kind: "Condition", text: "Order found?", branch: ["Yes: send status", "No: assign to Support"] },
  { kind: "Buttons", text: "Anything else?  [Talk to a person]  [No, thanks]" },
  { kind: "Tag", text: "Add tag: order-enquiry" },
];

export function FlowBuilderMockup() {
  return (
    <WindowFrame
      label="Flow builder showing an order status flow: keyword trigger, a question, a condition with two branches, buttons and a tag step"
      title="Flows / Order status"
      toolbar={<Badge tone="success">v3 published</Badge>}
    >
      <ol className="relative space-y-3">
        {flowNodes.map((n, i) => (
          <li key={n.kind} className="relative pl-8">
            <span
              aria-hidden
              className={cx(
                "absolute top-3 left-2.5 size-2.5 rounded-full",
                i === 0 ? "bg-copper" : "border-2 border-line-strong bg-surface",
              )}
            />
            {i < flowNodes.length - 1 ? (
              <span aria-hidden className="absolute top-6 bottom-[-0.9rem] left-[0.9rem] w-px bg-line-strong" />
            ) : null}
            <div className="rounded-xl border border-line bg-bg px-3 py-2">
              <p className="font-mono text-[0.6875rem] text-muted">{n.kind}</p>
              <p className="text-small text-ink">{n.text}</p>
              {n.branch ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {n.branch.map((b) => (
                    <span key={b} className="rounded bg-sunken px-2 py-0.5 font-mono text-[0.6875rem] text-ink">
                      {b}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex h-8 items-center rounded-control border border-line-strong px-3 text-small text-ink">
          Dry run
        </span>
        <span className="inline-flex h-8 items-center rounded-control bg-copper px-3 text-small font-semibold text-on-copper">
          Publish v4
        </span>
      </div>
    </WindowFrame>
  );
}

export function OptOutMockup() {
  return (
    <DeviceFrame label="Chat where a customer replies STOP and is opted out of campaigns and automations">
      <ChatThread
        contact={{ name: "Vikram Nair", meta: "Customer service window · 23h 59m left" }}
        items={[
          { kind: "day", label: "Today" },
          {
            from: "business",
            content: "New arrivals are in. Tap below to see the collection.",
            time: "18:02",
            status: "read",
          },
          { from: "customer", content: "STOP", time: "18:05" },
          { kind: "system", text: "Opted out · campaigns and automations skip this contact" },
        ]}
        composer={false}
      />
    </DeviceFrame>
  );
}

/* ------------------------------ AI agent ------------------------------- */

export function AiAgentChatMockup() {
  return (
    <DeviceFrame label="AI agent answering a question about clinic timings from the knowledge base, then handing a billing complaint to the team">
      <ChatThread
        contact={{ name: "Sunita Kulkarni", meta: "AI agent replying · 02:14" }}
        items={[
          { kind: "day", label: "Today" },
          { from: "customer", content: "Is the clinic open on Sunday? And do I need an appointment for a blood test?", time: "02:13" },
          {
            from: "business",
            content:
              "We are open on Sunday from 8 am to 1 pm. Blood tests are walk-in, no appointment needed. Please come fasting for a sugar test.",
            time: "02:14",
            status: "read",
          },
          { from: "customer", content: "Also I was charged twice for my last visit. I want a refund.", time: "02:15" },
          { kind: "system", text: "Sensitive topic: billing · handed to Front desk" },
          {
            from: "business",
            content: "I have passed this to our front desk team. They will reply when the clinic opens at 8 am.",
            time: "02:15",
            status: "delivered",
          },
        ]}
        composer={false}
      />
    </DeviceFrame>
  );
}

const aiLog: { time: string; action: string; detail: string; tone?: "copper" | "muted" }[] = [
  { time: "02:14", action: "Answered", detail: "From knowledge base · confidence 0.92" },
  { time: "02:15", action: "Handed off", detail: "Matched rule: billing, refund", tone: "copper" },
  { time: "01:47", action: "Answered", detail: "From knowledge base · confidence 0.88" },
  { time: "01:20", action: "Handed off", detail: "Below confidence threshold 0.70", tone: "copper" },
  { time: "00:58", action: "Stopped", detail: "Maximum turns reached (6)", tone: "muted" },
];

export function AiActivityLogMockup() {
  return (
    <WindowFrame
      label="AI agent activity log listing each answer with its confidence, and each handoff with the reason"
      title="AI agent / Activity log"
    >
      <ul className="divide-y divide-line">
        {aiLog.map((r) => (
          <li key={`${r.time}-${r.action}`} className="grid grid-cols-[3rem_1fr] gap-3 py-2.5">
            <span className="font-mono text-[0.6875rem] text-muted">{r.time}</span>
            <div className="min-w-0">
              <p className={cx("text-small font-semibold", r.tone === "copper" ? "text-copper" : "text-ink")}>
                {r.action}
              </p>
              <p className="truncate font-mono text-[0.6875rem] text-muted">{r.detail}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 font-mono text-[0.6875rem] text-muted">Illustrative figures</p>
    </WindowFrame>
  );
}

/* ------------------------------ Commerce ------------------------------- */

function ProductInChat() {
  return (
    <div className="w-52 max-w-full">
      <div className="flex h-24 items-center justify-center rounded-lg bg-sunken" aria-hidden>
        <Package size={28} className="text-muted" />
      </div>
      <p className="mt-2 font-semibold">Handloom cotton saree</p>
      <p className="font-mono text-[0.75rem] text-muted">Indigo · ₹2,450</p>
      <span className="mt-2 block rounded-md bg-copper-soft py-1 text-center text-small font-medium text-copper-ink">
        View cart (2 items)
      </span>
    </div>
  );
}

function PaymentInChat() {
  return (
    <div className="w-52 max-w-full">
      <p className="font-semibold">Order 1187 · ₹4,900</p>
      <p className="text-small text-muted">Pay by UPI, card or net banking</p>
      <span className="mt-2 flex items-center justify-center gap-1.5 rounded-md bg-copper py-1 text-small font-semibold text-on-copper">
        <CreditCard size={14} aria-hidden />
        Pay with Razorpay
      </span>
    </div>
  );
}

export function StoreChatMockup() {
  return (
    <DeviceFrame label="WhatsApp chat where a customer adds a saree to the cart, pays by UPI through a Razorpay link and gets a Shiprocket tracking update">
      <ChatThread
        contact={{ name: "Divya Prakash", meta: "Store order · catalogue synced" }}
        items={[
          { from: "business", content: <ProductInChat />, time: "16:20", status: "read" },
          { from: "customer", content: "Placing the order for both", time: "16:22" },
          { from: "business", content: <PaymentInChat />, time: "16:22", status: "read" },
          { kind: "system", text: "Paid ₹4,900 via UPI · GST invoice sent" },
          {
            from: "business",
            content: "Your order is packed. Shiprocket pickup is booked for tomorrow, and we will send the tracking link once it ships.",
            time: "18:05",
            status: "delivered",
          },
        ]}
        composer={false}
      />
    </DeviceFrame>
  );
}

const orders: { id: string; name: string; amount: string; pay: string; ship: string }[] = [
  { id: "1187", name: "Divya P.", amount: "₹4,900", pay: "UPI · paid", ship: "Pickup booked" },
  { id: "1186", name: "Harish K.", amount: "₹1,250", pay: "COD", ship: "In transit" },
  { id: "1185", name: "Neha S.", amount: "₹2,450", pay: "Card · paid", ship: "Delivered" },
  { id: "1184", name: "Imran A.", amount: "₹780", pay: "Refunded", ship: "Returned" },
];

export function OrdersMockup() {
  return (
    <WindowFrame
      label="Orders list with payment method, shipping status and a GST invoice for each order"
      title="Store / Orders"
      toolbar={<Badge tone="outline">Low stock: 3</Badge>}
      flush
    >
      <ul className="divide-y divide-line">
        {orders.map((o) => (
          <li key={o.id} className="flex items-center gap-3 px-4 py-3">
            <span className="font-mono text-micro text-muted">#{o.id}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-small font-medium text-ink">{o.name}</p>
              <p className="flex flex-wrap gap-x-3 font-mono text-[0.6875rem] text-muted">
                <span>{o.pay}</span>
                <span className="inline-flex items-center gap-1">
                  <Truck size={11} aria-hidden />
                  {o.ship}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-small text-ink tabular-nums">{o.amount}</p>
              <p className="inline-flex items-center gap-1 font-mono text-[0.6875rem] text-muted">
                <FileText size={11} aria-hidden />
                GST invoice
              </p>
            </div>
          </li>
        ))}
      </ul>
    </WindowFrame>
  );
}

/* --------------------------- CRM and analytics ------------------------- */

const timeline: { time: string; text: string }[] = [
  { time: "12 Nov", text: "Clicked a click-to-WhatsApp ad: Winter sale" },
  { time: "12 Nov", text: "Tagged lead, moved to Qualified" },
  { time: "13 Nov", text: "Paid ₹3,200 for order 1150 via UPI" },
  { time: "15 Nov", text: "Read campaign: New arrivals" },
  { time: "18 Nov", text: "Chat resolved by Arjun · 4 min first reply" },
];

export function ContactTimelineMockup() {
  return (
    <WindowFrame
      label="Contact record with tags, custom fields and a timeline of ad clicks, payments, campaigns and chats"
      title="Contacts / Pooja Menon"
    >
      <div className="flex items-center gap-3">
        <Avatar name="Pooja Menon" size={40} />
        <div className="min-w-0">
          <p className="truncate text-small font-semibold text-ink">Pooja Menon</p>
          <p className="truncate font-mono text-[0.6875rem] text-muted">City: Kochi · Lifetime value: ₹8,450</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge>repeat-buyer</Badge>
        <Badge>winter-sale</Badge>
        <Badge tone="copper">Deal: Qualified</Badge>
      </div>
      <ol className="mt-4 space-y-2.5 border-l border-line pl-4">
        {timeline.map((t) => (
          <li key={t.text} className="relative">
            <span aria-hidden className="absolute top-1.5 -left-[1.29rem] size-2 rounded-full bg-line-strong" />
            <p className="font-mono text-[0.6875rem] text-muted">{t.time}</p>
            <p className="text-small text-ink">{t.text}</p>
          </li>
        ))}
      </ol>
    </WindowFrame>
  );
}

const bars = [42, 55, 48, 63, 70, 58, 76];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function AnalyticsMockup() {
  return (
    <WindowFrame
      label="Analytics dashboard with conversations, median first reply time, campaign revenue and a weekly conversations chart"
      title="Analytics / Last 7 days"
      toolbar={<Badge tone="outline">PDF every Monday</Badge>}
    >
      <StatRow
        stats={[
          { label: "Conversations", value: "1,284" },
          { label: "First reply", value: "3m 40s", emphasis: true },
          { label: "Resolved", value: "91%" },
          { label: "Revenue", value: "₹1.9L" },
        ]}
      />
      <div className="mt-5" aria-hidden>
        <div className="flex h-28 items-end gap-2">
          {bars.map((h, i) => (
            <div
              key={days[i]}
              className={cx("flex-1 rounded-t-md", i === bars.length - 1 ? "bg-copper" : "bg-line-strong")}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex gap-2">
          {days.map((d) => (
            <span key={d} className="flex-1 text-center font-mono text-[0.6875rem] text-muted">
              {d}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-3 font-mono text-[0.6875rem] text-muted">Illustrative figures</p>
    </WindowFrame>
  );
}

const pipeline: { stage: string; deals: { name: string; value: string }[] }[] = [
  { stage: "New", deals: [{ name: "Nitin Sharma", value: "₹45,000" }, { name: "R. Pillai", value: "₹12,000" }] },
  { stage: "Qualified", deals: [{ name: "Pooja Menon", value: "₹8,450" }] },
  { stage: "Won", deals: [{ name: "Asha Gupta", value: "₹62,000" }] },
];

export function PipelineMockup() {
  return (
    <WindowFrame
      label="Sales pipeline board with deals in New, Qualified and Won columns"
      title="Pipelines / Bulk orders"
    >
      <div className="grid grid-cols-3 gap-2">
        {pipeline.map((col) => (
          <div key={col.stage} className="min-w-0 rounded-xl bg-sunken p-2">
            <p className="px-1 font-mono text-[0.6875rem] text-muted">
              {col.stage} · {col.deals.length}
            </p>
            <ul className="mt-2 space-y-2">
              {col.deals.map((d) => (
                <li key={d.name} className="rounded-lg border border-line bg-surface px-2 py-1.5">
                  <p className="truncate text-[0.75rem] font-medium text-ink">{d.name}</p>
                  <p className="font-mono text-[0.6875rem] text-muted">{d.value}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </WindowFrame>
  );
}

/** The main mock-up for each pillar, used on /features. */
export const pillarMockups = {
  "team-inbox": InboxMockup,
  campaigns: CampaignReportMockup,
  automation: FlowBuilderMockup,
  "ai-agent": AiAgentChatMockup,
  commerce: StoreChatMockup,
  "crm-analytics": AnalyticsMockup,
} as const;
