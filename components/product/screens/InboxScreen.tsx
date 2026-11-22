import {
  AtSign,
  Bell,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  FileText,
  Filter,
  Image as ImageIcon,
  Mic,
  Paperclip,
  PenSquare,
  Smile,
  Sparkles,
  Tag,
  UserRound,
  Zap,
} from "lucide-react";
import { demoConversations, demoWorkspace } from "@/content/demo";
import { cx } from "@/components/ui/cx";
import { AppShell } from "../AppShell";
import { Chips, IgIcon, MAvatar, MBadge, MButton, SearchField, Ticks, WaIcon, WindowRing } from "../primitives";

const statusTone = {
  Requesting: "warning",
  Assigned: "primary",
  Bot: "neutral",
  Resolved: "outline",
  "Handed off": "danger",
} as const;

function ConversationList({ selected = "c1" }: { selected?: string }) {
  return (
    <div className="flex w-[330px] shrink-0 flex-col border-r border-border">
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="flex items-center gap-1 text-[12px] font-medium text-muted-foreground">
          More views <ChevronDown className="size-3" />
        </span>
        <span className="flex items-center gap-2.5 text-muted-foreground">
          <Filter className="size-3.5" />
          <Bookmark className="size-3.5" />
          <span className="text-[12px] font-medium text-primary">Select</span>
          <PenSquare className="size-3.5" />
        </span>
      </div>
      <div className="px-4 pt-3">
        <SearchField placeholder="Search conversations..." />
      </div>
      <div className="px-4 pt-3">
        <Chips
          items={[
            { label: "All", count: 128 },
            { label: "WhatsApp", count: 97 },
            { label: "Instagram", count: 31 },
          ]}
        />
      </div>
      <div className="flex gap-4 border-b border-border px-4 pt-3 pb-2 text-[11px] font-semibold tracking-[0.04em] text-muted-foreground uppercase">
        <span className="text-foreground">Active (14)</span>
        <span>Requesting (9)</span>
        <span>Intervened (3)</span>
      </div>
      <ul className="flex-1 overflow-hidden">
        {demoConversations.map((c) => (
          <li
            key={c.id}
            className={cx(
              "flex gap-3 border-b border-border/60 px-4 py-3",
              c.id === selected && "bg-primary-soft",
            )}
          >
            <WindowRing left={c.windowLeft ?? 0}>
              <MAvatar initials={c.initials} tone={c.tone} size={34} channel={c.channel} />
            </WindowRing>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-[13px] font-semibold text-foreground">{c.name}</span>
                <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">{c.time}</span>
              </div>
              <p className="mt-0.5 truncate text-[12px] text-muted-foreground">{c.preview}</p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <MBadge tone={statusTone[c.status]}>{c.status}</MBadge>
                {c.label ? <MBadge tone="outline">{c.label}</MBadge> : null}
                {c.unread ? (
                  <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
                    {c.unread}
                  </span>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Bubble({
  out,
  children,
  time,
  read,
  by,
}: {
  out?: boolean;
  children: React.ReactNode;
  time: string;
  read?: boolean;
  by?: string;
}) {
  return (
    <div className={cx("flex flex-col", out ? "items-end" : "items-start")}>
      <div
        className={cx(
          "max-w-[72%] rounded-2xl px-3.5 py-2 text-[13.5px] leading-snug",
          out ? "rounded-br-md bg-bubble-out text-primary-foreground" : "rounded-bl-md bg-bubble-in text-foreground",
        )}
      >
        {children}
        <span className={cx("mt-1 flex items-center justify-end gap-1 text-[10px]", out ? "text-primary-foreground/80" : "text-muted-foreground")}>
          {time}
          {out ? <Ticks read={read} className="size-3 text-primary-foreground" /> : null}
        </span>
      </div>
      {by ? <span className="mt-1 text-[10.5px] text-muted-foreground">{by}</span> : null}
    </div>
  );
}

function Thread() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-5">
        <MAvatar initials="MK" tone={1} size={34} channel="whatsapp" />
        <div className="min-w-0 leading-tight">
          <p className="text-[14px] font-semibold text-foreground">Meera Krishnan</p>
          <p className="text-[11.5px] text-muted-foreground">
            +91 98•••• 4410 · <span className="text-success">Window open · 23h left</span>
          </p>
        </div>
        <span className="ml-auto flex items-center gap-2">
          <MButton variant="outline" icon={UserRound}>
            Karthik S
          </MButton>
          <MButton variant="outline" icon={CheckCircle2}>
            Resolve
          </MButton>
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground">
            <Bell className="size-3.5" />
          </span>
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden bg-chat px-6 py-5">
        <div className="flex justify-center">
          <span className="rounded-full bg-muted px-3 py-0.5 text-[11px] font-medium text-muted-foreground">Today</span>
        </div>
        <Bubble out time="10:02" read by="Wellness Guide · AI">
          Namaste Meera 🌿 Welcome to Prakriti Naturals. What are you looking for today?
        </Bubble>
        <Bubble time="10:03">Is the Kumkumadi oil good for dry skin? I have sensitive skin.</Bubble>
        <Bubble out time="10:03" read by="Wellness Guide · AI">
          Yes. Kumkumadi oil is saffron-based and suits dry and sensitive skin. Use 2–3 drops at night. It is ₹1,250 for 30 ml.
        </Bubble>
        <div className="flex justify-start">
          <div className="w-[260px] overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex h-24 items-center justify-center bg-[color-mix(in_oklab,var(--chart-5)_14%,transparent)] text-chart-5">
              <Sparkles className="size-8" strokeWidth={1.6} />
            </div>
            <div className="px-3 py-2">
              <p className="text-[13px] font-semibold text-foreground">Kumkumadi Face Oil</p>
              <p className="text-[12px] text-muted-foreground">
                ₹1,250 <span className="line-through">₹1,490</span>
              </p>
            </div>
            <div className="border-t border-border py-2 text-center text-[12.5px] font-medium text-primary">View product</div>
          </div>
        </div>
        <Bubble time="10:05">I&apos;ll take one. Can I pay by UPI?</Bubble>
        <div className="flex justify-center">
          <span className="rounded-full bg-muted px-3 py-0.5 text-[11px] font-medium text-muted-foreground">
            Bot paused · Karthik S joined the chat
          </span>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[60%] rounded-2xl rounded-br-md bg-note px-3.5 py-2 text-[12.5px] text-note-foreground">
            <span className="font-semibold">Note</span> · @Priya first order, add a free sample 🎁
          </div>
        </div>
        <div className="flex justify-end">
          <div className="w-[250px] rounded-2xl rounded-br-md bg-bubble-out p-3 text-primary-foreground">
            <p className="flex items-center gap-1.5 text-[12px] font-medium opacity-90">
              <CreditCard className="size-3.5" /> Payment link · Razorpay
            </p>
            <p className="mt-1 text-[20px] font-bold">₹1,250.00</p>
            <p className="text-[11px] opacity-85">Order #PN-2042 · UPI, cards, netbanking</p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-border p-3">
        <div className="rounded-2xl border border-border bg-card px-3 py-2.5 shadow-[0_0_0_3px_var(--primary-soft)]">
          <p className="text-[13px] text-muted-foreground">Type a message, / for quick replies…</p>
          <div className="mt-2 flex items-center gap-3 text-muted-foreground">
            <Paperclip className="size-4" />
            <ImageIcon className="size-4" />
            <Smile className="size-4" />
            <FileText className="size-4" />
            <Zap className="size-4" />
            <Mic className="size-4" />
            <span className="ml-auto flex items-center gap-2">
              <MBadge tone="primary">
                <Sparkles className="size-3" /> Suggest reply
              </MBadge>
              <MButton>Send</MButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="flex w-[280px] shrink-0 flex-col gap-3 overflow-hidden border-l border-border bg-card-2/50 p-4">
      <div className="flex flex-col items-center text-center">
        <MAvatar initials="MK" tone={1} size={56} />
        <p className="mt-2 text-[14px] font-semibold text-foreground">Meera Krishnan</p>
        <p className="text-[12px] text-muted-foreground">Bengaluru · Customer since today</p>
        <div className="mt-2 flex gap-1.5">
          <MBadge tone="wa">
            <WaIcon className="size-3" /> WhatsApp
          </MBadge>
          <MBadge tone="success">Opted in</MBadge>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-3">
        <p className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
          <Sparkles className="size-3.5 text-primary" /> AI summary
        </p>
        <p className="mt-1.5 text-[12px] leading-snug text-muted-foreground">
          New lead asking about dry-skin care. Chose Kumkumadi oil, wants to pay by UPI.
        </p>
        <div className="mt-2 flex items-center gap-2 text-[11px]">
          <MBadge tone="success">Intent: Buy</MBadge>
          <MBadge tone="primary">Lead score 86</MBadge>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-3 text-[12px]">
        <p className="font-semibold text-foreground">Details</p>
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5">
          <dt className="text-muted-foreground">Owner</dt>
          <dd className="text-right text-foreground">Karthik S</dd>
          <dt className="text-muted-foreground">Skin type</dt>
          <dd className="text-right text-foreground">Dry, sensitive</dd>
          <dt className="text-muted-foreground">Source</dt>
          <dd className="text-right text-foreground">Click-to-WhatsApp ad</dd>
          <dt className="text-muted-foreground">Deal</dt>
          <dd className="text-right text-foreground">₹1,250 · Qualified</dd>
        </dl>
      </div>
      <div className="rounded-xl border border-border bg-card p-3">
        <p className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
          <Tag className="size-3.5" /> Labels
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <MBadge tone="primary">New lead</MBadge>
          <MBadge tone="neutral">Skin care</MBadge>
          <MBadge tone="neutral">Diwali ad</MBadge>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-3 text-[12px]">
        <p className="flex items-center gap-1.5 font-semibold text-foreground">
          <AtSign className="size-3.5" /> Handled by
        </p>
        <p className="mt-1.5 text-muted-foreground">Wellness Guide (AI) → Karthik S</p>
      </div>
    </div>
  );
}

/** The live CRM inbox: conversation list, thread, contact panel. */
export function InboxScreen({ height = 760, withPanel = true }: { height?: number; withPanel?: boolean }) {
  return (
    <AppShell active="inbox" height={height} flush crumbs={["Inbox"]}>
      <div className="flex h-full">
        <ConversationList />
        <Thread />
        {withPanel ? <ContactPanel /> : null}
      </div>
    </AppShell>
  );
}

/** Re-exported so other screens can show the same channel markers. */
export const channelLabel = {
  whatsapp: { label: "WhatsApp", icon: WaIcon },
  instagram: { label: "Instagram", icon: IgIcon },
};

export { demoWorkspace };
