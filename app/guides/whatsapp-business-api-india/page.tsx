import Link from "next/link";
import { GuideLayout, type RelatedLink, type TocItem } from "@/components/guides/GuideLayout";
import { getGuide } from "@/content/guides";
import { pageMetadata } from "@/lib/seo";

const guide = getGuide("whatsapp-business-api-india");

export const metadata = pageMetadata({
  title: guide.seoTitle,
  description: guide.description,
  path: guide.href,
  type: "article",
  publishedTime: guide.datePublished,
  modifiedTime: guide.dateModified,
});

const toc: TocItem[] = [
  { id: "what-it-is", title: "What the API is" },
  { id: "app-or-api", title: "The app and the API compared" },
  { id: "when-you-need-it", title: "When you need the API" },
  { id: "cost", title: "What it costs in India" },
  { id: "setup", title: "How to get set up" },
  { id: "templates", title: "Templates and the 24-hour window" },
  { id: "limits", title: "Quality and messaging limits" },
  { id: "rules", title: "Rules that keep your number safe" },
  { id: "choosing", title: "Choosing a platform" },
];

const related: RelatedLink[] = [
  { label: "Shared team inbox", href: "/features/team-inbox", note: "Every number and every chat in one place, shared by your team." },
  { label: "Campaigns and broadcasts", href: "/features/campaigns", note: "Send approved templates and track delivery, reads and replies." },
  { label: "How we use the WhatsApp Business Platform", href: "/whatsapp-business-platform", note: "Embedded Signup, permissions, billing and your data." },
  { label: "Pricing", href: "/pricing", note: "Plan prices in INR. Meta's message charges are billed separately." },
];

