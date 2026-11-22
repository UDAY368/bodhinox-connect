import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Public API and signed webhooks | Bodhinox Connect";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "Public API and signed webhooks", eyebrow: "Developers" });
}
