import { ExternalLink, MessageCircle, MousePointerClick, ShoppingBag, UserCheck, type LucideIcon } from "lucide-react";
import { cx } from "@/components/ui/cx";
import { AppShell } from "../AppShell";
import { BarChart } from "../charts";
import { MBadge, MButton, MCard, MCardHeader, Segmented, TabRow, WaIcon } from "../primitives";
import { CampaignsHeader } from "./CampaignsScreen";

/*
 * Campaigns › Ads (click-to-WhatsApp), copied from BODHINOX_CHAT/src/components/
 * ads/ads-overview.tsx: metric tiles, daily trend, top campaigns, and the
 * "From ad to customer" funnel. Last 30 days, INR. The numbers add up:
 * CTR = clicks ÷ impressions, CPM = spend ÷ impressions × 1000, ROAS = revenue ÷ spend.
 */

const tiles = [
  { label: "Amount spent", value: "₹48,620", hint: "Last 30 days" },
  { label: "Reach", value: "1,86,400", hint: "Frequency 2.31" },
  { label: "Impressions", value: "4,30,900", hint: "61% on Instagram" },
  { label: "Click-through rate", value: "2.84%", hint: "12,238 clicks" },
  { label: "Conversations started", value: "1,412", hint: "1,368 chats seen in Bodhinox" },
  { label: "Cost per conversation", value: "₹34.43", hint: "−18% vs previous 30 days" },
  { label: "Leads", value: "486", hint: "₹100 per lead" },
  { label: "Link clicks", value: "3,920", hint: "CPM ₹112.83" },
];

const trend = [
  1210, 1340, 1280, 1460, 1390, 1520, 1610, 1480, 1550, 1700, 1640, 1590, 1720, 1810, 1690, 1580, 1630, 1760, 1880, 1820, 1700, 1650,
  1790, 1920, 2040, 1980, 1860, 1740, 1810, 1520,
];

const campaigns = [
  { name: "Reel · Kumkumadi glow", meta: "Click-to-WhatsApp · Bengaluru, 22–45", spend: "₹21,400", share: 44, results: "642 results · ₹33.33 each" },
  { name: "Diwali carousel", meta: "Click-to-WhatsApp · Karnataka, women 25–44", spend: "₹15,820", share: 33, results: "488 results · ₹32.42 each" },
  { name: "Hair oil · Lookalike 1%", meta: "Instagram Direct · India", spend: "₹11,400", share: 23, results: "282 results · ₹40.43 each" },
];

type Stage = { label: string; value: string; rate?: string; icon: LucideIcon; width: number };

const stages: Stage[] = [
  { label: "Ad click", value: "12,238", icon: MousePointerClick, width: 100 },
  { label: "Conversation", value: "1,412", rate: "11.5%", icon: MessageCircle, width: 80 },
  { label: "Lead", value: "486", rate: "34.4%", icon: UserCheck, width: 62 },
  { label: "Order", value: "173", rate: "35.6%", icon: ShoppingBag, width: 46 },
];

/** Focused crop: "From ad to customer" funnel (~600 design width standalone). */
export function AdFunnelCard({ className, embedded = false }: { className?: string; embedded?: boolean }) {
  return (
    <MCard className={cx(embedded ? "" : "w-[600px]", "flex flex-col", className)}>
      <MCardHeader
        title="From ad to customer"
        sub="Last 30 days · click-to-WhatsApp ads"
        right={
          <MBadge tone="wa">
            <WaIcon className="size-3" /> WhatsApp
          </MBadge>
        }
      />
      <div className={cx("flex flex-col px-4", embedded ? "gap-1.5 pt-3" : "gap-2 pt-4")}>
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className={cx("flex shrink-0 items-center gap-2 text-[12.5px] font-medium text-foreground", embedded ? "w-[104px]" : "w-[124px]")}>
              <s.icon className="size-3.5 text-muted-foreground" />
              {s.label}
            </span>
            <span className="flex flex-1 justify-center">
              <span
                className={cx("flex items-center justify-center rounded-lg text-[12.5px] font-semibold tabular-nums", embedded ? "h-7" : "h-8")}
                style={{
                  width: `${s.width}%`,
                  background: `color-mix(in oklab, var(--chart-${i + 1}) ${i === 3 ? 30 : 20}%, transparent)`,
                  color: "var(--foreground)",
                }}
              >
                {s.value}
              </span>
            </span>
            <span className="w-[52px] shrink-0 text-right text-[11.5px] text-muted-foreground tabular-nums">{s.rate ?? "—"}</span>
          </div>
        ))}
      </div>
      <div className={cx("mt-auto flex items-center gap-4 border-t border-border px-4 text-[12px]", embedded ? "mt-3 py-2.5" : "mt-4 py-3")}>
        <span>
          <span className="text-muted-foreground">Revenue from ads </span>
          <span className="font-semibold text-foreground tabular-nums">₹2,14,600</span>
        </span>
        <span className="text-muted-foreground">173 sales</span>
        <MBadge tone="success" className="ml-auto">
          4.41× return
        </MBadge>
      </div>
    </MCard>
  );
}

