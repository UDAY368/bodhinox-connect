import {
  CalendarCheck,
  ChevronDown,
  Download,
  Filter,
  Handshake,
  Mail,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Plus,
  ShieldCheck,
  ShoppingBag,
  StickyNote,
  Upload,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cx } from "@/components/ui/cx";
import { AppShell } from "../AppShell";
import { IgIcon, MAvatar, MBadge, MButton, MCard, MTable, PageTitle, SearchField, Segmented, WaIcon } from "../primitives";

/*
 * The CRM's Contacts section (BODHINOX_CHAT/src/components/contacts/**:
 * contacts-header.tsx, segments-tab.tsx, contact-profile.tsx).
 */

type Tone = 1 | 2 | 3 | 4 | 5;

const people: {
  name: string;
  initials: string;
  tone: Tone;
  phone: string;
  channel: "whatsapp" | "instagram";
  tags: string[];
  owner: string;
  consent: boolean;
  seen: string;
  source: string;
}[] = [
  { name: "Meera Krishnan", initials: "MK", tone: 1, phone: "+91 98•••• 4410", channel: "whatsapp", tags: ["New lead", "Skin care"], owner: "Karthik S", consent: true, seen: "2 min ago", source: "Click-to-WhatsApp ad" },
  { name: "Rohit Sharma", initials: "RS", tone: 5, phone: "@rohit.sharma_", channel: "instagram", tags: ["Reel offer"], owner: "Wellness Guide", consent: true, seen: "6 min ago", source: "Instagram comment" },
  { name: "Fatima Sheikh", initials: "FS", tone: 3, phone: "+91 99•••• 2187", channel: "whatsapp", tags: ["Customer", "Repeat"], owner: "Priya Das", consent: true, seen: "14 min ago", source: "Shopify order" },
  { name: "Arjun Menon", initials: "AM", tone: 2, phone: "+91 97•••• 0652", channel: "whatsapp", tags: ["Booking"], owner: "Ananya Rao", consent: true, seen: "32 min ago", source: "Website widget" },
  { name: "Kavya Reddy", initials: "KR", tone: 4, phone: "+91 90•••• 7731", channel: "whatsapp", tags: ["Customer", "Hair care"], owner: "Karthik S", consent: true, seen: "1 h ago", source: "Store checkout" },
  { name: "Sneha Patil", initials: "SP", tone: 4, phone: "@snehapatil.in", channel: "instagram", tags: ["Follower"], owner: "Unassigned", consent: false, seen: "1 h ago", source: "Instagram DM" },
  { name: "Vikram Iyer", initials: "VI", tone: 1, phone: "+91 98•••• 3305", channel: "whatsapp", tags: ["Support"], owner: "Priya Das", consent: true, seen: "2 h ago", source: "Shopify order" },
  { name: "Divya Nair", initials: "DN", tone: 2, phone: "+91 94•••• 6120", channel: "whatsapp", tags: ["Customer", "VIP"], owner: "Ananya Rao", consent: true, seen: "Yesterday", source: "CSV import" },
  { name: "Sanjay Gupta", initials: "SG", tone: 3, phone: "+91 88•••• 9014", channel: "whatsapp", tags: ["Cart abandoned"], owner: "Karthik S", consent: false, seen: "Yesterday", source: "Shopify cart" },
  { name: "Ishita Bose", initials: "IB", tone: 5, phone: "+91 96•••• 4478", channel: "whatsapp", tags: ["Booking", "Diet plan"], owner: "Unassigned", consent: true, seen: "2 days ago", source: "QR code" },
];

function Consent({ on }: { on: boolean }) {
  return on ? <MBadge tone="success">Opted in</MBadge> : <MBadge tone="outline">Opted out</MBadge>;
}

function ChannelIcon({ channel }: { channel: "whatsapp" | "instagram" }) {
  return channel === "whatsapp" ? <WaIcon className="size-3.5 text-wa" /> : <IgIcon className="size-3.5 text-ig" />;
}

