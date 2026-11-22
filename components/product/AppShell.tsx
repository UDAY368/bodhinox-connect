import {
  BarChart3,
  Bell,
  Home,
  Megaphone,
  MessageSquare,
  Moon,
  Package,
  PanelLeftClose,
  Search,
  Settings,
  ShoppingBag,
  Store,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/components/ui/cx";
import { demoWorkspace } from "@/content/demo";

/**
 * The CRM's app shell, as on the live dashboard: a flat sidebar on the page
 * background and one raised white sheet holding the top bar and the screen.
 * Sidebar order and groups match production:
 * Home · Inbox · Contacts | Grow: Automation, Campaigns, AI | Sell: Sales,
 * Products, Store | Insights: Analytics | Settings.
 */

export type ShellSection =
  | "home"
  | "inbox"
  | "contacts"
  | "automation"
  | "campaigns"
  | "ai"
  | "sales"
  | "products"
  | "store"
  | "analytics"
  | "settings";

type NavItem = { id: ShellSection; label: string; icon: LucideIcon | "khaga"; badge?: string };

const groups: { label?: string; items: NavItem[] }[] = [
  {
    items: [
      { id: "home", label: "Home", icon: Home },
      { id: "inbox", label: "Inbox", icon: MessageSquare, badge: "12" },
      { id: "contacts", label: "Contacts", icon: Users },
    ],
  },
  {
    label: "Grow",
    items: [
      { id: "automation", label: "Automation", icon: Workflow },
      { id: "campaigns", label: "Campaigns", icon: Megaphone },
      { id: "ai", label: "AI", icon: "khaga" },
    ],
  },
  {
    label: "Sell",
    items: [
      { id: "sales", label: "Sales", icon: ShoppingBag },
      { id: "products", label: "Products", icon: Package },
      { id: "store", label: "Store", icon: Store },
    ],
  },
  { label: "Insights", items: [{ id: "analytics", label: "Analytics", icon: BarChart3 }] },
];

export const sectionLabels: Record<ShellSection, string> = {
  home: "Home",
  inbox: "Inbox",
  contacts: "Contacts",
  automation: "Automation",
  campaigns: "Campaigns",
  ai: "AI",
  sales: "Sales",
  products: "Products",
  store: "Store",
  analytics: "Analytics",
  settings: "Settings",
};

function NavRow({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <li>
      <span
        className={cx(
          "flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium",
          active ? "bg-sidebar-accent text-foreground shadow-raised" : "text-muted-foreground",
        )}
      >
        {item.icon === "khaga" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/brand/khaga-mark-sun-orange.webp" alt="" width={18} height={18} className="size-[18px]" />
        ) : (
          <item.icon className={cx("size-[18px]", active && "text-primary")} strokeWidth={1.9} />
        )}
        <span className="flex-1">{item.label}</span>
        {item.badge ? (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
            {item.badge}
          </span>
        ) : null}
      </span>
    </li>
  );
}

export function Sidebar({ active }: { active: ShellSection }) {
  return (
    <aside className="flex w-[232px] shrink-0 flex-col bg-sidebar">
      <div className="flex h-16 items-center px-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/bodhinox-connect-light@2x.webp" alt="" width={139} height={44} className="logo-light h-11 w-auto" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/bodhinox-connect-dark@2x.webp" alt="" width={139} height={44} className="logo-dark h-11 w-auto" />
      </div>
      <nav className="flex-1 px-3">
        {groups.map((g, gi) => (
          <div key={gi} className={gi ? "mt-3" : ""}>
            {g.label ? <p className="px-3 pb-1 text-[11px] font-semibold text-muted-foreground">{g.label}</p> : null}
            <ul className="flex flex-col gap-0.5">
              {g.items.map((item) => (
                <NavRow key={item.id} item={item} active={item.id === active} />
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="px-3 pb-3">
        <ul className="flex flex-col gap-0.5">
          <NavRow item={{ id: "settings", label: "Settings", icon: Settings }} active={active === "settings"} />
          <li>
            <span className="flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium text-muted-foreground">
              <PanelLeftClose className="size-4" />
              Collapse
            </span>
          </li>
        </ul>
        <div className="mt-2 flex items-center gap-3 rounded-xl px-2.5 py-2">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary-soft-2 text-[13px] font-semibold text-primary-strong">
            {demoWorkspace.ownerInitials}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-foreground">{demoWorkspace.owner}</span>
            <span className="block truncate text-[11px] text-muted-foreground">{demoWorkspace.workspaceLabel}</span>
          </span>
        </div>
      </div>
    </aside>
  );
}

export function TopBar({ crumbs }: { crumbs: string[] }) {
  return (
    <div className="flex h-[60px] shrink-0 items-center gap-3 border-b border-border bg-glass px-6">
      <p className="flex items-center gap-2 text-[13px]">
        {crumbs.map((c, i) => (
          <span key={c} className="flex items-center gap-2">
            {i ? <span className="text-muted-foreground">›</span> : null}
            <span className={i === crumbs.length - 1 ? "font-semibold text-foreground" : "text-muted-foreground"}>{c}</span>
          </span>
        ))}
      </p>
      <span className="ml-auto flex items-center gap-1.5 text-muted-foreground">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-muted">
          <Search className="size-4" />
        </span>
        <span className="relative inline-flex size-8 items-center justify-center rounded-lg">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive" />
        </span>
        <span className="inline-flex size-8 items-center justify-center rounded-lg">
          <Moon className="size-4" />
        </span>
      </span>
    </div>
  );
}

/**
 * Full app frame at its design size (1280 x height). Put it inside a
 * MockStage so it scales. `flush` drops the content padding (inbox).
 */
export function AppShell({
  active,
  crumbs,
  children,
  height = 760,
  flush = false,
}: {
  active: ShellSection;
  crumbs?: string[];
  children: ReactNode;
  height?: number;
  flush?: boolean;
}) {
  return (
    <div className="flex overflow-hidden rounded-[22px] border border-border bg-sidebar text-left shadow-sheet" style={{ height }}>
      <Sidebar active={active} />
      <div className="m-2 ml-0 flex min-w-0 flex-1 flex-col overflow-hidden rounded-[18px] border border-border bg-card shadow-soft">
        <TopBar crumbs={crumbs ?? [sectionLabels[active]]} />
        <div className={cx("min-h-0 flex-1 overflow-hidden", !flush && "px-7 py-6")}>{children}</div>
      </div>
    </div>
  );
}
