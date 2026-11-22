import Link from "next/link";
import { MockStage } from "@/components/product/MockStage";
import { PhoneStage } from "@/components/product/Phone";
import { TemplatePhone } from "@/components/product/screens/CampaignsScreen";
import { InboxScreen } from "@/components/product/screens/InboxScreen";
import { NumbersHealthCard } from "@/components/product/screens/SettingsScreen";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Prose } from "@/components/ui/Prose";
import { company } from "@/content/company";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How we use the WhatsApp Business Platform",
  description:
    "How Bodhinox Connect uses the WhatsApp Business Platform: Embedded Signup, the permissions we request, how Meta bills you, your data, and how to disconnect.",
  path: "/whatsapp-business-platform",
});

const toc = [
  { id: "summary", title: "In short" },
  { id: "embedded-signup", title: "Connecting with Embedded Signup" },
  { id: "permissions", title: "Permissions we use" },
  { id: "templates", title: "Templates and Meta approval" },
  { id: "billing", title: "Who bills what" },
  { id: "data", title: "How we handle data" },
  { id: "disconnect", title: "Disconnecting and deleting data" },
  { id: "messaging-rules", title: "Messaging rules" },
  { id: "contact", title: "Questions" },
];

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden />
        <Container className="relative pt-10 pb-12 text-center md:pt-14 md:pb-16">
          <Breadcrumbs
            items={[{ name: "WhatsApp Business Platform", path: "/whatsapp-business-platform" }]}
            className="mb-8 flex justify-center"
          />
          <Eyebrow>Platform and permissions</Eyebrow>
          <h1 className="mx-auto mt-3 max-w-3xl text-hero">How {site.name} uses the WhatsApp Business Platform</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-muted-foreground">
            This page explains, for businesses and for Meta reviewers, how {site.name} connects to WhatsApp, what it does
            with the access you give it, who bills you for what, and how to remove that access and your data.
          </p>
          <div className="mx-auto mt-14 max-w-[1200px] [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
            <MockStage
              designWidth={1280}
              label="The shared inbox: WhatsApp and Instagram conversations, an open chat with the 24-hour window ring, and the contact panel."
            >
              <InboxScreen height={640} />
            </MockStage>
          </div>
        </Container>
      </section>

      <Container className="pb-16 md:pb-24">
        <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-labelledby="platform-toc" className="lg:sticky lg:top-24 lg:self-start">
            <h2 id="platform-toc" className="font-mono text-micro font-medium tracking-[0.08em] text-muted-foreground uppercase">
              On this page
            </h2>
            <ol className="mt-4 space-y-2.5 border-l border-border pl-4 text-small">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-foreground underline-offset-4 hover:text-primary hover:underline">
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0">
            <Prose as="div">
              <h2 id="summary">In short</h2>
              <ul>
                <li>
                  {site.name} is software that runs on the WhatsApp Business Platform from Meta, using the Cloud API that
                  Meta hosts.
                </li>
                <li>
                  Each business connects its <strong>own</strong> WhatsApp Business Account and phone number through
                  Meta&apos;s Embedded Signup. The account and number stay in that business&apos;s Meta business portfolio.
                </li>
                <li>
                  For WhatsApp messaging we use two core permissions: <code>whatsapp_business_messaging</code> to send and
                  receive messages, and <code>whatsapp_business_management</code> to manage templates and phone numbers. A
                  few other Meta permissions are asked for only when you turn on the feature that needs them.
                </li>
                <li>WhatsApp message charges are set by Meta and passed on at Meta&apos;s published rate with zero markup. Our plan prices do not include them.</li>
                <li>
                  A business can disconnect at any time, from {site.name} or from Meta, and can delete its data from{" "}
                  {site.name}.
                </li>
              </ul>
              <p>
                WhatsApp and Meta are trademarks of Meta Platforms, Inc. {site.name} is not affiliated with or endorsed by
                Meta.
              </p>

              <h2 id="embedded-signup">Connecting with Embedded Signup</h2>
              <p>
                Businesses connect WhatsApp to {site.name} through Embedded Signup, a guided window that Meta provides and
                runs. We never ask for your Facebook password, and we never see it.
              </p>
              <ol>
                <li>
                  In {site.name}, the workspace owner or an admin chooses to connect a WhatsApp number. Meta&apos;s window
                  opens.
                </li>
                <li>You log in to Facebook in that window and pick, or create, your Meta business portfolio.</li>
                <li>You pick, or create, the WhatsApp Business Account to use.</li>
                <li>
                  You add a phone number, verify it with the code Meta sends by SMS or voice call, and set the display name
                  customers will see.
                </li>
                <li>
                  Meta shows exactly which permissions {site.name} is asking for, and for which accounts. You approve them.
                </li>
                <li>
                  {site.name} receives access for the accounts you selected, registers the number on the Cloud API and
                  subscribes to its message updates. The number is then ready in your inbox.
                </li>
              </ol>
              <p>
                <strong>You keep ownership.</strong> The WhatsApp Business Account, the phone number, its display name and
                its templates all belong to your business in Meta. {site.name} only works with the accounts you chose in
                this window. If you leave, you take the account and number with you, along with your approved templates.
              </p>
            </Prose>

            <figure className="my-8 max-w-reading rounded-3xl border border-border bg-card-2 p-4 sm:p-6">
              <MockStage
                designWidth={520}
                label="Settings, Channels: two connected WhatsApp numbers with quality rating, messaging limit and display name status, and an Instagram account."
              >
                <NumbersHealthCard />
              </MockStage>
              <figcaption className="mt-3 text-small text-muted-foreground">
                Each connected number with the quality rating, messaging limit and display name status Meta reports.
              </figcaption>
            </figure>

            <Prose as="div">

              <h2 id="permissions">Permissions we use and why</h2>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Permission</th>
                    <th scope="col">What {site.name} does with it</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>whatsapp_business_messaging</code>
                    </td>
                    <td>
                      Sends the messages your team, campaigns, flows and AI agent write: text, media, templates, buttons,
                      lists, product messages and WhatsApp Forms. Receives your customers&apos; messages and the sent,
                      delivered, read and failed status of every message you send, so they appear in your inbox and
                      reports.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>whatsapp_business_management</code>
                    </td>
                    <td>
                      Reads your WhatsApp Business Account and its phone numbers, quality rating and messaging limit.
                      Creates and submits the message templates you build, reads their review status and category, and
                      deletes templates when you ask. Creates and publishes the WhatsApp Forms (Meta Flows) you build. Registers phone numbers and subscribes {site.name} to account updates,
                      such as template reviews, quality changes and account notices.
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3 id="other-permissions">Other Meta permissions, used only if you turn on the feature</h3>
              <p>
                These are asked for in a separate Meta permission window, at the moment you switch the feature on. If you
                never use the feature, {site.name} never asks for them.
              </p>
              <ul>
                <li>
                  <code>catalog_management</code>: syncs your Meta catalogue so you can send product messages.
                </li>
                <li>
                  <code>whatsapp_business_manage_events</code>: sends the conversion events you choose to enable back to
                  Meta.
                </li>
                <li>
                  <code>ads_read</code>: reads results for your click-to-WhatsApp ads, so you can see which ads start
                  chats.
                </li>
                <li>
                  <code>leads_retrieval</code>, <code>pages_read_engagement</code>, <code>pages_manage_metadata</code> and{" "}
                  <code>pages_manage_ads</code>: receive the answers people submit in your Facebook lead forms, so the
                  leads appear as contacts.
                </li>
              </ul>
              <p>
                We use this access only to run the features you use in your workspace. We do not use it to message anyone
                on our own behalf, and we do not read or change accounts, Pages or ad accounts you did not select.
              </p>

              <h2 id="templates">Templates and Meta approval</h2>
              <p>
                To start a conversation, or to message a customer more than 24 hours after their last message, WhatsApp
                requires an approved template. You write templates in {site.name} and choose a category:{" "}
                <strong>Marketing</strong>, <strong>Utility</strong> or <strong>Authentication</strong>. We submit them to
                Meta for you.
              </p>
              <p>
                <strong>Meta decides whether a template is approved, and in which category.</strong> {site.name} cannot
                approve a template or change Meta&apos;s decision. We show each template&apos;s status as Meta reports it:
                in review, approved, rejected, paused or disabled, with Meta&apos;s reason where it gives one. Inside the
                24-hour customer service window, your team can reply freely without a template.
              </p>
            </Prose>

            <figure className="my-8 max-w-reading">
              <PhoneStage className="py-10">
                <MockStage
                  designWidth={320}
                  label="An approved marketing template on a phone: a carousel of offers, the customer's tap on Buy now, and a reply with a payment link."
                  className="max-w-[300px]"
                >
                  <TemplatePhone />
                </MockStage>
              </PhoneStage>
              <figcaption className="mt-3 text-small text-muted-foreground">
                An approved carousel template as the customer sees it, and the reply inside the 24-hour window.
              </figcaption>
            </figure>

            <Prose as="div" className="mt-4">
              <h2 id="billing">Who bills what</h2>
              <ul>
                <li>
                  <strong>Meta</strong> charges for WhatsApp messages, per message, based on the template category and the
                  recipient&apos;s country, at Meta&apos;s published rates. We pass these charges on at exactly Meta&apos;s
                  rate, with zero markup, from a prepaid wallet in your workspace. Under Meta&apos;s current pricing, each
                  number gets 1,000 free service replies a month inside the 24-hour customer service window, and messages
                  customers send you are free.
                </li>
                <li>
                  <strong>{site.name}</strong> charges only for its plan, in INR with GST extra. Plan prices do not include
                  Meta&apos;s charges, and we do not add a markup to them.
                </li>
              </ul>
              <p>
                See <Link href="/pricing">pricing</Link> for plans.
              </p>

              <h2 id="data">How we handle data</h2>
              <p>When you connect a number, {site.name} stores what it needs to run your workspace:</p>
              <ul>
                <li>your WhatsApp Business Account, phone number and display name identifiers;</li>
                <li>the access token Meta issues for those accounts;</li>
                <li>
                  messages sent and received on the number, with media, delivery and read statuses, and the contacts they
                  belong to;
                </li>
                <li>your templates, their review results, and account notices from Meta.</li>
              </ul>
              <p>How we protect it:</p>
              <ul>
                <li>Data is encrypted in transit (HTTPS), and access tokens are encrypted at rest.</li>
                <li>
                  Access tokens stay on our servers. They are never sent to the browser or shown to any user, including
                  your own team.
                </li>
                <li>
                  Each workspace&apos;s data is separated in the database, so one workspace cannot read another&apos;s.
                </li>
                <li>Roles (owner, admin, agent and viewer) control what each person in your team can do.</li>
                <li>
                  We do not sell personal data, we do not use workspace data to advertise to anyone, and we do not use it to
                  train AI models.
                </li>
                <li>We do not receive your personal Facebook profile, friends or posts.</li>
              </ul>
              <p>
                Your messages and contacts belong to your business. The <Link href="/privacy">privacy policy</Link> covers
                this in full, including the service providers we use and how long data is kept.
              </p>

              <h2 id="disconnect">Disconnecting and deleting data</h2>
              <h3>Disconnect a number in {site.name}</h3>
              <p>
                The workspace owner or an admin opens <strong>Settings</strong> and disconnects the WhatsApp number. Sending
                and receiving stop, no new data arrives from that number, and we delete our access token for it.
              </p>
              <h3>Remove our access in Meta</h3>
              <p>
                You can also remove {site.name} from your Meta business portfolio settings, or from your Facebook settings
                under Business integrations. Meta then withdraws our access. When Meta tells us the access was removed, we
                mark the number as disconnected in your workspace.
              </p>
              <h3>Delete your data</h3>
              <p>
                Disconnecting keeps your past conversations in the workspace so you can still read and export them. To erase
                them, the workspace owner deletes the workspace from <strong>Settings → Privacy &amp; access</strong>. The
                workspace can be restored for 30 days in case it was a mistake. After that its contacts, conversations,
                media, campaigns, orders and settings are erased, except billing and tax records the law requires us to
                keep. You can export a copy first.
              </p>
              <p>
                If you messaged a business that uses {site.name}, that business controls your data. Reply STOP to stop its
                campaigns, and ask the business to delete your data. If you cannot reach it, write to us. The full steps are
                on the <Link href="/data-deletion">data deletion</Link> page.
              </p>

              <h2 id="messaging-rules">Messaging rules</h2>
              <p>
                Every business on {site.name} agrees to Meta&apos;s WhatsApp Business Messaging Policy and Commerce Policy
                and to our own rules. In short: get opt-in before you message people, honour STOP and opt-outs at once,
                never use bought or scraped lists, and do not promote anything WhatsApp prohibits. Opt-outs are respected
                across campaigns, flows and automations. Read the{" "}
                <Link href="/acceptable-use">acceptable use and messaging policy</Link> and our{" "}
                <Link href="/terms">terms of service</Link>.
              </p>

              <h2 id="contact">Questions</h2>
              <p>
                For questions about this page, our use of Meta permissions, or a data request, write to{" "}
                <a href={site.mailto}>{site.email}</a>. {site.name} is operated by {company.legalName || company.operator}{" "}
                in {company.country}.
              </p>
            </Prose>

            <div className="mt-10 flex max-w-reading flex-wrap gap-3 border-t border-border pt-8">
              <Button href="/privacy" variant="secondary">
                Privacy policy
              </Button>
              <Button href="/data-deletion" variant="secondary">
                Data deletion
              </Button>
              <Button href="/acceptable-use" variant="secondary">
                Acceptable use
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
