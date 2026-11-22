import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  FileWarning,
  MessageSquare,
  Send,
  Timer,
  UserX,
} from "lucide-react";
import { demoConversationSeries, demoTeam } from "@/content/demo";
import { cx } from "@/components/ui/cx";
import { AppShell } from "../AppShell";
import { AreaChart, BarChart, Donut, Heatmap } from "../charts";
import { MAvatar, MBadge, MButton, MCard, MCardHeader, MetricCard, MTable, PageTitle, Segmented } from "../primitives";

/*
 * The CRM's Analytics overview (BODHINOX_CHAT/src/components/analytics/
 * overview-section.tsx, range-picker.tsx, ai-section.tsx, commerce-card.tsx).
 */

const resolvedSeries = [31, 40, 38, 52, 49, 60, 57, 63, 61, 72, 70, 80, 79, 88];

/** Mon-Sun rows x 12 two-hour columns, 0-1. */
const busyHours = [
  [0.05, 0.02, 0.1, 0.35, 0.6, 0.72, 0.55, 0.62, 0.8, 0.9, 0.58, 0.2],
  [0.04, 0.03, 0.12, 0.4, 0.58, 0.68, 0.5, 0.6, 0.76, 0.86, 0.52, 0.18],
  [0.06, 0.02, 0.1, 0.38, 0.62, 0.7, 0.54, 0.66, 0.82, 0.95, 0.6, 0.22],
  [0.05, 0.02, 0.09, 0.36, 0.55, 0.66, 0.48, 0.58, 0.74, 0.84, 0.5, 0.2],
  [0.07, 0.03, 0.12, 0.42, 0.64, 0.74, 0.56, 0.7, 0.88, 1, 0.7, 0.3],
  [0.1, 0.05, 0.08, 0.28, 0.5, 0.62, 0.66, 0.72, 0.8, 0.92, 0.78, 0.4],
  [0.12, 0.06, 0.06, 0.2, 0.42, 0.55, 0.6, 0.64, 0.7, 0.82, 0.74, 0.38],
];

function Dot({ color }: { color: string }) {
  return <span className="size-2 rounded-full" style={{ background: color }} />;
}

/** Analytics › Overview with the 30-day range selected. */
export function AnalyticsScreen({ height = 880 }: { height?: number }) {
  return (
    <AppShell active="analytics" height={height} crumbs={["Analytics", "Overview"]}>
      <div className="flex flex-col gap-4">
        <PageTitle
          title="Analytics"
          sub="How conversations, your team, campaigns and AI are doing."
          right={
            <MButton variant="outline" icon={Download}>
              Export CSV
            </MButton>
          }
        />
        <Segmented items={["Overview", "Conversations", "Team", "Campaign results", "Reports"]} />

        <div className="flex items-center gap-1.5">
          {["Today", "7 days", "30 days", "90 days", "Custom"].map((c) => (
            <span
              key={c}
              className={cx(
                "inline-flex h-8 items-center rounded-full px-3.5 text-[12.5px] font-medium",
                c === "30 days" ? "bg-foreground text-background" : "border border-border bg-card text-muted-foreground",
              )}
            >
              {c}
            </span>
          ))}
          <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-[12.5px] font-medium text-muted-foreground">
            <CalendarDays className="size-3.5" /> Calendar period
          </span>
          <span className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-[12.5px] font-medium text-foreground">
            All channels <ChevronDown className="size-3.5 text-muted-foreground" />
          </span>
        </div>

        <div className="grid grid-cols-5 gap-3">
          <MetricCard title="New conversations" value="3,482" icon={MessageSquare} delta={{ sign: 1, label: "+38% vs previous 30 days" }} />
          <MetricCard title="Resolved" value="3,107" icon={CheckCircle2} delta={{ sign: 1, label: "+29%" }} />
          <MetricCard title="Median first reply" value="15s" icon={Timer} delta={{ sign: 1, label: "−84% faster" }} />
          <MetricCard title="Median resolution time" value="42 min" icon={Clock} delta={{ sign: 1, label: "−31% faster" }} />
          <MetricCard title="Messages sent" value="61,920" icon={Send} delta={{ sign: 1, label: "+15%" }} />
        </div>

        <div className="grid grid-cols-[1.9fr_1fr] gap-3">
          <MCard>
            <MCardHeader
              title="New and resolved conversations"
              sub="Per day, all channels"
              right={
                <span className="flex gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Dot color="var(--chart-1)" /> New
                  </span>
                  <span className="flex items-center gap-1">
                    <Dot color="var(--chart-3)" /> Resolved
                  </span>
                </span>
              }
            />
            <div className="px-4 pt-2 pb-3">
              <AreaChart
                height={176}
                width={620}
                labels={demoConversationSeries.labels}
                series={[
                  { values: demoConversationSeries.outgoing, color: "var(--chart-1)", fill: true },
                  { values: resolvedSeries, color: "var(--chart-3)" },
                ]}
              />
            </div>
          </MCard>
          <MCard>
            <MCardHeader title="Needs attention" sub="Fix these to keep reply times low" right={<MBadge tone="warning">3</MBadge>} />
            <ul className="flex flex-col gap-2 px-4 pt-3 pb-4 text-[12.5px]">
              {[
                { icon: UserX, text: "14 chats have no owner", action: "Assign", tone: "text-warning" },
                { icon: FileWarning, text: "3 chats need a template", action: "Open", tone: "text-destructive" },
                { icon: AlertCircle, text: "4 questions the AI could not answer", action: "Review", tone: "text-primary" },
              ].map((n) => (
                <li key={n.text} className="flex items-center gap-2.5 rounded-xl border border-border px-3 py-2.5">
                  <n.icon className={cx("size-4 shrink-0", n.tone)} />
                  <span className="flex-1 text-foreground">{n.text}</span>
                  <span className="text-[12px] font-medium text-primary">{n.action}</span>
                </li>
              ))}
            </ul>
          </MCard>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <MCard>
            <MCardHeader title="Channel split" sub="New conversations" />
            <div className="flex items-center gap-3 px-4 pt-3 pb-4">
              <Donut
                size={96}
                thickness={12}
                center="3.5K"
                parts={[
                  { value: 74, color: "var(--wa)" },
                  { value: 26, color: "var(--ig)" },
                ]}
              />
              <ul className="flex flex-1 flex-col gap-1.5 text-[12px]">
                <li className="flex items-center gap-2">
                  <Dot color="var(--wa)" />
                  <span className="flex-1 text-muted-foreground">WhatsApp</span>
                  <span className="font-medium text-foreground tabular-nums">74%</span>
                </li>
                <li className="flex items-center gap-2">
                  <Dot color="var(--ig)" />
                  <span className="flex-1 text-muted-foreground">Instagram</span>
                  <span className="font-medium text-foreground tabular-nums">26%</span>
                </li>
              </ul>
            </div>
          </MCard>
          <MCard>
            <MCardHeader title="Busiest hours" sub="Peak: Fri, 6–8 pm" />
            <div className="px-4 pt-3 pb-2">
              <Heatmap rows={busyHours} cell={14} gap={3} />
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>12 am</span>
                <span>12 pm</span>
                <span>11 pm</span>
              </div>
            </div>
          </MCard>
          <MCard>
            <MCardHeader title="Commerce revenue" sub="Orders and payment links" />
            <div className="px-4 pt-2 pb-4">
              <p className="text-[22px] leading-tight font-bold text-foreground tabular-nums">₹9,84,210</p>
              <p className="text-[11.5px] font-semibold text-success">+22% · 812 orders</p>
              <div className="mt-2">
                <BarChart values={[38, 44, 41, 52, 49, 58, 72, 66]} height={52} highlight={6} />
              </div>
            </div>
          </MCard>
          <MCard>
            <MCardHeader title="AI agent" sub="Replied in 2,140 chats" />
            <dl className="grid grid-cols-[1fr_auto] gap-x-2 gap-y-2 px-4 pt-3 pb-4 text-[12.5px]">
              <dt className="text-muted-foreground">Solved without a person</dt>
              <dd className="font-semibold text-foreground tabular-nums">71%</dd>
              <dt className="text-muted-foreground">Handed to a person</dt>
              <dd className="font-semibold text-foreground tabular-nums">612</dd>
              <dt className="text-muted-foreground">Unanswered questions</dt>
              <dd className="font-semibold text-warning tabular-nums">18</dd>
              <dt className="text-muted-foreground">Median reply</dt>
              <dd className="font-semibold text-foreground tabular-nums">4s</dd>
            </dl>
          </MCard>
        </div>

        <MCard className="flex items-start gap-3 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/khaga-mark-sun-orange.webp" alt="" width={22} height={22} className="mt-0.5 size-[22px]" />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-foreground">AI insights</p>
            <p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">
              Conversations grew 38%, mostly from the Diwali reel on Instagram. First replies stayed under 20 seconds because the Wellness
              Guide answered 71% of chats. Friday evenings are busiest: add one more person from 6 to 8 pm.
            </p>
          </div>
        </MCard>
      </div>
    </AppShell>
  );
}

