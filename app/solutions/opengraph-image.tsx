import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "WhatsApp for your kind of business | Bodhinox Connect";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "WhatsApp for your kind of business", eyebrow: "Solutions" });
}
