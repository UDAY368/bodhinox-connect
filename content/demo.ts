/**
 * The one fictional workspace every product mock-up draws from, so the same
 * people, products and numbers reappear across the site. Never put real
 * customer data here.
 *
 * Workspace: "Prakriti Naturals", an Ayurvedic wellness brand in Bengaluru
 * that sells online, books consultations and runs campaigns on WhatsApp and
 * Instagram.
 */

export const demoWorkspace = {
  name: "Prakriti Naturals",
  owner: "Ananya Rao",
  ownerInitials: "AR",
  workspaceLabel: "Prakriti's workspace",
  number: "+91 98450 21734",
  instagram: "@prakriti.naturals",
  shopUrl: "prakriti.shop/s/naturals",
  dailyLimit: "10,000 / day",
} as const;

export type DemoChannel = "whatsapp" | "instagram";
export type DemoStatus = "Requesting" | "Assigned" | "Bot" | "Resolved" | "Handed off";

export type DemoConversation = {
  id: string;
  name: string;
  initials: string;
  channel: DemoChannel;
  preview: string;
  time: string;
  unread?: number;
  status: DemoStatus;
  label?: string;
  /** Hours left in the 24-hour window, 0-24. */
  windowLeft?: number;
  tone: 1 | 2 | 3 | 4 | 5;
};

export const demoConversations: DemoConversation[] = [
  {
    id: "c1",
    name: "Meera Krishnan",
    initials: "MK",
    channel: "whatsapp",
    preview: "Is the Kumkumadi oil good for dry skin?",
    time: "2m",
    unread: 2,
    status: "Requesting",
    label: "New lead",
    windowLeft: 23,
    tone: 1,
  },
  {
    id: "c2",
    name: "Rohit Sharma",
    initials: "RS",
    channel: "instagram",
    preview: "Commented “PRICE” on your reel",
    time: "6m",
    unread: 1,
    status: "Bot",
    label: "Reel offer",
    windowLeft: 21,
    tone: 5,
  },
  {
    id: "c3",
    name: "Fatima Sheikh",
    initials: "FS",
    channel: "whatsapp",
    preview: "Payment done ✅ Order #PN-2041",
    time: "14m",
    status: "Assigned",
    label: "Paid",
    windowLeft: 18,
    tone: 3,
  },
  {
    id: "c4",
    name: "Arjun Menon",
    initials: "AM",
    channel: "whatsapp",
    preview: "Can I book a consultation on Saturday?",
    time: "32m",
    status: "Handed off",
    label: "Booking",
    windowLeft: 9,
    tone: 2,
  },
  {
    id: "c5",
    name: "Sneha Patil",
    initials: "SP",
    channel: "instagram",
    preview: "Thanks! Following you now 🌿",
    time: "1h",
    status: "Resolved",
    windowLeft: 4,
    tone: 4,
  },
  {
    id: "c6",
    name: "Vikram Iyer",
    initials: "VI",
    channel: "whatsapp",
    preview: "Where is my order? Tracking please",
    time: "2h",
    status: "Assigned",
    label: "Support",
    windowLeft: 2,
    tone: 1,
  },
];

export type DemoProduct = {
  name: string;
  category: string;
  price: string;
  compareAt?: string;
  stock: number;
  live: boolean;
  tone: 1 | 2 | 3 | 4 | 5;
};

export const demoProducts: DemoProduct[] = [
  { name: "Kumkumadi Face Oil", category: "Skin care", price: "₹1,250", compareAt: "₹1,490", stock: 42, live: true, tone: 4 },
  { name: "Bhringraj Hair Oil", category: "Hair care", price: "₹540", stock: 118, live: true, tone: 3 },
  { name: "Ashwagandha Capsules", category: "Wellness", price: "₹699", stock: 8, live: true, tone: 2 },
  { name: "Neem & Tulsi Face Wash", category: "Skin care", price: "₹320", stock: 64, live: true, tone: 3 },
  { name: "Triphala Churna", category: "Wellness", price: "₹280", stock: 0, live: false, tone: 5 },
  { name: "Rose Water Toner", category: "Skin care", price: "₹390", stock: 37, live: true, tone: 1 },
];

export type DemoOrder = {
  id: string;
  customer: string;
  items: string;
  total: string;
  payment: "Paid" | "COD" | "Pending" | "Refunded";
  status: "New" | "Packed" | "Shipped" | "Delivered";
  source: "WhatsApp" | "Store" | "Instagram";
  time: string;
};

