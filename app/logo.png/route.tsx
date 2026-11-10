import { ImageResponse } from "next/og";
import { BRAND_COLORS, markDataUri } from "@/components/brand/mark";

// A 512 x 512 PNG of the mark at /logo.png, for Organization JSON-LD and the web manifest.
export const dynamic = "force-static";

export function GET() {
  const c = BRAND_COLORS.light;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: c.bg }}>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={markDataUri(c, 360)} width={360} height={360} />
      </div>
    ),
    { width: 512, height: 512 },
  );
}
