import { ImageResponse } from "next/og";
import { BRAND_COLORS, markDataUri } from "@/components/brand/mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const c = BRAND_COLORS.light;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: c.bg }}>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={markDataUri(c, 120)} width={120} height={120} />
      </div>
    ),
    size,
  );
}
