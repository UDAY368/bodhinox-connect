import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "About Bodhinox Connect | Bodhinox Connect";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "About Bodhinox Connect", eyebrow: "About" });
}
