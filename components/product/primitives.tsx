import { ArrowDown, ArrowUp, Check, CheckCheck, Minus, Search, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/components/ui/cx";

/*
 * Small building blocks that copy the CRM's UI (BODHINOX_CHAT/src/components/ui/*,
 * dashboard/metric-card.tsx, studio.css). Used only inside product mock-ups,
 * which are decorative images: nothing here is focusable.
 */

export function MCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("rounded-xl border border-border bg-card", className)}>{children}</div>;
}

export function MCardHeader({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 px-4 pt-4">
      <div className="min-w-0">
        <p className="text-[14px] font-semibold tracking-[-0.01em] text-foreground">{title}</p>
        {sub ? <p className="mt-0.5 text-[12px] text-muted-foreground">{sub}</p> : null}
      </div>
      {right}
    </div>
  );
}

type Tone = "primary" | "neutral" | "success" | "warning" | "danger" | "outline" | "solid" | "wa" | "ig";

const badgeTones: Record<Tone, string> = {
  primary: "bg-primary-soft text-primary-strong",
  neutral: "bg-muted text-foreground",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-destructive-soft text-destructive",
  outline: "border border-border text-muted-foreground",
  solid: "bg-primary text-primary-foreground",
  wa: "bg-[color-mix(in_oklab,var(--wa)_14%,transparent)] text-wa",
  ig: "bg-[color-mix(in_oklab,var(--ig)_14%,transparent)] text-ig",
};

export function MBadge({ children, tone = "neutral", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex h-5 shrink-0 items-center gap-1 rounded-full px-2 text-[11px] leading-none font-medium whitespace-nowrap",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function MButton({
  children,
  variant = "primary",
  icon: Icon,
  className,
}: {
  children?: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  icon?: LucideIcon;
  className?: string;
}) {
  const v = {
    primary: "bg-primary text-primary-foreground",
    outline: "border border-border bg-card text-foreground shadow-[0_1px_2px_#0000000a]",
    ghost: "text-muted-foreground",
  }[variant];
  return (
    <span className={cx("inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium whitespace-nowrap", v, className)}>
      {Icon ? <Icon className="size-3.5" strokeWidth={2.2} /> : null}
      {children}
    </span>
  );
}

const avatarTones = {
  1: "bg-primary-soft-2 text-primary-strong",
  2: "bg-[color-mix(in_oklab,var(--chart-3)_20%,transparent)] text-success",
  3: "bg-[color-mix(in_oklab,var(--chart-4)_22%,transparent)] text-warning",
  4: "bg-[color-mix(in_oklab,var(--chart-5)_18%,transparent)] text-chart-5",
  5: "bg-[color-mix(in_oklab,var(--ig)_16%,transparent)] text-ig",
} as const;

export function MAvatar({
  initials,
  tone = 1,
  size = 36,
  channel,
}: {
  initials: string;
  tone?: keyof typeof avatarTones;
  size?: number;
  channel?: "whatsapp" | "instagram";
}) {
  return (
    <span className="relative inline-flex shrink-0">
      <span
        className={cx("inline-flex items-center justify-center rounded-full font-semibold", avatarTones[tone])}
        style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
      >
        {initials}
      </span>
      {channel ? (
        <span
          className={cx(
            "absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-card",
            channel === "whatsapp" ? "bg-wa" : "bg-ig",
          )}
        />
      ) : null}
    </span>
  );
}

