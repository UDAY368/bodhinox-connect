/**
 * FAQs for Home and Pricing. Render them with <details>/<summary> and feed the
 * same array to faqPageJsonLd() so the visible text and the structured data match.
 * Answers are plain text (no markup) because they also go into JSON-LD.
 */

export type Faq = { question: string; answer: string };

export const homeFaqs: Faq[] = [
  {
    question: "What is Bodhinox Connect?",
    answer:
      "Bodhinox Connect is a WhatsApp-first customer platform for growing businesses. Your team inbox, campaigns, chat flows, AI agent, store and payments, and customer CRM all live in one place, so you can answer faster and sell more on WhatsApp.",
  },
  {
    question: "Do I need the WhatsApp Business API to use it?",
    answer:
      "Bodhinox Connect is built on the official WhatsApp Business Platform (Cloud API). You connect your own WhatsApp Business Account and phone number through Meta's Embedded Signup from inside the app. You do not need a separate API provider, and the account and number stay yours.",
  },
  {
    question: "Who pays for WhatsApp messages?",
    answer:
      "Meta charges for WhatsApp conversations at its published rates and bills your business for them. These charges are not part of our plan prices. Our plans cover the software: inbox, campaigns, automation, AI agent, store and CRM.",
  },
  {
    question: "Can I use a number I already have?",
    answer:
      "You can connect any number your business owns that meets Meta's requirements. If the number is in use on the WhatsApp Business app today, Meta's rules decide how it can be moved. Write to us before you switch and we will help you check.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The Free plan gives you one seat, the shared inbox, CRM and templates, campaigns of up to 250 recipients, one flow and three automations. No card is needed to start.",
  },
  {
    question: "How is my customer data protected?",
    answer:
      "Each workspace's data is kept separate from every other workspace. You control who sees what with roles (owner, admin, agent, viewer), can turn on two-factor sign-in, and can review an audit log. You can export your workspace at any time, and delete it or your account yourself from Settings.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    question: "Do the prices include GST?",
    answer: "No. All prices are in Indian rupees and exclude 18% GST, which is added to your invoice.",
  },
  {
    question: "Are WhatsApp message charges included?",
    answer:
      "No. WhatsApp message charges are billed by Meta at its published rates, per message by category (marketing, utility, authentication), and are not included in plan prices. You pay Meta for messages and us for the software.",
  },
  {
    question: "How much do I save with yearly billing?",
    answer:
      "Yearly billing gives you two months free. Basic works out to ₹1,249 a month instead of ₹1,499, and Pro to ₹3,333 a month instead of ₹3,999.",
  },
  {
    question: "What does add-on mean for the AI agent and store?",
    answer:
      "On the Free and Basic plans, the AI agent and the store with payments are available as paid add-ons. They are included in Pro and Enterprise. Write to us for current add-on prices.",
  },
  {
    question: "Can I move to a different plan later?",
    answer:
      "Yes. Start on any plan and write to us when you want to move up or down. Your contacts, chats and settings stay as they are.",
  },
  {
    question: "What does Enterprise include?",
    answer:
      "Enterprise removes the seat, recipient, flow and automation limits, and adds a dedicated manager with an agreed service level. Pricing depends on your volume, so talk to us for a quote.",
  },
];
