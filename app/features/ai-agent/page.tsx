import { CopySection, PillarPage } from "@/components/features/PillarPage";
import { AiActivityLogMockup, AiAgentChatMockup } from "@/components/features/PillarMockups";
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
    question: "Where does the WhatsApp AI agent get its answers from?",
    answer:
      "From the knowledge base you give it: pages from your website, documents you upload and FAQs you write. It answers from that material. When it is not confident enough, it hands the chat to your team instead of guessing.",
  },
  {
    question: "Can I stop the AI agent from handling certain topics?",
    answer:
      "Yes. Sensitive topics go to a person by design, and you can add your own handoff keywords, such as refund, complaint or doctor. You also set a confidence threshold and a maximum number of turns, after which a person takes over.",
  },
  {
    question: "Will my customers know they are talking to an AI agent?",
    answer:
      "That is your choice of wording, and we recommend being open about it. Many businesses introduce the agent as their assistant and mention that a team member can step in at any time. A person can take over any chat in one click.",
  },
  {
    question: "Is the AI agent included in every plan?",
    answer:
      "The AI agent is included in the Pro and Enterprise plans. On the Free and Basic plans it is available as a paid add-on. Usage is tracked in the app so you can see how much the agent is doing.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="A WhatsApp AI agent that answers from your knowledge"
      lead="The AI agent replies to customers at any hour using your website, documents and FAQs. It follows the rules you set, and passes sensitive or uncertain chats to your team."
      heroVisual={<AiAgentChatMockup />}
      bulletsHeading="Everything in the AI agent"
      faqs={faqs}
      related={["team-inbox", "automation", "crm-analytics"]}
    >
      <CopySection id="problem" eyebrow="The problem" heading="Customers write when your team is offline">
        <p>
          A good share of WhatsApp messages arrive in the evening, late at night and on Sundays, which is when people
          finally have time to ask. By the time your team replies the next morning, many of those customers have bought
          elsewhere or lost interest.
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

      <CopySection
        id="how-it-works"
        eyebrow="How it works"
        heading="Your knowledge, your rules, a person close by"
        aside={<AiActivityLogMockup />}
      >
        <h3>Give it your knowledge</h3>
        <p>
          Point the AI agent at your website, upload documents such as a price list or policy, and add FAQs in your own
          words. This becomes its knowledge base. When a customer writes, the agent answers from that material, 24 hours
          a day, every day of the week.
        </p>
        <h3>Set the rules</h3>
        <p>
          You decide how it behaves. Describe the tone you want, friendly and short or formal and detailed. Add handoff
          keywords that always bring in a person. Set a confidence threshold, so the agent only replies when it is sure
          enough, and a maximum number of turns, so long back-and-forths go to your team.
        </p>
        <h3>Safe by design</h3>
        <p>
          Sensitive topics such as payment disputes, health concerns and complaints are handed to a person. The chat
          moves to your shared inbox with the full history, so whoever picks it up can see what the customer asked and
          what the agent already said. You can also pause the agent on any chat and take over yourself.
        </p>
        <h3>See every decision</h3>
        <p>
          The activity log records each decision the agent made: when it answered, when it handed off and why. If an
          answer was not right, you can find the chat and improve the knowledge base. Usage
          tracking shows how much the agent is being used.
        </p>
        <h3>An assistant for your team too</h3>
        <p>
          The same AI helps your people in the inbox. It writes a short summary of a long chat, suggests a reply your
          agent can edit before sending, and labels the customer&apos;s intent. Lead scoring helps sales see which
          conversations are most likely to turn into orders.
        </p>
      </CopySection>

      <CopySection id="who-its-for" eyebrow="Who it is for" heading="For businesses that get questions around the clock">
        <p>
          The WhatsApp AI agent suits businesses whose customers ask a wide range of questions that already have
          answers somewhere: on the website, in a brochure, in a policy document. An online store handles questions on
          sizes, delivery times and returns at midnight. A clinic answers timings, fees and preparation for tests, and
          hands anything medical to staff. A coaching institute explains courses, fees and batch timings. A travel or
          real estate business answers first questions and passes serious leads to a person with a summary.
        </p>
        <p>
          The best results come from a clear, current knowledge base. Before you switch it on, write down the twenty
          questions your team answers most often and the answers you would want given. In the first week, read the activity log
          closely and fill any gaps you find in the knowledge base. Raise the confidence threshold if you want the agent
          to hand off more often, and lower it once you trust its answers.
        </p>
      </CopySection>
    </PillarPage>
  );
}
