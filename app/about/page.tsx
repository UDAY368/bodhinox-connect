import Link from "next/link";
import { BusinessIdentity } from "@/components/company/BusinessIdentity";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { company } from "@/content/company";
import { comingSoon, features } from "@/content/features";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About us",
  description:
    "Bodhinox Connect is a WhatsApp customer platform built in India by Bodhinox for growing businesses. Learn what we make, where we work and how to reach us.",
  path: "/about",
});

const principles = [
  {
    title: "Your accounts stay yours",
    body: "You connect your own WhatsApp Business Account and number through Meta. They stay in your Meta business portfolio, and you can disconnect us at any time.",
  },
  {
    title: "We say what the product does today",
    body: "Our pages describe features that are built and working. Anything still in progress is marked as coming soon.",
  },
  {
    title: "Customers have to want your messages",
    body: "Opt-in, STOP handling and Meta's template rules are built into campaigns and flows, because they protect your number and your reputation.",
  },
  {
    title: "Your data is separated and protected",
    body: "Each workspace's data is kept apart from every other workspace. Access tokens are encrypted, and you can export or delete your data yourself.",
  },
];

export default function Page() {
  return (
    <>
      <Container className="pt-10 pb-16 md:pt-14 md:pb-20">
        <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
        <div className="mt-10 max-w-3xl">
          <Eyebrow>About us</Eyebrow>
          <h1 className="mt-3 text-hero">About Bodhinox Connect</h1>
          <p className="mt-6 text-lead text-ink">
            {company.brand} is a customer messaging platform for businesses that sell and serve on WhatsApp. It is made by{" "}
            {company.legalName || company.operator}, based in {company.country}.
          </p>
          <p className="mt-4 text-body text-muted">
            We build for the owner of a growing business: a clinic, a coaching institute, a D2C brand, a real estate team or
            a local service. When chats outgrow one phone, {company.brand} gives the whole team one place to answer
            customers, send updates, automate the repetitive work and take payments.
          </p>
        </div>
      </Container>

      <Section tone="surface" divider labelledBy="what-we-make">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <h2 id="what-we-make" className="text-h2">
              What we make
            </h2>
            <p className="mt-4 text-body text-muted">
              One platform built on the WhatsApp Business Platform from Meta (the Cloud API), with six parts that work
              together.
            </p>
            <p className="mt-6">
              <Link href="/features" className="font-semibold text-copper underline underline-offset-4 hover:text-copper-hover">
                See every feature
              </Link>
            </p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {features.map((f) => (
              <li key={f.slug} className="py-5">
                <h3 className="text-h3">
                  <Link href={f.href} className="underline-offset-4 hover:text-copper hover:underline">
                    {f.title}
                  </Link>
                </h3>
                <p className="mt-1.5 text-body text-muted">{f.summary}</p>
              </li>
            ))}
            {comingSoon.map((c) => (
              <li key={c.title} className="py-5">
                <h3 className="flex flex-wrap items-center gap-3 text-h3">
                  {c.title}
                  <Badge tone="outline">Coming soon</Badge>
                </h3>
                <p className="mt-1.5 text-body text-muted">{c.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="where-we-work">
        <div className="max-w-3xl">
          <h2 id="where-we-work" className="text-h2">
            Built in India, for Indian businesses
          </h2>
          <p className="mt-4 text-body text-muted">
            We are based in {company.country} and the product is made for how business is done here. Plans are priced in
            rupees with GST shown separately. Payments run through Razorpay, so customers can pay by UPI, card or net
            banking inside the chat, or choose cash on delivery. Orders ship through Shiprocket, and invoices carry GST.
          </p>
          <p className="mt-4 text-body text-muted">
            We follow India&apos;s Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000. Our{" "}
            <Link href="/privacy" className="text-copper underline underline-offset-4 hover:text-copper-hover">
              privacy policy
            </Link>{" "}
            explains what we keep and why.
          </p>
        </div>
      </Section>

      <Section tone="sunken" labelledBy="how-we-work">
        <h2 id="how-we-work" className="max-w-3xl text-h2">
          How we work
        </h2>
        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="border-t border-line-strong pt-5">
              <h3 className="text-h3">{p.title}</h3>
              <p className="mt-2 text-body text-muted">{p.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-small text-muted">
          WhatsApp and Meta are trademarks of Meta Platforms, Inc. {company.brand} is not affiliated with or endorsed by
          Meta. Read{" "}
          <Link href="/whatsapp-business-platform" className="text-ink underline underline-offset-4 hover:text-copper">
            how we use the WhatsApp Business Platform
          </Link>
          .
        </p>
      </Section>

      <Section labelledBy="business-details">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <h2 id="business-details" className="text-h2">
              Business details and contact
            </h2>
            <p className="mt-4 text-body text-muted">
              Write to us about sales, support, partnerships, privacy or anything else. One address reaches the team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Contact us</Button>
              <Button href={site.mailto} variant="secondary">
                Email {site.email}
              </Button>
            </div>
          </div>
          <BusinessIdentity />
        </div>
      </Section>
    </>
  );
}
