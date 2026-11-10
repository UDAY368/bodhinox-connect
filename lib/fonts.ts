import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";

/** Display face: headlines only. Variable, so tight tracking at large sizes stays crisp. */
export const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  axes: ["opsz"],
});

/** Body and UI face. */
export const fontBody = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

/** Utility face: timestamps, ticks, prices in mock-ups, plan limits. */
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const fontVariables = [fontDisplay.variable, fontBody.variable, fontMono.variable].join(" ");
