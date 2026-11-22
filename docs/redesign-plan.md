# Bodhinox Connect website redesign: implementation plan

Scope: redesign `C:\Users\uday\Desktop\bodhinox-connect` (the marketing site) as a product-led showcase of the CRM in `C:\Users\uday\Desktop\BODHINOX_CHAT`, on the CRM's own theme. Nothing was modified. Everything below is grounded in files I read; where I could not verify something (production flags, live prices) it is marked.

---

## 0. Things the builder must know first

| Topic | Fact | Source |
|---|---|---|
| Next version | 16.4.3, React 19.2.4, Tailwind v4, lucide-react 1.61, Node >=24.11 <25. `AGENTS.md` says to read `node_modules/next/dist/docs/` before coding. | `bodhinox-connect/package.json`, `AGENTS.md` |
| Next docs to read | `01-app/01-getting-started/11-css.md`, `13-fonts.md`, `14-metadata-and-og-images.md`, `05-server-and-client-components.md`; `01-app/02-guides/json-ld.md`, `preventing-flash-before-hydration.md`, `keeping-pages-static.md`; `01-app/03-api-reference/03-file-conventions/01-metadata/{opengraph-image,sitemap,robots,app-icons,manifest}.md` | `node_modules/next/dist/docs/` |
| Site rules already in code | No hard-coded hex, no `dark:` variant; tokens switch themselves. Mockups are wrapped in `role="img"` with an `aria-label`. Feature bullets may only list built features. | `app/globals.css` header comment, `components/mockups/Frames.tsx`, `content/features.ts` |
| SEO plumbing to preserve | `content/site.ts` (www canonical, email `udaykumar@bodhinox.com`), `content/nav.ts` `routes` drives `app/sitemap.ts` and `/sitemap`; `content/seo.ts` `PAGE_DATES` (build fails if a route has no date); `lib/seo.ts` (`pageMetadata`, Organization / WebSite / SoftwareApplication / FAQPage / BreadcrumbList / Article JSON-LD); `lib/og.tsx` + one `opengraph-image.tsx` per route; `next.config.ts` (bare-domain 308, `*.vercel.app` noindex, security headers); `app/robots.ts`; `public/llms.txt`; `public/cc9ff792834ebbce854df86a6d0957f3.txt` + `scripts/indexnow.mjs`. | those files |
| CRM is a fork | The CRM is adapted from open-source `wacrm`; the bundled MCP server is still the upstream npm package `wacrm-mcp` with `WACRM_*` env vars and the upstream author's name. | `BODHINOX_CHAT/README.md`, `mcp-server/package.json`, `docs/mcp.md` |
| CRM default theme | Mode `light`, accent `blue` (`#0071e3`). Copper is an optional accent described as "the BODHINOX studio palette". The current website is copper on warm paper, so it does not match what a new user sees after sign-up. | `src/lib/themes.ts`, `src/app/globals.css` |

---

## 1. Feature inventory (grounded in the CRM code)

Primary source: `BODHINOX_CHAT/docs/architecture/bodhinox-functionality.md` (the maintained feature/acceptance matrix, 235 KB), cross-checked with `src/components/layout/sections.ts` (sidebar), `src/app/(dashboard)/**` routes, `src/lib/billing/entitlements-catalogue.ts`, `docs/release/feature-flags.md`, `docs/billing-limits.md`, `docs/public-api.md`, `content/help/*.md`, `docs/product-guide/*.html` (25 chapters).

The CRM sidebar has eight sections: Inbox, Contacts, Automation, Campaigns (Broadcasts, Templates, Ads, Forms), Sales (Pipelines, Appointments, Orders, Catalogue, Products, Payments, Store settings), AI, Analytics (Overview, Analytics, Conversations, Team, Campaigns, Reports), Settings. The website IA should mirror this.

### 1.1 Shipped (safe to market)

| Area | Sub-capabilities | Where |
|---|---|---|
| **Team inbox** | One inbox across numbers and channels; status tabs Active / Requesting / Intervened; 24-hour window countdown rings; filters (agent, tags, company, number, consent), saved views, message full-text search; text, media, voice notes, templates, buttons/lists, location, reactions, quotes; internal notes with @mentions; quick replies with favourites; media library; assignment, round-robin routing rules, reassign-after-minutes; working hours + away message; first-reply SLA and breach alerts; auto-resolve; reminders/snooze; export chat CSV; block/unblock; per-member phone masking; sender attribution and handling history; human handoff (pause/resume bot); send form, payment link, storefront link, product from the composer; browser/Web Push notifications with quiet hours | `src/app/(dashboard)/inbox`, `whatsapp/inbox`, `src/components/inbox/*`, functionality rows "Inbox", "Inbox layout (redesign)", "Inbox premium", "Inbox conversation tools", "Team: who handled which chat" |
| **Contacts / CRM** | Contact profile page with timeline, notes, labels, owner, deals, orders, conversations; typed custom fields (text, number, date, choice); CSV import with column matching and reject download; phone dedup; saved segments (live counts, retargeting conditions); static lists; tag categories; admin CSV export; workspace attributes (`{{workspace.key}}`, secret ones encrypted); WhatsApp consent record (opted in / out / none, source and date); STOP/START keywords | `contacts`, `contacts/[id]`, `contacts/segments`, `contacts/fields`, rows "Contacts", "Segments and export", "Lists…", "Contact profile", "Consent", "WhatsApp opt-in record" |
| **Sales pipelines** | Configurable stages, deal board, owner filter, open value / won value / win rate cards, deal panel | `pipelines`, row "Pipelines", "Sales screens" |
| **Campaigns (broadcasts)** | Audiences: all / tag / custom field / CSV / segment / list, exclusions; personalised variables; test send to 3 numbers; send now or schedule up to 90 days; pause/resume; delivery/read/reply tracking; click tracking with unique clickers; retargeting by earlier outcome; API campaigns; retry failed with honest "uncertain" outcomes; number quality rating and daily tier shown; Meta rate-limit backoff | `broadcasts`, `broadcasts/new`, `broadcasts/[id]`, row "Campaigns" |
| **Templates** | Standard, carousel (2-10 cards), authentication (OTP), limited-time offer, location header; field-level Meta checks; drafts; status history; quality chip; library of 28 ready-written templates; AI template writer | `templates`, row "Templates" |
| **WhatsApp Forms (Meta Flows)** | Up to 10 screens; text, email, phone, number, date, dropdown, radio, checkbox, opt-in; answers saved to contact fields; live phone preview; publish to Meta; send from inbox, flow step, template button or campaign; responses list + CSV; encrypted endpoint | `forms`, `forms/[id]`, row "WhatsApp Forms" |
| **Flows (visual builder)** | React Flow canvas plus a "Simple builder"; step groups Starting step / Content / AI / Logic / Extras; ask question (text, number, date, yes/no, email, phone, pattern), ask for media/location/address, buttons, lists, conditions (up to 10 rules), waits, set attribute, send template, API request with test, assign agent, connect flow, send form, payment link, storefront link, book appointment, AI reply step; triggers: keyword, regex, template button tap, first message, ice breaker, new contact, tag added, order received; versioned publish, version history, dry run, run inspection, replay; six starter flows (Chat with AI, Book a meeting, Answer questions with AI, Save customer details, Send to website, Qualify leads quiz) plus an Ayurvedic store journey | `flows`, `flows/[id]`, `flows/[id]/runs`, `src/lib/flows/templates.ts`, rows "Visual flows", "Flow builder layout", "Flow versions and lifecycle", "Dry run…", "WhatsApp starter gallery" |
| **Automations (rules)** | Event / keyword / tag / status / scheduled triggers, conditions, delays, wait-for-reply, replies, CRM actions, round-robin assign, webhooks; loop prevention; per-rule logs; unified Automation list (All / Flows / Rules / Sequences) | `automation`, `automations/*`, rows "Automation", "Unified Automation section", "Automations, webhooks and journey templates" |
| **AI (in-app brand: "KHAGA")** | Up to 20 agents per workspace (name, role, instructions, tone, channels, working hours, handoff rules); knowledge console (documents, website, FAQs, embeddings; per-source visibility and "use in customer replies"); playground; learnings; usage and activity log; quality metrics; assistant features, all off by default per workspace: chat summary, suggested replies, intent + lead score assessment, business insights; AI template writer, flow generator, campaign assistant; monthly token cap; `AI_ENABLED` kill switch (on by default); bring-your-own provider key (OpenAI, Gemini, OpenRouter-style) | `agents`, `src/components/agents`, `src/lib/ai/*`, rows "AI agents", "AI page: several agents…", "AI assistant foundation…" (Phase 13), `docs/openrouter-agent-setup.md` |
| **Commerce** | Own catalogue: 2-level categories, products, up to 10 images, variants with SKU, compare-at price, tax; inventory levels and movements, low stock; coupons; shipping rates; tokenised storefront link per contact (`/shop/[token]`) with cart and checkout; Meta catalogue mirror, product / product list messages, WhatsApp cart orders; orders lifecycle, returns, documents; order notice templates; reorder reminders; revenue analytics | `commerce/{catalogue,products,orders,payments,settings}`, `src/app/shop/[token]`, rows "Commerce", "Catalogue and inventory", "Storefront, pricing and checkout", "Orders…" |
| **Payments** | Razorpay payment links from inbox, order or flow step; verified settlement only (webhook or fetch); refunds and reconciliation; keys stored encrypted; test/live from key. COD exists but is off by default per store | `commerce/payments`, `src/lib/payments`, rows "Customer payments, refunds and reconciliation", "Cash on delivery (COD)" |
| **Appointments** | Services (duration, buffer, capacity, price, online/offline), practitioners, locations with time zones, weekly hours, holidays; public booking page `/book/[slug]` confirmed by `BOOK <code>` on WhatsApp; manage link `/my-booking/[token]`; 24 h and 2 h reminders; no-show/completed; paid appointments via Razorpay; booking from a flow step | `appointments`, `src/app/book/[slug]`, rows "Appointments (Phase 7)", "Paid appointments" |
| **Analytics & reports** | Overview dashboard (metric cards, conversations chart, response-time chart, pipeline donut, activity feed); Analytics, Conversations, Team, Campaigns tabs; ranges up to 366 days, calendar presets, compare panel; conversation source split incl. click-to-WhatsApp ads; saved and shared reports; scheduled CSV/PDF | `dashboard`, `analytics/*`, `reports`, rows "Analytics and reports", "Analytics redesign", "Analytics comparisons and report artifacts" |
| **Click-to-WhatsApp attribution** | Ad referral captured on first message, ad badge in inbox, "ad" conversation source in analytics. Always on, no Meta call | row "Click-to-WhatsApp ads (Phase 10)", `src/components/inbox/ad-referral-badge.tsx` |
| **WhatsApp numbers** | Several numbers / WABAs per workspace, default number, Embedded Signup v5 or manual connect, business profile editing, ice breakers, health sync every 6 h (quality, tier, name status), green-tick checklist | `docs/multi-waba.md`, row "WhatsApp numbers" |
| **Team & access** | Roles owner/admin/agent/viewer, groups, per-feature permissions, invitations, multi-workspace membership, ownership transfer | row "Accounts", "Settings redesign" |
| **Security & privacy** | Argon2id passwords, verified email, RS256 JWT with rotating refresh, session revocation, TOTP + recovery codes, CSRF, tenant isolation via PostgreSQL RLS, audit log with search and CSV export, workspace export (JSONL zip), contact erase, workspace deletion with 30-day grace, private S3 media, signed webhooks, rate limits | `README.md`, rows "Identity", "Privacy & access…", "Data retention and erasure", "Private media" |
| **Developer platform** | Public API `/api/v1` (me, messages, contacts, contact flows, conversations, broadcasts, webhooks) with scoped keys (`messages:send`, `messages:read`, `contacts:read/write`, `conversations:read`, `broadcasts:send`, `webhooks:manage`); outbound signed webhooks (`message.received`, `message.status_updated`, `conversation.created`, `broadcast.completed`, `template.status_updated`, `flow.completed`, `order.created`, `order.paid`, `payment_link.paid`) with delivery log; Zapier / Google Sheets recipes via webhooks | `docs/public-api.md`, `docs/integrations/zapier-and-google-sheets.md` |
| **Billing (SaaS)** | Self-serve plans via Razorpay Checkout, GST profile and tax invoices, prorated upgrades, downgrade at period end, add-on packs (extra seats, AI messages, extra numbers), usage meters with 80%/100% notices | `src/lib/billing/*`, row "Billing and plans" |
| **Languages** | UI in English, Spanish, Portuguese, Korean. No Indian languages. | `messages/{en,es,ko,pt}.json` |
| **Personalisation** | Light/dark mode and 7 accent themes (blue, copper, violet, emerald, cobalt, amber, rose) | `src/lib/themes.ts` |

