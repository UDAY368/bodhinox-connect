# Bodhinox Connect: website master prompt and design plan

Status: **LOCKED (2026-11-10).** Domain **https://bodhinoxconnect.in**, support email **udaykumar@bodhinox.com**. The website is built inside `bodhinox_Connect/` only; that folder is the Vercel project root. Sections 12 to 15 (Meta standards, SEO, design revisions, build rules) override anything earlier that disagrees.

---

## 1. What we are building

A premium, simple marketing website for **Bodhinox Connect**: one platform where a business runs its WhatsApp conversations, campaigns, automation, AI agent, store and payments, and its customer CRM.

A visitor should understand three things within ten seconds:

1. **What it is:** the WhatsApp-first customer platform for growing businesses.
2. **What it does for them:** answer faster, sell more on WhatsApp, and automate the repetitive work.
3. **What to do next:** start free, or book a demo.

---

## 2. Brand

### Name and lines
- **Name:** Bodhinox Connect. "Bodhinox" carries the weight in the wordmark and "Connect" is lighter.
- **Primary tagline:** *Every customer conversation, connected.*
- **Alternative taglines:** *Talk. Sell. Grow. On WhatsApp.* / *Where conversations become customers.*
- **One-line description:** Bodhinox Connect brings your WhatsApp inbox, campaigns, automation, AI agent, store and payments into one simple platform.

### Voice
Calm, confident and plain. Short sentences, everyday words and specific numbers. No hype words ("revolutionary", "game-changing") and no exclamation marks. We speak to the business owner, not to developers.

### Logo (we design it ourselves, as SVG)
- **Mark:** two rounded speech bubbles that overlap and form a link. Where they overlap, they make a subtle "C" and a connection node, standing for conversations that connect.
- **Construction:** geometric, 2px optical stroke, rounded 24% corners, and a solid copper fill on one bubble with an outline on the other. It must still read at 16px as a favicon.
- **Wordmark:** "Bodhinox" in the display face, semibold, with "Connect" in the same face at regular weight in the muted ink.
- **Lockups:** horizontal (mark plus wordmark), stacked, mark only, plus favicon, apple-touch icon and an OG image.
- **Files:** `public/brand/logo.svg`, `logo-dark.svg`, `mark.svg`, `favicon.svg`, `og.png` (1200×630).

### Colour (shared with the app's cream and copper theme, so product shots match)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f8f7f4` (cream) | `#171715` | page background |
| `--surface` | `#ffffff` | `#1f1e1b` | cards |
| `--ink` | `#1d1b17` | `#f3eee7` | headings, body |
| `--muted` | `#6b6458` | `#a39b8e` | secondary text |
| `--line` | `#e7e1d6` | `#34302a` | borders |
| `--copper` | `#a65328` | `#d0794a` | brand, primary buttons, links |
| `--copper-hover` | `#8c421f` | `#e08a5c` | hover |
| `--copper-soft` | `#a6532812` | `#d0794a1f` | tints, highlights |
| `--success` | `#2f7a4f` | `#5cb784` | ticks, "delivered" |

Copper is the only accent and is used sparingly: CTAs, key numbers and the logo. Everything else is cream, white and ink.

### Typography
- **Display:** *Instrument Serif* (Google Fonts) for hero and section headlines, for a premium editorial feel.
- **UI and body:** *Inter* (variable) for everything else.
- **Scale:** hero 64/72 desktop and 40/46 mobile, H2 44/52, H3 22/30, body 17/28, small 14/22.
- **Numbers:** prices and stats use Inter with tabular numerals.

### Imagery
No stock photos. Every visual is a **product mock-up built in HTML/CSS/SVG** (inbox, campaign report, flow builder, AI reply, store checkout, dashboard). They match the real app, stay sharp at any size, and theme automatically. We also use subtle copper line illustrations for the "how it works" steps.

---

## 3. Technology (for Vercel)

