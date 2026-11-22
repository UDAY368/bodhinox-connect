import Link from "next/link";
import {
  CopySection,
  HeroScreen,
  HighlightRow,
  Highlights,
  PillarPage,
  ScreenVisual,
} from "@/components/features/PillarPage";
import { AnalyticsScreen } from "@/components/product/screens/AnalyticsScreen";
import { ContactProfileScreen, SegmentsCard } from "@/components/product/screens/ContactsScreen";
import { PipelineScreen } from "@/components/product/screens/SalesScreen";
import { getFeature } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("crm-analytics");

export const metadata = pageMetadata({
  title: feature.seoTitle,
  description: feature.metaDescription,
  path: feature.href,
});

const linkClass = "text-primary underline underline-offset-4 hover:text-primary-hover";

const faqs: Faq[] = [
  {
    question: "What is a WhatsApp CRM?",
    answer:
      "A WhatsApp CRM keeps a record of every customer who talks to you on WhatsApp: their details, tags, chats, orders, payments, bookings and deals in one timeline. In Bodhinox Connect the CRM sits next to the inbox, so your team sees the full history while they reply.",
  },
  {
    question: "Can I import my existing customer list?",
    answer:
      "Yes. Import contacts from a CSV file and match its columns to names, numbers, tags and custom fields. You can export contacts at any time too. Only message contacts who have agreed to hear from you.",
  },
  {
    question: "How is WhatsApp consent recorded?",
    answer:
      "Each contact has an opt-in record with the source and the date, for example an ad form checkbox or a WhatsApp Form. When a customer replies STOP they are opted out automatically, and START opts them back in.",
  },
  {
    question: "What is the difference between a segment and a list?",
    answer:
      "A segment is live: it is built from rules, such as tagged dry-skin and ordered in the last 90 days, and contacts join or leave it as their data changes. A list is static: you choose who is on it, for example by importing a CSV.",
  },
  {
    question: "Which reports can I get?",
    answer:
      "Analytics covers conversations, response and resolution times, team performance, campaign results, channel split, busiest hours, commerce revenue and AI agent results. You can compare periods, save reports and schedule them as CSV or PDF.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="A WhatsApp CRM with pipelines and analytics"
      lead="Every customer who messages you gets a full record, a consent history and a timeline of chats, orders, deals and bookings. Track deals on a board and see how fast your team replies and what your campaigns earn."
      heroVisual={
        <HeroScreen label="A contact profile with tags, custom fields, the WhatsApp opt-in record with source and date, and a timeline that starts with a click-to-WhatsApp ad.">
          <ContactProfileScreen height={760} />
        </HeroScreen>
      }
      bulletsHeading="Everything in contacts, pipelines and analytics"
      faqs={faqs}
      related={["team-inbox", "campaigns", "ads"]}
    >
      <Highlights label="CRM and analytics highlights">
        <HighlightRow
          id="hl-segments"
          eyebrow="Segments"
          heading="Live segments that keep themselves up to date"
          visual={
            <ScreenVisual
              designWidth={620}
              label="Segments list: dry-skin buyers, abandoned cart in the last 24 hours, clicked a broadcast without ordering, VIP customers and Instagram reel leads, with contact counts."
            >
              <SegmentsCard />
            </ScreenVisual>
          }
        >
          <p>
            Build segments from tags, fields, orders, campaign activity and source. People join and leave as their data
            changes, so every campaign goes to the right customers on the day you send it.
          </p>
        </HighlightRow>
        <HighlightRow
          flip
          id="hl-pipeline"
          eyebrow="Sales pipelines"
          heading="Deals on a board, from new lead to won"
          visual={
            <ScreenVisual
              designWidth={1280}
              label="Sales pipeline board with deals in New Lead, Qualified, Proposal Sent, Negotiation and Won, each with value in rupees and an owner."
            >
              <PipelineScreen height={720} />
            </ScreenVisual>
          }
        >
          <p>
            Move deals through your own stages, with values in rupees, owners and win rate. Each deal links back to the
            contact and the chat it came from.
          </p>
        </HighlightRow>
        <HighlightRow
          id="hl-analytics"
          eyebrow="Analytics"
          heading="Numbers that answer real questions"
          visual={
            <ScreenVisual
              designWidth={1280}
              label="Analytics overview with new conversations, resolved chats, median first reply, median resolution time, messages sent, a chart of new and resolved conversations, and chats that need attention."
            >
              <AnalyticsScreen height={760} />
            </ScreenVisual>
          }
        >
          <p>
            How fast do we reply on Saturdays? Which campaign brought in orders? How many chats did the AI solve? The
            answers are on one screen, with comparisons to the previous period.
          </p>
        </HighlightRow>
      </Highlights>

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
          orders, payments, bookings, campaigns and deals around them.
        </p>
      </CopySection>

      <CopySection id="how-it-works" eyebrow="How it works" heading="One record per customer, one view of the business" tone="sunken">
        <h3>Contacts with a full timeline</h3>
        <p>
          Every contact has tags, typed custom fields you define, an owner, notes and a timeline of what happened: chats,
          campaign messages, orders, payments, deals and bookings. The source is recorded too, so you can see which
          contacts came from a click-to-WhatsApp ad, an Instagram comment or your store.
        </p>
        <h3>Consent you can show</h3>
        <p>
          Each contact carries a WhatsApp opt-in record with its source and date. STOP and START replies are handled
          automatically, and opted-out contacts are skipped by every campaign and automation.
        </p>
        <h3>Segments, lists, import and export</h3>
        <p>
          Group contacts into live segments built from rules, such as city is Jaipur and tagged repeat-buyer, or into
          static lists. Import a CSV with column matching, and export whenever you need.
        </p>
        <h3>Sales pipelines</h3>
        <p>
          For businesses with a sales process, pipelines show each deal on a board, moving from New Lead to Qualified,
          Proposal Sent, Negotiation and Won. A real estate team can follow a lead from enquiry to site visit to booking.
          A B2B supplier can track quotes and bulk orders. Everyone sees what is stuck and where.
        </p>
        <h3>Dashboard and analytics</h3>
        <p>
          The home dashboard shows live KPIs: active conversations, new contacts, open deal value, messages sent,
          revenue, bookings, ad spend and chats handled by AI. Analytics goes deeper into conversations, team
          performance, campaign results, channel split between WhatsApp and Instagram, and the busiest hours of the week.
        </p>
        <h3>Reports that arrive on their own</h3>
        <p>
          Compare any period with the one before, save the reports you use, and schedule them as CSV or PDF so the owner
          or the accounts team gets them on a fixed day without logging in.
        </p>
      </CopySection>

      <CopySection id="who-its-for" eyebrow="Who it is for" heading="For owners who want clear answers">
        <p>
          The CRM suits any business where repeat customers matter and more than one person talks to them. A D2C brand
          finds its best customers and sends them early access. A clinic sees which patients are due for a follow-up.
          An education business tracks enquiries from first message to admission. A service business sees which leads
          went cold and who should call them.
        </p>
        <p>
          Owners use the analytics to staff the inbox at busy hours, coach team members whose replies are slow, and stop
          spending on campaigns and ads that do not bring in orders. Developers can keep Bodhinox Connect in step with
          billing, ERP or booking software through{" "}
          <Link href="/developers" className={linkClass}>
            the public API and webhooks
          </Link>
          .
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
