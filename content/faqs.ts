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
      "Bodhinox Connect is a WhatsApp and Instagram CRM for Indian businesses. Your team inbox, contacts and pipelines, campaigns, chatbot flows, KHAGA AI agents, online store, payments and appointment booking all live in one workspace, so one tool replaces four.",
  },
  {
    question: "Do I need the WhatsApp Business API to use it?",
    answer:
      "Bodhinox Connect is built on the official WhatsApp Business Platform (Cloud API). You connect your own WhatsApp Business Account and phone number through Meta's Embedded Signup from inside the app. You do not need a separate API provider, and the account and number stay yours.",
  },
  {
    question: "Does it work with Instagram too?",
    answer:
      "Yes. Connect your Instagram professional account to answer DMs in the same inbox as WhatsApp, auto-DM a link to everyone who comments a keyword, grow followers from comments, collect leads from story replies, and let AI agents answer DMs.",
  },
  {
    question: "Who pays for WhatsApp messages?",
    answer:
      "Meta charges per delivered message by category (marketing, utility, authentication). We pass those charges on at Meta's own published rate with zero markup, from a prepaid wallet. Incoming messages are free, and each number gets 1,000 free service replies a month.",
  },
  {
    question: "Can I sell and take payments in the chat?",
    answer:
      "Yes. Add products to the catalogue, publish your own online store, send product cards and Razorpay payment links in chat, take cash on delivery, and ship with Shiprocket. Shopify and WooCommerce orders can send WhatsApp messages too. Bodhinox takes no fee on your orders.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Every new workspace gets a 14-day free trial of the Growth plan with no card needed. After the trial, pick the plan that fits. Paid plans start at ₹1,199 a month on yearly billing.",
  },
  {
    question: "How is my customer data protected?",
    answer:
      "Each workspace's data is kept separate from every other workspace at the database level. You control who sees what with roles and permissions, can turn on two-factor sign-in, and can review an audit log. You can export your workspace at any time, and delete it or your account yourself from Settings.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    question: "Do the prices include GST?",
    answer:
      "No. All prices are in Indian rupees and exclude 18% GST. You see the full amount before you pay and get a GST invoice with your GSTIN, so registered businesses can claim input tax credit.",
  },
  {
    question: "Do you add a markup on WhatsApp messages?",
    answer:
      "No. You pay exactly what Meta charges, from a prepaid wallet, with zero markup. Meta charges per delivered message by category: marketing, utility and authentication. We show the category and cost of a campaign before you send it.",
  },
  {
    question: "Are replies to customers free?",
    answer:
      "Meta gives each WhatsApp number 1,000 free service replies a month. After that, each reply inside the 24-hour window is charged at Meta's utility rate, including chatbot and AI replies. Messages customers send you are always free.",
  },
  {
    question: "What is an AI credit?",
    answer:
      "One reply from a KHAGA AI agent uses one credit. Small helper actions, such as a chat summary or a suggested reply, use a quarter of a credit. When credits run out, the AI pauses and hands chats to your team until you top up. Flows and your team keep working.",
  },
  {
    question: "Is there a free plan or a trial?",
    answer:
      "There is a 14-day free trial of the Growth plan with no card needed. After the trial, choose Starter, Growth or Scale to keep your workspace active.",
  },
  {
    question: "How do quarterly and yearly discounts work?",
    answer:
      "Pay for 3 months and save 10%, or pay for 12 months and save 20%. The same discount applies to extra seats, WhatsApp numbers and Instagram accounts.",
  },
  {
    question: "Can I change or cancel my plan?",
    answer:
      "Upgrades take effect at once and are charged pro rata. Downgrades and cancellations take effect at the end of the paid period. Your contacts, chats and settings stay as they are, and any wallet balance stays in your account.",
  },
  {
    question: "Do you charge a fee on store orders or bookings?",
    answer:
      "No. Bodhinox takes no fee per order or booking. Your payment gateway and courier charge their own fees.",
  },
  {
    question: "Can I move from another WhatsApp provider?",
    answer:
      "Yes. We help move your number and templates. Assisted setup and migration is free on yearly Growth and Scale plans, and free for everyone during the launch offer until 31 March 2027.",
  },
  {
    question: "What happens if I reach a limit?",
    answer:
      "We warn you at 80% and 100% of a limit. Nothing is deleted. You can add seats, numbers or AI credits, or move up a plan.",
  },
];
