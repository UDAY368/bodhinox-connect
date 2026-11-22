import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Brand colours shared by the OG images and icons, which render outside the
 * CSS token system. Values match the CRM's light "blue" theme
 * (BODHINOX_CHAT/src/app/globals.css). Orange belongs to the logo only.
 */
export const BRAND_COLORS = {
  light: {
    background: "#f5f5f7",
    card: "#ffffff",
    foreground: "#1d1d1f",
    muted: "#6e6e73",
    border: "#e3e3e8",
    primary: "#0071e3",
    orange: "#f57c1f",
  },
} as const;

let cachedMark: string | null = null;

/**
 * The sunflower mark as a PNG data URI, for next/og ImageResponse (which
 * cannot read webp). Read from public/ at build time.
 */
export function markPngDataUri(): string {
  if (!cachedMark) {
    const file = readFileSync(path.join(process.cwd(), "public", "brand", "mark-512.png"));
    cachedMark = `data:image/png;base64,${file.toString("base64")}`;
  }
  return cachedMark;
}