### 1.2 Built but gated: do NOT present as available without owner confirmation

`docs/release/feature-flags.md` lists every flag with "Production today: owner to confirm (expected unset)". I have no production access, so treat all of these as off.

| Feature | Gate | Suggested website treatment |
|---|---|---|
| **Instagram** (DM inbox, comment replies, comment-to-DM quick automation, story/live triggers, conversation starters, menu, ref links, sequences, insights, card/button templates) | `INSTAGRAM_ENABLED`, needs Meta App Review; row says "Built, off until App Review" | "Coming soon" badge (the site already does this in `content/features.ts` `comingSoon`). Show an Instagram mockup only on a clearly labelled preview block |
| **Ads reporting and lead forms** (`/ads` overview, ads table, ad accounts) | `META_ADS_ENABLED`, needs app review | "Coming soon" or "Early access" |
| **Ad creation, pause/resume, budgets, custom + lookalike audiences, AI ad copy/images** | `META_ADS_MANAGE_ENABLED`; row says "Built, ships dark" | Do not claim |
| **Zoom meetings** for online appointments | `ZOOM_ENABLED`, off until Zoom approves the app | Omit, or "Coming soon" |
| **Google Sheets** connection and flow step | `GOOGLE_SHEETS_ENABLED`, off | Market only the webhook/Zapier route |
| **Shopify app** | Implicit gate on Shopify app keys ("owner to confirm") | Confirm before listing as live |
| **Google sign-in** | Implicit gate on OIDC keys | Do not mention unless confirmed |
| **Cash on delivery** | Off by default per store, admin switch | Fine to list as an option |
| **AI assistant features** (summary, suggestions, scoring, insights) | Off by default per workspace, admin switch | Fine to list ("turn on in Settings") |
| **Shiprocket** | Per-workspace connection; kill switch `SHIPROCKET_DISABLED` | Fine to list |
| **MCP server** | Works over the public API but is the upstream `wacrm-mcp` package, not Bodhinox-branded | See open question 6 |
| **Platform console** (`/platform`) | Internal operator tooling | Never mention |

### 1.3 Plans and limits in code

- Plan ids `free`, `basic`, `pro`, `enterprise` (`prisma/migrations/20261102030000_entitlements/migration.sql`). Seeded limits:

| Limit | Free | Basic | Pro | Enterprise |
|---|---|---|---|---|
| seats | 1 | 3 | 10 | unlimited |
| segments / lists | 3 / 3 | 20 / 20 | 100 / 100 | unlimited |
| campaign_recipients | 250 | 10,000 | 50,000 | unlimited |
| active_flows | 1 | 5 | 50 | unlimited |
| active_automations | 3 | 20 | 100 | unlimited |

- Seeded features: Basic = `campaign_scheduling`, `contact_export`; Pro adds `api_campaigns`, `click_tracking`, `retargeting`, `workspace_attributes`.
- Later migrations turned `appointments`, `storefront`, `instagram` (and derived `online_meetings`, `courier_shipping`) **on for every plan including Free** (`20261106100500_appointments_wiring`, `20261107102500_commerce_wiring`, `20261109100000_instagram_accounts`).
- Other limit keys exist but are seeded as unlimited (`null`): `ai_messages`, `ai_tokens_monthly`, `monthly_active_contacts`, `messages_monthly`, `storage_bytes`, `whatsapp_numbers`, `instagram_accounts`, `appointment_staff`, `contacts`, `integrations` (`src/lib/billing/entitlements-catalogue.ts`).
- Add-ons in code: `extra_seats`, `ai_messages`, `extra_numbers` only.
- **Prices are not in code.** They live in the database (`plan_prices`) and are edited in the platform console; plans are versioned, so live limits may differ from the seeds. The CRM's own `/pricing` page shows prices **inclusive of GST** (`src/app/(marketing)/pricing/page.tsx` header comment).

