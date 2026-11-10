# Bodhinox Connect website

Marketing site for **Bodhinox Connect** at https://bodhinoxconnect.in. A self-contained Next.js 16 (App Router) + TypeScript + Tailwind v4 project. Nothing here imports from the main app in the parent folder.

The locked spec is [`docs/MASTER_PROMPT.md`](docs/MASTER_PROMPT.md). Sections 12 to 15 override earlier sections.

## Run it

```bash
cd bodhinox-connect
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run lint       # eslint (eslint-config-next)
npm run build      # must pass before every merge
npm start          # serve the production build
```

Node 24 and npm, the same as the app.

## Environment variables

All optional. The site builds with none of them. Copy `.env.example` to `.env.local` for local work.

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Where "Start free" (`/signup`) and "Sign in" (`/login`) point | `https://app.bodhinoxconnect.in` |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Contact form POST target (for example Formspree) | empty, the form falls back to `mailto:` |
| `NEXT_PUBLIC_FB_DOMAIN_VERIFICATION` | Meta Business Suite domain verification code | empty, no tag |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag code | empty, no tag |

They are read once in `content/site.ts`. Pages never read `process.env` directly.

## Deploy on Vercel

1. Import the repository in Vercel.
2. Leave **Root Directory** as the repository root (`./`).
3. Framework preset: Next.js. Build command and output stay at their defaults.
4. Add the environment variables above as needed, then add the domain `bodhinoxconnect.in` (and `www` redirecting to it).

`next.config.ts` pins `turbopack.root` and `outputFileTracingRoot` to this folder, because the parent repository has its own lockfile.

## Business identity

Fill in `content/company.ts` (legal name, registered address, phone) **only** with the exact values from the registration documents. Each field renders in the footer, About, Contact and Organization JSON-LD only when set. Never invent a legal name, address, CIN or GSTIN.

## Project layout

```
app/                    routes; every route folder has page.tsx and opengraph-image.tsx
  layout.tsx            fonts, metadata, verification tags, JSON-LD, skip link, header, footer
  globals.css           design tokens (light + dark), type scale, prose, focus, reduced motion
  sitemap.ts robots.ts manifest.ts icon.svg apple-icon.tsx logo.png/route.tsx
components/
  brand/                Logo, LogoMark, mark paths
  layout/               Header, Footer, MobileMenu, ThemeToggle, NavLink, PagePlaceholder
  ui/                   Container, Section, Eyebrow, Button, Badge, Prose, Breadcrumbs
  mockups/              DeviceFrame, WindowFrame, ChatThread, MessageBubble, Ticks, TemplateCard, StatRow, InboxList
content/                all copy and data: site, company, nav, features, pricing, faqs, industries, guides
lib/                    seo.ts (metadata + JSON-LD), og.tsx (OG image renderer), fonts.ts
public/brand/           logo.svg, logo-dark.svg, mark.svg, favicon.svg
```

---

## Guide for page builders

### Rules that apply to every page

- **Copy:** plain, specific, short sentences for an Indian business owner. No hype words, no exclamation marks, no em-dash asides, no "not X but Y".
- **Claims:** only what `content/features.ts` lists. Instagram is "Coming soon" (`comingSoon`). No testimonials, customer logos, user counts or ratings. Made-up numbers carry the caption "Illustrative figures".
- **Meta:** say "built on the official WhatsApp Business Platform". No partner or Tech Provider claims, no WhatsApp or Meta logos, "WhatsApp" only used descriptively.
- **Layout:** left-aligned and editorial. Hero sized to its content, never `100vh`. Cards only for real objects (plans, mock-up windows, templates). Numbered markers only for the four-step "How it works". No emoji markers. No gradient heroes, no accent bars on cards.
- **Motion:** only the hero chat (`<ChatThread animate />`) and 200ms hovers. Never hide content waiting for scroll.
- **Accessibility:** one `<h1>` per page, headings in order, labelled form fields, real `<a>` links with descriptive text, `<details>`/`<summary>` for FAQs.
- **SEO:** every page exports `metadata = pageMetadata(...)`, inner pages render `<Breadcrumbs>`, and primary copy is server-rendered.

### Page skeleton

