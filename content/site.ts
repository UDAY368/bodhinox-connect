/**
 * Site-wide constants. Everything that depends on the environment is read
 * here once, with a safe fallback, so pages never touch process.env.
 */

function trimSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

const appUrl = trimSlash(process.env.NEXT_PUBLIC_APP_URL || "https://app.bodhinoxconnect.in");

export const site = {
  name: "Bodhinox Connect",
  shortName: "Bodhinox",
  /** Canonical origin, no trailing slash. Used for metadataBase, sitemap and JSON-LD. */
  url: "https://bodhinoxconnect.in",
  domain: "bodhinoxconnect.in",
  email: "uday@bodhinox.com",
  tagline: "Every customer conversation, connected.",
  description:
    "Bodhinox Connect brings your WhatsApp inbox, campaigns, automation, AI agent, store and payments into one simple platform.",
  locale: "en_IN",
  language: "en-IN",

  /** The product app. "Start free" and "Sign in" point here. */
  appUrl,
  signupUrl: `${appUrl}/signup`,
  loginUrl: `${appUrl}/login`,

  /** Contact form POST endpoint (for example Formspree). Empty means fall back to mailto:. */
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "",
  mailto: "mailto:uday@bodhinox.com",

  /** Verification codes. Each meta tag renders only when its value is set. */
  facebookDomainVerification: process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION || "",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",

  /** Fixed content date for the sitemap. Bump it when copy changes meaningfully. */
  lastUpdated: "2026-11-10",
} as const;

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? site.url : `${site.url}${clean}`;
}
