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
      <section className="relative overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden />
        <Container className="relative pt-10 pb-12 text-center md:pt-14 md:pb-16">
          <Breadcrumbs items={[{ name: "Solutions", path: "/solutions" }]} className="mb-8 flex justify-center" />
          <h1 className="mx-auto max-w-3xl text-hero">WhatsApp for your kind of business</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-muted-foreground">
            Your customers already message you on WhatsApp and Instagram. Here is how six kinds of Indian business use
            Bodhinox Connect to answer those chats, take bookings and payments, and follow up without doing it all by
            hand.
          </p>

          <nav aria-label="Industries on this page" className="mt-10">
            <ul className="flex flex-wrap justify-center gap-2">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link
                    href={`#${i.slug}`}
                    className="inline-flex h-11 items-center rounded-full border border-border bg-card px-4 text-small font-medium text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
                  >
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      {industries.map((industry, index) => (
        <IndustrySection key={industry.slug} industry={industry} flip={index % 2 === 1} />
      ))}

      <Section labelledBy="solutions-cta-heading">
        <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 id="solutions-cta-heading" className="text-h2">
              Your business is not on this list?
            </h2>
            <p className="mt-3 text-muted-foreground">
              The same inbox, flows, campaigns, store and bookings work for most businesses that talk to customers on
              WhatsApp. Tell us how you work and we will show you a setup that fits. You can also{" "}
              <Link href="/features" className="text-primary underline underline-offset-4 hover:text-primary-hover">
                see every feature
              </Link>{" "}
              or{" "}
              <Link href="/pricing" className="text-primary underline underline-offset-4 hover:text-primary-hover">
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
