import { Geist_Mono, Inter } from "next/font/google";

/**
 * Same type as the CRM: the system face first (San Francisco on Apple
 * devices), Inter everywhere else. Headings and body share one family.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/** Code samples on the developer page and the odd mono label. */
export const fontMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  weight: ["400", "500"],
});

export const fontVariables = [fontSans.variable, fontMono.variable].join(" ");
