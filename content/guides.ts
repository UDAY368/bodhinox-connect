/**
 * Guide metadata for /guides and the three article pages. The article body
 * lives in each page file; keep title and description here in sync with it.
 */

export type Guide = {
  slug: string;
  /** Article headline (H1). */
  title: string;
  /** Shorter title for <title>, at most 41 characters so "<title> | Bodhinox Connect" fits in 60. */
  seoTitle: string;
  /** 140 to 160 characters. Used for the meta description and the index card. */
  description: string;
  href: `/guides/${string}`;
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  keywords: string[];
};

export const guides: Guide[] = [
  {
    slug: "whatsapp-business-api-india",
    title: "WhatsApp Business API in India: a complete guide",
    seoTitle: "WhatsApp Business API in India: guide",
    description:
      "What the WhatsApp Business API is, what it costs in India, how to get approved and connect a number, and how it differs from the free WhatsApp Business app.",
    href: "/guides/whatsapp-business-api-india",
    datePublished: "2026-11-10",
    dateModified: "2026-11-10",
    readingMinutes: 7,
    keywords: ["WhatsApp Business API India", "WhatsApp Business Platform", "Cloud API"],
  },
  {
    slug: "whatsapp-marketing-campaigns",
    title: "How to run WhatsApp marketing campaigns customers welcome",
    seoTitle: "WhatsApp marketing campaigns that work",
    description:
      "A practical playbook for WhatsApp marketing: getting opt-in, writing templates Meta approves, segmenting, timing sends and following up without spamming.",
    href: "/guides/whatsapp-marketing-campaigns",
    datePublished: "2026-11-10",
    dateModified: "2026-11-10",
    readingMinutes: 6,
    keywords: ["WhatsApp marketing software", "WhatsApp broadcast", "WhatsApp templates"],
  },
  {
    slug: "whatsapp-chatbots-ai-agents",
    title: "WhatsApp chatbots and AI agents for small businesses",
    seoTitle: "WhatsApp chatbots and AI agents",
    description:
      "When to use a WhatsApp chatbot flow, when an AI agent helps, and how to set both up safely for a small business, with handoff to a person when it matters.",
    href: "/guides/whatsapp-chatbots-ai-agents",
    datePublished: "2026-11-10",
    dateModified: "2026-11-10",
    readingMinutes: 6,
    keywords: ["WhatsApp chatbot", "WhatsApp AI agent", "small business automation"],
  },
];

export function getGuide(slug: string): Guide {
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) throw new Error(`Unknown guide slug: ${slug}`);
  return guide;
}
