import { getGuide } from "@/content/guides";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

const guide = getGuide("whatsapp-business-api-india");

export const alt = guide.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: guide.title, eyebrow: "Guide" });
}
