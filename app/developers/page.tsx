import { ArrowRight, FileSpreadsheet, Gauge, KeyRound, ListChecks, RefreshCw, Workflow } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/home/SectionHeading";
import { CodeBlock } from "@/components/product/CodeBlock";
import { MockStage } from "@/components/product/MockStage";
import { ApiKeysCard } from "@/components/product/screens/SettingsScreen";
import { Badge, Breadcrumbs, Button, Container, Section } from "@/components/ui";
import {
  endpoints,
  scopes,
  sendMessageExample,
  sendMessageResponse,
  signatureExample,
  webhookEvents,
  webhookPayloadExample,
} from "@/content/developers";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Developers: WhatsApp API and webhooks",
  description:
    "A REST API to send WhatsApp messages, manage contacts and launch broadcasts with scoped keys, plus signed webhooks for messages, orders, payments and bookings.",
  path: "/developers",
});

const methodTone = { GET: "success", POST: "primary", PATCH: "warning", DELETE: "neutral" } as const;

const tableWrap = "overflow-x-auto rounded-2xl border border-border bg-card";
const th = "px-4 py-3 text-left text-small font-semibold text-foreground";
const td = "px-4 py-3 align-top text-small";

export default function DevelopersPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden />
        <Container className="relative grid gap-12 pt-10 pb-14 md:pt-14 md:pb-20 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Breadcrumbs items={[{ name: "Developers", path: "/developers" }]} className="mb-8" />
            <h1 className="text-hero">A WhatsApp API for your own systems</h1>
            <p className="mt-5 max-w-xl text-lead text-muted-foreground">
              Send messages, keep contacts in sync and launch broadcasts from your code. Get signed webhooks the moment
              a message, order, payment or booking comes in. Every key does only what its scopes allow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Get API access
              </Button>
              <Button href="#endpoints" variant="secondary" size="lg" iconRight={<ArrowRight size={18} aria-hidden />}>
                See the endpoints
              </Button>
            </div>
          </div>
          <div className="min-w-0 space-y-3">
            <CodeBlock title="Send a WhatsApp template message" language="bash" code={sendMessageExample} />
            <CodeBlock title="Response" language="json" code={sendMessageResponse} />
          </div>
        </Container>
      </section>

      <Section labelledBy="basics-heading" tone="surface">
        <SectionHeading
          id="basics-heading"
          eyebrow="The basics"
          title="REST, JSON and bearer keys"
          intro="Base URL https://app.bodhinoxconnect.in/api/v1. Every request sends an API key as a bearer token, and every answer is either a data object or an error with a stable code."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: KeyRound,
              title: "Keys shown once",
              body: "Admins and owners create keys in Settings, API & webhooks. Only a hash is stored, so the full key is shown once. Revoking works on the next request.",
            },
            {
              icon: ListChecks,
              title: "Scoped to one workspace",
              body: "A key acts on the workspace it was made in and only within its scopes, whoever created it.",
            },
            {
              icon: Gauge,
              title: "120 requests a minute",
              body: "Limits are per key. A 429 comes with Retry-After and X-RateLimit headers so you know when to try again.",
            },
            {
              icon: Workflow,
              title: "Cursor pagination",
              body: "List endpoints take limit (up to 100) and return next_cursor, which stays stable while new rows arrive.",
            },
          ].map((p) => (
            <li key={p.title} className="rounded-2xl border border-border bg-card-2 p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <p.icon className="size-5" aria-hidden />
              </span>
              <p className="mt-4 font-semibold text-foreground">{p.title}</p>
              <p className="mt-1.5 text-small text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-small text-muted-foreground">
          Phone numbers are sent in E.164 form with a leading + and country code, such as +919876543210. Free-form
          text, media and replies only go out inside the 24-hour customer service window; outside it the API answers{" "}
          <code className="font-mono text-foreground">409 window_closed</code> and nothing is sent, so use an approved
          template instead. Contacts who replied STOP are skipped in broadcasts.
        </p>
      </Section>

      <Section id="endpoints" labelledBy="endpoints-heading">
        <SectionHeading
          id="endpoints-heading"
          eyebrow="Reference"
          title="Endpoints"
          intro="Messages, contacts, contact flows, conversations, broadcasts and webhooks."
        />
        <div className={`mt-10 ${tableWrap}`}>
          <table className="w-full min-w-[720px] border-collapse">
            <caption className="sr-only">Public API endpoints with the scope each one needs</caption>
            <thead className="border-b border-border bg-muted">
              <tr>
                <th scope="col" className={th}>
                  Endpoint
                </th>
                <th scope="col" className={th}>
                  Scope
                </th>
                <th scope="col" className={th}>
                  What it does
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {endpoints.map((e) => (
                <tr key={`${e.method} ${e.path}`}>
                  <td className={td}>
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <Badge tone={methodTone[e.method]} className="w-16 justify-center font-mono">
                        {e.method}
                      </Badge>
                      <code className="font-mono text-[0.8125rem] text-foreground">{e.path}</code>
                    </span>
                  </td>
                  <td className={td}>
                    <code className="font-mono text-[0.8125rem] whitespace-nowrap text-muted-foreground">{e.scope}</code>
                  </td>
                  <td className={`${td} text-muted-foreground`}>{e.does}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section labelledBy="scopes-heading" tone="surface">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              id="scopes-heading"
              eyebrow="Scopes"
              title="Give each key only what it needs"
              intro="A key with no scopes can still call /me, which is handy for checking that a key works."
            />
            <div className={`mt-8 ${tableWrap}`}>
              <table className="w-full border-collapse">
                <caption className="sr-only">API key scopes</caption>
                <thead className="border-b border-border bg-muted">
                  <tr>
                    <th scope="col" className={th}>
                      Scope
                    </th>
                    <th scope="col" className={th}>
                      Allows
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {scopes.map((s) => (
                    <tr key={s.scope}>
                      <td className={td}>
                        <code className="font-mono text-[0.8125rem] whitespace-nowrap text-foreground">{s.scope}</code>
                      </td>
                      <td className={`${td} text-muted-foreground`}>{s.allows}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card-2 p-4 sm:p-6">
            <MockStage
              designWidth={620}
              label="Settings, API keys: keys with their scopes and last use, a revoked key, and webhook endpoints with their subscribed events."
            >
              <ApiKeysCard />
            </MockStage>
          </div>
        </div>
      </Section>

      <Section id="webhooks" labelledBy="webhooks-heading">
        <SectionHeading
          id="webhooks-heading"
          eyebrow="Webhooks"
          title="Events pushed to you, signed"
          intro="Register an HTTPS endpoint, choose events and channels (WhatsApp, Instagram or both), and we POST a JSON event as it happens."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className={tableWrap}>
            <table className="w-full min-w-[520px] border-collapse">
              <caption className="sr-only">Webhook events</caption>
              <thead className="border-b border-border bg-muted">
                <tr>
                  <th scope="col" className={th}>
                    Event
                  </th>
                  <th scope="col" className={th}>
                    Sent when
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {webhookEvents.map((e) => (
                  <tr key={e.event}>
                    <td className={td}>
                      <code className="font-mono text-[0.8125rem] whitespace-nowrap text-foreground">{e.event}</code>
                    </td>
                    <td className={`${td} text-muted-foreground`}>{e.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="min-w-0 space-y-6">
            <CodeBlock title="Delivery body" language="json" code={webhookPayloadExample} />
            <div>
              <h3 className="text-h3">Verify the signature</h3>
              <p className="mt-2 text-small text-muted-foreground">
                Each delivery carries a signature header of the form <code className="font-mono text-foreground">t=…,v1=…</code>,
                where v1 is an HMAC-SHA256 of the timestamp and the raw body with your endpoint secret. The secret is
                shown once when you register the endpoint. Recompute it over the raw body, compare in constant time,
                and reject old timestamps.
              </p>
              <div className="mt-4">
                <CodeBlock title="verify-signature.js" language="js" code={signatureExample} />
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-border bg-card p-5">
              <RefreshCw className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <p className="text-small text-muted-foreground">
                Failed deliveries are retried with backoff, 10 attempts over about 13 minutes. Use the event{" "}
                <code className="font-mono text-foreground">id</code> to ignore repeats, and do not assume order. An
                endpoint that keeps failing for a day is paused and admins are told.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section labelledBy="nocode-heading" tone="surface">
        <div className="grid grid-cols-1 gap-8 rounded-3xl border border-border bg-card-2 p-6 sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <FileSpreadsheet className="size-5" aria-hidden />
            </span>
            <h2 id="nocode-heading" className="mt-4 text-h3">
              Zapier and Google Sheets, without writing code
            </h2>
          </div>
          <div className="space-y-4 lg:col-span-7">
            <p className="text-muted-foreground">
              Point a webhook at a Zapier &quot;Catch Hook&quot; to add every paid order or new lead to a Google Sheet,
              a CRM or your accounting tool. Going the other way, a Zap can call the API with a key to send a WhatsApp
              message or create a contact. Flows can also add a row to Google Sheets directly from the{" "}
              <Link href="/integrations" className="text-primary underline underline-offset-4 hover:text-primary-hover">
                Google Sheets integration
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section labelledBy="developers-cta-heading">
        <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 id="developers-cta-heading" className="text-h2">
              Build on Bodhinox Connect
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tell us what you want to connect and we will set up your workspace and API access.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Get API access
            </Button>
            <Button href="/integrations" variant="secondary" size="lg">
              See integrations
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
