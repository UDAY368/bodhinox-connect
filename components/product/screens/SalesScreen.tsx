import {
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  Copy,
  CreditCard,
  ExternalLink,
  FileText,
  IndianRupee,
  Link2,
  MapPin,
  MoreHorizontal,
  Package,
  Plus,
  RotateCcw,
  Target,
  Timer,
  Trophy,
  Truck,
} from "lucide-react";
import { cx } from "@/components/ui/cx";
import { demoOrders, demoPipeline, type DemoOrder } from "@/content/demo";
import { AppShell } from "../AppShell";
import { Chips, IgIcon, MAvatar, MBadge, MButton, MCard, MetricCard, PageTitle, SearchField, Segmented, WaIcon } from "../primitives";

/*
 * Sales: Pipelines (kanban), Orders (list + order drawer with Shiprocket
 * shipment) and Razorpay payment links, as on the live CRM
 * (commerce/orders/*, commerce/payments/*).
 */

const salesTabs = ["Pipelines", "Appointments", "Orders", "Payments"];

/* ------------------------------------------------------------------ */
/* Pipeline                                                            */
/* ------------------------------------------------------------------ */

type Deal = {
  title: string;
  contact: string;
  value: string;
  owner: string;
  tone: 1 | 2 | 3 | 4 | 5;
  channel: "whatsapp" | "instagram";
  age: string;
  tag?: string;
};

const deals: Record<string, Deal[]> = {
  "New Lead": [
    { title: "Spa refill order, 40 L oils", contact: "Tattva Spa, Indiranagar", value: "₹48,000", owner: "KS", tone: 2, channel: "whatsapp", age: "2h", tag: "Wholesale" },
    { title: "Corporate Diwali hampers", contact: "Nisha Agarwal", value: "₹36,500", owner: "AR", tone: 1, channel: "instagram", age: "5h", tag: "Gifting" },
    { title: "Salon shelf stockist", contact: "Glow Studio, HSR", value: "₹22,000", owner: "PD", tone: 3, channel: "whatsapp", age: "1d" },
  ],
  Qualified: [
    { title: "Yoga retreat welcome kits", contact: "Shanti Ashram, Mysuru", value: "₹64,800", owner: "KS", tone: 2, channel: "whatsapp", age: "2d", tag: "Bulk" },
    { title: "Clinic monthly supply", contact: "Dr. Sameer Kulkarni", value: "₹41,200", owner: "AR", tone: 1, channel: "whatsapp", age: "3d" },
    { title: "Wedding favours, 250 pcs", contact: "Riya Malhotra", value: "₹33,750", owner: "PD", tone: 3, channel: "instagram", age: "4d", tag: "Gifting" },
  ],
  "Proposal Sent": [
    { title: "Hotel amenity kits", contact: "Kaveri Residency", value: "₹72,000", owner: "KS", tone: 2, channel: "whatsapp", age: "1d", tag: "Quote v2" },
    { title: "Pharmacy chain trial", contact: "MedPlus Koramangala", value: "₹38,400", owner: "AR", tone: 1, channel: "whatsapp", age: "6d" },
  ],
  Negotiation: [
    { title: "Co-branded face oil", contact: "Aaranya Wellness", value: "₹55,000", owner: "AR", tone: 1, channel: "whatsapp", age: "3d", tag: "Custom" },
    { title: "Gym member offers", contact: "FitNation JP Nagar", value: "₹24,600", owner: "PD", tone: 3, channel: "instagram", age: "8d" },
  ],
  Won: [{ title: "Diwali gifting, 120 boxes", contact: "Infra Systems Pvt Ltd", value: "₹31,200", owner: "KS", tone: 2, channel: "whatsapp", age: "Today", tag: "Paid" }],
};

