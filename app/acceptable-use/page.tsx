import Link from "next/link";
import type { ReactNode } from "react";
import { ContactDetails, SupportEmail } from "@/components/legal/LegalBits";
import { LEGAL_UPDATED, LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { legalLinks } from "@/content/nav";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Acceptable use and messaging policy",
  description:
    "The messaging rules for Bodhinox Connect: opt-in before you message, honour STOP, follow WhatsApp policies, no spam or bought lists, and template rules.",
  path: "/acceptable-use",
});

const metaPolicies = {
  businessTerms: "https://www.whatsapp.com/legal/business-terms",
  messaging: "https://business.whatsapp.com/policy",
  commerce: "https://www.whatsapp.com/legal/commerce-policy",
  metaCommerce: "https://www.facebook.com/policies_center/commerce",
};

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} rel="noopener noreferrer">
      {children}
    </a>
  );
}

const sections: LegalSection[] = [
  {
    id: "who-this-applies-to",
    title: "1. Who this policy applies to",
    content: (
      <>
        <p>
          This policy applies to every workspace on {site.name}, to everyone who uses one, and to every message,
          template, campaign, flow, automation and AI reply sent through the service. It forms part of our{" "}
          <Link href={legalLinks.terms}>Terms of service</Link>.
        </p>
        <p>
          You also agree to follow Meta’s own rules for the WhatsApp Business Platform. Where this policy and Meta’s
          policies differ, the stricter rule applies. The official texts are:
        </p>
        <ul>
          <li>
            <Ext href={metaPolicies.businessTerms}>WhatsApp Business Terms of Service</Ext>
          </li>
          <li>
            <Ext href={metaPolicies.messaging}>WhatsApp Business Messaging Policy</Ext>
          </li>
          <li>
            <Ext href={metaPolicies.commerce}>WhatsApp Commerce Policy</Ext>
          </li>
          <li>
            <Ext href={metaPolicies.metaCommerce}>Meta Commerce Policy</Ext>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "opt-in",
    title: "2. Get opt-in before you message",
    content: (
      <>
        <p>
          You may send a business-initiated WhatsApp message only to a person who has agreed to receive messages from
          your business on WhatsApp. Their opt-in must:
        </p>
        <ul>
          <li>name your business clearly, so the person knows who will message them;</li>
          <li>say that the messages will come on WhatsApp;</li>
          <li>
            be given freely, for example a tick box on your checkout or booking page, a reply in chat, or a signed form,
            and never be pre-ticked or hidden in other terms;
          </li>
          <li>meet the consent rules of Indian law that apply to you, including the Digital Personal Data Protection Act, 2023.</li>
        </ul>
        <p>
          Keep a record of when and how each person opted in. {site.name} stores opt-in and opt-out status on each
          contact, and you must keep it accurate. If Meta or we ask you to show the opt-in for a number, you must be able
          to.
        </p>
        <p>
          A customer who messages you first can receive replies from you within the 24-hour customer service window that
          opens with their last message. That reply window is not consent to marketing.
        </p>
      </>
    ),
  },
  {
    id: "opt-out",
    title: "3. Honour STOP and every opt-out",
    content: (
      <>
        <ul>
          <li>
            Every marketing message must make it easy to stop, for example with a line such as “Reply STOP to stop these
            messages” or an opt-out button.
          </li>
          <li>
            When a person replies STOP, {site.name} marks the contact as opted out. Campaigns, automations and flows skip
            opted-out and blocked contacts.
          </li>
          <li>
            If a person asks you to stop in any other way, such as in chat, by phone or by email, mark them as opted out
            yourself without delay.
          </li>
          <li>
            Do not message an opted-out person again, do not re-import them to get around the opt-out, and do not move
            them to another number or workspace. You may send one message confirming the opt-out.
          </li>
          <li>Opt-outs keep working even if your plan is paused for non-payment.</li>
        </ul>
      </>
    ),
  },
  {
    id: "no-spam",
    title: "4. No spam and no bought lists",
    content: (
      <>
        <p>You must not:</p>
        <ul>
          <li>buy, rent, borrow, scrape or share contact lists, or upload numbers whose owners have not opted in to you;</li>
          <li>send unsolicited bulk messages, or message people who have opted out;</li>
          <li>
            send the same message repeatedly, or send more often than you told people you would when they opted in;
          </li>
          <li>
            use several numbers or workspaces to get around a limit, a block, a low quality rating or a restriction from
            Meta;
          </li>
          <li>
            hide who you are, pretend to be another business or person, or send misleading messages, such as fake
            delivery notices or fake prize offers.
          </li>
        </ul>
        <p>
          Contacts you import by CSV, Shopify, WooCommerce or any other source must already have opted in to WhatsApp
          messages from your business. Importing a number is not consent.
        </p>
      </>
    ),
  },
  {
    id: "prohibited-content",
    title: "5. Prohibited and restricted content",
    content: (
      <>
        <p>
          The WhatsApp Business Messaging Policy and the WhatsApp Commerce Policy prohibit or restrict what businesses can
          offer or promote on WhatsApp. This is a summary for convenience. Meta’s official pages linked in{" "}
          <a href="#who-this-applies-to">section 1, Who this policy applies to</a> are the authority and can change at any time.
        </p>
        <p>You must not use {site.name} to sell, promote or facilitate:</p>
        <ul>
          <li>illegal products or services, or anything that breaks the law where you or your customers are;</li>
          <li>drugs, whether prescription, recreational or illegal, and drug-related products;</li>
          <li>tobacco, e-cigarettes and related products;</li>
          <li>alcohol, except where Meta’s policies and local law permit it;</li>
          <li>weapons, ammunition and explosives;</li>
          <li>unsafe ingestible supplements, and medical or healthcare products Meta does not allow;</li>
          <li>animals, and products from endangered or protected species;</li>
          <li>adult products or services, and sexual services or sexually explicit content;</li>
          <li>body parts and body fluids;</li>
          <li>real-money gambling and betting, except where Meta’s policies and local law permit it;</li>
          <li>dating services;</li>
          <li>
            real, virtual or fake currency, and financial products or documents Meta does not allow, such as fake
            documents or IDs;
          </li>
          <li>hazardous goods and materials, and recalled products;</li>
          <li>counterfeit goods, or anything that infringes someone else’s intellectual property;</li>
          <li>
            human exploitation, including trafficking, and discriminatory, hateful, violent or misleading products or
            content.
          </li>
        </ul>
        <p>You must also not:</p>
        <ul>
          <li>
            ask customers to send full card numbers, bank account numbers, national identity numbers such as Aadhaar, or
            passwords in chat; use the payment and form features built for that purpose instead;
          </li>
          <li>send content that is harassing, threatening, hateful, fraudulent or sexually explicit;</li>
          <li>send malware, phishing links, or links that hide where they lead.</li>
        </ul>
      </>
    ),
  },
  {
    id: "templates",
    title: "6. Message template rules",
    content: (
      <>
        <p>
          Outside the 24-hour customer service window, WhatsApp allows only templates that Meta has approved. When you
          create templates in {site.name}:
        </p>
        <ul>
          <li>
            <strong>Pick the right category.</strong> Marketing for offers, announcements and anything promotional.
            Utility for updates about a transaction the customer started, such as an order, booking or payment.
            Authentication for one-time codes only. Do not put promotional content in a Utility or Authentication
            template.
          </li>
          <li>
            <strong>Be clear and honest.</strong> Say who you are, keep the content accurate, and make every link and
            button lead where it says it will.
          </li>
          <li>
            <strong>Use variables for their stated purpose.</strong> A variable such as a name or order number must not be
            used to slip in content Meta did not review.
          </li>
          <li>
            <strong>Respect Meta’s review.</strong> Do not resubmit a rejected template unchanged or reword it only to get
            around a rejection. {site.name} shows each template’s status as Meta reports it: in review, approved, rejected, paused or disabled.
          </li>
          <li>
            <strong>Watch quality.</strong> Meta may pause a template or lower your messaging limits if people block or
            report your messages. Fix the cause before you send again.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "ai-and-automation",
    title: "7. AI replies and automation",
    content: (
      <ul>
        <li>
          You are responsible for messages your AI agent, flows and automations send, as if you had sent them yourself.
        </li>
        <li>
          Keep a human handover available, and do not let automation send content this policy prohibits.
        </li>
        <li>If a customer asks whether they are talking to a person or to automation, tell them honestly.</li>
      </ul>
    ),
  },
  {
    id: "enforcement",
    title: "8. How we enforce this policy",
    content: (
      <>
        <p>
          We review reports and signals from Meta, such as quality ratings, template rejections and account notices.
          Depending on how serious the problem is, we may:
        </p>
        <ul>
          <li>contact you and ask you to fix it;</li>
          <li>pause a campaign, template, flow or automation;</li>
          <li>remove content, or suspend sending from a workspace;</li>
          <li>close a workspace that seriously or repeatedly breaks this policy.</li>
        </ul>
        <p>
          Where we can, we tell you first and give you a chance to fix the problem. We may act at once to comply with the
          law or a platform’s instructions, or to protect your customers or other workspaces. Meta can also restrict or
          disconnect your WhatsApp Business Account or number under its own policies, and we cannot override that.
        </p>
      </>
    ),
  },
  {
    id: "report-abuse",
    title: "9. Report abuse",
    content: (
      <>
        <p>
          If you received a message sent through {site.name} that you did not agree to, or that breaks this policy,
          write to <SupportEmail />. It helps if you include:
        </p>
        <ul>
          <li>the name of the business and the WhatsApp number that messaged you;</li>
          <li>the date and time of the message;</li>
          <li>a screenshot or a copy of the message.</li>
        </ul>
        <p>
          We acknowledge reports within 3 working days. You can always reply STOP to stop a business’s campaigns, and
          block or report the number in WhatsApp itself. To have your data deleted, see{" "}
          <Link href={legalLinks.dataDeletion}>Data deletion</Link>.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "10. Changes",
    content: (
      <p>
        We may update this policy, for example when Meta changes its own policies. We will post the new version here with
        its date, and tell account holders about material changes by email or in the app before they take effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "11. Contact",
    content: (
      <>
        <p>Questions about this policy: write to us.</p>
        <ContactDetails />
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      title="Acceptable use and messaging policy"
      crumb="Acceptable use"
      path={legalLinks.acceptableUse}
      updated={LEGAL_UPDATED}
      sections={sections}
      intro={
        <p>
          {site.name} helps businesses talk to their customers on WhatsApp. Those customers should only hear from
          businesses they chose to hear from. This policy sets out the rules every workspace follows: get opt-in first,
          honour STOP, send no spam, sell nothing WhatsApp prohibits, and use templates as Meta intends. {site.name} is
          not affiliated with or endorsed by Meta.
        </p>
      }
    />
  );
}
