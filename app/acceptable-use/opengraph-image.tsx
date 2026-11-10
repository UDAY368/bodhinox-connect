import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Acceptable use and messaging policy | Bodhinox Connect";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "Acceptable use and messaging policy", eyebrow: "Legal" });
}
