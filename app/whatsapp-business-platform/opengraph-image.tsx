import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "How Bodhinox Connect uses the WhatsApp Business Platform | Bodhinox Connect";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "How Bodhinox Connect uses the WhatsApp Business Platform", eyebrow: "Platform" });
}
