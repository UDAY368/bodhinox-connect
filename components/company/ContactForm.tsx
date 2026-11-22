"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { cx } from "@/components/ui/cx";

type Fields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  teamSize: string;
  message: string;
  consent: boolean;
};

type FieldName = keyof Fields;
type Errors = Partial<Record<FieldName, string>>;

const TEAM_SIZES = ["Just me", "2 to 5", "6 to 20", "21 to 50", "More than 50"];

const EMPTY: Fields = { name: "", email: "", phone: "", company: "", teamSize: "", message: "", consent: false };

const ORDER: FieldName[] = ["name", "email", "phone", "company", "teamSize", "message", "consent"];

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Enter your name.";
  if (!f.email.trim()) e.email = "Enter your work email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter an email address like name@company.in.";
  const digits = f.phone.replace(/\D/g, "");
  if (f.phone.trim() && (digits.length < 10 || digits.length > 15 || /[^\d\s()+-]/.test(f.phone)))
    e.phone = "Enter a phone number with 10 to 15 digits, or leave it empty.";
  if (!f.company.trim()) e.company = "Enter your company or business name.";
  if (!f.teamSize) e.teamSize = "Choose your team size.";
  if (f.message.trim().length < 10) e.message = "Tell us a little about what you need, in at least 10 characters.";
  else if (f.message.length > 2000) e.message = "Keep the message under 2,000 characters.";
  if (!f.consent) e.consent = "Tick the box so we can use these details to reply to you.";
  return e;
}

function mailtoHref(to: string, f: Fields): string {
  const subject = `Demo request from ${f.company.trim() || f.name.trim()}`;
  const body = [
    `Name: ${f.name.trim()}`,
    `Work email: ${f.email.trim()}`,
    f.phone.trim() ? `Phone: ${f.phone.trim()}` : null,
    `Company: ${f.company.trim()}`,
    `Team size: ${f.teamSize}`,
    "",
    f.message.trim(),
  ]
    .filter((line) => line !== null)
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "failed"; href: string }
  | { kind: "mailto"; href: string };

type ContactFormProps = {
  /** POST endpoint from NEXT_PUBLIC_CONTACT_ENDPOINT. Empty means prepare an email instead. */
  endpoint: string;
  /** Support email shown in the fallback. */
  email: string;
};

const inputClass =
  "mt-2 block w-full rounded-control border bg-card px-3.5 py-2.5 text-body text-foreground placeholder:text-muted-foreground " +
  "transition-colors duration-200 focus:border-primary";

