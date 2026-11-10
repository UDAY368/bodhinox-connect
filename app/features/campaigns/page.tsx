import Link from "next/link";
import { CopySection, PillarPage } from "@/components/features/PillarPage";
import { CampaignReportMockup, TemplateMockup } from "@/components/features/PillarMockups";
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
      "Meta charges for WhatsApp conversations at its published rates, which depend on the template category and the customer's country. Meta bills your business for these directly. They are not part of our plan prices, which cover the software.",
  },
  {
    question: "How many people can I send a campaign to?",
    answer:
      "It depends on your plan: up to 250 recipients per send on Free, 10,000 on Basic, 50,000 on Pro and no limit on Enterprise. Meta also sets a daily messaging limit for your number, which rises as you send good quality messages.",
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
      h1="WhatsApp broadcast and marketing software"
      lead="Send approved WhatsApp templates to exactly the customers who should get them, see who received and read each one, and follow up with the people who did not reply."
      heroVisual={<CampaignReportMockup />}
      bulletsHeading="Everything in campaigns"
      faqs={faqs}
      related={["automation", "crm-analytics", "commerce"]}
    >
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
          official platform, and you can see what happened afterwards.
        </p>
        <p>
          It also helps to know how WhatsApp itself works. When a customer messages you, a 24-hour customer service
          window opens and you can reply freely. Outside that window, a business can only start a conversation with a
          template Meta has approved. Campaigns are built around that rule, so every broadcast you send is one WhatsApp
          allows.
        </p>
      </CopySection>

      <CopySection
        id="how-it-works"
        eyebrow="How it works"
        heading="From template to report in one place"
        aside={<TemplateMockup />}
      >
        <h3>Build a template and get it approved</h3>
        <p>
          Every business-started WhatsApp message uses a template that Meta approves first. The template builder helps
          you write standard templates with images, buttons and variables, as well as carousel templates, one-time-code
          templates for logins and limited-time offer templates with an expiry. Each template carries its Meta category,
          Marketing, Utility or Authentication, and you can see whether it is approved, in review or rejected.
        </p>
        <h3>Choose who gets it</h3>
        <p>
          Send to all your contacts or narrow it down: a tag such as repeat-buyer, a saved segment such as customers in
          Pune who ordered in the last 90 days, a list, a custom field, or a CSV you upload for this one campaign.
          Contacts who replied STOP or whom you blocked are left out automatically.
        </p>
        <h3>Personalise, schedule and pace</h3>
        <p>
          Fill template variables from contact data, so each customer sees their own name, order number or coupon code.
          Schedule the send for the hour your customers are most likely to read, and pace it so a large campaign goes out
          steadily instead of all at once. Pacing also keeps your team from being flooded with replies in the same
          minute.
        </p>
        <h3>Track and follow up</h3>
        <p>
          The campaign report shows how many messages were delivered, read, replied to and clicked. From there you can
          retarget: send a follow-up only to the people who read but did not reply, or a reminder to those who never
          opened the first message. Replies land in the shared inbox, so a sales person can pick up the conversation.
        </p>
        <p>
          When a send fails, you can retry it from the campaign. When the outcome is unclear, the message is held for
          review rather than resent, so no customer receives a duplicate.
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
          <Link href="/acceptable-use" className="text-copper underline underline-offset-4 hover:text-copper-hover">
            acceptable use policy
          </Link>{" "}
          sets out the rules in plain words.
        </p>
      </CopySection>
    </PillarPage>
  );
}
