import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Connect the tools you already use | Bodhinox Connect";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "Connect the tools you already use", eyebrow: "Integrations" });
}
