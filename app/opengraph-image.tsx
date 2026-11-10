import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Bodhinox Connect: every customer conversation, connected.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "Every customer conversation, connected.", eyebrow: "WhatsApp inbox, campaigns and CRM" });
}
