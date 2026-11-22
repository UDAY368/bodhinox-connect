import {
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  MessageCircleQuestion,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Plus,
  RefreshCw,
  Sparkles,
  UserRoundCheck,
  Wand2,
} from "lucide-react";
import { cx } from "@/components/ui/cx";
import { demoAgents } from "@/content/demo";
import { AppShell } from "../AppShell";
import { Chips, MAvatar, MBadge, MButton, MCard, PageTitle, SearchField, Segmented, Switch } from "../primitives";

/*
 * The CRM's AI section (BODHINOX_CHAT/src/components/ai/**,
 * agents-panel.tsx, knowledge-panel.tsx, agents/ai-activity.tsx).
 */

const agentDescriptions = [
  "Answers product questions, suggests the right oil or capsule for each skin and hair type, and sends a payment link when the customer is ready.",
  "Tracks orders, shares Shiprocket tracking links and handles return requests. Hands refunds over ₹2,000 to a person.",
  "Books consultations with Dr. Lakshmi and Dr. Varun, reschedules and sends reminders the evening before.",
];

const agentHours = ["Always on", "Always on", "Mon–Sat, 9 am–7 pm"];

function KhagaMark({ size = 18 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/khaga-mark-sun-orange.webp" alt="" width={size} height={size} style={{ width: size, height: size }} />
  );
}

function ChannelDot({ channel }: { channel: string }) {
  return (
    <MBadge tone="outline" className="text-foreground">
      <span className={cx("size-1.5 rounded-full", channel === "WhatsApp" ? "bg-wa" : "bg-ig")} />
      {channel}
    </MBadge>
  );
}

function AgentCard({ index }: { index: number }) {
  const a = demoAgents[index];
  return (
    <article className={cx("flex min-w-0 flex-col gap-3 rounded-xl border bg-card p-4", a.on ? "border-border" : "border-border opacity-90")}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className={cx(
              "flex size-9 shrink-0 items-center justify-center rounded-[11px]",
              a.on ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground",
            )}
          >
            <Sparkles className="size-4" />
          </span>
          <div className="min-w-0 leading-tight">
            <strong className="block truncate text-[15px] font-semibold text-foreground">{a.name}</strong>
            <small className="block truncate text-[12px] text-muted-foreground">{a.role}</small>
          </div>
        </div>
        <Switch on={a.on} />
      </div>
      <p className="line-clamp-2 min-h-[2.5rem] text-[13px] leading-snug text-muted-foreground">{agentDescriptions[index]}</p>
      <div className="flex flex-wrap gap-1.5">
        {a.channels.map((c) => (
          <ChannelDot key={c} channel={c} />
        ))}
        <MBadge tone="outline" className="text-foreground">
          <Clock className="size-3" />
          {agentHours[index]}
        </MBadge>
        {index === 0 ? <MBadge tone="neutral">Default</MBadge> : null}
      </div>
      <div className="grid grid-cols-2 gap-2.5 rounded-lg bg-muted px-3 py-2.5 text-[12px] text-muted-foreground">
        <span>
          <b className="block text-[17px] font-bold text-foreground tabular-nums">{a.handled}</b>
          conversations handled
        </span>
        <span>
          <b className="block text-[17px] font-bold text-foreground tabular-nums">{a.solved}</b>
          solved without a person
        </span>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2">
        <MBadge tone={a.on ? "solid" : "outline"}>{a.on ? "On" : "Off"}</MBadge>
        <span className="flex items-center gap-1.5">
          <MButton variant="outline" icon={MessageSquare} className="h-7 px-3 text-[12px]">
            Test agent
          </MButton>
          <MButton variant="outline" icon={Pencil} className="h-7 px-3 text-[12px]">
            Edit
          </MButton>
          <span className="inline-flex size-7 items-center justify-center rounded-full text-muted-foreground">
            <MoreHorizontal className="size-4" />
          </span>
        </span>
      </div>
    </article>
  );
}

