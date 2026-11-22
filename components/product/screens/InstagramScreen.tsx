import {
  ArrowRight,
  AtSign,
  Bookmark,
  CheckCircle2,
  Circle,
  Clock,
  Heart,
  Link2,
  Mail,
  MessageCircle,
  MessageSquare,
  Play,
  Plus,
  Send,
  Sparkles,
  UserPlus,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cx } from "@/components/ui/cx";
import { demoWorkspace } from "@/content/demo";
import { AppShell } from "../AppShell";
import { Sparkline } from "../charts";
import { PBubble, PButtons, PhoneFrame, PSystem } from "../Phone";
import { IgIcon, MAvatar, MBadge, MButton, MCard, MCardHeader, PageTitle, TabRow } from "../primitives";

/*
 * Automation › Instagram tools › Instagram home, as on the live CRM:
 * Start here cards, Your last 7 days, top automations, Account defaults and
 * Next moves. Plus the customer side: comment keyword → DM → follow gate → lead.
 */

const startHere: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Link2, title: "Auto-DM links from comments", body: "Send a link to everyone who comments a keyword." },
  { icon: UserPlus, title: "Grow followers from comments", body: "Ask people to follow you before you send the reward." },
  { icon: Mail, title: "Leads from story replies", body: "Collect emails from people who reply to your story." },
];

const last7 = [
  { label: "Automated messages", value: "3,482", note: "+22% vs last week", series: [310, 362, 401, 455, 520, 611, 823] },
  { label: "Comments replied", value: "1,126", note: "on 9 posts and reels", series: [98, 120, 141, 133, 180, 204, 250] },
  { label: "Leads collected", value: "214", note: "Top: Diwali glow guide", series: [12, 19, 24, 28, 33, 41, 57] },
  { label: "Time saved", value: "≈ 29 h 1 min", note: "Estimated at 30 seconds per automated message.", series: [2.6, 3, 3.3, 3.8, 4.3, 5.1, 6.9] },
];

const topFlows = [
  { name: "PRICE on Kumkumadi reel", kind: "Comment → DM", runs: "1,284 runs", tone: 5 as const },
  { name: "Follow to unlock 20% off", kind: "Follow gate", runs: "862 runs", tone: 1 as const },
  { name: "Story reply: glow guide", kind: "Lead form", runs: "214 leads", tone: 3 as const },
  { name: "GUIDE on hair-fall post", kind: "Comment → DM", runs: "498 runs", tone: 2 as const },
];

const defaults = [
  { label: "Default reply", on: true },
  { label: "Conversation starters", on: true },
  { label: "Main menu", on: true },
  { label: "Story mention reply", on: false },
];

const nextMoves: [string, boolean][] = [
  ["Add conversation starters", true],
  ["Set up the chat menu", true],
  ["Turn on a default reply", true],
  ["Create a ref link", false],
  ["Reply to comments with AI", false],
  ["Collect leads with an automation", true],
];

