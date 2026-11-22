import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  Braces,
  Camera,
  CreditCard,
  FileSpreadsheet,
  LayoutGrid,
  Megaphone,
  MessageCircle,
  ShoppingBag,
  Store,
  Truck,
  Video,
  Webhook,
} from "lucide-react";

/**
 * Integrations for /integrations. Status follows the live CRM audit
 * (docs/redesign-plan.md, 22 Nov 2026): Zoom shows "not available on this
 * deployment", so it stays "coming-soon". Everything else is live.
 * No third-party logos: a lucide icon stands in for each one.
 */

export type IntegrationStatus = "available" | "coming-soon";

export type Integration = {
  name: string;
  /** One line on what it does inside Bodhinox Connect. */
  line: string;
  icon: LucideIcon;
  status: IntegrationStatus;
  /** Optional internal link for more detail. */
  href?: string;
};

export type IntegrationGroup = {
  id: string;
  title: string;
  blurb: string;
  items: Integration[];
};

export const integrationGroups: IntegrationGroup[] = [
  {
    id: "stores",
    title: "Stores",
    blurb: "Bring orders from the shop you already run into the chat.",
    items: [
      {
        name: "Shopify",
        line: "Orders, payments and abandoned carts arrive as contacts and order messages.",
        icon: ShoppingBag,
        status: "available",
        href: "/features/commerce",
      },
      {
        name: "WooCommerce",
        line: "Order updates from your WordPress shop, sent to the customer on WhatsApp.",
        icon: Store,
        status: "available",
        href: "/features/commerce",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    blurb: "Get paid inside the conversation, with settlement you can trust.",
    items: [
      {
        name: "Razorpay",
        line: "Payment links by UPI, cards and netbanking, marked paid only after Razorpay confirms, with refunds.",
        icon: CreditCard,
        status: "available",
        href: "/features/commerce",
      },
      {
        name: "Cash on delivery",
        line: "Offer COD in your store and track it on the order until it is collected.",
        icon: Banknote,
        status: "available",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping",
    blurb: "Ship from the order screen and keep the customer posted.",
    items: [
      {
        name: "Shiprocket",
        line: "Create shipments from an order and send tracking updates on WhatsApp.",
        icon: Truck,
        status: "available",
      },
    ],
  },
  {
    id: "meta",
    title: "Meta",
    blurb: "The official Meta platforms, connected from inside the app.",
    items: [
      {
        name: "WhatsApp Business Platform",
        line: "Connect your own numbers with Meta's Embedded Signup on the official Cloud API.",
        icon: MessageCircle,
        status: "available",
        href: "/whatsapp-business-platform",
      },
      {
        name: "Instagram",
        line: "DMs, comment replies and comment-to-DM automation in the same inbox.",
        icon: Camera,
        status: "available",
        href: "/features/instagram",
      },
      {
        name: "Meta catalogue",
        line: "Sync your products to Meta and send product and product list messages.",
        icon: LayoutGrid,
        status: "available",
        href: "/features/commerce",
      },
      {
        name: "Meta Ads",
        line: "Click-to-WhatsApp ads reporting, from spend to conversations, leads and orders.",
        icon: Megaphone,
        status: "available",
        href: "/features/ads",
      },
    ],
  },
  {
    id: "automation",
    title: "Automation and data",
    blurb: "Send events out and let your own tools act in Bodhinox Connect.",
    items: [
      {
        name: "Google Sheets",
        line: "Add a row to a sheet from any flow, such as a new lead or a form answer.",
        icon: FileSpreadsheet,
        status: "available",
      },
      {
        name: "Webhooks",
        line: "Signed events for messages, flows, orders, payments and appointments, with retries.",
        icon: Webhook,
        status: "available",
        href: "/developers#webhooks",
      },
      {
        name: "Public API",
        line: "Send messages, manage contacts and launch broadcasts with scoped API keys.",
        icon: Braces,
        status: "available",
        href: "/developers",
      },
    ],
  },
  {
    id: "meetings",
    title: "Meetings",
    blurb: "Online appointments with a meeting link attached.",
    items: [
      {
        name: "Zoom",
        line: "Add a meeting link to online appointments when they are booked.",
        icon: Video,
        status: "coming-soon",
      },
    ],
  },
];

export const statusLabel: Record<IntegrationStatus, string> = {
  available: "Available",
  "coming-soon": "Coming soon",
};