---

## 2. Gap analysis: website vs CRM

### 2.1 Inaccurate or risky claims on the current site

| # | Current website claim | What the code says | File to fix |
|---|---|---|---|
| 1 | "AI agent, store and payments: Add-on on Free/Basic, included in Pro" (comparison row, plan highlights, pricing FAQ, ai-agent page FAQ) | Storefront and appointments are enabled on all plans; there is no AI plan feature. Add-ons are extra seats, AI message packs, extra numbers | `content/pricing.ts`, `content/faqs.ts`, `app/features/ai-agent/page.tsx` |
| 2 | "Prices exclude 18% GST" (`pricingNote`, llms.txt, FAQ) | CRM pricing page states GST-inclusive prices | `content/pricing.ts`, `public/llms.txt` |
| 3 | Prices ₹1,499 / ₹3,999, "2 months free" yearly | Not in code; flagged in-file as samples (`PRICES_CONFIRMED = false`) | `content/pricing.ts` |
| 4 | "Write to us when you want to move plans" | Self-serve upgrade (prorated) and downgrade at period end exist | `content/faqs.ts` |
| 5 | Enterprise "Dedicated manager and SLA", support tiers "Email / Priority" | Nothing in code; business decision | `content/pricing.ts` |
| 6 | `site.appUrl` defaults to `https://app.bodhinoxconnect.in` | The app is at `https://bodhinox-web-production.up.railway.app`. If `NEXT_PUBLIC_APP_URL` is unset in Vercel, every "Start free" / "Sign in" button points at a host that may not resolve. Not verified | `content/site.ts`, Vercel env |
| 7 | Commerce bullet "Sync with … Shopify and WooCommerce"; "scheduled CSV and PDF reports" | Shopify is key-gated (confirm); reports exist | `content/features.ts` |
| 8 | Free-plan FAQ "No card is needed" | Consistent with `free` being the default new-workspace plan, but `NEW_WORKSPACE_PLAN` is "owner to confirm" | `content/faqs.ts` |

Limits for seats, recipients, flows, automations, segments and lists on the website match the seeds exactly.

### 2.2 Real CRM features the website does not show (or only names in a bullet)

- Appointments and booking pages (one bullet under Commerce; deserves its own page).
- WhatsApp Forms (one bullet under Automation).
- Templates: carousel / OTP / limited-time offer kinds, 28-template library, AI writer.
- Multi-agent AI, knowledge console, playground, quality metrics, lead scoring, insights, AI template/flow writers.
- Inbox depth: 24-hour window rings, SLA, routing rules, saved views, phone masking, media library, reminders.
- Segments with retargeting, lists, typed custom fields, consent record.
- Flow versioning, dry run, replay, starter gallery, Simple builder, API request step.
- Own catalogue with variants/inventory/coupons, tokenised storefront, returns, order notices.
- Analytics tabs, compare panel, shared reports, click-to-WhatsApp attribution.
- Developer platform: public API, scopes, webhooks. No page exists.
- Integrations as a concept: Razorpay, Shiprocket, WooCommerce, Shopify, Meta catalogue, Zapier, webhooks. No page exists.
- Security: only six bullets on home; no page.
- Multiple WhatsApp numbers with health monitoring; light/dark + accent themes.

### 2.3 Visual gap

- Website: warm paper `#f8f7f4`, copper `#a65328`, Bricolage Grotesque + Figtree + JetBrains Mono, a hand-drawn two-bubble mark.
- CRM: Apple-style neutrals `#f5f5f7` / `#ffffff` / `#1d1d1f`, blue `#0071e3`, system font then Inter, sunflower logo, raised content sheet beside a flat sidebar.
- Existing mockups (`components/mockups/*`, `components/features/PillarMockups.tsx`) are small generic cards in a three-dot window, not the CRM shell. There is no full-app hero screenshot.

---

## 3. Design system spec

### 3.1 Decision: adopt the CRM token names

Port the CRM's shadcn-style variable names so mockup code can reuse the CRM's class strings (`bg-card`, `border-border`, `text-muted-foreground`, `bg-primary-soft`). Keep the website's theme mechanism (`:root` light, `[data-theme="dark"]`, system-follow media query, `components/layout/theme-script.ts`), only change names and values.

**Naming collision to handle first:** the site uses `text-muted` for secondary text; in the CRM `muted` is a surface and text is `muted-foreground`. Step one of the build is a mechanical rename across `app/`, `components/`, `lib/`:

| Old utility stem | New |
|---|---|
| `bg` (`bg-bg`, `from-bg`) | `background` |
| `surface` | `card` |
| `sunken` | `muted` (after `text-muted` is renamed) |
| `ink` | `foreground` |
| `text-muted`, `decoration-muted` etc. | `muted-foreground` |
| `line` | `border` |
| `line-strong`, `field` | `input` |
| `copper` | `primary` |
| `copper-hover` | `primary-hover` |
| `copper-soft` | `primary-soft` |
| `copper-ink` | `primary` (text on tint) |
| `on-copper` | `primary-foreground` |
| `danger` | `destructive` |
| `chat`, `bubble-in`, `bubble-out` | `card`, `muted`, `primary` (see 3.4) |

Do the `text-muted` rename before redefining `--color-muted`, and grep for leftovers (`rg "\b(bg|text|border|ring|from|to|via|decoration|divide|outline|fill|stroke)-(bg|surface|sunken|ink|line|copper|field|on-copper|chat|bubble)"` must return nothing).

### 3.2 Tokens for `app/globals.css`

Values copied from `BODHINOX_CHAT/src/app/globals.css` (blue accent) and `studio.css`.

| Token | Light | Dark |
|---|---|---|
| `--background` | `#f5f5f7` | `#0f0f10` |
| `--foreground` | `#1d1d1f` | `#f5f5f7` |
| `--card` | `#ffffff` | `#1c1c1e` |
| `--card-2` | `#f5f5f7` | `#232326` |
| `--popover` | `#ffffff` | `#232326` |
| `--secondary` | `#f2f2f4` | `#2c2c2f` |
| `--muted` | `#f2f2f4` | `#2a2a2d` |
| `--muted-foreground` | `#6e6e73` | `#a1a1a8` |
| `--accent` (hover surface) | `#ececef` | `#2c2c2f` |
| `--border` | `#e3e3e8` | `#2f2f33` |
| `--input` | `#d2d2d7` | `#3a3a3e` |
| `--destructive` | `#d70015` | `#ff6961` |
| `--primary` | `#0071e3` | `#2997ff` |
| `--primary-foreground` | `#ffffff` | `#ffffff` |
| `--primary-hover` | `#0077ed` | `#47a6ff` |
| `--primary-soft` | `#0071e314` | `#2997ff1c` |
| `--primary-soft-2` | `#0071e324` | `#2997ff2e` |
| `--ring` | `#0071e3` | `#2997ff` |
| `--chart-1..5` | `#0071e3`, `#5ac8fa`, `#34c759`, `#ff9f0a`, `#af52de` | `#2997ff`, `#64d2ff`, `#30d158`, `#ffd60a`, `#bf5af2` |
| `--sidebar` / `--sidebar-accent` | `#f5f5f7` / `#ffffff` | `#0f0f10` / `#232326` |
| `--glass` (header) | `#fffffff0` | `#1c1c1ef0` |
| `--shadow-soft` | `0 1px 2px #0000000a, 0 8px 24px #0000000f` | `0 1px 2px #0006, 0 8px 24px #0005` |
| `--note` / `--note-fg` (internal notes) | `#fff6d6` / `#5c4a00` | `#3a3210` / `#f3dc8a` |
| `--wa` / `--ig` (channel dots) | `#1fa855` / `#d6338a` | same |
| `--success` | `#34c759` text use `emerald-600` equivalent `#248a3d` | `#30d158` |
| `--warning` | `#b25000` on `#ff9f0a1f` | `#ffd60a` |
| `--tab-active` (segmented tab pill) | `#ffffff` | `#3a3a3e` |
| `--brand-orange` (logo only, never UI) | `#f57c1f` approx, sample from the webp | same |

Add a comment that `--primary` is a single block so the accent can be swapped to copper (`#a65328` / dark `#db9e6f`, foreground `#fffaf4` / `#251a12`) if the owner prefers (open question 1). Contrast note: `#6e6e73` on `#f5f5f7` is about 4.7:1, `#0071e3` on white about 4.6:1; both pass AA for body text, but do not put `muted-foreground` on `--muted` at sizes under 14px.

