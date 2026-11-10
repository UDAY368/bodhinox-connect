/**
 * Plans (master prompt section 6). Plan ids match the app's plan catalogue
 * (free, basic, pro, enterprise) so the website and the product agree.
 * Prices are in INR per month, before 18% GST. They are samples until the
 * owner confirms them.
 */

/**
 * Set to true once the owner confirms the prices above. Until then the
 * SoftwareApplication JSON-LD carries no Offer prices, so search engines
 * never index a price that may change.
 */
export const PRICES_CONFIRMED = false;

export type PlanId = "free" | "basic" | "pro" | "enterprise";

export type Plan = {
  id: PlanId;
  name: string;
  /** Price per month when billed monthly. null means "Custom". */
  monthly: number | null;
  /** Effective price per month when billed yearly (2 months free). null means "Custom". */
  yearly: number | null;
  description: string;
  /** Short lines for the plan card. */
  highlights: string[];
  cta: { label: string; kind: "signup" | "contact" };
  popular?: boolean;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    yearly: 0,
    description: "For trying Bodhinox Connect with your own number.",
    highlights: ["1 team seat", "250 recipients per campaign", "1 active flow, 3 automations", "Shared inbox, CRM and templates"],
    cta: { label: "Start free", kind: "signup" },
  },
  {
    id: "basic",
    name: "Basic",
    monthly: 1499,
    yearly: 1249,
    description: "For a small team answering and sending every day.",
    highlights: ["3 team seats", "10,000 recipients per campaign", "5 active flows, 20 automations", "Campaign scheduling and contact export"],
    cta: { label: "Start free", kind: "signup" },
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 3999,
    yearly: 3333,
    description: "For growing teams selling and automating on WhatsApp.",
    highlights: [
      "10 team seats",
      "50,000 recipients per campaign",
      "50 active flows, 100 automations",
      "AI agent, store and payments included",
    ],
    cta: { label: "Start free", kind: "signup" },
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: null,
    yearly: null,
    description: "For large teams that need unlimited scale and a named contact.",
    highlights: ["Unlimited seats and recipients", "Unlimited flows and automations", "Dedicated manager and SLA"],
    cta: { label: "Talk to us", kind: "contact" },
  },
];

/** A comparison cell: text, true (included), false (not included). */
export type ComparisonValue = string | boolean;

export type ComparisonRow = {
  label: string;
  /** In plan order: free, basic, pro, enterprise. */
  values: [ComparisonValue, ComparisonValue, ComparisonValue, ComparisonValue];
};

export const comparisonRows: ComparisonRow[] = [
  { label: "Team seats", values: ["1", "3", "10", "Unlimited"] },
  { label: "Campaign recipients per send", values: ["250", "10,000", "50,000", "Unlimited"] },
  { label: "Active flows", values: ["1", "5", "50", "Unlimited"] },
  { label: "Active automations", values: ["3", "20", "100", "Unlimited"] },
  { label: "Segments / lists", values: ["3 / 3", "20 / 20", "100 / 100", "Unlimited"] },
  { label: "Shared inbox, CRM, templates", values: [true, true, true, true] },
  { label: "Campaign scheduling, contact export", values: [false, true, true, true] },
  { label: "API campaigns, click tracking, retargeting, custom attributes", values: [false, false, true, true] },
  { label: "AI agent, store and payments", values: ["Add-on", "Add-on", true, true] },
  { label: "Support", values: ["Help centre", "Email", "Priority", "Dedicated manager, SLA"] },
];

/** Must appear on the pricing page, word for word. */
export const pricingNote =
  "WhatsApp message charges are billed by Meta at its published rates and are not included in plan prices. Prices exclude 18% GST.";

export const yearlyNote = "Yearly billing: 2 months free.";
export const pricesAreSamples = true;

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

/** "₹1,499", or "Custom" for null. */
export function formatPrice(value: number | null): string {
  return value === null ? "Custom" : inr.format(value);
}
