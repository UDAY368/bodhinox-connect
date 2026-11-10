import Link from "next/link";
import { ContactDetails, OperatorSentence, SupportEmail } from "@/components/legal/LegalBits";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { legalLinks } from "@/content/nav";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of service",
  description:
    "The terms that apply when you use Bodhinox Connect, the WhatsApp customer platform: accounts, plans and billing, acceptable use, data and liability.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "the-service",
    title: "1. The service",
    content: (
      <p>
        {site.name} is a customer messaging and CRM service for businesses: a shared inbox for WhatsApp (with Instagram
        coming soon), contacts and pipelines, campaigns and templates, automations, chatbots and forms, AI replies,
        appointments, a store with payments and shipping, analytics and an API. Features depend on your plan. We may
        improve or change features; we will not remove a core feature of a paid plan during a period you have paid for
        without notice and, where it matters, a fair remedy.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "2. Accounts and workspaces",
    content: (
      <ul>
        <li>You must be at least 18 and give accurate information.</li>
        <li>
          Keep your password and two-step verification secure, and tell us promptly about any unauthorised use. You are
          responsible for activity in your account.
        </li>
        <li>
          A workspace belongs to its owner. The owner decides who joins, what role they have and what happens to the
          workspace. Members act on behalf of the owner.
        </li>
      </ul>
    ),
  },
  {
    id: "third-party-platforms",
    title: "3. Third-party platforms",
    content: (
      <>
        <p>
          The service connects to platforms we do not control, including Meta (WhatsApp Business Platform, Instagram,
          Facebook and Meta Ads), Razorpay, Shiprocket, Shopify, WooCommerce, Zoom and AI providers. To use them you must
          accept and follow their terms and policies, including the{" "}
          <a href="https://www.whatsapp.com/legal/business-terms" rel="noopener noreferrer">
            WhatsApp Business Terms of Service
          </a>
          , the{" "}
          <a href="https://business.whatsapp.com/policy" rel="noopener noreferrer">
            WhatsApp Business Messaging Policy
          </a>{" "}
          and{" "}
          <a href="https://www.facebook.com/policies_center/commerce" rel="noopener noreferrer">
            Meta’s Commerce Policy
          </a>
          .
        </p>
        <p>
          Those platforms set their own fees (for example Meta’s per-message charges), limits, reviews and decisions.
          They may restrict, suspend or disconnect your account or number, and we cannot override that. We are not
          responsible for their services, outages or decisions, but we will show you what they tell us and help you
          respond.
        </p>
        <p>
          You connect your own WhatsApp Business Account and phone number to {site.name}, and you keep ownership of
          them. {site.name} is not affiliated with or endorsed by Meta.
        </p>
      </>
    ),
  },
  {
    id: "your-content",
    title: "4. Your content and your customers",
    content: (
      <ul>
        <li>
          You keep ownership of everything you and your customers put into the service. You give us the rights we need to
          host, process and transmit it to provide the service to you.
        </li>
        <li>
          You are the data fiduciary for your customers’ personal data and we process it on your behalf, as described in
          the <Link href={legalLinks.privacy}>Privacy policy</Link>. You are responsible for having a lawful basis,
          including any consent required, to collect your customers’ data and to message them, for honouring opt-outs,
          and for your own privacy notice to them.
        </li>
        <li>
          You are responsible for the content you send, including messages written or suggested by AI that you choose to
          send or to send automatically.
        </li>
      </ul>
    ),
  },
  {
    id: "acceptable-use",
    title: "5. Acceptable use",
    content: (
      <>
        <p>You must not use the service to:</p>
        <ul>
          <li>send spam, unsolicited bulk messages or messages to people who have opted out;</li>
          <li>
            send unlawful, misleading, fraudulent, harassing, hateful or sexually explicit content, or sell goods or
            services that the law or the connected platforms prohibit;
          </li>
          <li>infringe anyone’s intellectual property, privacy or other rights;</li>
          <li>
            break Indian law, including the Information Technology Act, 2000, the Digital Personal Data Protection Act,
            2023 and TRAI and consumer protection rules that apply to you;
          </li>
          <li>probe, overload or break the service’s security, or access another workspace’s data;</li>
          <li>resell the service or use it to build a competing product without our written agreement.</li>
        </ul>
        <p>
          The <Link href={legalLinks.acceptableUse}>Acceptable use and messaging policy</Link> sets out these rules in
          more detail, including opt-in, opt-out and template rules, and forms part of these terms.
        </p>
        <p>
          We may remove content or suspend sending to stop a breach, to comply with the law or a platform’s instructions,
          or to protect other customers. Where we can, we tell you first and give you a chance to fix the problem.
        </p>
      </>
    ),
  },
  {
    id: "ai-features",
    title: "6. AI features",
    content: (
      <p>
        AI features are optional. AI output can be wrong or incomplete; review it before relying on it, and keep a human
        handover available for conversations the AI cannot handle. When you connect your own AI provider key, your
        agreement with that provider applies to its use and charges.
      </p>
    ),
  },
  {
    id: "payment",
    title: "7. Plans, payment and taxes",
    content: (
      <ul>
        <li>
          Paid plans are billed in advance in Indian rupees through Razorpay and renew automatically for the same period
          until cancelled. A price that does not say whether GST is included includes it. Prices on our{" "}
          <Link href="/pricing">pricing page</Link> are stated before 18% GST, which is added at checkout. We issue GST
          invoices.
        </li>
        <li>
          If a payment fails, we will remind you; after a grace period, sending may be paused until payment succeeds.
          Receiving messages and opt-outs continues.
        </li>
        <li>
          You can cancel at any time; cancelling takes effect at the end of the paid period. Fees already paid are not
          refunded except where the law requires or we agree in writing.
        </li>
        <li>
          Your plan’s features and limits stay as they were when you subscribed, including at renewal. If we change a
          plan’s price, we will tell you before it applies to your next renewal.
        </li>
        <li>
          Charges from connected platforms (for example Meta’s message charges, payment gateway fees, shipping charges or
          AI usage on your own key) are between you and that platform.
        </li>
      </ul>
    ),
  },
  {
    id: "availability",
    title: "8. Availability and support",
    content: (
      <p>
        We work to keep the service available and secure, but it is provided over the internet and through third-party
        platforms, so it may sometimes be unavailable or delayed. We may carry out maintenance, where possible at quiet
        times and with notice. Support is available at <SupportEmail /> and through our{" "}
        <Link href="/contact">Contact page</Link>.
      </p>
    ),
  },
  {
    id: "ending",
    title: "9. Ending the service",
    content: (
      <ul>
        <li>
          You can export your data, delete a workspace or delete your account at any time from{" "}
          <strong>Settings → Privacy &amp; access</strong> in the app. A deleted workspace can be restored for 30 days and
          is then erased, as the <Link href={legalLinks.privacy}>Privacy policy</Link> explains.
        </li>
        <li>
          We may suspend or close a workspace that seriously or repeatedly breaks these terms, that a connected platform
          requires us to stop, or whose paid plan remains unpaid after the grace period. Except where the law or an
          urgent risk prevents it, we will give notice and time to export your data.
        </li>
        <li>
          Sections that by their nature continue (for example 4, 10, 11 and 13) survive the end of these terms.
        </li>
      </ul>
    ),
  },
  {
    id: "disclaimers",
    title: "10. Disclaimers",
    content: (
      <p>
        Except as these terms expressly say, the service is provided “as is” and “as available”. To the extent the law
        allows, we disclaim implied warranties of merchantability, fitness for a particular purpose and
        non-infringement. We do not promise that messages will be delivered, that a platform will approve a template,
        number or account, or that AI output will be accurate.
      </p>
    ),
  },
  {
    id: "liability",
    title: "11. Limitation of liability",
    content: (
      <>
        <p>To the extent the law allows:</p>
        <ul>
          <li>
            we are not liable for indirect, incidental, special or consequential loss, or for loss of profits, revenue,
            goodwill or data that you could have exported;
          </li>
          <li>we are not liable for the acts, omissions or decisions of connected platforms;</li>
          <li>
            our total liability for all claims relating to the service in any 12 months is limited to the fees you paid
            us for the service in those 12 months.
          </li>
        </ul>
        <p>Nothing in these terms limits liability that cannot be limited by law, such as liability for fraud.</p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "12. Indemnity",
    content: (
      <p>
        You will compensate us for reasonable losses and costs arising from claims by third parties (including connected
        platforms and your customers) that result from your content, your messages, or your breach of these terms or the
        law.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "13. Governing law and disputes",
    content: (
      <p>
        These terms are governed by the laws of India. Before starting formal proceedings, please write to{" "}
        <SupportEmail /> so we can try to resolve the dispute informally within 30 days. Any dispute that is not resolved
        will be decided by the competent courts in India.
      </p>
    ),
  },
  {
    id: "changes",
    title: "14. Changes",
    content: (
      <p>
        We may update these terms. We will post the new version here with its date and tell account holders about
        material changes by email or in the app before they take effect; where required, we will ask you to accept them.
        If you do not agree, you can stop using the service and delete your account.
      </p>
    ),
  },
  {
    id: "contact",
    title: "15. Contact",
    content: (
      <>
        <p>Questions about these terms: write to us.</p>
        <ContactDetails />
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      title="Terms of service"
      crumb="Terms of service"
      path={legalLinks.terms}
      sections={sections}
      intro={
        <>
          <p>
            These terms are an agreement between you and us for the use of the {site.name} website ({site.domain}) and
            service. By creating an account, accepting an invitation or using a workspace, you agree to them. If you use
            the service for a business, you confirm that you may bind that business, and “you” includes it.
          </p>
          <OperatorSentence />
        </>
      }
    />
  );
}
