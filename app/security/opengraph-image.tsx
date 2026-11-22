import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Built for customer data from day one | Bodhinox Connect";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: "Built for customer data from day one", eyebrow: "Security" });
}
