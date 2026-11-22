import { ImageResponse } from "next/og";
import { BRAND_COLORS, markPngDataUri } from "@/components/brand/mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_COLORS.light.card,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={markPngDataUri()} width={140} height={140} />
      </div>
    ),
    size,
  );
}
