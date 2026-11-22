import { getFeature } from "@/content/features";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

const feature = getFeature("whatsapp-forms");

export const alt = `${feature.seoTitle} | Bodhinox Connect`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: feature.seoTitle, eyebrow: "Features" });
}
