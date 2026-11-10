import type { LucideIcon } from "lucide-react";
import { Bot, ChartColumn, Megaphone, MessagesSquare, ShoppingBag, Workflow } from "lucide-react";

/**
 * The six product pillars. Every bullet is something the app does today
 * (master prompt section 5). Do not add a bullet here unless it is built.
 */

export type FeatureSlug = "team-inbox" | "campaigns" | "automation" | "ai-agent" | "commerce" | "crm-analytics";

export type Feature = {
  slug: FeatureSlug;
  /** Full pillar name, used as the H1 on its feature page. */
  title: string;
  /** Short label for nav, chips and the features sub-nav. */
  shortTitle: string;
  /** <title> text before " | Bodhinox Connect" (at most 41 characters). */
  seoTitle: string;
  /** Meta description for the feature page, 140 to 160 characters. */
  metaDescription: string;
  /** Two-line summary for the home grid and cards. */
  summary: string;
  /** Primary search phrase this pillar's page is written around. */
  keyword: string;
  /** Page URL. */
  href: `/features/${FeatureSlug}`;
  /** Anchor id on /features. */
  anchor: string;
  icon: LucideIcon;
  /** Full capability list from the feature catalogue. */
  bullets: string[];
};

export const features: Feature[] = [
  {
    slug: "team-inbox",
    seoTitle: "Shared team inbox for WhatsApp",
    metaDescription:
      "Bring every WhatsApp chat and number into one shared team inbox. Assign chats, add notes, set business hours and take over from the bot in one click.",
    title: "Shared team inbox",
    shortTitle: "Team inbox",
    summary:
      "Every WhatsApp chat from every number in one inbox. Assign, note and reply as a team, and hand over from the bot in one click.",
    keyword: "shared team inbox",
    href: "/features/team-inbox",
    anchor: "team-inbox",
    icon: MessagesSquare,
    bullets: [
      "All WhatsApp chats in one inbox, with several numbers per workspace",
      "Assign chats to people or teams, with round-robin routing and statuses (open, waiting, resolved)",
      "Internal notes with @mentions, quick replies, and templates, media, buttons and lists in replies",
      "Business hours, away messages, response-time targets and auto-resolve",
      "Human handoff: pause the bot and take over in one click",
      "Roles and permissions: owner, admin, agent and viewer",
    ],
  },
  {
    slug: "campaigns",
    seoTitle: "WhatsApp broadcast and campaigns",
    metaDescription:
      "Send approved WhatsApp templates to the right segment, schedule and pace sends, track delivery, reads and clicks, and retarget people who did not reply.",
    title: "Campaigns and broadcasts",
    shortTitle: "Campaigns",
    summary:
      "Send approved templates to the right customers, track every delivery and read, and follow up with the people who did not reply.",
    keyword: "WhatsApp broadcast",
    href: "/features/campaigns",
    anchor: "campaigns",
    icon: Megaphone,
    bullets: [
      "Send approved templates to all contacts, tags, segments, lists, custom fields or a CSV",
      "Personalised variables, scheduling and pacing",
      "Delivery, read, reply and click tracking",
      "Retargeting: follow up with people who read, replied or did not",
      "Retry failed sends, with honest outcome reconciliation",
      "Template builder for standard, carousel, one-time-code and limited-time offer templates, with Meta approval status",
    ],
  },
  {
    slug: "automation",
    seoTitle: "WhatsApp chatbot flows and automation",
    metaDescription:
      "Build WhatsApp chatbot flows visually, test them with a dry run, and automate replies by keyword, tag, event or schedule. STOP opt-outs respected everywhere.",
    title: "Flows and automation",
    shortTitle: "Automation",
    summary:
      "Build chat flows visually and run automations on events, keywords and schedules. Test before you publish and see every run.",
    keyword: "WhatsApp chatbot",
    href: "/features/automation",
    anchor: "automation",
    icon: Workflow,
    bullets: [
      "Visual flow builder: messages, buttons, lists, questions, conditions, delays, tags, assignment, payments and appointment booking",
      "Versioned publishing, dry run, run inspection and replay",
      "Automations by event, keyword, tag, status or schedule, with waits and conditions",
      "WhatsApp Forms (Meta Flows): multi-screen forms whose answers save to the contact",
      "Opt-out (STOP) and block respected everywhere",
    ],
  },
  {
    slug: "ai-agent",
    seoTitle: "WhatsApp AI agent for customer replies",
    metaDescription:
      "An AI agent that answers WhatsApp customers around the clock from your own knowledge base, follows your rules and hands sensitive chats to your team.",
    title: "AI agent",
    shortTitle: "AI agent",
    summary:
      "An AI agent that answers customers at any hour from your own knowledge base, and hands sensitive chats to a person.",
    keyword: "WhatsApp AI agent",
    href: "/features/ai-agent",
    anchor: "ai-agent",
    icon: Bot,
    bullets: [
      "Answers customers 24/7 from your knowledge base: website, documents and FAQs",
      "Your tone and your rules: handoff keywords, confidence threshold and maximum turns",
      "Safe by design: sensitive topics go to a human",
      "AI assistant for the team: chat summaries, suggested replies, intent and lead scoring",
      "An activity log of every decision the agent made, and usage tracking",
    ],
  },
  {
    slug: "commerce",
    seoTitle: "WhatsApp store and Razorpay payments",
    metaDescription:
      "Sell on WhatsApp with a catalogue, cart checkout and Razorpay UPI payments, then ship with Shiprocket tracking. GST invoices and paid bookings included.",
    title: "Store and payments",
    shortTitle: "Store and payments",
    summary:
      "Show products in chat, take payment by UPI, card or cash on delivery, and ship with tracking. Bookings work the same way.",
    keyword: "WhatsApp store",
    href: "/features/commerce",
    anchor: "commerce",
    icon: ShoppingBag,
    bullets: [
      "A product catalogue with variants, stock and low-stock alerts",
      "A WhatsApp storefront and cart checkout, and product messages in chat",
      "Payment links and checkout through Razorpay (UPI, cards, net banking), plus cash on delivery",
      "Orders, returns, refunds, GST invoices and receipts",
      "Shipping through Shiprocket, with pickup and tracking",
      "Sync with the Meta catalogue, Shopify and WooCommerce",
      "Appointments: services, staff, locations, booking pages and paid bookings",
    ],
  },
  {
    slug: "crm-analytics",
    seoTitle: "WhatsApp CRM, pipelines and analytics",
    metaDescription:
      "A WhatsApp CRM with contact timelines, segments and deal pipelines, plus reports on response times, team performance, campaigns and revenue, and an API.",
    title: "CRM, analytics and platform",
    shortTitle: "CRM and analytics",
    summary:
      "Every contact with a full timeline, deal pipelines, and reports on chats, team speed, campaigns and revenue.",
    keyword: "WhatsApp CRM",
    href: "/features/crm-analytics",
    anchor: "crm-analytics",
    icon: ChartColumn,
    bullets: [
      "Contacts with tags, custom fields, segments, lists, import and export, and a full timeline",
      "Sales pipelines with deal boards",
      "A dashboard and analytics for conversations, response times, team performance, campaigns, revenue and click-to-WhatsApp ads",
      "Scheduled CSV and PDF reports",
      "Outgoing webhooks and a public API with API keys",
      "Security: workspace isolation, two-factor sign-in, audit log, data export and deletion",
    ],
  },
];

/** Not live yet. Always show with a "Coming soon" badge, never as available. */
export const comingSoon: { title: string; summary: string }[] = [
  {
    title: "Instagram DMs",
    summary: "Instagram direct messages in the same shared inbox as your WhatsApp chats.",
  },
];

export function getFeature(slug: FeatureSlug): Feature {
  const feature = features.find((f) => f.slug === slug);
  if (!feature) throw new Error(`Unknown feature slug: ${slug}`);
  return feature;
}
