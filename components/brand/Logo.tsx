import { MARK_FILLED, MARK_OUTLINE, MARK_OVER, MARK_STROKE, MARK_VIEWBOX } from "./mark";

type MarkProps = {
  /** Rendered size in px. The mark stays legible down to 16. */
  size?: number;
  className?: string;
  /** Accessible name. Omit when the mark sits next to visible text (it is then decorative). */
  title?: string;
};

/** Mark only. Outline uses currentColor (ink), the filled bubble uses the copper token. */
export function LogoMark({ size = 28, className, title }: MarkProps) {
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true as const };
  return (
    <svg
      width={size}
      height={size}
      viewBox={MARK_VIEWBOX}
      className={className}
      focusable="false"
      {...a11y}
    >
      <path d={MARK_OUTLINE} fill="none" stroke="currentColor" strokeWidth={MARK_STROKE} strokeLinejoin="round" />
      <path d={MARK_FILLED} fill="var(--copper)" />
      <path d={MARK_OVER} fill="none" stroke="currentColor" strokeWidth={MARK_STROKE} strokeLinejoin="round" />
    </svg>
  );
}

type LogoProps = {
  /** "full" is the horizontal lockup, "mark" is the mark alone. */
  variant?: "full" | "mark";
  /** Mark size in px. The wordmark scales with it. */
  size?: number;
  className?: string;
};

/**
 * Horizontal lockup: mark, then "Bodhinox" semibold and "Connect" regular in
 * muted ink, both in the display face. Wrap it in a link yourself; the
 * visible text is the accessible name.
 */
export function Logo({ variant = "full", size = 28, className = "" }: LogoProps) {
  if (variant === "mark") {
    return <LogoMark size={size} title="Bodhinox Connect" className={`text-ink ${className}`} />;
  }
  return (
    <span className={`inline-flex items-center gap-2 text-ink ${className}`}>
      <LogoMark size={size} />
      <span
        className="font-display leading-none tracking-[-0.02em] whitespace-nowrap"
        style={{ fontSize: Math.round(size * 0.72) }}
      >
        <span className="font-semibold">Bodhinox</span> <span className="font-normal text-muted">Connect</span>
      </span>
    </span>
  );
}
