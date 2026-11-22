"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { featureGroups, featuresIn } from "@/content/features";
import { headerNav, platformNav, resourcesNav } from "@/content/nav";
import { site } from "@/content/site";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

/** Slide-down menu below lg. Closes on Escape, on link click and on outside click. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointer(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onFocus(e: FocusEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-full text-foreground hover:bg-accent"
      >
        {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-background shadow-soft"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-site px-4 pt-2 pb-6 sm:px-6">
          <details className="group border-b border-border">
            <summary className="flex h-12 cursor-pointer list-none items-center justify-between text-body text-foreground">
              Product
              <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <div className="pb-3">
              {featureGroups.map((g) => (
                <div key={g.id} className="mt-2">
                  <p className="text-[0.75rem] font-semibold tracking-[0.04em] text-muted-foreground uppercase">{g.label}</p>
                  <ul className="mt-1">
                    {featuresIn(g.id).map((f) => (
                      <li key={f.slug}>
                        <Link href={f.href} onClick={close} className="flex h-10 items-center gap-2.5 text-small text-foreground">
                          <f.icon className="size-4 text-primary" aria-hidden />
                          {f.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <ul className="mt-2 border-t border-border pt-2">
                <li>
                  <Link href="/features" onClick={close} className="flex h-10 items-center text-small font-semibold text-primary">
                    All features
                  </Link>
                </li>
                {platformNav.slice(0, 3).map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} onClick={close} className="flex h-10 items-center text-small text-foreground">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </details>
          <ul className="flex flex-col">
            {headerNav.map((item) => (
              <li key={item.href} className="border-b border-border">
                <NavLink href={item.href} onClick={close} className="flex h-12 items-center text-body">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <details className="group border-b border-border">
            <summary className="flex h-12 cursor-pointer list-none items-center justify-between text-body text-foreground">
              Resources
              <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <ul className="pb-3">
              {resourcesNav.map((r) => (
                <li key={r.href + r.label}>
                  <Link href={r.href} onClick={close} className="flex h-10 items-center text-small text-foreground">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <div className="mt-5 flex flex-col gap-3">
            <Link href={site.signupUrl} onClick={close} className={buttonClasses({ variant: "primary", size: "lg" })}>
              Start free
            </Link>
            <Link href={site.loginUrl} onClick={close} className={buttonClasses({ variant: "secondary", size: "lg" })}>
              Sign in
            </Link>
          </div>
          <div className="mt-4 flex items-center justify-between text-small text-muted-foreground">
            <span>Theme</span>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}
