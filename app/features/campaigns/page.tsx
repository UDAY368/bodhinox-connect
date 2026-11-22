import Link from "next/link";
import {
  CopySection,
  HeroScreen,
  HighlightRow,
  Highlights,
  PillarPage,
  ScreenVisual,
} from "@/components/features/PillarPage";
import {
  BroadcastReportScreen,
  BroadcastsScreen,
  RetargetCard,
  TemplatesScreen,
} from "@/components/product/screens/CampaignsScreen";
import { getFeature } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("campaigns");

export const metadata = pageMetadata({
  title: feature.seoTitle,
  description: feature.metaDescription,
  path: feature.href,
});

const faqs: Faq[] = [
  {
    question: "Can I send a WhatsApp broadcast to customers who have not messaged me?",
    answer:
      "Yes, with an approved template and the customer's opt-in. WhatsApp only allows business-started messages through templates that Meta has approved, and you need the customer's permission to message them. Bodhinox Connect shows each template's approval status and skips contacts who have opted out.",
  },
  {
    question: "How much does each broadcast message cost?",
    answer:
      "Meta charges for WhatsApp messages at its published rates, which depend on the template category and the customer's country. Meta bills your business for these directly and we add no markup. They are not part of our plan prices, which cover the software.",
  },
  {
    question: "How many people can I send a campaign to?",
    answer:
      "Meta sets a daily messaging limit for each number, which rises as you send good quality messages. Bodhinox Connect shows your number's quality rating and today's limit before you send, so a large campaign does not stop halfway.",
  },
  {
    question: "Which template types can I create?",
    answer:
      "Standard templates with text, images, video, documents, buttons and variables, plus carousel templates, one-time code templates for logins and limited-time offer templates with an expiry. You can start from the template library or ask the AI template writer for a draft, then submit it to Meta for approval.",
  },
  {
    question: "What happens if some messages fail to send?",
    answer:
      "Failed sends are kept together in the campaign, and you can retry them. If the result of a send is unclear, for example after a network error, it is marked for review instead of being sent again blindly, so a customer does not get the same message twice.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="WhatsApp broadcast software that reports revenue"
      lead="Send approved WhatsApp templates to exactly the customers who should get them, see who read, replied, clicked and bought, and follow up with the people who did not reply."
      heroVisual={
        <HeroScreen label="Campaigns list with number quality, daily limit and, for each broadcast, audience, sent, delivered, read, replied, orders and revenue.">
          <BroadcastsScreen height={760} />
        </HeroScreen>
      }
      bulletsHeading="Everything in campaigns"
      faqs={faqs}
      related={["automation", "ads", "crm-analytics"]}
    >
      <Highlights label="Campaign highlights">
        <HighlightRow
          id="hl-templates"
          eyebrow="Templates"
          heading="Every template type, with Meta approval status"
          visual={
            <ScreenVisual
              designWidth={1280}
              label="Template library with carousel, standard, limited-time offer and one-time password templates, each marked approved, pending or rejected, and a carousel preview on a phone."
            >
              <TemplatesScreen height={720} />
            </ScreenVisual>
          }
        >
          <p>
            Write standard, carousel, one-time code and limited-time offer templates, start from the library or let the
            AI writer draft one. Approved, pending and rejected are shown on each card, with the reason when Meta says no.
          </p>
        </HighlightRow>
        <HighlightRow
          flip
          id="hl-report"
          eyebrow="Honest reports"
          heading="Delivered, read, replied, clicked, bought"
          visual={
            <ScreenVisual
              designWidth={1280}
              label="A campaign report with delivered, read, replied and clicked counts, orders and revenue from the campaign."
            >
              <BroadcastReportScreen height={720} />
            </ScreenVisual>
          }
        >
          <p>
            Each campaign shows the full funnel, from delivery to orders and revenue in rupees. You see which offer
            actually sold, not only which one got blue ticks.
          </p>
        </HighlightRow>
        <HighlightRow
          id="hl-retarget"
          eyebrow="Retargeting"
          heading="Follow up only with the people who need it"
          visual={
            <ScreenVisual
              designWidth={600}
              label="Retarget panel: choose people who read but did not reply, clicked but did not order, or were delivered but did not read, with the estimated cost."
            >
              <RetargetCard />
            </ScreenVisual>
          }
        >
          <p>
            Pick everyone who read but did not reply, clicked but did not order, or never opened the first message. The
            estimated Meta cost and today&apos;s limit are shown before you send.
          </p>
        </HighlightRow>
      </Highlights>

      <CopySection id="problem" eyebrow="The problem" heading="Broadcast lists and forwards do not scale">
        <p>
          On the WhatsApp Business app, a broadcast list holds a limited number of people, and a message only reaches
          those who have saved your number. There is no report. You cannot tell who received the offer, who read it or
          who tapped the link. So you send it again to everyone, and the customers who did read it start to tune you out.
        </p>
        <p>
          Many businesses then try a bulk sender or an unofficial tool. Those break WhatsApp&apos;s rules and put your
          number at risk of being blocked, which can cost you every customer chat on that number. They also ignore
          opt-outs, so people who asked you to stop keep getting messages.
        </p>
        <p>
          WhatsApp marketing works when the right message reaches the right person at a sensible time, through the
          official platform, and you can see what happened afterwards. It also helps to know the rule underneath: when a
          customer messages you, a 24-hour customer service window opens and you can reply freely. Outside that window, a
          business can only start a conversation with a template Meta has approved. Campaigns are built around that rule.
        </p>
      </CopySection>

      <CopySection id="how-it-works" eyebrow="How it works" heading="From template to revenue report in one place" tone="sunken">
        <h3>Build a template and get it approved</h3>
        <p>
          Every business-started WhatsApp message uses a template that Meta approves first. The template builder helps
          you write standard templates with images, buttons and variables, carousel templates, one-time-code templates
          for logins and limited-time offer templates with an expiry. Each template carries its Meta category, Marketing,
          Utility or Authentication, and you can see whether it is approved, in review or rejected.
        </p>
        <h3>Choose who gets it</h3>
        <p>
          Send to all your contacts or narrow it down: a tag such as repeat-buyer, a live segment such as customers in
          Pune who ordered in the last 90 days, a list, a custom field, or a CSV you upload for this one campaign. Add
          exclusions, and contacts who replied STOP are left out automatically.
        </p>
        <h3>Personalise, test and schedule</h3>
        <p>
          Fill template variables from contact data, so each customer sees their own name, order number or coupon code.
          Send a test to your own phone first, then schedule the campaign for the hour your customers are most likely to
          read, up to 90 days ahead. Your number&apos;s quality rating and daily limit are shown before you confirm.
        </p>
        <h3>Track and follow up</h3>
        <p>
          The campaign report shows how many messages were delivered, read, replied to and clicked, and the orders and
          revenue that followed. From there you can retarget: a follow-up only to the people who read but did not reply,
          or a reminder to those who never opened the first message. Replies land in the shared inbox, so a sales person
          can pick up the conversation.
        </p>
      </CopySection>

      <CopySection id="who-its-for" eyebrow="Who it is for" heading="For businesses that sell to people who already know them">
        <p>
          Campaigns suit any business with a list of customers who have agreed to hear from it. Retail and D2C brands
          announce new stock, festive offers and restock alerts. Clinics send check-up reminders. Coaching institutes
          share batch start dates and results. Restaurants share weekend menus. Service businesses remind customers that
          a booking or renewal is due.
        </p>
        <p>
          Use Utility templates for order updates, reminders and account messages, and Marketing templates for offers and
          news. Keeping the two apart helps customers trust your messages and keeps your number&apos;s quality rating
          healthy. Always collect opt-in first, give an easy way to stop, and never message purchased lists. Our{" "}
          <Link href="/acceptable-use" className="text-primary underline underline-offset-4 hover:text-primary-hover">
            acceptable use policy
          </Link>{" "}
          sets out the rules in plain words.
        </p>
      </CopySection>
    </PillarPage>
  );
}
