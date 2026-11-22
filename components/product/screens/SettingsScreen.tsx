import {
  CheckCircle2,
  Copy,
  CreditCard,
  Download,
  FileSpreadsheet,
  KeyRound,
  Megaphone,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
  Video,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/components/ui/cx";
import { demoWorkspace } from "@/content/demo";
import { AppShell } from "../AppShell";
import { IgIcon, MAvatar, MBadge, MButton, MCard, MTable, WaIcon } from "../primitives";

/*
 * The CRM's Settings (BODHINOX_CHAT/src/components/settings/**:
 * settings-rail.tsx, integrations-section.tsx, integrations/health-card.tsx,
 * audit-log/audit-log-table.tsx, role-meta.ts, numbers/numbers-list.tsx,
 * api-keys-settings.tsx, webhooks-settings.tsx).
 */

const railGroups: { label: string; items: string[] }[] = [
  { label: "You", items: ["Your profile", "Login & security", "Notifications", "Appearance", "Privacy & access"] },
  {
    label: "Workspace",
    items: ["Workspace", "Channels", "Team members", "Inbox", "Media library", "Quick replies", "Fields & tags", "Conversion events", "Deals & currency", "AI assistant"],
  },
  { label: "Account", items: ["Plan & usage", "Integrations", "Ads", "API & webhooks", "Audit log"] },
];

function SettingsRail({ active }: { active: string }) {
  return (
    <nav className="flex w-[196px] shrink-0 flex-col gap-2.5 border-r border-border py-5 pr-3 pl-4">
      {railGroups.map((g) => (
        <div key={g.label}>
          <p className="px-2.5 pb-1 text-[11px] font-semibold text-muted-foreground">{g.label}</p>
          <ul className="flex flex-col">
            {g.items.map((i) => (
              <li
                key={i}
                className={cx(
                  "flex h-[26px] items-center rounded-md px-2.5 text-[12.5px]",
                  i === active ? "bg-primary-soft font-semibold text-primary-strong" : "text-muted-foreground",
                )}
              >
                {i}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

const integrations: { name: string; desc: string; icon: LucideIcon; connected: boolean; tone: string; meta?: string }[] = [
  { name: "Shopify", desc: "Sync your store, orders and abandoned carts", icon: ShoppingBag, connected: true, tone: "bg-success-soft text-success", meta: "prakriti-naturals.myshopify.com" },
  { name: "WooCommerce", desc: "Bring in orders from your WordPress shop", icon: Store, connected: false, tone: "bg-[color-mix(in_oklab,var(--chart-5)_14%,transparent)] text-chart-5" },
  { name: "Razorpay", desc: "Send payment links and track payments", icon: CreditCard, connected: true, tone: "bg-primary-soft text-primary", meta: "Live mode · UPI, cards" },
  { name: "Zoom", desc: "Add meeting links to booked appointments", icon: Video, connected: true, tone: "bg-primary-soft text-primary", meta: "lakshmi@prakriti.shop" },
  { name: "Shiprocket", desc: "Create shipments and send tracking updates", icon: Truck, connected: true, tone: "bg-[color-mix(in_oklab,var(--chart-4)_18%,transparent)] text-warning", meta: "Pickup: Indiranagar" },
  { name: "Google Sheets", desc: "Add rows to a sheet from your flows", icon: FileSpreadsheet, connected: false, tone: "bg-success-soft text-success" },
  { name: "Webhooks", desc: "Send events to your own systems as they happen", icon: Webhook, connected: true, tone: "bg-muted text-foreground", meta: "2 endpoints" },
];

const health: { name: string; icon: LucideIcon | "wa" | "ig"; detail: string; state: "Healthy" | "Needs attention" }[] = [
  { name: "WhatsApp number", icon: "wa", detail: "Last success 5 min ago", state: "Healthy" },
  { name: "Instagram", icon: "ig", detail: "Access expires in 2 months", state: "Healthy" },
  { name: "Meta Ads", icon: Megaphone, detail: "Last success 1 h ago", state: "Healthy" },
  { name: "Shopify", icon: ShoppingBag, detail: "Last success 2 min ago", state: "Healthy" },
  { name: "Razorpay payments", icon: CreditCard, detail: "Last success 14 min ago", state: "Healthy" },
  { name: "Courier", icon: Truck, detail: "Last error: pickup_pincode_invalid", state: "Needs attention" },
];

function HealthIcon({ icon }: { icon: LucideIcon | "wa" | "ig" }) {
  if (icon === "wa") return <WaIcon className="size-3.5 text-wa" />;
  if (icon === "ig") return <IgIcon className="size-3.5 text-ig" />;
  const I = icon;
  return <I className="size-3.5 text-muted-foreground" />;
}

/** Settings › Integrations, with the integration health panel. */
export function IntegrationsScreen({ height = 760 }: { height?: number }) {
  return (
    <AppShell active="settings" height={height} crumbs={["Settings", "Integrations"]} flush>
      <div className="flex h-full">
        <SettingsRail active="Integrations" />
        <div className="flex min-w-0 flex-1 gap-4 overflow-hidden px-6 py-5">
          <div className="min-w-0 flex-1">
            <h3 className="text-[22px] leading-tight font-bold tracking-[-0.02em] text-foreground">Integrations</h3>
            <p className="mt-1 text-[13px] text-muted-foreground">Connect the tools you already use.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {integrations.map((it) => (
                <MCard key={it.name} className="flex flex-col gap-2.5 p-3.5">
                  <div className="flex items-start gap-2.5">
                    <span className={cx("inline-flex size-9 shrink-0 items-center justify-center rounded-[10px]", it.tone)}>
                      <it.icon className="size-[18px]" strokeWidth={1.9} />
                    </span>
                    <div className="min-w-0 flex-1 leading-tight">
                      <p className="text-[13.5px] font-semibold text-foreground">{it.name}</p>
                      <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{it.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    {it.connected ? (
                      <MBadge tone="success">
                        <CheckCircle2 className="size-3" /> Connected
                      </MBadge>
                    ) : (
                      <MBadge tone="outline">Not connected</MBadge>
                    )}
                    {it.meta ? <span className="truncate text-[11px] text-muted-foreground">{it.meta}</span> : null}
                    <MButton variant={it.connected ? "outline" : "primary"} className="ml-auto h-7 px-3 text-[12px]">
                      {it.connected ? "Manage" : "Set up"}
                    </MButton>
                  </div>
                </MCard>
              ))}
            </div>
          </div>

          <MCard className="flex w-[268px] shrink-0 flex-col self-start">
            <div className="flex items-center justify-between px-4 pt-4">
              <p className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">Integration health</p>
              <RefreshCw className="size-3.5 text-muted-foreground" />
            </div>
            <p className="px-4 pt-1 text-[11.5px] leading-snug text-muted-foreground">The last known state of each connection.</p>
            <ul className="mt-3 border-t border-border">
              {health.map((h) => (
                <li key={h.name} className="flex items-center gap-2.5 border-b border-border/70 px-4 py-2.5 last:border-b-0">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <HealthIcon icon={h.icon} />
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[12.5px] font-medium text-foreground">{h.name}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">{h.detail}</span>
                  </span>
                  {h.state === "Healthy" ? (
                    <MBadge tone="success">Healthy</MBadge>
                  ) : (
                    <MBadge tone="warning">Fix</MBadge>
                  )}
                </li>
              ))}
            </ul>
          </MCard>
        </div>
      </div>
    </AppShell>
  );
}

function CardHead({ title, sub, right }: { title: string; sub: string; right?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4">
      <div className="min-w-0">
        <p className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">{title}</p>
        <p className="mt-0.5 text-[12px] text-muted-foreground">{sub}</p>
      </div>
      {right}
    </div>
  );
}

const auditRows = [
  { when: "22 Nov, 10:42", who: "Ananya Rao", initials: "AR", tone: 1, action: "Changed role", target: "Priya Das: agent → admin", ip: "49.207.•••.18" },
  { when: "22 Nov, 10:15", who: "Karthik S", initials: "KS", tone: 2, action: "Exported contacts", target: "Segment “Dry-skin buyers” · 1,284 rows", ip: "106.51.•••.92" },
  { when: "22 Nov, 09:58", who: "Ananya Rao", initials: "AR", tone: 1, action: "Created API key", target: "Shopify sync · messages:send", ip: "49.207.•••.18" },
  { when: "21 Nov, 19:20", who: "Priya Das", initials: "PD", tone: 3, action: "Revoked session", target: "Chrome on Windows · Mysuru", ip: "117.96.•••.40" },
  { when: "21 Nov, 18:04", who: "Ananya Rao", initials: "AR", tone: 1, action: "Turned on 2FA", target: "Workspace policy: required for admins", ip: "49.207.•••.18" },
  { when: "21 Nov, 16:31", who: "Rahul Joshi", initials: "RJ", tone: 4, action: "Deleted template", target: "old_diwali_offer_v1", ip: "103.88.•••.7" },
] as const;

/** Settings › Audit log with search and CSV export. Design width ~620. */
export function AuditLogCard({ height }: { height?: number }) {
  return (
    <MCard className="w-[620px] overflow-hidden text-left shadow-soft">
      <div style={height ? { height } : undefined} className="flex flex-col">
        <CardHead
          title="Audit log"
          sub="Who changed what in this workspace. Kept for 1 year."
          right={
            <MButton variant="outline" icon={Download}>
              Export CSV
            </MButton>
          }
        />
        <div className="flex items-center gap-2 px-5 pb-3">
          <span className="flex h-9 flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 text-[13px] text-muted-foreground">
            <Search className="size-3.5" /> Search actions, people or items…
          </span>
          <MBadge tone="outline" className="h-9 rounded-xl px-3 text-[12.5px] text-foreground">
            Everyone
          </MBadge>
          <MBadge tone="outline" className="h-9 rounded-xl px-3 text-[12.5px] text-foreground">
            Last 7 days
          </MBadge>
        </div>
        <ul className="border-t border-border">
          {auditRows.map((r) => (
            <li key={r.when + r.action} className="grid grid-cols-[96px_1fr_auto] items-center gap-3 border-b border-border/70 px-5 py-2.5 last:border-b-0">
              <span className="text-[11.5px] text-muted-foreground tabular-nums">{r.when}</span>
              <span className="flex min-w-0 items-center gap-2.5">
                <MAvatar initials={r.initials} tone={r.tone} size={26} />
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-[12.5px] text-foreground">
                    <span className="font-semibold">{r.who}</span> · {r.action}
                  </span>
                  <span className="block truncate text-[11.5px] text-muted-foreground">{r.target}</span>
                </span>
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">{r.ip}</span>
            </li>
          ))}
        </ul>
      </div>
    </MCard>
  );
}

type Perm = "full" | "own" | "view" | "none";

const roleCols = ["Owner", "Admin", "Agent", "Viewer"] as const;
const permRows: { label: string; perms: [Perm, Perm, Perm, Perm] }[] = [
  { label: "Reply in inbox", perms: ["full", "full", "own", "none"] },
  { label: "Contacts & export", perms: ["full", "full", "view", "view"] },
  { label: "Campaigns & broadcasts", perms: ["full", "full", "none", "view"] },
  { label: "Automations & AI agents", perms: ["full", "full", "view", "view"] },
  { label: "Orders, refunds & payment links", perms: ["full", "full", "own", "none"] },
  { label: "Analytics", perms: ["full", "full", "own", "view"] },
  { label: "Team, roles & security", perms: ["full", "full", "none", "none"] },
  { label: "Plan, billing & API keys", perms: ["full", "none", "none", "none"] },
];

function PermCell({ p }: { p: Perm }) {
  if (p === "full")
    return (
      <span className="inline-flex size-5 items-center justify-center rounded-full bg-success-soft text-success">
        <CheckCircle2 className="size-3.5" />
      </span>
    );
  if (p === "own") return <MBadge tone="primary">Own chats</MBadge>;
  if (p === "view") return <MBadge tone="neutral">View</MBadge>;
  return <span className="text-[13px] text-muted-foreground">—</span>;
}

/** Roles x permissions matrix. Design width ~620. */
export function RolesCard({ height }: { height?: number }) {
  return (
    <MCard className="w-[620px] overflow-hidden text-left shadow-soft">
      <div style={height ? { height } : undefined} className="flex flex-col">
        <CardHead
          title="Roles & permissions"
          sub="Each person gets one role. Agents only see the chats assigned to them."
          right={
            <MBadge tone="success" className="h-7 px-3">
              <ShieldCheck className="size-3.5" /> 2FA required for admins
            </MBadge>
          }
        />
        <div className="mx-5 mb-5 overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-[1fr_repeat(4,84px)] items-center bg-card-2 px-4 py-2.5 text-[11px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
            <span>Permission</span>
            {roleCols.map((r) => (
              <span key={r} className="text-center">
                {r}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-[1fr_repeat(4,84px)] items-center border-t border-border px-4 py-2 text-[11.5px] text-muted-foreground">
            <span>People</span>
            {["1", "2", "5", "1"].map((n, i) => (
              <span key={i} className="text-center tabular-nums">
                {n}
              </span>
            ))}
          </div>
          {permRows.map((r) => (
            <div key={r.label} className="grid grid-cols-[1fr_repeat(4,84px)] items-center border-t border-border px-4 py-2.5">
              <span className="text-[13px] text-foreground">{r.label}</span>
              {r.perms.map((p, i) => (
                <span key={i} className="flex justify-center">
                  <PermCell p={p} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </MCard>
  );
}

/** Settings › Channels: WhatsApp numbers with quality and tier, plus Instagram. Design width ~520. */
export function NumbersHealthCard({ height }: { height?: number }) {
  const numbers = [
    { number: demoWorkspace.number, name: "Prakriti Naturals", quality: "High", tier: "10K / day", primary: true },
    { number: "+91 80471 90256", name: "Prakriti Consultations", quality: "Medium", tier: "10K / day", primary: false },
  ];
  return (
    <MCard className="w-[520px] overflow-hidden text-left shadow-soft">
      <div style={height ? { height } : undefined} className="flex flex-col">
        <CardHead title="Channels" sub="Your WhatsApp numbers and Instagram account." />
        <ul className="flex flex-col gap-2.5 px-5 pb-5">
          {numbers.map((n) => (
            <li key={n.number} className="rounded-xl border border-border p-3.5">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex size-9 items-center justify-center rounded-[10px] bg-[color-mix(in_oklab,var(--wa)_14%,transparent)] text-wa">
                  <WaIcon className="size-[18px]" />
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-foreground tabular-nums">
                    {n.number}
                    {n.primary ? <MBadge tone="neutral">Default</MBadge> : null}
                  </p>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">{n.name}</p>
                </div>
                <MBadge tone="success">Connected</MBadge>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[11.5px]">
                <div className="rounded-lg bg-muted px-2.5 py-2">
                  <p className="text-muted-foreground">Quality</p>
                  <p className={cx("mt-0.5 flex items-center gap-1.5 text-[13px] font-semibold", n.quality === "High" ? "text-success" : "text-warning")}>
                    <span className={cx("size-1.5 rounded-full", n.quality === "High" ? "bg-success" : "bg-warning")} />
                    {n.quality}
                  </p>
                </div>
                <div className="rounded-lg bg-muted px-2.5 py-2">
                  <p className="text-muted-foreground">Messaging limit</p>
                  <p className="mt-0.5 text-[13px] font-semibold text-foreground tabular-nums">{n.tier}</p>
                </div>
                <div className="rounded-lg bg-muted px-2.5 py-2">
                  <p className="text-muted-foreground">Display name</p>
                  <p className="mt-0.5 text-[13px] font-semibold text-success">Approved</p>
                </div>
              </div>
            </li>
          ))}
          <li className="flex items-center gap-2.5 rounded-xl border border-border p-3.5">
            <span className="inline-flex size-9 items-center justify-center rounded-[10px] bg-[color-mix(in_oklab,var(--ig)_14%,transparent)] text-ig">
              <IgIcon className="size-[18px]" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-[13.5px] font-semibold text-foreground">{demoWorkspace.instagram}</p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">Business account · DMs, comments, story replies · access expires in 2 months</p>
            </div>
            <MBadge tone="success">Healthy</MBadge>
          </li>
        </ul>
      </div>
    </MCard>
  );
}

const apiKeys = [
  { name: "Shopify sync", prefix: "wacrm_live_7Hq2…", scopes: ["messages:send", "contacts:write"], used: "2 min ago", by: "Ananya Rao" },
  { name: "Warehouse dashboard", prefix: "wacrm_live_Kp9x…", scopes: ["contacts:read", "conversations:read"], used: "1 h ago", by: "Karthik S" },
  { name: "Old Zapier", prefix: "wacrm_live_3mRt…", scopes: ["broadcasts:send"], used: "Revoked 12 Oct", by: "Ananya Rao", revoked: true },
];

const endpoints = [
  { url: "https://hooks.prakriti.shop/wa", events: ["message.received", "message.status_updated"], status: "Delivered", last: "200 · 3 s ago" },
  { url: "https://erp.prakriti.shop/api/flows", events: ["flow.completed", "conversation.created"], status: "Retrying", last: "503 · attempt 3 of 10" },
];

/** Settings › API & webhooks: keys with scopes and webhook endpoints. Design width ~620. */
export function ApiKeysCard({ height }: { height?: number }) {
  return (
    <MCard className="w-[620px] overflow-hidden text-left shadow-soft">
      <div style={height ? { height } : undefined} className="flex flex-col">
        <CardHead
          title="API keys"
          sub="A key can do only what its scopes allow. The full key is shown once."
          right={<MButton icon={Plus}>New API key</MButton>}
        />
        <MTable
          className="mx-5"
          head={["Name", "Scopes", "Last used"]}
          colClass={["", "", "text-right whitespace-nowrap"]}
          rows={apiKeys.map((k) => [
            <span key="n" className={cx("flex items-center gap-2.5", k.revoked && "opacity-60")}>
              <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <KeyRound className="size-3.5" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block font-medium">{k.name}</span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                  {k.prefix} <Copy className="size-3" />
                </span>
              </span>
            </span>,
            <span key="s" className={cx("flex flex-wrap gap-1", k.revoked && "opacity-60")}>
              {k.scopes.map((s) => (
                <span key={s} className="inline-flex h-5 items-center rounded-md bg-muted px-1.5 font-mono text-[11px] text-foreground">
                  {s}
                </span>
              ))}
            </span>,
            <span key="u" className="leading-tight">
              {k.revoked ? <MBadge tone="danger">Revoked</MBadge> : <span className="block text-[12.5px]">{k.used}</span>}
              <span className="block text-[11px] text-muted-foreground">{k.by}</span>
            </span>,
          ])}
        />

        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <p className="text-[13.5px] font-semibold text-foreground">Webhook endpoints</p>
          <MButton variant="outline" icon={Plus} className="h-7 px-3 text-[12px]">
            Add endpoint
          </MButton>
        </div>
        <ul className="mx-5 mb-5 overflow-hidden rounded-xl border border-border">
          {endpoints.map((e, i) => (
            <li key={e.url} className={cx("flex items-start gap-3 px-4 py-3", i > 0 && "border-t border-border")}>
              <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Webhook className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-[12px] text-foreground">{e.url}</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {e.events.map((ev) => (
                    <span key={ev} className="inline-flex h-5 items-center rounded-md bg-primary-soft px-1.5 font-mono text-[11px] text-primary-strong">
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
              <span className="flex flex-col items-end gap-1">
                <MBadge tone={e.status === "Delivered" ? "success" : "warning"}>{e.status}</MBadge>
                <span className="font-mono text-[11px] text-muted-foreground">{e.last}</span>
              </span>
              <MoreHorizontal className="mt-1 size-4 text-muted-foreground" />
            </li>
          ))}
        </ul>
      </div>
    </MCard>
  );
}
