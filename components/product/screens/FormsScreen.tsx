import {
  ArrowLeft,
  AtSign,
  Calendar,
  Check,
  CheckSquare,
  ChevronDown,
  CircleDot,
  ExternalLink,
  GripVertical,
  Hash,
  ListChecks,
  MoreVertical,
  Phone,
  Plus,
  Rocket,
  ShieldCheck,
  Text,
  TextCursorInput,
  Trash2,
  X,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/components/ui/cx";
import { AppShell } from "../AppShell";
import { PBubble, PButtons, PhoneFrame } from "../Phone";
import { MBadge, MButton, Switch, TabRow } from "../primitives";

/*
 * WhatsApp Forms (Meta Flows) builder, copied from BODHINOX_CHAT/src/components/
 * forms/form-builder.tsx: screens on the left (up to 10), the field editor in the
 * middle, and a live phone preview on the drawing-board grid on the right.
 */

/* ---------------------------------------------------- customer-side sheet */

function SheetField({ label, value, placeholder, kind = "text" }: { label: string; value?: string; placeholder?: string; kind?: "text" | "select" }) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-medium text-muted-foreground">{label}</p>
      <div className="flex h-9 items-center justify-between rounded-lg border border-input bg-card px-2.5 text-[12.5px]">
        <span className={value ? "text-foreground" : "text-muted-foreground"}>{value ?? placeholder}</span>
        {kind === "select" ? <ChevronDown className="size-3.5 text-muted-foreground" /> : null}
      </div>
    </div>
  );
}

/** The form as WhatsApp shows it: a sheet that slides up over the chat. */
function FormSheet({ children, title = "Skin consultation", screen = "About you", step, button = "Continue" }: { children: ReactNode; title?: string; screen?: string; step?: string; button?: string }) {
  return (
    <div className="-mx-3 mt-auto -mb-3 flex flex-col rounded-t-[22px] border-t border-border bg-card shadow-[0_-12px_32px_-16px_rgb(0_0_0/0.35)]">
      <div className="mx-auto mt-2 h-1 w-9 rounded-full bg-input" />
      <div className="flex items-center gap-2 px-3.5 pt-2 pb-2.5">
        <X className="size-4 text-foreground" />
        <span className="flex-1 text-center text-[13px] font-semibold text-foreground">{title}</span>
        <MoreVertical className="size-4 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-3 border-t border-border px-3.5 pt-3 pb-3">
        <div>
          {step ? <p className="text-[10px] font-medium text-muted-foreground">{step}</p> : null}
          <p className="text-[16px] font-bold tracking-tight text-foreground">{screen}</p>
        </div>
        {children}
        <span className="mt-1 flex h-10 items-center justify-center rounded-full bg-wa text-[13px] font-semibold text-white">{button}</span>
        <p className="text-center text-[9.5px] text-muted-foreground">
          Managed by Prakriti Naturals. <span className="text-wa">Learn more</span>
        </p>
      </div>
    </div>
  );
}

/** Focused crop: a phone with a two-field WhatsApp form open. 300 x 560 design size, no AppShell. */
export function FormPhone({ className, height = 560 }: { className?: string; height?: number }) {
  return (
    <PhoneFrame title="Prakriti Naturals" subtitle="Business account" height={height} className={className}>
      <PBubble from="business" time="10:12">
        Book a free skin consultation with Dr. Lakshmi 🌿
      </PBubble>
      <PButtons labels={["Book now"]} />
      <FormSheet step="Step 1 of 3">
        <SheetField label="Full name" value="Meera Krishnan" />
        <SheetField label="Skin type" value="Dry, sensitive" kind="select" />
      </FormSheet>
    </PhoneFrame>
  );
}

/* --------------------------------------------------------------- builder */

type FieldRow = { icon: LucideIcon; label: string; type: string; required?: boolean; saveTo?: string };

const collapsed: FieldRow[] = [
  { icon: ChevronDown, label: "Skin type", type: "Dropdown", required: true, saveTo: "skin_type" },
  { icon: CheckSquare, label: "Send me offers on WhatsApp", type: "Consent checkbox", saveTo: "Opt-in" },
];

const palette: { icon: LucideIcon; label: string }[] = [
  { icon: TextCursorInput, label: "Short answer" },
  { icon: Text, label: "Long answer" },
  { icon: AtSign, label: "Email" },
  { icon: Phone, label: "Phone" },
  { icon: Hash, label: "Number" },
  { icon: Calendar, label: "Date" },
  { icon: ChevronDown, label: "Dropdown" },
  { icon: CircleDot, label: "Single choice" },
  { icon: ListChecks, label: "Multiple choice" },
  { icon: ShieldCheck, label: "Consent checkbox" },
];

