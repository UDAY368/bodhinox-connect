import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./cx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg" | "sm";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Icon placed after the label, e.g. <ArrowRight size={16} aria-hidden />. */
  iconRight?: ReactNode;
};

type LinkButtonProps = CommonProps & {
  /** Internal paths render next/link; http(s), mailto: and tel: render a plain <a>. */
  href: string;
  /** Open in a new tab (adds rel="noopener"). Only for external links. */
  external?: boolean;
  "aria-label"?: string;
};

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const base =
  "inline-flex items-center justify-center gap-2 rounded-control font-sans font-semibold whitespace-nowrap " +
  "transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-copper text-on-copper hover:bg-copper-hover",
  secondary: "border border-line-strong bg-surface text-ink hover:border-ink",
  ghost: "text-ink hover:bg-sunken",
};

// md and lg meet the 44px target; sm (36px) is only for dense rows inside mock-ups.
const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-small",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-body",
};

export function buttonClasses({ variant = "primary", size = "md", className }: Pick<CommonProps, "variant" | "size" | "className">) {
  return cx(base, variants[variant], sizes[size], className);
}

export function Button(props: ButtonProps) {
  const { children, variant, size, className, iconRight } = props;
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      {children}
      {iconRight}
    </>
  );

  if (props.href !== undefined) {
    const { href, external } = props;
    const isPlainAnchor = /^(https?:|mailto:|tel:)/.test(href);
    if (isPlainAnchor) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={props["aria-label"]}
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={props["aria-label"]}>
        {content}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, className: _c, iconRight: _i, children: _ch, type = "button", ...rest } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