`@theme inline` must expose every one of the above as `--color-*`, plus `--color-card-2`, `--color-primary-hover`, `--color-primary-soft`, `--color-primary-soft-2`, chart colours, `--color-note`, `--color-wa`, `--color-ig`.

Radii (CRM `--radius: 0.75rem`): `--radius-sm 0.45rem`, `--radius-md 0.6rem`, `--radius-lg 0.75rem`, `--radius-xl 1.05rem`, `--radius-2xl 1.35rem`; app sheet radius 18px; replace `--radius-card: 1rem` with `0.75rem` (cards are `rounded-xl` in the CRM) and `--radius-control` with pill (`9999px`) for buttons, 12px for inputs.

Motion: `--ease: cubic-bezier(.2,.8,.2,1)`, 150 ms hovers, 280 ms panels; keep the existing `msg-in` / `tick-read` keyframes; keep `prefers-reduced-motion` handling.

Update `viewport.themeColor` in `app/layout.tsx` to `#f5f5f7` / `#0f0f10`, and `app/manifest.ts` colours.

### 3.3 Typography

- Body/UI: the CRM stack `-apple-system, BlinkMacSystemFont, "SF Pro Text", var(--font-inter), "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. Load `Inter` via `next/font/google` in `lib/fonts.ts` (variable `--font-inter`).
- Headings: same family, weight 700, tracking `-0.025em` (`.studio-editorial`). Remove Bricolage Grotesque and Figtree. Alias `--font-display` to `--font-sans` so existing `font-display` classes keep working.
- Mono: `Geist_Mono` (the CRM's `--font-geist-mono`) replacing JetBrains Mono, used sparingly; the CRM uses `tabular-nums` rather than mono for figures, so mockup numbers should use `tabular-nums`.
- Keep the marketing type scale (`--text-hero`, `--text-h2`, …) but tighten: hero weight 700, tracking `-0.03em`. Mockup internals use the CRM's sizes: 13px nav and tabs, 15px page title, 12px metric labels, 20-24px metric values, 11px table heads uppercase with `0.06em` tracking, 14px bubble text.

### 3.4 CRM UI language the mockups must replicate

| Element | Spec (from CRM source) |
|---|---|
| **App shell** | Page background `--background`; sidebar 232px, flat, same colour as page; content sits on one raised sheet: `margin 8px 8px 8px 0`, 1px `--border`, radius 18px, `--card`, `--shadow-soft` (`studio.css` `.studio-shell`) |
| **Sidebar** | 64px brand row with the full logo at 44px height; nav rows 40px, radius 8px, 13px medium, icon 18px, gap 12px; active row = `--sidebar-accent` (white) with shadow `0 1px 2px rgb(0 0 0/.06), 0 4px 14px rgb(0 0 0/.05)` and icon in `--primary`; inactive text `--muted-foreground`; unread pill 20px high in `--primary`; Settings pinned to bottom, then "Collapse" row, then account row (32px avatar with `bg-primary/12 text-primary` initial, name 13px semibold, workspace 11px muted). Collapsed rail 64px, icons only (`sidebar.tsx`) |
| **Sidebar icons (lucide)** | Inbox `MessageSquare`, Contacts `Users`, Automation `Workflow`, Campaigns `Megaphone`, Sales `ShoppingBag`, Analytics `BarChart3`, Settings `Settings`; AI uses the custom Khaga mark (`public/brand/khaga-mark-sun-orange.webp`) |
| **Top bar** | 60px, glass background with 12px blur, bottom border; breadcrumb "Group › Page" 13px muted then 15px semibold title; right side bell with count dot (`header.tsx`) |
| **Section tabs** | Segmented control: container `--muted`, radius 12px, padding 3px; tabs 32px high, radius 9px, 13px medium; active = `--tab-active` with `0 1px 3px rgb(0 0 0/.12)` (`section-tabs.tsx`) |
| **Buttons** | Pill (`rounded-full`), 32px default, 40px large, 14px medium; primary = `--primary`, hover `--primary-hover`; outline = `--card` + border; active state translateY(1px) (`ui/button.tsx`) |
| **Cards** | `rounded-xl`, 1px `--border`, no shadow, 16px padding; metric cards lift 2px on hover (`metric-card.tsx`, `studio.css`) |
| **Metric card** | Label 12px medium muted + 14px muted icon top right; value 20-24px bold tabular; delta row 12px semibold with arrow, emerald up / red down |
| **Tables** | Header band `--card-2`, 11px uppercase semibold muted heads, 16px row padding, hairline rows |
| **Badges** | 20px high pill, 12px medium; tones: primary solid, secondary, destructive tint, outline; status tints use `color/10-14%` backgrounds |
| **Chat bubbles** | Thread on `--card`; incoming on `--muted`; outgoing solid `--primary` with `--primary-foreground` (not WhatsApp green); interactive cards (buttons, lists, product) on neutral with a card inside; internal notes on `--note`; system lines as small grey pills; ticks via `Check` / `CheckCheck`, read = `text-blue-400` equivalent; selected conversation row `--primary-soft`; composer box with focus ring `0 0 0 3px --primary-soft`; Instagram bubbles radius 22px (`inbox.css`, `message-bubble.tsx`) |
| **Inbox layout** | Three panes: conversation list (search, channel toggle, Active / Requesting / Intervened tabs with counts, rows with avatar, window ring and time left), thread (header with contact, assignee, Resolve, bell), 280px contact panel with folding sections (consent, AI summary, details, labels, notes, history, deals) |
| **Flow canvas** | Canvas on `--card-2`, node cards with shadow `0 1px 2px #0000000d, 0 8px 24px -12px #0000002e`, edges `color-mix(primary 68%, border)` 1.8px, round "+" add button, version pill "Draft / Live v3", right inspector 304px |
| **Charts** | Bar/line with `--chart-1..5`; donut for pipeline by stage; soft grid lines in `--border` |
| **Phone preview stage** | Phone on a 64px drawing-board grid over `--muted` (`.template-phone-stage`), used for template, form and Instagram previews |

### 3.5 Logo

- Use the CRM's cleaned exports, not the root PNGs (the root `bodhinox-connect-logo*.png` files have ragged alpha edges). Copy from `BODHINOX_CHAT/public/brand/`: `bodhinox-connect-light@{1,2,3}x.webp`, `bodhinox-connect-dark@{1,2,3}x.webp`, `bodhinox-mark@{1,2,3}x.webp`, `khaga-mark-sun-orange.webp` into `bodhinox-connect/public/brand/`.
- The lockup is an orange sunflower with a dark face plus "Bodhinox" bold and "CONNECT" in orange capitals.
- `components/brand/Logo.tsx`: render `<img>` with `srcSet` 1x/2x/3x, light and dark variants swapped by a CSS class tied to the site's `data-theme` mechanism (two images, one hidden by a rule in `globals.css`, same idea as `.theme-icon-sun`). Header height 36-40px; footer 44px.
- Update `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.tsx`, `app/logo.png/route.tsx`, `public/brand/*.svg`, `components/brand/mark.ts` `BRAND_COLORS`, and `lib/og.tsx` to the sunflower mark and the new neutrals. `ImageResponse` cannot read webp reliably; export a PNG of the mark for OG/apple-icon use (builder converts once and commits it). Confirm with the owner first (open question 2), because Organization JSON-LD `logo` points at `/logo.png`.

---

## 4. Information architecture

### 4.1 Sitemap (existing URLs all kept)

| Route | Status | Purpose |
|---|---|---|
| `/` | keep, rebuild | Product-led home |
| `/features` | keep, rebuild | Full feature index mirroring the CRM sidebar |
| `/features/team-inbox` | keep | Inbox |
| `/features/campaigns` | keep | Broadcasts + templates |
| `/features/automation` | keep | Flows + rules |
| `/features/ai-agent` | keep | AI agents + assistant |
| `/features/commerce` | keep | Catalogue, storefront, orders, payments, shipping |
| `/features/crm-analytics` | keep | Contacts, pipelines, analytics |
| `/features/appointments` | **new** | Booking pages, reminders, paid bookings |
| `/features/whatsapp-forms` | **new** | Forms (Meta Flows) |
| `/integrations` | **new** | Razorpay, Shiprocket, WooCommerce, Shopify, Meta catalogue, webhooks, Zapier; gated ones badged |
| `/developers` | **new** | Public API, scopes, webhooks, (MCP if approved) |
| `/security` | **new** | Security, privacy and compliance |
| `/pricing`, `/solutions`, `/whatsapp-business-platform`, `/guides` + 3 guides, `/about`, `/contact`, `/privacy`, `/terms`, `/data-deletion`, `/acceptable-use`, `/sitemap` | keep | Restyle; copy edits only where section 2.1 requires |

