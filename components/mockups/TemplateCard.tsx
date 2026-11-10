import { Fragment } from "react";
import { Badge } from "@/components/ui/Badge";
import { cx } from "@/components/ui/cx";

export type TemplateCategory = "Marketing" | "Utility" | "Authentication";
export type TemplateStatus = "Approved" | "In review" | "Rejected";

export type TemplateCardProps = {
  category: TemplateCategory;
  /** Template name as stored in the app, e.g. "diwali_offer_2026". Shown in mono. */
  name: string;
  /** Message body. {{1}}, {{2}} ... render as variable chips. */
  body: string;
  /** Optional bold header line. */
  header?: string;
  /** Small grey footer line, e.g. "Reply STOP to opt out". */
  footer?: string;
  /** Quick-reply or call-to-action buttons. */
  buttons?: string[];
  status?: TemplateStatus;
  language?: string;
  className?: string;
};

function renderBody(body: string) {
  return body.split(/(\{\{\d+\}\})/g).map((part, i) =>
    /^\{\{\d+\}\}$/.test(part) ? (
      <span key={i} className="rounded bg-copper-soft px-1 font-mono text-[0.75rem] text-copper-ink">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** A message template as it appears in the template builder, with its Meta category and approval status. */
export function TemplateCard({
  category,
  name,
  body,
  header,
  footer,
  buttons,
  status = "Approved",
  language = "en",
  className,
}: TemplateCardProps) {
  const statusTone = status === "Approved" ? "success" : status === "Rejected" ? "outline" : "neutral";
  return (
    <div className={cx("rounded-card border border-line bg-surface p-4", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="copper">{category}</Badge>
        <Badge tone={statusTone}>{status}</Badge>
        <span className="ml-auto font-mono text-micro text-muted">{language}</span>
      </div>
      <p className="mt-3 truncate font-mono text-micro text-muted">{name}</p>

      <div className="mt-2 rounded-xl bg-chat p-3">
        <div className="rounded-xl rounded-bl-sm bg-bubble-in px-3 py-2 text-small text-ink">
          {header ? <p className="font-semibold">{header}</p> : null}
          <p className={cx("whitespace-pre-line", header && "mt-1")}>{renderBody(body)}</p>
          {footer ? <p className="mt-1.5 text-micro text-muted">{footer}</p> : null}
        </div>
        {buttons?.length ? (
          <div className="mt-1 grid gap-1">
            {buttons.map((b) => (
              <span key={b} className="rounded-lg bg-bubble-in py-1.5 text-center text-small font-medium text-copper">
                {b}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