/** The CRM's dashboard metric card. */
export function MetricCard({
  title,
  value,
  icon: Icon,
  delta,
  subtitle,
  className,
}: {
  title: string;
  value: string;
  icon: LucideIcon;
  delta?: { sign: number; label: string };
  subtitle?: string;
  className?: string;
}) {
  const tone = !delta ? "" : delta.sign > 0 ? "text-success" : delta.sign < 0 ? "text-destructive" : "text-muted-foreground";
  const Arrow = !delta ? Minus : delta.sign > 0 ? ArrowUp : delta.sign < 0 ? ArrowDown : Minus;
  return (
    <div className={cx("flex min-w-0 flex-col gap-1 rounded-xl border border-border bg-card p-4", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-[12px] font-medium text-muted-foreground">{title}</p>
        <Icon className="size-3.5 shrink-0 text-muted-foreground/70" />
      </div>
      <p className="text-[24px] leading-tight font-bold tracking-tight text-foreground tabular-nums">{value}</p>
      {delta ? (
        <div className={cx("flex items-center gap-1 text-[12px] font-semibold", tone)}>
          <Arrow className="size-3" />
          <span className="tabular-nums">{delta.label}</span>
        </div>
      ) : subtitle ? (
        <p className="text-[12px] text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}

/** Segmented control (the CRM's section tabs). */
export function Segmented({ items, active = 0, className }: { items: ReactNode[]; active?: number; className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-0.5 rounded-xl bg-muted p-[3px]", className)}>
      {items.map((item, i) => (
        <span
          key={i}
          className={cx(
            "inline-flex h-8 items-center gap-1.5 rounded-[9px] px-3 text-[13px] font-medium whitespace-nowrap",
            i === active ? "bg-tab-active text-foreground shadow-[0_1px_3px_rgb(0_0_0/0.12)]" : "text-muted-foreground",
          )}
        >
          {item}
        </span>
      ))}
    </span>
  );
}

/** Underlined tab row, used inside pages (e.g. Products, Categories, Stock). */
export function TabRow({ items, active = 0 }: { items: string[]; active?: number }) {
  return (
    <div className="flex items-center gap-5 border-b border-border text-[13px] font-medium">
      {items.map((t, i) => (
        <span
          key={t}
          className={cx(
            "-mb-px border-b-2 pb-2.5",
            i === active ? "border-primary text-foreground" : "border-transparent text-muted-foreground",
          )}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/** Pill filter chips, e.g. "All 16 · Flows 16 · Rules 0". */
export function Chips({ items, active = 0 }: { items: { label: string; count?: string | number }[]; active?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {items.map((c, i) => (
        <span
          key={c.label}
          className={cx(
            "inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium",
            i === active ? "bg-card text-foreground shadow-[0_1px_3px_rgb(0_0_0/0.12)] ring-1 ring-border" : "bg-muted text-muted-foreground",
          )}
        >
          {c.label}
          {c.count !== undefined ? <span className="text-muted-foreground tabular-nums">{c.count}</span> : null}
        </span>
      ))}
    </span>
  );
}

export function Switch({ on = true }: { on?: boolean }) {
  return (
    <span className={cx("inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5", on ? "bg-primary" : "bg-input")}>
      <span className={cx("size-4 rounded-full bg-white shadow-sm", on && "translate-x-4")} />
    </span>
  );
}

export function SearchField({ placeholder, className }: { placeholder: string; className?: string }) {
  return (
    <span
      className={cx(
        "flex h-9 items-center gap-2 rounded-xl border border-border bg-card px-3 text-[13px] text-muted-foreground shadow-[0_1px_2px_#0000000a]",
        className,
      )}
    >
      <Search className="size-3.5" />
      {placeholder}
    </span>
  );
}

/** The 24-hour customer-service window ring around an avatar. `left` is hours, 0-24. */
export function WindowRing({ left, children }: { left: number; children: ReactNode }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, left / 24));
  const color = pct > 0.4 ? "var(--chart-3)" : pct > 0.15 ? "var(--chart-4)" : "var(--destructive)";
  return (
    <span className="relative inline-flex size-11 items-center justify-center">
      <svg viewBox="0 0 44 44" className="absolute inset-0 size-11 -rotate-90">
        <circle cx="22" cy="22" r={r} fill="none" stroke="var(--border)" strokeWidth="2" />
        <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="2" strokeDasharray={`${c * pct} ${c}`} strokeLinecap="round" />
      </svg>
      {children}
    </span>
  );
}

export function Ticks({ read = true, className }: { read?: boolean; className?: string }) {
  const Icon = read ? CheckCheck : Check;
  return <Icon className={cx("inline size-3.5", read ? "text-chart-2" : "opacity-70", className)} strokeWidth={2.4} />;
}

/** Table with the CRM's header band. */
export function MTable({
  head,
  rows,
  className,
  colClass,
}: {
  head: string[];
  rows: ReactNode[][];
  className?: string;
  /** Optional per-column classes (alignment, width). */
  colClass?: string[];
}) {
  return (
    <div className={cx("overflow-hidden rounded-xl border border-border", className)}>
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="bg-card-2">
            {head.map((h, i) => (
              <th
                key={h + i}
                className={cx(
                  "px-4 py-2.5 text-left text-[11px] font-semibold tracking-[0.06em] text-muted-foreground uppercase",
                  colClass?.[i],
                )}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="border-t border-border">
              {r.map((cell, ci) => (
                <td key={ci} className={cx("px-4 py-3 align-middle text-foreground", colClass?.[ci])}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Page heading used at the top of every CRM screen. */
export function PageTitle({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h3 className="text-[28px] leading-tight font-bold tracking-[-0.025em] text-foreground">{title}</h3>
        {sub ? <p className="mt-1 text-[13px] text-muted-foreground">{sub}</p> : null}
      </div>
      {right}
    </div>
  );
}

/** Token-tinted product thumbnail (no external images). */
export function ProductThumb({ tone = 1, size = 44, icon: Icon }: { tone?: 1 | 2 | 3 | 4 | 5; size?: number; icon: LucideIcon }) {
  const bg = {
    1: "bg-primary-soft text-primary",
    2: "bg-[color-mix(in_oklab,var(--chart-3)_16%,transparent)] text-success",
    3: "bg-[color-mix(in_oklab,var(--chart-4)_18%,transparent)] text-warning",
    4: "bg-[color-mix(in_oklab,var(--chart-5)_14%,transparent)] text-chart-5",
    5: "bg-[color-mix(in_oklab,var(--ig)_12%,transparent)] text-ig",
  }[tone];
  return (
    <span className={cx("inline-flex shrink-0 items-center justify-center rounded-lg", bg)} style={{ width: size, height: size }}>
      <Icon style={{ width: size * 0.45, height: size * 0.45 }} strokeWidth={1.8} />
    </span>
  );
}

/**
 * Simple Instagram-style glyph (lucide 1.x has no brand icons). A rounded
 * square, a lens and a dot, drawn with currentColor.
 */
export function IgIcon({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

/** Simple chat-bubble glyph used as the WhatsApp channel marker. */
export function WaIcon({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" />
      <path d="M9 9.5c.3 2.2 2.3 4.4 4.8 5" />
    </svg>
  );
}