Instagram and Ads do not get routes until the flags are confirmed on; they appear as a "Coming soon" band on `/features` and home. If the owner confirms them live, add `/features/instagram` and `/features/ads` using the same pillar template.

For every new route: add to `routes` in `content/nav.ts`, add a date in `PAGE_DATES` (`content/seo.ts`, widen the `DatedPath` type automatically), add `opengraph-image.tsx`, add to `public/llms.txt`, add Breadcrumb JSON-LD. Extend `RouteSection` with `"Platform"` for integrations/developers/security. Bump `PAGE_DATES` for every page whose copy changes (not for pure restyles of legal pages).

### 4.2 Header

`Logo | Product ▾ | Solutions | Pricing | Developers | Resources ▾ | (theme toggle) Sign in | Start free`

Product mega-menu (three columns plus a feature card), each item = lucide icon in a `bg-primary-soft` 32px tile, title, one-line description:

| Engage | Automate | Sell and measure |
|---|---|---|
| Team inbox | Flows and automation | Store and payments |
| Campaigns and templates | AI agents | Appointments |
| WhatsApp Forms | Integrations | CRM and analytics |

Right card: small `AppShell` thumbnail + "See every feature" → `/features`. Footer strip of the menu: "Built on the official WhatsApp Business Platform" → `/whatsapp-business-platform`.

Resources menu: Guides, WhatsApp Business Platform, Security, About, Contact.

Implementation: a small client component (`components/layout/MegaMenu.tsx`) using a button with `aria-expanded` + a positioned panel; closes on Escape, outside click and route change; hover intent optional. Links must be in the server-rendered HTML (render the panel always, hide with CSS) so crawlers see them. `MobileMenu.tsx` gets accordion groups for Product and Resources.

### 4.3 Footer

Five columns: **Product** (all feature pages, Pricing), **Platform** (Integrations, Developers, Security, WhatsApp Business Platform), **Solutions** (six industries), **Resources** (Guides index + 3 guides, About, Contact), **Legal** (Privacy, Terms, Data deletion, Acceptable use, Sitemap). Keep `BusinessIdentity`, `TRADEMARK_NOTICE`, and the email. Add the theme toggle.

---

## 5. Page-by-page spec

Copy voice: plain, specific, sentence case, no invented numbers, testimonials or customer logos (none exist). Every mockup uses sample Indian SMB data consistent across the site (one fictional workspace, e.g. a wellness store, so contacts, orders and flows reappear between screens).

### 5.1 Home `/`

| # | Section | Content direction | Mockup | CTA |
|---|---|---|---|---|
| 1 | **Hero** | Keep the single H1 pattern (eyebrow keyword phrase "WhatsApp CRM and marketing platform for Indian businesses" + headline). Headline direction: "Every customer conversation, connected." Sub: inbox, campaigns, flows, AI, store, bookings in one workspace. Three proof points kept from `Hero.tsx` | Full-width `AppShell` with `InboxScreen` (three panes, a live-arriving message, window ring, AI summary in the contact panel), centred below the copy, 1200px wide, slight bottom fade. On mobile swap to `PhoneChat` | Start free (`site.signupUrl`), Book a demo (`/contact`) |
| 2 | **Product tour** | "One workspace, eight sections" tabbed switcher that mirrors the CRM sidebar: Inbox, Contacts, Automation, Campaigns, Sales, AI, Analytics. Clicking a tab swaps the screen inside the same shell; the sidebar highlight moves | `ProductTour` (client) rendering `AppShell` + one of seven screens | "See all features" |
| 3 | **Channels** | WhatsApp Business Platform: Embedded Signup, several numbers, quality/tier health. Instagram block with "Coming soon" badge | `NumbersHealthCard` (number, quality chip, tier, name status) | Link to `/whatsapp-business-platform` |
| 4 | **Campaigns** | Segment → approved template → schedule → read/click/reply report → retarget | `BroadcastReportScreen` + `TemplatePhonePreview` | `/features/campaigns` |
| 5 | **Automation** | Visual flows with versioning and dry run; rules; forms | `FlowCanvasScreen` (trigger, message with buttons, condition, payment link, handoff) | `/features/automation` |
| 6 | **AI** | Agents that answer from your knowledge and hand off; assistant summaries and lead score for the team | `AiAgentsScreen` (agent cards, knowledge sources, activity row with "Handed off: low confidence") | `/features/ai-agent` |
| 7 | **Sell** | Catalogue → storefront link → Razorpay UPI → order → Shiprocket tracking; bookings with reminders | `OrdersScreen` beside `PhoneChat` with product card and payment link; small `BookingPagePreview` | `/features/commerce`, `/features/appointments` |
| 8 | **CRM and analytics** | Contact timeline, pipeline, dashboard | `DashboardScreen` (metric cards, conversations chart, donut) | `/features/crm-analytics` |
| 9 | **Integrations** | Logo-free tiles (name + lucide icon + status badge): Razorpay, Shiprocket, WooCommerce, Shopify, Meta catalogue, Webhooks, Zapier, Public API | `IntegrationsGrid` styled like Settings → Integrations cards with health badges | `/integrations`, `/developers` |
| 10 | **Trust and security** | Workspace isolation, roles, two-factor, audit log, export and deletion, consent/STOP handling, official Meta API | `AuditLogCard` + `RolesCard` | `/security` |
| 11 | **Industries** | Keep six industries from `content/industries.ts`, compact cards | none | `/solutions` |
| 12 | **Pricing teaser** | Four plan cards (see 5.5 for wording rules) | none | `/pricing` |
| 13 | **FAQ** | `homeFaqs` with corrections from 2.1; keep `faqPageJsonLd` | none | |
| 14 | **Final CTA** | "Connect your number and send your first message today" | Faded shell strip | Start free, Book a demo |

Keep `softwareApplicationJsonLd()` and `faqPageJsonLd(homeFaqs)` on the page. Drop `ProblemOutcome`, `HowItWorks`, `Outcomes` as separate sections or fold "How it works" (4 steps) into section 3.

### 5.2 `/features`

Hero (H1 + lead + CTAs) → sticky `FeatureSubNav` → eight alternating sections in sidebar order (Inbox, Contacts and CRM, Automation, Campaigns and templates, WhatsApp Forms, Sales: store/payments/appointments, AI, Analytics), each with the full bullet list from `content/features.ts`, a screen mockup, and a link to its page → "Platform" grid (numbers, team and roles, notifications, themes, API) → "Coming soon" band (Instagram, Ads) → CTA.

### 5.3 Feature pages (shared `PillarPage` template, restyled)

Template order: breadcrumbs → hero (H1, lead, CTAs, large screen mockup under the copy instead of beside it) → three "highlight" rows (heading, 2-3 sentences, focused mockup crop) → full capability checklist → "Works with" links to related pillars → FAQ (FAQPage JSON-LD) → CTA. Keep existing long-form `CopySection` text where still accurate; it carries the SEO keywords.

