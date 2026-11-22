"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavLinkProps = { href: string; children: ReactNode; className?: string; onClick?: () => void };

/** Header link that marks the current section with aria-current="page". */
export function NavLink({ href, children, className = "", onClick }: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`${className} ${active ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}
    >
      {children}
    </Link>
  );
}