export function ContactForm({ endpoint, email }: ContactFormProps) {
  const uid = useId();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  const id = (name: string) => `${uid}-${name}`;

  function update<K extends FieldName>(name: K, value: Fields[K]) {
    const next = { ...fields, [name]: value };
    setFields(next);
    // After the first submit, keep errors current as the person fixes them.
    if (submitted) setErrors(validate(next));
    if (status.kind !== "idle" && status.kind !== "sending") setStatus({ kind: "idle" });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    // Bots fill hidden fields; people never see this one.
    if (honeypot.current?.value) return;

    const href = mailtoHref(email, fields);
    if (!endpoint) {
      setStatus({ kind: "mailto", href });
      requestAnimationFrame(() => resultRef.current?.focus());
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          company: fields.company.trim(),
          teamSize: fields.teamSize,
          message: fields.message.trim(),
          consent: true,
          source: "bodhinoxconnect.in/contact",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus({ kind: "sent" });
      setFields(EMPTY);
      setSubmitted(false);
    } catch {
      setStatus({ kind: "failed", href });
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  const errorList = ORDER.filter((name) => errors[name]);
  const describedBy = (name: FieldName, hint?: string) =>
    [hint ? id(`${name}-hint`) : null, errors[name] ? id(`${name}-error`) : null].filter(Boolean).join(" ") || undefined;

  const fieldError = (name: FieldName) =>
    errors[name] ? (
      <p id={id(`${name}-error`)} className="mt-1.5 text-small text-destructive">
        {errors[name]}
      </p>
    ) : null;

  const borderFor = (name: FieldName) => (errors[name] ? "border-destructive" : "border-input");

  return (
    <div>
      {errorList.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 rounded-control border border-destructive px-4 py-3"
          aria-labelledby={id("summary-title")}
        >
          <p id={id("summary-title")} className="font-semibold text-destructive">
            {errorList.length === 1 ? "Please fix 1 field." : `Please fix ${errorList.length} fields.`}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-small">
            {errorList.map((name) => (
              <li key={name}>
                <a href={`#${id(name)}`} className="text-foreground underline underline-offset-4">
                  {errors[name]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <form noValidate onSubmit={onSubmit} aria-describedby={id("required-note")}>
        <p id={id("required-note")} className="text-small text-muted-foreground">
          Fields marked <span aria-hidden>*</span>
          <span className="sr-only">with an asterisk</span> are required.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={id("name")} className="text-small font-semibold text-foreground">
              Your name <span aria-hidden>*</span>
            </label>
            <input
              id={id("name")}
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy("name")}
              value={fields.name}
              onChange={(e) => update("name", e.target.value)}
              className={cx(inputClass, borderFor("name"))}
            />
            {fieldError("name")}
          </div>

          <div>
            <label htmlFor={id("email")} className="text-small font-semibold text-foreground">
              Work email <span aria-hidden>*</span>
            </label>
            <input
              id={id("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email")}
              value={fields.email}
              onChange={(e) => update("email", e.target.value)}
              className={cx(inputClass, borderFor("email"))}
            />
            {fieldError("email")}
          </div>

          <div>
            <label htmlFor={id("phone")} className="text-small font-semibold text-foreground">
              Phone <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <p id={id("phone-hint")} className="mt-0.5 text-small text-muted-foreground">
              Include the country code, for example +91.
            </p>
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy("phone", "hint")}
              value={fields.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={cx(inputClass, borderFor("phone"))}
            />
            {fieldError("phone")}
          </div>

          <div>
            <label htmlFor={id("company")} className="text-small font-semibold text-foreground">
              Company <span aria-hidden>*</span>
            </label>
            <p id={id("company-hint")} className="mt-0.5 text-small text-muted-foreground">
              Your business or brand name.
            </p>
            <input
              id={id("company")}
              name="company"
              type="text"
              autoComplete="organization"
              required
              aria-required="true"
              aria-invalid={errors.company ? true : undefined}
              aria-describedby={describedBy("company", "hint")}
              value={fields.company}
              onChange={(e) => update("company", e.target.value)}
              className={cx(inputClass, borderFor("company"))}
            />
            {fieldError("company")}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={id("teamSize")} className="text-small font-semibold text-foreground">
              Team size <span aria-hidden>*</span>
            </label>
            <p id={id("teamSize-hint")} className="mt-0.5 text-small text-muted-foreground">
              How many people will reply to customers.
            </p>
            <select
              id={id("teamSize")}
              name="teamSize"
              required
              aria-required="true"
              aria-invalid={errors.teamSize ? true : undefined}
              aria-describedby={describedBy("teamSize", "hint")}
              value={fields.teamSize}
              onChange={(e) => update("teamSize", e.target.value)}
              className={cx(inputClass, "h-12 sm:max-w-xs", borderFor("teamSize"))}
            >
              <option value="">Choose one</option>
              {TEAM_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {fieldError("teamSize")}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={id("message")} className="text-small font-semibold text-foreground">
              What would you like to see or ask? <span aria-hidden>*</span>
            </label>
            <p id={id("message-hint")} className="mt-0.5 text-small text-muted-foreground">
              For example: your industry, how many chats you get a day, or the feature you care about most.
            </p>
            <textarea
              id={id("message")}
              name="message"
              rows={5}
              required
              aria-required="true"
              maxLength={2000}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy("message", "hint")}
              value={fields.message}
              onChange={(e) => update("message", e.target.value)}
              className={cx(inputClass, "resize-y", borderFor("message"))}
            />
            {fieldError("message")}
          </div>

          {/* Spam trap: hidden from people and assistive technology. */}
          <div aria-hidden="true" className="hidden">
            <label htmlFor={id("website")}>Leave this empty</label>
            <input ref={honeypot} id={id("website")} name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-start gap-3">
              <input
                id={id("consent")}
                name="consent"
                type="checkbox"
                required
                aria-required="true"
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={describedBy("consent")}
                checked={fields.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-1 size-5 shrink-0 accent-primary"
              />
              <label htmlFor={id("consent")} className="text-small text-foreground">
                I agree that Bodhinox may use these details to reply to my request, as set out in the{" "}
                <Link href="/privacy" className="text-primary underline underline-offset-4 hover:text-primary-hover">
                  privacy policy
                </Link>
                . <span aria-hidden>*</span>
              </label>
            </div>
            {fieldError("consent")}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status.kind === "sending"}
            className={buttonClasses({ variant: "primary", size: "lg" })}
          >
            {status.kind === "sending" ? "Sending" : endpoint ? "Request a demo" : "Prepare my email"}
          </button>
          {!endpoint ? (
            <p className="text-small text-muted-foreground">This opens a ready-to-send email in your own email app.</p>
          ) : null}
        </div>
      </form>

      <div aria-live="polite">
        {status.kind === "sent" || status.kind === "failed" || status.kind === "mailto" ? (
          <div ref={resultRef} tabIndex={-1} className="mt-8 rounded-control border border-input bg-card px-5 py-4">
            {status.kind === "sent" ? (
              <>
                <p className="font-semibold text-success">We have your request.</p>
                <p className="mt-1 text-small text-foreground">
                  We will reply to the email address you gave. To add anything, write to{" "}
                  <a href={`mailto:${email}`} className="text-primary underline underline-offset-4">
                    {email}
                  </a>
                  .
                </p>
              </>
            ) : null}
            {status.kind === "failed" ? (
              <>
                <p className="font-semibold text-destructive">Your request did not go through.</p>
                <p className="mt-1 text-small text-foreground">
                  Nothing was sent. You can send the same details by email instead.
                </p>
                <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <a href={status.href} className={buttonClasses({ variant: "secondary", size: "md" })}>
                    Open it in my email app
                  </a>
                  <span className="text-small text-muted-foreground">
                    or write to <span className="select-all text-foreground">{email}</span>
                  </span>
                </p>
              </>
            ) : null}
            {status.kind === "mailto" ? (
              <>
                <p className="font-semibold text-foreground">Your email is ready. It has not been sent yet.</p>
                <p className="mt-1 text-small text-foreground">
                  Open it in your email app, check it and press send. If the link does nothing, copy your details into
                  an email to <span className="select-all font-semibold">{email}</span>.
                </p>
                <p className="mt-3">
                  <a href={status.href} className={buttonClasses({ variant: "primary", size: "md" })}>
                    Open it in my email app
                  </a>
                </p>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
