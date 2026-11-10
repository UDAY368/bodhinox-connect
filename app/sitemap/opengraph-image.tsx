import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Sitemap | Bodhinox Connect";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "Every page on Bodhinox Connect", eyebrow: "Sitemap" });
}
