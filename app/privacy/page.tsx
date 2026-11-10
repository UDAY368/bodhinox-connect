import Link from "next/link";
import { ContactDetails, OperatorSentence, SupportEmail } from "@/components/legal/LegalBits";
import { LEGAL_UPDATED, LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { legalLinks } from "@/content/nav";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How Bodhinox Connect collects, uses and protects personal data, including WhatsApp and Meta data from connected accounts, and the choices you have.",
  path: "/privacy",
});

const sections: LegalSection[] = [
  {
    id: "roles",
    title: "1. Two kinds of data, two roles",
    content: (
      <ul>
        <li>
          <strong>Data about our customers (account data).</strong> When you create an account or a workspace, we decide
          how that data is used. We are responsible for it as a data fiduciary.
        </li>
        <li>
          <strong>Data our customers put into a workspace (workspace data).</strong> A business that uses {site.name}{" "}
          (“the workspace”) decides whose data goes in and why: its customers’ names, phone numbers, Instagram handles,
          messages, orders and appointments. We process that data only on the workspace’s instructions, to provide the
          service. The workspace is the data fiduciary and we are its data processor. If you are a customer of a business
          that uses {site.name}, the business’s own privacy notice applies, and requests about your data should go to that
          business first (see <a href="#messaging-a-business">section 9, If you message a business</a>).
        </li>
      </ul>
    ),
  },
  {
    id: "what-we-collect",
    title: "2. What we collect",
    content: (
      <>
        <h3>Account data</h3>
        <ul>
          <li>
            Your name, email address, password (stored only as a one-way hash), language, two-step verification
            settings, and Google sign-in identity if you use it.
          </li>
          <li>
            Your workspaces, your role in each, invitations you send or accept, and an audit record of important actions
            (for example sign-ins, changes to numbers, roles and billing). Sign-in sessions record your browser’s user
            agent.
          </li>
          <li>
            Billing details: plan, invoices, GST number and billing address. Card, UPI and bank details are entered with
            our payment provider (Razorpay) and are not stored by us.
          </li>
          <li>Messages you send to us for support.</li>
        </ul>

        <h3>Workspace data</h3>
        <ul>
          <li>
            <strong>Contacts:</strong> names, phone numbers, WhatsApp or Instagram identifiers, email addresses, tags,
            custom fields, notes, opt-in and opt-out status, and pipeline stages that the workspace adds or that arrive
            with a message.
          </li>
          <li>
            <strong>Conversations:</strong> messages sent and received on connected WhatsApp numbers and Instagram
            accounts, including text, images, video, audio, documents, locations, form answers and delivery and read
            receipts; internal notes and assignments. Instagram messaging is coming soon; this policy already covers it.
          </li>
          <li>
            <strong>Campaigns, templates, flows and automations</strong> the workspace creates, and their delivery
            results, including link clicks (recorded with a hashed IP address, not the address itself).
          </li>
          <li>
            <strong>Commerce:</strong> products, carts, orders, delivery addresses, payment status and refunds, shipment
            and tracking details, invoices.
          </li>
          <li>
            <strong>Appointments and bookings:</strong> the details a customer enters on a booking page, and meeting
            links.
          </li>
          <li>
            <strong>AI data:</strong> knowledge-base documents and web pages the workspace adds, AI-suggested and AI-sent
            replies, and a log of what the AI assistant did.
          </li>
        </ul>

        <h3>Data from connected accounts</h3>
        <p>When a workspace connects another service, we receive what that service sends for the connection to work:</p>
        <ul>
          <li>
            <strong>Meta (WhatsApp Business Platform, Instagram, Facebook Pages and Meta Ads):</strong> business account,
            phone number and page identifiers, an access token, message and status webhooks, template review results,
            account notices (for example restrictions or disconnection), and lead form answers from the workspace’s ads.
            We do not receive your personal Facebook profile, friends or posts.
          </li>
          <li>
            <strong>Razorpay:</strong> payment and refund status for the workspace’s own orders, using the workspace’s
            own Razorpay keys.
          </li>
          <li>
            <strong>Shiprocket:</strong> shipment, courier and tracking status for the workspace’s orders.
          </li>
          <li>
            <strong>Shopify and WooCommerce:</strong> products, orders and customer contact details from the workspace’s
            store.
          </li>
          <li>
            <strong>Zoom:</strong> meeting links and status for appointments.
          </li>
          <li>
            <strong>AI providers</strong> that the workspace connects with its own key.
          </li>
        </ul>

        <h3>Technical data</h3>
        <p>
          Service logs, error reports and security records (IP address, browser, request time) needed to run, secure and
          debug the service. We keep message content, passwords, tokens and other secrets out of logs.
        </p>

        <h3>Data from this website</h3>
        <p>
          If you write to us or use the contact form on {site.domain}, we receive what you send (for example your name,
          work email, phone number, company and message) and use it only to reply to you and to keep a record of the
          conversation.
        </p>

        <p>
          We do not knowingly collect data from children. The service is for businesses and is not directed at anyone
          under 18.
        </p>
      </>
    ),
  },
  {
    id: "why-we-use-it",
    title: "3. Why we use it",
    content: (
      <>
        <ul>
          <li>
            To provide the service: deliver and receive messages, run the workspace’s automations, campaigns, chatbots
            and store, and show the inbox, reports and analytics.
          </li>
          <li>To create and secure accounts, verify sign-ins, detect abuse and keep the service available.</li>
          <li>To bill for plans and keep tax and accounting records.</li>
          <li>
            To support you when you ask, and to tell you about changes to the service, our terms or this policy.
          </li>
          <li>To meet legal obligations and respond to lawful requests.</li>
        </ul>
        <p>
          We do not sell personal data. We do not use workspace data to advertise to anyone, and we do not use it to
          train AI models.
        </p>
      </>
    ),
  },
  {
    id: "ai-processing",
    title: "4. AI processing",
    content: (
      <p>
        AI features are optional and controlled by the workspace. When they are on, the parts of a conversation, contact
        record and knowledge base needed for a task (for example the recent messages of one conversation) are sent to the
        AI provider the workspace chose: Google Gemini through our key, or a provider such as OpenAI, Anthropic or
        OpenRouter through the workspace’s own key. The provider returns a suggested reply, summary or classification.
        The workspace decides whether AI replies are sent automatically or reviewed by an agent first, and can hand any
        conversation to a person. Each provider processes this data under its own terms; when a workspace uses its own
        key, it is the workspace’s agreement with that provider that applies.
      </p>
    ),
  },
  {
    id: "who-can-see-it",
    title: "5. Who can see your data",
    content: (
      <>
        <ul>
          <li>
            <strong>Members of the workspace,</strong> according to the role the workspace gives them. A workspace can
            hide customers’ phone numbers from some members.
          </li>
          <li>
            <strong>Our staff,</strong> only to keep the service running, to investigate a problem the workspace reports,
            or when the law requires. Support access to a workspace is limited, time-bound and recorded.
          </li>
          <li>
            <strong>Service providers (processors)</strong> that run parts of the service for us, under contracts that
            limit their use of the data to that purpose: cloud hosting and database (Railway), file and media storage,
            email delivery, payment processing (Razorpay), form handling for this website&apos;s contact form, and AI
            processing (see <a href="#ai-processing">section 4, AI processing</a>).
          </li>
          <li>
            <strong>Services the workspace connects</strong> (Meta, Razorpay, Shiprocket, Shopify, WooCommerce, Zoom, AI
            providers): messages and orders go to them because the workspace asked us to send them there. Each processes
            the data under its own policy.
          </li>
          <li>
            <strong>Authorities,</strong> when Indian law requires it, or to protect the rights, property or safety of
            our users, the public or us.
          </li>
          <li>
            <strong>A buyer or successor</strong> if the business is reorganised or sold, under this policy.
          </li>
        </ul>
        <p>
          Some of these providers store or process data outside India. Where they do, we rely on their contractual and
          security commitments and transfer data only as Indian law allows.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "6. How long we keep data",
    content: (
      <>
        <ul>
          <li>
            <strong>Account data:</strong> while your account exists. When you delete your account, your sign-in
            identity is anonymised and your sessions and API keys are revoked at once; an audit identity remains in the
            workspaces you belonged to.
          </li>
          <li>
            <strong>Workspace data:</strong> while the workspace exists. When the owner deletes a workspace, it closes for
            30 days so the request can be cancelled, then it is erased, except records we must keep by law.
          </li>
          <li>
            <strong>Exports:</strong> a workspace export file is available for 7 days and then removed.
          </li>
          <li>
            <strong>Reports:</strong> generated report files are removed after 30 days.
          </li>
          <li>
            <strong>Billing, invoice and tax records:</strong> for as long as Indian tax and accounting law requires.
          </li>
          <li>
            <strong>Logs and security records:</strong> for as long as needed to secure the service and investigate
            incidents, then deleted.
          </li>
          <li>
            <strong>Messages you send us through this website:</strong> for as long as needed to answer you and keep a
            record of the conversation.
          </li>
        </ul>
        <p>A workspace can delete individual contacts and their conversations at any time.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "7. Security",
    content: (
      <p>
        Data is encrypted in transit (HTTPS). Access tokens for connected accounts are encrypted at rest. Each
        workspace’s data is separated in the database by row-level security, so one workspace cannot read another’s.
        Passwords are hashed, two-step verification is available, sensitive actions need a recent sign-in, and important
        actions are recorded in an audit log. No system is perfectly secure; if a breach affects your personal data we
        will tell you and the authorities as the law requires.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "8. Your choices and rights",
    content: (
      <>
        <p>Depending on where you are, you have the right to:</p>
        <ul>
          <li>
            <strong>access</strong> the personal data we hold about you and know who it was shared with;
          </li>
          <li>
            <strong>correct</strong> or <strong>complete</strong> inaccurate data;
          </li>
          <li>
            <strong>erase</strong> data we no longer need or that you withdraw consent for, unless the law requires us to
            keep it;
          </li>
          <li>
            <strong>withdraw consent</strong> at any time (this does not affect processing before the withdrawal);
          </li>
          <li>
            <strong>nominate</strong> another person to exercise your rights if you die or become unable to;
          </li>
          <li>
            <strong>raise a grievance</strong> with us, and if we do not resolve it, complain to the Data Protection
            Board of India.
          </li>
        </ul>
        <p>
          Many of these are self-service: you can update your profile, export a workspace, leave a workspace, delete a
          workspace or delete your account from <strong>Settings → Privacy &amp; access</strong> in the app. Disconnecting
          a WhatsApp number, Instagram account or other integration stops new data from it. For anything else, write to{" "}
          <SupportEmail />.
        </p>
      </>
    ),
  },
  {
    id: "messaging-a-business",
    title: `9. If you message a business that uses ${site.name}`,
    content: (
      <p>
        The business you are messaging controls your data in its workspace. To see, correct or delete your messages or
        contact details, or to stop messages, contact that business; replying STOP on WhatsApp opts you out of its
        campaigns. If you cannot reach the business, write to <SupportEmail /> and we will pass your request on and help
        where we can.
      </p>
    ),
  },
  {
    id: "meta-data",
    title: "10. Facebook and Meta data",
    content: (
      <p>
        If you connected a Facebook account to {site.name} and want the data removed, see{" "}
        <Link href={legalLinks.dataDeletion}>Data deletion</Link>. Removing the app in your Facebook settings withdraws
        our access at once.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "11. Cookies",
    content: (
      <>
        <p>
          <strong>This website ({site.domain}) sets no tracking or analytics cookies</strong>, and no advertising or
          third-party tracking scripts run on it. If you choose a light or dark theme, your browser remembers that choice
          in its own local storage; it stays on your device and is never sent to us. If we ever add analytics to this
          website, we will ask for your consent first and update this policy.
        </p>
        <p>
          The {site.name} app uses only the cookies the service needs to keep you signed in and protect forms from
          cross-site requests. We do not use advertising or third-party tracking cookies.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "12. Changes",
    content: (
      <p>
        We may update this policy. We will post the new version here with its date, and tell account holders about
        material changes by email or in the app before they take effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "13. Contact and grievances",
    content: (
      <>
        <p>
          For privacy questions, requests and grievances, write to <SupportEmail />. We acknowledge requests within 3
          working days and complete verified requests within 30 days.
        </p>
        <ContactDetails />
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      title="Privacy policy"
      crumb="Privacy policy"
      path={legalLinks.privacy}
      updated={LEGAL_UPDATED}
      sections={sections}
      intro={
        <>
          <p>
            This policy explains what personal data {site.name} collects, why, who it is shared with, how long it is
            kept, and the choices and rights you have. It applies to this website ({site.domain}), the {site.name} web
            application and its public pages (booking and shop links), and to the messages the service sends and
            receives for its customers.
          </p>
          <p>
            {site.name} is a customer messaging and CRM service for businesses: a shared WhatsApp inbox (with Instagram
            coming soon) with contacts, pipelines, campaigns, automations and chatbots, AI replies, appointments, a store
            with payments and shipping, and analytics. It is provided from India and is built to meet the Digital
            Personal Data Protection Act, 2023 and the Information Technology Act, 2000.
          </p>
          <OperatorSentence />
        </>
      }
    />
  );
}
