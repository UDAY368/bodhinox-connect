import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/Button";
import { headerNav } from "@/content/nav";
import { site } from "@/content/site";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-site items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Bodhinox Connect home" className="shrink-0">
          <Logo size={26} />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {headerNav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className="inline-flex h-11 items-center rounded-control px-3 text-[0.9375rem] transition-colors duration-200"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {/* Display is set on wrappers: buttonClasses already sets inline-flex. */}
          <span className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <a href={site.loginUrl} className={buttonClasses({ variant: "ghost" })}>
              Sign in
            </a>
          </span>
          <span className="hidden sm:flex">
            <a href={site.signupUrl} className={buttonClasses({ variant: "primary" })}>
              Start free
            </a>
          </span>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