const teamRows = [
  { ...demoTeam[1], resolved: 128, csat: "4.8", online: true, tone: 2 as const },
  { ...demoTeam[2], resolved: 91, csat: "4.9", online: true, tone: 3 as const },
  { ...demoTeam[0], resolved: 79, csat: "4.7", online: false, tone: 1 as const },
  { name: "Rahul Joshi", initials: "RJ", open: 5, replies: 64, median: "4.6 min", resolved: 52, csat: "4.5", online: true, tone: 4 as const },
];

/** Analytics › Team: member, open, replies, median response. Design width ~620. */
export function TeamPerformanceCard({ height }: { height?: number }) {
  return (
    <MCard className="w-[620px] overflow-hidden text-left shadow-soft">
      <div style={height ? { height } : undefined} className="flex flex-col">
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4">
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">Team</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">Last 30 days · people only, AI replies are counted separately</p>
          </div>
          <MBadge tone="outline" className="h-7 px-3 text-foreground">
            30 days <ChevronDown className="size-3" />
          </MBadge>
        </div>
        <MTable
          className="mx-5 mb-5"
          head={["Member", "Open", "Replies", "Resolved", "Median response"]}
          colClass={["", "text-right", "text-right", "text-right", "text-right"]}
          rows={teamRows.map((m) => [
            <span key="m" className="flex items-center gap-2.5">
              <span className="relative inline-flex">
                <MAvatar initials={m.initials} tone={m.tone} size={30} />
                <span className={cx("absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-card", m.online ? "bg-success" : "bg-input")} />
              </span>
              <span className="leading-tight">
                <span className="block font-medium">{m.name}</span>
                <span className="block text-[11px] text-muted-foreground">CSAT {m.csat}</span>
              </span>
            </span>,
            <span key="o" className="tabular-nums">
              {m.open}
            </span>,
            <span key="r" className="tabular-nums">
              {m.replies}
            </span>,
            <span key="res" className="tabular-nums">
              {m.resolved}
            </span>,
            <span key="med" className={cx("font-semibold tabular-nums", parseFloat(m.median) > 4 ? "text-warning" : "text-success")}>
              {m.median}
            </span>,
          ])}
        />
      </div>
    </MCard>
  );
}