- **Next.js (App Router) + TypeScript + Tailwind CSS**, the same stack family as the app, statically generated (`output: 'export'` is not needed, since Vercel builds Next natively).
- **Self-contained:** `bodhinox_Connect/` has its own `package.json`, lockfile, `next.config.ts`, `tailwind`/`postcss` config and `public/`. Nothing imports from the main app.
- **Vercel setup:** set the project's *Root Directory* to `bodhinox_Connect`. The framework preset is Next.js and no environment variables are required.
- **Pages are static, with no backend.** The contact form posts to a configurable endpoint (`NEXT_PUBLIC_CONTACT_ENDPOINT`, e.g. Formspree); when unset, it falls back to a `mailto:` link.
- **Configurable links:** `NEXT_PUBLIC_APP_URL` points "Start free" and "Sign in" to the app's `/signup` and `/login`.
- **Dependencies, minimal:** `next`, `react`, `react-dom`, `tailwindcss`, `lucide-react` (icons) and `framer-motion` (only if needed for subtle reveal; prefer CSS).
- **Quality targets:** Lighthouse 95+ on all four scores, no layout shift, fonts via `next/font`, images as SVG or optimised WebP.

### Folder layout
```
bodhinox_Connect/
  app/
    layout.tsx            fonts, metadata, theme, header/footer
    page.tsx              Home
    features/page.tsx     Full feature tour
    pricing/page.tsx      Plans, comparison table, FAQ
    solutions/page.tsx    By industry
    contact/page.tsx      Demo / contact form
    legal/privacy, legal/terms, legal/data-deletion   (link to or mirror the app's pages)
    sitemap.ts, robots.ts, opengraph-image.tsx
  components/             Header, Footer, Hero, FeatureGrid, PricingTable, mockups/*, Logo
  content/                features.ts, pricing.ts, faqs.ts, industries.ts  (all copy in data files)
  public/brand/           logo files, favicon, og image
  docs/MASTER_PROMPT.md   this file
```

---

## 4. Sitemap and page plans

### Header (all pages)
The logo is on the left. Navigation: Features · Solutions · Pricing · Contact. On the right are **Sign in** (text) and **Start free** (copper button). The header is sticky with a cream blur; on mobile it becomes a slide-down menu. There is a light/dark toggle.

### Home (`/`), in order
1. **Hero.** H1 "Every customer conversation, connected." Sub-copy: "Run your WhatsApp inbox, campaigns, automation, AI agent and store in one place, and turn chats into sales." CTAs: **Start free** and **Book a demo**. Proof chips: "Official WhatsApp Business Platform (Cloud API)", "Setup in minutes", "Made for Indian businesses (INR, GST, Razorpay)". The visual is a live-looking inbox mock-up where messages animate in gently.
2. **Problem to outcome strip.** Three short cards: *Missed chats → every message answered*, *Manual follow-ups → automated journeys*, *Scattered tools → one platform*.
3. **Six pillars.** A grid with an icon, title, two lines and a "See more" link to `/features#…` for each:
   - Shared team inbox
   - Campaigns and broadcasts
   - Flows and automation
   - AI agent
   - Store and payments
   - CRM and analytics
4. **"How it works" in four steps:** Connect your WhatsApp number in a few clicks → Import contacts → Launch a campaign or flow → Watch replies and sales in one dashboard.
5. **Feature spotlights.** Three alternating image/text rows with mock-ups: the AI agent answering from your knowledge, a campaign with delivery and read stats plus retargeting, and a WhatsApp store order with a Razorpay link and shipping.
6. **Outcomes band.** Illustrative figures, clearly labelled *"what teams aim for"* and never presented as customer results: faster first reply, more repeat orders, fewer manual hours.
7. **Industries.** Six chips linking to `/solutions`: retail and D2C, clinics and wellness, education, real estate, services and appointments, restaurants.
8. **Trust and security.** Data isolated per workspace, role-based access, two-factor sign-in, encryption, audit log, data export and deletion, and hosting in India where applicable (only state what is true).
9. **Pricing teaser.** Three plan cards and a "Compare all plans" link.
10. **FAQ.** Six questions.
11. **Final CTA band.** "Start free today. No card needed." with Start free and Book a demo.
12. **Footer.** Product, Solutions, Company and Legal links; contact email; a small copyright line. The footer also carries the line "WhatsApp is a trademark of Meta Platforms, Inc."

### Features (`/features`)
A sticky sub-nav for the six pillars. Each pillar has a section with a mock-up and its full feature list (below), with anchors for deep links.