/** Automation › Instagram tools: the Instagram home screen. */
export function InstagramScreen({ height = 860 }: { height?: number }) {
  return (
    <AppShell active="automation" crumbs={["Automation", "Instagram tools"]} height={height}>
      <div className="flex flex-col gap-4">
        <TabRow items={["Home", "Automations", "Comments", "Basics", "Sequences", "Ref links"]} />
        <PageTitle
          title="Instagram home"
          sub="Your automations, results and next steps in one place."
          right={
            <span className="flex items-center gap-2">
              <span className="flex h-8 items-center gap-2 rounded-full border border-border bg-card px-3 text-[12.5px] font-medium text-foreground">
                <IgIcon className="size-3.5 text-ig" /> {demoWorkspace.instagram}
                <span className="size-1.5 rounded-full bg-success" />
              </span>
              <MButton icon={Plus}>New automation</MButton>
            </span>
          }
        />

        <div>
          <p className="mb-2 text-[13px] font-semibold text-foreground">Start here</p>
          <div className="grid grid-cols-3 gap-3">
            {startHere.map((s) => (
              <MCard key={s.title} className="flex flex-col p-4">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-[color-mix(in_oklab,var(--ig)_12%,transparent)] text-ig">
                  <s.icon className="size-4" />
                </span>
                <p className="mt-2.5 text-[13.5px] font-semibold text-foreground">{s.title}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{s.body}</p>
                <span className="mt-3 flex items-center gap-1 text-[12.5px] font-medium text-primary">
                  Set up <ArrowRight className="size-3.5" />
                </span>
              </MCard>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[13px] font-semibold text-foreground">Your last 7 days</p>
            <span className="text-[12px] text-muted-foreground">Nov 16 – 22</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {last7.map((s) => (
              <div key={s.label} className="flex min-w-0 flex-col gap-1 rounded-xl border border-border bg-card p-4">
                <p className="truncate text-[12px] font-medium text-muted-foreground">{s.label}</p>
                <div className="flex items-end justify-between gap-2">
                  <p className="text-[22px] leading-tight font-bold tracking-tight whitespace-nowrap text-foreground tabular-nums">{s.value}</p>
                  <Sparkline values={s.series} width={70} height={26} color="var(--ig)" />
                </div>
                <p className="truncate text-[11.5px] text-muted-foreground">{s.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-3">
          <MCard>
            <MCardHeader title="Top automations" right={<span className="text-[12px] font-medium text-primary">See all</span>} />
            <ul className="flex flex-col px-4 pt-2 pb-3">
              {topFlows.map((f) => (
                <li key={f.name} className="flex items-center gap-2.5 border-b border-border/60 py-2 last:border-b-0">
                  <MAvatar initials={f.kind === "Lead form" ? "LF" : f.kind === "Follow gate" ? "FG" : "CD"} tone={f.tone} size={28} />
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[12.5px] font-semibold text-foreground">{f.name}</span>
                    <span className="block text-[11px] text-muted-foreground">{f.kind}</span>
                  </span>
                  <span className="text-[12px] font-medium text-foreground tabular-nums">{f.runs}</span>
                </li>
              ))}
            </ul>
          </MCard>

          <MCard>
            <MCardHeader title="Account defaults" sub="Always-on replies for your account." />
            <ul className="flex flex-col px-4 pt-2 pb-3">
              {defaults.map((d) => (
                <li key={d.label} className="flex items-center justify-between border-b border-border/60 py-2 text-[12.5px] last:border-b-0">
                  <span className="text-foreground">{d.label}</span>
                  <MBadge tone={d.on ? "success" : "outline"}>{d.on ? "On" : "Off"}</MBadge>
                </li>
              ))}
            </ul>
          </MCard>

          <MCard>
            <MCardHeader title="Next moves" sub="4 of 6 done" />
            <ul className="flex flex-col gap-1.5 px-4 pt-2.5 pb-4 text-[12.5px]">
              {nextMoves.map(([label, done]) => (
                <li key={label} className="flex items-center gap-2">
                  {done ? <CheckCircle2 className="size-4 shrink-0 text-primary" /> : <Circle className="size-4 shrink-0 text-input" />}
                  <span className={done ? "text-muted-foreground line-through" : "text-foreground"}>{label}</span>
                </li>
              ))}
            </ul>
          </MCard>
        </div>
      </div>
    </AppShell>
  );
}

/** Customer view on Instagram: comment keyword → DM with link → follow gate → lead. */
export function InstagramDmPhone({ height = 600 }: { height?: number }) {
  return (
    <PhoneFrame title="prakriti.naturals" subtitle="Instagram · Business" channel="instagram" height={height}>
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-2">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-2">
          <span className="relative inline-flex h-11 w-9 shrink-0 items-center justify-center rounded-md bg-[color-mix(in_oklab,var(--chart-5)_16%,transparent)] text-chart-5">
            <Play className="size-3.5 fill-current" />
          </span>
          <span className="min-w-0 flex-1 text-[11px] leading-snug">
            <span className="block text-muted-foreground">You commented on a reel</span>
            <span className="block font-semibold text-foreground">“PRICE”</span>
          </span>
          <MBadge tone="ig">Reel</MBadge>
        </div>
        <PBubble from="business" time="7:02 pm">
          Hi Rohit 🌿 Thanks for asking! Follow us first and we&apos;ll send the price with 20% off.
        </PBubble>
        <PButtons labels={["I'm following now"]} />
        <PBubble from="customer" time="7:03 pm">
          I&apos;m following now
        </PBubble>
        <PBubble from="business" time="7:03 pm">
          Here it is: Kumkumadi Face Oil, ₹1,250 <span className="text-muted-foreground line-through">₹1,490</span>. Code GLOW20 is applied at checkout.
        </PBubble>
        <PButtons labels={["Shop Kumkumadi oil"]} link />
        <PBubble from="business">Want our free night-care routine? Reply with your email.</PBubble>
        <PBubble from="customer" time="7:04 pm">
          rohit.s@example.com
        </PBubble>
        <PSystem>✓ Lead saved · Tagged “Reel offer”</PSystem>
      </div>
    </PhoneFrame>
  );
}

const comments = [
  { user: "kavya.glows", initials: "KG", text: "Looks so good 😍 is it for oily skin?", time: "3m", tone: 3 as const },
  { user: "rohit.sharma_", initials: "RS", text: "PRICE", time: "2m", tone: 5 as const, match: true },
  { user: "meghna.r", initials: "MR", text: "Ordered last week, love it!", time: "1m", tone: 2 as const },
];

/** A post with comments; the keyword comment is highlighted and linked to the DM it triggered (~620 wide). */
export function CommentToDmCard({ width = 620 }: { width?: number }) {
  return (
    <div className="grid grid-cols-[1fr_44px_236px] items-center text-left" style={{ width }}>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sheet">
        <div className="flex items-center gap-2 px-3 py-2.5">
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--chart-3)_16%,transparent)] text-success ring-2 ring-ig/40">
            <Sparkles className="size-3.5" />
          </span>
          <span className="leading-tight">
            <span className="block text-[12px] font-semibold text-foreground">prakriti.naturals</span>
            <span className="block text-[10.5px] text-muted-foreground">Reel · Kumkumadi night ritual</span>
          </span>
          <MBadge tone="ig" className="ml-auto">
            <Zap className="size-3" /> Automation on
          </MBadge>
        </div>
        <div className="relative flex h-[120px] items-center justify-center bg-[color-mix(in_oklab,var(--chart-5)_14%,transparent)] text-chart-5">
          <Sparkles className="size-10" strokeWidth={1.4} />
          <span className="absolute inline-flex size-9 items-center justify-center rounded-full bg-card/85 text-foreground">
            <Play className="size-4 fill-current" />
          </span>
          <span className="absolute bottom-2 left-3 rounded-full bg-foreground/70 px-2 py-0.5 text-[10px] font-medium text-background">
            Comment PRICE for the price
          </span>
        </div>
        <div className="flex items-center gap-3 px-3 pt-2 text-foreground">
          <Heart className="size-4" />
          <MessageCircle className="size-4" />
          <Send className="size-4" />
          <Bookmark className="ml-auto size-4" />
        </div>
        <p className="px-3 pt-1 text-[11.5px] font-semibold text-foreground">2,846 likes · 1,284 comments</p>
        <ul className="flex flex-col gap-1.5 px-3 pt-2 pb-3">
          {comments.map((c) => (
            <li
              key={c.user}
              className={cx("flex items-start gap-2 rounded-lg px-1.5 py-1", c.match && "bg-[color-mix(in_oklab,var(--ig)_10%,transparent)] ring-1 ring-ig/40")}
            >
              <MAvatar initials={c.initials} tone={c.tone} size={22} />
              <span className="min-w-0 flex-1 text-[11.5px] leading-snug">
                <span className="font-semibold text-foreground">{c.user}</span>{" "}
                <span className={c.match ? "font-semibold text-ig" : "text-foreground"}>{c.text}</span>
                <span className="mt-0.5 flex items-center gap-2 text-[10px] text-muted-foreground">
                  {c.time} · Reply
                  {c.match ? <MBadge tone="ig">Keyword: PRICE</MBadge> : null}
                </span>
                {c.match ? (
                  <span className="mt-1 flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
                    <AtSign className="size-3" />
                    <span className="font-semibold text-foreground">prakriti.naturals</span> Sent you a DM 💌
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center gap-1">
        <svg viewBox="0 0 44 20" className="h-5 w-11 text-ig" aria-hidden>
          <path d="M2 10h34" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3" fill="none" />
          <path d="M34 4l7 6-7 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="flex items-center gap-0.5 text-[9.5px] font-medium text-muted-foreground">
          <Clock className="size-2.5" /> 2s
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sheet">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
          <MAvatar initials="RS" tone={5} size={26} channel="instagram" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[12px] font-semibold text-foreground">rohit.sharma_</span>
            <span className="block text-[10px] text-muted-foreground">Direct message · sent automatically</span>
          </span>
        </div>
        <div className="flex flex-col gap-2 bg-chat px-3 py-3">
          <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2 text-[11.5px] leading-snug text-foreground">
            Hi Rohit 🌿 Here&apos;s the Kumkumadi Face Oil from the reel: ₹1,250 today (was ₹1,490).
          </div>
          <span className="flex h-8 max-w-[92%] items-center justify-center gap-1.5 rounded-xl border border-border bg-card text-[11.5px] font-medium text-primary">
            <Link2 className="size-3" /> Shop now
          </span>
          <span className="mt-1 flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
            <MessageSquare className="size-3" /> Opened in Inbox as a new lead
          </span>
        </div>
        <div className="grid grid-cols-2 border-t border-border text-center">
          <span className="border-r border-border px-2 py-2">
            <span className="block text-[14px] font-bold text-foreground tabular-nums">1,284</span>
            <span className="block text-[10px] text-muted-foreground">DMs sent</span>
          </span>
          <span className="px-2 py-2">
            <span className="flex items-center justify-center gap-1 text-[14px] font-bold text-foreground tabular-nums">
              <Users className="size-3 text-ig" /> 862
            </span>
            <span className="block text-[10px] text-muted-foreground">New followers</span>
          </span>
        </div>
      </div>
    </div>
  );
}