/** Campaigns › Ads overview: tiles, daily trend, funnel, top campaigns, platforms. */
export function AdsScreen({ height = 940 }: { height?: number }) {
  return (
    <AppShell active="campaigns" height={height} crumbs={["Campaigns", "Ads"]}>
      <div className="flex flex-col gap-3.5">
        <CampaignsHeader
          tab={2}
          sub="Ads that open a chat on WhatsApp or Instagram."
          right={<MButton icon={ExternalLink}>Create a click-to-WhatsApp ad in Ads Manager</MButton>}
        />
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <TabRow items={["Overview", "Campaigns", "Audiences", "Leads", "Automation"]} />
          </div>
          <Segmented items={["Last 7 days", "Last 30 days", "Last 90 days", "Custom"]} active={1} className="mb-1.5 p-[2px]" />
        </div>

        <div className="grid grid-cols-4 gap-3">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-xl border border-border bg-card p-3.5">
              <p className="text-[12px] font-medium text-muted-foreground">{t.label}</p>
              <p className="mt-1 text-[20px] leading-tight font-bold text-foreground tabular-nums">{t.value}</p>
              <p
                className={cx(
                  "mt-0.5 text-[12px]",
                  t.hint.startsWith("−") ? "font-medium text-success" : "text-muted-foreground",
                )}
              >
                {t.hint}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1.45fr_1fr] gap-3">
          <MCard className="p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-[14px] font-semibold text-foreground">Daily trend</p>
              <Segmented items={["Spend", "Conversations", "Leads", "Link clicks"]} className="p-[2px] [&>span]:h-7 [&>span]:px-2.5 [&>span]:text-[12px]" />
            </div>
            <BarChart values={trend} width={540} height={128} color="var(--chart-1)" highlight={24} />
            <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground tabular-nums">
              <span>Oct 24</span>
              <span>Oct 31</span>
              <span>Nov 7</span>
              <span>Nov 14</span>
              <span>Nov 22</span>
            </div>
          </MCard>
          <AdFunnelCard embedded />
        </div>

        <div className="grid grid-cols-[1.45fr_1fr] gap-3">
          <MCard className="p-4">
            <p className="text-[14px] font-semibold text-foreground">Top campaigns by spend</p>
            <ul className="mt-3 flex flex-col gap-2">
              {campaigns.map((c) => (
                <li key={c.name} className="flex items-center gap-3">
                  <div className="w-[230px] min-w-0">
                    <p className="truncate text-[13px] font-medium text-foreground">{c.name}</p>
                    <p className="truncate text-[11.5px] text-muted-foreground">{c.meta}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block h-1.5 overflow-hidden rounded-full bg-muted">
                      <span className="block h-full rounded-full bg-primary" style={{ width: `${c.share * 2}%` }} />
                    </span>
                    <p className="mt-1 text-[11px] text-muted-foreground tabular-nums">{c.results}</p>
                  </div>
                  <span className="w-[68px] text-right text-[13px] font-semibold text-foreground tabular-nums">{c.spend}</span>
                </li>
              ))}
            </ul>
          </MCard>
          <MCard className="p-4">
            <p className="text-[14px] font-semibold text-foreground">Where your ads ran</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">Share of impressions by platform</p>
            <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-muted">
              <span className="bg-ig" style={{ width: "61%" }} />
              <span className="bg-chart-1" style={{ width: "34%" }} />
              <span className="bg-chart-2" style={{ width: "5%" }} />
            </div>
            <ul className="mt-3 flex flex-col gap-1.5 text-[12.5px]">
              {[
                { p: "Instagram", dot: "bg-ig", s: "₹29,660", r: "905" },
                { p: "Facebook", dot: "bg-chart-1", s: "₹16,530", r: "461" },
                { p: "Messenger", dot: "bg-chart-2", s: "₹2,430", r: "46" },
              ].map((x) => (
                <li key={x.p} className="flex items-center gap-2">
                  <span className={cx("size-2 rounded-full", x.dot)} />
                  <span className="flex-1 text-foreground">{x.p}</span>
                  <span className="w-[64px] text-right text-muted-foreground tabular-nums">{x.s}</span>
                  <span className="w-[72px] text-right text-muted-foreground tabular-nums">{x.r} results</span>
                </li>
              ))}
            </ul>
          </MCard>
        </div>
      </div>
    </AppShell>
  );
}
