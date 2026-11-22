import { cx } from "@/components/ui";

type FlowSequenceProps = {
  /** Heading above the steps, e.g. "Example flow for retail and D2C". */
  title: string;
  steps: string[];
  className?: string;
};

/**
 * An example flow drawn as numbered steps joined by a line. The steps are a
 * real ordered list, so screen readers and search engines read every one.
 */
export function FlowSequence({ title, steps, className }: FlowSequenceProps) {
  return (
    <figure className={cx("rounded-3xl border border-border bg-card p-5 sm:p-6", className)}>
      <figcaption className="flex items-center gap-2 text-small font-semibold text-foreground">
        <span className="inline-flex h-6 items-center rounded-full bg-success-soft px-2.5 text-[0.75rem] font-medium text-success">
          Published
        </span>
        {title}
      </figcaption>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step} className="relative flex gap-3 rounded-2xl border border-border bg-card-2 p-4">
            <span
              aria-hidden
              className={cx(
                "grid size-7 shrink-0 place-items-center rounded-full text-[0.75rem] font-semibold tabular-nums",
                i === 0 ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary",
              )}
            >
              {i + 1}
            </span>
            <span className="text-small text-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