| Page | H1 direction | Hero mockup | Highlight mockups | Copy corrections |
|---|---|---|---|---|
| `team-inbox` | A shared WhatsApp inbox for your whole team | `InboxScreen` | `RoutingRulesCard`, `NotesAndMentions`, `HandoffBanner` (bot paused), `WindowRingRow` | Add SLA, saved views, masking, multi-number |
| `campaigns` | WhatsApp broadcasts with honest delivery reports | `BroadcastsListScreen` | `AudiencePicker` (segment/list/CSV), `TemplateEditorScreen` with phone preview, `BroadcastReportScreen` with clickers, `RetargetSegmentCard` | Add carousel/OTP/offer templates, library, test send, 90-day scheduling |
| `automation` | Build WhatsApp chatbot flows visually | `FlowCanvasScreen` | `StarterGallery`, `DryRunPanel`, `VersionHistoryDrawer`, `AutomationRulesList` | Add Simple builder, API request step, triggers list |
| `ai-agent` | AI agents that answer from your knowledge | `AiAgentsScreen` | `KnowledgeConsole`, `AiActivityLog`, `InboxAiSummaryPanel` (summary, suggested reply, lead score) | Remove the "add-on on Free/Basic" FAQ; say assistant features are switched on by an admin; decide on the "KHAGA" name (open question 5) |
| `commerce` | Sell on WhatsApp: catalogue, checkout, payments, shipping | `OrdersScreen` | `CatalogueScreen` (variants, stock), `StorefrontPhone` (cart + checkout), `PaymentsScreen` (settled/refunded), `ShipmentTrackingCard` | Move appointments to its own page; qualify Shopify per flag |
| `crm-analytics` | A WhatsApp CRM with pipelines and analytics | `ContactProfileScreen` | `SegmentsCards`, `PipelineBoard`, `DashboardScreen`, `ReportsCompare` | Add consent record, typed fields, lists, CTWA source |
| `appointments` (new) | Appointment booking on WhatsApp | `AppointmentsCalendarScreen` | `BookingPagePreview` (`BOOK <code>` confirmation), `ReminderChat` (24 h / 2 h), `ServicesTable` (price, duration, paid in advance) | SEO keyword "WhatsApp appointment booking" |
| `whatsapp-forms` (new) | WhatsApp Forms that save answers to the contact | `FormBuilderScreen` with phone preview | `FormResponsesTable`, `FormInFlowNode` | SEO keyword "WhatsApp Flows forms" |

### 5.4 New platform pages

- **`/integrations`**: hero → grid grouped Payments (Razorpay), Shipping (Shiprocket), Stores (WooCommerce, Shopify, Meta catalogue), Automation (Webhooks, Zapier recipes, Google Sheets badge per flag), Meetings (Zoom badge per flag), Ads (Meta Ads badge per flag) → "How connections stay healthy" (health badges, encrypted keys, verified webhooks) → CTA. Each tile: status badge "Available" or "Coming soon" driven by a `status` field in `content/integrations.ts`.
- **`/developers`**: hero → code panel mockup (`CodeBlock` with a `POST /api/v1/messages` curl example taken from `docs/public-api.md`) → endpoints table → scopes table → webhook events table + signature verification note → rate limits → "Use with AI assistants (MCP)" only if approved → CTA "Create an API key" (signup). No invented SDKs.
- **`/security`**: hero → six cards (tenant isolation with database row-level security, roles and permissions, two-factor sign-in with recovery codes, audit log with export, encrypted secrets and private media, session revocation) → Privacy controls (consent record, STOP/START, contact erase, workspace export, 30-day deletion grace) → Messaging compliance (official Cloud API, templates approved by Meta, 24-hour window enforced) → links to legal pages. Do not claim certifications (no SOC 2 / ISO anywhere in the code).

### 5.5 `/pricing`

Keep layout (billing switch, four cards, comparison table, FAQ, note). Content rules until the owner answers open question 3:
- Remove the "AI agent, store and payments: Add-on" row; replace with rows that exist in code: Store and payments (all plans), Appointments (all plans), Campaign scheduling and contact export (Basic+), API campaigns / click tracking / retargeting / workspace attributes (Pro+), Add-ons available (extra seats, AI message packs, extra WhatsApp numbers).
- GST wording must match whatever the app charges (the app shows GST-inclusive).
- Keep `PRICES_CONFIRMED = false` (no Offer prices in JSON-LD) until confirmed. If prices stay unconfirmed, show "From ₹…" only if the owner approves; otherwise "See current prices in the app" linking to `${site.appUrl}/pricing`.
- Fix the plan-change FAQ to describe self-serve upgrade and end-of-period downgrade.

### 5.6 Other pages

- `/solutions`: keep `IndustrySection` + `FlowSequence`, restyle; swap each industry visual to the most relevant screen mockup (retail → Orders, clinics → Appointments, education → Forms, real estate → Pipeline, services → Booking page, restaurants → Catalogue).
- `/whatsapp-business-platform`: content is written for Meta reviewers; restyle only, add `EmbeddedSignupCard` and `NumbersHealthCard` mockups.
- `/guides/*`, legal pages, `/about`, `/contact`, `/sitemap`, `not-found`: token rename and typography only. `ContactForm.tsx` behaviour unchanged.

---

## 6. Component plan

### 6.1 Keep / refactor / delete

| File | Action |
|---|---|
| `app/globals.css` | Rewrite tokens per section 3; keep base rules, skip-link, keyframes |
| `lib/fonts.ts` | Replace three fonts with Inter + Geist Mono |
| `lib/seo.ts`, `content/site.ts`, `content/company.ts`, `next.config.ts`, `app/robots.ts`, `app/sitemap.ts`, `scripts/indexnow.mjs` | Keep unchanged (only add nothing-breaking data) |
| `lib/og.tsx`, `components/brand/mark.ts`, `components/brand/Logo.tsx`, `app/icon.svg`, `app/apple-icon.tsx`, `app/logo.png/route.tsx`, `app/manifest.ts` | Refactor to new logo and palette |
| `components/ui/{Button,Badge,Section,Container,Eyebrow,Breadcrumbs,Prose,cx}` | Keep API; restyle (pill buttons, CRM badge tones). Keep 44px minimum hit targets on marketing buttons even though the CRM uses 32px |
| `components/layout/{Header,MobileMenu,Footer,NavLink,ThemeToggle,theme-script}` | Refactor for mega-menu and new footer |
| `components/home/{Hero,Sections,Spotlights,SectionHeading}` | Rewrite `Hero`; split `Sections.tsx` (395 lines) into one file per section under `components/home/`; delete `Spotlights.tsx` once sections 4-8 replace it |
| `components/features/PillarPage.tsx`, `FeatureSubNav.tsx` | Refactor layout, keep exports (`CopySection`, `FeatureFaqs`, `RelatedPillars`, `FeatureCta`) |
| `components/features/PillarMockups.tsx` (541 lines) | Delete after every usage moves to the new library |
| `components/mockups/{Chat,Frames,InboxList,StatRow,TemplateCard}` | `Chat.tsx` → refactor into `mockups/chat/`; `DeviceFrame` kept as `PhoneFrame`; `WindowFrame`, `InboxList`, `StatRow`, `TemplateCard` replaced |
| `components/pricing/*`, `components/solutions/*`, `components/legal/*`, `components/guides/*`, `components/company/*` | Keep, restyle via token rename |
| `content/features.ts` | Extend: add `appointments`, `whatsapp-forms` slugs; correct bullets; add `status` to coming-soon items |
| `content/pricing.ts`, `content/faqs.ts`, `content/nav.ts`, `content/seo.ts`, `public/llms.txt` | Update per sections 2 and 4 |

### 6.2 New files

Content and layout:
- `content/integrations.ts`, `content/developers.ts` (endpoints, scopes, events), `content/security.ts`, `content/demo.ts` (the shared sample workspace: contacts, conversations, orders, products, flows, agents)
- `components/layout/MegaMenu.tsx` (client)
- `components/home/{Hero,ProductTour,ChannelsSection,CampaignsSection,AutomationSection,AiSection,SellSection,CrmSection,IntegrationsSection,TrustSection,IndustriesSection,PricingTeaser,HomeFaq,FinalCta}.tsx`
- `components/marketing/{FeatureRow,IntegrationTile,CodeBlock,StatusBadge,BrowserStage}.tsx` (`BrowserStage` = the bordered, shadowed stage that holds an `AppShell` with responsive scaling)
- `app/features/appointments/{page,opengraph-image}.tsx`, `app/features/whatsapp-forms/{page,opengraph-image}.tsx`, `app/integrations/{page,opengraph-image}.tsx`, `app/developers/{page,opengraph-image}.tsx`, `app/security/{page,opengraph-image}.tsx`

Mockup library, `components/mockups/`:

