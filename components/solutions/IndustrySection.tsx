import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, cx, Eyebrow, Section } from "@/components/ui";
import { getFeature } from "@/content/features";
import type { Industry } from "@/content/industries";
import { site } from "@/content/site";
import { FlowSequence } from "./FlowSequence";

type IndustrySectionProps = {
  industry: Industry;
  /** Odd sections put the mock-up on the left at desktop width. */
  flip?: boolean;
};

/** One industry on /solutions: the problem, the features that help, an example flow and a CTA. */
export function IndustrySection({ industry, flip = false }: IndustrySectionProps) {
  const headingId = `${industry.slug}-heading`;
  return (
    <Section id={industry.slug} labelledBy={headingId} tone={flip ? "surface" : "default"} divider>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <h2 id={headingId} className="text-h2">
            {industry.name}
          </h2>
          <p className="mt-3 text-lead text-muted">{industry.summary}</p>

          <h3 className="mt-8 text-h3">The problem</h3>
          <p className="mt-2">{industry.problem}</p>

          <h3 className="mt-8 text-h3">What helps</h3>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {industry.features.map((slug) => {
              const f = getFeature(slug);
              const Icon = f.icon;
              return (
                <li key={slug}>
                  <Link
                    href={f.href}
                    className="group flex gap-3 py-4 transition-colors duration-200 hover:text-copper"
                  >
                    <Icon size={20} aria-hidden className="mt-0.5 shrink-0 text-copper" />
                    <span className="flex-1">
                      <span className="flex items-center gap-1.5 font-semibold">
                        {f.title}
                        <ArrowRight
                          size={16}
                          aria-hidden
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </span>
                      <span className="mt-1 block text-small text-muted">{f.summary}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={site.signupUrl} aria-label={`Start free for ${industry.name.toLowerCase()}`}>
              Start free
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              aria-label={`Book a demo for ${industry.name.toLowerCase()}`}
            >
              Book a demo
            </Button>
          </div>
        </div>

        <div className={cx("lg:col-span-6 lg:pt-2", flip && "lg:order-first")}>
          <Eyebrow as="p" className="mb-3">
            Example flow
          </Eyebrow>
          <FlowSequence title={`Flows / ${industry.name}`} steps={industry.exampleFlow} />
        </div>
      </div>
    </Section>
  );
}