/** AI › Agents: the three Prakriti agents with stats, channels and toggles. */
export function AiAgentsScreen({ height = 760 }: { height?: number }) {
  return (
    <AppShell active="ai" height={height} crumbs={["AI", "Agents"]}>
      <div className="flex flex-col gap-4">
        <PageTitle
          title="AI"
          sub="Agents that reply for you, what they know, and how well they are doing."
          right={<MButton icon={Plus}>New agent</MButton>}
        />

        <div className="flex items-center gap-3 rounded-xl border border-border bg-primary-soft/60 px-4 py-3">
          <KhagaMark size={28} />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-[13px] font-semibold text-foreground">Meet KHAGA. A little more clarity for every conversation.</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">
              Today: 214 chats answered, 61 handed to your team, 4 questions it could not answer yet.
            </p>
          </div>
          <MButton variant="outline">Review unanswered</MButton>
        </div>

        <Segmented items={["Agents", "Knowledge", "Assistant features", "Setup", "Activity"]} />

        <div className="flex items-center justify-between gap-3">
          <Chips
            items={[
              { label: "All", count: 3 },
              { label: "On", count: 2 },
              { label: "Off", count: 1 },
            ]}
          />
          <SearchField placeholder="Search agents" className="w-64 rounded-full" />
        </div>
        <p className="text-[12px] text-muted-foreground">
          Each conversation is answered by one agent: the one that already replied there, otherwise the first agent in this list that is on
          for the channel at that hour.
        </p>

        <div className="grid grid-cols-3 gap-3.5">
          {demoAgents.map((a, i) => (
            <AgentCard key={a.name} index={i} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}

const knowledgeSources = [
  { icon: FileText, title: "Product catalogue 2026.pdf", type: "Document", size: "48 pages", updated: "2 days ago", status: "Ready", customer: true, tone: 1 },
  { icon: Globe, title: "prakriti.shop", type: "Website", size: "126 pages", updated: "Today, 6:00 am", status: "Ready", customer: true, tone: 2 },
  { icon: MessageCircleQuestion, title: "Shipping, returns & COD", type: "FAQs", size: "32 answers", updated: "Yesterday", status: "Ready", customer: true, tone: 3 },
  { icon: Globe, title: "prakriti.shop/blogs/rituals", type: "Website", size: "41 pages", updated: "Syncing…", status: "Syncing", customer: true, tone: 2 },
  { icon: FileText, title: "Ingredient safety notes.docx", type: "Document", size: "12 pages", updated: "1 week ago", status: "Ready", customer: false, tone: 4 },
  { icon: BookOpen, title: "Consultation pricing", type: "FAQs", size: "9 answers", updated: "3 weeks ago", status: "Ready", customer: true, tone: 3 },
] as const;

const thumbTone = {
  1: "bg-primary-soft text-primary",
  2: "bg-[color-mix(in_oklab,var(--chart-3)_16%,transparent)] text-success",
  3: "bg-[color-mix(in_oklab,var(--chart-4)_18%,transparent)] text-warning",
  4: "bg-[color-mix(in_oklab,var(--chart-5)_14%,transparent)] text-chart-5",
} as const;

/** AI › Knowledge: sources with size, status and "Use in customer replies". Design width ~620. */
export function KnowledgeCard({ height }: { height?: number }) {
  return (
    <MCard className="w-[620px] overflow-hidden text-left shadow-soft">
      <div style={height ? { height } : undefined} className="flex flex-col">
        <div className="flex items-start justify-between gap-3 px-5 pt-5">
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">Knowledge</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">What your agents read before they reply. 6 sources · 247 pages</p>
          </div>
          <MButton variant="outline" icon={Plus}>
            Add
          </MButton>
        </div>
        <div className="flex items-center justify-between gap-3 px-5 pt-4">
          <Chips
            items={[
              { label: "All", count: 6 },
              { label: "Documents", count: 2 },
              { label: "Website", count: 2 },
              { label: "FAQs", count: 2 },
            ]}
          />
        </div>
        <div className="mx-5 mt-4 mb-5 overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-[1fr_92px_84px_118px] items-center gap-3 bg-card-2 px-4 py-2.5 text-[11px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
            <span>Source</span>
            <span>Status</span>
            <span>Size</span>
            <span className="text-right">Customer replies</span>
          </div>
          {knowledgeSources.map((s) => (
            <div key={s.title} className="grid grid-cols-[1fr_92px_84px_118px] items-center gap-3 border-t border-border px-4 py-3">
              <span className="flex min-w-0 items-center gap-2.5">
                <span className={cx("inline-flex size-8 shrink-0 items-center justify-center rounded-lg", thumbTone[s.tone])}>
                  <s.icon className="size-4" strokeWidth={1.9} />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-[13px] font-medium text-foreground">{s.title}</span>
                  <span className="block truncate text-[11.5px] text-muted-foreground">
                    {s.type} · {s.updated}
                  </span>
                </span>
              </span>
              <span>
                {s.status === "Ready" ? (
                  <MBadge tone="success">
                    <CheckCircle2 className="size-3" /> Ready
                  </MBadge>
                ) : (
                  <MBadge tone="warning">
                    <RefreshCw className="size-3" /> Syncing
                  </MBadge>
                )}
              </span>
              <span className="text-[12.5px] text-muted-foreground tabular-nums">{s.size}</span>
              <span className="flex items-center justify-end gap-2">
                <span className="text-[11px] text-muted-foreground">{s.customer ? "Used" : "Staff only"}</span>
                <Switch on={s.customer} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </MCard>
  );
}

const activityRows = [
  { time: "10:42", name: "Meera Krishnan", initials: "MK", tone: 1, msg: "Is the Kumkumadi oil good for dry skin?", outcome: "Replied", reason: "Answered", agent: "Wellness Guide" },
  { time: "10:38", name: "Vikram Iyer", initials: "VI", tone: 1, msg: "I want a refund, the bottle arrived broken", outcome: "Handed off", reason: "Matched handoff rule: refund", agent: "Order Helper" },
  { time: "10:31", name: "Rohit Sharma", initials: "RS", tone: 5, msg: "PRICE", outcome: "Replied", reason: "Answered", agent: "Wellness Guide" },
  { time: "10:24", name: "Nandini Kulkarni", initials: "NK", tone: 3, msg: "Can I take ashwagandha during pregnancy?", outcome: "Handed off", reason: "Health or sensitive topic", agent: "Wellness Guide" },
  { time: "10:17", name: "Arjun Menon", initials: "AM", tone: 2, msg: "Do you have a slot on Saturday morning?", outcome: "Replied", reason: "Answered", agent: "Booking Desk" },
  { time: "10:09", name: "Harsh Vardhan", initials: "HV", tone: 4, msg: "Is there a store in Mysuru?", outcome: "Handed off", reason: "Low confidence", agent: "Wellness Guide" },
  { time: "09:58", name: "Fatima Sheikh", initials: "FS", tone: 3, msg: "Where is order #PN-2041?", outcome: "Replied", reason: "Answered", agent: "Order Helper" },
] as const;

/** AI › Activity: what the agent did with each message and why. Design width ~620. */
export function AiActivityCard({ height }: { height?: number }) {
  return (
    <MCard className="w-[620px] overflow-hidden text-left shadow-soft">
      <div style={height ? { height } : undefined} className="flex flex-col">
        <div className="flex items-start justify-between gap-3 px-5 pt-5">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">AI activity</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">Replied, handed off, skipped or failed, and why. Kept for 90 days.</p>
          </div>
          <span className="flex shrink-0 gap-1.5">
            <MBadge tone="outline" className="h-7 px-3 text-foreground">
              Any outcome
            </MBadge>
            <MBadge tone="outline" className="h-7 px-3 text-foreground">
              Last 24 hours
            </MBadge>
          </span>
        </div>
        <ul className="mt-4 border-t border-border">
          {activityRows.map((r) => {
            const handed = r.outcome === "Handed off";
            return (
              <li key={r.time + r.name} className="grid grid-cols-[44px_1fr_auto] items-center gap-3 border-b border-border/70 px-5 py-2.5 last:border-b-0">
                <span className="text-[12px] text-muted-foreground tabular-nums">{r.time}</span>
                <span className="flex min-w-0 items-center gap-2.5">
                  <MAvatar initials={r.initials} tone={r.tone} size={28} />
                  <span className="min-w-0 leading-tight">
                    <span className="block truncate text-[13px] font-medium text-foreground">
                      {r.name} <span className="font-normal text-muted-foreground">· {r.agent}</span>
                    </span>
                    <span className="block truncate text-[12px] text-muted-foreground">“{r.msg}”</span>
                  </span>
                </span>
                <span className="flex flex-col items-end gap-1">
                  <MBadge tone={handed ? "warning" : "success"}>
                    {handed ? <UserRoundCheck className="size-3" /> : <CheckCircle2 className="size-3" />}
                    {r.outcome}
                  </MBadge>
                  <span className="text-[11px] text-muted-foreground">{r.reason}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </MCard>
  );
}

/** The inbox's AI panel: summary, suggested reply, intent and lead score. Design width ~380. */
export function AiSummaryCard({ height }: { height?: number }) {
  return (
    <MCard className="w-[380px] overflow-hidden text-left shadow-soft">
      <div style={height ? { height } : undefined} className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
          <KhagaMark size={20} />
          <p className="text-[14px] font-semibold text-foreground">KHAGA</p>
          <span className="ml-auto text-[11px] text-muted-foreground">Updated 1 min ago</span>
        </div>

        <div className="rounded-xl border border-border bg-card-2 p-3">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
            <Sparkles className="size-3.5 text-primary" /> Chat summary
          </p>
          <p className="mt-1.5 text-[12.5px] leading-snug text-muted-foreground">
            Meera has dry, sensitive skin and asked if Kumkumadi oil suits her. Agent recommended it at ₹1,250. She wants to pay by UPI and
            asked about delivery to Indiranagar.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-border p-3">
            <p className="text-[11px] font-medium text-muted-foreground">Intent</p>
            <p className="mt-1 text-[14px] font-semibold text-foreground">Ready to buy</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              <MBadge tone="success">Buying intent</MBadge>
              <MBadge tone="neutral">Asked price</MBadge>
            </div>
          </div>
          <div className="rounded-xl border border-border p-3">
            <p className="text-[11px] font-medium text-muted-foreground">Lead score</p>
            <p className="mt-1 flex items-baseline gap-1 text-[22px] leading-none font-bold text-foreground tabular-nums">
              86 <span className="text-[11px] font-medium text-success">Hot</span>
            </p>
            <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-muted">
              <span className="block h-full w-[86%] rounded-full bg-primary" />
            </span>
          </div>
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
            <Wand2 className="size-3.5 text-primary" /> Suggested replies
          </p>
          <div className="mt-2 flex flex-col gap-1.5">
            <span className="rounded-xl border border-primary/30 bg-primary-soft px-3 py-2 text-[12.5px] leading-snug text-foreground">
              Yes, UPI works. Here is your payment link for ₹1,250. Delivery to Indiranagar takes 1–2 days 🌿
            </span>
            <span className="rounded-xl border border-border px-3 py-2 text-[12.5px] leading-snug text-muted-foreground">
              Would you like a free Rose Water Toner sample with your first order?
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-border pt-3 text-[11.5px] text-muted-foreground">
          <MBadge tone="primary">Next step</MBadge>
          Send payment link · move deal to Qualified
        </div>
      </div>
    </MCard>
  );
}
