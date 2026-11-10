import { cx } from "@/components/ui/cx";
import { Avatar } from "./Chat";

export type ConversationStatus = "open" | "waiting" | "resolved";

export type InboxItem = {
  name: string;
  /** Last message, one line. */
  preview: string;
  /** Mono, e.g. "10:42" or "Yesterday". */
  time: string;
  /** Unread count; shows a copper pill when above 0. */
  unread?: number;
  status?: ConversationStatus;
  /** Assigned teammate or team, e.g. "Priya" or "Sales". */
  assignee?: string;
  /** One contact tag, e.g. "VIP" or "COD". */
  tag?: string;
  /** Highlight as the selected chat. */
  active?: boolean;
  /** "AI" marks a chat the AI agent is handling. */
  handledBy?: "AI" | "Bot";
};

const statusClass: Record<ConversationStatus, string> = {
  open: "text-copper",
  waiting: "text-muted",
  resolved: "text-success",
};

/** The shared inbox conversation list. Use inside WindowFrame with flush. */
export function InboxList({ items, className }: { items: InboxItem[]; className?: string }) {
  return (
    <ul className={cx("divide-y divide-line", className)}>
      {items.map((item) => (
        <li
          key={item.name}
          className={cx("flex gap-3 px-4 py-3", item.active ? "bg-copper-soft" : "bg-surface")}
        >
          <Avatar name={item.name} size={34} />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <p className={cx("truncate text-small text-ink", item.unread ? "font-semibold" : "font-medium")}>
                {item.name}
              </p>
              <span className="ml-auto shrink-0 font-mono text-[0.6875rem] text-muted">{item.time}</span>
            </div>
            <div className="mt-0.5 flex items-center gap-2">
              <p className="min-w-0 flex-1 truncate text-small text-muted">{item.preview}</p>
              {item.unread ? (
                <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-copper px-1.5 font-mono text-[0.6875rem] text-on-copper">
                  {item.unread}
                </span>
              ) : null}
            </div>
            {item.status || item.assignee || item.tag || item.handledBy ? (
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem]">
                {item.status ? <span className={statusClass[item.status]}>{item.status}</span> : null}
                {item.handledBy ? <span className="text-muted">{item.handledBy} replying</span> : null}
                {item.assignee ? <span className="text-muted">@{item.assignee}</span> : null}
                {item.tag ? <span className="rounded bg-sunken px-1.5 text-ink">{item.tag}</span> : null}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