export const demoOrders: DemoOrder[] = [
  { id: "#PN-2041", customer: "Fatima Sheikh", items: "Kumkumadi Face Oil ×1", total: "₹1,250", payment: "Paid", status: "New", source: "WhatsApp", time: "14m ago" },
  { id: "#PN-2040", customer: "Kavya Reddy", items: "Bhringraj Hair Oil ×2", total: "₹1,080", payment: "Paid", status: "Packed", source: "Store", time: "1h ago" },
  { id: "#PN-2039", customer: "Rahul Verma", items: "Ashwagandha Capsules ×1", total: "₹699", payment: "COD", status: "Shipped", source: "Instagram", time: "3h ago" },
  { id: "#PN-2038", customer: "Divya Nair", items: "Rose Water Toner ×3", total: "₹1,170", payment: "Paid", status: "Delivered", source: "WhatsApp", time: "Yesterday" },
  { id: "#PN-2037", customer: "Sanjay Gupta", items: "Neem & Tulsi Face Wash ×2", total: "₹640", payment: "Pending", status: "New", source: "Store", time: "Yesterday" },
];

/** The four dashboard KPI tiles, as on the live Home screen. */
export const demoKpis = [
  { title: "Active Conversations", value: "128", delta: { sign: 1, label: "+14 new today vs yesterday" } },
  { title: "New Contacts Today", value: "37", delta: { sign: 1, label: "+9 vs yesterday" } },
  { title: "Open Deals Value", value: "₹4,86,000", subtitle: "23 open deals" },
  { title: "Messages Sent Today", value: "2,914", delta: { sign: -1, label: "−3% vs yesterday" } },
] as const;

export const demoKpisSecondary = [
  { title: "Revenue today", value: "₹38,420", subtitle: "₹2,41,900 in 7 days" },
  { title: "Bookings today", value: "9", subtitle: "4 still to come · 41 in 7 days" },
  { title: "Ad spend, 7 days", value: "₹12,600", subtitle: "₹38 per conversation" },
  { title: "AI handled today", value: "214", subtitle: "71% closed without a person" },
] as const;

/** Daily conversations, incoming vs outgoing, last 14 days. */
export const demoConversationSeries = {
  labels: ["Nov 9", "", "", "Nov 12", "", "", "Nov 15", "", "", "Nov 18", "", "", "Nov 21", ""],
  incoming: [42, 51, 47, 63, 58, 71, 66, 74, 69, 82, 79, 91, 88, 97],
  outgoing: [55, 60, 52, 77, 70, 84, 79, 92, 85, 101, 96, 112, 108, 121],
};

export const demoPipeline = [
  { stage: "New Lead", deals: 9, value: "₹1.2L", share: 26 },
  { stage: "Qualified", deals: 6, value: "₹1.4L", share: 29 },
  { stage: "Proposal Sent", deals: 4, value: "₹1.1L", share: 22 },
  { stage: "Negotiation", deals: 3, value: "₹0.8L", share: 17 },
  { stage: "Won", deals: 1, value: "₹0.3L", share: 6 },
];

export const demoTeam = [
  { name: "Ananya Rao", initials: "AR", open: 4, replies: 86, median: "1.8 min" },
  { name: "Karthik S", initials: "KS", open: 7, replies: 142, median: "2.4 min" },
  { name: "Priya Das", initials: "PD", open: 3, replies: 97, median: "3.1 min" },
  { name: "KHAGA AI", initials: "AI", open: 0, replies: 412, median: "0.1 min" },
];

export const demoBroadcasts = [
  { name: "Diwali glow sale", template: "festive_offer_carousel", audience: "4,820", sent: "4,812", delivered: "4,760", read: "3,905", replied: "611", orders: "148", revenue: "₹1,84,300", status: "Sent" },
  { name: "Restock: Ashwagandha", template: "back_in_stock", audience: "1,240", sent: "1,240", delivered: "1,228", read: "1,012", replied: "96", orders: "71", revenue: "₹49,630", status: "Sent" },
  { name: "Weekend consult slots", template: "booking_reminder", audience: "860", sent: "—", delivered: "—", read: "—", replied: "—", orders: "—", revenue: "—", status: "Scheduled" },
] as const;

export const demoAgents = [
  { name: "Wellness Guide", role: "Sales agent · Friendly tone", channels: ["WhatsApp", "Instagram"], handled: "1,284", solved: "71%", on: true },
  { name: "Order Helper", role: "Support agent · Formal tone", channels: ["WhatsApp"], handled: "642", solved: "83%", on: true },
  { name: "Booking Desk", role: "Appointments · Warm tone", channels: ["WhatsApp"], handled: "218", solved: "64%", on: false },
] as const;

export const demoAppointments = [
  { time: "10:00", name: "Arjun Menon", service: "Ayurvedic consultation", staff: "Dr. Lakshmi", status: "Confirmed", paid: true },
  { time: "11:30", name: "Pooja Hegde", service: "Skin assessment", staff: "Dr. Lakshmi", status: "Confirmed", paid: true },
  { time: "14:00", name: "Nikhil Rao", service: "Diet planning", staff: "Dr. Varun", status: "Pending", paid: false },
  { time: "16:15", name: "Ishita Bose", service: "Follow-up call", staff: "Dr. Varun", status: "Confirmed", paid: false },
] as const;
