import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Data deletion instructions | Bodhinox Connect";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "Data deletion instructions", eyebrow: "Legal" });
}
