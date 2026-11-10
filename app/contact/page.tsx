import Link from "next/link";
import { ContactForm } from "@/components/company/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { company, formatAddress } from "@/content/company";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact us and book a demo",
  description:
    "Book a demo of Bodhinox Connect or ask about plans, setup and WhatsApp onboarding. Write to uday@bodhinox.com or use the contact form on this page.",
  path: "/contact",
});

const demoCovers = [
  "Connecting your WhatsApp number through Meta's Embedded Signup",
  "Your inbox, campaigns and flows, set up for your kind of business",
  "Which plan fits, and how Meta's message charges work",
];

export default function Page() {
  const address = formatAddress();
  const linkClass = "text-copper underline underline-offset-4 hover:text-copper-hover";

  return (
    <Container className="pt-10 pb-16 md:pt-14 md:pb-24">
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-20">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-3 text-hero">Talk to us</h1>
          <p className="mt-6 text-lead text-muted">
            Book a demo, ask about plans or get help with setup. We read every message.
          </p>

          <section aria-labelledby="reach-us" className="mt-10">
            <h2 id="reach-us" className="font-mono text-micro font-medium tracking-[0.08em] text-muted uppercase">
              Support and sales
            </h2>
            <p className="mt-3 text-h3 font-display font-semibold break-words">
              <a href={site.mailto} className={`${linkClass} select-all`}>
                {site.email}
              </a>
            </p>
            <p className="mt-2 text-small text-muted">For sales, support, privacy and data requests.</p>

            <address className="mt-8 space-y-1.5 text-body text-ink not-italic">
              <span className="block font-semibold">{company.brand}</span>
              <span className="block text-muted">
                Operated by {company.legalName || company.operator}, {company.country}
              </span>
              {address ? <span className="block text-muted">{address}</span> : null}
              {company.phone ? (
                <span className="block">
                  Phone:{" "}
                  <a href={`tel:${company.phone}`} className={linkClass}>
                    {company.phone}
                  </a>
                </span>
              ) : null}
            </address>
          </section>

          <section aria-labelledby="demo-covers" className="mt-10 border-t border-line pt-8">
            <h2 id="demo-covers" className="text-h3">
              What a demo covers
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-body text-muted marker:text-muted">
              {demoCovers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="other-requests" className="mt-10 border-t border-line pt-8">
            <h2 id="other-requests" className="text-h3">
              Data and privacy requests
            </h2>
            <p className="mt-3 text-body text-muted">
              To delete data or remove a connected account, see{" "}
              <Link href="/data-deletion" className={linkClass}>
                data deletion
              </Link>
              . For how we handle data, read the{" "}
              <Link href="/privacy" className={linkClass}>
                privacy policy
              </Link>
              .
            </p>
          </section>
        </div>

        <section aria-labelledby="demo-form" className="rounded-card border border-line bg-surface p-5 sm:p-8">
          <h2 id="demo-form" className="text-h3">
            Request a demo
          </h2>
          <p className="mt-2 text-body text-muted">Tell us a little about your business and we will reply by email.</p>
          <div className="mt-6">
            <ContactForm endpoint={site.contactEndpoint} email={site.email} />
          </div>
        </section>
      </div>
    </Container>
  );
}