const stageColor = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function DealCard({ d, won }: { d: Deal; won?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-[0_1px_2px_#0000000a]">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[12.5px] leading-snug font-semibold text-foreground">{d.title}</p>
        <MoreHorizontal className="size-3.5 shrink-0 text-muted-foreground" />
      </div>
      <p className="mt-0.5 flex items-center gap-1 truncate text-[11.5px] text-muted-foreground">
        {d.channel === "whatsapp" ? <WaIcon className="size-3 text-wa" /> : <IgIcon className="size-3 text-ig" />}
        <span className="truncate">{d.contact}</span>
      </p>
      <div className="mt-2.5 flex items-center gap-1.5">
        <span className={cx("text-[13px] font-semibold tabular-nums", won ? "text-success" : "text-foreground")}>{d.value}</span>
        {d.tag ? <MBadge tone={won ? "success" : "outline"}>{d.tag}</MBadge> : null}
        <span className="ml-auto flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
          <Clock className="size-3" />
          {d.age}
          <MAvatar initials={d.owner} tone={d.tone} size={20} />
        </span>
      </div>
    </div>
  );
}

/** Sales › Pipelines: the deal board. */
export function PipelineScreen({ height = 820 }: { height?: number }) {
  return (
    <AppShell active="sales" crumbs={["Sales", "Pipelines"]} height={height}>
      <div className="flex h-full flex-col gap-4">
        <Segmented items={salesTabs} active={0} />
        <PageTitle
          title="Pipelines"
          sub="Every deal from the first message to won, with the chat one click away."
          right={
            <span className="flex items-center gap-2">
              <span className="flex h-8 items-center gap-2 rounded-full border border-border bg-card px-3.5 text-[13px] font-medium text-foreground">
                Wholesale & gifting <ChevronDown className="size-3.5 text-muted-foreground" />
              </span>
              <MButton icon={Plus}>New deal</MButton>
            </span>
          }
        />
        <div className="grid grid-cols-4 gap-3">
          <MetricCard title="Open value" value="₹4,36,250" icon={IndianRupee} subtitle="12 open deals" />
          <MetricCard title="Won this month" value="₹1,12,400" icon={Trophy} delta={{ sign: 1, label: "+18% vs October" }} />
          <MetricCard title="Win rate" value="31%" icon={Target} delta={{ sign: 1, label: "+4 pts vs October" }} />
          <MetricCard title="Average time to win" value="9 days" icon={Timer} subtitle="Fastest stage: Qualified" />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-5 gap-3">
          {demoPipeline.map((s, i) => {
            const list = deals[s.stage] ?? [];
            return (
              <div key={s.stage} className="flex min-h-0 flex-col rounded-xl bg-muted/60 p-2">
                <div className="flex items-center gap-2 px-1.5 pt-1 pb-2">
                  <span className="size-2 rounded-full" style={{ background: stageColor[i] }} />
                  <span className="text-[12.5px] font-semibold text-foreground">{s.stage}</span>
                  <span className="text-[11.5px] text-muted-foreground tabular-nums">{s.deals}</span>
                  <span className="ml-auto text-[11.5px] font-medium text-muted-foreground tabular-nums">{s.value}</span>
                </div>
                <div className="flex flex-col gap-2 overflow-hidden">
                  {list.map((d) => (
                    <DealCard key={d.title} d={d} won={s.stage === "Won"} />
                  ))}
                  <span className="flex h-8 items-center justify-center gap-1 rounded-lg border border-dashed border-border text-[11.5px] font-medium text-muted-foreground">
                    <Plus className="size-3" /> Add deal
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

/* ------------------------------------------------------------------ */
/* Orders                                                              */
/* ------------------------------------------------------------------ */

const moreOrders: DemoOrder[] = [
  { id: "#PN-2036", customer: "Aditi Joshi", items: "Diwali Glow Kit ×1", total: "₹2,190", payment: "Paid", status: "Shipped", source: "Store", time: "Yesterday" },
  { id: "#PN-2035", customer: "Mohammed Irfan", items: "Bhringraj Hair Oil ×1", total: "₹540", payment: "Refunded", status: "Delivered", source: "WhatsApp", time: "Nov 20" },
  { id: "#PN-2034", customer: "Lakshmi Pillai", items: "Ubtan Face Pack ×2", total: "₹900", payment: "COD", status: "Delivered", source: "Instagram", time: "Nov 20" },
];

const allOrders = [...demoOrders, ...moreOrders];

const orderStatusTone = { New: "primary", Packed: "warning", Shipped: "neutral", Delivered: "success" } as const;
const paymentTone = { Paid: "success", COD: "neutral", Pending: "warning", Refunded: "danger" } as const;

function SourceTag({ source }: { source: DemoOrder["source"] }) {
  if (source === "WhatsApp")
    return (
      <span className="flex items-center gap-1.5 text-[12px] text-foreground">
        <WaIcon className="size-3.5 text-wa" /> WhatsApp
      </span>
    );
  if (source === "Instagram")
    return (
      <span className="flex items-center gap-1.5 text-[12px] text-foreground">
        <IgIcon className="size-3.5 text-ig" /> Instagram
      </span>
    );
  return (
    <span className="flex items-center gap-1.5 text-[12px] text-foreground">
      <Package className="size-3.5 text-muted-foreground" /> Store
    </span>
  );
}

const trackSteps = [
  { label: "Order placed · Paid on delivery", time: "Nov 21, 6:12 pm", done: true },
  { label: "Packed · Label printed", time: "Nov 21, 8:40 pm", done: true },
  { label: "Picked up by Delhivery", time: "Nov 22, 10:05 am", done: true },
  { label: "In transit · Bengaluru hub", time: "Nov 22, 4:30 pm", done: true, now: true },
  { label: "Out for delivery", time: "Expected Nov 24", done: false },
];

function OrderDetail() {
  return (
    <div className="flex w-[318px] shrink-0 flex-col gap-3 overflow-hidden rounded-xl border border-border bg-card-2/50 p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[15px] font-semibold text-foreground">#PN-2039</p>
          <p className="text-[11.5px] text-muted-foreground">Nov 21, 6:12 pm · from Instagram</p>
        </div>
        <span className="flex gap-1.5">
          <MBadge tone="neutral">Shipped</MBadge>
          <MBadge tone="neutral">COD</MBadge>
        </span>
      </div>
      <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-2.5">
        <MAvatar initials="RV" tone={4} size={32} channel="instagram" />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[12.5px] font-semibold text-foreground">Rahul Verma</p>
          <p className="flex items-center gap-1 truncate text-[11px] text-muted-foreground">
            <MapPin className="size-3" /> Whitefield, Bengaluru 560066
          </p>
        </div>
        <span className="text-[11.5px] font-medium text-primary">Open chat</span>
      </div>
      <div className="rounded-xl border border-border bg-card p-3 text-[12px]">
        <div className="flex justify-between">
          <span className="text-foreground">Ashwagandha Capsules ×1</span>
          <span className="tabular-nums">₹699</span>
        </div>
        <div className="mt-1 flex justify-between text-muted-foreground">
          <span>Shipping · Standard</span>
          <span className="tabular-nums">₹0</span>
        </div>
        <div className="mt-1 flex justify-between text-muted-foreground">
          <span>GST included (12%)</span>
          <span className="tabular-nums">₹75</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-border pt-2 font-semibold text-foreground">
          <span>Total due on delivery</span>
          <span className="tabular-nums">₹699</span>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-3">
        <div className="flex items-center gap-2 text-[12.5px] font-semibold text-foreground">
          <Truck className="size-4" /> Shiprocket shipment
          <MBadge tone="primary" className="ml-auto">
            In transit
          </MBadge>
        </div>
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[11.5px]">
          <dt className="text-muted-foreground">AWB</dt>
          <dd className="font-mono text-foreground">1490 2287 6613</dd>
          <dt className="text-muted-foreground">Courier</dt>
          <dd className="text-foreground">Delhivery Surface</dd>
        </dl>
        <ol className="mt-2.5 flex flex-col">
          {trackSteps.map((s, i) => (
            <li key={s.label} className="relative flex gap-2.5 pb-2 last:pb-0">
              {i < trackSteps.length - 1 ? (
                <span className={cx("absolute top-4 bottom-0 left-[7px] w-px", s.done && trackSteps[i + 1].done ? "bg-primary" : "bg-border")} />
              ) : null}
              {s.done ? (
                <CheckCircle2 className={cx("relative size-[15px] shrink-0", s.now ? "text-primary" : "text-primary/70")} />
              ) : (
                <Circle className="relative size-[15px] shrink-0 text-input" />
              )}
              <span className="min-w-0 leading-tight">
                <span className={cx("block text-[11.5px]", s.done ? "font-medium text-foreground" : "text-muted-foreground")}>{s.label}</span>
                <span className="block text-[10.5px] text-muted-foreground">{s.time}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-2.5 flex gap-2">
          <MButton variant="outline" icon={ExternalLink} className="h-7 px-3 text-[12px]">
            Track
          </MButton>
          <MButton variant="outline" icon={FileText} className="h-7 px-3 text-[12px]">
            Label
          </MButton>
          <MButton variant="ghost" icon={RotateCcw} className="h-7 px-2 text-[12px]">
            Return
          </MButton>
        </div>
      </div>
    </div>
  );
}

/** Sales › Orders: order list with an open order and its Shiprocket tracking. */
export function OrdersScreen({ height = 900 }: { height?: number }) {
  return (
    <AppShell active="sales" crumbs={["Sales", "Orders"]} height={height}>
      <div className="flex h-full flex-col gap-4">
        <Segmented items={salesTabs} active={2} />
        <PageTitle
          title="Orders"
          sub="Orders from WhatsApp, your store and Instagram, from payment to doorstep."
          right={
            <span className="flex items-center gap-2">
              <MButton variant="outline" icon={FileText}>
                Export
              </MButton>
              <MButton icon={Plus}>New order</MButton>
            </span>
          }
        />
        <div className="flex items-center justify-between gap-3">
          <Chips
            items={[
              { label: "All", count: 214 },
              { label: "New", count: 18 },
              { label: "Packed", count: 9 },
              { label: "Shipped", count: 24 },
              { label: "Delivered", count: 158 },
              { label: "Returns", count: 5 },
            ]}
          />
          <SearchField placeholder="Search order, name or phone" className="w-[240px]" />
        </div>
        <div className="flex min-h-0 flex-1 gap-3">
          <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-border">
            <table className="w-full border-collapse text-[12.5px]">
              <thead>
                <tr className="bg-card-2">
                  {["Order", "Customer", "Total", "Payment", "Status", "Source"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left text-[11px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allOrders.map((o) => (
                  <tr key={o.id} className={cx("border-t border-border", o.id === "#PN-2039" && "bg-primary-soft")}>
                    <td className="px-3 py-2.5 align-middle">
                      <span className="block font-semibold text-foreground">{o.id}</span>
                      <span className="block text-[11px] text-muted-foreground">{o.time}</span>
                    </td>
                    <td className="px-3 py-2.5 align-middle">
                      <span className="block font-medium text-foreground">{o.customer}</span>
                      <span className="block max-w-[150px] truncate text-[11px] text-muted-foreground">{o.items}</span>
                    </td>
                    <td className="px-3 py-2.5 align-middle font-semibold text-foreground tabular-nums">{o.total}</td>
                    <td className="px-3 py-2.5 align-middle">
                      <MBadge tone={paymentTone[o.payment]}>{o.payment}</MBadge>
                    </td>
                    <td className="px-3 py-2.5 align-middle">
                      <MBadge tone={orderStatusTone[o.status]}>{o.status}</MBadge>
                    </td>
                    <td className="px-3 py-2.5 align-middle">
                      <SourceTag source={o.source} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <OrderDetail />
        </div>
      </div>
    </AppShell>
  );
}

/* ------------------------------------------------------------------ */
/* Payments                                                            */
/* ------------------------------------------------------------------ */

const paymentLinks = [
  { name: "Meera Krishnan", ref: "Order #PN-2042", link: "rzp.io/i/pN8k2Lq", amount: "₹1,250.00", method: "UPI", status: "Paid", time: "10:07" },
  { name: "Fatima Sheikh", ref: "Order #PN-2041", link: "rzp.io/i/x4Tm9Wd", amount: "₹1,250.00", method: "Card", status: "Paid", time: "09:52" },
  { name: "Arjun Menon", ref: "Consultation · Sat 10:00", link: "rzp.io/i/Qa71ZcE", amount: "₹800.00", method: "UPI", status: "Paid", time: "09:31" },
  { name: "Sanjay Gupta", ref: "Order #PN-2037", link: "rzp.io/i/L0vB3nH", amount: "₹640.00", method: "—", status: "Sent", time: "Yesterday" },
  { name: "Mohammed Irfan", ref: "Order #PN-2035", link: "rzp.io/i/Ke5yR2s", amount: "₹540.00", method: "UPI", status: "Refunded", time: "Nov 20" },
] as const;

const linkTone = { Paid: "success", Sent: "warning", Refunded: "danger" } as const;

/** Razorpay payment links with settled and refunded states (~600 wide, no shell). */
export function PaymentsCard({ width = 600 }: { width?: number }) {
  return (
    <MCard className="overflow-hidden text-left shadow-sheet">
      <div style={{ width }}>
        <div className="flex items-start justify-between gap-3 px-4 pt-4">
          <div>
            <p className="flex items-center gap-1.5 text-[14px] font-semibold tracking-[-0.01em] text-foreground">
              <Link2 className="size-4 text-primary" /> Payment links
            </p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">Razorpay · links sent in WhatsApp chats and matched to orders</p>
          </div>
          <MButton icon={Plus} className="h-7 px-3 text-[12px]">
            New link
          </MButton>
        </div>
        <div className="grid grid-cols-3 gap-2 px-4 pt-3">
          {[
            { label: "Collected today", value: "₹38,420", sub: "41 payments" },
            { label: "Settled to bank", value: "₹2,12,600", sub: "Next payout tomorrow" },
            { label: "Refunded, 7 days", value: "₹1,710", sub: "3 refunds" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border px-3 py-2">
              <p className="text-[11px] font-medium text-muted-foreground">{s.label}</p>
              <p className="text-[17px] font-bold tracking-tight text-foreground tabular-nums">{s.value}</p>
              <p className="text-[10.5px] text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>
        <ul className="mt-3 border-t border-border">
          {paymentLinks.map((p) => (
            <li key={p.link} className="flex items-center gap-3 border-b border-border/70 px-4 py-2.5 last:border-b-0">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <CreditCard className="size-3.5" />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[12.5px] font-semibold text-foreground">{p.name}</span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  {p.ref} · <span className="font-mono">{p.link}</span>
                </span>
              </span>
              <span className="w-[54px] text-[11px] text-muted-foreground">{p.method}</span>
              <span className="w-[80px] text-right text-[13px] font-semibold text-foreground tabular-nums">{p.amount}</span>
              <span className="flex w-[74px] justify-end">
                <MBadge tone={linkTone[p.status]}>{p.status}</MBadge>
              </span>
              <span className="w-[58px] text-right text-[11px] text-muted-foreground">{p.time}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 border-t border-border bg-card-2 px-4 py-2.5 text-[11.5px] text-muted-foreground">
          <CheckCircle2 className="size-3.5 text-success" />
          All 41 payments today are matched to an order or booking.
          <span className="ml-auto flex items-center gap-1 font-medium text-primary">
            <Copy className="size-3" /> Reconciliation report
          </span>
        </div>
      </div>
    </MCard>
  );
}