### Pricing (`/pricing`)
A monthly/yearly toggle (yearly = 2 months free), four plan cards, a full comparison table, a note on Meta's WhatsApp charges and GST, and a pricing FAQ.

### Solutions (`/solutions`)
One block per industry: the problem, which features help, and an example flow.

### Contact (`/contact`)
A demo request form (name, work email, phone, company, team size, message) and the support email. A consent tick links to the privacy policy.

### Legal
Privacy, Terms, Data deletion and Acceptable use, hosted on this site, because Meta needs stable URLs on the verified domain. See section 12.

---

## 5. Feature catalogue (everything already built in the app)

Use these as the source for `/features` and the home pillars. Every line is something the product does today.

**1. Shared team inbox**
- All WhatsApp chats in one inbox, with several numbers per workspace
- Assign chats to people or teams, with round-robin routing and statuses (open, waiting, resolved)
- Internal notes with @mentions; quick replies; templates, media, buttons and lists in replies
- Business hours, away messages, response-time targets and auto-resolve
- Human handoff: pause the bot and take over in one click
- Roles and permissions (owner, admin, agent, viewer)

**2. Campaigns and broadcasts**
- Send approved templates to all contacts, tags, segments, lists, custom fields or a CSV
- Personalised variables, scheduling and pacing
- Delivery, read, reply and click tracking
- Retargeting: follow up with people who read, replied or did not
- Retry failed sends, with honest outcome reconciliation
- Template builder: standard, carousel, one-time-code and limited-time offer templates, with Meta approval status

**3. Flows and automation**
- Visual flow builder: messages, buttons, lists, questions, conditions, delays, tags, assignment, payments and appointment booking
- Versioned publishing, dry run, run inspection and replay
- Automations by event, keyword, tag, status or schedule, with waits and conditions
- WhatsApp Forms (Meta Flows): multi-screen forms whose answers save to the contact
- Opt-out (STOP) and block respected everywhere

**4. AI agent**
- Answers customers 24/7 from your knowledge base (website, documents, FAQs)
- Your tone, your rules: handoff keywords, confidence threshold, maximum turns
- Safe by design: sensitive topics go to a human
- AI assistant for the team: chat summaries, suggested replies, intent and lead scoring
- Activity log showing every decision the agent made, and usage tracking

**5. Store and payments**
- A product catalogue with variants, stock and low-stock alerts
- A WhatsApp storefront and cart checkout; product messages in chat
- Payment links and checkout through Razorpay (UPI, cards, net banking), plus cash on delivery
- Orders, returns, refunds, GST invoices and receipts
- Shipping through Shiprocket, with pickup and tracking
- Sync with the Meta catalogue, Shopify and WooCommerce
- Appointments: services, staff, locations, booking pages and paid bookings

**6. CRM, analytics and platform**
- Contacts with tags, custom fields, segments, lists, import/export and a full timeline
- Sales pipelines with deal boards
- A dashboard and analytics: conversations, response times, team performance, campaigns, revenue and click-to-WhatsApp ads
- Scheduled CSV and PDF reports
- Outgoing webhooks and a public API with API keys
- Security: workspace isolation, two-factor sign-in, audit log, data export and deletion

**Coming soon (label it clearly, never as live):** Instagram DMs in the same inbox.

---

## 6. Sample pricing (INR, GST extra)

Plan names match the app (`free`, `basic`, `pro`, `enterprise`) so the website and the product never disagree. Limits come from the app's plan catalogue. Prices are **samples to be confirmed**.

| | **Free** | **Basic** | **Pro** (most popular) | **Enterprise** |
|---|---|---|---|---|
| Monthly | ₹0 | ₹1,499 | ₹3,999 | Custom |
| Yearly (per month) | ₹0 | ₹1,249 | ₹3,333 | Custom |
| Team seats | 1 | 3 | 10 | Unlimited |
| Campaign recipients / send | 250 | 10,000 | 50,000 | Unlimited |
| Active flows | 1 | 5 | 50 | Unlimited |
| Active automations | 3 | 20 | 100 | Unlimited |
| Segments / lists | 3 / 3 | 20 / 20 | 100 / 100 | Unlimited |
| Shared inbox, CRM, templates | ✓ | ✓ | ✓ | ✓ |
| Campaign scheduling, contact export | | ✓ | ✓ | ✓ |
| API campaigns, click tracking, retargeting, custom attributes | | | ✓ | ✓ |
| AI agent, store and payments | Add-on | Add-on | ✓ | ✓ |
| Support | Help centre | Email | Priority | Dedicated manager, SLA |

