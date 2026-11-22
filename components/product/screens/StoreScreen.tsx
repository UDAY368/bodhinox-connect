import {
  ArrowRight,
  Bath,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  Droplet,
  ExternalLink,
  Flower2,
  Gift,
  Globe,
  Leaf,
  Lock,
  Menu,
  Palette,
  Pill,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  User,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType } from "react";
import { cx } from "@/components/ui/cx";
import { demoWorkspace } from "@/content/demo";
import { AppShell } from "../AppShell";
import { PhoneFrame } from "../Phone";
import { MBadge, MButton, MCard, MCardHeader, PageTitle, Segmented, Switch, WaIcon } from "../primitives";

/*
 * Store › Online store, as on the live CRM: setup checklist, shop address with
 * QR code, theme editor entry, how buyers order and who can see the shop.
 * Plus two views of the public shop it publishes (phone and desktop).
 */

const setupSteps = [
  "Fill in store settings (currency and tax)",
  "Publish your first product with a price",
  "Pick a template and save",
  "Connect Razorpay or turn on cash on delivery",
  "Add a shipping rate",
  "Turn on checkout in store settings",
  "Choose how buyers order (WhatsApp code or WhatsApp chat)",
  "Publish the shop",
];

const shopPath = "/s/naturals";

type ShopItem = { name: string; price: string; compareAt?: string; tone: 1 | 2 | 3 | 4 | 5; icon: LucideIcon; rating?: string };

const shopItems: ShopItem[] = [
  { name: "Kumkumadi Face Oil", price: "₹1,250", compareAt: "₹1,490", tone: 4, icon: Sparkles, rating: "4.8" },
  { name: "Bhringraj Hair Oil", price: "₹540", tone: 3, icon: Droplet, rating: "4.7" },
  { name: "Ashwagandha Capsules", price: "₹699", tone: 2, icon: Pill, rating: "4.9" },
  { name: "Rose Water Toner", price: "₹390", tone: 5, icon: Flower2, rating: "4.6" },
  { name: "Neem & Tulsi Face Wash", price: "₹320", tone: 2, icon: Leaf, rating: "4.5" },
  { name: "Diwali Glow Kit", price: "₹2,190", compareAt: "₹2,640", tone: 3, icon: Gift, rating: "4.9" },
  { name: "Sandalwood Bath Bar", price: "₹180", tone: 1, icon: Bath, rating: "4.4" },
  { name: "Brahmi Hair Serum", price: "₹620", compareAt: "₹720", tone: 1, icon: Droplet, rating: "4.6" },
];

const tileTone = {
  1: "bg-primary-soft text-primary",
  2: "bg-[color-mix(in_oklab,var(--chart-3)_16%,transparent)] text-success",
  3: "bg-[color-mix(in_oklab,var(--chart-4)_18%,transparent)] text-warning",
  4: "bg-[color-mix(in_oklab,var(--chart-5)_14%,transparent)] text-chart-5",
  5: "bg-[color-mix(in_oklab,var(--ig)_12%,transparent)] text-ig",
} as const;

