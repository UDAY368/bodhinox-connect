import {
  ArrowUpRight,
  Bot,
  CalendarCheck,
  CheckCircle2,
  Circle,
  IndianRupee,
  Megaphone,
  MessageSquare,
  Plus,
  Send,
  TrendingUp,
  UserPlus,
  Wallet,
  Workflow,
  Zap,
} from "lucide-react";
import { demoConversationSeries, demoKpis, demoKpisSecondary, demoPipeline } from "@/content/demo";
import { AppShell } from "../AppShell";
import { AreaChart, Donut } from "../charts";
import { IgIcon, MBadge, MButton, MCard, MCardHeader, MetricCard } from "../primitives";

const kpiIcons = [MessageSquare, UserPlus, IndianRupee, Send];
const kpi2Icons = [Wallet, CalendarCheck, TrendingUp, Bot];

/** The live CRM Home screen: KPI tiles, Next moves, quick actions, charts. */
export function HomeScreen({ height = 820 }: { height?: number }) {
  return (
    <AppShell active="home" height={height}>
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-[28px] leading-tight font-bold tracking-[-0.025em] text-foreground">Dashboard</h3>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Live analytics across conversations, contacts, deals, broadcasts, and automations.
            </p>
          </div>
          <MButton>
            Open inbox <ArrowUpRight className="size-3.5" />
          </MButton>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {demoKpis.map((k, i) => (
            <MetricCard
              key={k.title}
              title={k.title}
              value={k.value}
              icon={kpiIcons[i]}
              delta={"delta" in k ? k.delta : undefined}
              subtitle={"subtitle" in k ? k.subtitle : undefined}
            />
          ))}
          {demoKpisSecondary.map((k, i) => (
            <MetricCard key={k.title} title={k.title} value={k.value} icon={kpi2Icons[i]} subtitle={k.subtitle} />
          ))}
        </div>

        <div className="grid grid-cols-5 gap-3">
          {[
            { icon: UserPlus, label: "New Contact" },
            { icon: Plus, label: "New deal" },
            { icon: Megaphone, label: "New Broadcast" },
            { icon: Zap, label: "New Automation" },
            { icon: IgIcon, label: "Instagram home" },
          ].map((a) => (
            <span key={a.label} className="flex h-11 items-center gap-2.5 rounded-xl border border-border bg-card px-3 text-[13px] font-medium text-foreground">
              <span className="inline-flex size-7 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <a.icon className="size-3.5" />
              </span>
              <span className="flex-1 truncate whitespace-nowrap">{a.label}</span>
              <ArrowUpRight className="size-3.5 text-muted-foreground" />
            </span>
          ))}
        </div>

        <div className="grid grid-cols-[1.55fr_1fr_1fr] gap-3">
          <MCard>
            <MCardHeader
              title="Conversations Over Time"
              sub="Daily message volume by direction"
              right={
                <span className="flex gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-chart-1" /> Outgoing
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-chart-3" /> Incoming
                  </span>
                </span>
              }
            />
            <div className="px-4 pt-2 pb-3">
              <AreaChart
                height={170}
                width={600}
                labels={demoConversationSeries.labels}
                series={[
                  { values: demoConversationSeries.outgoing, color: "var(--chart-1)", fill: true },
                  { values: demoConversationSeries.incoming, color: "var(--chart-3)" },
                ]}
              />
            </div>
          </MCard>

          <MCard>
            <MCardHeader title="Pipeline Value" sub="Open deals by stage" />
            <div className="flex items-center gap-4 px-4 pt-3 pb-4">
              <Donut
                size={118}
                thickness={14}
                center="₹4.9L"
                sub="Total"
                parts={demoPipeline.map((p, i) => ({ value: p.share, color: `var(--chart-${i + 1})` }))}
              />
              <ul className="flex flex-1 flex-col gap-1.5 text-[12px]">
                {demoPipeline.map((p, i) => (
                  <li key={p.stage} className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: `var(--chart-${i + 1})` }} />
                    <span className="flex-1 text-muted-foreground">{p.stage}</span>
                    <span className="font-medium text-foreground tabular-nums">{p.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MCard>

          <MCard>
            <MCardHeader title="Next moves" sub="4 of 6 done" right={<MBadge tone="primary">Setup</MBadge>} />
            <ul className="flex flex-col gap-2 px-4 pt-3 pb-4 text-[12.5px]">
              {[
                ["Connect WhatsApp number", true],
                ["Approve a template", true],
                ["Add conversation starters", true],
                ["Reply to comments with AI", true],
                ["Collect leads with an automation", false],
                ["Publish your online store", false],
              ].map(([label, done]) => (
                <li key={label as string} className="flex items-center gap-2">
                  {done ? <CheckCircle2 className="size-4 text-primary" /> : <Circle className="size-4 text-input" />}
                  <span className={done ? "text-muted-foreground line-through" : "text-foreground"}>{label}</span>
                </li>
              ))}
            </ul>
          </MCard>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <MCard className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-foreground">WhatsApp</p>
              <MBadge tone="success">Connected</MBadge>
            </div>
            <p className="mt-1 text-[12px] text-muted-foreground">Quality: High · Messaging limit 10,000 / day</p>
          </MCard>
          <MCard className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-foreground">Reply queue</p>
              <MBadge tone="warning">3 over target</MBadge>
            </div>
            <p className="mt-1 text-[12px] text-muted-foreground">12 waiting · Reply target 5 minutes</p>
          </MCard>
          <MCard className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-foreground">Automation runs</p>
              <MBadge tone="primary">
                <Workflow className="size-3" /> 1,942
              </MBadge>
            </div>
            <p className="mt-1 text-[12px] text-muted-foreground">0 failed · 18 approved templates</p>
          </MCard>
        </div>
      </div>
    </AppShell>
  );
}
