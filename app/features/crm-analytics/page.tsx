import { CopySection, PillarPage } from "@/components/features/PillarPage";
import { AnalyticsMockup, ContactTimelineMockup, PipelineMockup } from "@/components/features/PillarMockups";
import { getFeature } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("crm-analytics");

export const metadata = pageMetadata({
  title: feature.seoTitle,
  description: feature.metaDescription,
  path: feature.href,
});

const faqs: Faq[] = [
  {
    question: "What is a WhatsApp CRM?",
    answer:
      "A WhatsApp CRM keeps a record of every customer who talks to you on WhatsApp: their details, tags, chats, orders, payments and deals in one timeline. In Bodhinox Connect the CRM sits next to the inbox, so your team sees the full history while they reply.",
  },
  {
    question: "Can I import my existing customer list?",
    answer:
      "Yes. Import contacts from a file with their names, numbers, tags and custom fields. You can export contacts at any time too. Only message contacts who have agreed to hear from you.",
  },
  {
    question: "Which reports can I get?",
    answer:
      "The dashboard covers conversations, response times, team performance, campaigns, revenue and click-to-WhatsApp ads. You can schedule reports as CSV or PDF, so they arrive on a fixed day without anyone having to export them.",
  },
  {
    question: "Can I connect Bodhinox Connect to my other software?",
    answer:
      "Yes. Outgoing webhooks send events to your own systems as they happen, and the public API lets your developers work with your data using API keys you manage in the app.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="WhatsApp CRM with pipelines and analytics"
      lead="Every customer who messages you gets a full record and timeline. Track deals on a board, and see how fast your team replies and what your campaigns earn."
      heroVisual={<ContactTimelineMockup />}
      bulletsHeading="Everything in CRM, analytics and platform"
      faqs={faqs}
      related={["team-inbox", "campaigns", "commerce"]}
    >
      <CopySection id="problem" eyebrow="The problem" heading="Customer details are scattered everywhere">
        <p>
          In most businesses that sell on WhatsApp, customer information lives in five places. The chat is on a phone.
          The order is in a spreadsheet. The payment is in the bank app. The follow-up date is in someone&apos;s
          notebook. The lead source is a guess.
        </p>
        <p>
          That makes simple questions hard. Who bought from us twice this year? Which leads from last month&apos;s ad
          have not been followed up? How long do customers wait for a first reply on Saturdays? Which campaign actually
          brought in sales? Without one place to look, the answers are guesses, and decisions about staff and spending
          are made on feel.
        </p>
        <p>
          A WhatsApp CRM fixes this by building the customer record from the conversations themselves, then adding the
          orders, payments, campaigns and deals around them.
        </p>
      </CopySection>

      <CopySection
        id="how-it-works"
        eyebrow="How it works"
        heading="One record per customer, one view of the business"
        aside={<PipelineMockup />}
      >
        <h3>Contacts with a full timeline</h3>
        <p>
          Every contact has tags, custom fields you define, and a timeline of what happened: chats, campaign messages,
          orders, payments and notes. Group contacts into lists by hand, or into segments built from rules such as
          city is Jaipur and tagged repeat-buyer. Import from CSV and export whenever you need.
        </p>
        <h3>Sales pipelines</h3>
        <p>
          For businesses with a sales process, pipelines show each deal on a board, moving from stage to stage. A real
          estate team can follow a lead from enquiry to site visit to booking. A B2B supplier can track quotes and bulk
          orders. Everyone sees what is stuck and where.
        </p>
        <h3>Dashboard and analytics</h3>
        <p>
          The dashboard brings the numbers together: how many conversations came in, how fast your team replied, how
          each person on the team is doing, how campaigns performed and how much revenue came through. If you run
          click-to-WhatsApp ads, you can see how those conversations perform as well.
        </p>
        <h3>Reports that arrive on their own</h3>
        <p>
          Schedule reports as CSV or PDF so the owner or the accounts team gets them on a fixed day, without anyone
          logging in to export them.
        </p>
        <h3>A platform you can build on</h3>
        <p>
          Outgoing webhooks tell your other systems when something happens in your workspace. The public API, with API
          keys you control, lets a developer read and update data from your own software.
        </p>
        <h3>Security built in</h3>
        <p>
          Each workspace&apos;s data is isolated from every other workspace. Team members can turn on two-factor sign-in,
          the audit log records important actions, and you can export your data or ask for it to be deleted.
        </p>
      </CopySection>

      <CopySection
        id="analytics"
        eyebrow="Who it is for"
        heading="For owners who want clear answers"
        aside={<AnalyticsMockup />}
        tone="sunken"
      >
        <p>
          The CRM suits any business where repeat customers matter and more than one person talks to them. A D2C brand
          finds its best customers and sends them early access. A clinic sees which patients are due for a follow-up.
          An education business tracks enquiries from first message to admission. A service business sees which leads
          went cold and who should call them.
        </p>
        <p>
          Owners use the analytics to staff the inbox at busy hours, coach team members whose replies are slow, and stop
          spending on campaigns that do not bring in orders. Developers use the API and webhooks to keep Bodhinox
          Connect in step with the billing, ERP or booking software the business already runs.
        </p>
        <p>
          Start by importing your contacts and tagging them by what they bought or asked about. The timeline fills in by
          itself as your team chats, so within a few weeks you have a customer record that is more complete than any
          spreadsheet.
        </p>
      </CopySection>
    </PillarPage>
  );
}
