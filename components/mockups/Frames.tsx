import type { ReactNode } from "react";
import { cx } from "@/components/ui/cx";

type FrameProps = {
  /**
   * Describes what the mock-up shows, e.g. "Inbox with three open chats".
   * The frame is exposed as one image with this name; its inner text is not read out.
   */
  label: string;
  children: ReactNode;
  className?: string;
};

/** Phone frame for chat mock-ups. Width follows the parent, capped at 360px. */
export function DeviceFrame({ label, children, className }: FrameProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cx(
        "mx-auto w-full max-w-[360px] rounded-[2.25rem] border border-line-strong bg-surface p-2 shadow-soft",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-line bg-chat">{children}</div>
    </div>
  );
}

type WindowFrameProps = FrameProps & {
  /** Shown in the title bar, e.g. "Inbox" or "Campaigns / Diwali offer". */
  title?: string;
  /** Optional element on the right of the title bar (a Badge, a button-like label). */
  toolbar?: ReactNode;
  /** Remove the inner padding, for full-bleed content such as InboxList. */
  flush?: boolean;
};

/** App window for desktop product screens: a quiet title bar over a white surface. */
export function WindowFrame({ label, title, toolbar, flush = false, children, className }: WindowFrameProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cx("w-full overflow-hidden rounded-card border border-line bg-surface shadow-soft", className)}
    >
      <div className="flex h-10 items-center gap-3 border-b border-line bg-sunken px-4">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </span>
        {title ? <span className="min-w-0 truncate font-mono text-micro text-muted">{title}</span> : null}
        {toolbar ? <span className="ml-auto shrink-0">{toolbar}</span> : null}
      </div>
      <div className={flush ? "" : "p-4 sm:p-5"}>{children}</div>
    </div>
  );
}
