import {
  AlertCircle,
  Bell,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock,
  CreditCard,
  Leaf,
  MapPin,
  Plus,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { cx } from "@/components/ui/cx";
import { AppShell } from "../AppShell";
import { PBubble, PButtons, PhoneFrame, PSystem } from "../Phone";
import { MAvatar, MBadge, MButton, MCard, MCardHeader, PageTitle, Segmented, Switch, TabRow, WaIcon } from "../primitives";

/*
 * Sales › Appointments, as on the live CRM (appointments/schedule-view.tsx,
 * week-grid.tsx): Schedule / Services / Team / Settings, Today / Week / List,
 * filters, the week grid and the Needs attention + Tasks rail. Plus the
 * public booking page (/book/<slug>) and the WhatsApp confirmation flow.
 */

type Status = "Confirmed" | "Awaiting WhatsApp" | "Completed" | "No-show";

type Slot = { day: number; start: number; dur: number; who: string; service: string; status: Status };

const days = [
  { name: "Mon", num: 16 },
  { name: "Tue", num: 17 },
  { name: "Wed", num: 18 },
  { name: "Thu", num: 19 },
  { name: "Fri", num: 20 },
  { name: "Sat", num: 21 },
  { name: "Sun", num: 22 },
];
const TODAY = 6;
const START_HOUR = 9;
const HOURS = 9;
const HOUR_PX = 46;

const slots: Slot[] = [
  { day: 0, start: 9.5, dur: 0.75, who: "Kavya Reddy", service: "Ayurvedic consultation", status: "Completed" },
  { day: 0, start: 12, dur: 0.5, who: "Rahul Verma", service: "Skin assessment", status: "Completed" },
  { day: 0, start: 15, dur: 1, who: "Divya Nair", service: "Diet planning", status: "Completed" },
  { day: 1, start: 10, dur: 0.75, who: "Sanjay Gupta", service: "Ayurvedic consultation", status: "Completed" },
  { day: 1, start: 13.5, dur: 0.5, who: "Aditi Joshi", service: "Follow-up call", status: "No-show" },
  { day: 1, start: 16, dur: 0.75, who: "Harsh Vardhan", service: "Ayurvedic consultation", status: "Completed" },
  { day: 2, start: 9, dur: 1, who: "Lakshmi Pillai", service: "Diet planning", status: "Completed" },
  { day: 2, start: 11.5, dur: 0.5, who: "Neha Kapoor", service: "Skin assessment", status: "Completed" },
  { day: 2, start: 14.5, dur: 0.75, who: "Tarun Bhat", service: "Ayurvedic consultation", status: "Completed" },
  { day: 3, start: 10.5, dur: 0.75, who: "Meghna Rao", service: "Ayurvedic consultation", status: "Completed" },
  { day: 3, start: 15.5, dur: 0.5, who: "Vikram Iyer", service: "Follow-up call", status: "Completed" },
  { day: 4, start: 9.5, dur: 0.5, who: "Sneha Patil", service: "Skin assessment", status: "Completed" },
  { day: 4, start: 12, dur: 1, who: "Kiran Shah", service: "Diet planning", status: "Confirmed" },
  { day: 4, start: 15, dur: 0.75, who: "Anil Kumar", service: "Ayurvedic consultation", status: "Confirmed" },
  { day: 5, start: 10, dur: 0.75, who: "Ritu Sinha", service: "Ayurvedic consultation", status: "Completed" },
  { day: 5, start: 11.5, dur: 0.5, who: "Gaurav Jain", service: "Skin assessment", status: "Completed" },
  { day: 5, start: 13, dur: 0.75, who: "Farah Khan", service: "Ayurvedic consultation", status: "No-show" },
  { day: 5, start: 16, dur: 1, who: "Deepa Menon", service: "Diet planning", status: "Completed" },
  { day: 6, start: 10, dur: 0.75, who: "Arjun Menon", service: "Ayurvedic consultation", status: "Confirmed" },
  { day: 6, start: 11.5, dur: 0.5, who: "Pooja Hegde", service: "Skin assessment", status: "Confirmed" },
  { day: 6, start: 14, dur: 1, who: "Nikhil Rao", service: "Diet planning", status: "Awaiting WhatsApp" },
  { day: 6, start: 16.25, dur: 0.5, who: "Ishita Bose", service: "Follow-up call", status: "Confirmed" },
];

const statusTone: Record<Status, string> = {
  Confirmed: "border-primary bg-primary-soft",
  "Awaiting WhatsApp": "border-warning bg-warning-soft",
  Completed: "border-input bg-muted",
  "No-show": "border-destructive bg-destructive-soft",
};

function fmt(h: number) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function FilterPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex h-8 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-[12px] shadow-[0_1px_2px_#0000000a]">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
      <ChevronDown className="size-3 text-muted-foreground" />
    </span>
  );
}

