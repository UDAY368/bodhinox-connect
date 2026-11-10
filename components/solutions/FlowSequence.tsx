import { cx } from "@/components/ui";

type FlowSequenceProps = {
  /** Shown in the window title bar, e.g. "Flows / Retail order". */
  title: string;
  steps: string[];
  className?: string;
};

/**
 * A small flow-builder window that draws an example flow as numbered nodes
 * joined by a line. Unlike the image-only mock-up frames, the steps are a real
 * ordered list, so screen readers and search engines read every step.
 */
export function FlowSequence({ title, steps, className }: FlowSequenceProps) {
  return (
    <figure className={cx("w-full overflow-hidden rounded-card border border-line bg-surface shadow-soft", className)}>
      <div className="flex h-10 items-center gap-3 border-b border-line bg-sunken px-4" aria-hidden>
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </span>
        <span className="min-w-0 truncate font-mono text-micro text-muted">{title}</span>
        <span className="ml-auto shrink-0 font-mono text-micro text-success">Published</span>
      </div>
      <figcaption className="sr-only">{title}, step by step</figcaption>
      <ol className="bg-chat p-4 sm:p-6">
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={step} className="relative flex gap-4 pb-4 last:pb-0">
              {last ? null : (
                <span aria-hidden className="absolute top-8 bottom-0 left-[15px] w-px bg-line-strong" />
              )}
              <span
                aria-hidden
                className={cx(
                  "relative z-10 grid size-8 shrink-0 place-items-center rounded-full border font-mono text-micro font-medium",
                  i === 0 ? "border-copper bg-copper text-on-copper" : "border-line-strong bg-surface text-ink",
                )}
              >
                {i + 1}
              </span>
              <span className="flex-1 rounded-control border border-line bg-surface px-3.5 py-2.5 text-small">
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
