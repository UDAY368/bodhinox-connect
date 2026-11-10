import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { themeInitScript } from "@/components/layout/theme-script";
import { site } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { defaultRobots, JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const defaultTitle = "WhatsApp CRM and Business API for India | Bodhinox Connect";
const defaultDescription =
  "Run your WhatsApp inbox, campaigns, chatbot flows, AI agent, store and Razorpay payments in one place. Built on the official WhatsApp Business Platform.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
  description: defaultDescription,
  applicationName: site.name,
  robots: defaultRobots,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: defaultDescription },
  formatDetection: { telephone: false, email: false, address: false },
  ...(site.googleSiteVerification ? { verification: { google: site.googleSiteVerification } } : {}),
  ...(site.facebookDomainVerification
    ? { other: { "facebook-domain-verification": site.facebookDomainVerification } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#171715" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Applies a saved theme before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
