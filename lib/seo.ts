import { createElement } from "react";
import type { Metadata } from "next";
import { company } from "@/content/company";
import type { Faq } from "@/content/faqs";
import { PRICES_CONFIRMED, plans } from "@/content/pricing";
import { absoluteUrl, site } from "@/content/site";

/* --------------------------------------------------------------------------
   Page metadata
   -------------------------------------------------------------------------- */

export type PageMetaInput = {
  /** Page name only, e.g. "Pricing". Becomes "Pricing | Bodhinox Connect". */
  title: string;
  /** 140 to 160 characters, unique per page. */
  description: string;
  /** Route path, e.g. "/pricing". Becomes the canonical URL. */
  path: string;
  /** Use `title` as the full title without the brand suffix (home page). */
  absoluteTitle?: boolean;
  /** "article" for guides. */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

const SUFFIX = ` | ${site.name}`;

/**
 * Metadata for one page: title, description, canonical, Open Graph and Twitter.
 * The OG image comes from the opengraph-image.tsx file in the route folder,
 * which Next.js adds on top of this object.
 */
export function pageMetadata(input: PageMetaInput): Metadata {
  const fullTitle = input.absoluteTitle ? input.title : `${input.title}${SUFFIX}`;
  const url = absoluteUrl(input.path);

  if (process.env.NODE_ENV !== "production") {
    if (fullTitle.length > 60) console.warn(`[seo] title over 60 chars (${fullTitle.length}): ${fullTitle}`);
    const n = input.description.length;
    if (n < 140 || n > 160) console.warn(`[seo] description should be 140-160 chars (${n}): ${input.path}`);
  }

  return {
    title: { absolute: fullTitle },
    description: input.description,
    alternates: { canonical: url, languages: { "en-IN": url, "x-default": url } },
    openGraph: {
      type: input.type ?? "website",
      url,
      title: fullTitle,
      description: input.description,
      siteName: site.name,
      locale: site.locale,
      ...(input.type === "article"
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime ?? input.publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: input.description,
    },
    ...(input.noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Absolute URL of a route's opengraph-image.tsx output (the sitemap and Article JSON-LD use it). */
export function ogImageUrl(path: string): string {
  return absoluteUrl(path === "/" ? "/opengraph-image" : `${path}/opengraph-image`);
}

/** Site-wide robots default: index everything and allow large previews. */
export const defaultRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  "max-image-preview": "large",
  "max-snippet": -1,
  "max-video-preview": -1,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

/* --------------------------------------------------------------------------
   JSON-LD
   -------------------------------------------------------------------------- */

type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

/**
 * Renders one <script type="application/ld+json">. Server component.
 * Usage: <JsonLd data={faqPageJsonLd(homeFaqs)} />
 */
export function JsonLd({ data }: { data: JsonLdData }) {
  // Escape "<" so a string in the data can never close the script tag.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return createElement("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: json } });
}

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

export function organizationJsonLd() {
  const address = company.address;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    email: site.email,
    description: site.description,
    ...(company.legalName ? { legalName: company.legalName } : {}),
    ...(company.phone ? { telephone: company.phone } : {}),
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: address.street,
            addressLocality: address.locality,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.country,
          },
        }
      : {}),
    areaServed: company.countryCode,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: site.email,
        ...(company.phone ? { telephone: company.phone } : {}),
        areaServed: company.countryCode,
        // Add "hi" here only once Hindi support is actually offered.
        availableLanguage: ["en"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: site.name,
    url: site.url,
    inLanguage: site.language,
    publisher: { "@id": ORG_ID },
  };
}

/**
 * SoftwareApplication, with one INR offer per priced plan once PRICES_CONFIRMED.
 * Use on Home and Pricing. Never add aggregateRating or review without real reviews.
 */
export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    url: site.url,
    description: site.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    publisher: { "@id": ORG_ID },
    ...(PRICES_CONFIRMED ? { offers: offersFromPlans() } : {}),
  };
}

function offersFromPlans() {
  return plans
    .filter((p) => p.monthly !== null)
    .map((p) => ({
      "@type": "Offer",
      name: `${p.name} plan`,
      price: String(p.monthly),
      priceCurrency: "INR",
      url: absoluteUrl("/pricing"),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(p.monthly),
        priceCurrency: "INR",
        unitCode: "MON",
        unitText: "MONTH",
        valueAddedTaxIncluded: false,
      },
    }));
}

/** FAQPage from the same array the page renders. */
export function faqPageJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList. Home is added first automatically. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export type ArticleInput = {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
};

export function articleJsonLd(a: ArticleInput) {
  const url = absoluteUrl(a.path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    url,
    mainEntityOfPage: url,
    image: ogImageUrl(a.path),
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    inLanguage: site.language,
    author: { "@type": "Organization", "@id": ORG_ID, name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
  };
}



