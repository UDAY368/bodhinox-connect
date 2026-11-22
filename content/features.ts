import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  CalendarCheck,
  Camera,
  ClipboardList,
  Megaphone,
  MessagesSquare,
  MousePointerClick,
  Store,
  Users,
  Workflow,
} from "lucide-react";

/**
 * The product's feature areas, in the CRM's own order and groups
 * (sidebar: Engage · Grow · Sell). Every bullet is something the live app
 * does today (checked against the production dashboard on 22 Nov 2026).
 * Do not add a bullet here unless it is built and switched on.
 */

export type FeatureSlug =
  | "team-inbox"
  | "crm-analytics"
  | "whatsapp-forms"
  | "instagram"
  | "automation"
  | "campaigns"
  | "ads"
  | "ai-agent"
  | "commerce"
  | "appointments";

export type FeatureGroup = "engage" | "grow" | "sell";

export const featureGroups: { id: FeatureGroup; label: string; blurb: string }[] = [
  { id: "engage", label: "Engage", blurb: "Talk to every customer in one place" },
  { id: "grow", label: "Grow", blurb: "Reach more people and automate replies" },
  { id: "sell", label: "Sell", blurb: "Take orders, payments and bookings in chat" },
];

export type Feature = {
  slug: FeatureSlug;
  group: FeatureGroup;
  /** Full name, used as the H1 on its feature page. */
  title: string;
  /** Short label for nav, chips and the features sub-nav. */
  shortTitle: string;
  /** One-line description for the mega-menu. */
  menuLine: string;
  /** <title> text before " | Bodhinox Connect" (at most 41 characters). */
  seoTitle: string;
  /** Meta description for the feature page, 140 to 160 characters. */
  metaDescription: string;
  /** Two-line summary for cards. */
  summary: string;
  /** Primary search phrase this page is written around. */
  keyword: string;
  /** Page URL. */
  href: `/features/${FeatureSlug}`;
  /** Anchor id on /features. */
  anchor: string;
  icon: LucideIcon;
  /** Full capability list. */
  bullets: string[];
};

