import { Check, Minus } from "lucide-react";
import { Fragment } from "react";
import { cx } from "@/components/ui";
import { comparisonGroups, formatPrice, plans, type ComparisonValue } from "@/content/pricing";

function Cell({ value }: { value: ComparisonValue }) {
  if (value === true) {
    return (
      <>
        <Check size={18} aria-hidden className="text-primary" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus size={18} aria-hidden className="text-input" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span>{value}</span>;
}

const priceRows: { label: string; values: string[] }[] = [
  {
    label: "Per month, billed monthly",
    values: plans.map((p) => (p.price.monthly === null ? `From ${formatPrice(p.fromPrice ?? null)}` : formatPrice(p.price.monthly))),
  },
  { label: "Per month, billed quarterly (save 10%)", values: plans.map((p) => formatPrice(p.price.quarterly)) },
  { label: "Per month, billed yearly (save 20%)", values: plans.map((p) => formatPrice(p.price.yearly)) },
];

/**
 * Full plan comparison as a real table, grouped like the product. On narrow
 * screens the table scrolls inside its own focusable region.
 */
export function ComparisonTable({ captionId }: { captionId: string }) {
  const popularIndex = plans.findIndex((p) => p.popular);
  const col = (i: number) => cx("px-4 py-3 text-left align-top", i === popularIndex && "bg-primary-soft");

  return (
    <div
      role="region"
      aria-labelledby={captionId}
      tabIndex={0}
      className="relative overflow-x-auto rounded-2xl border border-border bg-card"
    >
      <table className="w-full min-w-[52rem] border-collapse text-small">
        <caption id={captionId} className="sr-only">
          Plan comparison: prices in INR before 18% GST, limits and features for Starter, Growth, Scale and Enterprise
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="w-[32%] px-4 py-4 text-left text-[0.75rem] font-semibold tracking-[0.04em] text-muted-foreground uppercase">
              Plan
            </th>
            {plans.map((p, i) => (
              <th key={p.id} scope="col" className={cx(col(i), "py-4 text-body font-semibold")}>
                {p.name}
                {p.popular ? <span className="mt-0.5 block text-[0.75rem] font-medium text-primary-strong">Most popular</span> : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {priceRows.map((row) => (
            <tr key={row.label} className="border-b border-border">
              <th scope="row" className="px-4 py-3 text-left font-normal text-muted-foreground">
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <td key={plans[i].id} className={cx(col(i), "font-semibold tabular-nums")}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
          {comparisonGroups.map((g) => (
            <Fragment key={g.title}>
              <tr className="bg-card-2">
                <th
                  scope="colgroup"
                  colSpan={plans.length + 1}
                  className="px-4 pt-5 pb-2 text-left text-[0.75rem] font-semibold tracking-[0.04em] text-foreground uppercase"
                >
                  {g.title}
                </th>
              </tr>
              {g.rows.map((row) => (
                <tr key={row.label} className="border-b border-border">
                  <th scope="row" className="px-4 py-3 text-left font-normal text-muted-foreground">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={plans[i].id} className={cx(col(i), "tabular-nums")}>
                      <Cell value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
