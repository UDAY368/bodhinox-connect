"use client";

import { useId, useState } from "react";
import { cx } from "@/components/ui/cx";
import { TourScreen } from "./TourScreen";

export type TourTab = {
  id: string;
  label: string;
  group?: string;
  title: string;
  description: string;
  href: string;
  /** Alt text for the product screen, which loads when the tab is first opened. */
  screenLabel: string;
};

/**
 * Tabbed tour of the product that mirrors the CRM sidebar. Every panel's
 * title and description are in the HTML (crawlers see them all); a panel's
 * product screen loads the first time its tab is opened.
 */
export function ProductTour({ tabs }: { tabs: TourTab[] }) {
  const [active, setActive] = useState(0);
  // Tabs opened so far: their screens stay mounted so switching back is instant.
  const [opened, setOpened] = useState<Set<number>>(() => new Set([0]));
  function open(i: number) {
    setActive(i);
    setOpened((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  }
  const base = useId();

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (active - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    open(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  }

  return (
    <div>
      <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div
          role="tablist"
          aria-label="Product sections"
          onKeyDown={onKeyDown}
          className="mx-auto flex w-max items-center gap-0.5 rounded-2xl bg-muted p-1"
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              id={`${base}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${base}-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => open(i)}
              className={cx(
                "inline-flex h-10 items-center rounded-xl px-4 text-small font-medium whitespace-nowrap transition-colors duration-150",
                i === active ? "bg-tab-active text-foreground shadow-[0_1px_3px_rgb(0_0_0/0.12)]" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tabs.map((t, i) => (
        <div
          key={t.id}
          id={`${base}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${i}`}
          hidden={i !== active}
          className="mt-8"
        >
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h3 className="text-h3">{t.title}</h3>
            <p className="mt-2 text-muted-foreground">
              {t.description}{" "}
              <a href={t.href} className="font-medium whitespace-nowrap text-primary hover:text-primary-hover">
                Learn more →
              </a>
            </p>
          </div>
          {opened.has(i) ? <TourScreen id={t.id} label={t.screenLabel} /> : null}
        </div>
      ))}
    </div>
  );
}
