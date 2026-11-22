import { ImageResponse } from "next/og";
import { BRAND_COLORS, markPngDataUri } from "@/components/brand/mark";
import { site } from "@/content/site";

/**
 * Shared Open Graph image (1200 x 630). Each route folder has a tiny
 * opengraph-image.tsx that calls this with its own title, so every page gets
 * its own card. Generated at build time. Styled like the CRM: light grey
 * page, white sheet, blue accent, sunflower mark.
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
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 28, background: c.background }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            background: c.card,
            border: `1px solid ${c.border}`,
            borderRadius: 28,
            color: c.foreground,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={markPngDataUri()} width={64} height={64} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ fontSize: 38, fontWeight: 700, letterSpacing: -1 }}>Bodhinox</span>
              <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 6, color: c.orange, marginTop: 4 }}>
                CONNECT
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
            {eyebrow ? (
              <div style={{ display: "flex" }}>
                <span
                  style={{
                    display: "flex",
                    fontSize: 24,
                    fontWeight: 600,
                    color: c.primary,
                    background: "#0071e314",
                    padding: "8px 18px",
                    borderRadius: 999,
                  }}
                >
                  {eyebrow}
                </span>
              </div>
            ) : null}
            <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2.5 }}>
              {title}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: `1px solid ${c.border}`,
              paddingTop: 24,
              fontSize: 26,
              color: c.muted,
            }}
          >
            <span>{site.tagline}</span>
            <span style={{ color: c.primary }}>{site.domain}</span>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