| File | Mirrors CRM source |
|---|---|
| `shell/AppShell.tsx`, `shell/Sidebar.tsx`, `shell/TopBar.tsx`, `shell/SectionTabs.tsx` | `src/components/layout/{sidebar,header,section-tabs}.tsx`, `src/app/studio.css` |
| `primitives/{MCard,MBadge,MButton,MAvatar,MTable,MetricCard,Segmented,Switch,Input,WindowRing}.tsx` | `src/components/ui/*`, `src/components/dashboard/metric-card.tsx` |
| `primitives/charts/{BarChart,LineChart,Donut,Sparkline}.tsx` (inline SVG, no chart dependency) | `src/components/tremor/bar-chart.tsx`, `dashboard/{conversations-chart,pipeline-donut,response-time-chart}.tsx` |
| `chat/{Bubble,Thread,Composer,NoteBubble,SystemPill,ProductCard,PaymentLinkCard,ButtonsCard,ListCard,Ticks}.tsx` | `src/components/inbox/{message-bubble,message-thread,message-composer}.tsx`, `inbox.css` |
| `chat/PhoneFrame.tsx`, `chat/PhoneStage.tsx` | `.template-phone-stage` in `studio.css` |
| `screens/InboxScreen.tsx` | `src/components/inbox/{inbox-view,conversation-list,contact-sidebar,session-rail}.tsx` |
| `screens/ContactsScreen.tsx`, `ContactProfileScreen.tsx`, `SegmentsScreen.tsx` | `src/components/contacts/*` |
| `screens/PipelineBoard.tsx` | `src/components/pipelines/*` |
| `screens/BroadcastsListScreen.tsx`, `BroadcastReportScreen.tsx`, `TemplateEditorScreen.tsx` | `src/components/broadcasts/*`, `src/components/templates/*` |
| `screens/FormBuilderScreen.tsx` | `src/components/forms/*` |
| `screens/FlowCanvasScreen.tsx` (static positioned nodes + SVG bezier edges; do not add React Flow) | `src/components/flows/*`, `.flow-studio*` in `studio.css` |
| `screens/AutomationListScreen.tsx` | `src/components/automation/*` |
| `screens/AiAgentsScreen.tsx`, `KnowledgeConsole.tsx`, `AiActivityLog.tsx` | `src/components/agents/*`, `src/components/ai/*` |
| `screens/OrdersScreen.tsx`, `CatalogueScreen.tsx`, `PaymentsScreen.tsx`, `StorefrontPhone.tsx` | `src/components/commerce/*`, `src/components/storefront/*` |
| `screens/AppointmentsCalendarScreen.tsx`, `BookingPagePreview.tsx` | `src/components/appointments/*`, `src/components/booking-public/*` |
| `screens/DashboardScreen.tsx`, `AnalyticsScreen.tsx` | `src/components/dashboard/*`, `src/components/analytics/*` |
| `screens/IntegrationsGrid.tsx`, `AuditLogCard.tsx`, `RolesCard.tsx`, `NumbersHealthCard.tsx` | `src/components/settings/*` |
| `screens/InstagramPreview.tsx` (only inside the "Coming soon" band) | `src/components/instagram/*` |
| `index.ts` | barrel |

Mockup rules:
- Server components by default; only `ProductTour`, `MegaMenu`, the animated hero thread and the pricing switch are client components.
- Before building each screen, the builder opens the matching CRM component and `design-prototype/pages/<name>.css` to copy layout proportions, labels and class strings. Labels come from `BODHINOX_CHAT/messages/en.json` (e.g. `Sidebar.*`, `Dashboard.page.*`) so wording matches the product.
- Each screen is wrapped in `role="img"` with a descriptive `aria-label`, inner content `aria-hidden`, no focusable elements inside (existing convention in `Frames.tsx`).
- Fixed design width (1200 x 720 for full screens) scaled with CSS (`container-type: inline-size` + `transform: scale()` from a container query unit, or `zoom`) so text stays proportional; below 640px show a cropped single-pane variant or the phone view instead of an unreadable shrink.
- No `dark:` variant, no hex; tokens only. No external images; avatars are initials, product thumbnails are token-tinted blocks with a lucide icon.

---

## 7. Build order

Create a feature branch first (the repo is on its default branch with a clean tree).

**Phase 0: prepare**
1. Read the Next docs listed in section 0. Run `npm run typecheck`, `npm run lint`, `npm run build` to record a green baseline.
2. Get answers to open questions 1-3 (accent, logo, pricing); the rest can proceed in parallel.

**Phase 1: design system**
3. Token rename codemod (3.1), `text-muted` first. Verify with the grep in 3.1.
4. Rewrite `app/globals.css` tokens and `@theme`; update `lib/fonts.ts`, `app/layout.tsx` (font variables, `themeColor`), `app/manifest.ts`.
5. Restyle `components/ui/*`. Copy logo assets, refactor `Logo.tsx`, icons, `lib/og.tsx`, `mark.ts`.
6. Check: typecheck, lint, build; open every existing route in light and dark. Site should look like the CRM palette with unchanged content. Commit.

**Phase 2: mockup library**
7. `content/demo.ts`, primitives, charts, `AppShell`.
8. Screens in priority order: Inbox, Dashboard, FlowCanvas, BroadcastReport + TemplateEditor, AiAgents, Orders + Catalogue + StorefrontPhone, ContactProfile + Pipeline, Appointments + BookingPage, FormBuilder, Integrations/Audit/Roles/Numbers, Instagram preview.
9. Check each screen in isolation at 1440, 1024, 768, 390 px in both modes against the real CRM component. A temporary `/dev/mockups` route is fine while building but must be deleted (or `notFound()` in production and excluded from `routes`) before merge. Commit.

**Phase 3: navigation and home**
10. Mega-menu, mobile menu, footer; update `content/nav.ts`.
11. Rebuild home sections; keep the two JSON-LD blocks. Commit.

**Phase 4: feature pages**
12. Extend `content/features.ts`; refactor `PillarPage`; update six pages; add `appointments` and `whatsapp-forms`; rebuild `/features`. Delete `PillarMockups.tsx`, `Spotlights.tsx` and replaced mockup files once no imports remain.

**Phase 5: platform pages**
13. `/integrations`, `/developers`, `/security` with content files and OG images.

**Phase 6: pricing and copy accuracy**
14. Apply section 2.1 fixes to `content/pricing.ts`, `content/faqs.ts`, feature FAQs, `public/llms.txt`.
15. Restyle solutions, WhatsApp Business Platform, guides, legal, about, contact, sitemap, not-found.

