import type { MetadataRoute } from "next";
import { routes } from "@/content/nav";
import { PAGE_DATES } from "@/content/seo";
import { absoluteUrl } from "@/content/site";

/**
 * sitemap.xml: every indexable page with its real content date (PAGE_DATES)
 * and en-IN / x-default alternates. Built at build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => {
    const lastModified = PAGE_DATES[r.path];
    // Fails the build if a new route was added without a date.
    if (!lastModified) throw new Error(`[sitemap] add ${r.path} to PAGE_DATES in content/seo.ts`);
    const url = absoluteUrl(r.path);
    return {
      url,
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates: { languages: { "en-IN": url, "x-default": url } },
    };
  });
}

