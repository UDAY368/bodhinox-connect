import { cx } from "@/components/ui/cx";

export type Stat = {
  label: string;
  /** Pre-formatted, e.g. "12,480", "96.2%", "₹48,200". Shown in mono with tabular figures. */
  value: string;
  /** Small line under the value, e.g. "of 12,960 sent". */
  hint?: string;
  /** Copper value. Use for one key figure at most. */
  emphasis?: boolean;
};

export type StatRowProps = {
  stats: Stat[];
  /**
   * Visible note under the row. Required wording for made-up numbers on
   * marketing sections: "Illustrative figures" (never present them as customer results).
   */
  caption?: string;
  /** "auto" fits every stat on one row from sm up; 2 keeps two columns for narrow frames. */
  columns?: "auto" | 2;
  className?: string;
};

/** A row of campaign or dashboard figures. Wraps to two columns on small screens. */
export function StatRow({ stats, caption, columns = "auto", className }: StatRowProps) {
  return (
    <div className={className}>
      <dl
        className={cx(
          "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line",
          columns === "auto" && "sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
        )}
      >
        {stats.map((s) => (
          <div key={s.label} className="bg-surface px-3 py-3">
            <dt className="truncate text-micro text-muted">{s.label}</dt>
            <dd
              className={cx(
                "mt-1 font-mono text-[1.125rem] leading-tight font-medium tabular-nums",
                s.emphasis ? "text-copper" : "text-ink",
              )}
            >
              {s.value}
            </dd>
            {s.hint ? <dd className="mt-0.5 truncate font-mono text-[0.6875rem] text-muted">{s.hint}</dd> : null}
          </div>
        ))}
      </dl>
      {caption ? <p className="mt-2 font-mono text-[0.6875rem] text-muted">{caption}</p> : null}
    </div>
  );
}
