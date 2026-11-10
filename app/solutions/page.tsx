import Link from "next/link";
import { IndustrySection } from "@/components/solutions/IndustrySection";
import { Breadcrumbs, Button, Container, Section } from "@/components/ui";
import { industries } from "@/content/industries";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "WhatsApp solutions by industry",
  description:
    "How retail, clinics, education, real estate, services and restaurants use Bodhinox Connect to answer faster, take bookings and sell on WhatsApp.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <Container className="pt-10 pb-12 md:pt-14 md:pb-16">
        <Breadcrumbs items={[{ name: "Solutions", path: "/solutions" }]} className="mb-8" />
        <h1 className="max-w-3xl text-hero">WhatsApp for your kind of business</h1>
        <p className="mt-5 max-w-2xl text-lead text-muted">
          Your customers already message you on WhatsApp. Here is how six kinds of Indian business use Bodhinox
          Connect to answer those chats, take bookings and payments, and follow up without doing it all by hand.
        </p>

        <nav aria-label="Industries on this page" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {industries.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`#${i.slug}`}
                  className="inline-flex h-11 items-center rounded-full border border-line-strong bg-surface px-4 text-small font-semibold transition-colors duration-200 hover:border-ink"
                >
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {industries.map((industry, index) => (
        <IndustrySection key={industry.slug} industry={industry} flip={index % 2 === 1} />
      ))}

      <Section labelledBy="solutions-cta-heading" tone="sunken" divider>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="solutions-cta-heading" className="text-h2">
              Your business is not on this list?
            </h2>
            <p className="mt-3 text-muted">
              The same inbox, flows, campaigns and store work for most businesses that talk to customers on WhatsApp.
              Tell us how you work and we will show you a setup that fits. You can also{" "}
              <Link href="/features" className="text-copper underline underline-offset-4 hover:text-copper-hover">
                see every feature
              </Link>{" "}
              or{" "}
              <Link href="/pricing" className="text-copper underline underline-offset-4 hover:text-copper-hover">
                compare plans
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Book a demo
            </Button>
            <Button href={site.signupUrl} variant="secondary" size="lg">
              Start free
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
