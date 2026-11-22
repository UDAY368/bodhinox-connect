import {
  ChevronDown,
  Hand,
  Layers,
  ListOrdered,
  Menu,
  MessageCircleReply,
  MoreHorizontal,
  Plus,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cx } from "@/components/ui/cx";
import { AppShell } from "../AppShell";
import { Chips, IgIcon, MBadge, MButton, MCard, PageTitle, SearchField, Segmented, Switch, WaIcon } from "../primitives";

type AutomationRow = {
  name: string;
  live: boolean;
  edited: string;
  by: string;
  channel: "whatsapp" | "instagram";
  trigger: string;
  keywords?: string[];
  runs: string;
  ctr: string;
};

const rows: AutomationRow[] = [
  {
    name: "Reel offer → order",
    live: true,
    edited: "2h ago",
    by: "Ananya Rao",
    channel: "instagram",
    trigger: "Triggers on: a comment on any post",
    runs: "1,284",
    ctr: "38.2%",
  },
  {
    name: "Price enquiry",
    live: true,
    edited: "Yesterday",
    by: "Ananya Rao",
    channel: "whatsapp",
    trigger: "Triggers on keyword",
    keywords: ["PRICE", "RATE"],
    runs: "2,941",
    ctr: "42.6%",
  },
  {
    name: "Welcome new contacts",
    live: true,
    edited: "3 days ago",
    by: "Karthik S",
    channel: "whatsapp",
    trigger: "Triggers on: first message",
    runs: "3,612",
    ctr: "51.0%",
  },
  {
    name: "Consultation booking",
    live: true,
    edited: "4 days ago",
    by: "Priya Das",
    channel: "whatsapp",
    trigger: "Triggers on keyword",
    keywords: ["BOOK", "CONSULT"],
    runs: "486",
    ctr: "33.7%",
  },
  {
    name: "Order status lookup",
    live: true,
    edited: "Nov 14",
    by: "Karthik S",
    channel: "whatsapp",
    trigger: "Triggers on keyword",
    keywords: ["TRACK", "ORDER"],
    runs: "1,904",
    ctr: "64.1%",
  },
  {
    name: "Story reply → sample offer",
    live: true,
    edited: "Nov 12",
    by: "Ananya Rao",
    channel: "instagram",
    trigger: "Triggers on: a reply to your story",
    runs: "731",
    ctr: "29.4%",
  },
  {
    name: "Cart received → upsell",
    live: false,
    edited: "Nov 10",
    by: "Priya Das",
    channel: "whatsapp",
    trigger: "Triggers on: order received",
    runs: "—",
    ctr: "—",
  },
];

function Filter({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-card px-3 text-[13px] font-medium text-foreground shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
      {children}
      <ChevronDown className="size-3.5 text-muted-foreground" />
    </span>
  );
}

function SubNav() {
  const items: { label: string; icon: LucideIcon; count?: number }[] = [
    { label: "My automations", icon: Workflow, count: 16 },
    { label: "Basics", icon: Layers },
    { label: "Sequences", icon: ListOrdered },
  ];
  return (
    <div className="flex w-[168px] shrink-0 flex-col gap-0.5">
      {items.map((it, i) => (
        <span
          key={it.label}
          className={cx(
            "flex h-9 items-center gap-2.5 rounded-lg px-3 text-[13px] font-medium",
            i === 0 ? "bg-primary-soft text-primary-strong" : "text-muted-foreground",
          )}
        >
          <it.icon className="size-4" strokeWidth={1.9} />
          <span className="flex-1">{it.label}</span>
          {it.count ? <span className="text-[11px] tabular-nums">{it.count}</span> : null}
        </span>
      ))}
      <div className="mt-4 rounded-xl border border-border bg-card-2 p-3">
        <p className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
          <Sparkles className="size-3.5 text-primary" /> Build with AI
        </p>
        <p className="mt-1 text-[11.5px] leading-snug text-muted-foreground">
          Describe what should happen and get a ready flow to edit.
        </p>
      </div>
    </div>
  );
}

