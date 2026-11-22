import {
  Bath,
  ChevronDown,
  Droplet,
  Droplets,
  FlaskConical,
  Flower2,
  Gift,
  LayoutGrid,
  Leaf,
  List,
  Pill,
  Plus,
  Sparkles,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { cx } from "@/components/ui/cx";
import { AppShell } from "../AppShell";
import { Chips, MBadge, MButton, PageTitle, SearchField, Segmented, Switch, TabRow, WaIcon } from "../primitives";

/*
 * Products › Catalogue, as on the live CRM (catalogue-admin.tsx): section tabs,
 * page title, Products / Categories / Collections / Stock / Meta catalogue link,
 * category chips, filters and the product card grid.
 */

type CatalogueItem = {
  name: string;
  sku: string;
  variants: number;
  price: string;
  compareAt?: string;
  stock: number;
  live: boolean;
  tone: 1 | 2 | 3 | 4 | 5;
  icon: LucideIcon;
  synced?: boolean;
};

const catalogue: CatalogueItem[] = [
  { name: "Kumkumadi Face Oil", sku: "PN-SK-001", variants: 2, price: "₹1,250", compareAt: "₹1,490", stock: 42, live: true, tone: 4, icon: Sparkles, synced: true },
  { name: "Bhringraj Hair Oil", sku: "PN-HC-004", variants: 3, price: "₹540", stock: 118, live: true, tone: 3, icon: Droplet, synced: true },
  { name: "Ashwagandha Capsules", sku: "PN-WL-002", variants: 2, price: "₹699", stock: 8, live: true, tone: 2, icon: Pill, synced: true },
  { name: "Neem & Tulsi Face Wash", sku: "PN-SK-007", variants: 1, price: "₹320", stock: 64, live: true, tone: 2, icon: Leaf, synced: true },
  { name: "Rose Water Toner", sku: "PN-SK-003", variants: 2, price: "₹390", stock: 37, live: true, tone: 5, icon: Flower2, synced: true },
  { name: "Brahmi Hair Serum", sku: "PN-HC-006", variants: 1, price: "₹620", compareAt: "₹720", stock: 5, live: true, tone: 1, icon: FlaskConical },
  { name: "Diwali Glow Kit", sku: "PN-GS-010", variants: 1, price: "₹2,190", compareAt: "₹2,640", stock: 26, live: true, tone: 3, icon: Gift, synced: true },
  { name: "Triphala Churna", sku: "PN-WL-005", variants: 2, price: "₹280", stock: 0, live: false, tone: 2, icon: Sprout },
  { name: "Ubtan Face Pack", sku: "PN-SK-009", variants: 1, price: "₹450", stock: 51, live: true, tone: 4, icon: Droplets },
  { name: "Sandalwood Bath Bar", sku: "PN-BB-011", variants: 3, price: "₹180", stock: 0, live: true, tone: 1, icon: Bath },
];

function StockLine({ stock }: { stock: number }) {
  if (stock === 0) return <span className="text-destructive">Out of stock</span>;
  if (stock < 10) return <span className="text-warning">{stock} on hand · Low</span>;
  return <span className="text-muted-foreground">{stock} on hand</span>;
}

function ProductCard({ p }: { p: CatalogueItem }) {
  const tile = {
    1: "bg-primary-soft text-primary",
    2: "bg-[color-mix(in_oklab,var(--chart-3)_16%,transparent)] text-success",
    3: "bg-[color-mix(in_oklab,var(--chart-4)_18%,transparent)] text-warning",
    4: "bg-[color-mix(in_oklab,var(--chart-5)_14%,transparent)] text-chart-5",
    5: "bg-[color-mix(in_oklab,var(--ig)_12%,transparent)] text-ig",
  }[p.tone];
  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className={cx("relative flex h-[88px] items-center justify-center", tile, !p.live && "opacity-60")}>
        <p.icon className="size-8" strokeWidth={1.6} />
        {p.compareAt ? (
          <span className="absolute top-2 left-2">
            <MBadge tone="solid">Sale</MBadge>
          </span>
        ) : null}
        {p.synced ? (
          <span className="absolute top-2 right-2 inline-flex size-5 items-center justify-center rounded-full bg-card text-wa shadow-sm">
            <WaIcon className="size-3" strokeWidth={2.2} />
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-0.5 px-3 pt-2.5 pb-2">
        <p className="truncate text-[13px] font-semibold text-foreground">{p.name}</p>
        <p className="truncate text-[11px] text-muted-foreground">
          {p.variants} {p.variants === 1 ? "variant" : "variants"} · {p.sku}
        </p>
        <p className="mt-1 text-[14px] font-semibold text-foreground tabular-nums">
          {p.price}
          {p.compareAt ? <span className="ml-1.5 text-[11px] font-normal text-muted-foreground line-through">{p.compareAt}</span> : null}
        </p>
        <p className="text-[11px] tabular-nums">
          <StockLine stock={p.stock} />
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-border px-3 py-2 text-[11.5px] font-medium">
        <span className={p.live ? "text-foreground" : "text-muted-foreground"}>{p.live ? "Live" : "Hidden"}</span>
        <Switch on={p.live} />
      </div>
    </div>
  );
}

function FilterSelect({ label }: { label: string }) {
  return (
    <span className="flex h-9 items-center gap-2 rounded-xl border border-border bg-card px-3 text-[13px] text-foreground shadow-[0_1px_2px_#0000000a]">
      {label}
      <ChevronDown className="size-3.5 text-muted-foreground" />
    </span>
  );
}

/** Products › Catalogue: the product grid customers buy from. */
export function ProductsScreen({ height = 840 }: { height?: number }) {
  return (
    <AppShell active="products" crumbs={["Products", "Catalogue"]} height={height}>
      <div className="flex flex-col gap-4">
        <Segmented items={["Catalogue", "WhatsApp sync"]} />
        <PageTitle
          title="Catalogue"
          sub="The products you sell through storefront links and checkout. Prices, tax and stock here are what customers are charged."
          right={<MButton icon={Plus}>Add product</MButton>}
        />
        <TabRow items={["Products", "Categories", "Collections", "Stock", "Meta catalogue link"]} />

        <div className="flex items-center justify-between gap-3">
          <Chips
            items={[
              { label: "All", count: 13 },
              { label: "Skin care", count: 4 },
              { label: "Hair care", count: 3 },
              { label: "Wellness", count: 3 },
              { label: "Gift sets", count: 2 },
              { label: "Bath & body", count: 1 },
            ]}
          />
          <span className="text-[12px] text-muted-foreground">
            11 live · 2 hidden · <span className="text-warning">2 low stock</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <SearchField placeholder="Search by name or SKU" className="w-[300px]" />
          <FilterSelect label="Live and hidden" />
          <FilterSelect label="Any stock" />
          <span className="ml-auto inline-flex items-center gap-0.5 rounded-xl bg-muted p-[3px]">
            <span className="inline-flex size-8 items-center justify-center rounded-[9px] bg-tab-active text-foreground shadow-[0_1px_3px_rgb(0_0_0/0.12)]">
              <LayoutGrid className="size-4" />
            </span>
            <span className="inline-flex size-8 items-center justify-center rounded-[9px] text-muted-foreground">
              <List className="size-4" />
            </span>
          </span>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {catalogue.map((p) => (
            <ProductCard key={p.sku} p={p} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