export const features: Feature[] = [
  {
    slug: "team-inbox",
    group: "engage",
    seoTitle: "Shared team inbox for WhatsApp",
    metaDescription:
      "One shared inbox for WhatsApp numbers and Instagram DMs. Route chats, track the 24-hour window, add notes and take over from the AI agent in one click.",
    title: "Shared team inbox",
    shortTitle: "Team inbox",
    menuLine: "WhatsApp and Instagram chats in one inbox",
    summary:
      "Every chat from every WhatsApp number and your Instagram account in one inbox. Assign, note and reply as a team, and take over from the bot in one click.",
    keyword: "shared team inbox",
    href: "/features/team-inbox",
    anchor: "team-inbox",
    icon: MessagesSquare,
    bullets: [
      "WhatsApp and Instagram DMs in one inbox, with several WhatsApp numbers per workspace",
      "Active, Requesting and Intervened queues, saved views, filters and full-text message search",
      "24-hour window ring on every chat, so the team sees how long is left to reply",
      "Assignment, round-robin routing rules, reply targets and over-target alerts",
      "Internal notes with @mentions, quick replies, media library, templates, buttons and lists",
      "Send products, payment links, store links and forms straight from the composer",
      "Human handoff: pause the AI agent and take over in one click, with full handling history",
      "Business hours, away messages, phone-number masking and browser notifications",
    ],
  },
  {
    slug: "crm-analytics",
    group: "engage",
    seoTitle: "WhatsApp CRM, pipelines and analytics",
    metaDescription:
      "A WhatsApp CRM with contact timelines, consent records, segments and deal pipelines, plus analytics on response times, team, campaigns, revenue and ads.",
    title: "Contacts, pipelines and analytics",
    shortTitle: "CRM and analytics",
    menuLine: "Contacts, segments, deals and reports",
    summary:
      "Every contact with a full timeline and consent record, deal pipelines, and live reports on chats, team speed, campaigns, revenue and AI.",
    keyword: "WhatsApp CRM",
    href: "/features/crm-analytics",
    anchor: "crm-analytics",
    icon: Users,
    bullets: [
      "Contacts with tags, typed custom fields, owner, notes and a full timeline of chats, orders, deals and bookings",
      "WhatsApp opt-in record with source and date, and STOP / START handled automatically",
      "Live segments and static lists, CSV import with column matching, and export",
      "Sales pipelines with stages, deal values, owners and win rate",
      "Dashboard with live KPIs: conversations, contacts, open deal value, revenue, bookings, ad spend and AI",
      "Analytics for conversations, team performance, campaign results, channel split and busiest hours",
      "Compare periods, save reports and schedule CSV or PDF reports",
    ],
  },
  {
    slug: "whatsapp-forms",
    group: "engage",
    seoTitle: "WhatsApp Forms (Meta Flows) builder",
    metaDescription:
      "Build multi-screen WhatsApp Forms with Meta Flows. Collect leads, bookings and feedback inside the chat and save every answer to the contact automatically.",
    title: "WhatsApp Forms",
    shortTitle: "WhatsApp Forms",
    menuLine: "Multi-screen forms inside the chat",
    summary:
      "Native multi-screen forms that open inside WhatsApp. Answers are saved to the contact, ready for segments, flows and follow-ups.",
    keyword: "WhatsApp Flows forms",
    href: "/features/whatsapp-forms",
    anchor: "whatsapp-forms",
    icon: ClipboardList,
    bullets: [
      "Up to 10 screens per form with a live phone preview as you build",
      "Text, email, phone, number, date, dropdown, radio, checkbox and opt-in fields",
      "Answers saved straight to contact fields, with validation",
      "Send a form from the inbox, a flow step, a template button or a campaign",
      "Responses list with CSV export, and published to Meta in one click",
    ],
  },
  {
    slug: "instagram",
    group: "grow",
    seoTitle: "Instagram DM automation and inbox",
    metaDescription:
      "Automate Instagram DMs: send links to everyone who comments a keyword, grow followers, capture story-reply leads and answer DMs in the same team inbox.",
    title: "Instagram automation",
    shortTitle: "Instagram",
    menuLine: "Comment-to-DM, story leads and DM inbox",
    summary:
      "Turn comments and story replies into conversations. Auto-DM links, grow followers and answer Instagram DMs in the same inbox as WhatsApp.",
    keyword: "Instagram DM automation",
    href: "/features/instagram",
    anchor: "instagram",
    icon: Camera,
    bullets: [
      "Auto-DM a link to everyone who comments a keyword on a post or reel",
      "Grow followers from comments: ask people to follow before you send the reward",
      "Leads from story replies and story mentions",
      "Conversation starters, main menu, default reply and ref links",
      "AI replies to comments, and AI agents that answer DMs",
      "Instagram DMs in the shared team inbox, next to WhatsApp chats",
      "Instagram sequences and results for the last 7 days",
    ],
  },
  {
    slug: "automation",
    group: "grow",
    seoTitle: "WhatsApp chatbot flows and automation",
    metaDescription:
      "Build WhatsApp and Instagram chatbot flows visually, test them with a dry run, publish versions and automate replies by keyword, event, tag or schedule.",
    title: "Flows and automation",
    shortTitle: "Automation",
    menuLine: "Visual chatbot builder, rules and sequences",
    summary:
      "Build chat flows on a visual canvas and run rules and sequences on events, keywords and schedules. Test before you publish and see every run.",
    keyword: "WhatsApp chatbot",
    href: "/features/automation",
    anchor: "automation",
    icon: Workflow,
    bullets: [
      "Visual flow builder with messages, buttons, lists, questions, conditions, waits and attributes",
      "Steps for AI replies, payment links, store links, forms, appointment booking, API requests and agent handoff",
      "Triggers: keyword, pattern, template button, first message, new contact, tag added, order received, Instagram comment",
      "Versioned publishing, dry run, run inspection and replay",
      "Automation rules and multi-step sequences for WhatsApp and Instagram",
      "Starter flows to begin from, and opt-out (STOP) respected everywhere",
    ],
  },
  {
    slug: "campaigns",
    group: "grow",
    seoTitle: "WhatsApp broadcast and campaigns",
    metaDescription:
      "Send approved WhatsApp templates to the right segment, schedule them, track delivery, reads, replies, clicks and revenue, and retarget people who did not reply.",
    title: "Campaigns and templates",
    shortTitle: "Campaigns",
    menuLine: "Broadcasts, templates and retargeting",
    summary:
      "Send approved templates to the right customers, see who read, replied, clicked and bought, and follow up with everyone else.",
    keyword: "WhatsApp broadcast",
    href: "/features/campaigns",
    anchor: "campaigns",
    icon: Megaphone,
    bullets: [
      "Send to all contacts, tags, segments, lists, custom fields or a CSV, with exclusions",
      "Personalised variables, test sends and scheduling up to 90 days ahead",
      "Delivery, read, reply and click tracking, with orders and revenue per campaign",
      "Retarget people by what they did with an earlier campaign",
      "Number quality and daily messaging limit shown before you send",
      "Templates: standard, carousel, one-time code and limited-time offer, with Meta approval status",
      "A library of ready-written templates and an AI template writer",
    ],
  },
  {
    slug: "ads",
    group: "grow",
    seoTitle: "Click-to-WhatsApp ads reporting",
    metaDescription:
      "Connect Meta ads and see spend, reach, conversations started, cost per conversation, leads and orders from every click-to-WhatsApp ad in one place.",
    title: "Click-to-WhatsApp ads",
    shortTitle: "Meta Ads",
    menuLine: "From ad click to chat to customer",
    summary:
      "Connect your Meta ad account and follow every click-to-WhatsApp ad from spend to conversation to order, with lead forms and ad-source tagging in the inbox.",
    keyword: "click to WhatsApp ads",
    href: "/features/ads",
    anchor: "ads",
    icon: MousePointerClick,
    bullets: [
      "Amount spent, reach, impressions, click-through rate and link clicks per campaign",
      "Conversations started and cost per conversation",
      "From ad to customer: clicks, chats, leads and orders in one funnel",
      "Ad source shown on the conversation in the inbox, and in analytics",
      "Meta lead forms, audiences and automations on ad leads",
      "Daily trend, placements and top campaigns by spend",
    ],
  },
  {
    slug: "ai-agent",
    group: "grow",
    seoTitle: "KHAGA AI agents for WhatsApp",
    metaDescription:
      "KHAGA AI agents answer WhatsApp and Instagram customers from your own knowledge, hand sensitive chats to your team and help agents with summaries and lead scores.",
    title: "KHAGA AI agents",
    shortTitle: "AI agents",
    menuLine: "AI that answers from your knowledge",
    summary:
      "KHAGA AI agents answer customers at any hour from your own documents, website and FAQs, and hand over to a person when they should.",
    keyword: "WhatsApp AI agent",
    href: "/features/ai-agent",
    anchor: "ai-agent",
    icon: Bot,
    bullets: [
      "Several AI agents per workspace, each with its own role, tone, channels and working hours",
      "Knowledge from documents, website pages and FAQs, with per-source control",
      "Handoff rules and confidence limits: sensitive or unsure chats go to a person",
      "Test agents in a playground before they go live",
      "Assistant for the team: chat summaries, suggested replies, intent and lead score, business insights",
      "AI template writer and flow generator",
      "Activity log, unanswered questions and quality metrics",
    ],
  },
  {
    slug: "commerce",
    group: "sell",
    seoTitle: "WhatsApp store, online shop and payments",
    metaDescription:
      "Sell on WhatsApp and your own online store: catalogue, theme editor, cart checkout, Razorpay UPI payments, COD and Shiprocket shipping, plus Shopify and WooCommerce.",
    title: "Products, online store and payments",
    shortTitle: "Store and payments",
    menuLine: "Catalogue, online store, payments, shipping",
    summary:
      "A product catalogue, your own online store with a theme editor, cart checkout, Razorpay and cash on delivery, and shipping with tracking.",
    keyword: "WhatsApp store",
    href: "/features/commerce",
    anchor: "commerce",
    icon: Store,
    bullets: [
      "Catalogue with categories, collections, variants, stock and Meta catalogue sync",
      "Your own online store: template, theme editor, pages, reviews and a shareable link with QR code",
      "Buyers order with a WhatsApp code or send their cart on WhatsApp",
      "Razorpay payment links and checkout (UPI, cards, net banking) and cash on delivery",
      "Orders, returns, refunds and order notices on WhatsApp",
      "Shipping with Shiprocket, and Shopify and WooCommerce order messages",
      "Shop reports and revenue in analytics, with no fee on orders",
    ],
  },
  {
    slug: "appointments",
    group: "sell",
    seoTitle: "WhatsApp appointment booking",
    metaDescription:
      "Let customers book appointments from a booking page or chat, confirm on WhatsApp, pay in advance with Razorpay and get automatic reminders before the visit.",
    title: "Appointments and bookings",
    shortTitle: "Appointments",
    menuLine: "Booking pages, reminders and paid slots",
    summary:
      "Services, practitioners and locations with a public booking page. Bookings confirm on WhatsApp, reminders go out by themselves, and paid slots use Razorpay.",
    keyword: "WhatsApp appointment booking",
    href: "/features/appointments",
    anchor: "appointments",
    icon: CalendarCheck,
    bullets: [
      "Services with duration, buffer, capacity, price and online or in-person mode",
      "Practitioners, locations with time zones, weekly hours and holidays",
      "A public booking page confirmed with a code on WhatsApp, and a manage-booking link",
      "Automatic reminders 24 hours and 2 hours before",
      "Paid appointments through Razorpay, and booking from a flow step",
      "Schedule by day, week or list, with outcomes, no-shows and follow-up tasks",
    ],
  },
];

export function getFeature(slug: FeatureSlug): Feature {
  const feature = features.find((f) => f.slug === slug);
  if (!feature) throw new Error(`Unknown feature slug: ${slug}`);
  return feature;
}

export function featuresIn(group: FeatureGroup): Feature[] {
  return features.filter((f) => f.group === group);
}

/** Analytics icon, reused by cards that link to reporting. */
export const analyticsIcon = BarChart3;
