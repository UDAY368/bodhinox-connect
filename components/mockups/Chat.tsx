import { Check, CheckCheck, SendHorizontal } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/components/ui/cx";

export type DeliveryStatus = "sent" | "delivered" | "read";

type TicksProps = {
  status: DeliveryStatus;
  /** For the hero: show "delivered" first, then turn to "read" after this many ms. */
  readAfterMs?: number;
};

/** WhatsApp-style receipts: sent ✓, delivered ✓✓ (muted), read ✓✓ (copper). */
export function Ticks({ status, readAfterMs }: TicksProps) {
  if (status === "sent") return <Check size={14} strokeWidth={2.25} className="text-muted" aria-hidden />;
  if (status === "delivered") return <CheckCheck size={14} strokeWidth={2.25} className="text-muted" aria-hidden />;
  if (readAfterMs === undefined) return <CheckCheck size={14} strokeWidth={2.25} className="text-copper" aria-hidden />;
  // Animated: the muted pair sits underneath and the copper pair fades in on top.
  return (
    <span className="relative inline-flex" aria-hidden>
      <CheckCheck size={14} strokeWidth={2.25} className="text-muted" />
      <CheckCheck
        size={14}
        strokeWidth={2.25}
        className="absolute inset-0 animate-tick-read text-copper"
        style={{ animationDelay: `${readAfterMs}ms` }}
      />
    </span>
  );
}

export type MessageBubbleProps = {
  /** "business" is your side (right, copper tint); "customer" is theirs (left, white). */
  from: "business" | "customer";
  children: ReactNode;
  /** Shown in mono, e.g. "10:42". */
  time?: string;
  /** Receipt ticks, business messages only. */
  status?: DeliveryStatus;
  readAfterMs?: number;
  className?: string;
  style?: CSSProperties;
};

export function MessageBubble({ from, children, time, status, readAfterMs, className, style }: MessageBubbleProps) {
  const mine = from === "business";
  return (
    <div className={cx("flex", mine ? "justify-end" : "justify-start", className)} style={style}>
      <div
        className={cx(
          "max-w-[82%] rounded-xl px-3 py-2 text-small text-ink shadow-[0_1px_0_var(--line)]",
          mine ? "rounded-br-sm bg-bubble-out" : "rounded-bl-sm bg-bubble-in",
        )}
      >
        <div className="break-words">{children}</div>
        {time || status ? (
          <div className="mt-1 flex items-center justify-end gap-1 font-mono text-[0.6875rem] leading-none text-muted">
            {time ? <span>{time}</span> : null}
            {mine && status ? <Ticks status={status} readAfterMs={readAfterMs} /> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export type ChatItem =
  | {
      kind?: "message";
      from: "business" | "customer";
      /** Plain text, or any node (a product card, a payment link, buttons). */
      content: ReactNode;
      time?: string;
      status?: DeliveryStatus;
    }
  /** Centered note, e.g. "Customer service window open · 23h 58m left". */
  | { kind: "system"; text: string }
  /** Day divider, e.g. "Today". */
  | { kind: "day"; label: string };

export type ChatThreadProps = {
  contact: { name: string; /** Small mono line under the name. */ meta?: string };
  items: ChatItem[];
  /**
   * The hero moment: items arrive one after another and ticks turn to read.
   * Off by default. Content is visible at rest with reduced motion.
   */
  animate?: boolean;
  /** Milliseconds between items when animating. */
  stepMs?: number;
  /** With animate: this many leading items render at rest, so the first frame is never an empty chat. */
  staticCount?: number;
  /** Show the reply box at the bottom. */
  composer?: boolean;
  /** Placeholder text for the reply box. */
  composerText?: string;
  className?: string;
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-copper-soft font-sans font-semibold text-copper-ink"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
    >
      {initials(name)}
    </span>
  );
}

/** A WhatsApp conversation as the business sees it. Put it in a DeviceFrame or WindowFrame. */
export function ChatThread({
  contact,
  items,
  animate = false,
  stepMs = 900,
  staticCount = 0,
  composer = true,
  composerText = "Type a reply",
  className,
}: ChatThreadProps) {
  return (
    <div className={cx("flex flex-col bg-chat", className)}>
      <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3">
        <Avatar name={contact.name} />
        <div className="min-w-0">
          <p className="truncate text-small font-semibold text-ink">{contact.name}</p>
          {contact.meta ? <p className="truncate font-mono text-[0.6875rem] text-muted">{contact.meta}</p> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-3 py-4">
        {items.map((item, i) => {
          const moving = animate && i >= staticCount;
          const delay = moving ? (i - staticCount) * stepMs : undefined;
          const motion = moving ? "animate-msg-in" : "";
          const style = moving ? { animationDelay: `${delay}ms` } : undefined;

          if (item.kind === "day") {
            return (
              <p key={i} className={cx("self-center rounded-full bg-surface px-2.5 py-0.5 font-mono text-[0.6875rem] text-muted", motion)} style={style}>
                {item.label}
              </p>
            );
          }
          if (item.kind === "system") {
            return (
              <p
                key={i}
                className={cx("self-center rounded-md bg-copper-soft px-2.5 py-1 text-center font-mono text-[0.6875rem] text-copper-ink", motion)}
                style={style}
              >
                {item.text}
              </p>
            );
          }
          return (
            <MessageBubble
              key={i}
              from={item.from}
              time={item.time}
              status={item.status}
              readAfterMs={moving && item.status === "read" ? (delay ?? 0) + stepMs : undefined}
              className={motion}
              style={style}
            >
              {item.content}
            </MessageBubble>
          );
        })}
      </div>

      {composer ? (
        <div className="flex items-center gap-2 border-t border-line bg-surface px-3 py-2.5" aria-hidden>
          <span className="flex-1 truncate rounded-full border border-line bg-bg px-3 py-1.5 text-small text-muted">
            {composerText}
          </span>
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-copper text-on-copper">
            <SendHorizontal size={15} />
          </span>
        </div>
      ) : null}
    </div>
  );
}