/** Contacts › People: the contacts table. */
export function ContactsScreen({ height = 760 }: { height?: number }) {
  return (
    <AppShell active="contacts" height={height} crumbs={["Contacts", "People"]}>
      <div className="flex flex-col gap-4">
        <PageTitle
          title="Contacts"
          sub="Everyone who has messaged you, bought from you or booked with you."
          right={
            <span className="flex gap-2">
              <MButton variant="outline" icon={Upload}>
                Import
              </MButton>
              <MButton variant="outline" icon={Download}>
                Export
              </MButton>
              <MButton icon={Plus}>New contact</MButton>
            </span>
          }
        />
        <Segmented items={["People", "Segments", "Custom fields"]} />
        <div className="flex items-center gap-2">
          <SearchField placeholder="Search name, phone or tag…" className="w-72" />
          {["Tags", "Owner", "Consent", "Source"].map((f) => (
            <span key={f} className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-card px-3 text-[13px] text-foreground">
              {f} <ChevronDown className="size-3.5 text-muted-foreground" />
            </span>
          ))}
          <span className="ml-auto text-[12px] text-muted-foreground tabular-nums">8,412 contacts</span>
        </div>
        <MTable
          head={["Name", "Phone", "Tags", "Owner", "Consent", "Last seen", "Source"]}
          colClass={["w-[210px]", "", "", "", "", "whitespace-nowrap", ""]}
          rows={people.slice(0, 9).map((p) => [
            <span key="n" className="flex items-center gap-2.5">
              <MAvatar initials={p.initials} tone={p.tone} size={30} channel={p.channel} />
              <span className="truncate font-medium">{p.name}</span>
            </span>,
            <span key="p" className="flex items-center gap-1.5 whitespace-nowrap text-muted-foreground tabular-nums">
              <ChannelIcon channel={p.channel} />
              {p.phone}
            </span>,
            <span key="t" className="flex gap-1">
              {p.tags.map((t) => (
                <MBadge key={t} tone={t === "New lead" || t === "VIP" ? "primary" : "neutral"}>
                  {t}
                </MBadge>
              ))}
            </span>,
            <span key="o" className={cx("whitespace-nowrap", p.owner === "Unassigned" && "text-muted-foreground")}>
              {p.owner}
            </span>,
            <Consent key="c" on={p.consent} />,
            <span key="s" className="text-muted-foreground">
              {p.seen}
            </span>,
            <span key="src" className="whitespace-nowrap text-muted-foreground">
              {p.source}
            </span>,
          ])}
        />
      </div>
    </AppShell>
  );
}

type TimelineItem = { icon: LucideIcon; tone: string; title: string; detail: string; when: string; badge?: { label: string; tone: "success" | "primary" | "warning" | "neutral" } };

const timeline: TimelineItem[] = [
  { icon: MessageSquare, tone: "bg-primary-soft text-primary", title: "Asked about Kumkumadi Face Oil", detail: "WhatsApp · answered by Wellness Guide (AI)", when: "Today, 10:03" },
  { icon: Handshake, tone: "bg-[color-mix(in_oklab,var(--chart-4)_18%,transparent)] text-warning", title: "Deal moved to Qualified", detail: "₹1,250 · Skin care starter · Karthik S", when: "Today, 10:06", badge: { label: "Qualified", tone: "warning" } },
  { icon: ShoppingBag, tone: "bg-success-soft text-success", title: "Order #PN-2042 paid", detail: "Kumkumadi Face Oil ×1 · UPI via Razorpay", when: "Today, 10:11", badge: { label: "₹1,250", tone: "success" } },
  { icon: CalendarCheck, tone: "bg-[color-mix(in_oklab,var(--chart-5)_14%,transparent)] text-chart-5", title: "Skin assessment booked", detail: "Sat, 29 Nov · 11:30 am · Dr. Lakshmi", when: "Today, 10:14", badge: { label: "Confirmed", tone: "primary" } },
  { icon: Users, tone: "bg-muted text-muted-foreground", title: "Joined segment “Dry-skin buyers”", detail: "Matched: tag Skin care, ordered in last 30 days", when: "Today, 10:15" },
];

