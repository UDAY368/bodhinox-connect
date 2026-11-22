import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#f5f5f7",
    theme_color: "#f5f5f7",
    lang: site.language,
    icons: [
      { src: "/icon.png", type: "image/png", sizes: "192x192" },
      { src: "/logo.png", type: "image/png", sizes: "512x512" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