```tsx
import { Breadcrumbs, Container, Section, Eyebrow, Button } from "@/components/ui";
import { pageMetadata, JsonLd, faqPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing: WhatsApp CRM plans in INR",   // <= 41 chars; " | Bodhinox Connect" is added
  description: "...140 to 160 characters...",
  path: "/pricing",                               // canonical
});

export default function Page() {
  return (
    <>
      <Section spacing="tight">
        <Breadcrumbs items={[{ name: "Pricing", path: "/pricing" }]} />
        <h1 className="mt-6 max-w-3xl text-hero">Simple plans in rupees</h1>
      </Section>
      ...
      <JsonLd data={faqPageJsonLd(pricingFaqs)} />
    </>
  );
}
```

Keep the existing `metadata` export in each placeholder page (titles and descriptions are already checked for length) and replace `<PagePlaceholder>` with the real body. Each route already has an `opengraph-image.tsx`.

### Tokens (Tailwind class names)

Colours switch with the theme automatically. Do not use `dark:` and do not write hex values.

| Token | Classes | Use |
|---|---|---|
| `bg` | `bg-bg` | page background (paper) |
| `surface` | `bg-surface` | cards, windows, white bands |
| `sunken` | `bg-sunken` | quiet bands, table stripes, chips |
| `ink` | `text-ink`, `border-ink` | headings and body |
| `muted` | `text-muted` | secondary text |
| `line`, `line-strong` | `border-line`, `divide-line`, `border-line-strong` | hairlines, inputs |
| `copper` | `bg-copper`, `text-copper`, `hover:bg-copper-hover` | primary actions and key figures only |
| `copper-soft` | `bg-copper-soft` | tints and highlights |
| `on-copper` | `text-on-copper` | text on a copper fill |
| `success`, `danger` | `text-success`, `text-danger` | delivered/approved, form errors |
| `chat`, `bubble-in`, `bubble-out` | `bg-chat`, ... | mock-up surfaces |

Fonts: `font-display` (Bricolage Grotesque, headings), `font-sans` (Figtree, default body), `font-mono` (JetBrains Mono: timestamps, ticks, prices in mock-ups, plan limits). `h1` to `h4` already use the display face at weight 600.

Type scale (size, line height and tracking in one class): `text-hero` (40 to 64px), `text-h2` (32 to 44px), `text-h3` (22px), `text-lead` (19px), `text-body` (17px, the default), `text-small` (14px), `text-micro` (12px).

Other: `max-w-site` (1200px), `max-w-reading` (42rem), `rounded-card` (16px), `rounded-control` (10px), `shadow-soft`, `animate-msg-in`, `animate-tick-read`, `tabular-nums` for prices.

### UI components (`@/components/ui`)

| Component | Props |
|---|---|
| `Container` | `size?: "site" \| "prose"`, `as?`, `className?`. 16/24/32px gutters. |
| `Section` | `id?`, `labelledBy?`, `tone?: "default" \| "surface" \| "sunken"`, `spacing?: "default" \| "tight" \| "none"`, `contained?` (default true), `divider?`, `className?` |
| `Eyebrow` | `as?: "p" \| "span"`, `className?`. Mono uppercase label above a heading. |
| `Button` | `variant?: "primary" \| "secondary" \| "ghost"`, `size?: "sm" \| "md" \| "lg"`, `iconRight?`, `className?`. With `href` it renders `next/link` (internal) or `<a>` (`http`, `mailto:`, `tel:`; add `external` for a new tab). Without `href` it is a `<button type="button">` with all native props. |
| `buttonClasses({variant, size, className})` | The same styles for your own `<a>` or `<button>`. It already sets `inline-flex`, so set responsive visibility on a wrapper (`<span className="hidden md:flex">`). |
| `Badge` | `tone?: "neutral" \| "copper" \| "success" \| "outline"`. Use `outline` for "Coming soon", `copper` for "Most popular". |
| `Prose` | `as?: "div" \| "article"`. Styles h2, h3, p, lists, links, tables, code for legal pages and guides. Put the `h1` outside. |
| `Breadcrumbs` | `items: {name, path}[]` (after Home). Renders the trail and its BreadcrumbList JSON-LD. |

Brand: `Logo` (`variant?: "full" \| "mark"`, `size?` in px) and `LogoMark` (`size?`, `title?`) from `@/components/brand/Logo`.

### Mock-up components (`@/components/mockups`)

Wrap every mock-up in a frame. The frame takes a required `label` and is exposed to screen readers as one image, so describe what it shows.

