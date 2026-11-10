import type { MetadataRoute } from "next";
import { routes } from "@/content/nav";
import { absoluteUrl, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: site.lastUpdated,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
