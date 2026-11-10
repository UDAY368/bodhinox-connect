import type { FeatureSlug } from "./features";

/**
 * Industries for /solutions (one section each, anchored by slug) and the
 * home page chips. Example flows only use features that exist today.
 */

export type Industry = {
  slug: string;
  name: string;
  /** One line for chips and cards. */
  summary: string;
  /** The everyday problem, in the owner's words. */
  problem: string;
  /** Pillars that help, linked to their feature pages. */
  features: FeatureSlug[];
  /** A short example flow, step by step. */
  exampleFlow: string[];
};

export const industries: Industry[] = [
  {
    slug: "retail-d2c",
    name: "Retail and D2C",
    summary: "Sell from chat, take UPI payments and ship with tracking.",
    problem:
      "Customers ask about sizes, stock and delivery on WhatsApp, then drop off while you send photos and payment details by hand.",
    features: ["commerce", "campaigns", "ai-agent"],
    exampleFlow: [
      "A customer taps a product message in chat",
      "They add it to the cart and pay by UPI through Razorpay",
      "The order is created with a GST invoice",
      "Shiprocket picks it up and the tracking link goes to the customer on WhatsApp",
    ],
  },
  {
    slug: "clinics-wellness",
    name: "Clinics and wellness",
    summary: "Book appointments in chat and send reminders.",
    problem:
      "The front desk spends the day answering the same questions about timings and fees, and patients miss appointments they booked weeks ago.",
    features: ["commerce", "automation", "team-inbox"],
    exampleFlow: [
      "A patient asks to book a visit",
      "A flow shows services, doctors and free slots",
      "The patient picks a slot and pays a booking fee if you need one",
      "A reminder goes out before the visit",
    ],
  },
  {
    slug: "education",
    name: "Education and coaching",
    summary: "Answer admission questions and follow up with every lead.",
    problem:
      "Admission enquiries arrive at all hours, and leads go cold because nobody follows up after the first reply.",
    features: ["ai-agent", "crm-analytics", "campaigns"],
    exampleFlow: [
      "A parent asks about fees for a course",
      "The AI agent answers from your prospectus",
      "A WhatsApp Form collects the student's name, class and preferred batch",
      "The lead moves into your admissions pipeline for a counsellor to call",
    ],
  },
  {
    slug: "real-estate",
    name: "Real estate",
    summary: "Qualify enquiries and route them to the right agent.",
    problem:
      "Portal and ad leads arrive in bulk, and good buyers wait while agents sort through people who were only browsing.",
    features: ["automation", "team-inbox", "crm-analytics"],
    exampleFlow: [
      "A buyer messages from a click-to-WhatsApp ad",
      "A flow asks for budget, location and timeline",
      "The chat is tagged and assigned to an agent by round-robin",
      "The deal is tracked on a pipeline board until the site visit",
    ],
  },
  {
    slug: "services-appointments",
    name: "Services and appointments",
    summary: "Take bookings and payments without the back and forth.",
    problem:
      "Salons, repair services and consultants lose hours confirming slots, chasing payments and reminding customers.",
    features: ["commerce", "automation", "ai-agent"],
    exampleFlow: [
      "A customer asks for the next free slot",
      "The flow offers services, staff and times",
      "The customer pays through a Razorpay link in chat",
      "Your team sees the booking in the inbox and the calendar",
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants and cloud kitchens",
    summary: "Take orders in chat and bring regulars back.",
    problem:
      "Orders come in as long messages that are easy to misread, and there is no simple way to tell regulars about a new menu.",
    features: ["commerce", "campaigns", "team-inbox"],
    exampleFlow: [
      "A customer opens your menu in chat and fills a cart",
      "They pay by UPI or choose cash on delivery",
      "The kitchen sees the order in the inbox",
      "Customers who opted in get the weekend special as a template message",
    ],
  },
];
