import { Check, Minus } from "lucide-react";
import { cx } from "@/components/ui";
import { comparisonRows, formatPrice, plans, type ComparisonValue } from "@/content/pricing";

function Cell({ value }: { value: ComparisonValue }) {
  if (value === true) {
    return (
      <>
        <Check size={18} aria-hidden className="text-copper" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus size={18} aria-hidden className="text-muted" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span>{value}</span>;
}

const priceRows: { label: string; values: string[] }[] = [
  { label: "Price per month, billed monthly", values: plans.map((p) => formatPrice(p.monthly)) },
  { label: "Price per month, billed yearly", values: plans.map((p) => formatPrice(p.yearly)) },
];

/**
 * Full plan comparison as a real table. On narrow screens the table keeps its
 * width and scrolls inside its own focusable region, so the page never does.
 */
export function ComparisonTable({ captionId }: { captionId: string }) {
  const popularIndex = plans.findIndex((p) => p.popular);
  const col = (i: number) => cx("px-4 py-3 text-left align-top", i === popularIndex && "bg-copper-soft");

  return (
    <div
      role="region"
      aria-labelledby={captionId}
      tabIndex={0}
      className="relative overflow-x-auto rounded-card border border-line bg-surface"
    >
      <table className="w-full min-w-[46rem] border-collapse text-small">
        <caption id={captionId} className="sr-only">
          Plan comparison: prices in INR before 18% GST, limits and features for Free, Basic, Pro and Enterprise
        </caption>
        <thead>
          <tr className="border-b border-line-strong">
            <th scope="col" className="w-[34%] px-4 py-4 text-left font-mono text-micro font-medium text-muted uppercase">
              Plan
            </th>
            {plans.map((p, i) => (
              <th key={p.id} scope="col" className={cx(col(i), "py-4 font-display text-body font-semibold")}>
                {p.name}
                {p.popular ? (
                  <span className="mt-0.5 block font-mono text-micro font-medium text-copper-ink">Most popular</span>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {priceRows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="px-4 py-3 text-left font-normal text-muted">
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <td key={plans[i].id} className={cx(col(i), "font-mono tabular-nums")}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
          {comparisonRows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="px-4 py-3 text-left font-normal text-muted">
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <td key={plans[i].id} className={cx(col(i), typeof v === "string" && /\d/.test(v) && "font-mono tabular-nums")}>
                  <Cell value={v} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