/** The live Automation list: flows, rules and sequences in one table. */
export function AutomationScreen({ height = 760 }: { height?: number }) {
  return (
    <AppShell active="automation" height={height} crumbs={["Automation", "My automations"]}>
      <div className="flex flex-col gap-4">
        <Segmented items={["Automation", "Instagram tools"]} className="self-start" />
        <PageTitle
          title="Automation"
          sub="Flows, rules and sequences for WhatsApp and Instagram in one place."
          right={<MButton icon={Plus}>New automation</MButton>}
        />

        <div className="flex gap-6">
          <SubNav />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <Chips
              items={[
                { label: "All", count: 16 },
                { label: "Flows", count: 16 },
                { label: "Rules", count: 0 },
                { label: "Sequences", count: 0 },
              ]}
            />
            <div className="flex items-center gap-2">
              <Segmented
                className="p-[2px]"
                items={[
                  "All channels",
                  <>
                    <WaIcon className="size-3.5 text-wa" /> WhatsApp
                  </>,
                  <>
                    <IgIcon className="size-3.5 text-ig" /> Instagram
                  </>,
                ]}
              />
              <Filter>Any status</Filter>
              <Filter>Any trigger</Filter>
              <SearchField placeholder="Search automations" className="ml-auto w-[210px]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
              <div className="grid grid-cols-[minmax(0,1.55fr)_52px_minmax(0,1.3fr)_52px_50px_36px_16px] items-center gap-3 bg-card-2 px-4 py-2.5 text-[11px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
                <span>Name</span>
                <span>Type</span>
                <span>Starts when</span>
                <span className="text-right">Runs</span>
                <span className="text-right">CTR</span>
                <span>Live</span>
                <span />
              </div>
              {rows.map((r) => {
                return (
                  <div
                    key={r.name}
                    className="grid grid-cols-[minmax(0,1.55fr)_52px_minmax(0,1.3fr)_52px_50px_36px_16px] items-center gap-3 border-t border-border px-4 py-[9px] text-[13px]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={cx(
                          "inline-flex size-7 shrink-0 items-center justify-center rounded-lg",
                          r.channel === "whatsapp"
                            ? "bg-[color-mix(in_oklab,var(--wa)_14%,transparent)] text-wa"
                            : "bg-[color-mix(in_oklab,var(--ig)_14%,transparent)] text-ig",
                        )}
                      >
                        {r.channel === "whatsapp" ? <WaIcon className="size-3.5" /> : <IgIcon className="size-3.5" />}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-foreground">{r.name}</p>
                        <p className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[11.5px] text-muted-foreground">
                          <MBadge tone={r.live ? "success" : "neutral"} className="h-[18px] px-1.5 text-[10.5px]">
                            {r.live ? "Live" : "Draft"}
                          </MBadge>
                          <span className="truncate">
                            Edited {r.edited} · Created by {r.by}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span>
                      <MBadge tone="outline">Flow</MBadge>
                    </span>
                    <span className="flex min-w-0 items-center gap-1 text-[12px] text-muted-foreground">
                      <span className="truncate">{r.trigger}</span>
                      {r.keywords?.map((k) => (
                        <span key={k} className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[11px] font-medium text-foreground">
                          {k}
                        </span>
                      ))}
                    </span>
                    <span className="text-right font-medium tabular-nums">{r.runs}</span>
                    <span className="text-right tabular-nums text-muted-foreground">{r.ctr}</span>
                    <Switch on={r.live} />
                    <MoreHorizontal className="size-4 text-muted-foreground" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

const basics: { icon: LucideIcon; title: string; body: string; channel: "whatsapp" | "instagram"; on: boolean; stat: string }[] = [
  {
    icon: MessageCircleReply,
    title: "Default reply",
    body: "Answers any message that no other automation handles.",
    channel: "instagram",
    on: true,
    stat: "412 this week",
  },
  {
    icon: Hand,
    title: "Conversation starters",
    body: "“Best oil for dry skin?” · “Track my order” · “Book a consult”",
    channel: "instagram",
    on: true,
    stat: "3 starters",
  },
  {
    icon: Sparkles,
    title: "Story mention reply",
    body: "Thanks people when they mention you in their story.",
    channel: "instagram",
    on: true,
    stat: "86 this week",
  },
  {
    icon: Menu,
    title: "Main menu",
    body: "Shop bestsellers · Track order · Talk to us",
    channel: "instagram",
    on: false,
    stat: "Off",
  },
  {
    icon: MessageCircleReply,
    title: "Away message",
    body: "Outside 9:00–19:00, Mon–Sat: “We’ll reply first thing tomorrow 🌿”",
    channel: "whatsapp",
    on: true,
    stat: "57 this week",
  },
];

/** Focused crop: the Basics list of always-on replies (~640 design width). */
export function RulesListCard({ className }: { className?: string }) {
  return (
    <MCard className={cx("w-[640px] overflow-hidden", className)}>
      <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3">
        <div>
          <p className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">Basics</p>
          <p className="mt-0.5 text-[12px] text-muted-foreground">Always-on replies for your Instagram account and WhatsApp number.</p>
        </div>
        <MBadge tone="success">4 on</MBadge>
      </div>
      <ul>
        {basics.map((b) => (
          <li key={b.title} className="flex items-center gap-3 border-t border-border px-5 py-3">
            <span className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <b.icon className="size-4" />
              <span
                className={cx(
                  "absolute -right-1 -bottom-1 inline-flex size-4 items-center justify-center rounded-full border-2 border-card",
                  b.channel === "whatsapp" ? "bg-wa text-white" : "bg-ig text-white",
                )}
              >
                {b.channel === "whatsapp" ? <WaIcon className="size-2" strokeWidth={3} /> : <IgIcon className="size-2" strokeWidth={3} />}
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-foreground">{b.title}</p>
              <p className="mt-0.5 truncate text-[12px] text-muted-foreground">{b.body}</p>
            </div>
            <span className="shrink-0 text-[11.5px] text-muted-foreground tabular-nums">{b.stat}</span>
            <MBadge tone="outline">Edit</MBadge>
            <Switch on={b.on} />
          </li>
        ))}
      </ul>
    </MCard>
  );
}