export default function Page() {
  return (
    <GuideLayout guide={guide} toc={toc} related={related}>
      <p>
        Most Indian customers already use WhatsApp every day, so it is the obvious place to answer questions, send order
        updates and run offers. Once a business grows past one phone and one person, the free WhatsApp Business app starts
        to get in the way. That is where the WhatsApp Business API comes in. This guide explains what it is, what it costs,
        how to get set up and the rules that keep your number in good standing.
      </p>

      <h2 id="what-it-is">What the WhatsApp Business API is</h2>
      <p>
        The WhatsApp Business API is the part of Meta&apos;s WhatsApp Business Platform that lets software send and receive
        WhatsApp messages for a business. Meta now calls the hosted version the Cloud API. Meta runs the servers, and your
        business connects to it through a software platform such as Bodhinox Connect.
      </p>
      <p>
        There is no app to install on a phone. Your team works in the platform you choose, in a browser, and several people
        can reply from the same number at the same time. Your customers see no difference. They chat with your business name
        in the WhatsApp they already use.
      </p>
      <p>Three things belong to your business when you use the API:</p>
      <ul>
        <li>
          A <strong>WhatsApp Business Account</strong> (often shortened to WABA), which sits inside your Meta business
          portfolio.
        </li>
        <li>One or more <strong>phone numbers</strong> registered to that account, each with a display name.</li>
        <li>
          <strong>Message templates</strong>, which Meta reviews before you can use them to start a conversation.
        </li>
      </ul>

      <h2 id="app-or-api">The WhatsApp Business app and the API compared</h2>
      <p>
        The free app suits a shop owner who replies personally from one phone. The API suits a team, or any business that
        wants to automate replies and send updates at scale.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Need</th>
            <th scope="col">WhatsApp Business app</th>
            <th scope="col">WhatsApp Business API</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Who replies</td>
            <td>One phone, plus a few linked devices</td>
            <td>A whole team, from a shared inbox</td>
          </tr>
          <tr>
            <td>Messages to many customers</td>
            <td>Broadcast lists with small limits</td>
            <td>Campaigns using approved templates</td>
          </tr>
          <tr>
            <td>Automation</td>
            <td>Greeting and away messages, quick replies</td>
            <td>Chatbot flows, AI agents, webhooks and integrations</td>
          </tr>
          <tr>
            <td>Cost</td>
            <td>Free to use</td>
            <td>Meta charges per message by category, plus your platform fee</td>
          </tr>
          <tr>
            <td>Reports</td>
            <td>Basic message counts</td>
            <td>Delivery, read and reply tracking, team performance</td>
          </tr>
        </tbody>
      </table>

      <h2 id="when-you-need-it">When an Indian business needs the API</h2>
      <p>You are likely ready for the API if any of these sound familiar:</p>
      <ul>
        <li>More than one person answers customer chats, and you pass the phone around or lose track of who replied.</li>
        <li>Customers wait hours for a reply because nobody is watching the phone after closing time.</li>
        <li>You send order confirmations, delivery updates or appointment reminders by hand.</li>
        <li>You want to send an offer to a few thousand customers who asked to hear from you.</li>
        <li>You want WhatsApp chats in the same place as your orders, payments and customer records.</li>
      </ul>
      <p>
        D2C brands, clinics, coaching institutes, real estate teams and service businesses tend to reach this point first,
        because they handle many similar questions every day.
      </p>

      <h2 id="cost">What it costs in India</h2>
      <p>The cost has two separate parts, and it helps to keep them apart when you compare offers.</p>
      <h3>Meta&apos;s message charges</h3>
      <p>
        Meta charges per message, based on the category of the template you send and the country of the person you send it
        to. The categories are:
      </p>
      <ul>
        <li>
          <strong>Marketing:</strong> offers, announcements, product news and re-engagement.
        </li>
        <li>
          <strong>Utility:</strong> updates about something the customer already did, such as an order confirmation,
          delivery update or appointment reminder.
        </li>
        <li>
          <strong>Authentication:</strong> one-time passcodes for sign-in or verification.
        </li>
        <li>
          <strong>Service:</strong> your free-form replies when a customer has messaged you.
        </li>
      </ul>
      <p>
        Under Meta&apos;s current pricing, service replies inside the 24-hour customer service window are free, and utility
        templates sent inside an open window are also free. Marketing templates cost the most, and utility and
        authentication cost less. Rates for India are set by Meta and change from time to time, so check Meta&apos;s
        published rate card for current numbers before you budget. Meta bills these charges to your business directly.
      </p>
      <h3>The platform fee</h3>
      <p>
        The software you use to run the inbox, campaigns and automation charges its own fee. Compare plans on what is
        included: team seats, campaign size, flows, AI replies and support. Ask whether the provider adds a markup to
        Meta&apos;s message charges. On <Link href="/pricing">Bodhinox Connect pricing</Link>, plan prices are in INR, GST is
        extra, and Meta&apos;s charges are billed by Meta at its published rates.
      </p>

      <h2 id="setup">How to get set up</h2>
      <p>
        Most platforms now use Meta&apos;s Embedded Signup, a short guided window from Meta. With a ready number and business
        details, it usually takes minutes. The usual steps are:
      </p>
      <ol>
        <li>
          <strong>Choose a phone number.</strong> It can be a mobile or landline number that can receive an SMS or a voice
          call for verification. If the number is in use on the WhatsApp app today, check your options first, since a
          number generally runs on one product at a time unless Meta supports using both for it.
        </li>
        <li>
          <strong>Have a Meta business portfolio ready.</strong> You can create one during signup with your business name,
          website and email. A website that clearly describes your business, with a privacy policy, helps later reviews.
        </li>
        <li>
          <strong>Connect through Embedded Signup.</strong> Log in with Facebook, choose or create your WhatsApp Business
          Account, add the number, verify it with the code Meta sends, and give the platform permission to send messages
          and manage templates for that account.
        </li>
        <li>
          <strong>Set your display name.</strong> Meta reviews the name shown to customers. It should match your business
          or brand name.
        </li>
        <li>
          <strong>Add a payment method in Meta.</strong> Meta needs a card or other payment method on your WhatsApp
          Business Account before you can send paid templates.
        </li>
        <li>
          <strong>Complete business verification when asked.</strong> Meta may ask you to verify your business with
          registration documents, especially before raising your limits.
        </li>
      </ol>
      <p>
        The account and the number stay in your own Meta business portfolio, so you can change platforms later without
        losing them. Our page on{" "}
        <Link href="/whatsapp-business-platform">how Bodhinox Connect uses the WhatsApp Business Platform</Link> explains
        exactly what we can and cannot do with that access.
      </p>

      <h2 id="templates">Templates and the 24-hour window</h2>
      <p>
        Two rules shape almost everything you do on the API. When a customer messages you, a 24-hour customer service
        window opens, and inside it you can reply with any message: text, images, documents, buttons or lists. Each new
        message from the customer restarts the clock.
      </p>
      <p>
        Outside that window, you can only start a conversation with an approved template. A template is a message you write
        in advance, with placeholders such as the customer&apos;s name or an order number. You choose its category when you
        submit it, and Meta reviews it. Meta can change the category if the content does not fit, for example a
        &quot;utility&quot; message that is really a promotion.
      </p>
      <p>Templates get approved faster when they:</p>
      <ul>
        <li>say clearly who is writing and why;</li>
        <li>use placeholders for details, with sample values that look real;</li>
        <li>avoid spelling mistakes, all-capital text and misleading claims;</li>
        <li>give people an easy way to stop marketing messages.</li>
      </ul>

      <h2 id="limits">Quality ratings and messaging limits</h2>
      <p>
        Meta watches how people respond to your messages. If many recipients block or report you, your quality rating drops.
        A low rating can pause a template or limit how many people you can message.
      </p>
      <p>
        New numbers start with a cap on how many unique customers they can contact with templates in a rolling 24-hour
        period. Meta raises the cap as you send good-quality messages and complete business verification. Replies to
        customers who write to you first do not count against it. Meta may also hold back some marketing messages to people
        who have recently received many of them from businesses, to protect their experience.
      </p>
      <p>
        The practical lesson is simple: message people who expect to hear from you, and send them things they find useful.
      </p>

      <h2 id="rules">Rules that keep your number safe</h2>
      <ul>
        <li>
          <strong>Get opt-in first.</strong> Ask customers to agree to WhatsApp messages before you send templates, and
          record when and how they agreed.
        </li>
        <li>
          <strong>Honour STOP straight away.</strong> When someone opts out, stop marketing messages to them on every
          campaign and flow.
        </li>
        <li>
          <strong>Never buy contact lists.</strong> Messaging people who never heard of you is the fastest way to a low
          quality rating.
        </li>
        <li>
          <strong>Follow the WhatsApp Business and Commerce Policies.</strong> Some products and services cannot be sold or
          promoted on WhatsApp at all.
        </li>
        <li>
          <strong>Look after personal data.</strong> India&apos;s Digital Personal Data Protection Act, 2023 applies to the
          names and numbers you hold. Collect what you need, keep it secure and delete it on request.
        </li>
      </ul>
      <p>
        Our <Link href="/acceptable-use">acceptable use and messaging policy</Link> sets out the same rules for everyone
        who uses Bodhinox Connect.
      </p>

      <h2 id="choosing">Choosing a WhatsApp Business API platform</h2>
      <p>Before you sign up anywhere, ask these questions:</p>
      <ul>
        <li>Does the account and number stay in my own Meta business portfolio?</li>
        <li>Are Meta&apos;s charges passed on at Meta&apos;s rates, and are prices shown in INR with GST?</li>
        <li>Can my whole team work from one inbox, with roles and assignment?</li>
        <li>Can I see delivery, read and reply numbers for every campaign?</li>
        <li>Does it handle opt-outs automatically?</li>
        <li>Does it connect to how I sell: UPI payments, shipping, my store and my CRM?</li>
        <li>Can I export my data and delete it when I leave?</li>
      </ul>
      <p>
        Bodhinox Connect was built around these questions for Indian businesses. You can{" "}
        <Link href="/features">see every feature</Link>, or{" "}
        <Link href="/contact">book a demo</Link> and we will walk you through setup with your own number.
      </p>
    </GuideLayout>
  );
}
