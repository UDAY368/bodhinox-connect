import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Talk to us | Bodhinox Connect";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "Talk to us", eyebrow: "Contact" });
}
