import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { company, formatAddress } from "@/content/company";
import { footerNav } from "@/content/nav";
import { site } from "@/content/site";

/** Trademark notice (master prompt section 12). Shown on every page. */
export const TRADEMARK_NOTICE =
  "WhatsApp and Meta are trademarks of Meta Platforms, Inc. Bodhinox Connect is not affiliated with or endorsed by Meta.";

export function Footer() {
  const address = formatAddress();
  const year = new Date().getFullYear();
  const owner = company.legalName || company.operator;

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,3fr)]">
          <div className="max-w-xs">
            <Link href="/" aria-label="Bodhinox Connect home" className="inline-block">
              <Logo size={26} />
            </Link>
            <p className="mt-4 text-small text-muted">{site.tagline}</p>
            <address className="mt-6 text-small text-muted not-italic">
              <span className="block font-semibold text-ink">{company.brand}</span>
              <span className="block">
                Operated by {owner}, {company.country}
              </span>
              {address ? <span className="block">{address}</span> : null}
              {company.phone ? (
                <a className="block hover:text-ink" href={`tel:${company.phone}`}>
                  {company.phone}
                </a>
              ) : null}
              <a className="mt-1 block text-ink underline-offset-4 hover:underline" href={site.mailto}>
                {site.email}
              </a>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((col) => {
              const headingId = `footer-${col.title.toLowerCase()}`;
              return (
                <nav key={col.title} aria-labelledby={headingId}>
                  <h2
                    id={headingId}
                    className="font-mono text-micro font-medium tracking-[0.08em] text-muted uppercase"
                  >
                    {col.title}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-small text-ink underline-offset-4 hover:underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-micro text-muted sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-2xl">{TRADEMARK_NOTICE}</p>
          <p className="shrink-0">
            © {year} {owner}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
