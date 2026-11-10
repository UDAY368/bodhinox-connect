import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Bodhinox Connect" },
};

const links = [
  { href: "/", label: "Home", note: "What Bodhinox Connect does, in one page" },
  { href: "/features", label: "Features", note: "Inbox, campaigns, automation, AI agent, store and CRM" },
  { href: "/pricing", label: "Pricing", note: "Plans in INR, starting free" },
  { href: "/contact", label: "Contact", note: "Ask a question or book a demo" },
];

export default function NotFound() {
  return (
    <Container className="py-16 md:py-24">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="mt-3 max-w-2xl text-h2">This page is not here.</h1>
      <p className="mt-4 max-w-xl text-lead text-muted">
        The link may be old, or the address may have a typo. One of these pages should get you back on track.
      </p>
      <nav aria-label="Main pages" className="mt-10 max-w-2xl">
        <ul className="divide-y divide-line border-y border-line">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex flex-col gap-0.5 py-4 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="font-semibold text-ink underline-offset-4 transition-colors duration-200 group-hover:text-copper group-hover:underline sm:w-32">
                  {l.label}
                </span>
                <span className="text-small text-muted">{l.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="mt-10 text-small text-muted">
        Still stuck? Write to{" "}
        <a href={site.mailto} className="text-copper underline underline-offset-4 hover:text-copper-hover">
          {site.email}
        </a>{" "}
        and tell us which link brought you here.
      </p>
    </Container>
  );
}
