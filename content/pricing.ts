/**
 * Plans, prices and limits. LOCKED by the owner on 22 Nov 2026
 * (docs/pricing-strategy.md). Prices are INR per month, exclusive of 18% GST.
 * Quarterly billing saves 10%, yearly billing saves 20%.
 *
 * Plan ids are the website's. If the app's plan catalogue uses other ids,
 * map them there; do not change prices here without the owner.
 */

/** The owner locked these prices, so they may appear in SoftwareApplication JSON-LD. */
export const PRICES_CONFIRMED = true;

export type PlanId = "starter" | "growth" | "scale" | "enterprise";
export type BillingPeriod = "monthly" | "quarterly" | "yearly";

export const billingPeriods: { id: BillingPeriod; label: string; save?: string; months: number }[] = [
  { id: "monthly", label: "Monthly", months: 1 },
  { id: "quarterly", label: "Quarterly", save: "Save 10%", months: 3 },
  { id: "yearly", label: "Yearly", save: "Save 20%", months: 12 },
];

export type Plan = {
  id: PlanId;
  name: string;
  /** Effective price per month for each billing period. null means "Custom". */
  price: Record<BillingPeriod, number | null>;
  /** "From" price shown when the plan is custom. */
  fromPrice?: number;
  description: string;
  /** Short lines for the plan card. */
  highlights: string[];
  cta: { label: string; kind: "signup" | "contact" };
  popular?: boolean;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: 1499, quarterly: 1349, yearly: 1199 },
    description: "For small businesses starting with WhatsApp and Instagram.",
    highlights: [
      "3 team seats, 1 WhatsApp number, 1 Instagram account",
      "10,000 campaign recipients a month",
      "5 chatbot flows, 10 automation rules",
      "1 KHAGA AI agent, 500 AI credits a month",
      "Online store, payments and appointments",
    ],
    cta: { label: "Start free trial", kind: "signup" },
  },
  {
    id: "growth",
    name: "Growth",
    price: { monthly: 3499, quarterly: 3149, yearly: 2799 },
    description: "For growing teams selling and automating every day.",
    highlights: [
      "8 team seats, 2 WhatsApp numbers, 2 Instagram accounts",
      "1,00,000 campaign recipients a month",
      "25 flows, 50 rules, 15 sequences",
      "3 AI agents, 3,000 AI credits a month",
      "Routing, reply targets, retargeting and revenue tracking",
      "Shopify, WooCommerce and Shiprocket, public API",
    ],
    cta: { label: "Start free trial", kind: "signup" },
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: { monthly: 7999, quarterly: 7199, yearly: 6399 },
    description: "For multi-team businesses with high volume.",
    highlights: [
      "20 team seats, 5 WhatsApp numbers, 5 Instagram accounts",
      "Unlimited campaign recipients (fair use)",
      "100 flows, unlimited rules and sequences",
      "10 AI agents, 10,000 AI credits, or bring your own AI key",
      "Custom roles, phone masking and audit log",
    ],
    cta: { label: "Start free trial", kind: "signup" },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: null, quarterly: null, yearly: null },
    fromPrice: 24999,
    description: "For large teams that need custom limits and a named contact.",
    highlights: [
      "Custom seats, numbers and AI credit pool",
      "Named account manager and SLA",
      "Annual contract and invoice billing",
      "Assisted migration and onboarding",
    ],
    cta: { label: "Talk to us", kind: "contact" },
  },
];

/** A comparison cell: text, true (included), false (not included). */
export type ComparisonValue = string | boolean;

export type ComparisonRow = {
  label: string;
  /** In plan order: starter, growth, scale, enterprise. */
  values: [ComparisonValue, ComparisonValue, ComparisonValue, ComparisonValue];
};

export type ComparisonGroup = { title: string; rows: ComparisonRow[] };

