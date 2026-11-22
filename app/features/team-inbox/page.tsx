import {
  CopySection,
  HeroScreen,
  HighlightRow,
  Highlights,
  PillarPage,
  ScreenVisual,
} from "@/components/features/PillarPage";
import { AiActivityCard } from "@/components/product/screens/AiScreen";
import { TeamPerformanceCard } from "@/components/product/screens/AnalyticsScreen";
import { InboxScreen } from "@/components/product/screens/InboxScreen";
import { NumbersHealthCard } from "@/components/product/screens/SettingsScreen";
import { getFeature } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("team-inbox");

export const metadata = pageMetadata({
  title: feature.seoTitle,
  description: feature.metaDescription,
  path: feature.href,
});

const faqs: Faq[] = [
  {
    question: "Can several people reply from the same WhatsApp number?",
    answer:
      "Yes. Everyone on your team signs in to Bodhinox Connect with their own login and replies from the shared inbox. Customers see one business number. You see who sent each reply, and each chat is assigned to one person so two people do not answer the same customer.",
  },
  {
    question: "Can I connect more than one WhatsApp number?",
    answer:
      "Yes. A workspace can hold several WhatsApp numbers, for example one for sales and one for support, or one per branch. All their chats arrive in the same inbox, and you can filter by number when you need to.",
  },
  {
    question: "Does the inbox handle Instagram messages?",
    answer:
      "Yes. Connect your Instagram professional account and its direct messages arrive in the same inbox as your WhatsApp chats. Channel chips let you see all chats, only WhatsApp or only Instagram.",
  },
  {
    question: "What is the 24-hour window ring?",
    answer:
      "On WhatsApp you can reply freely for 24 hours after the customer's last message. After that you need an approved template. The ring on each chat shows how much of that window is left, so the team answers the chats that are about to close first.",
  },
  {
    question: "What happens to messages that arrive after business hours?",
    answer:
      "You set your business hours once. Outside them, the inbox sends your away message so the customer knows when to expect a reply, and the chat waits in the queue for the morning. If a KHAGA AI agent or a flow is set up, it can answer common questions in the meantime.",
  },
  {
    question: "Can I hide customer phone numbers from some team members?",
    answer:
      "Yes. Phone-number masking hides the full number from team members who do not need it, while they can still reply to the chat as normal.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="A shared team inbox for WhatsApp and Instagram"
      lead="Every chat from every WhatsApp number and your Instagram account, in one inbox your whole team works from. Assign chats, leave notes for each other and take over from the AI agent in one click."
      heroVisual={
        <HeroScreen label="The shared inbox: a conversation list with WhatsApp and Instagram chats, an open chat with an AI reply, an internal note and a payment link, and the contact panel.">
          <InboxScreen height={760} />
        </HeroScreen>
      }
      bulletsHeading="Everything in the team inbox"
      bulletsIntro="Each item below is in the product today."
      faqs={faqs}
      related={["ai-agent", "instagram", "crm-analytics"]}
    >
      <Highlights label="Team inbox highlights">
        <HighlightRow
          id="hl-channels"
          eyebrow="Every channel"
          heading="All your numbers and Instagram in one list"
          visual={
            <ScreenVisual
              designWidth={520}
              label="Two WhatsApp numbers with quality rating, messaging limit and display name status, and a connected Instagram account."
            >
              <NumbersHealthCard />
            </ScreenVisual>
          }
        >
          <p>
            Connect a sales number, a support number and one per branch, plus your Instagram account. Every chat lands
            in the same inbox, and the quality rating and daily limit of each number stay in plain sight.
          </p>
        </HighlightRow>
        <HighlightRow
          flip
          id="hl-handoff"
          eyebrow="Human handoff"
          heading="The AI answers first. A person is one click away."
          visual={
            <ScreenVisual
              designWidth={620}
              label="AI activity log: questions the agent answered, and chats it handed to a person because of a refund rule, a health topic or low confidence."
            >
              <AiActivityCard />
            </ScreenVisual>
          }
        >
          <p>
            When a KHAGA AI agent is unsure, or the topic is sensitive, the chat moves to the Requesting queue with the
            full history. Anyone can pause the agent on a chat and reply themselves.
          </p>
        </HighlightRow>
        <HighlightRow
          id="hl-team"
          eyebrow="Reply targets"
          heading="See who is replying, and how fast"
          visual={
            <ScreenVisual
              designWidth={620}
              label="Team table with open chats, replies, resolved chats and median response time for each team member."
            >
              <TeamPerformanceCard />
            </ScreenVisual>
          }
        >
          <p>
            Set a reply target and the inbox flags chats that go over it. Team reports show open chats, replies, resolved chats
            and median response time per person, so you can staff the busy hours and coach the slow ones.
          </p>
        </HighlightRow>
      </Highlights>

      <CopySection id="problem" eyebrow="The problem" heading="One phone cannot serve a growing business">
        <p>
          Most Indian businesses start on WhatsApp with one phone. The owner answers, or a trusted staff member keeps the
          phone on their desk. It works until the chats pile up. Then the same problems show up in every shop, clinic and
          office.
        </p>
        <p>
          Only one person can reply at a time. When that person is busy, on leave or asleep, customers wait. Nobody else
          can see what was promised in a chat, so a second person who picks it up starts from zero and asks the customer
          to repeat themselves. Chats that need the accounts team or the dispatch team get forwarded as screenshots.
          Some are never answered at all. Instagram DMs sit in yet another app on yet another phone.
        </p>
        <p>
          Many teams try to fix this by sharing the phone or using WhatsApp Web on several computers. That makes it worse.
          Two people reply to the same customer with different answers, and you cannot tell who said what. When a staff
          member leaves, their chat history and their customers leave with them.
        </p>
      </CopySection>

      <CopySection id="how-it-works" eyebrow="How it works" heading="One inbox, clear ownership, nothing lost" tone="sunken">
        <p>
          A shared team inbox gives every person on your team their own login to the same set of chats. Customers keep
          messaging the number and the Instagram account they already know. Behind it, your team works the way a proper
          support desk does.
        </p>
        <h3>Every number and Instagram in one place</h3>
        <p>
          Connect one WhatsApp number or several, and your Instagram professional account. Chips at the top switch between
          all chats, WhatsApp only and Instagram only. Saved views keep the lists you use every day, such as unassigned
          chats or chats from one branch, one click away, and full-text search finds any message.
        </p>
        <h3>Queues that match how chats really move</h3>
        <p>
          Active chats are the ones in progress. Requesting holds chats where a customer or the AI agent asked for a
          person. Intervened shows chats a team member has taken over from the bot. The 24-hour window ring on each chat
          shows how long is left to reply freely on WhatsApp.
        </p>
        <h3>Assign, then track to done</h3>
        <p>
          Assign a chat to a person, or let round-robin routing rules share new chats evenly. Reply targets and
          over-target alerts tell the team which customers have waited too long. Each chat is open or resolved, so at a
          glance you can see what still needs a reply and who owns it.
        </p>
        <h3>Talk to each other inside the chat</h3>
        <p>
          Internal notes sit inside the conversation and the customer never sees them. Mention a colleague with @ to pull
          them in, for example to ask dispatch whether an order has shipped. Quick replies and the media library save
          typing, and you can reply with approved templates, buttons and lists, or send a product, a payment link, your
          store link or a WhatsApp Form straight from the composer.
        </p>
        <h3>Hours, privacy and roles</h3>
        <p>
          Set your business hours and an away message for the rest of the day. Phone-number masking hides full numbers
          from people who do not need them, and browser notifications tell each person when a chat is assigned to them.
          Roles keep access sensible: owners and admins manage settings and numbers, agents work the chats.
        </p>
      </CopySection>

      <CopySection id="who-its-for" eyebrow="Who it is for" heading="For any team that shares customer chats">
        <p>
          The inbox suits any business where more than one person talks to customers on WhatsApp or Instagram. A D2C
          brand with a small support team uses it to answer order questions and returns. A clinic uses it so the front
          desk and the billing desk can both handle patient messages without passing a phone around. A coaching institute
          splits admissions enquiries from fee questions. A real estate firm assigns each new lead to a sales person and
          can still see every conversation if that person moves on.
        </p>
        <p>
          It also works for a single owner who wants to stay on top of chats from a laptop and add a helper later. Try it
          free for 14 days with your own number, then add seats when you need them.
        </p>
        <p>
          Because the inbox runs on the official WhatsApp Business Platform, the 24-hour customer service window applies.
          Inside it you can reply freely. Once it closes, you start the conversation again with an approved template.
        </p>
      </CopySection>
    </PillarPage>
  );
}
