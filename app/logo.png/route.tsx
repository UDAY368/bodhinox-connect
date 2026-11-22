import { ImageResponse } from "next/og";
import { BRAND_COLORS, markPngDataUri } from "@/components/brand/mark";

// A 512 x 512 PNG of the sunflower mark at /logo.png, for Organization JSON-LD and the web manifest.
export const dynamic = "force-static";

export function GET() {
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
        <img src={markPngDataUri()} width={420} height={420} />
      </div>
    ),
    { width: 512, height: 512 },
  );
}
