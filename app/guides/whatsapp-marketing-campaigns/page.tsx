import Link from "next/link";
import { GuideLayout, type RelatedLink, type TocItem } from "@/components/guides/GuideLayout";
import { getGuide } from "@/content/guides";
import { pageMetadata } from "@/lib/seo";

const guide = getGuide("whatsapp-marketing-campaigns");

export const metadata = pageMetadata({
  title: guide.seoTitle,
  description: guide.description,
  path: guide.href,
  type: "article",
  publishedTime: guide.datePublished,
  modifiedTime: guide.dateModified,
});

const toc: TocItem[] = [
  { id: "permission", title: "Start with permission" },
  { id: "opt-in", title: "Build your list the right way" },
  { id: "segments", title: "Segment before you send" },
  { id: "templates", title: "Write templates that get approved" },
  { id: "timing", title: "Timing and pacing" },
  { id: "measure", title: "Measure what happened" },
  { id: "follow-up", title: "Follow up without spamming" },
  { id: "ideas", title: "Campaign ideas for Indian businesses" },
  { id: "checklist", title: "A checklist before every send" },
];

const related: RelatedLink[] = [
  { label: "Campaigns and broadcasts", href: "/features/campaigns", note: "Segments, scheduling, pacing, tracking and retargeting." },
  { label: "CRM and analytics", href: "/features/crm-analytics", note: "Tags, custom fields, segments and a timeline for every contact." },
  { label: "Flows and automation", href: "/features/automation", note: "Turn replies into conversations that run on their own." },
  { label: "Acceptable use and messaging policy", href: "/acceptable-use", note: "Opt-in, STOP and the rules every sender follows." },
];

