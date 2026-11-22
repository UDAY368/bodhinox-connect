import type { ReactNode } from "react";
import { company, formatAddress } from "@/content/company";
import { site } from "@/content/site";
import { cx } from "@/components/ui/cx";

type Row = { label: string; value: ReactNode };

/**
 * The business identity Meta reviewers check against the verification
 * documents. Legal name, address and phone render only when they are set
 * in content/company.ts; nothing here is ever filled in with a guess.
 */
export function BusinessIdentity({ className }: { className?: string }) {
  const address = formatAddress();
  const rows: Row[] = [
    { label: "Product", value: company.brand },
    { label: "Operated by", value: company.operator },
    ...(company.legalName ? [{ label: "Legal name", value: company.legalName }] : []),
    { label: "Country", value: company.country },
    ...(address ? [{ label: "Registered address", value: address }] : []),
    ...(company.phone
      ? [
          {
            label: "Phone",
            value: (
              <a href={`tel:${company.phone}`} className="text-primary underline underline-offset-4 hover:text-primary-hover">
                {company.phone}
              </a>
            ),
          },
        ]
      : []),
    {
      label: "Email",
      value: (
        <a href={site.mailto} className="text-primary underline underline-offset-4 select-all hover:text-primary-hover">
          {site.email}
        </a>
      ),
    },
    { label: "Website", value: site.domain },
  ];

  return (
    <dl className={cx("divide-y divide-border border-y border-border", className)}>
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 py-3.5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
          <dt className="text-micro tracking-[0.08em] text-muted-foreground uppercase sm:pt-1">{row.label}</dt>
          <dd className="break-words text-body text-foreground">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
