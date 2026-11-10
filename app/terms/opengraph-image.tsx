import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Terms of service | Bodhinox Connect";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "Terms of service", eyebrow: "Legal" });
}