/** A contact's profile: identity, timeline, custom fields, consent record and notes. */
export function ContactProfileScreen({ height = 760 }: { height?: number }) {
  return (
    <AppShell active="contacts" height={height} crumbs={["Contacts", "People", "Meera Krishnan"]}>
      <div className="grid h-full grid-cols-[300px_1fr_280px] gap-4">
        {/* Identity */}
        <div className="flex flex-col gap-3">
          <MCard className="p-4">
            <div className="flex items-start gap-3">
              <MAvatar initials="MK" tone={1} size={52} />
              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-[17px] font-bold tracking-[-0.01em] text-foreground">Meera Krishnan</p>
                <p className="mt-1 text-[12px] text-muted-foreground">Customer since today</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <MBadge tone="primary">New lead</MBadge>
                  <MBadge tone="neutral">Skin care</MBadge>
                  <MBadge tone="neutral">Diwali ad</MBadge>
                </div>
              </div>
              <MoreHorizontal className="size-4 text-muted-foreground" />
            </div>
            <div className="mt-4 flex gap-2">
              <MButton icon={MessageSquare} className="flex-1 justify-center">
                Message
              </MButton>
              <MButton variant="outline" icon={Handshake} className="flex-1 justify-center">
                New deal
              </MButton>
            </div>
            <ul className="mt-4 flex flex-col gap-2.5 border-t border-border pt-3 text-[12.5px]">
              <li className="flex items-center gap-2.5 text-foreground">
                <Phone className="size-3.5 text-muted-foreground" /> +91 98•••• 4410
                <WaIcon className="ml-auto size-3.5 text-wa" />
              </li>
              <li className="flex items-center gap-2.5 text-foreground">
                <Mail className="size-3.5 text-muted-foreground" /> meera.k@•••••.com
              </li>
              <li className="flex items-center gap-2.5 text-foreground">
                <MapPin className="size-3.5 text-muted-foreground" /> Indiranagar, Bengaluru
              </li>
            </ul>
          </MCard>
          <MCard className="p-4 text-[12.5px]">
            <p className="text-[13px] font-semibold text-foreground">Custom fields</p>
            <dl className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
              {[
                ["Skin type", "Dry, sensitive"],
                ["Hair concern", "Hair fall"],
                ["Birthday", "14 March"],
                ["Preferred language", "English, Kannada"],
                ["Lifetime value", "₹1,250"],
                ["Owner", "Karthik S"],
              ].map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </MCard>
        </div>

        {/* Timeline */}
        <MCard className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-4">
            <p className="text-[14px] font-semibold text-foreground">Timeline</p>
            <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <Filter className="size-3.5" /> All activity
            </span>
          </div>
          <div className="flex gap-1.5 px-5 pt-3">
            {["All", "Messages", "Orders", "Deals", "Bookings"].map((c, i) => (
              <span
                key={c}
                className={cx(
                  "inline-flex h-7 items-center rounded-full px-3 text-[12px] font-medium",
                  i === 0 ? "bg-foreground text-background" : "bg-muted text-muted-foreground",
                )}
              >
                {c}
              </span>
            ))}
          </div>
          <ol className="relative mx-5 mt-4 flex flex-col gap-4 pb-5">
            <span className="absolute top-2 bottom-6 left-[15px] w-px bg-border" />
            {timeline
              .slice()
              .reverse()
              .map((t) => (
                <li key={t.title} className="relative flex gap-3">
                  <span className={cx("relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full ring-4 ring-card", t.tone)}>
                    <t.icon className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1 rounded-xl border border-border px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[13px] font-semibold text-foreground">{t.title}</p>
                      {t.badge ? <MBadge tone={t.badge.tone}>{t.badge.label}</MBadge> : null}
                      <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">{t.when}</span>
                    </div>
                    <p className="mt-0.5 text-[12px] text-muted-foreground">{t.detail}</p>
                  </div>
                </li>
              ))}
            <li className="relative flex gap-3">
              <span className="relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground ring-4 ring-card">
                <Plus className="size-3.5" />
              </span>
              <div className="flex-1 rounded-xl border border-dashed border-border px-3.5 py-2.5">
                <p className="text-[13px] font-semibold text-foreground">Contact created</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">From Click-to-WhatsApp ad “Diwali glow sale” · Today, 10:01</p>
              </div>
            </li>
          </ol>
        </MCard>

        {/* Consent + notes */}
        <div className="flex flex-col gap-3">
          <MCard className="p-4 text-[12.5px]">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
                <ShieldCheck className="size-4 text-success" /> Consent
              </p>
              <MBadge tone="success">Opted in</MBadge>
            </div>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
              <dt className="text-muted-foreground">Marketing</dt>
              <dd className="text-right text-foreground">WhatsApp · Opted in</dd>
              <dt className="text-muted-foreground">Source</dt>
              <dd className="text-right text-foreground">Ad form checkbox</dd>
              <dt className="text-muted-foreground">Recorded</dt>
              <dd className="text-right text-foreground">22 Nov 2026, 10:01</dd>
              <dt className="text-muted-foreground">Instagram</dt>
              <dd className="text-right text-muted-foreground">Not linked</dd>
            </dl>
            <p className="mt-3 rounded-lg bg-muted px-2.5 py-2 text-[11.5px] leading-snug text-muted-foreground">
              Replying STOP opts her out of marketing. Service replies still work.
            </p>
          </MCard>
          <MCard className="flex flex-1 flex-col p-4">
            <p className="flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
              <StickyNote className="size-4 text-muted-foreground" /> Notes
            </p>
            <div className="mt-3 rounded-xl bg-note px-3 py-2.5 text-[12.5px] leading-snug text-note-foreground">
              First order. Added a free Rose Water Toner sample 🎁
              <p className="mt-1.5 text-[11px] opacity-75">Priya Das · 10:12</p>
            </div>
            <div className="mt-2 rounded-xl bg-note px-3 py-2.5 text-[12.5px] leading-snug text-note-foreground">
              Prefers evening calls after 6 pm.
              <p className="mt-1.5 text-[11px] opacity-75">Karthik S · 10:16</p>
            </div>
            <span className="mt-auto flex h-9 items-center rounded-xl border border-border px-3 text-[12.5px] text-muted-foreground">
              Add a note, @ to mention…
            </span>
          </MCard>
        </div>
      </div>
    </AppShell>
  );
}

const segments = [
  { name: "Dry-skin buyers", rule: "Tag is Skin care · ordered in last 30 days", count: "1,284", delta: "+46 this week", tone: 1 },
  { name: "Abandoned cart, 24 h", rule: "Shopify cart abandoned · no order since · opted in", count: "212", delta: "+18 today", tone: 3 },
  { name: "Clicked Diwali broadcast, no order", rule: "Retargeting by campaign: Diwali glow sale · clicked · not purchased", count: "937", delta: "Live", tone: 4 },
  { name: "VIP, spent over ₹5,000", rule: "Lifetime value > ₹5,000 · last order within 90 days", count: "348", delta: "+5 this week", tone: 2 },
  { name: "Instagram reel leads", rule: "Source is Instagram comment · keyword PRICE", count: "1,906", delta: "+122 this week", tone: 5 },
] as const;

/** Contacts › Segments: saved segments with live counts. Design width ~620. */
export function SegmentsCard({ height }: { height?: number }) {
  return (
    <MCard className="w-[620px] overflow-hidden text-left shadow-soft">
      <div style={height ? { height } : undefined} className="flex flex-col">
        <div className="flex items-start justify-between gap-3 px-5 pt-5">
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">Segments</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">Counts update live as contacts match. Opted-out contacts are never sent to.</p>
          </div>
          <MButton variant="outline" icon={Plus}>
            New segment
          </MButton>
        </div>
        <ul className="mt-4 border-t border-border">
          {segments.map((s) => (
            <li key={s.name} className="flex items-center gap-3 border-b border-border/70 px-5 py-3 last:border-b-0">
              <span
                className={cx(
                  "inline-flex size-9 shrink-0 items-center justify-center rounded-lg",
                  {
                    1: "bg-primary-soft text-primary",
                    2: "bg-[color-mix(in_oklab,var(--chart-3)_16%,transparent)] text-success",
                    3: "bg-[color-mix(in_oklab,var(--chart-4)_18%,transparent)] text-warning",
                    4: "bg-[color-mix(in_oklab,var(--chart-5)_14%,transparent)] text-chart-5",
                    5: "bg-[color-mix(in_oklab,var(--ig)_12%,transparent)] text-ig",
                  }[s.tone],
                )}
              >
                <Users className="size-4" />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[13.5px] font-semibold text-foreground">{s.name}</span>
                <span className="mt-0.5 block truncate text-[12px] text-muted-foreground">{s.rule}</span>
              </span>
              <span className="flex flex-col items-end leading-tight">
                <span className="flex items-center gap-1.5 text-[17px] font-bold text-foreground tabular-nums">
                  <span className="size-1.5 rounded-full bg-success" />
                  {s.count}
                </span>
                <span className="text-[11px] text-muted-foreground">{s.delta}</span>
              </span>
              <MButton variant="outline" className="h-7 px-3 text-[12px]">
                Send campaign
              </MButton>
            </li>
          ))}
        </ul>
      </div>
    </MCard>
  );
}
