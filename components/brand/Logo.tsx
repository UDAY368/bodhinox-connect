type LogoProps = {
  /** "full" is the horizontal lockup, "mark" is the sunflower alone. */
  variant?: "full" | "mark";
  /** Rendered height in px. */
  height?: number;
  className?: string;
};

/**
 * The Bodhinox Connect logo, exported from the CRM (public/brand/*.webp).
 * The lockup has a light and a dark version; both render and CSS shows the
 * one that matches the theme (.logo-light / .logo-dark in globals.css).
 * Wrap it in a link yourself; the alt text is the accessible name.
 */
export function Logo({ variant = "full", height = 36, className = "" }: LogoProps) {
  if (variant === "mark") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand/bodhinox-mark@1x.webp"
        srcSet="/brand/bodhinox-mark@1x.webp 1x, /brand/bodhinox-mark@2x.webp 2x, /brand/bodhinox-mark@3x.webp 3x"
        alt="Bodhinox Connect"
        width={height}
        height={height}
        className={className}
        decoding="async"
      />
    );
  }
  // Lockup aspect ratio is 278 x 88.
  const width = Math.round((height * 278) / 88);
  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/bodhinox-connect-light@1x.webp"
        srcSet="/brand/bodhinox-connect-light@1x.webp 1x, /brand/bodhinox-connect-light@2x.webp 2x, /brand/bodhinox-connect-light@3x.webp 3x"
        alt="Bodhinox Connect"
        width={width}
        height={height}
        className="logo-light"
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/bodhinox-connect-dark@1x.webp"
        srcSet="/brand/bodhinox-connect-dark@1x.webp 1x, /brand/bodhinox-connect-dark@2x.webp 2x, /brand/bodhinox-connect-dark@3x.webp 3x"
        alt="Bodhinox Connect"
        width={width}
        height={height}
        className="logo-dark"
        decoding="async"
      />
    </span>
  );
}
