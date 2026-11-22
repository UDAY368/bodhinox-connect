import Link from "next/link";
import {
  CopySection,
  HeroScreen,
  HighlightRow,
  Highlights,
  PillarPage,
  ScreenVisual,
} from "@/components/features/PillarPage";
import { AdFunnelCard, AdsScreen } from "@/components/product/screens/AdsScreen";
import { ContactProfileScreen } from "@/components/product/screens/ContactsScreen";
import { HomeScreen } from "@/components/product/screens/HomeScreen";
import { getFeature } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("ads");

export const metadata = pageMetadata({
  title: feature.seoTitle,
  description: feature.metaDescription,
  path: feature.href,
});

const linkClass = "text-primary underline underline-offset-4 hover:text-primary-hover";

const faqs: Faq[] = [
  {
    question: "What is a click-to-WhatsApp ad?",
    answer:
      "It is a Facebook or Instagram ad whose button opens a WhatsApp chat with your business instead of a website. The customer taps, a chat opens with a ready-made first message, and your team or your chatbot takes it from there.",
  },
  {
    question: "What do I need to connect?",
    answer:
      "Your Meta ad account and the Facebook Page your ads run from. The setup checklist in Campaigns, Ads walks you through connecting Meta, choosing the ad account and Page, and checking ad creation access.",
  },
  {
    question: "Do I create the ads inside Bodhinox Connect?",
    answer:
      "You create and run ads in Meta Ads Manager as you do today. Bodhinox Connect links to it, then brings the results back: spend, reach, conversations started, cost per conversation, leads and the orders those chats turned into.",
  },
  {
    question: "Can I see which ad a customer came from?",
    answer:
      "Yes. When a chat starts from a click-to-WhatsApp ad, the ad is shown on the conversation in the inbox and recorded as the source on the contact, so it carries through to segments, pipelines and analytics.",
  },
  {
    question: "Does it work with Meta lead forms?",
    answer:
      "Yes. Leads from Meta lead forms come into Bodhinox Connect as contacts, and you can run automations on them, such as sending a WhatsApp welcome message or assigning the lead to a sales person.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="Click-to-WhatsApp ads, tracked from spend to sale"
      lead="Connect your Meta ad account and follow every click-to-WhatsApp ad from amount spent to conversations started, leads and orders, with the ad source on every chat in your inbox."
      heroVisual={
        <HeroScreen label="Ads overview: amount spent, reach, impressions, click-through rate, conversations started, cost per conversation, leads and link clicks, a funnel from ad click to order, a daily trend, top campaigns by spend and placements.">
          <AdsScreen height={860} />
        </HeroScreen>
      }
      bulletsHeading="Everything in Meta Ads reporting"
      faqs={faqs}
      related={["campaigns", "crm-analytics", "automation"]}
    >
      <Highlights label="Meta Ads highlights">
        <HighlightRow
          id="hl-funnel"
          eyebrow="From ad to customer"
          heading="Clicks, chats, leads and orders in one funnel"
          visual={
            <ScreenVisual
              designWidth={600}
              label="Ad funnel from ad clicks to conversations, leads and orders, with cost per conversation and revenue from ads."
            >
              <AdFunnelCard />
            </ScreenVisual>
          }
        >
          <p>
            Ads Manager stops at the click. The funnel carries on: how many clicks became conversations, how many became
            leads, and how many paid. You see cost per conversation and revenue from ads side by side.
          </p>
        </HighlightRow>
        <HighlightRow
          flip
          id="hl-source"
          eyebrow="Ad source on every contact"
          heading="Know which ad every customer came from"
          visual={
            <ScreenVisual
              designWidth={1280}
              label="A contact profile whose timeline starts with a click-to-WhatsApp ad, with the opt-in recorded from the ad form checkbox."
            >
              <ContactProfileScreen height={720} />
            </ScreenVisual>
          }
        >
          <p>
            The ad that started the chat is recorded on the contact and shown on the conversation, so your team knows
            which offer the customer saw before they say a word.
          </p>
        </HighlightRow>
        <HighlightRow
          id="hl-dashboard"
          eyebrow="Dashboard"
          heading="Ad spend next to revenue and bookings"
          visual={
            <ScreenVisual
              designWidth={1280}
              label="Home dashboard with KPI tiles for conversations, contacts, open deal value, messages, revenue, bookings, ad spend for 7 days and chats handled by AI."
            >
              <HomeScreen height={760} />
            </ScreenVisual>
          }
        >
          <p>
            The home dashboard puts the last 7 days of ad spend beside revenue, bookings and conversations, so you can
            tell at a glance whether the money is coming back.
          </p>
        </HighlightRow>
      </Highlights>

      <CopySection id="problem" eyebrow="The problem" heading="The ad report ends where the sale begins">
        <p>
          Click-to-WhatsApp ads are one of the cheapest ways for an Indian business to start conversations. The trouble
          is measuring them. Ads Manager tells you how many people clicked. It cannot tell you how many of those chats
          were answered, how many became leads, or how many paid.
        </p>
        <p>
          So owners judge ads by cost per click and a gut feeling about how busy the phone was. A campaign that brings in
          cheap chats from people who never buy looks better than one that brings fewer chats and more orders. Money goes
          to the wrong ads.
        </p>
        <p>
          Connecting your ad account to the place where the conversations, leads and orders live closes that gap.
        </p>
      </CopySection>

      <CopySection id="how-it-works" eyebrow="How it works" heading="Connect once, then follow every rupee" tone="sunken">
        <h3>A guided setup</h3>
        <p>
          A checklist walks you through connecting Meta, choosing your ad account and Facebook Page, and checking ad
          creation access. Once connected, results come in by themselves.
        </p>
        <h3>The numbers Meta gives you, and the ones it cannot</h3>
        <p>
          See amount spent, reach, impressions, click-through rate and link clicks per campaign, as in Ads Manager. Then
          see what happened next: conversations started, cost per conversation, leads and orders, all in rupees.
        </p>
        <h3>Ad source in the inbox and analytics</h3>
        <p>
          Each chat that starts from an ad shows the ad on the conversation, and the contact keeps it as their source.
          Build a segment of people from one ad, move their deals through a pipeline, and compare channels in analytics.
        </p>
        <h3>Lead forms, audiences and automation</h3>
        <p>
          Bring in leads from Meta lead forms, look at your audiences, and run automations on ad leads, such as a
          WhatsApp welcome message with a{" "}
          <Link href="/features/whatsapp-forms" className={linkClass}>
            WhatsApp Form
          </Link>{" "}
          or assignment to the right sales person.
        </p>
        <h3>Trends and placements</h3>
        <p>
          A daily trend shows how spend and results move over time, top campaigns are ranked by spend, and placements show
          where your ads ran across Facebook and Instagram.
        </p>
      </CopySection>

      <CopySection id="who-its-for" eyebrow="Who it is for" heading="For businesses that pay for chats">
        <p>
          Ads reporting suits any business that runs click-to-WhatsApp or click-to-Instagram ads and wants to know which
          ones pay for themselves. A D2C brand compares a reel ad with a carousel by orders, not clicks. A coaching
          institute sees which ad brings admissions. A real estate team sees cost per qualified lead by project.
        </p>
        <p>
          Pair it with a short{" "}
          <Link href="/features/automation" className={linkClass}>
            welcome flow
          </Link>{" "}
          so every ad click gets an instant reply, and with the shared inbox so a person follows up while the lead is
          still warm.
        </p>
      </CopySection>
    </PillarPage>
  );
}
