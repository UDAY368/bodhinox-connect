/**
 * The date each page's content last changed meaningfully (ISO, YYYY-MM-DD).
 * One source for the sitemap's <lastmod>, the guides' "Updated" line and
 * Article JSON-LD, and the legal pages' "Last updated" line.
 *
 * Bump a page's date only when its copy really changes. Never set every page
 * to the build date: Google stops trusting <lastmod> when it always moves.
 */
export const PAGE_DATES = {
  "/": "2026-11-10",
  "/features": "2026-11-10",
  "/features/team-inbox": "2026-11-10",
  "/features/campaigns": "2026-11-10",
  "/features/automation": "2026-11-10",
  "/features/ai-agent": "2026-11-10",
  "/features/commerce": "2026-11-10",
  "/features/crm-analytics": "2026-11-10",
  "/pricing": "2026-11-10",
  "/solutions": "2026-11-10",
  "/whatsapp-business-platform": "2026-11-10",
  "/guides": "2026-11-10",
  "/guides/whatsapp-business-api-india": "2026-11-10",
  "/guides/whatsapp-marketing-campaigns": "2026-11-10",
  "/guides/whatsapp-chatbots-ai-agents": "2026-11-10",
  "/about": "2026-11-10",
  "/contact": "2026-11-10",
  "/privacy": "2026-11-10",
  "/terms": "2026-11-10",
  "/data-deletion": "2026-11-10",
  "/acceptable-use": "2026-11-10",
  "/sitemap": "2026-11-10",
} as const satisfies Record<string, string>;

export type DatedPath = keyof typeof PAGE_DATES;

export function pageDate(path: DatedPath): string {
  return PAGE_DATES[path];
}