function WeekGrid() {
  return (
    <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-border bg-card">
      <div className="grid grid-cols-[52px_repeat(7,minmax(0,1fr))] border-b border-border bg-muted">
        <span />
        {days.map((d, i) => (
          <span key={d.num} className={cx("flex items-baseline gap-1.5 border-l border-border/60 px-2.5 py-2", i === TODAY && "text-primary")}>
            <small className={cx("text-[11px] font-medium", i !== TODAY && "text-muted-foreground")}>{d.name}</small>
            <b className={cx("text-[15px] font-semibold tabular-nums", i !== TODAY && "text-foreground")}>{d.num}</b>
          </span>
        ))}
      </div>
      <div className="grid grid-cols-[52px_repeat(7,minmax(0,1fr))]">
        <div>
          {Array.from({ length: HOURS }, (_, h) => (
            <span key={h} className="block pt-1 pr-2 text-right text-[10.5px] text-muted-foreground tabular-nums" style={{ height: HOUR_PX }}>
              {fmt(START_HOUR + h)}
            </span>
          ))}
        </div>
        {days.map((d, di) => (
          <div
            key={d.num}
            className={cx("relative border-l border-border/60", di === TODAY && "bg-primary/5")}
            style={{ height: HOURS * HOUR_PX }}
          >
            {Array.from({ length: HOURS - 1 }, (_, h) => (
              <span key={h} className="absolute inset-x-0 border-t border-border/50" style={{ top: (h + 1) * HOUR_PX }} />
            ))}
            {di === TODAY ? (
              <span className="absolute inset-x-0 z-10 flex items-center" style={{ top: (12.6 - START_HOUR) * HOUR_PX }}>
                <span className="-ml-1 size-2 rounded-full bg-destructive" />
                <span className="h-px flex-1 bg-destructive" />
              </span>
            ) : null}
            {slots
              .filter((s) => s.day === di)
              .map((s) => {
                const short = s.dur <= 0.5;
                return (
                  <span
                    key={s.who + s.start}
                    className={cx(
                      "absolute inset-x-1 flex overflow-hidden rounded-lg border-l-[3px] px-1.5 text-[11px] leading-tight",
                      statusTone[s.status],
                      short ? "flex-row items-center gap-1" : "flex-col items-start py-1",
                    )}
                    style={{ top: (s.start - START_HOUR) * HOUR_PX + 1, height: s.dur * HOUR_PX - 2 }}
                  >
                    <strong className={cx("max-w-full truncate font-semibold", s.status === "Completed" ? "text-muted-foreground" : "text-foreground")}>
                      {s.who}
                    </strong>
                    <small className="max-w-full min-w-0 truncate text-[10px] text-muted-foreground">
                      {fmt(s.start)}
                      {short ? "" : ` · ${s.service}`}
                    </small>
                  </span>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Sales › Appointments: the week schedule. */
export function AppointmentsScreen({ height = 860 }: { height?: number }) {
  return (
    <AppShell active="sales" crumbs={["Sales", "Appointments"]} height={height}>
      <div className="flex h-full flex-col gap-4">
        <Segmented items={["Pipelines", "Appointments", "Orders", "Payments"]} active={1} />
        <PageTitle
          title="Appointments"
          sub="Book consultations, confirm them on WhatsApp and follow up after the visit."
          right={<MButton icon={Plus}>New booking</MButton>}
        />
        <TabRow items={["Schedule", "Services", "Team", "Settings"]} />
        <div className="flex items-center gap-2">
          <Segmented items={["Today", "Week", "List"]} active={1} />
          <span className="flex items-center gap-1 pl-1 text-muted-foreground">
            <span className="inline-flex size-7 items-center justify-center rounded-lg border border-border">
              <ChevronLeft className="size-3.5" />
            </span>
            <span className="inline-flex size-7 items-center justify-center rounded-lg border border-border">
              <ChevronRight className="size-3.5" />
            </span>
          </span>
          <span className="text-[13px] font-semibold text-foreground">Nov 16 – 22, 2026</span>
          <span className="ml-auto flex items-center gap-2">
            <FilterPill label="Status" value="All" />
            <FilterPill label="Service" value="All" />
            <FilterPill label="Practitioner" value="All" />
            <FilterPill label="Location" value="Indiranagar" />
            <span className="flex items-center gap-2 pl-1 text-[12px] font-medium text-foreground">
              <Switch on={false} /> Needs outcome
            </span>
          </span>
        </div>

        <div className="flex min-h-0 flex-1 gap-3">
          <WeekGrid />
          <div className="flex w-[250px] shrink-0 flex-col gap-3">
            <MCard>
              <MCardHeader title="Needs attention" right={<MBadge tone="warning">3</MBadge>} />
              <ul className="flex flex-col gap-2 px-4 pt-2.5 pb-4 text-[12px]">
                <li className="rounded-lg border border-border p-2.5">
                  <p className="flex items-center gap-1.5 font-semibold text-foreground">
                    <WaIcon className="size-3.5 text-warning" /> Awaiting WhatsApp
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-muted-foreground">Nikhil Rao · Diet planning · Today 14:00</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Waiting for the customer&apos;s WhatsApp code</p>
                </li>
                <li className="rounded-lg border border-border p-2.5">
                  <p className="flex items-center gap-1.5 font-semibold text-foreground">
                    <AlertCircle className="size-3.5 text-destructive" /> Needs outcome
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-muted-foreground">Kiran Shah · Diet planning · Fri 12:00</p>
                  <p className="mt-1.5 flex gap-1.5">
                    <MBadge tone="outline">Mark completed</MBadge>
                    <MBadge tone="outline">No-show</MBadge>
                  </p>
                </li>
                <li className="rounded-lg border border-border p-2.5">
                  <p className="flex items-center gap-1.5 font-semibold text-foreground">
                    <CreditCard className="size-3.5 text-warning" /> Payment pending
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-muted-foreground">Ishita Bose · ₹500 link sent</p>
                </li>
              </ul>
            </MCard>
            <MCard>
              <MCardHeader title="Tasks" sub="After the visit" />
              <ul className="flex flex-col gap-2 px-4 pt-2.5 pb-4 text-[12px]">
                {[
                  ["Send diet chart to Divya Nair", true],
                  ["Share oil routine with Kavya Reddy", true],
                  ["Book follow-up for Arjun Menon", false],
                  ["Call Aditi Joshi to rebook", false],
                ].map(([t, done]) => (
                  <li key={t as string} className="flex items-start gap-2">
                    {done ? <CheckCircle2 className="mt-px size-3.5 shrink-0 text-primary" /> : <Circle className="mt-px size-3.5 shrink-0 text-input" />}
                    <span className={done ? "text-muted-foreground line-through" : "text-foreground"}>{t}</span>
                  </li>
                ))}
              </ul>
            </MCard>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 px-1 text-[10.5px] text-muted-foreground">
              {(Object.keys(statusTone) as Status[]).map((s) => (
                <span key={s} className="flex items-center gap-1">
                  <span className={cx("size-2 rounded-sm border-l-2", statusTone[s])} /> {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/** The WhatsApp side of a booking: BOOK code, confirmation, reminders. */
export function BookingPhone({ height = 600 }: { height?: number }) {
  return (
    <PhoneFrame title="Prakriti Naturals" subtitle="Business account" channel="whatsapp" height={height}>
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-2">
        <PSystem>From prakriti.shop/book/consult</PSystem>
        <PBubble from="customer" time="18:42">
          <span className="font-semibold">BOOK 4821</span>
          <span className="mt-0.5 block text-[11px] opacity-90">Ayurvedic consultation · Sat 28 Nov, 10:00</span>
        </PBubble>
        <PBubble from="business" time="18:42">
          <span className="flex items-center gap-1 font-semibold">
            <CalendarCheck className="size-3.5 text-success" /> You&apos;re booked
          </span>
          <span className="mt-1 block text-[11.5px] text-muted-foreground">
            Ayurvedic consultation with Dr. Lakshmi
            <br />
            Sat 28 Nov · 10:00 to 10:45
            <br />
            Indiranagar clinic · ₹800 paid
          </span>
        </PBubble>
        <PButtons labels={["Reschedule", "Cancel booking"]} />
        <PSystem>Friday</PSystem>
        <PBubble from="business" time="10:00">
          <span className="flex items-center gap-1 font-medium">
            <Bell className="size-3 text-primary" /> Reminder: your consultation is tomorrow at 10:00.
          </span>
        </PBubble>
        <PSystem>Saturday</PSystem>
        <PBubble from="business" time="08:00">
          See you in 2 hours, Arjun 🌿 Please bring any reports you have.
        </PBubble>
        <PButtons labels={["Get directions"]} link />
      </div>
    </PhoneFrame>
  );
}

const services = [
  { name: "Ayurvedic consultation", dur: "45 min", price: "₹800", on: true },
  { name: "Skin assessment", dur: "30 min", price: "₹600" },
  { name: "Diet planning", dur: "60 min", price: "₹1,200" },
];

const dateStrip = [
  { d: "Mon", n: 23 },
  { d: "Tue", n: 24 },
  { d: "Wed", n: 25 },
  { d: "Thu", n: 26, full: true },
  { d: "Fri", n: 27 },
  { d: "Sat", n: 28, on: true },
  { d: "Sun", n: 29, closed: true },
];

const times = [
  { t: "09:30", taken: true },
  { t: "10:00", on: true },
  { t: "10:45" },
  { t: "11:30", taken: true },
  { t: "12:15" },
  { t: "14:00" },
  { t: "14:45" },
  { t: "15:30", taken: true },
  { t: "16:15" },
  { t: "17:00" },
];

/** The public booking page /book/<slug> (~560 wide, no shell). */
export function BookingPageCard({ width = 560 }: { width?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sheet" style={{ width }}>
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--chart-3)_16%,transparent)] text-success">
          <Leaf className="size-5" />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[15px] font-semibold text-foreground">Book a consultation</p>
          <p className="text-[11.5px] text-muted-foreground">Prakriti Naturals · prakriti.shop/book/consult</p>
        </div>
        <MBadge tone="success">
          <ShieldCheck className="size-3" /> Confirmed on WhatsApp
        </MBadge>
      </div>

      <div className="flex flex-col gap-4 px-5 py-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">1 · Service</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {services.map((s) => (
              <div key={s.name} className={cx("rounded-xl border p-2.5", s.on ? "border-primary bg-primary-soft/60 ring-2 ring-primary/15" : "border-border")}>
                <Stethoscope className={cx("size-4", s.on ? "text-primary" : "text-muted-foreground")} />
                <p className="mt-1.5 text-[12px] leading-tight font-semibold text-foreground">{s.name}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {s.dur} · <span className="font-medium text-foreground">{s.price}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-border px-3 py-2">
          <MAvatar initials="DL" tone={2} size={30} />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-[12.5px] font-semibold text-foreground">Dr. Lakshmi</p>
            <p className="text-[11px] text-muted-foreground">BAMS · 12 years · English, Kannada, Tamil</p>
          </div>
          <span className="flex items-center gap-1 text-[11.5px] text-muted-foreground">
            <MapPin className="size-3" /> Indiranagar
          </span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">2 · Date</p>
            <span className="flex items-center gap-1 text-[11.5px] font-medium text-foreground">
              <CalendarDays className="size-3.5 text-muted-foreground" /> November 2026
            </span>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1.5">
            {dateStrip.map((d) => (
              <span
                key={d.n}
                className={cx(
                  "flex flex-col items-center rounded-xl border py-1.5",
                  d.on ? "border-primary bg-primary text-primary-foreground" : "border-border",
                  (d.closed || d.full) && "bg-muted text-muted-foreground",
                )}
              >
                <span className={cx("text-[10.5px]", d.on ? "text-primary-foreground/85" : "text-muted-foreground")}>{d.d}</span>
                <span className={cx("text-[15px] font-semibold tabular-nums", !d.on && !d.closed && !d.full && "text-foreground")}>{d.n}</span>
                <span className={cx("text-[9px]", d.on ? "text-primary-foreground/85" : "text-muted-foreground")}>
                  {d.closed ? "Closed" : d.full ? "Full" : d.on ? "6 left" : "Open"}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">3 · Time · Sat 28 Nov</p>
          <div className="mt-2 grid grid-cols-5 gap-1.5">
            {times.map((t) => (
              <span
                key={t.t}
                className={cx(
                  "flex h-8 items-center justify-center rounded-lg border text-[12px] font-medium tabular-nums",
                  t.on && "border-primary bg-primary text-primary-foreground",
                  t.taken && "border-border bg-muted text-muted-foreground line-through",
                  !t.on && !t.taken && "border-border text-foreground",
                )}
              >
                {t.t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-border bg-card-2 px-5 py-3.5">
        <div className="min-w-0 flex-1 leading-tight">
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
            <Clock className="size-3.5 text-muted-foreground" /> Sat 28 Nov, 10:00 · ₹800
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
            <UserRound className="size-3" /> Pay by Razorpay, then send BOOK 4821 on WhatsApp to confirm
          </p>
        </div>
        <span className="inline-flex h-9 items-center gap-1.5 rounded-full bg-wa px-4 text-[12.5px] font-semibold text-white">
          <WaIcon className="size-4" /> Pay & confirm
        </span>
      </div>
    </div>
  );
}