**Phase 7: SEO and verification**
16. Add new routes to `routes` and `PAGE_DATES`; bump dates for changed pages; confirm `/sitemap.xml`, `/sitemap`, `/robots.txt`, canonical tags (www), `en-IN` alternates.
17. `npm run typecheck`, `npm run lint`, `npm run build` (build fails if a route lacks a date; confirm every page is still statically prerendered).
18. Browser check with `npm run start`: every route at desktop 1440 and mobile 390, light and dark; keyboard through the mega-menu; no horizontal scroll; no flash of wrong theme on reload; `prefers-reduced-motion` stops the hero animation.
19. View source on `/`, a feature page, `/pricing`, a guide: confirm Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList, Article JSON-LD still render and FAQ text matches the visible text. Open `/opengraph-image` for home, one feature, one new page.
20. Confirm the email `udaykumar@bodhinox.com`, the IndexNow key file, the Vercel-host noindex header and the bare-domain redirect are untouched (`git diff` on `content/site.ts`, `content/company.ts`, `next.config.ts`, `public/*.txt`).
21. After deploy (owner's action): `npm run indexnow`, resubmit the sitemap in Search Console.

Risks to watch:
- `ImageResponse` and webp: use PNG for OG/icon assets.
- Scaled mockups can blur text with `transform: scale`; test on a 1x display and prefer `zoom` or sizing in container units if blurry.
- The hero shell is large DOM; keep it a server component and keep LCP on the H1 (the mockup is not an image, so text is the LCP element).
- `eslint-config-next` is 16.3.8 with a hooks-plugin override; avoid patterns that the React Compiler lint rules reject (the site already uses `useSyncExternalStore` in `ThemeToggle.tsx`; follow that for any new client state tied to the DOM).

---

## 8. Open questions for the owner

1. **Accent colour.** The CRM default is blue `#0071e3`; the logo is orange and the current site is copper. Recommended: blue, so the site matches what a new user sees on first sign-in, with orange reserved for the logo. Alternative: copper (also a built-in CRM accent). Which one?
2. **Logo.** Replace the website's two-bubble mark with the CRM's sunflower logo everywhere (header, favicon, OG images, `/logo.png` used in structured data)?
3. **Pricing.** What are the live plan prices and limits in the platform console, are they GST-inclusive (as the app's pricing page states), is yearly really "2 months free", and what does Enterprise include? Until answered the plan keeps sample prices out of structured data and removes the incorrect "add-on" rows.
4. **App URL.** Should "Start free" / "Sign in" go to `https://bodhinox-web-production.up.railway.app` or is `app.bodhinoxconnect.in` being set up? Is `NEXT_PUBLIC_APP_URL` set in Vercel today?
5. **AI name.** The app calls its AI "KHAGA". Use that name publicly or keep "AI agent"?
6. **MCP.** The bundled MCP server is the upstream `wacrm-mcp` npm package under another author's name. Mention MCP on `/developers` now, wait for a Bodhinox-branded package, or leave it out?
7. **Production flags.** Which of these are live for customers: Instagram, Meta Ads reporting, Ad creation, Zoom, Google Sheets, Shopify app, Google sign-in? The plan treats all as "Coming soon" or omitted.
8. **Anything to keep private?** For example the platform's internal architecture details on `/security`, or the Ayurvedic store starter journey.
9. **Company identity.** `content/company.ts` still has empty legal name, address and phone. Fill in during this redesign or leave?

---

### Critical Files for Implementation
- C:\Users\uday\Desktop\bodhinox-connect\app\globals.css
- C:\Users\uday\Desktop\bodhinox-connect\content\features.ts (with `content/nav.ts`, `content/seo.ts`, `content/pricing.ts` alongside)
- C:\Users\uday\Desktop\bodhinox-connect\components\features\PillarPage.tsx
- C:\Users\uday\Desktop\BODHINOX_CHAT\src\app\globals.css (with `src/app/studio.css` and `src/components/inbox/inbox.css` as the theme source)
- C:\Users\uday\Desktop\BODHINOX_CHAT\docs\architecture\bodhinox-functionality.md (feature truth; pair with `docs/release/feature-flags.md` and `src/components/layout/sidebar.tsx`)
---

# Owner decisions (2026-11-22)

1. **Accent:** CRM blue (`#0071e3` / dark `#2997ff`); orange only in the logo. Use the sunburst logo.
2. **App URL:** keep `https://app.bodhinoxconnect.in` for Start free / Sign in (owner will point the domain at the CRM).
3. **Pricing:** estimate real pricing from the CRM's features plus Indian market research; offer monthly, quarterly and yearly billing. (See pricing section, to be added.)
4. **Live features (show as live, with full pages):** Instagram automation, Meta Ads, Shopify, WooCommerce, Appointment booking. Before building, walk the live dashboard and confirm every feature.

---

# Live CRM audit (walked the signed-in dashboard, 2026-11-22)

Production is newer than the local BODHINOX_CHAT checkout. Confirmed live:

**Sidebar:** Home · Inbox · Contacts | *Grow*: Automation, Campaigns, AI | *Sell*: Sales, Products, Store | *Insights*: Analytics | Settings · Collapse · account ("Uday's workspace"). Top bar: breadcrumb, search, bell, theme toggle.

| Area | Live sub-tabs / facts |
|---|---|
| Home (dashboard) | "Next moves" checklist; KPI tiles: Active Conversations, New Contacts Today, Open Deals Value (₹), Messages Sent Today, Revenue today, Bookings today, Ad spend 7 days, AI handled today; quick actions (New Contact / deal / Broadcast / Automation, Instagram home); "Meet KHAGA" AI banner; Operations: WhatsApp number health (quality, 2000/day limit), waiting/over-target/unassigned/session-closing/failed counters, reply queue, team replies table with median response, pipeline results, campaign health, latest broadcast, workspace setup, conversations-over-time chart, pipeline value donut |
| Inbox | Views, filter, saved views, Select, new message; channel chips **All / WhatsApp / Instagram**; Active / Requesting / Intervened; window ring; labels (Requesting, Bot, Assigned, Resolved) |
| Contacts | People, Segments, Custom fields |
| Automation | Tabs Automation / **Instagram tools**; list All/Flows/Rules/Sequences; channel filter All/WhatsApp/Instagram; trigger column; runs, CTR, live toggle. Instagram tools: Instagram home (Auto-DM links from comments, Grow followers from comments, Leads from story replies), My automations, Basics (default reply, conversation starters, main menu, story mention reply), Sequences, ref links, AI comment replies |
| Campaigns | Broadcasts, Templates, **Ads**, Forms. Broadcast list with quality, daily limit, columns Audience/Sent/Delivered/Read/Replied/Orders/Revenue. Ads: setup checklist (connect Meta, ad account, Facebook Page, ad creation), Overview/Campaigns/Audiences/Leads/Automation, spend, reach, impressions, CTR, conversations started, cost per conversation, leads, link clicks, "From ad to customer", "Create a click-to-WhatsApp ad" |
| AI | Agents (cards: channels WhatsApp+Instagram, always on, conversations handled, % solved without a person, Test agent), Knowledge, Assistant features, Setup, Activity. Brand name **KHAGA** used in app |
| Sales | Pipelines (New Lead → Qualified → Proposal Sent → Negotiation → Won), Appointments (Schedule/Services/Team/Settings, Today/Week/List, practitioner/location filters, needs outcome, tasks), Orders, Payments |
| Products | Catalogue (Products, Categories, Collections, Stock, Meta catalogue link; grid with price, stock, live toggle), WhatsApp sync |
| Store | **Full online store builder**: Online store, Reviews, Store settings, Shop reports. Public shop at /s/<name>, QR code, theme editor (template, brand, home sections, menu, footer, pages, phone/desktop preview), order via WhatsApp OTP code or WhatsApp chat, visibility open/password/coming soon, redirects |
| Analytics | Overview, Conversations, Team, Campaign results, Reports. New/resolved chart, median first reply, resolution time, needs attention, channel split, busiest hours heatmap, commerce revenue, AI agent (handed to person, unanswered questions), AI insights |
| Settings | Profile, Login & security, Notifications, Appearance, Privacy & access, Workspace, Channels, Team members, Inbox, Media library, Quick replies, Fields & tags, Conversion events, Deals & currency, AI assistant, Plan & usage, Integrations, Ads, API & webhooks, Audit log |
| Integrations | Shopify (orders, abandoned carts), WooCommerce, Razorpay, Zoom, Shiprocket, Google Sheets, Webhooks; integration health panel (WhatsApp, Instagram, Meta Ads) |

Owner says live for marketing: Instagram automation, Meta Ads, Shopify, WooCommerce, Appointments. (Zoom shows "not available on this deployment" — keep as coming soon. Google Sheets shows Manage — treat as live.)

Never use real customer names/numbers from the live app in mockups; use fictional sample data.

---

# Final amendments (override earlier sections where they conflict)

- **Colors:** CRM blue primary, Apple-style neutrals; orange only in the sunburst logo and KHAGA mark. Use the CRM's sunburst logo everywhere (header, favicon, OG, /logo.png).
- **App shell mockups** mirror the live sidebar: Home · Inbox · Contacts | Grow: Automation, Campaigns, AI | Sell: Sales, Products, Store | Insights: Analytics | Settings.
- **Hero:** opens on the live-style Home dashboard (KPI tiles, Next moves, Open inbox); the product tour's second tab is Inbox. Mockups use fictional sample data only.
- **Mega-menu:** Engage (Team inbox, Contacts and segments, WhatsApp Forms, Instagram) · Grow (Flows and automation, Campaigns and templates, Meta Ads, AI agents) · Sell (Sales pipelines, Products and online store, Appointments, Analytics) · Platform strip (Integrations, Developers, Security).
- **Live features with full pages:** `/features/instagram`, `/features/ads` (click-to-WhatsApp ads), `/features/appointments`, `/features/whatsapp-forms`; Shopify, WooCommerce, Google Sheets, Razorpay, Shiprocket, Webhooks are "Available" on `/integrations`; Zoom stays "Coming soon".
- **Commerce page** must show the full online store builder (public shop link + QR, theme editor, reviews, shop reports, WhatsApp-code ordering, visibility modes), not just a storefront link.
- **AI name:** call it "KHAGA AI" publicly alongside "AI agents" (matches the app).
- **MCP:** leave off `/developers` for now.
- **CTAs:** for now every "Start free" and "Sign in" button links to `/contact` (owner decision 2026-11-22). Keep `site.signupUrl` / sign-in URL as single constants so they can be switched to the app later.
- **Pricing:** being re-researched from scratch; `docs/pricing-strategy.md` will be replaced once the owner locks it.
