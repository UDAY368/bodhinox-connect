"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cx } from "@/components/ui/cx";

type MenuProps = {
  label: string;
  /** Panel content. Rendered on the server too (hidden), so crawlers see every link. */
  children: ReactNode;
  /** Panel width class. */
  widthClass?: string;
  /** Section prefix that marks the trigger as current (e.g. "/features"). */
  activePrefix?: string[];
  /** "start" aligns the panel to the trigger's left edge; "center" centres it. */
  align?: "start" | "center";
};

/**
 * A header disclosure menu. Opens on click (and on hover with a short
 * intent delay), closes on Escape, outside click, focus leaving, and route
 * change. The panel stays in the HTML when closed.
 */
export function MegaMenu({
  label,
  children,
  widthClass = "w-[min(920px,calc(100vw-15rem))]",
  activePrefix = [],
  align = "center",
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const active = activePrefix.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  // Close when the route changes (a link inside was followed).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

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

  const clearTimer = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        clearTimer();
        hoverTimer.current = setTimeout(() => setOpen(true), 90);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        clearTimer();
        hoverTimer.current = setTimeout(() => setOpen(false), 160);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cx(
          "inline-flex h-11 items-center gap-1 rounded-full px-3 text-[0.9375rem] transition-colors duration-150",
          open || active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          active && "font-semibold",
        )}
      >
        {label}
        <ChevronDown className={cx("size-4 transition-transform duration-200", open && "rotate-180")} aria-hidden />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className={cx(
          align === "center" ? "left-1/2 -translate-x-1/2" : "-left-3",
          "absolute top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-[0_1px_2px_#0000000a,0_24px_60px_-12px_rgb(0_0_0/0.22)]",
          widthClass,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function MenuItem({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon?: ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <Link href={href} className="group flex gap-3 rounded-xl p-2.5 transition-colors duration-150 hover:bg-accent">
      {icon ? (
        <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
          {icon}
        </span>
      ) : null}
      <span className="min-w-0">
        <span className="block text-small font-semibold text-foreground">{title}</span>
        {description ? <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted-foreground">{description}</span> : null}
      </span>
    </Link>
  );
}

export function MenuFooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-small font-medium text-primary hover:text-primary-hover">
      {children}
      <ArrowRight className="size-3.5" aria-hidden />
    </Link>
  );
}
