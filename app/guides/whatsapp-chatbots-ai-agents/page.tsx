import Link from "next/link";
import { GuideLayout, type RelatedLink, type TocItem } from "@/components/guides/GuideLayout";
import { getGuide } from "@/content/guides";
import { pageMetadata } from "@/lib/seo";

const guide = getGuide("whatsapp-chatbots-ai-agents");

export const metadata = pageMetadata({
  title: guide.seoTitle,
  description: guide.description,
  path: guide.href,
  type: "article",
  publishedTime: guide.datePublished,
  modifiedTime: guide.dateModified,
});

const toc: TocItem[] = [
  { id: "difference", title: "Chatbot flows and AI agents" },
  { id: "flows", title: "Where flows work best" },
  { id: "ai", title: "Where an AI agent helps" },
  { id: "together", title: "Using both together" },
  { id: "knowledge", title: "Preparing your knowledge" },
  { id: "guardrails", title: "Guardrails that keep it safe" },
  { id: "handoff", title: "Handing over to a person" },
  { id: "rules", title: "WhatsApp rules to know" },
  { id: "measure", title: "Knowing whether it works" },
  { id: "first-week", title: "A plan for your first week" },
];

const related: RelatedLink[] = [
  { label: "Flows and automation", href: "/features/automation", note: "A visual WhatsApp chatbot builder with dry runs and run history." },
  { label: "AI agent", href: "/features/ai-agent", note: "Answers from your knowledge base, with your rules and handoff." },
  { label: "Shared team inbox", href: "/features/team-inbox", note: "Where handed-over chats land, with assignment and notes." },
  { label: "Store and payments", href: "/features/commerce", note: "Take payments and bookings inside a flow." },
];

