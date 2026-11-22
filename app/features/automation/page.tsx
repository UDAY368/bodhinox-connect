import Link from "next/link";
import {
  CopySection,
  HeroScreen,
  HighlightRow,
  Highlights,
  PillarPage,
  ScreenVisual,
} from "@/components/features/PillarPage";
import { AutomationScreen, RulesListCard } from "@/components/product/screens/AutomationScreen";
import { FlowBuilderScreen, FlowCanvasCard } from "@/components/product/screens/FlowBuilderScreen";
import { getFeature } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("automation");

export const metadata = pageMetadata({
  title: feature.seoTitle,
  description: feature.metaDescription,
  path: feature.href,
});

const linkClass = "text-primary underline underline-offset-4 hover:text-primary-hover";

const faqs: Faq[] = [
  {
    question: "Do I need to know coding to build a WhatsApp chatbot?",
    answer:
      "No. You build flows on a visual canvas by adding steps such as a message, a question, buttons or a condition, and joining them. You can start from a starter flow and test it with a dry run before customers see it.",
  },
  {
    question: "What is the difference between a flow, a rule and a sequence?",
    answer:
      "A flow is a conversation: a series of messages, questions and choices the customer moves through. A rule runs when something happens, such as a keyword, a new tag or an order, and takes a step for you, for example tagging the contact or assigning the chat. A sequence sends a series of messages over days, such as a welcome series.",
  },
  {
    question: "Do flows work on Instagram too?",
    answer:
      "Yes. Flows, rules and sequences can run on WhatsApp and Instagram, and an Instagram comment on a post or reel can trigger a flow. The automation list has a channel filter so you can see each channel's automations on their own.",
  },
  {
    question: "Can a flow take a payment or book an appointment?",
    answer:
      "Yes. Flow steps can send a Razorpay payment link, share your store link, open a WhatsApp Form, book an appointment, call your own system with an API request, let a KHAGA AI agent reply, or hand the chat to a person.",
  },
  {
    question: "What happens when a customer replies STOP?",
    answer:
      "The contact is marked as opted out. Campaigns and automations skip them from then on. If the customer writes to you again, the message still reaches your inbox.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="Build WhatsApp chatbot flows on a visual canvas"
      lead="Design WhatsApp and Instagram chatbot flows by dragging steps, test them with a dry run, publish a version and let rules and sequences handle the routine work: tagging, routing, reminders and follow-ups."
      heroVisual={
        <HeroScreen label="The visual flow builder with a step palette, a flow from a reel comment trigger through buttons, a condition, an AI reply and a payment link, and the step settings panel.">
          <FlowBuilderScreen height={760} />
        </HeroScreen>
      }
      bulletsHeading="Everything in flows and automation"
      faqs={faqs}
      related={["ai-agent", "instagram", "whatsapp-forms"]}
    >
      <Highlights label="Automation highlights">
        <HighlightRow
          id="hl-steps"
          eyebrow="Steps that do real work"
          heading="Buttons, conditions, AI, payments and handoff"
          visual={
            <ScreenVisual
              designWidth={720}
              label="A chatbot flow on the visual canvas: keyword trigger, message with buttons, payment link, AI reply and assignment to a person."
            >
              <FlowCanvasCard />
            </ScreenVisual>
          }
        >
          <p>
            A flow can do more than answer. Send a payment link, share the store, open a form, book a slot, call your own
            system with an API request, let the AI agent reply, or pass the chat to the right person.
          </p>
        </HighlightRow>
        <HighlightRow
          flip
          id="hl-list"
          eyebrow="One list"
          heading="Flows, rules and sequences, with runs and results"
          visual={
            <ScreenVisual
              designWidth={1280}
              label="Automation list with flows, rules and sequences, their channel, trigger, runs, click-through rate and a live switch."
            >
              <AutomationScreen height={720} />
            </ScreenVisual>
          }
        >
          <p>
            Every automation sits in one list with its channel, trigger, runs and click-through rate. Filter by WhatsApp
            or Instagram, and switch any of them off without deleting it.
          </p>
        </HighlightRow>
        <HighlightRow
          id="hl-basics"
          eyebrow="Always-on basics"
          heading="Default replies and menus in minutes"
          visual={
            <ScreenVisual
              designWidth={640}
              label="Basics: default reply, conversation starters, main menu, story mention reply and away message, each with an on or off switch."
            >
              <RulesListCard />
            </ScreenVisual>
          }
        >
          <p>
            Before you build anything, switch on the basics: a default reply, conversation starters, a main menu and a
            reply to story mentions. They cover most first messages on day one.
          </p>
        </HighlightRow>
      </Highlights>

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

      <CopySection id="how-it-works" eyebrow="How it works" heading="Build visually, test first, check every run" tone="sunken">
        <h3>The visual flow builder</h3>
        <p>
          A flow is a conversation you design once. Add steps for messages, buttons, lists and questions, then use
          conditions to send people down different paths based on their answers. Add waits between steps, save answers as
          contact attributes, collect a payment, open a WhatsApp Form or book an appointment, all from inside the flow.
          Begin from a starter flow if you would rather not start from a blank canvas.
        </p>
        <h3>Triggers for every way a chat starts</h3>
        <p>
          A flow can start on a keyword or a pattern, a template button, a customer&apos;s first message, a new contact, a
          tag being added, an order being received, or a comment on your Instagram post or reel.
        </p>
        <h3>Publish with confidence</h3>
        <p>
          Each time you publish, the flow gets a new version, so you can see what changed. Before you publish, a dry run
          walks through the flow without messaging anyone. After it is live, you can inspect any single run to see which
          steps a customer went through, and replay a run when you need to.
        </p>
        <h3>Rules and sequences</h3>
        <p>
          Rules run on their own when something happens. For example: when a lead is tagged interested, assign the chat to
          sales. Sequences send a series of messages over days, such as a welcome series after the first order. Both work
          on WhatsApp and Instagram.
        </p>
        <h3>Opt-out respected everywhere</h3>
        <p>
          When a customer replies STOP, they are opted out, and every campaign and automation skips them from then on. You
          do not have to remember to remove them from each list.
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
          For questions that do not fit a fixed path, pair flows with{" "}
          <Link href="/features/ai-agent" className={linkClass}>
            KHAGA AI agents
          </Link>
          , collect several answers at once with{" "}
          <Link href="/features/whatsapp-forms" className={linkClass}>
            WhatsApp Forms
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
