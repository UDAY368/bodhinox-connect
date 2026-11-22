import {
  ArrowLeft,
  CalendarClock,
  CheckCheck,
  ChevronDown,
  Copy,
  Download,
  Droplets,
  ExternalLink,
  Eye,
  Flower2,
  IndianRupee,
  Library,
  MessageCircleReply,
  MousePointerClick,
  Plus,
  Repeat2,
  Send,
  ShoppingBag,
  Sparkles,
  Target,
  Users,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/components/ui/cx";
import { AppShell } from "../AppShell";
import { BarChart } from "../charts";
import { PBubble, PButtons, PhoneFrame, PSystem } from "../Phone";
import { Chips, MBadge, MButton, MCard, MCardHeader, MetricCard, PageTitle, SearchField, Segmented } from "../primitives";

/* ----------------------------------------------------------- shared bits */

const campaignTabs = ["Broadcasts", "Templates", "Ads", "Forms"];

/** Section tabs + "Campaigns" title used on every Campaigns screen. */
export function CampaignsHeader({ tab, sub, right }: { tab: number; sub: string; right?: ReactNode }) {
  return (
    <>
      <Segmented items={campaignTabs} active={tab} className="self-start" />
      <PageTitle title="Campaigns" sub={sub} right={right} />
    </>
  );
}

/** The CRM's number health bar (number-health-bar.tsx). */
function HealthBar() {
  return (
    <div className="flex items-center gap-6 rounded-xl bg-muted px-4 py-2.5 text-[13px]">
      <span className="flex items-center gap-2">
        <span className="text-muted-foreground">Quality</span>
        <span className="rounded-full bg-success-soft px-2.5 py-0.5 text-[12px] font-medium text-success">High</span>
      </span>
      <span>
        <span className="text-muted-foreground">Daily limit </span>
        <span className="font-medium text-foreground">10,000 people/day</span>
      </span>
      <span>
        <span className="text-muted-foreground">Left today </span>
        <span className="font-medium text-foreground">≈ 6,180</span>
      </span>
      <span className="ml-auto flex items-center gap-1.5 text-[12px] text-muted-foreground">
        <span className="size-1.5 rounded-full bg-success" /> +91 98450 21734 · Connected
      </span>
    </div>
  );
}

type BStatus = "Sent" | "Sending" | "Scheduled" | "Draft" | "Paused";

const statusTone: Record<BStatus, "success" | "primary" | "warning" | "neutral" | "danger"> = {
  Sent: "success",
  Sending: "primary",
  Scheduled: "warning",
  Draft: "neutral",
  Paused: "danger",
};

type BRow = {
  name: string;
  template: string;
  when: string;
  status: BStatus;
  audience: string;
  sent: string;
  delivered: string;
  read: string;
  replied: string;
  orders: string;
  revenue: string;
  progress: number;
};

const broadcastRows: BRow[] = [
  {
    name: "Cart reminder · Nov 22",
    template: "cart_reminder",
    when: "Today, 11:30 am",
    status: "Sending",
    audience: "2,400",
    sent: "1,512",
    delivered: "1,488",
    read: "902",
    replied: "77",
    orders: "21",
    revenue: "₹18,480",
    progress: 63,
  },
  {
    name: "Weekend consult slots",
    template: "booking_reminder",
    when: "Nov 23, 10:00 am",
    status: "Scheduled",
    audience: "860",
    sent: "—",
    delivered: "—",
    read: "—",
    replied: "—",
    orders: "—",
    revenue: "—",
    progress: 0,
  },
  {
    name: "Winter hair care tips",
    template: "hair_care_tips",
    when: "Nov 15, 6:00 pm",
    status: "Sent",
    audience: "3,150",
    sent: "3,148",
    delivered: "3,102",
    read: "2,436",
    replied: "284",
    orders: "63",
    revenue: "₹34,020",
    progress: 100,
  },
  {
    name: "Restock: Ashwagandha",
    template: "back_in_stock",
    when: "Nov 8, 9:00 am",
    status: "Sent",
    audience: "1,240",
    sent: "1,240",
    delivered: "1,228",
    read: "1,012",
    replied: "96",
    orders: "71",
    revenue: "₹49,630",
    progress: 100,
  },
  {
    name: "Diwali glow sale",
    template: "festive_offer_carousel",
    when: "Nov 1, 7:00 pm",
    status: "Sent",
    audience: "4,820",
    sent: "4,812",
    delivered: "4,760",
    read: "3,905",
    replied: "611",
    orders: "148",
    revenue: "₹1,84,300",
    progress: 100,
  },
  {
    name: "We miss you · 60 days",
    template: "we_miss_you",
    when: "Oct 28, 5:00 pm",
    status: "Paused",
    audience: "1,800",
    sent: "940",
    delivered: "921",
    read: "688",
    replied: "41",
    orders: "12",
    revenue: "₹9,870",
    progress: 52,
  },
  {
    name: "Kumkumadi launch offer",
    template: "product_launch_lto",
    when: "Edited Nov 20",
    status: "Draft",
    audience: "5,100",
    sent: "—",
    delivered: "—",
    read: "—",
    replied: "—",
    orders: "—",
    revenue: "—",
    progress: 0,
  },
];

const bCols = "grid-cols-[minmax(0,1fr)_82px_62px_56px_70px_52px_60px_52px_80px_92px]";

/** Campaigns › Broadcasts list with the number health bar and status chips. */
export function BroadcastsScreen({ height = 760 }: { height?: number }) {
  return (
    <AppShell active="campaigns" height={height} crumbs={["Campaigns", "Broadcasts"]}>
      <div className="flex flex-col gap-4">
        <CampaignsHeader
          tab={0}
          sub="Send one message to many people at once."
          right={
            <span className="flex items-center gap-2">
              <MButton variant="outline" icon={Sparkles}>
                Plan with AI
              </MButton>
              <MButton icon={Plus}>New Broadcast</MButton>
            </span>
          }
        />
        <HealthBar />
        <div className="flex items-center gap-3">
          <Chips
            items={[
              { label: "All", count: 24 },
              { label: "Draft", count: 2 },
              { label: "Scheduled", count: 1 },
              { label: "Sending", count: 1 },
              { label: "Sent", count: 19 },
              { label: "Paused", count: 1 },
            ]}
          />
          <SearchField placeholder="Search by name…" className="ml-auto w-[220px]" />
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <div
            className={cx(
              "grid items-center gap-3 bg-card-2 px-4 py-2.5 text-[11px] font-semibold tracking-[0.06em] text-muted-foreground uppercase",
              bCols,
            )}
          >
            <span>Name</span>
            <span>Status</span>
            <span className="text-right">Audience</span>
            <span className="text-right">Sent</span>
            <span className="text-right">Delivered</span>
            <span className="text-right">Read</span>
            <span className="text-right">Replied</span>
            <span className="text-right">Orders</span>
            <span className="text-right">Revenue</span>
            <span>Progress</span>
          </div>
          {broadcastRows.map((r) => (
            <div key={r.name} className={cx("grid items-center gap-3 border-t border-border px-4 py-2 text-[12.5px] tabular-nums", bCols)}>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-foreground">{r.name}</p>
                <p className="mt-0.5 truncate text-[11.5px] text-muted-foreground">
                  <span className="font-mono">{r.template}</span> · {r.when}
                </p>
              </div>
              <span>
                <MBadge tone={statusTone[r.status]}>
                  {r.status === "Sending" ? <span className="size-1.5 rounded-full bg-primary" /> : null}
                  {r.status}
                </MBadge>
              </span>
              <span className="text-right text-foreground">{r.audience}</span>
              <span className="text-right text-muted-foreground">{r.sent}</span>
              <span className="text-right text-muted-foreground">{r.delivered}</span>
              <span className="text-right text-muted-foreground">{r.read}</span>
              <span className="text-right text-muted-foreground">{r.replied}</span>
              <span className="text-right font-medium text-foreground">{r.orders}</span>
              <span className="text-right font-semibold text-foreground">{r.revenue}</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <span
                    className={cx("block h-full rounded-full", r.status === "Paused" ? "bg-destructive" : r.status === "Sent" ? "bg-success" : "bg-primary")}
                    style={{ width: `${r.progress}%` }}
                  />
                </span>
                <span className="w-8 text-right text-[11px] text-muted-foreground">{r.progress}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

/* --------------------------------------------------------------- report */

const funnel = [
  { label: "Delivered", value: 4760, pct: "98.9%", of: "of sent", icon: CheckCheck },
  { label: "Read", value: 3905, pct: "82.0%", of: "of delivered", icon: Eye },
  { label: "Replied", value: 611, pct: "15.6%", of: "of read", icon: MessageCircleReply },
  { label: "Clicked", value: 1126, pct: "23.4%", of: "of sent", icon: MousePointerClick },
];

/** Focused crop: retarget the people who read but did not reply (~600 design width). */
export function RetargetCard({ className, wide = false, compact = false }: { className?: string; wide?: boolean; compact?: boolean }) {
  const options = [
    { label: "Read but did not reply", count: "3,294", sub: "Saw the offer, stayed quiet", on: true },
    { label: "Clicked but did not order", count: "978", sub: "Opened the shop link", on: false },
    { label: "Delivered, not read", count: "855", sub: "Try a different time", on: false },
  ];
  return (
    <MCard className={cx(wide ? "w-full" : "w-[600px]", "p-5", className)}>
      <div className="flex items-start gap-3">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Target className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold tracking-[-0.01em] text-foreground">Retarget people who read but did not reply</p>
          <p className="mt-0.5 text-[12px] text-muted-foreground">From “Diwali glow sale”. Pick who gets a follow-up template.</p>
        </div>
      </div>
      <div className={cx("flex flex-col gap-2", compact ? "mt-3" : "mt-4")}>
        {options.slice(0, compact ? 2 : 3).map((o) => (
          <div
            key={o.label}
            className={cx(
              "flex items-center gap-3 rounded-xl border px-3.5 py-2.5",
              o.on ? "border-primary bg-primary-soft" : "border-border bg-card",
            )}
          >
            <span className={cx("inline-flex size-4 items-center justify-center rounded-full border-2", o.on ? "border-primary" : "border-input")}>
              {o.on ? <span className="size-1.5 rounded-full bg-primary" /> : null}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium text-foreground">{o.label}</span>
              <span className="block text-[11.5px] text-muted-foreground">{o.sub}</span>
            </span>
            <span className="text-[14px] font-semibold text-foreground tabular-nums">{o.count}</span>
            <span className="text-[11px] text-muted-foreground">people</span>
          </div>
        ))}
      </div>
      <div className={cx("flex items-center gap-3", compact ? "mt-3" : "mt-4")}>
        <span className="flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1.5 text-[12px] text-foreground">
          <Send className="size-3.5 text-muted-foreground" />
          <span className="font-mono">last_chance_glow</span>
          <ChevronDown className="size-3 text-muted-foreground" />
        </span>
        {compact ? null : <span className="text-[11.5px] text-muted-foreground">≈ ₹2,850 · fits today’s limit</span>}
        <MButton icon={Repeat2} className="ml-auto">
          Retarget 3,294 people
        </MButton>
      </div>
    </MCard>
  );
}

const stats: { title: string; value: string; sub: string; icon: LucideIcon }[] = [
  { title: "Total Recipients", value: "4,820", sub: "Bought in last 90 days", icon: Users },
  { title: "Sent", value: "4,812", sub: "99.8% of audience", icon: Send },
  { title: "Delivered", value: "4,760", sub: "98.9% of sent", icon: CheckCheck },
  { title: "Read", value: "3,905", sub: "82.0% of delivered", icon: Eye },
  { title: "Replied", value: "611", sub: "15.6% of read", icon: MessageCircleReply },
  { title: "Failed", value: "8", sub: "Not on WhatsApp", icon: XCircle },
];

/** A single broadcast's report: funnel, clicks, orders and revenue, retarget. */
export function BroadcastReportScreen({ height = 880 }: { height?: number }) {
  const top = funnel[0].value;
  return (
    <AppShell active="campaigns" height={height} crumbs={["Campaigns", "Broadcasts", "Diwali glow sale"]}>
      <div className="flex flex-col gap-3.5">
        <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-muted-foreground">
          <ArrowLeft className="size-3.5" /> Back to Broadcasts
        </span>
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-[26px] leading-tight font-bold tracking-[-0.025em] text-foreground">Diwali glow sale</h3>
              <MBadge tone="success">Sent</MBadge>
            </div>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Template: <span className="font-mono text-foreground">festive_offer_carousel</span> · Sent Nov 1, 7:00 pm · Cost ₹4,180
            </p>
          </div>
          <span className="flex items-center gap-2">
            <MButton variant="outline" icon={Copy}>
              Duplicate
            </MButton>
            <MButton variant="outline" icon={Download}>
              Export CSV
            </MButton>
          </span>
        </div>

        <div className="grid grid-cols-6 gap-3">
          {stats.map((s) => (
            <MetricCard key={s.title} title={s.title} value={s.value} icon={s.icon} subtitle={s.sub} className="p-3.5" />
          ))}
        </div>

        <div className="grid grid-cols-[1.25fr_1fr] gap-3">
          <MCard>
            <MCardHeader title="Funnel" sub="Of 4,812 messages sent" right={<MBadge tone="outline">Updated 2 min ago</MBadge>} />
            <div className="flex flex-col gap-2.5 px-4 pt-4 pb-4">
              {funnel.map((f, i) => (
                <div key={f.label} className="flex items-center gap-3">
                  <span className="flex w-[92px] items-center gap-2 text-[12.5px] font-medium text-foreground">
                    <f.icon className="size-3.5 text-muted-foreground" />
                    {f.label}
                  </span>
                  <span className="relative h-7 flex-1 overflow-hidden rounded-lg bg-muted">
                    <span
                      className="absolute inset-y-0 left-0 rounded-lg"
                      style={{ width: `${(f.value / top) * 100}%`, background: `var(--chart-${i + 1})`, opacity: 0.28 }}
                    />
                    <span className="absolute inset-y-0 left-2.5 flex items-center text-[12px] font-semibold text-foreground tabular-nums">
                      {f.value.toLocaleString("en-IN")}
                    </span>
                  </span>
                  <span className="w-[96px] text-right text-[12px] leading-tight">
                    <span className="block font-semibold text-foreground tabular-nums">{f.pct}</span>
                    <span className="block text-[10.5px] text-muted-foreground">{f.of}</span>
                  </span>
                </div>
              ))}
              <div className="mt-1 flex items-center gap-3 rounded-xl border border-border bg-card-2 px-3 py-2.5 text-[12px]">
                <MousePointerClick className="size-4 text-primary" />
                <span className="text-foreground">
                  <span className="font-semibold">1,126 unique clickers</span> · 1,126 of 4,812 recipients clicked the link
                </span>
                <span className="ml-auto flex items-center gap-1 text-muted-foreground">
                  <ExternalLink className="size-3" /> prakriti.shop/s/naturals
                </span>
              </div>
            </div>
          </MCard>

          <MCard>
            <MCardHeader title="Orders & revenue" sub="Attributed within 7 days of reading" right={<MBadge tone="success">44× return</MBadge>} />
            <div className="grid grid-cols-3 gap-3 px-4 pt-4">
              <div>
                <p className="text-[11.5px] text-muted-foreground">Revenue</p>
                <p className="text-[22px] leading-tight font-bold tracking-tight text-foreground tabular-nums">₹1,84,300</p>
              </div>
              <div>
                <p className="text-[11.5px] text-muted-foreground">Orders</p>
                <p className="text-[22px] leading-tight font-bold tracking-tight text-foreground tabular-nums">148</p>
              </div>
              <div>
                <p className="text-[11.5px] text-muted-foreground">Avg. order</p>
                <p className="text-[22px] leading-tight font-bold tracking-tight text-foreground tabular-nums">₹1,245</p>
              </div>
            </div>
            <div className="px-4 pt-4 pb-4">
              <p className="mb-1.5 text-[11px] font-medium text-muted-foreground">Orders by hour after sending</p>
              <BarChart
                width={400}
                height={120}
                values={[38, 31, 19, 14, 11, 8, 7, 6, 5, 4, 3, 2]}
                labels={["1h", "", "", "4h", "", "", "8h", "", "", "", "", "12h"]}
                highlight={0}
              />
            </div>
          </MCard>
        </div>

        <div className="grid grid-cols-[1fr_1fr] gap-3">
          <RetargetCard wide compact className="p-4" />
          <MCard className="overflow-hidden">
            <MCardHeader title="Recipients (4,820)" right={<MBadge tone="outline">All statuses</MBadge>} />
            <ul className="mt-3">
              {[
                { n: "Divya Nair", p: "+91 98•••• 2210", s: "Ordered", t: "₹1,170", tone: "success" as const },
                { n: "Kavya Reddy", p: "+91 99•••• 8104", s: "Replied", t: "7:14 pm", tone: "primary" as const },
                { n: "Rahul Verma", p: "+91 97•••• 3356", s: "Read", t: "7:09 pm", tone: "neutral" as const },
                { n: "Sanjay Gupta", p: "+91 90•••• 6672", s: "Delivered", t: "7:02 pm", tone: "outline" as const },
                { n: "Ishita Bose", p: "+91 81•••• 0459", s: "Clicked", t: "7:21 pm", tone: "primary" as const },
              ].map((r) => (
                <li key={r.n} className="flex items-center gap-3 border-t border-border px-4 py-2 text-[12.5px]">
                  <span className="flex-1 font-medium text-foreground">{r.n}</span>
                  <span className="text-muted-foreground tabular-nums">{r.p}</span>
                  <MBadge tone={r.tone}>{r.s}</MBadge>
                  <span className="w-14 text-right text-muted-foreground tabular-nums">{r.t}</span>
                </li>
              ))}
            </ul>
          </MCard>
        </div>
      </div>
    </AppShell>
  );
}

/* ------------------------------------------------------------- templates */

const carouselCards = [
  { name: "Kumkumadi Face Oil", note: "Saffron glow for dry skin", price: "₹1,060", was: "₹1,250", off: "−15%", icon: Sparkles, tone: "bg-[color-mix(in_oklab,var(--chart-5)_16%,transparent)] text-chart-5" },
  { name: "Bhringraj Hair Oil", note: "Less hair fall in 6 weeks", price: "₹459", was: "₹540", off: "−15%", icon: Droplets, tone: "bg-[color-mix(in_oklab,var(--chart-4)_20%,transparent)] text-warning" },
  { name: "Rose Water Toner", note: "Steam-distilled Kannauj rose", price: "₹329", was: "₹390", off: "−16%", icon: Flower2, tone: "bg-[color-mix(in_oklab,var(--ig)_14%,transparent)] text-ig" },
];

/** The carousel template as the customer sees it: body text, then swipeable cards. */
function CarouselMessage({ imageH = 104 }: { imageH?: number }) {
  return (
    <>
      <PBubble from="business" time="7:00 pm">
        🪔 <span className="font-semibold">Diwali glow sale</span>
        <br />
        Hi Meera, our bestsellers are up to 25% off till Sunday. Swipe to shop 👉
      </PBubble>
      <div className="-mr-3 flex gap-2 overflow-hidden">
        {carouselCards.map((c) => (
          <div key={c.name} className="w-[196px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card">
            <div className={cx("relative flex items-center justify-center", c.tone)} style={{ height: imageH }}>
              <c.icon className="size-9" strokeWidth={1.5} />
              <span className="absolute top-2 left-2 rounded-full bg-card px-1.5 py-0.5 text-[9.5px] font-bold text-destructive">{c.off}</span>
            </div>
            <div className="px-2.5 py-2">
              <p className="text-[12px] font-semibold text-foreground">{c.name}</p>
              <p className="text-[10.5px] text-muted-foreground">{c.note}</p>
              <p className="mt-0.5 text-[11.5px] font-semibold text-foreground">
                {c.price} <span className="font-normal text-muted-foreground line-through">{c.was}</span>
              </p>
            </div>
            <div className="border-t border-border py-1.5 text-center text-[11.5px] font-medium text-primary">Buy now</div>
            <div className="flex items-center justify-center gap-1 border-t border-border py-1.5 text-[11.5px] font-medium text-primary">
              <ExternalLink className="size-3" /> View details
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/** Focused crop: a phone showing the carousel template and the reply it gets. 300 x 560 design size. */
export function TemplatePhone({ className, height = 560 }: { className?: string; height?: number }) {
  return (
    <PhoneFrame title="Prakriti Naturals" subtitle="Business account" height={height} className={className}>
      <PSystem>Today</PSystem>
      <CarouselMessage />
      <PBubble from="customer" time="7:03 pm">
        Buy now · Kumkumadi Face Oil
      </PBubble>
      <PBubble from="business" time="7:03 pm">
        Lovely choice 🌿 Pay ₹1,060 securely here. Ships in 24 hours.
      </PBubble>
      <PButtons labels={["Pay ₹1,060"]} link />
    </PhoneFrame>
  );
}

type Tpl = {
  name: string;
  category: "Marketing" | "Utility" | "Authentication";
  kind: string;
  status: "Approved" | "Pending" | "Rejected";
  body: string;
  meta: string;
  icon: LucideIcon;
};

const templates: Tpl[] = [
  { name: "festive_offer_carousel", category: "Marketing", kind: "Carousel · 3 cards", status: "Approved", body: "🪔 Diwali glow sale. Hi {{1}}, our bestsellers are up to 25% off…", meta: "Used in 2 broadcasts", icon: Library },
  { name: "order_shipped", category: "Utility", kind: "Standard", status: "Approved", body: "Hi {{1}}, order {{2}} is on its way 🚚 Track it here: {{3}}", meta: "Sent 1,904 times", icon: ShoppingBag },
  { name: "product_launch_lto", category: "Marketing", kind: "Limited-time offer", status: "Pending", body: "New: Kumkumadi Night Serum. Launch price ₹899, ends in {{1}}…", meta: "Submitted 2h ago", icon: CalendarClock },
  { name: "login_code", category: "Authentication", kind: "One-time password", status: "Approved", body: "{{1}} is your Prakriti verification code. Do not share it.", meta: "Copy code button", icon: Copy },
  { name: "booking_reminder", category: "Utility", kind: "Standard", status: "Approved", body: "Your {{1}} with {{2}} is tomorrow at {{3}}. Reply 1 to confirm…", meta: "Sent 486 times", icon: CalendarClock },
  { name: "flash_sale_50", category: "Marketing", kind: "Standard", status: "Rejected", body: "FLASH SALE!!! 50% OFF EVERYTHING!!! Buy now before…", meta: "Promotional tone · edit and resubmit", icon: IndianRupee },
];

const tplStatusTone = { Approved: "success", Pending: "warning", Rejected: "danger" } as const;

/** Campaigns › Templates: library grid and the selected carousel template on a phone. */
export function TemplatesScreen({ height = 760 }: { height?: number }) {
  return (
    <AppShell active="campaigns" height={height} crumbs={["Campaigns", "Templates"]}>
      <div className="flex h-full flex-col gap-4">
        <CampaignsHeader
          tab={1}
          sub="Message templates WhatsApp has approved for your number."
          right={
            <span className="flex items-center gap-2">
              <MButton variant="outline" icon={Library}>
                Template library
              </MButton>
              <MButton variant="outline" icon={Sparkles}>
                Write with AI
              </MButton>
              <MButton icon={Plus}>New template</MButton>
            </span>
          }
        />
        <div className="flex min-h-0 flex-1 gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex items-center gap-2">
              <Chips
                items={[
                  { label: "All", count: 18 },
                  { label: "Marketing", count: 11 },
                  { label: "Utility", count: 6 },
                  { label: "Authentication", count: 1 },
                ]}
              />
              <SearchField placeholder="Search templates" className="ml-auto w-[170px]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((t, i) => (
                <div
                  key={t.name}
                  className={cx(
                    "flex flex-col gap-2 rounded-xl border bg-card p-3.5",
                    i === 0 ? "border-primary shadow-[0_0_0_3px_var(--primary-soft)]" : "border-border",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <t.icon className="size-3.5" />
                    </span>
                    <span className="min-w-0 flex-1 truncate font-mono text-[12px] font-semibold text-foreground">{t.name}</span>
                    <MBadge tone={tplStatusTone[t.status]}>{t.status}</MBadge>
                  </div>
                  <p className="line-clamp-2 h-[34px] text-[12px] leading-snug text-muted-foreground">{t.body}</p>
                  <div className="flex items-center gap-1.5">
                    <MBadge tone={t.category === "Marketing" ? "primary" : t.category === "Utility" ? "neutral" : "outline"}>{t.category}</MBadge>
                    <span className="truncate text-[11px] text-muted-foreground">
                      {t.kind} · {t.meta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-[384px] shrink-0 flex-col overflow-hidden rounded-xl border border-border">
            <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-[13px] font-semibold text-foreground">festive_offer_carousel</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
                  Marketing · Carousel · English
                </p>
              </div>
              <MBadge tone="success">Approved</MBadge>
              <MBadge tone="success" className="bg-transparent ring-1 ring-success/30">
                Quality High
              </MBadge>
            </div>
            <div className="phone-stage flex min-h-0 flex-1 items-start justify-center overflow-hidden pt-5">
              <PhoneFrame title="Prakriti Naturals" subtitle="Business account" height={520}>
                <PSystem>Preview</PSystem>
                <CarouselMessage imageH={92} />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