/** A deterministic, QR-looking pattern (decorative, not scannable). */
function QrPattern({ size = 112 }: { size?: number }) {
  const n = 25;
  const cells: [number, number][] = [];
  const finder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (finder(x, y)) continue;
      if ((x * 7 + y * 13 + ((x * y) % 5)) % 3 === 0 || (x + y * 3) % 7 === 1) cells.push([x, y]);
    }
  }
  const eye = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x + 0.5} y={y + 0.5} width={6} height={6} fill="none" stroke="currentColor" strokeWidth={1} />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill="currentColor" />
    </g>
  );
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} width={size} height={size} className="text-foreground" aria-hidden>
      <rect x={-1} y={-1} width={n + 2} height={n + 2} rx={1.5} className="fill-card" />
      {cells.map(([x, y]) => (
        <rect key={`${x}.${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
      ))}
      {eye(0, 0)}
      {eye(n - 7, 0)}
      {eye(0, n - 7)}
    </svg>
  );
}

function Radio({ on }: { on?: boolean }) {
  return (
    <span className={cx("mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full border", on ? "border-primary" : "border-input")}>
      {on ? <span className="size-2 rounded-full bg-primary" /> : null}
    </span>
  );
}

function OptionRow({ on, icon: Icon, title, sub }: { on?: boolean; icon: ComponentType<{ className?: string }>; title: string; sub: string }) {
  return (
    <div className={cx("flex gap-2.5 rounded-xl border px-3 py-2.5", on ? "border-primary bg-primary-soft/60" : "border-border")}>
      <Radio on={on} />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-foreground">
          <Icon className="size-3.5 text-muted-foreground" /> {title}
        </p>
        <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

/** Store › Online store settings page. */
export function StoreScreen({ height = 880 }: { height?: number }) {
  return (
    <AppShell active="store" crumbs={["Store", "Online store"]} height={height}>
      <div className="flex flex-col gap-4">
        <Segmented items={["Online store", "Reviews", "Store settings", "Shop reports"]} />
        <PageTitle
          title="Online store"
          sub="Your public shop that anyone can open, with a ready-made template."
          right={
            <span className="flex items-center gap-2">
              <MBadge tone="success">
                <span className="size-1.5 rounded-full bg-success" /> Published
              </MBadge>
              <MButton icon={ExternalLink}>Open shop</MButton>
            </span>
          }
        />

        <div className="grid grid-cols-[1.08fr_1fr] gap-3">
          <div className="flex flex-col gap-3">
            <MCard>
              <MCardHeader title="Store setup" sub="Everything buyers need to find, pay and get their order." right={<MBadge tone="success">8 of 8 done</MBadge>} />
              <div className="px-4 pt-3">
                <span className="block h-1.5 overflow-hidden rounded-full bg-muted">
                  <span className="block h-full w-full rounded-full bg-primary" />
                </span>
              </div>
              <ul className="grid grid-cols-1 gap-1.5 px-4 pt-3 pb-4 text-[12.5px]">
                {setupSteps.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground line-through decoration-muted-foreground/40">{s}</span>
                  </li>
                ))}
              </ul>
            </MCard>

            <MCard className="p-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Palette className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-foreground">Look and pages</p>
                  <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">
                    Template, brand, home page sections, menu, footer and store pages. Edit a draft, preview it on phone and desktop, then publish.
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <MBadge tone="neutral">Template: Botanica</MBadge>
                    <MBadge tone="outline">7 home sections</MBadge>
                    <MBadge tone="outline">Draft saved 2h ago</MBadge>
                  </div>
                </div>
                <MButton variant="outline">Edit theme</MButton>
              </div>
            </MCard>

            <MCard>
              <MCardHeader title="How buyers order" sub="Every checkout ends on WhatsApp, so the order lands in your inbox." />
              <div className="flex flex-col gap-2 px-4 pt-3 pb-4">
                <OptionRow
                  on
                  icon={ShieldCheck}
                  title="Confirm WhatsApp number with a code"
                  sub="Buyers pay on the shop, then send a 4-digit code on WhatsApp to confirm the order."
                />
                <OptionRow icon={WaIcon} title="Send cart on WhatsApp" sub="Buyers send their cart as a message and you share a payment link in the chat." />
              </div>
            </MCard>
          </div>

          <div className="flex flex-col gap-3">
            <MCard>
              <MCardHeader title="Shop address" sub="Share it in your bio, on stickers and in broadcasts." />
              <div className="flex gap-4 px-4 pt-3 pb-4">
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex h-9 items-center overflow-hidden rounded-xl border border-border text-[13px]">
                    <span className="flex h-full items-center border-r border-border bg-card-2 px-2.5 text-muted-foreground">prakriti.shop/s/</span>
                    <span className="flex-1 truncate px-2.5 font-medium text-foreground">naturals</span>
                    <span className="flex h-full items-center border-l border-border px-2.5 text-muted-foreground">
                      <Copy className="size-3.5" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-2.5">
                    <div>
                      <p className="text-[12.5px] font-semibold text-foreground">Published</p>
                      <p className="text-[11.5px] text-muted-foreground">Anyone can open the shop</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center gap-2">
                    <MButton variant="outline" icon={Copy}>
                      Copy link
                    </MButton>
                    <MButton variant="outline">
                      <WaIcon className="size-3.5" /> Share
                    </MButton>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="rounded-xl border border-border p-2">
                    <QrPattern size={104} />
                  </span>
                  <span className="flex items-center gap-1 text-[11.5px] font-medium text-primary">
                    <Download className="size-3" /> Download QR code
                  </span>
                </div>
              </div>
            </MCard>

            <MCard>
              <MCardHeader title="Who can see the shop" />
              <div className="flex flex-col gap-2 px-4 pt-3 pb-4">
                <OptionRow on icon={Globe} title="Open to everyone" sub="Anyone with the link can browse and buy." />
                <OptionRow icon={Lock} title="Password protected" sub="Only people with the password can open it." />
                <OptionRow icon={Clock} title="Coming soon" sub="Show a launch page and collect WhatsApp numbers." />
              </div>
            </MCard>

            <MCard className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-foreground">Redirects</p>
                <MBadge tone="neutral">2 active</MBadge>
              </div>
              <ul className="mt-2 flex flex-col gap-1.5 text-[12px]">
                {[
                  ["/diwali", "/collections/diwali-glow"],
                  ["/oil", "/products/kumkumadi-face-oil"],
                ].map(([from, to]) => (
                  <li key={from} className="flex items-center gap-2 font-mono text-[11.5px] text-muted-foreground">
                    <span className="text-foreground">{from}</span>
                    <ArrowRight className="size-3" />
                    <span className="truncate">{to}</span>
                  </li>
                ))}
              </ul>
            </MCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ShopCard({ p, compact }: { p: ShopItem; compact?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className={cx("relative flex items-center justify-center", tileTone[p.tone], compact ? "h-[74px]" : "h-[96px]")}>
        <p.icon className={compact ? "size-7" : "size-8"} strokeWidth={1.6} />
        {p.compareAt ? (
          <span className="absolute top-1.5 left-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold text-primary-foreground">Sale</span>
        ) : null}
      </div>
      <div className={compact ? "px-2 py-1.5" : "px-2.5 py-2"}>
        <p className={cx("truncate font-medium text-foreground", compact ? "text-[11px]" : "text-[12.5px]")}>{p.name}</p>
        <p className={cx("font-semibold text-foreground tabular-nums", compact ? "text-[11.5px]" : "text-[13px]")}>
          {p.price}
          {p.compareAt ? <span className="ml-1 text-[10px] font-normal text-muted-foreground line-through">{p.compareAt}</span> : null}
        </p>
        {!compact && p.rating ? (
          <p className="mt-0.5 flex items-center gap-1 text-[10.5px] text-muted-foreground">
            <Star className="size-3 fill-current text-warning" /> {p.rating}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** The public shop on a phone (customer view). */
export function StorefrontPhone({ height = 560 }: { height?: number }) {
  return (
    <PhoneFrame title={demoWorkspace.name} channel="web" height={height}>
      <div className="-mx-3 -mt-3 flex items-center gap-1.5 border-b border-border bg-card px-3 py-1.5">
        <Lock className="size-2.5 text-muted-foreground" />
        <span className="flex-1 truncate text-center text-[10px] text-muted-foreground">prakriti.shop{shopPath}</span>
      </div>
      <div className="flex items-center justify-between">
        <Menu className="size-4 text-foreground" />
        <span className="flex items-center gap-1.5 text-[13px] font-bold tracking-[-0.01em] text-foreground">
          <Leaf className="size-3.5 text-success" /> Prakriti Naturals
        </span>
        <span className="relative">
          <ShoppingBag className="size-4 text-foreground" />
          <span className="absolute -top-1 -right-1.5 inline-flex size-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">2</span>
        </span>
      </div>
      <div className="relative overflow-hidden rounded-xl bg-[color-mix(in_oklab,var(--chart-4)_20%,var(--card))] px-3 py-3">
        <p className="text-[9.5px] font-semibold tracking-[0.08em] text-warning uppercase">Diwali glow sale</p>
        <p className="mt-0.5 max-w-[150px] text-[15px] leading-tight font-bold text-foreground">Up to 20% off skin care rituals</p>
        <span className="mt-2 inline-flex h-6 items-center rounded-full bg-foreground px-2.5 text-[10.5px] font-semibold text-background">Shop now</span>
        <Sparkles className="absolute top-3 right-3 size-14 text-warning/60" strokeWidth={1.2} />
      </div>
      <div className="flex gap-1.5 text-[10.5px] font-medium">
        {["All", "Skin care", "Hair care", "Wellness"].map((c, i) => (
          <span key={c} className={cx("rounded-full px-2.5 py-1", i === 0 ? "bg-foreground text-background" : "bg-muted text-muted-foreground")}>
            {c}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {shopItems.slice(0, 4).map((p) => (
          <ShopCard key={p.name} p={p} compact />
        ))}
      </div>
      <div className="mt-auto flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-wa text-[12.5px] font-semibold text-white">
        <WaIcon className="size-4" /> Order on WhatsApp · ₹1,790
      </div>
    </PhoneFrame>
  );
}

/** The public shop home page in a desktop browser frame (~900 x 560). */
export function StoreDesktopPreview({ width = 900, height = 560 }: { width?: number; height?: number }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background text-left shadow-sheet" style={{ width, height }}>
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-border bg-card-2 px-4">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-input" />
          <span className="size-2.5 rounded-full bg-input" />
          <span className="size-2.5 rounded-full bg-input" />
        </span>
        <span className="mx-auto flex h-6 w-[360px] items-center justify-center gap-1.5 rounded-md bg-card text-[11px] text-muted-foreground ring-1 ring-border">
          <Lock className="size-3" /> prakriti.shop{shopPath}
        </span>
        <span className="w-[42px]" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-card">
        <div className="bg-foreground py-1 text-center text-[10.5px] font-medium text-background">
          Free shipping above ₹999 · Cash on delivery available · Order on WhatsApp
        </div>
        <div className="flex h-12 shrink-0 items-center gap-6 border-b border-border px-8">
          <span className="flex items-center gap-1.5 text-[15px] font-bold tracking-[-0.01em] text-foreground">
            <Leaf className="size-4 text-success" /> Prakriti Naturals
          </span>
          <span className="flex gap-5 text-[12px] font-medium text-muted-foreground">
            <span className="text-foreground">Shop all</span>
            <span>Skin care</span>
            <span>Hair care</span>
            <span>Wellness</span>
            <span>Gift sets</span>
            <span>Book a consult</span>
          </span>
          <span className="ml-auto flex items-center gap-3.5 text-foreground">
            <Search className="size-4" />
            <User className="size-4" />
            <span className="relative">
              <ShoppingBag className="size-4" />
              <span className="absolute -top-1 -right-1.5 inline-flex size-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">2</span>
            </span>
          </span>
        </div>

        <div className="grid grid-cols-[1.1fr_1fr] gap-0 border-b border-border">
          <div className="flex flex-col justify-center px-8 py-6">
            <p className="text-[10.5px] font-semibold tracking-[0.1em] text-warning uppercase">Diwali glow sale · Ends Sunday</p>
            <p className="mt-1.5 text-[28px] leading-[1.1] font-bold tracking-[-0.025em] text-foreground">
              Ayurvedic rituals for
              <br />
              skin that glows
            </p>
            <p className="mt-2 max-w-[340px] text-[12.5px] leading-snug text-muted-foreground">
              Small-batch oils and herbs from Bengaluru. Up to 20% off kits, with a free consultation on orders above ₹1,500.
            </p>
            <span className="mt-4 flex items-center gap-2">
              <MButton>Shop the sale</MButton>
              <MButton variant="outline">
                <WaIcon className="size-3.5" /> Ask on WhatsApp
              </MButton>
            </span>
          </div>
          <div className="relative flex items-center justify-center gap-3 bg-[color-mix(in_oklab,var(--chart-4)_18%,var(--card))]">
            {[Sparkles, Gift, Flower2].map((Icon, i) => (
              <span
                key={i}
                className={cx(
                  "inline-flex items-center justify-center rounded-2xl bg-card shadow-soft",
                  i === 1 ? "size-28 text-warning" : "size-20 text-chart-5",
                )}
              >
                <Icon className={i === 1 ? "size-12" : "size-8"} strokeWidth={1.4} />
              </span>
            ))}
            <span className="absolute right-4 bottom-3 flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-[10.5px] font-medium text-foreground shadow-sm">
              <Star className="size-3 fill-current text-warning" /> 4.8 from 2,140 reviews
            </span>
          </div>
        </div>

        <div className="px-8 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-foreground">Shop by concern</p>
            <span className="flex items-center gap-1 text-[11.5px] font-medium text-primary">
              All collections <ArrowRight className="size-3" />
            </span>
          </div>
          <div className="mt-2.5 grid grid-cols-4 gap-3">
            {[
              { label: "Glow & radiance", count: "12 products", tone: 4 as const, icon: Sparkles },
              { label: "Hair fall care", count: "8 products", tone: 3 as const, icon: Droplet },
              { label: "Stress & sleep", count: "6 products", tone: 2 as const, icon: Leaf },
              { label: "Gifting", count: "5 kits", tone: 5 as const, icon: Gift },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-2.5 rounded-xl border border-border p-2">
                <span className={cx("inline-flex size-10 items-center justify-center rounded-lg", tileTone[c.tone])}>
                  <c.icon className="size-5" strokeWidth={1.7} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[12px] font-semibold text-foreground">{c.label}</span>
                  <span className="block text-[10.5px] text-muted-foreground">{c.count}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-foreground">Bestsellers</p>
            <span className="flex items-center gap-3 text-[10.5px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Truck className="size-3" /> Ships in 24h
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3" /> Secure payment by Razorpay
              </span>
            </span>
          </div>
          <div className="mt-2.5 grid grid-cols-5 gap-3">
            {shopItems.slice(0, 5).map((p) => (
              <ShopCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
