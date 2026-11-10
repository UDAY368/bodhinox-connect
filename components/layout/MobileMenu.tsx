"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { headerNav } from "@/content/nav";
import { site } from "@/content/site";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

/** Slide-down menu below md. Closes on Escape, on link click and on outside click. */
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
      // Tabbing past the panel would move focus under it, so close it.
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
    <div ref={rootRef} className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-control text-ink hover:bg-sunken"
      >
        {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
      </button>

      <div id={panelId} hidden={!open} className="absolute inset-x-0 top-full border-b border-line bg-bg shadow-soft">
        <nav aria-label="Mobile" className="mx-auto max-w-site px-4 pt-2 pb-6 sm:px-6">
          <ul className="flex flex-col">
            {headerNav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <NavLink href={item.href} onClick={close} className="flex h-12 items-center text-body">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <a href={site.signupUrl} className={buttonClasses({ variant: "primary", size: "lg" })}>
              Start free
            </a>
            <a href={site.loginUrl} className={buttonClasses({ variant: "secondary", size: "lg" })}>
              Sign in
            </a>
          </div>
          <div className="mt-4 flex items-center justify-between text-small text-muted">
            <span>Theme</span>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}
