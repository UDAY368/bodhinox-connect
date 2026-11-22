import { ChevronLeft, ExternalLink, MoreVertical, Phone as PhoneIcon, Video } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/components/ui/cx";
import { Ticks } from "./primitives";

/*
 * Customer-side phone previews (template, form, storefront, booking and
 * Instagram previews in the CRM sit on a phone like this over the
 * drawing-board grid). Neutral chrome, not a copy of any messaging app.
 */

export function PhoneFrame({
  title,
  subtitle,
  channel = "whatsapp",
  children,
  className,
  height = 560,
}: {
  title: string;
  subtitle?: string;
  channel?: "whatsapp" | "instagram" | "web";
  children: ReactNode;
  className?: string;
  height?: number;
}) {
  return (
    <div
      className={cx("w-[300px] rounded-[40px] border border-input bg-card p-2.5 shadow-sheet", className)}
      style={{ height }}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[32px] border border-border bg-background">
        <div className="flex h-7 items-center justify-between px-6 pt-1 text-[11px] font-semibold text-foreground">
          <span>9:41</span>
          <span className="h-4 w-16 rounded-full bg-foreground/90" />
          <span className="tabular-nums">5G</span>
        </div>
        {channel === "web" ? null : (
          <div className="flex items-center gap-2 border-b border-border bg-card px-3 py-2.5">
            <ChevronLeft className="size-4 text-primary" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/bodhinox-mark@2x.webp" alt="" width={28} height={28} className="size-7 rounded-full bg-muted p-0.5" />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[13px] font-semibold text-foreground">{title}</span>
              {subtitle ? <span className="block truncate text-[10px] text-muted-foreground">{subtitle}</span> : null}
            </span>
            {channel === "whatsapp" ? (
              <>
                <Video className="size-4 text-primary" />
                <PhoneIcon className="size-3.5 text-primary" />
              </>
            ) : (
              <MoreVertical className="size-4 text-muted-foreground" />
            )}
          </div>
        )}
        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-3 py-3">{children}</div>
      </div>
    </div>
  );
}

export function PhoneStage({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("phone-stage flex items-center justify-center rounded-2xl border border-border p-8", className)}>{children}</div>;
}

/** Bubble inside a phone preview (customer view): business messages left, customer right. */
export function PBubble({
  from,
  children,
  time,
  className,
}: {
  from: "business" | "customer";
  children: ReactNode;
  time?: string;
  className?: string;
}) {
  const mine = from === "customer";
  return (
    <div className={cx("flex", mine ? "justify-end" : "justify-start")}>
      <div
        className={cx(
          "max-w-[84%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug",
          mine ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md border border-border bg-card text-foreground",
          className,
        )}
      >
        {children}
        {time ? (
          <span className={cx("mt-1 flex items-center justify-end gap-1 text-[9.5px]", mine ? "text-primary-foreground/80" : "text-muted-foreground")}>
            {time}
            {mine ? <Ticks className="size-3 text-primary-foreground" /> : null}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** Reply buttons under a business message. */
export function PButtons({ labels, link }: { labels: string[]; link?: boolean }) {
  return (
    <div className="flex max-w-[84%] flex-col gap-1">
      {labels.map((l) => (
        <span key={l} className="flex h-8 items-center justify-center gap-1.5 rounded-xl border border-border bg-card text-[12px] font-medium text-primary">
          {link ? <ExternalLink className="size-3" /> : null}
          {l}
        </span>
      ))}
    </div>
  );
}

/** Small system line, e.g. "Today" or "Bot paused · Ananya joined". */
export function PSystem({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center">
      <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">{children}</span>
    </div>
  );
}
