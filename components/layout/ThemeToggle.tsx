"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "./theme-script";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

/** Light/dark switch. Saves the choice; with no saved choice the site follows the system. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore<Theme>(subscribe, currentTheme, () => "light");
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.setAttribute("data-theme", next);
    // Keep the browser bar in step with the chosen theme.
    const color = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    if (color) document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", color));
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode). The choice then lasts for this page view.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className={`inline-flex size-11 items-center justify-center rounded-control text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground ${className}`}
    >
      {/* Both icons render; CSS shows the right one before hydration too. */}
      <Sun size={18} aria-hidden className="theme-icon-sun" />
      <Moon size={18} aria-hidden className="theme-icon-moon" />
    </button>
  );
}
