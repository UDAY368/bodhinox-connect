import Link from "next/link";
import { CopySection, PillarPage } from "@/components/features/PillarPage";
import { FlowBuilderMockup, OptOutMockup } from "@/components/features/PillarMockups";
import { getFeature } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("automation");

export const metadata = pageMetadata({
  title: feature.seoTitle,
  description: feature.metaDescription,
  path: feature.href,
});

const faqs: Faq[] = [
  {
    question: "Do I need to know coding to build a WhatsApp chatbot?",
    answer:
      "No. You build flows in a visual builder by adding steps such as a message, a question, buttons or a condition, and joining them. You can test a flow with a dry run before customers see it.",
  },
  {
    question: "What is the difference between a flow and an automation?",
    answer:
      "A flow is a conversation: a series of messages, questions and choices the customer moves through. An automation is a rule that runs when something happens, such as a keyword, a new tag, a status change or a time of day. When it runs, it can take steps for you, for example tagging the contact or assigning the chat.",
  },
  {
    question: "What are WhatsApp Forms?",
    answer:
      "WhatsApp Forms use Meta Flows to show a form with one or more screens inside the chat, for example a booking or a lead form. The customer fills it in without leaving WhatsApp, and the answers are saved to their contact record.",
  },
  {
    question: "What happens when a customer replies STOP?",
    answer:
      "The contact is marked as opted out. Campaigns and automations skip them from then on, and the same applies to contacts you block. If the customer writes to you again, the message still reaches your inbox.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="WhatsApp chatbot flows and automation"
      lead="Build WhatsApp chatbot flows in a visual builder, test them before they go live, and let automations handle the routine work: tagging, routing, reminders and follow-ups."
      heroVisual={<FlowBuilderMockup />}
      bulletsHeading="Everything in flows and automation"
      faqs={faqs}
      related={["ai-agent", "team-inbox", "commerce"]}
    >
      <CopySection id="problem" eyebrow="The problem" heading="Your team answers the same questions all day">
        <p>
          Look at a day of WhatsApp chats in most businesses and the pattern is clear. Where is my order. What are your
          timings. Send me the price list. Is this available in my size. Book me for Saturday. Each one takes a minute,
          and together they take hours.
        </p>
        <p>
          The work around the chats repeats too. Someone tags the lead, moves it to the right person, sends a reminder
          the day before an appointment and checks back with the customer a week after delivery. When the team is busy,
          these small steps are the first to be skipped.
        </p>
        <p>
          A WhatsApp chatbot fixes the first problem and automation fixes the second. The risk is a bot that traps
          customers in a loop or a rule that fires at the wrong person. So the tools need to be easy to test and easy to
          check afterwards.
        </p>
      </CopySection>

      <CopySection
        id="how-it-works"
        eyebrow="How it works"
        heading="Build visually, test first, check every run"
        aside={<OptOutMockup />}
      >
        <h3>The visual flow builder</h3>
        <p>
          A flow is a conversation you design once. Add steps for messages, buttons, lists and questions, then use
          conditions to send people down different paths based on their answers. Add delays between steps, tag the
          contact, assign the chat to a person or team, collect a payment, or book an appointment, all from inside the
          flow.
        </p>
        <h3>Publish with confidence</h3>
        <p>
          Each time you publish, the flow gets a new version, so you can see what changed. Before you publish, a dry run
          walks through the flow without messaging anyone. After it is live, you can inspect any single run to see which
          steps a customer went through, and replay a run when you need to.
        </p>
        <h3>Automations that run on their own</h3>
        <p>
          Automations are rules. They start on an event, a keyword the customer sends, a tag being added, a change in
          chat status, or a schedule. Add waits and conditions in between. For example: when a lead is tagged
          interested, wait one day, and if they have not replied, assign the chat to sales.
        </p>
        <h3>WhatsApp Forms</h3>
        <p>
          For anything that needs several answers at once, such as an enquiry form, a booking request or a feedback
          survey, use WhatsApp Forms built on Meta Flows. The customer moves through one or more screens inside the chat,
          and every answer is saved to their contact record where your team and your automations can use it.
        </p>
        <h3>Opt-out respected everywhere</h3>
        <p>
          When a customer replies STOP, they are opted out, and every campaign and automation skips them from then on.
          Contacts you block are treated the same way. You do not have to remember to remove them from each list.
        </p>
      </CopySection>

      <CopySection id="who-its-for" eyebrow="Who it is for" heading="For teams that want fewer repeat chats">
        <p>
          Flows and automation help any business that gets the same questions often or follows the same steps for every
          customer. An online store answers order status questions and sends delivery follow-ups. A clinic lets patients
          pick a slot and sends a reminder the day before. An education business qualifies admission enquiries with a
          few questions before a counsellor calls. A real estate team asks budget and location up front and routes the
          lead to the right agent.
        </p>
        <p>
          Start small. Automate the one question your team answers most, watch the runs for a week, then add the next.
          For questions that do not fit a fixed path, pair flows with the{" "}
          <Link href="/features/ai-agent" className="text-copper underline underline-offset-4 hover:text-copper-hover">
            AI agent
          </Link>
          , and keep a person one tap away in the shared inbox.
        </p>
        <p>
          A good first flow is short. Greet the customer, offer three or four buttons for the most common reasons they
          write, and send each button to a clear answer or to the right team. Customers get a fast reply, your team gets
          chats that are already sorted, and you learn from the run history which buttons people press most.
        </p>
      </CopySection>
    </PillarPage>
  );
}
