import path from "node:path";
import type { NextConfig } from "next";

// This folder sits inside another repository that has its own lockfile.
// Pin both roots here so Turbopack and output tracing never climb to the parent.
const root = path.resolve(__dirname);

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  turbopack: { root },
  outputFileTracingRoot: root,
  poweredByHeader: false,
  // URLs never end in a slash, so each page has exactly one address.
  trailingSlash: false,

  async redirects() {
    return [
      // The canonical host is www. Send the bare domain there, keeping the path.
      {
        source: "/:path*",
        has: [{ type: "host", value: "bodhinoxconnect.in" }],
        destination: "https://www.bodhinoxconnect.in/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Vercel preview and alias hosts (*.vercel.app) must never be indexed.
      // The production host www.bodhinoxconnect.in never matches this.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<vercelHost>.+)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
