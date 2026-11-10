import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Everything you need to run customer conversations on WhatsApp | Bodhinox Connect";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "Everything you need to run customer conversations on WhatsApp", eyebrow: "Features" });
}
