import {
  ArrowLeft,
  Bot,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Copy,
  FlaskConical,
  GitBranch,
  GitFork,
  Headset,
  LayoutGrid,
  List,
  LockOpen,
  Map as MapIcon,
  Maximize,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Redo2,
  Rocket,
  Smartphone,
  Sparkles,
  StickyNote,
  Trash2,
  Undo2,
  X,
  Zap,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/components/ui/cx";
import { AppShell } from "../AppShell";
import { IgIcon, MBadge, MButton, ProductThumb, Segmented, Switch } from "../primitives";

/*
 * The flow builder canvas, copied from BODHINOX_CHAT/src/components/flows/
 * flow-canvas.tsx: 260px-style step cards with a header tinted by step group
 * (Start green, Content rose, AI violet, Logic amber), a message box, slot rows
 * with their own output ports, and bezier edges on a dotted card-2 canvas.
 * Nodes are laid out in "world" pixels and the world is scaled to fit.
 */

type Group = "start" | "content" | "ai" | "logic";

const groupStyle: Record<Group, { head: string; text: string; chip: string; port: string; selected: string }> = {
  start: {
    head: "bg-[color-mix(in_oklab,var(--chart-3)_16%,transparent)]",
    text: "text-[color-mix(in_oklab,var(--chart-3),var(--foreground)_40%)]",
    chip: "bg-chart-3 text-white",
    port: "border-chart-3",
    selected: "border-chart-3",
  },
  content: {
    head: "bg-[color-mix(in_oklab,var(--ig)_14%,transparent)]",
    text: "text-[color-mix(in_oklab,var(--ig),var(--foreground)_35%)]",
    chip: "bg-ig text-white",
    port: "border-ig",
    selected: "border-ig shadow-[0_0_0_1px_var(--ig),0_14px_36px_-12px_color-mix(in_oklab,var(--ig)_55%,transparent)]",
  },
  ai: {
    head: "bg-[color-mix(in_oklab,var(--chart-5)_15%,transparent)]",
    text: "text-[color-mix(in_oklab,var(--chart-5),var(--foreground)_35%)]",
    chip: "bg-chart-5 text-white",
    port: "border-chart-5",
    selected: "border-chart-5",
  },
  logic: {
    head: "bg-[color-mix(in_oklab,var(--chart-4)_18%,transparent)]",
    text: "text-[color-mix(in_oklab,var(--chart-4),var(--foreground)_45%)]",
    chip: "bg-chart-4 text-white",
    port: "border-chart-4",
    selected: "border-chart-4",
  },
};

const NODE_W = 220;
const HEAD_H = 44;
const SLOT_H = 32;
const SLOT_GAP = 4;
const STAT_H = 26;

type FlowNode = {
  id: string;
  x: number;
  y: number;
  group: Group;
  icon: LucideIcon | "ig";
  label: string;
  channel?: string;
  entry?: boolean;
  selected?: boolean;
  bodyH: number;
  body: ReactNode;
  stat?: ReactNode;
  slots?: string[];
};

type Port = number | "next";
type Edge = { from: string; port: Port; to: string };

/** Top of the area below the message box (and stats line). */
function afterBody(n: FlowNode) {
  return 1 + HEAD_H + 12 + n.bodyH + (n.stat ? STAT_H : 0);
}

function portPos(n: FlowNode, port: Port): [number, number] {
  const x = n.x + NODE_W;
  if (port === "next") return [x, n.y + afterBody(n) + 10 + 8];
  return [x, n.y + afterBody(n) + 21 + port * (SLOT_H + SLOT_GAP) + SLOT_H / 2];
}

function targetPos(n: FlowNode): [number, number] {
  return [n.x, n.y + 1 + HEAD_H / 2];
}

function curve([sx, sy]: [number, number], [tx, ty]: [number, number]) {
  const d = Math.max(40, (tx - sx) * 0.5);
  return `M${sx},${sy} C${sx + d},${sy} ${tx - d},${ty} ${tx},${ty}`;
}

function NodeCard({ n }: { n: FlowNode }) {
  const g = groupStyle[n.group];
  return (
    <div
      className={cx(
        "absolute rounded-2xl border bg-card px-4 pb-3.5 text-left",
        n.selected ? g.selected : "border-border shadow-raised",
      )}
      style={{ left: n.x, top: n.y, width: NODE_W }}
    >
      {n.entry ? null : (
        <span className={cx("absolute top-[17px] -left-[6px] size-2.5 rounded-full border-2 bg-card", g.port)} />
      )}
      <div className={cx("-mx-4 flex h-11 items-center gap-2 rounded-t-2xl px-4", g.head)}>
        <span className={cx("inline-flex size-6 shrink-0 items-center justify-center rounded-md", g.chip)}>
          {n.icon === "ig" ? <IgIcon className="size-3.5" strokeWidth={2.4} /> : <n.icon className="size-3.5" strokeWidth={2.2} />}
        </span>
        <span className="flex min-w-0 flex-col">
          {n.channel ? <span className="truncate text-[10px] leading-tight text-muted-foreground">{n.channel}</span> : null}
          <span className={cx("truncate text-[13px] leading-tight font-semibold", g.text)}>{n.label}</span>
        </span>
        {n.entry ? (
          <span className="ml-auto rounded border border-border px-1.5 py-0.5 text-[8.5px] font-bold tracking-[0.1em] text-muted-foreground uppercase">
            Entry
          </span>
        ) : null}
      </div>
      <div
        className="mt-3 overflow-hidden rounded-xl border border-border bg-background px-3 py-2.5 text-[12px] leading-relaxed text-foreground"
        style={{ height: n.bodyH }}
      >
        {n.body}
      </div>
      {n.stat ? (
        <div className="flex h-[26px] items-end gap-1.5 text-[10.5px] font-medium text-muted-foreground">{n.stat}</div>
      ) : null}
      {n.slots ? (
        <div className="mt-2.5 flex flex-col gap-1 border-t border-border pt-2.5">
          {n.slots.map((s) => (
            <div
              key={s}
              className="relative flex h-8 items-center rounded-lg border border-border bg-primary-soft px-2 text-[11px] font-medium text-primary"
            >
              <span className="truncate">{s}</span>
              <span className={cx("absolute top-1/2 -right-[23px] size-2.5 -translate-y-1/2 rounded-full border-2 bg-card", g.port)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative mt-2.5 flex h-4 items-center justify-end text-[10.5px] font-medium text-muted-foreground">
          Next step
          <span className={cx("absolute top-1/2 -right-[23px] size-2.5 -translate-y-1/2 rounded-full border-2 bg-card", g.port)} />
        </div>
      )}
    </div>
  );
}

function Kw({ children }: { children: ReactNode }) {
  return <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10.5px] font-semibold text-foreground">{children}</span>;
}

function Var({ children }: { children: ReactNode }) {
  return <span className="rounded bg-primary-soft px-1 font-mono text-[10.5px] text-primary-strong">{children}</span>;
}

/** Dotted canvas world, scaled to fit its box. Stubs end in a round "+" add button. */
function Canvas({
  nodes,
  edges,
  stubs = [],
  scale,
  worldW,
  worldH,
  note,
}: {
  nodes: FlowNode[];
  edges: Edge[];
  stubs?: { from: string; port: Port }[];
  scale: number;
  worldW: number;
  worldH: number;
  note?: { x: number; y: number; text: string };
}) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <div className="absolute top-0 left-0 origin-top-left" style={{ width: worldW, height: worldH, transform: `scale(${scale})` }}>
      <svg width={worldW} height={worldH} className="absolute inset-0 overflow-visible" aria-hidden>
        {edges.map((e) => (
          <path
            key={`${e.from}-${e.port}-${e.to}`}
            d={curve(portPos(byId[e.from], e.port), targetPos(byId[e.to]))}
            fill="none"
            stroke="var(--primary)"
            strokeOpacity="0.45"
            strokeWidth="2"
          />
        ))}
        {stubs.map((s) => {
          const [x, y] = portPos(byId[s.from], s.port);
          return (
            <path
              key={`${s.from}-${s.port}`}
              d={`M${x},${y} L${x + 18},${y}`}
              stroke="var(--primary)"
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          );
        })}
      </svg>
      {stubs.map((s) => {
        const [x, y] = portPos(byId[s.from], s.port);
        return (
          <span
            key={`p-${s.from}-${s.port}`}
            className="absolute inline-flex size-[22px] items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-raised"
            style={{ left: x + 18, top: y - 11 }}
          >
            <Plus className="size-3" strokeWidth={2.4} />
          </span>
        );
      })}
      {note ? (
        <div
          className="absolute w-[200px] rotate-[-1.5deg] rounded-xl bg-note px-3.5 py-3 text-[12px] leading-snug text-note-foreground shadow-raised"
          style={{ left: note.x, top: note.y }}
        >
          <p className="mb-1 flex items-center gap-1.5 text-[10.5px] font-semibold tracking-[0.06em] uppercase">
            <StickyNote className="size-3" /> Note
          </p>
          {note.text}
        </div>
      ) : null}
      {nodes.map((n) => (
        <NodeCard key={n.id} n={n} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ data */

const startNode = (x: number, y: number, bodyH = 96): FlowNode => ({
  id: "start",
  x,
  y,
  group: "start",
  icon: Zap,
  label: "Start",
  entry: true,
  bodyH,
  body: (
    <>
      <p className="flex items-center gap-1.5 font-semibold">
        <IgIcon className="size-3.5 text-ig" /> Comment on a reel
      </p>
      <p className="mt-1 flex flex-wrap items-center gap-1 text-muted-foreground">
        Keyword <Kw>PRICE</Kw>
        <Kw>RATE</Kw>
        <Kw>kitna</Kw>
      </p>
      <p className="mt-1 truncate text-[11px] text-muted-foreground">Public reply: “Sent you a DM 💌”</p>
    </>
  ),
});

const buttonsNode = (x: number, y: number, bodyH = 96): FlowNode => ({
  id: "buttons",
  x,
  y,
  group: "content",
  icon: MessageSquareText,
  label: "Send buttons",
  channel: "Instagram",
  bodyH,
  body: (
    <p>
      Namaste <Var>first_name</Var> 🌿 The Kumkumadi oil from the reel is ₹1,250 today (MRP ₹1,490). Shall I reserve one?
    </p>
  ),
  slots: ["Buy now", "Ask a question", "Talk to a person"],
});

const paymentNode = (x: number, y: number, selected = false): FlowNode => ({
  id: "pay",
  x,
  y,
  group: "content",
  icon: CreditCard,
  label: "Payment link",
  channel: "Instagram",
  selected,
  bodyH: 74,
  body: (
    <>
      <p className="font-semibold">Kumkumadi Face Oil × 1</p>
      <p className="text-muted-foreground">₹1,250.00 · Razorpay</p>
      <p className="text-[11px] text-muted-foreground">UPI, cards, netbanking · 30 min</p>
    </>
  ),
  stat: (
    <>
      <Check className="size-3 text-success" /> 212 paid · ₹2,65,000
    </>
  ),
  slots: ["Paid", "Not paid in 30 min"],
});

const aiNode = (x: number, y: number): FlowNode => ({
  id: "ai",
  x,
  y,
  group: "ai",
  icon: Sparkles,
  label: "AI reply",
  bodyH: 74,
  body: (
    <>
      <p>Answer from Products and FAQs.</p>
      <p className="text-muted-foreground">Agent: Wellness Guide · Friendly</p>
      <p className="text-[11px] text-muted-foreground">Reply in the customer’s language</p>
    </>
  ),
  slots: ["Answered", "Needs a person"],
});

const assignNode = (x: number, y: number): FlowNode => ({
  id: "assign",
  x,
  y,
  group: "logic",
  icon: Headset,
  label: "Assign agent",
  bodyH: 58,
  body: (
    <>
      <p>Sales team · Round robin</p>
      <p className="text-[11px] text-muted-foreground">Tag “Reel lead” · Bot pauses</p>
    </>
  ),
});

const conditionNode = (x: number, y: number): FlowNode => ({
  id: "cond",
  x,
  y,
  group: "logic",
  icon: GitBranch,
  label: "If / else",
  bodyH: 58,
  body: (
    <>
      <p>
        Tag <span className="font-semibold">is</span> VIP customer
      </p>
      <p className="text-[11px] text-muted-foreground">or Orders count ≥ 3</p>
    </>
  ),
  slots: ["VIP · add free sample", "Else"],
});

const C0 = 16;
const C1 = 286;
const C2 = 556;
const C3 = 826;

const fullNodes: FlowNode[] = [
  startNode(C0, 270),
  buttonsNode(C1, 200),
  conditionNode(C2, 36),
  paymentNode(C3, 70, true),
  aiNode(C2, 318),
  assignNode(C3, 640),
];

const fullEdges: Edge[] = [
  { from: "start", port: "next", to: "buttons" },
  { from: "buttons", port: 0, to: "cond" },
  { from: "buttons", port: 1, to: "ai" },
  { from: "buttons", port: 2, to: "assign" },
  { from: "cond", port: 0, to: "pay" },
  { from: "cond", port: 1, to: "pay" },
  { from: "ai", port: 1, to: "assign" },
];

/* ------------------------------------------------------------- chrome */

function ToolButton({ icon: Icon, active }: { icon: LucideIcon; active?: boolean }) {
  return (
    <span
      className={cx(
        "inline-flex size-8 items-center justify-center rounded-full border bg-card shadow-sm",
        active ? "border-primary text-primary" : "border-border text-muted-foreground",
      )}
    >
      <Icon className="size-4" />
    </span>
  );
}

function VersionPill() {
  return (
    <span className="inline-flex h-8 items-center gap-2 rounded-full border border-border bg-card px-3 text-[12px] font-medium text-foreground">
      <span className="flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-chart-4" /> Draft
      </span>
      <span className="text-muted-foreground">/</span>
      <span className="flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-success" /> Live v3
      </span>
      <ChevronDown className="size-3.5 text-muted-foreground" />
    </span>
  );
}

function EditorHeader() {
  return (
    <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
      <span className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground">
        <ArrowLeft className="size-4" />
      </span>
      <span className="text-[13px] text-muted-foreground">Automation</span>
      <ChevronRight className="size-3.5 text-muted-foreground" />
      <span className="text-[16px] font-bold tracking-tight text-foreground">Reel offer → order</span>
      <span className="ml-2 flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
        <Check className="size-3" /> Saved
      </span>
      <span className="ml-auto flex items-center gap-1 text-muted-foreground">
        <span className="inline-flex size-8 items-center justify-center rounded-md">
          <Undo2 className="size-4" />
        </span>
        <span className="inline-flex size-8 items-center justify-center rounded-md opacity-50">
          <Redo2 className="size-4" />
        </span>
        <span className="inline-flex size-8 items-center justify-center rounded-md">
          <Smartphone className="size-4" />
        </span>
        <span className="inline-flex gap-0.5 rounded-lg border border-border bg-muted p-0.5">
          <span className="inline-flex size-7 items-center justify-center rounded-md bg-card text-foreground shadow-sm">
            <GitFork className="size-3.5" />
          </span>
          <span className="inline-flex size-7 items-center justify-center rounded-md">
            <List className="size-3.5" />
          </span>
        </span>
      </span>
      <VersionPill />
      <MButton variant="outline" icon={FlaskConical}>
        Dry run
      </MButton>
      <MButton icon={Rocket}>Publish</MButton>
      <span className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground">
        <MoreHorizontal className="size-4" />
      </span>
    </div>
  );
}

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div>
      <p className="mb-1.5 text-[12px] font-medium text-foreground">{label}</p>
      {children}
      {hint ? <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function Box({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("flex min-h-9 items-center gap-2 rounded-xl border border-border bg-card px-3 text-[13px] text-foreground", className)}>
      {children}
    </div>
  );
}

function Inspector() {
  const g = groupStyle.content;
  return (
    <aside className="flex w-[304px] shrink-0 flex-col border-l border-border bg-card">
      <div className={cx("flex items-center gap-3 border-b border-border px-4 py-3.5", g.head)}>
        <span className={cx("inline-flex size-8 items-center justify-center rounded-lg", g.chip)}>
          <CreditCard className="size-4" />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[11px] text-muted-foreground">Content · Instagram</p>
          <p className={cx("text-[14px] font-semibold", g.text)}>Payment link</p>
        </div>
        <X className="size-4 text-muted-foreground" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-4 py-4">
        <Field label="Product">
          <Box className="py-2">
            <ProductThumb tone={4} size={32} icon={Sparkles} />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[13px] font-medium">Kumkumadi Face Oil</span>
              <span className="block text-[11px] text-muted-foreground">₹1,250 · 42 in stock</span>
            </span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </Box>
        </Field>
        <div className="grid grid-cols-[72px_1fr] gap-2">
          <Field label="Quantity">
            <Box className="tabular-nums">1</Box>
          </Field>
          <Field label="Amount">
            <Box className="justify-between tabular-nums">
              ₹1,250.00 <span className="text-[11px] text-muted-foreground">INR</span>
            </Box>
          </Field>
        </div>
        <Field label="Message">
          <div className="rounded-xl border border-primary bg-card px-3 py-2 text-[12.5px] leading-snug text-foreground shadow-[0_0_0_3px_var(--primary-soft)]">
            Here’s your secure link for <Var>product</Var> 💳 Pay by UPI or card. We ship in 24 hours.
          </div>
        </Field>
        <Field label="Gateway">
          <Box className="justify-between">
            Razorpay <MBadge tone="success">Connected</MBadge>
          </Box>
        </Field>
        <Field label="Link expires after">
          <Segmented items={["15 min", "30 min", "1 hour", "24 h"]} active={1} className="w-full justify-between" />
        </Field>
        <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-card-2 p-3 text-[12.5px]">
          <span className="flex items-center justify-between text-foreground">
            Create order in Sales <Switch />
          </span>
          <span className="flex items-center justify-between text-foreground">
            Send receipt when paid <Switch />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-border px-4 py-3 text-[12.5px] font-medium">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Copy className="size-3.5" /> Duplicate
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-destructive">
          <Trash2 className="size-3.5" /> Delete step
        </span>
      </div>
    </aside>
  );
}

/** The full flow editor: header, scaled canvas with six steps, inspector. Design size 1280 x height. */
export function FlowBuilderScreen({ height = 760 }: { height?: number }) {
  return (
    <AppShell active="automation" height={height} flush crumbs={["Automation", "Reel offer → order"]}>
      <div className="flex h-full flex-col">
        <EditorHeader />
        <div className="flex min-h-0 flex-1">
          <div className="flow-canvas relative min-w-0 flex-1 overflow-hidden">
            <Canvas
              nodes={fullNodes}
              edges={fullEdges}
              stubs={[
                { from: "pay", port: 0 },
                { from: "pay", port: 1 },
                { from: "ai", port: 0 },
                { from: "assign", port: "next" },
              ]}
              scale={0.62}
              worldW={1110}
              worldH={1000}
              note={{ x: 24, y: 560, text: "Reel goes live Friday 7 pm. Keep stock of 60 bottles aside 🎬" }}
            />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <ToolButton icon={LockOpen} />
              <span className="rounded-full border border-border bg-card px-3 py-1 text-[11px] text-muted-foreground shadow-sm">
                Tap a step to edit it
              </span>
            </div>
            <div className="absolute top-3 right-3 flex flex-col items-center gap-2">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                <Plus className="size-5" />
              </span>
              <ToolButton icon={LayoutGrid} />
              <ToolButton icon={ZoomIn} />
              <ToolButton icon={ZoomOut} />
              <ToolButton icon={Maximize} />
              <ToolButton icon={MapIcon} />
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2 text-[11.5px] shadow-raised">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <FlaskConical className="size-3.5 text-success" /> Dry run passed
              </span>
              <span className="text-muted-foreground">6 steps · 0 warnings</span>
              <span className="h-3.5 w-px bg-border" />
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Bot className="size-3.5" /> 1,284 runs · 16.5% paid
              </span>
            </div>
            <div className="absolute right-3 bottom-3">
              <ToolButton icon={CircleHelp} />
            </div>
          </div>
          <Inspector />
        </div>
      </div>
    </AppShell>
  );
}

/** Compact canvas card for smaller placements. Design size 720 x 440, no AppShell. */
export function FlowCanvasCard({ className }: { className?: string }) {
  const nodes: FlowNode[] = [
    startNode(C0, 150, 80),
    buttonsNode(C1, 70, 80),
    paymentNode(C2, 6),
    aiNode(C2, 300),
    assignNode(C3, 330),
  ];
  const edges: Edge[] = [
    { from: "start", port: "next", to: "buttons" },
    { from: "buttons", port: 0, to: "pay" },
    { from: "buttons", port: 1, to: "ai" },
    { from: "ai", port: 1, to: "assign" },
  ];
  return (
    <div className={cx("flex h-[440px] w-[720px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sheet", className)}>
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-4">
        <span className="inline-flex size-7 items-center justify-center rounded-lg bg-[color-mix(in_oklab,var(--ig)_14%,transparent)] text-ig">
          <IgIcon className="size-3.5" />
        </span>
        <span className="text-[14px] font-bold tracking-tight text-foreground">Reel offer → order</span>
        <span className="ml-auto flex items-center gap-2">
          <VersionPill />
          <MButton variant="outline" icon={FlaskConical} className="h-7 px-3 text-[12px]">
            Dry run
          </MButton>
          <MButton icon={Rocket} className="h-7 px-3 text-[12px]">
            Publish
          </MButton>
        </span>
      </div>
      <div className="flow-canvas relative min-h-0 flex-1 overflow-hidden">
        <Canvas
          nodes={nodes}
          edges={edges}
          stubs={[
            { from: "pay", port: 0 },
            { from: "pay", port: 1 },
            { from: "ai", port: 0 },
            { from: "buttons", port: 2 },
          ]}
          scale={0.64}
          worldW={1110}
          worldH={620}
        />
        <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-sm">
          <span className="size-1.5 rounded-full bg-success" /> 1,284 runs this month
        </div>
      </div>
    </div>
  );
}
