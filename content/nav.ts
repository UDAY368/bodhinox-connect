import { features } from "./features";
import { guides } from "./guides";
import { industries } from "./industries";

/**
 * Navigation and the route registry. The sitemap is built from `routes`,
 * so add every new page here.
 */

export type NavLink = { label: string; href: string };

/** Primary header navigation (master prompt section 4). */
export const headerNav: NavLink[] = [
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export type FooterColumn = { title: string; links: NavLink[] };

export const footerNav: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "All features", href: "/features" },
      ...features.map((f) => ({ label: f.shortTitle, href: f.href })),
      { label: "Pricing", href: "/pricing" },
      { label: "WhatsApp Business Platform", href: "/whatsapp-business-platform" },
    ],
  },
  {
    title: "Solutions",
    links: industries.map((i) => ({ label: i.name, href: `/solutions#${i.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Guides", href: "/guides" },
      ...guides.map((g) => ({ label: g.seoTitle, href: g.href })),
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Data deletion", href: "/data-deletion" },
      { label: "Acceptable use", href: "/acceptable-use" },
    ],
  },
];

/** Stable legal URLs for the Meta app dashboard. */
export const legalLinks = {
  privacy: "/privacy",
  terms: "/terms",
  dataDeletion: "/data-deletion",
  acceptableUse: "/acceptable-use",
} as const;

export type RouteEntry = {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

/** Every public route (sections 4, 12 and 13). Drives app/sitemap.ts. */
export const routes: RouteEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/features", changeFrequency: "monthly", priority: 0.9 },
  ...features.map((f) => ({ path: f.href, changeFrequency: "monthly" as const, priority: 0.8 })),
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/solutions", changeFrequency: "monthly", priority: 0.8 },
  { path: "/whatsapp-business-platform", changeFrequency: "monthly", priority: 0.7 },
  { path: "/guides", changeFrequency: "weekly", priority: 0.7 },
  ...guides.map((g) => ({ path: g.href, changeFrequency: "monthly" as const, priority: 0.7 })),
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/data-deletion", changeFrequency: "yearly", priority: 0.3 },
  { path: "/acceptable-use", changeFrequency: "yearly", priority: 0.3 },
];