export const comparisonGroups: ComparisonGroup[] = [
  {
    title: "Limits",
    rows: [
      { label: "Team seats", values: ["3", "8", "20", "Custom"] },
      { label: "WhatsApp numbers", values: ["1", "2", "5", "Custom"] },
      { label: "Instagram accounts", values: ["1", "2", "5", "Custom"] },
      { label: "Contacts", values: ["25,000", "1,00,000", "5,00,000", "Custom"] },
      { label: "Campaign recipients a month", values: ["10,000", "1,00,000", "Unlimited (fair use)", "Custom"] },
      { label: "Segments / lists", values: ["5 / 10", "25 / 50", "Unlimited", "Unlimited"] },
      { label: "Active chatbot flows", values: ["5", "25", "100", "Custom"] },
      { label: "Active automation rules", values: ["10", "50", "Unlimited", "Unlimited"] },
      { label: "Sequences", values: ["2", "15", "Unlimited", "Unlimited"] },
      { label: "AI credits a month", values: ["500", "3,000", "10,000", "Custom pool"] },
      { label: "AI agents / knowledge base", values: ["1 / 25 MB", "3 / 250 MB", "10 / 1 GB", "Custom"] },
      { label: "Sales pipelines", values: ["1", "5", "Unlimited", "Unlimited"] },
      { label: "Appointment staff / locations", values: ["2 / 1", "10 / 3", "30 / 10", "Custom"] },
      { label: "Storage", values: ["2 GB", "10 GB", "50 GB", "Custom"] },
      { label: "WhatsApp message charges", values: ["Meta's rate, 0% markup", "Meta's rate, 0% markup", "Meta's rate, 0% markup", "Meta's rate, 0% markup"] },
    ],
  },
  {
    title: "Inbox and CRM",
    rows: [
      { label: "Shared inbox for WhatsApp and Instagram DMs", values: [true, true, true, true] },
      { label: "Notes, quick replies, human handoff", values: [true, true, true, true] },
      { label: "Routing and round-robin", values: ["Manual", true, "With team rules", true] },
      { label: "Reply targets and saved views", values: [false, true, true, true] },
      { label: "Phone-number masking", values: [false, false, true, true] },
      { label: "Contacts, custom fields, consent, CSV import", values: ["20 fields", "100 fields", "Unlimited", true] },
      { label: "Analytics", values: ["Standard", "Advanced", "Advanced + scheduled reports", true] },
    ],
  },
  {
    title: "Campaigns and automation",
    rows: [
      { label: "Broadcasts, scheduling, delivery and click tracking", values: [true, true, true, true] },
      { label: "Revenue tracking and retargeting", values: [false, true, true, true] },
      { label: "Templates: carousel, one-time code, limited-time offer", values: [true, true, true, true] },
      { label: "WhatsApp Forms", values: ["2 forms", "Unlimited", "Unlimited", "Unlimited"] },
      { label: "Visual flow builder", values: [true, "With versions and dry run", true, true] },
      { label: "Instagram comment-to-DM, default reply, starters, menu", values: [true, true, true, true] },
      { label: "Follower growth, story leads, ref links, AI comment replies", values: [false, true, true, true] },
      { label: "Click-to-WhatsApp ads reporting", values: [true, true, true, true] },
      { label: "Lead forms and ad-to-customer tracking", values: [false, true, true, true] },
    ],
  },
  {
    title: "KHAGA AI",
    rows: [
      { label: "AI agents on WhatsApp and Instagram", values: ["1 agent", "3 agents", "10 agents", "Custom"] },
      { label: "Chat summaries and suggested replies", values: [true, true, true, true] },
      { label: "Lead score, insights, AI template and flow writers", values: [false, true, true, true] },
      { label: "Bring your own AI key", values: [false, false, true, true] },
    ],
  },
  {
    title: "Sell",
    rows: [
      { label: "Catalogue, stock, Meta catalogue sync", values: ["100 products", "2,000 products", "Unlimited", "Unlimited"] },
      { label: "Online store", values: ["Standard theme", "Theme editor, reviews, reports", true, true] },
      { label: "Orders, returns, COD, Razorpay payment links", values: [true, true, true, true] },
      { label: "Shopify, WooCommerce, Shiprocket", values: [false, true, true, true] },
      { label: "Appointments, booking pages, reminders", values: [true, true, true, true] },
      { label: "Paid bookings and several locations", values: [false, true, true, true] },
      { label: "Fee on orders or bookings", values: ["0%", "0%", "0%", "0%"] },
    ],
  },
  {
    title: "Platform and support",
    rows: [
      { label: "Public API and signed webhooks", values: [false, true, "Higher limits", "Custom"] },
      { label: "Google Sheets", values: [true, true, true, true] },
      { label: "Two-factor sign-in, data export and deletion", values: [true, true, true, true] },
      { label: "Roles and permissions", values: ["Owner / agent", "Standard roles", "Custom", true] },
      { label: "Audit log", values: [false, false, true, true] },
      { label: "Support", values: ["Chat and email", "Priority chat", "Priority + onboarding call", "Named manager, SLA"] },
    ],
  },
];

export type AddOn = { name: string; price: string; note?: string };

export const addOns: AddOn[] = [
  { name: "Extra team seat", price: "₹499 / month" },
  { name: "Extra WhatsApp number", price: "₹999 / month" },
  { name: "Extra Instagram account", price: "₹499 / month" },
  { name: "AI pack, 1,000 credits", price: "₹799", note: "Valid 90 days" },
  { name: "AI pack, 5,000 credits", price: "₹3,499", note: "Valid 90 days" },
  { name: "AI pack, 20,000 credits", price: "₹11,999", note: "Valid 90 days" },
  { name: "Extra appointment staff", price: "₹199 / month" },
  { name: "Extra storage, 10 GB", price: "₹299 / month" },
  { name: "Assisted setup and migration", price: "₹2,999 one-time", note: "Free on yearly Growth and Scale" },
];

export const launchOffer = {
  title: "Launch offer until 31 March 2027",
  points: [
    "Your price is locked for 24 months",
    "Free assisted setup and migration from another provider",
    "Double AI credits for the first 3 months on yearly plans",
  ],
};

/** Must appear on the pricing page. */
export const pricingNote =
  "Prices are in Indian rupees per month and exclude 18% GST. WhatsApp message charges are passed on at Meta's published rate with zero markup, from a prepaid wallet.";

export const trialNote = "14-day free trial of Growth. No card needed.";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

/** "₹1,499", or "Custom" for null. */
export function formatPrice(value: number | null): string {
  return value === null ? "Custom" : inr.format(value);
}

/** Total billed for one period, e.g. ₹4,047 per quarter. */
export function periodTotal(plan: Plan, period: BillingPeriod): number | null {
  const p = plan.price[period];
  const months = billingPeriods.find((b) => b.id === period)?.months ?? 1;
  return p === null ? null : p * months;
}
