import { Check } from "lucide-react";
import { Badge, Button, cx } from "@/components/ui";
import { formatPrice, plans, type Plan } from "@/content/pricing";
import { site } from "@/content/site";

/*
 * Plan cards with a monthly/yearly switch.
 *
 * The switch is two native radio buttons, and the cards read the checked one
 * through CSS (:has). There is no client JavaScript, so the switch and every
 * price work before hydration and with scripts turned off. Monthly is the
 * default, and each card still names the yearly price in its note line.
 */

const YEARLY_ID = "billing-yearly";
// Shown only while "Yearly" is checked, and the reverse.
const showYearly = "hidden group-has-[#billing-yearly:checked]:inline";
const showMonthly = "group-has-[#billing-yearly:checked]:hidden";

function ctaHref(plan: Plan): string {
  return plan.cta.kind === "signup" ? site.signupUrl : "/contact";
}

function PriceLine({ plan }: { plan: Plan }) {
  if (plan.monthly === null || plan.yearly === null) {
    return (
      <div>
        <p className="font-display text-[2.5rem] leading-none font-semibold tracking-[-0.03em]">Custom</p>
        <p className="mt-2 text-small text-muted">Priced on your volume</p>
      </div>
    );
  }

  const free = plan.monthly === 0;
  return (
    <div>
      <p className="font-display text-[2.5rem] leading-none font-semibold tracking-[-0.03em] tabular-nums">
        <span className={showMonthly}>{formatPrice(plan.monthly)}</span>
        <span className={showYearly}>{formatPrice(plan.yearly)}</span>
        <span className="ml-1 font-sans text-small font-normal tracking-normal text-muted">/ month</span>
      </p>
      <p className="mt-2 text-small text-muted">
        {free ? (
          "Free for as long as you like"
        ) : (
          <>
            <span className={showMonthly}>
              Billed monthly. {formatPrice(plan.yearly)} a month if billed yearly.
            </span>
            <span className={showYearly}>Per month, billed yearly. 2 months free.</span>
          </>
        )}
      </p>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const headingId = `plan-${plan.id}`;
  return (
    <article
      aria-labelledby={headingId}
      className={cx(
        "flex flex-col rounded-card border bg-surface p-6",
        plan.popular ? "border-copper shadow-soft" : "border-line",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 id={headingId} className="text-h3">
          {plan.name}
        </h3>
        {plan.popular ? <Badge tone="copper">Most popular</Badge> : null}
      </div>
      <p className="mt-2 min-h-[3.25rem] text-small text-muted">{plan.description}</p>

      <div className="mt-6">
        <PriceLine plan={plan} />
      </div>

      <Button
        href={ctaHref(plan)}
        variant={plan.popular ? "primary" : "secondary"}
        className="mt-6 w-full"
        aria-label={`${plan.cta.label}: ${plan.name} plan`}
      >
        {plan.cta.label}
      </Button>

      <ul className="mt-6 space-y-3 border-t border-line pt-6 text-small">
        {plan.highlights.map((h) => (
          <li key={h} className="flex gap-2.5">
            <Check size={16} aria-hidden className="mt-[3px] shrink-0 text-copper" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function BillingSwitch() {
  const option =
    "relative flex h-11 cursor-pointer items-center gap-2 rounded-[0.5rem] px-4 text-small font-semibold text-muted " +
    "transition-colors duration-200 hover:text-ink " +
    "has-[:checked]:bg-surface has-[:checked]:text-ink has-[:checked]:shadow-soft " +
    "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-copper";
  return (
    <fieldset>
      <legend className="sr-only">Billing period</legend>
      <div className="inline-flex rounded-control border border-line bg-sunken p-1">
        <label className={option}>
          <input type="radio" name="billing" value="monthly" defaultChecked className="sr-only" />
          Monthly
        </label>
        <label className={option}>
          <input id={YEARLY_ID} type="radio" name="billing" value="yearly" className="sr-only" />
          Yearly
          <span className="font-mono text-micro font-medium text-copper">2 months free</span>
        </label>
      </div>
    </fieldset>
  );
}

/** The billing switch and the four plan cards. Server component. */
export function PlanCards({ headingId }: { headingId: string }) {
  return (
    <div className="group">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 id={headingId} className="text-h2">
          Choose a plan
        </h2>
        <BillingSwitch />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
