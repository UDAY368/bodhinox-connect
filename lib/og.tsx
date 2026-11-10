import { ImageResponse } from "next/og";
import { BRAND_COLORS, markDataUri } from "@/components/brand/mark";
import { site } from "@/content/site";

/**
 * Shared Open Graph image (1200 x 630). Each route folder has a tiny
 * opengraph-image.tsx that calls this with its own title, so every page gets
 * its own card. Generated at build time.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export type OgInput = {
  /** Large headline, at most about 60 characters. */
  title: string;
  /** Small label above the title, e.g. "Pricing" or "Guide". */
  eyebrow?: string;
};

export function renderOgImage({ title, eyebrow }: OgInput) {
  const c = BRAND_COLORS.light;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: c.bg,
          color: c.ink,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={markDataUri(c, 64)} width={64} height={64} />
          <div style={{ display: "flex", fontSize: 40, letterSpacing: -1 }}>
            <span style={{ fontWeight: 700 }}>Bodhinox</span>
            <span style={{ color: c.muted, marginLeft: 12 }}>Connect</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 980 }}>
          {eyebrow ? (
            <div style={{ display: "flex", fontSize: 26, color: c.copper, letterSpacing: 2, textTransform: "uppercase" }}>
              {eyebrow}
            </div>
          ) : null}
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2.5 }}>
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #e7e1d6",
            paddingTop: 28,
            fontSize: 28,
            color: c.muted,
          }}
        >
          <span>{site.tagline}</span>
          <span>{site.domain}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