The pricing page must say: *"WhatsApp conversation charges are billed by Meta at their published rates and are not included in plan prices. Prices exclude 18% GST."*

---

## 7. Content rules (must follow)

- **Claim only what is built.** No invented customer logos, testimonials, ratings or user counts. Illustrative numbers are labelled as such.
- **WhatsApp and Meta brand:** say "built on the official WhatsApp Business Platform" and do not imply that Meta endorses or partners with us. No "Official Meta Partner" or "Tech Provider" claims until Meta approves them. Use the WhatsApp name in text only; do not use the WhatsApp logo as our logo.
- **Avoid in our name and logo:** "WhatsApp" and the green WhatsApp glyph.
- **Legal pages** must match the app's published policies.

---

## 8. Design quality bar

- **Layout:** a lot of whitespace, a 1200px max content width, a 12-column grid, 8px spacing scale, 16px side gutters on mobile and no horizontal scroll.
- **Components:** cards with a 16px radius, 1px `--line` borders and soft shadows used rarely. Buttons are 44px tall with a visible focus ring.
- **Motion:** subtle only, with fade-up on scroll (200–300ms) and a gentle message animation in the hero. Respect `prefers-reduced-motion`.
- **Accessibility:** WCAG 2.2 AA contrast, semantic landmarks, alt text, keyboard navigation and labelled form fields.
- **SEO:** a unique title and description per page, OG and Twitter images, `sitemap.xml`, `robots.txt`, and JSON-LD for `SoftwareApplication`, `Organization` and `FAQPage`.
- **Responsive:** checked at 360, 768, 1024 and 1440px.
- **Theme:** light by default, with a dark theme from the same tokens.

---

## 9. Acceptance checklist

- [ ] `cd bodhinox_Connect && npm install && npm run build` succeeds with no errors or warnings that matter
- [ ] Every feature in section 5 appears on `/features`; Home shows all six pillars
- [ ] Pricing matches section 6 and the Meta and GST note is present
- [ ] Logo SVGs, favicon and OG image exist and look right in light and dark
- [ ] Lighthouse 95+ (performance, accessibility, best practices, SEO) on Home and Pricing
- [ ] No invented testimonials or customer logos, and no Meta partnership claims
- [ ] All CTAs use `NEXT_PUBLIC_APP_URL`, and the contact form works or falls back to email
- [ ] Deploys on Vercel with Root Directory `bodhinox_Connect`

---

## 10. Decisions needed before building