export default function Page() {
  return (
    <GuideLayout guide={guide} toc={toc} related={related}>
      <p>
        Small businesses in India answer the same WhatsApp questions dozens of times a day. What are your timings? Do you
        deliver to my pin code? What is the fee? Is the blue one in stock? Automation can take that load off your team, as
        long as it is set up with care. This guide explains the two main tools, a WhatsApp chatbot built from flows and a
        WhatsApp AI agent, and how to use them without frustrating your customers.
      </p>

      <h2 id="difference">Chatbot flows and AI agents: the difference</h2>
      <p>
        A <strong>chatbot flow</strong> follows a path you design. It sends a message, offers buttons or a list, asks a
        question, checks the answer and moves to the next step. It does exactly what you built, every time.
      </p>
      <p>
        An <strong>AI agent</strong> reads the customer&apos;s message in their own words and writes an answer from
        information you give it, such as your website, documents and FAQs. It can handle questions you never planned for,
        and it needs firm rules about what it may say and when it must stop.
      </p>
      <table>
        <thead>
          <tr>
            <td />
            <th scope="col">Chatbot flow</th>
            <th scope="col">AI agent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Best for</td>
            <td>Fixed steps: bookings, order status, lead forms</td>
            <td>Open questions about products, policies and services</td>
          </tr>
          <tr>
            <td>Answers</td>
            <td>Exactly what you wrote</td>
            <td>Written fresh from your knowledge</td>
          </tr>
          <tr>
            <td>Setup</td>
            <td>Design each step and test each path</td>
            <td>Collect good knowledge, then set rules</td>
          </tr>
          <tr>
            <td>Main risk</td>
            <td>Customers get stuck when their question is not on the menu</td>
            <td>A confident answer that is wrong or out of date</td>
          </tr>
        </tbody>
      </table>

      <h2 id="flows">Where chatbot flows work best</h2>
      <p>Use a flow whenever the steps are known and the answer must be exact:</p>
      <ul>
        <li>booking an appointment: pick a service, a date and a slot, then pay or confirm;</li>
        <li>capturing a lead: name, city, budget and the course or property they want;</li>
        <li>checking an order: ask for the order number, then send the status;</li>
        <li>collecting details with a WhatsApp form, such as a patient intake or a service request;</li>
        <li>routing: &quot;Sales, Support or Billing?&quot; and then assigning the chat to the right team.</li>
      </ul>
      <p>
        Keep menus short, three to five choices, and always include a way to reach a person. Test every path before you
        publish, including what happens when someone types instead of tapping a button.
      </p>

      <h2 id="ai">Where an AI agent helps</h2>
      <p>An AI agent is useful when customers ask the same kinds of questions in many different ways:</p>
      <ul>
        <li>&quot;Is this fabric okay for summer?&quot;</li>
        <li>&quot;Do you have parking near the clinic?&quot;</li>
        <li>&quot;What is the difference between the weekend and weekday batch?&quot;</li>
        <li>&quot;Can I return it if the size is wrong?&quot;</li>
      </ul>
      <p>
        A flow cannot list every way of asking these. An agent that answers from your own material can, at any hour, in a
        few seconds. That matters most after closing time, when a quick answer can be the difference between a sale today
        and a lost customer.
      </p>

      <h2 id="together">Using both together</h2>
      <p>The strongest setups combine the two. Take a dental clinic:</p>
      <ol>
        <li>A patient writes &quot;Do you do teeth whitening and how much is it?&quot;</li>
        <li>The AI agent answers from the clinic&apos;s price list and explains what the treatment involves.</li>
        <li>The patient says they want to book. A booking flow takes over, offers open slots and confirms one.</li>
        <li>
          The patient then asks about a painful tooth. That is a medical concern, so the chat goes to the front desk with a
          short summary.
        </li>
      </ol>
      <p>
        The agent handles the open questions, the flow handles the exact steps, and a person handles anything sensitive.
      </p>

      <h2 id="knowledge">Preparing your knowledge</h2>
      <p>An AI agent is only as good as what you give it. Before you switch it on:</p>
      <ul>
        <li>Write down your 20 most common questions and the answers your best team member gives.</li>
        <li>Add your prices, timings, locations, delivery areas, return and refund policy, and payment options.</li>
        <li>Remove old offers and discontinued products, or the agent may mention them.</li>
        <li>Use plain sentences. A clear FAQ page works better than a long brochure.</li>
        <li>Name one person who updates the knowledge whenever a price or policy changes.</li>
      </ul>

      <h2 id="guardrails">Guardrails that keep it safe</h2>
      <p>Set rules before the agent talks to a single customer:</p>
      <ul>
        <li>
          <strong>Confidence threshold:</strong> when the agent is unsure, it should say so and hand over, instead of
          guessing.
        </li>
        <li>
          <strong>Sensitive topics:</strong> medical, legal, financial and complaint conversations go to a person.
        </li>
        <li>
          <strong>Handoff keywords:</strong> words such as &quot;agent&quot;, &quot;human&quot; or &quot;complaint&quot;
          route the chat straight to your team.
        </li>
        <li>
          <strong>Maximum turns:</strong> if a conversation goes back and forth too long, a person steps in.
        </li>
        <li>
          <strong>Tone:</strong> describe how your business speaks, formal or friendly, and keep it
          consistent.
        </li>
      </ul>
      <p>
        Review the agent&apos;s activity log every few days at first. Each answer it gave, and each time it handed over,
        tells you what to add to the knowledge or which rule to tighten. The{" "}
        <Link href="/features/ai-agent">WhatsApp AI agent in Bodhinox Connect</Link> includes these controls and logs every
        decision.
      </p>

      <h2 id="handoff">Handing over to a person</h2>
      <p>
        The handoff is where most bots fail. A good handoff is quick: the customer is told a person will reply, the chat
        lands in the right queue with the history attached, and the bot stays quiet while your team works. Set business
        hours so customers who write at night know when to expect a reply. In a{" "}
        <Link href="/features/team-inbox">shared team inbox</Link>, anyone can pause the bot and take over in one click,
        then hand the chat back when it is done.
      </p>

      <h2 id="rules">WhatsApp rules to know</h2>
      <ul>
        <li>
          <strong>The 24-hour window:</strong> bots and agents can reply freely for 24 hours after the customer&apos;s last
          message. After that, only approved templates can restart the chat.
        </li>
        <li>
          <strong>Opt-out:</strong> when a customer replies STOP, automations must stop marketing to them.
        </li>
        <li>
          <strong>Use of AI:</strong> Meta&apos;s current terms allow AI that serves your own business&apos;s customers,
          such as support, sales and bookings. They do not allow offering a general-purpose AI assistant as the service
          itself on WhatsApp. Check Meta&apos;s latest policy if you plan something unusual.
        </li>
        <li>
          <strong>Honesty:</strong> do not pretend the agent is a named human. Customers trust a business that is open
          about automation.
        </li>
      </ul>

      <h2 id="measure">Knowing whether it works</h2>
      <p>Watch a few numbers from the first week:</p>
      <ul>
        <li>time to first reply, especially outside business hours;</li>
        <li>the share of chats resolved without a person;</li>
        <li>how often the agent hands over, and why;</li>
        <li>bookings, leads or orders that came through a flow;</li>
        <li>complaints about the bot, which you should read one by one.</li>
      </ul>

      <h2 id="first-week">A plan for your first week</h2>
      <ol>
        <li>Day 1: list your top questions and gather your knowledge.</li>
        <li>Day 2: build one routing flow with three choices and a &quot;talk to us&quot; option.</li>
        <li>Day 3: add a booking or lead flow and test every path with a dry run.</li>
        <li>Day 4: switch on the AI agent for after-hours chats only, with strict handoff rules.</li>
        <li>Day 5 to 7: read every conversation, fix gaps in the knowledge, then widen the hours.</li>
      </ol>
      <p>
        Start small, watch closely and expand what works. If you would like help planning your first flows,{" "}
        <Link href="/contact">book a demo</Link> and we will help you plan one.
      </p>
    </GuideLayout>
  );
}
