/**
 * The Bodhinox Connect mark: two rounded speech bubbles linked like a chain.
 * The outlined bubble sits behind on the left, the copper bubble in front on
 * the right, and the outline passes over the copper at the right crossing
 * and under it at the bottom crossing. Drawn on a 32 x 32 grid.
 *
 * Paint order: OUTLINE, then FILLED, then OVER (the outline segment that
 * crosses on top). Reused by the Logo component, the favicon, the apple
 * icon, the OG images and the files in public/brand.
 */
export const MARK_VIEWBOX = "0 0 32 32";
export const MARK_STROKE = 2.2;

export const MARK_OUTLINE =
  "M7.1 3H16.9A4.6 4.6 0 0 1 21.5 7.6V13.4A4.6 4.6 0 0 1 16.9 18H10L6 21.5V17.7A4.6 4.6 0 0 1 2.5 13.4V7.6A4.6 4.6 0 0 1 7.1 3Z";

export const MARK_FILLED =
  "M15.1 11H24.9A4.6 4.6 0 0 1 29.5 15.6V21.4A4.6 4.6 0 0 1 26 25.87V29.5L22 26H15.1A4.6 4.6 0 0 1 10.5 21.4V15.6A4.6 4.6 0 0 1 15.1 11Z";

export const MARK_OVER = "M21.5 11V13.4A4.6 4.6 0 0 1 16.9 18";

export const BRAND_COLORS = {
  light: { ink: "#1d1b17", muted: "#6b6458", copper: "#a65328", bg: "#f8f7f4" },
  dark: { ink: "#f3eee7", muted: "#a39b8e", copper: "#d0794a", bg: "#171715" },
} as const;

/** Standalone SVG markup for the mark, for data URIs in generated images. */
export function markSvg(colors: { ink: string; copper: string } = BRAND_COLORS.light, size = 32): string {
  const stroke = `fill="none" stroke="${colors.ink}" stroke-width="${MARK_STROKE}" stroke-linejoin="round"`;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${MARK_VIEWBOX}">` +
    `<path d="${MARK_OUTLINE}" ${stroke}/>` +
    `<path d="${MARK_FILLED}" fill="${colors.copper}"/>` +
    `<path d="${MARK_OVER}" ${stroke}/>` +
    `</svg>`
  );
}

export function markDataUri(colors?: { ink: string; copper: string }, size?: number): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(markSvg(colors, size))}`;
}
