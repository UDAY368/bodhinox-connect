import { Check } from "lucide-react";
import { Badge, Button, cx } from "@/components/ui";
import { billingPeriods, formatPrice, periodTotal, plans, type BillingPeriod, type Plan } from "@/content/pricing";
import { site } from "@/content/site";

/*
 * Plan cards with a monthly / quarterly / yearly switch.
 *
 * The switch is three native radio buttons and the cards read the checked one
 * through CSS (:has), so it works before hydration and without JavaScript.
 * Yearly is selected by default (the locked pricing strategy).
 */

const ids: Record<BillingPeriod, string> = {
  monthly: "billing-monthly",
  quarterly: "billing-quarterly",
  yearly: "billing-yearly",
};

/** Show only while the given period is checked. */
const showFor: Record<BillingPeriod, string> = {
  monthly: "hidden group-has-[#billing-monthly:checked]:inline",
  quarterly: "hidden group-has-[#billing-quarterly:checked]:inline",
  yearly: "hidden group-has-[#billing-yearly:checked]:inline",
};

function ctaHref(plan: Plan): string {
  return plan.cta.kind === "signup" ? site.signupUrl : "/contact";
}

function PriceLine({ plan }: { plan: Plan }) {
  if (plan.price.monthly === null) {
    return (
      <div>
        <p className="text-[2.25rem] leading-none font-bold tracking-[-0.03em] whitespace-nowrap">
          <span className="mr-1 text-small font-normal tracking-normal text-muted-foreground">from</span>
          {formatPrice(plan.fromPrice ?? null)}
          <span className="ml-1 text-small font-normal tracking-normal text-muted-foreground">/ month</span>
        </p>
        <p className="mt-2 text-small text-muted-foreground">Annual contract · + GST</p>
      </div>
    );
  }
  return (
    <div>
      <p className="text-[2.5rem] leading-none font-bold tracking-[-0.03em] tabular-nums">
        {billingPeriods.map((b) => (
          <span key={b.id} className={showFor[b.id]}>
            {formatPrice(plan.price[b.id])}
          </span>
        ))}
        <span className="ml-1 text-small font-normal tracking-normal text-muted-foreground">/ month</span>
      </p>
      <p className="mt-2 text-small text-muted-foreground">
        <span className={showFor.monthly}>Billed monthly · + GST</span>
        <span className={showFor.quarterly}>
          {formatPrice(periodTotal(plan, "quarterly"))} billed every 3 months · + GST
        </span>
        <span className={showFor.yearly}>{formatPrice(periodTotal(plan, "yearly"))} billed yearly · + GST</span>
      </p>
    </div>
  );
}

export function PlanCards({ headingId }: { headingId: string }) {
  return (
    <div className="group">
      <h2 id={headingId} className="sr-only">
        Plans
      </h2>
      <fieldset className="mx-auto w-max">
        <legend className="sr-only">Billing period</legend>
        <div className="flex items-center gap-0.5 rounded-2xl bg-muted p-1">
          {billingPeriods.map((b) => (
            <label
              key={b.id}
              htmlFor={ids[b.id]}
              className="relative inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-xl px-2.5 text-[0.8125rem] sm:gap-2 sm:px-4 sm:text-small font-medium text-muted-foreground transition-colors duration-150 has-[:checked]:bg-tab-active has-[:checked]:text-foreground has-[:checked]:shadow-[0_1px_3px_rgb(0_0_0/0.12)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring"
            >
              <input
                id={ids[b.id]}
                type="radio"
                name="billing"
                value={b.id}
                defaultChecked={b.id === "yearly"}
                className="sr-only"
              />
              {b.label}
              {b.save ? (
                <span className="rounded-full bg-success-soft px-1.5 py-0.5 text-[0.6875rem] font-semibold text-success">
                  <span className="sm:hidden">{b.save.replace("Save ", "−")}</span>
                  <span className="hidden sm:inline">{b.save}</span>
                </span>
              ) : null}
            </label>
          ))}
        </div>
      </fieldset>

      <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <li
            key={plan.id}
            className={cx(
              "relative flex flex-col rounded-2xl border bg-card p-6",
              plan.popular ? "border-primary shadow-[0_0_0_1px_var(--primary),0_24px_48px_-24px_var(--primary-soft-2)]" : "border-border",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-h3">{plan.name}</h3>
              {plan.popular ? <Badge tone="primary">Most popular</Badge> : null}
            </div>
            <p className="mt-2 min-h-[3em] text-small text-muted-foreground">{plan.description}</p>
            <div className="mt-6">
              <PriceLine plan={plan} />
            </div>
            <Button
              href={ctaHref(plan)}
              variant={plan.popular ? "primary" : "secondary"}
              className="mt-6 w-full"
            >
              {plan.cta.label}
            </Button>
            <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
              {plan.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-small text-foreground">
                  <Check size={16} strokeWidth={2.5} aria-hidden className="mt-0.5 shrink-0 text-primary" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
