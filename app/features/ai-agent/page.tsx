import {
  CopySection,
  HeroScreen,
  HighlightRow,
  Highlights,
  PillarPage,
  ScreenVisual,
} from "@/components/features/PillarPage";
import { AiActivityCard, AiAgentsScreen, AiSummaryCard, KnowledgeCard } from "@/components/product/screens/AiScreen";
import { getFeature } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("ai-agent");

export const metadata = pageMetadata({
  title: feature.seoTitle,
  description: feature.metaDescription,
  path: feature.href,
});

const faqs: Faq[] = [
  {
    question: "What is KHAGA AI?",
    answer:
      "KHAGA is the name of the AI built into Bodhinox Connect. It powers the AI agents that reply to customers on WhatsApp and Instagram, and the assistant features that help your team in the inbox with summaries, suggested replies and lead scores.",
  },
  {
    question: "Where does the WhatsApp AI agent get its answers from?",
    answer:
      "From the knowledge you give it: pages from your website, documents you upload and FAQs you write. You can switch each source on or off. When it is not confident enough, it hands the chat to your team instead of guessing.",
  },
  {
    question: "Can I stop the AI agent from handling certain topics?",
    answer:
      "Yes. Sensitive topics go to a person by design, and you can add your own handoff rules, such as refund, complaint or doctor. You also set a confidence limit, below which a person takes over.",
  },
  {
    question: "Can I test an agent before customers see it?",
    answer:
      "Yes. Every agent has a test playground where you can ask it questions the way a customer would and check its answers and handoffs before you switch it on.",
  },
  {
    question: "Will my customers know they are talking to an AI agent?",
    answer:
      "That is your choice of wording, and we recommend being open about it. Many businesses introduce the agent as their assistant and mention that a team member can step in at any time. A person can take over any chat in one click.",
  },
  {
    question: "Who can turn on the AI assistant features for the team?",
    answer:
      "A workspace owner or admin switches on the assistant features, such as chat summaries, suggested replies and lead scores, in settings. AI usage is shown in the app, and extra AI message packs are available if you need more.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="KHAGA AI agents that answer WhatsApp from your knowledge"
      lead="AI agents reply to customers on WhatsApp and Instagram at any hour, using your website, documents and FAQs. They follow the rules you set, and pass sensitive or uncertain chats to your team."
      heroVisual={
        <HeroScreen label="AI agents screen: agent cards with their channels, working hours, conversations handled and share solved without a person, plus a test button.">
          <AiAgentsScreen height={760} />
        </HeroScreen>
      }
      bulletsHeading="Everything in KHAGA AI"
      faqs={faqs}
      related={["team-inbox", "automation", "instagram"]}
    >
      <Highlights label="KHAGA AI highlights">
        <HighlightRow
          id="hl-knowledge"
          eyebrow="Your knowledge"
          heading="It reads your documents, website and FAQs first"
          visual={
            <ScreenVisual
              designWidth={620}
              label="Knowledge sources for the AI agents: a product catalogue PDF, website pages, a shipping and returns FAQ and a pricing note, with status and size."
            >
              <KnowledgeCard />
            </ScreenVisual>
          }
        >
          <p>
            Add a price list, a policy document, your website and the FAQs you answer every day. Each source can be
            switched on or off, and every agent answers only from what you gave it.
          </p>
        </HighlightRow>
        <HighlightRow
          flip
          id="hl-activity"
          eyebrow="Handoff and activity"
          heading="Every reply and every handoff, with the reason"
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
            Refund requests, health questions and anything the agent is unsure about go to a person. The activity log
            shows what it did with each message and why, so you can fix gaps in the knowledge.
          </p>
        </HighlightRow>
        <HighlightRow
          id="hl-assistant"
          eyebrow="Assistant for the team"
          heading="Summaries, intent and lead scores in the inbox"
          visual={
            <ScreenVisual designWidth={380} label="KHAGA summary of a chat with intent, lead score, next step and a suggested reply." className="mx-auto max-w-md">
              <AiSummaryCard />
            </ScreenVisual>
          }
        >
          <p>
            When a person takes over, KHAGA has already summarised the chat, labelled the intent, scored the lead and
            drafted a reply they can edit before sending.
          </p>
        </HighlightRow>
      </Highlights>

      <CopySection id="problem" eyebrow="The problem" heading="Customers write when your team is offline">
        <p>
          A good share of WhatsApp and Instagram messages arrive in the evening, late at night and on Sundays, which is
          when people finally have time to ask. By the time your team replies the next morning, many of those customers
          have bought elsewhere or lost interest.
        </p>
        <p>
          A fixed chatbot helps with questions you predicted, but customers rarely ask in the words you expected. They
          combine two questions in one message, use their own spelling, or ask about something on page six of your
          price list. A menu of buttons cannot cover that.
        </p>
        <p>
          A general AI tool is not the answer either. It can sound confident about things that are not true for your
          business, and you cannot see why it said what it said. Your business needs an agent that knows your facts,
          stays inside your rules and steps aside when a person is needed.
        </p>
      </CopySection>

      <CopySection id="how-it-works" eyebrow="How it works" heading="Your knowledge, your rules, a person close by" tone="sunken">
        <h3>One agent per job</h3>
        <p>
          Create several agents, each with its own role, tone, channels and working hours. A wellness guide answers
          product questions on Instagram, an order helper handles delivery questions on WhatsApp, and a booking desk
          fills appointment slots.
        </p>
        <h3>Give it your knowledge</h3>
        <p>
          Point the agent at your website, upload documents such as a price list or policy, and add FAQs in your own
          words. When a customer writes, the agent answers from that material, 24 hours a day, every day of the week.
        </p>
        <h3>Set the rules</h3>
        <p>
          Describe the tone you want, friendly and short or formal and detailed. Add handoff rules that always bring in a
          person, and set a confidence limit so the agent only replies when it is sure enough. Test it in the playground
          before it goes live.
        </p>
        <h3>Safe by design</h3>
        <p>
          Sensitive topics such as payment disputes, health concerns and complaints are handed to a person. The chat
          moves to your shared inbox with the full history, so whoever picks it up can see what the customer asked and
          what the agent already said. You can also pause the agent on any chat and take over yourself.
        </p>
        <h3>See every decision</h3>
        <p>
          The activity log records what the agent did with each message: replied, handed off, skipped or failed, and
          why. Unanswered questions are collected in one place, so you know exactly what to add to the knowledge next.
        </p>
        <h3>More than replies</h3>
        <p>
          The same AI helps your people in the inbox with summaries, suggested replies, intent and lead scores. It can
          also draft WhatsApp templates and generate a first version of a chatbot flow from a short description.
        </p>
      </CopySection>

      <CopySection id="who-its-for" eyebrow="Who it is for" heading="For businesses that get questions around the clock">
        <p>
          KHAGA AI agents suit businesses whose customers ask a wide range of questions that already have answers
          somewhere: on the website, in a brochure, in a policy document. An online store handles questions on sizes,
          delivery times and returns at midnight. A clinic answers timings, fees and preparation for tests, and hands
          anything medical to staff. A coaching institute explains courses, fees and batch timings. A travel or real
          estate business answers first questions and passes serious leads to a person with a summary.
        </p>
        <p>
          The best results come from clear, current knowledge. Before you switch it on, write down the twenty questions
          your team answers most often and the answers you would want given. In the first week, read the activity log
          closely and fill any gaps you find. Raise the confidence limit if you want the agent to hand off more often,
          and lower it once you trust its answers.
        </p>
      </CopySection>
    </PillarPage>
  );
}
