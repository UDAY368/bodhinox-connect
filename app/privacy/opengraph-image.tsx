import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Privacy policy | Bodhinox Connect";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "Privacy policy", eyebrow: "Legal" });
}
