import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Simple plans in rupees | Bodhinox Connect";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "Simple plans in rupees", eyebrow: "Pricing" });
}
