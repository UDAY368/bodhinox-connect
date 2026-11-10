import { CopySection, PillarPage } from "@/components/features/PillarPage";
import { HandoffMockup, InboxMockup } from "@/components/features/PillarMockups";
import { Badge } from "@/components/ui/Badge";
import { comingSoon, getFeature } from "@/content/features";
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
      "Yes. Everyone on your team signs in to Bodhinox Connect with their own login and replies from the shared inbox. Customers see one business number. You see who sent each reply, and each chat is assigned to one person or team so two people do not answer the same customer.",
  },
  {
    question: "Can I connect more than one WhatsApp number?",
    answer:
      "Yes. A workspace can hold several WhatsApp numbers, for example one for sales and one for support, or one per branch. All their chats arrive in the same inbox.",
  },
  {
    question: "What happens to messages that arrive after business hours?",
    answer:
      "You set your business hours once. Outside them, the inbox sends your away message so the customer knows when to expect a reply, and the chat waits in the queue for the morning. If an AI agent or bot is set up, it can answer common questions in the meantime.",
  },
  {
    question: "Does the inbox support Instagram messages?",
    answer:
      "Not yet. Instagram direct messages in the same inbox are coming soon. Today the inbox handles WhatsApp chats from every number you connect.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="Shared team inbox for WhatsApp"
      lead="Every WhatsApp chat from every number your business uses, in one inbox your whole team can work from. Assign chats, leave notes for each other and step in for the bot with one click."
      heroVisual={<InboxMockup />}
      bulletsHeading="Everything in the team inbox"
      bulletsIntro="Each item below is in the product today."
      faqs={faqs}
      related={["ai-agent", "automation", "crm-analytics"]}
      afterBullets={
        <div className="mt-12 flex flex-wrap items-baseline gap-3 border-t border-line pt-6">
          <Badge tone="outline">Coming soon</Badge>
          <p className="text-muted">
            <span className="font-semibold text-ink">{comingSoon[0].title}.</span> {comingSoon[0].summary} It is not live
            yet.
          </p>
        </div>
      }
    >
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
          Some are never answered at all.
        </p>
        <p>
          Many teams try to fix this by sharing the phone or using WhatsApp Web on several computers. That makes it worse.
          Two people reply to the same customer with different answers, and you cannot tell who said what. When a staff
          member leaves, their chat history and their customers leave with them.
        </p>
      </CopySection>

      <CopySection
        id="how-it-works"
        eyebrow="How it works"
        heading="One inbox, clear ownership, nothing lost"
        aside={<HandoffMockup />}
      >
        <p>
          A shared team inbox gives every person on your team their own login to the same set of chats. Customers keep
          messaging the number they already know. Behind it, your team works the way a proper support desk does.
        </p>
        <h3>Every number in one place</h3>
        <p>
          Connect one WhatsApp number or several. A sales line, a support line and a number for each branch can all sit
          in the same workspace. Every chat lands in one list, with unread counts so nothing slips past.
        </p>
        <h3>Assign, then track to done</h3>
        <p>
          Assign a chat to a person or to a team such as Sales or Accounts. Round-robin routing can share new chats
          evenly across the people on a team, so nobody gets buried. Each chat has a status: open, waiting or resolved.
          At a glance you can see what still needs a reply and who owns it.
        </p>
        <h3>Talk to each other inside the chat</h3>
        <p>
          Internal notes sit inside the conversation and the customer never sees them. Mention a colleague with @ to pull
          them in, for example to ask dispatch whether an order has shipped. Quick replies save typing for answers you
          send every day, and you can reply with approved templates, photos, documents, buttons and lists.
        </p>
        <h3>Hours, targets and handoff</h3>
        <p>
          Set your business hours and an away message for the rest of the day. Set a response-time target so the team
          knows how fast a first reply should go out, and let chats that have gone quiet resolve on their own.
          When a bot or the AI agent is answering, anyone can pause it and take over the chat in one click.
        </p>
        <p>
          Roles keep access sensible. Owners and admins manage settings and numbers, agents work the chats, and viewers
          can read without replying.
        </p>
      </CopySection>

      <CopySection id="who-its-for" eyebrow="Who it is for" heading="For any team that shares customer chats">
        <p>
          The inbox suits any business where more than one person talks to customers on WhatsApp. A D2C brand with a
          small support team uses it to answer order questions and returns. A clinic uses it so the front desk and the
          billing desk can both handle patient messages without passing a phone around. A coaching institute splits
          admissions enquiries from fee questions. A real estate firm assigns each new lead to a sales person and can
          still see every conversation if that person moves on.
        </p>
        <p>
          It also works for a single owner who wants to stay on top of chats from a laptop and add a helper later. Start
          with one seat on the Free plan and add people when you need them.
        </p>
        <p>
          Because the inbox runs on the official WhatsApp Business Platform, the 24-hour customer service window applies.
          Inside it you can reply freely. Once it closes, you start the conversation again with an approved template.
        </p>
      </CopySection>
    </PillarPage>
  );
}
