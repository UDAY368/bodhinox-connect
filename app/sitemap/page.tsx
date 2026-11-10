import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { routes, type RouteSection } from "@/content/nav";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sitemap",
  description:
    "Every page on the Bodhinox Connect website in one list: features, pricing, solutions, guides to WhatsApp for business, company details and legal policies.",
  path: "/sitemap",
});

const sectionOrder: RouteSection[] = ["Main pages", "Features", "Guides", "Company", "Legal"];

export default function Page() {
  return (
    <Container className="pt-10 pb-16 md:pt-14 md:pb-24">
      <Breadcrumbs items={[{ name: "Sitemap", path: "/sitemap" }]} />
      <header className="mt-10 max-w-3xl">
        <Eyebrow>Sitemap</Eyebrow>
        <h1 className="mt-3 text-h2">Sitemap</h1>
        <p className="mt-4 text-lead text-muted">Every page on this website, grouped by section.</p>
      </header>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {sectionOrder.map((section) => {
          const headingId = `sitemap-${section.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <section key={section} aria-labelledby={headingId}>
              <h2 id={headingId} className="text-h3">
                {section}
              </h2>
              <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                {routes
                  .filter((r) => r.section === section)
                  .map((r) => (
                    <li key={r.path}>
                      <Link href={r.path} className="text-ink underline-offset-4 hover:underline">
                        {r.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
