import { Plus } from "lucide-react";
import type { Faq } from "@/content/faqs";

/**
 * Questions as native <details>, so they open without JavaScript. Feed the
 * same array to faqPageJsonLd() so the visible text matches the structured data.
 */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {faqs.map((f) => (
        <details key={f.question} className="group/faq">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-sans text-body font-semibold text-foreground">{f.question}</span>
            <Plus
              size={20}
              aria-hidden
              className="mt-1 shrink-0 text-muted-foreground transition-transform duration-200 group-open/faq:rotate-45"
            />
          </summary>
          <p className="max-w-reading pb-6 text-muted-foreground">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