function Input({ children, focus, mono }: { children: ReactNode; focus?: boolean; mono?: boolean }) {
  return (
    <div
      className={cx(
        "flex h-9 items-center gap-2 rounded-xl border bg-card px-3 text-[13px] text-foreground",
        focus ? "border-primary shadow-[0_0_0_3px_var(--primary-soft)]" : "border-border",
        mono && "font-mono text-[12px]",
      )}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="mb-1 text-[11.5px] font-medium text-muted-foreground">{children}</p>;
}

/** WhatsApp Forms builder: screens, field editor, live phone preview. Design size 1280 x height. */
export function FormBuilderScreen({ height = 760 }: { height?: number }) {
  return (
    <AppShell active="campaigns" height={height} crumbs={["Campaigns", "Forms", "Skin consultation"]}>
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground">
            <ArrowLeft className="size-4" />
          </span>
          <span className="text-[20px] font-bold tracking-tight text-foreground">Skin consultation</span>
          <MBadge tone="neutral">Draft</MBadge>
          <MBadge tone="outline">Appointment booking</MBadge>
          <span className="flex items-center gap-1 text-[11.5px] font-medium text-muted-foreground">
            <Check className="size-3" /> Saved
          </span>
          <span className="ml-auto flex items-center gap-2">
            <MButton variant="ghost" icon={ExternalLink}>
              Open WhatsApp preview
            </MButton>
            <MButton variant="outline">Save</MButton>
            <MButton icon={Rocket}>Publish</MButton>
          </span>
        </div>
        <TabRow items={["Builder", "Responses · 214"]} />

        <div className="flex min-h-0 flex-1 gap-4">
          {/* screens */}
          <div className="flex w-[212px] shrink-0 flex-col gap-2">
            <p className="text-[12px] font-semibold text-foreground">
              Screens <span className="font-normal text-muted-foreground">(3 of 10)</span>
            </p>
            {[
              { n: 1, t: "About you", f: "3 fields" },
              { n: 2, t: "Your skin", f: "3 fields" },
              { n: 3, t: "Pick a slot", f: "2 fields · Submit" },
            ].map((s) => (
              <div
                key={s.n}
                className={cx(
                  "flex items-center gap-2.5 rounded-xl border px-3 py-2.5",
                  s.n === 1 ? "border-primary bg-primary-soft" : "border-border bg-card",
                )}
              >
                <span
                  className={cx(
                    "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                    s.n === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {s.n}
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[13px] font-medium text-foreground">{s.t}</span>
                  <span className="block text-[11px] text-muted-foreground">{s.f}</span>
                </span>
                <GripVertical className="size-3.5 text-muted-foreground/60" />
              </div>
            ))}
            <span className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-dashed border-input text-[12.5px] font-medium text-muted-foreground">
              <Plus className="size-3.5" /> Add screen
            </span>
            <div className="mt-2 rounded-xl border border-border bg-card-2 p-3">
              <p className="text-[12px] font-semibold text-foreground">Form settings</p>
              <Label>
                <span className="mt-2 block">Confirmation message</span>
              </Label>
              <p className="rounded-lg border border-border bg-card px-2.5 py-2 text-[12px] leading-snug text-foreground">
                Thanks {"{{name}}"}! Dr. Lakshmi will see you at your chosen slot 🌿
              </p>
              <p className="mt-2 flex items-center justify-between text-[12px] text-foreground">
                Check answers on the server <Switch on={false} />
              </p>
            </div>
          </div>

          {/* field editor */}
          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
            <div className="grid grid-cols-2 gap-2.5 rounded-xl border border-border bg-card-2 p-3">
              <div>
                <Label>Screen title</Label>
                <Input>About you</Input>
              </div>
              <div>
                <Label>Next button text</Label>
                <Input>Continue</Input>
              </div>
            </div>

            <div className="rounded-xl border border-primary bg-card shadow-[0_0_0_3px_var(--primary-soft)]">
              <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
                <GripVertical className="size-3.5 text-muted-foreground/60" />
                <span className="inline-flex size-6 items-center justify-center rounded-md bg-primary-soft text-primary">
                  <TextCursorInput className="size-3.5" />
                </span>
                <span className="flex-1 text-[13px] font-semibold text-foreground">Full name</span>
                <span className="text-[11px] text-muted-foreground">Short answer</span>
                <span className="flex items-center gap-1.5 text-[11.5px] text-foreground">
                  <Switch /> Required
                </span>
                <Trash2 className="size-3.5 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-2 gap-2.5 p-3">
                <div className="col-span-2">
                  <Label>Question</Label>
                  <Input focus>
                    What should we call you?<span className="h-4 w-px bg-primary" />
                    <span className="ml-auto text-[11px] text-muted-foreground tabular-nums">24 / 80</span>
                  </Input>
                </div>
                <div>
                  <Label>Answer key</Label>
                  <Input mono>full_name</Input>
                </div>
                <div>
                  <Label>Save answer to</Label>
                  <Input>
                    <span className="flex-1">Contact · Name</span>
                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </Input>
                </div>
              </div>
            </div>

            {collapsed.map((f) => (
              <div key={f.label} className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
                <GripVertical className="size-3.5 text-muted-foreground/60" />
                <span className="inline-flex size-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <f.icon className="size-3.5" />
                </span>
                <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-foreground">{f.label}</span>
                <span className="text-[11px] text-muted-foreground">{f.type}</span>
                {f.required ? <MBadge tone="neutral">Required</MBadge> : null}
                {f.saveTo ? <MBadge tone="primary">→ {f.saveTo}</MBadge> : null}
              </div>
            ))}

            <div className="rounded-xl border border-dashed border-input p-3">
              <p className="mb-2 text-[11.5px] font-medium text-muted-foreground">Add a field</p>
              <div className="flex flex-wrap gap-1.5">
                {palette.map((p) => (
                  <span key={p.label} className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-border bg-card px-2 text-[11.5px] font-medium text-foreground">
                    <p.icon className="size-3 text-muted-foreground" />
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* preview */}
          <div className="phone-stage flex w-[340px] shrink-0 items-start justify-center overflow-hidden rounded-xl border border-border pt-4">
            <PhoneFrame title="Prakriti Naturals" subtitle="Business account" height={540}>
              <FormSheet step="Step 1 of 3">
                <SheetField label="What should we call you?" value="Meera Krishnan" />
                <SheetField label="Skin type" placeholder="Choose one" kind="select" />
                <div className="flex items-start gap-2 text-[11.5px] leading-snug text-foreground">
                  <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded border border-wa bg-wa text-white">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  Send me offers on WhatsApp
                </div>
              </FormSheet>
            </PhoneFrame>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