export default function Page() {
  return (
    <GuideLayout guide={guide} toc={toc} related={related}>
      <p>
        A WhatsApp message lands in the same place as messages from family and friends. That is why WhatsApp marketing works
        so well, and also why a careless broadcast does so much damage. People block businesses that waste their time, and
        Meta notices. This playbook covers how to run campaigns customers are glad to receive, step by step.
      </p>

      <h2 id="permission">Start with permission</h2>
      <p>
        Every good WhatsApp campaign starts with a customer who asked to hear from you. Meta&apos;s rules require opt-in
        before you send business-initiated messages, and India&apos;s Digital Personal Data Protection Act, 2023 expects
        clear consent for how you use personal data. Good practice goes further: tell people what kind of messages they
        will get and roughly how often.
      </p>
      <p>
        Permission also protects your number. When recipients block or report your messages, your quality rating falls and
        Meta can pause templates or limit how many people you reach. A smaller list of people who want your messages beats a
        large list of strangers every time.
      </p>

      <h2 id="opt-in">Build your list the right way</h2>
      <p>Collect opt-in at moments when customers already trust you:</p>
      <ul>
        <li>
          <strong>At checkout:</strong> an unticked box that says &quot;Send me order updates and offers on WhatsApp&quot;.
        </li>
        <li>
          <strong>In a chat:</strong> after you help someone, ask whether they would like to hear about new arrivals or
          offers, and tag their answer.
        </li>
        <li>
          <strong>From click-to-WhatsApp ads:</strong> people who tap your ad start the chat themselves, which gives you a
          natural moment to ask.
        </li>
        <li>
          <strong>In store or at events:</strong> a QR code that opens a chat with a ready-typed message such as
          &quot;Join the offers list&quot;.
        </li>
        <li>
          <strong>On your website:</strong> a WhatsApp button next to your contact details, with a line explaining what
          people will receive.
        </li>
      </ul>
      <p>
        Record when and how each person agreed. If you ever need to show consent, that record is what counts. Never upload a
        bought or scraped list. It breaks Meta&apos;s rules and our{" "}
        <Link href="/acceptable-use">acceptable use policy</Link>, and it rarely sells anything.
      </p>

      <h2 id="segments">Segment before you send</h2>
      <p>
        Sending the same message to everyone is the most common mistake. A customer who bought a kurta last week does not
        need a &quot;first order&quot; discount. A few simple segments go a long way:
      </p>
      <ul>
        <li>new contacts who have not bought yet;</li>
        <li>repeat buyers, and people who bought from a particular category;</li>
        <li>customers who have not ordered in 60 or 90 days;</li>
        <li>people by city or language, when your offer depends on it;</li>
        <li>contacts who replied to or clicked a recent campaign.</li>
      </ul>
      <p>
        Build these from tags and custom fields you already collect in chats and orders. A{" "}
        <Link href="/features/crm-analytics">WhatsApp CRM</Link> that keeps each contact&apos;s timeline in one place makes
        this much easier than juggling spreadsheets.
      </p>

      <h2 id="templates">Write templates Meta approves and customers read</h2>
      <p>
        Outside the 24-hour customer service window, every message you start must use an approved template. A template has
        a body and can add a header (text, image, video or document), a footer and buttons. Choose the category honestly:
        offers and announcements are <strong>Marketing</strong>, order and account updates are <strong>Utility</strong>,
        and one-time passcodes are <strong>Authentication</strong>. Meta may recategorise a template that does not fit.
      </p>
      <p>Here is a marketing template that usually reads well:</p>
      <blockquote>
        <p>
          Hi {"{{1}}"}, our Diwali collection is live. As someone who bought from us before, you get early access until
          Sunday. Reply SIZE to get help with fit, or tap below to browse.
        </p>
        <p>Reply STOP to stop offers.</p>
      </blockquote>
      <p>Why it works:</p>
      <ul>
        <li>The first line says who is writing and what is new.</li>
        <li>It gives the reader a reason they got it, and a clear date.</li>
        <li>It invites a reply, which opens the 24-hour window for a real conversation.</li>
        <li>It shows how to stop, so annoyed readers opt out instead of blocking.</li>
      </ul>
      <p>
        Keep templates short, avoid all-capital text and pile-ups of symbols, and give each placeholder a realistic sample
        value when you submit it. If a template is rejected, read the reason, fix that one thing and resubmit.
      </p>

      <h2 id="timing">Timing and pacing</h2>
      <p>
        Send when people have a moment to read: late morning and early evening work for many Indian audiences, but test
        your own. Avoid very late nights. Around festivals, everyone is sending offers, so send a little earlier than the
        crowd.
      </p>
      <p>
        Pacing matters too. Spreading a large send over a period protects your team from a flood of replies they cannot
        answer, and lets you stop the campaign if something looks wrong in the first few hundred deliveries. Frequency
        matters most of all. One useful message a week will keep more subscribers than one a day.
      </p>

      <h2 id="measure">Measure what happened</h2>
      <p>WhatsApp gives you clearer signals than most channels. Track, for every campaign:</p>
      <ul>
        <li>
          <strong>Delivered:</strong> the message reached the phone. Low delivery can mean invalid numbers or
          people Meta chose not to send to.
        </li>
        <li>
          <strong>Read:</strong> the message was opened. Some people turn read receipts off, so treat this as a lower
          bound.
        </li>
        <li>
          <strong>Replied:</strong> the best sign of interest, and a conversation your team or bot can continue.
        </li>
        <li>
          <strong>Clicked:</strong> taps on links or buttons that lead to your store or booking page.
        </li>
        <li>
          <strong>Opted out or blocked:</strong> your early warning that the message missed.
        </li>
      </ul>
      <p>
        Compare these across segments as well as across campaigns. The same offer can do well with repeat buyers and badly
        with cold contacts.
      </p>

      <h2 id="follow-up">Follow up without spamming</h2>
      <p>
        Retargeting means sending a second message to part of the first audience. Done well, it feels like good service:
      </p>
      <ul>
        <li>people who replied but did not buy get a helpful answer, often from a person;</li>
        <li>people who read but did not click might get one reminder before the offer ends;</li>
        <li>people who did not read can wait for the next relevant campaign.</li>
      </ul>
      <p>
        Never send the same message twice to people who ignored it. And when a send fails, check what actually happened
        before you retry, so nobody gets the same offer twice.
      </p>

      <h2 id="ideas">Campaign ideas for Indian businesses</h2>
      <ul>
        <li>
          <strong>Festival collections:</strong> Diwali, Eid, Onam, Pongal and wedding season, sent to past buyers in the
          right region.
        </li>
        <li>
          <strong>Back in stock:</strong> a note to people who asked about a sold-out product.
        </li>
        <li>
          <strong>Reorder reminders:</strong> for products that run out, such as skincare, groceries or pet food.
        </li>
        <li>
          <strong>Appointment slots:</strong> clinics, salons and coaching centres sharing open slots for the week.
        </li>
        <li>
          <strong>Content worth saving:</strong> a short care guide, a recipe or exam tips, with a soft link to buy.
        </li>
      </ul>
      <p>
        Pair offers with a payment link and the whole sale can happen in the chat. Our{" "}
        <Link href="/features/commerce">WhatsApp store and Razorpay payments</Link> page shows how that works.
      </p>

      <h2 id="checklist">A checklist before every send</h2>
      <ol>
        <li>Everyone in this audience opted in, and opted-out contacts are excluded.</li>
        <li>The segment matches the offer.</li>
        <li>The template is approved, in the right category and language.</li>
        <li>Placeholders fill correctly. Send a test to your own number first.</li>
        <li>Links and buttons work on a phone.</li>
        <li>Your team knows the campaign is going out and can handle replies.</li>
        <li>You know which number you will judge it on: replies, clicks or sales.</li>
      </ol>
      <p>
        <Link href="/features/campaigns">WhatsApp broadcast and campaigns in Bodhinox Connect</Link> handle the mechanics:
        segments, scheduling, pacing, tracking, retargeting and opt-outs. The judgement about what to send stays with you.
      </p>
    </GuideLayout>
  );
}
