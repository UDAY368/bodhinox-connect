import { features } from "./features";
import { guides } from "./guides";
import { industries } from "./industries";
import type { DatedPath } from "./seo";

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
      { label: "Sitemap", href: "/sitemap" },
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

export type RouteSection = "Main pages" | "Features" | "Guides" | "Company" | "Legal";

export type RouteEntry = {
  path: DatedPath;
  /** Link text on the HTML sitemap (/sitemap). */
  label: string;
  section: RouteSection;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

/**
 * Every indexable route. Drives app/sitemap.ts (sitemap.xml) and the HTML
 * sitemap at /sitemap. Each path needs a date in PAGE_DATES (content/seo.ts).
 */
export const routes: RouteEntry[] = [
  { path: "/", label: "Home", section: "Main pages", changeFrequency: "weekly", priority: 1 },
  { path: "/pricing", label: "Pricing", section: "Main pages", changeFrequency: "monthly", priority: 0.8 },
  { path: "/solutions", label: "Solutions by industry", section: "Main pages", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "/whatsapp-business-platform",
    label: "WhatsApp Business Platform",
    section: "Main pages",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  { path: "/features", label: "All features", section: "Features", changeFrequency: "monthly", priority: 0.8 },
  ...features.map((f) => ({
    path: f.href as DatedPath,
    label: f.shortTitle,
    section: "Features" as const,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
  { path: "/guides", label: "All guides", section: "Guides", changeFrequency: "weekly", priority: 0.8 },
  ...guides.map((g) => ({
    path: g.href as DatedPath,
    label: g.title,
    section: "Guides" as const,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
  { path: "/about", label: "About", section: "Company", changeFrequency: "yearly", priority: 0.5 },
  { path: "/contact", label: "Contact", section: "Company", changeFrequency: "yearly", priority: 0.5 },
  { path: "/sitemap", label: "Sitemap", section: "Company", changeFrequency: "monthly", priority: 0.3 },
  { path: "/privacy", label: "Privacy policy", section: "Legal", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", label: "Terms of service", section: "Legal", changeFrequency: "yearly", priority: 0.3 },
  { path: "/data-deletion", label: "Data deletion", section: "Legal", changeFrequency: "yearly", priority: 0.3 },
  {
    path: "/acceptable-use",
    label: "Acceptable use and messaging policy",
    section: "Legal",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];