| Component | Props |
|---|---|
| `DeviceFrame` | `label`, `children`, `className?`. Phone, max 360px wide. |
| `WindowFrame` | `label`, `title?` (mono title bar), `toolbar?`, `flush?` (no padding, for lists), `children`, `className?` |
| `ChatThread` | `contact: {name, meta?}`, `items: ChatItem[]`, `animate?` (hero only), `stepMs?` (900), `composer?` (true), `composerText?` |
| `ChatItem` | `{from: "business" \| "customer", content: ReactNode, time?, status?: "sent" \| "delivered" \| "read"}`, or `{kind: "system", text}` (for example "Customer service window open · 23h 58m left"), or `{kind: "day", label}` |
| `MessageBubble` | `from`, `children`, `time?`, `status?`, `readAfterMs?` |
| `Ticks` | `status`, `readAfterMs?`. Sent ✓, delivered ✓✓ muted, read ✓✓ copper. |
| `Avatar` | `name`, `size?`. Initials on copper tint. |
| `TemplateCard` | `category: "Marketing" \| "Utility" \| "Authentication"`, `name` (mono, e.g. `order_shipped`), `body` (`{{1}}` becomes a variable chip), `header?`, `footer?` (e.g. "Reply STOP to opt out"), `buttons?: string[]`, `status?: "Approved" \| "In review" \| "Rejected"`, `language?` |
| `StatRow` | `stats: {label, value, hint?, emphasis?}[]`, `caption?`. Use `caption="Illustrative figures"` for made-up numbers. |
| `InboxList` | `items: {name, preview, time, unread?, status?: "open" \| "waiting" \| "resolved", assignee?, tag?, active?, handledBy?: "AI" \| "Bot"}[]` |

Use product details as content: ticks, the 24-hour customer service window, template categories, STOP opt-out, INR prices with GST, Razorpay UPI checkout in chat.

### Content (`@/content/*`)

| Module | Exports |
|---|---|
| `site` | `site` (`name`, `url`, `domain`, `email`, `tagline`, `description`, `appUrl`, `signupUrl`, `loginUrl`, `contactEndpoint`, `mailto`, `lastUpdated`), `absoluteUrl(path)` |
| `company` | `company` (`brand`, `operator`, `country`, `email`, optional `legalName`, `address`, `phone`), `formatAddress()` |
| `nav` | `headerNav`, `footerNav`, `legalLinks`, `routes` (drives the sitemap; add new pages here) |
| `features` | `features` (6 pillars: `slug`, `title`, `shortTitle`, `seoTitle`, `metaDescription`, `summary`, `keyword`, `href`, `anchor`, `icon`, `bullets`), `comingSoon`, `getFeature(slug)`, type `FeatureSlug` |
| `pricing` | `plans` (`id`, `name`, `monthly`, `yearly`, `description`, `highlights`, `cta`, `popular?`), `comparisonRows`, `pricingNote` (required wording), `yearlyNote`, `formatPrice(n)` |
| `faqs` | `homeFaqs`, `pricingFaqs` (plain-text answers, shared with JSON-LD) |
| `industries` | `industries` (`slug`, `name`, `summary`, `problem`, `features`, `exampleFlow`) |
| `guides` | `guides` (`slug`, `title`, `seoTitle`, `description`, `href`, `datePublished`, `dateModified`, `readingMinutes`, `keywords`), `getGuide(slug)` |

### SEO helpers (`@/lib/seo`)

- `pageMetadata({ title, description, path, absoluteTitle?, type?, publishedTime?, modifiedTime?, noIndex? })` returns `Metadata` with the title, description, canonical URL, Open Graph and Twitter card. In development it warns when the title passes 60 characters or the description falls outside 140 to 160.
- `<JsonLd data={...} />` renders one `application/ld+json` script. Place it anywhere in the page body.
- Builders: `organizationJsonLd()` and `websiteJsonLd()` (already in the layout), `softwareApplicationJsonLd()` (Home and Pricing), `faqPageJsonLd(faqs)` (Home and Pricing), `breadcrumbJsonLd(crumbs)` (already inside `<Breadcrumbs>`), `articleJsonLd({ title, description, path, datePublished, dateModified? })` (guides).
- OG images: `renderOgImage({ title, eyebrow })` from `@/lib/og`, already wired in every route's `opengraph-image.tsx`.
