import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/Button";
import { featureGroups, featuresIn } from "@/content/features";
import { headerNav, platformNav, resourcesNav } from "@/content/nav";
import { site } from "@/content/site";
import { MegaMenu, MenuFooterLink, MenuItem } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

function ProductMenu() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 p-4">
        {featureGroups.map((g) => (
          <div key={g.id}>
            <p className="px-2.5 pt-1 pb-2 text-[0.75rem] font-semibold tracking-[0.04em] text-muted-foreground uppercase">
              {g.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {featuresIn(g.id).map((f) => (
                <li key={f.slug}>
                  <MenuItem href={f.href} icon={<f.icon className="size-[18px]" aria-hidden />} title={f.shortTitle} description={f.menuLine} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border bg-card-2 px-6 py-3.5">
        {platformNav.slice(0, 3).map((p) => (
          <Link key={p.href} href={p.href} className="text-small text-muted-foreground hover:text-foreground">
            <span className="font-semibold text-foreground">{p.label}</span> · {p.description}
          </Link>
        ))}
        <span className="ml-auto">
          <MenuFooterLink href="/features">See every feature</MenuFooterLink>
        </span>
      </div>
    </div>
  );
}

function ResourcesMenu() {
  return (
    <ul className="flex flex-col gap-0.5 p-3">
      {resourcesNav.map((r) => (
        <li key={r.href + r.label}>
          <MenuItem href={r.href} title={r.label} description={r.description} />
        </li>
      ))}
    </ul>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-glass backdrop-blur-xl backdrop-saturate-150">
      <div className="relative mx-auto flex h-16 max-w-site items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Bodhinox Connect home" className="shrink-0">
          <Logo height={36} />
        </Link>

        <nav aria-label="Main" className="ml-2 hidden lg:block">
          <ul className="flex items-center gap-0.5">
            <li>
              <MegaMenu label="Product" align="start" activePrefix={["/features", "/integrations", "/security"]}>
                <ProductMenu />
              </MegaMenu>
            </li>
            {headerNav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className="inline-flex h-11 items-center rounded-full px-3 text-[0.9375rem] transition-colors duration-150"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <MegaMenu label="Resources" widthClass="w-[340px]" activePrefix={["/guides", "/about", "/contact"]}>
                <ResourcesMenu />
              </MegaMenu>
            </li>
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {/* Display is set on wrappers: buttonClasses already sets inline-flex. */}
          <span className="hidden items-center gap-1 lg:flex">
            <ThemeToggle />
            <Link href={site.loginUrl} className={buttonClasses({ variant: "ghost" })}>
              Sign in
            </Link>
          </span>
          <span className="hidden sm:flex">
            <Link href={site.signupUrl} className={buttonClasses({ variant: "primary" })}>
              Start free
            </Link>
          </span>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