1. **Domain:** for example `bodhinoxconnect.com` or `connect.bodhinox.com` (used in metadata, sitemap and OG).
2. **App URL** for Start free and Sign in.
3. **Contact and support email** (also needed for the app's `SUPPORT_EMAIL`).
4. **Prices:** keep the samples in section 6, or give final numbers.
5. **Demo form destination:** Formspree, or another endpoint you prefer, or email only.

---

## 11. The master prompt (copy-paste)

> Build a premium, simple marketing website for **Bodhinox Connect** inside the folder `bodhinox_Connect/` only, as a self-contained Next.js (App Router) + TypeScript + Tailwind CSS project that deploys to Vercel with Root Directory `bodhinox_Connect`. Bodhinox Connect is a WhatsApp-first customer platform for growing businesses: a shared team inbox, campaigns and broadcasts, visual flows and automation, an AI agent, a store with Razorpay payments and Shiprocket shipping, appointments, and a CRM with pipelines, analytics and an API.
>
> Follow `bodhinox_Connect/docs/MASTER_PROMPT.md` exactly:
> - the brand (cream and copper tokens, Instrument Serif and Inter, our own speech-bubble "link" logo as SVG)
> - the pages: Home, Features, Pricing, Solutions, Contact and Legal
> - the home section order
> - the full feature catalogue in section 5
> - the sample INR pricing in section 6, with the Meta-charges and GST note
> - the content rules in section 7: claim only what is built, no fake testimonials, no Meta partnership claims, no WhatsApp logo
> - the quality bar in section 8: WCAG AA, Lighthouse 95+, responsive from 360px, light and dark themes, subtle motion that respects reduced-motion, full SEO metadata and JSON-LD
>
> Keep all copy in `content/*.ts` data files. Draw every product visual as an HTML/CSS/SVG mock-up of the real app, not stock images. Read `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_CONTACT_ENDPOINT` from the environment, with safe fallbacks. Use the fewest dependencies possible. Finish when every item in the acceptance checklist in section 9 passes, including `npm run build`.

---

## 12. Meta standards (Business Verification and WhatsApp Tech Provider review)

Meta reviewers open the website to confirm three things: the business is real, the app does what the review says, and the legal URLs entered in the app dashboard work. The site must meet every item below.

- **Business identity.** Show the business name in every page footer, on About and on Contact. The legal entity name, registered address and phone come from `content/company.ts`, and each renders only when filled in. **Never invent a legal name, address, CIN or GSTIN.** Defaults: brand "Bodhinox Connect", operator "Bodhinox", country India, email udaykumar@bodhinox.com.
- **Contact page.** Show the support email as visible text, plus the address and phone when set, and a contact form.
- **Required public legal pages.** Link them from every footer, at stable URLs for the Meta app dashboard:
  - `/privacy`: the privacy policy, including WhatsApp and Meta data and data from connected accounts
  - `/terms`: the terms of service
  - `/data-deletion`: data deletion instructions, used as the "User data deletion" URL
  - `/acceptable-use`: the acceptable use and messaging policy
- **Acceptable use and messaging policy.** It covers:
  - opt-in consent before messaging
  - honouring STOP and opt-out
  - the prohibited categories in the WhatsApp Business and Commerce Policies
  - no spam and no purchased lists
  - template rules
- **WhatsApp Business Platform page** (`/whatsapp-business-platform`). Explain how Bodhinox Connect uses the platform:
  - Embedded Signup: the business connects its own WhatsApp Business Account and number, and keeps ownership of them
  - what the app does with `whatsapp_business_messaging` and `whatsapp_business_management`: sends and receives messages, and manages templates and phone numbers
  - Meta bills conversation charges to the business
  - how data is handled, and how to disconnect
- **About page** (`/about`): who we are, what the product does, where we operate (India), and how to reach us.
- **Domain verification hooks.**
  - When `NEXT_PUBLIC_FB_DOMAIN_VERIFICATION` is set, render `<meta name="facebook-domain-verification">`.
  - When `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is set, render Google Search Console's verification tag.
- **Trademarks.**
  - Never use the WhatsApp or Meta logos.
  - Use "WhatsApp" only descriptively: "for WhatsApp", "built on the WhatsApp Business Platform".
  - The footer notice reads: "WhatsApp and Meta are trademarks of Meta Platforms, Inc. Bodhinox Connect is not affiliated with or endorsed by Meta."
  - No partner badges and no partnership claims.
- **Cookies.** No tracking or analytics cookies by default, and the privacy policy says so; no cookie banner is needed. If analytics are added later, add consent first.
- **Legal text.** Adapt it from the app's published policies (`../content/legal/privacy.md`, `terms.md`, `data-deletion.md`), using the product name "Bodhinox Connect", the domain bodhinoxconnect.in and the email udaykumar@bodhinox.com. Keep the substance and never weaken a commitment.
- **Configured links.** "Start free" and "Sign in" use `NEXT_PUBLIC_APP_URL`, defaulting to `https://app.bodhinoxconnect.in`, until the owner points it at the real app.

## 13. SEO and Google ranking

- **Metadata.**
  - `metadataBase` is `https://bodhinoxconnect.in`.
  - Every page has a canonical URL, a unique title (at most 60 characters, pattern "<Page> | Bodhinox Connect") and a unique description of 140 to 160 characters.
  - Open Graph and Twitter cards, with an OG image per page.
  - `lang="en-IN"`.
- **JSON-LD structured data:**
  - `Organization` with name, url, logo, email and contactPoint
  - `WebSite`
  - `SoftwareApplication` with applicationCategory BusinessApplication and offers in INR for each plan
  - `FAQPage` on Home and Pricing
  - `BreadcrumbList` on inner pages
  - `Article` on guides
- **Crawlability.**
  - `app/sitemap.ts` lists every route, `app/robots.ts` allows all and points to the sitemap, and `app/manifest.ts` is present.
  - Pages are fully static, primary copy never depends on client-side rendering, and links are real `<a>` links.
- **Feature pages.** Each pillar has its own URL, a single H1, 600+ words of useful copy, FAQs and internal links:
  - `/features/team-inbox`
  - `/features/campaigns`
  - `/features/automation`
  - `/features/ai-agent`
  - `/features/commerce`
  - `/features/crm-analytics`
- **Solutions.** `/solutions` has one section per industry.
- **Guides.** `/guides` has three genuinely useful articles of 1,000+ words each:
  - "WhatsApp Business API in India: a complete guide"
  - "How to run WhatsApp marketing campaigns customers welcome"
  - "WhatsApp chatbots and AI agents for small businesses"
- **Keywords.** Use these naturally and never stuff them:
  - WhatsApp Business API India
  - WhatsApp CRM
  - WhatsApp marketing software
  - WhatsApp broadcast
  - WhatsApp chatbot
  - WhatsApp AI agent
  - shared team inbox
  - WhatsApp store
  - Razorpay WhatsApp payments
- **Performance.**
  - Static HTML; `next/font` self-hosted fonts with `display: swap`; no layout shift.
  - Minimal JavaScript, used only for the menu, the pricing toggle, the FAQ (`<details>`) and the contact form.
  - SVG visuals, and Core Web Vitals in the green.
- **Semantics.**
  - One H1 per page, with a logical heading order below it.
  - Descriptive link text.
  - Alt text on every meaningful image.
  - A 404 page that links back to the key pages.

## 14. Design revisions (these override section 2 where they differ)

- **Palette.** Keep the app's cream and copper so the product mock-ups match the product, but avoid the generic "cream + serif + terracotta" template look:
  - deliberate neutrals: ink `#1d1b17`, paper `#f8f7f4`, white surfaces
  - copper only for primary actions and key figures
  - no gradient heroes, and no accent bars on cards
- **Typography (replaces Instrument Serif and Inter):**
  - display: **Bricolage Grotesque** (variable, with tight tracking at large sizes)
  - body: **Figtree**
  - utility: **JetBrains Mono** for small data such as timestamps, ticks, prices in mock-ups and plan limits
  - all three load through `next/font/google`
- **Details only this product has, used as content rather than decoration:**
  - message ticks: sent ✓, delivered ✓✓, read ✓✓ in copper
  - the 24-hour customer service window
  - template categories: Marketing, Utility, Authentication
  - STOP opt-out handling
  - INR prices with GST
  - Razorpay UPI checkout inside the chat
- **Layout.**
  - Left-aligned and editorial; not everything centred.
  - The hero is sized to its content, never 100vh.
  - Cards only for elements that are separate objects (plans, mock-up windows).
  - Numbered markers only for the real four-step "How it works" sequence.
  - No emoji used as section markers.
- **Motion.**
  - One orchestrated moment: the hero chat messages arrive in sequence and their ticks turn to "read".
  - Everything else is still, apart from 200ms hover transitions.
  - Respect `prefers-reduced-motion`, and keep content visible at rest (never opacity 0 waiting for a scroll).
- **Themes.** Light by default, with a dark theme built from the same tokens; it follows the system setting and has a toggle.

## 15. Build rules

- Work only inside `bodhinox_Connect/`, and never edit the main app.
- Match the app's versions:
  - next 16.4.3
  - react and react-dom 19.2.4
  - tailwindcss and @tailwindcss/postcss ^4
  - typescript ^6
  - lucide-react 1.61.0
  - eslint ^9 with eslint-config-next 16.3.8
- `next.config.ts` sets `turbopack.root` and `outputFileTracingRoot` to this folder, because it sits inside another repo that has its own lockfile.
- `npm run build`, `npm run lint` and `npm run typecheck` must all pass.
