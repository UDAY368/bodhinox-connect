import type { LucideIcon } from "lucide-react";
import {
  Ban,
  ClipboardCheck,
  Clock,
  Database,
  Download,
  FileCheck2,
  KeyRound,
  Lock,
  MessageCircle,
  ScrollText,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";

/**
 * Security and privacy facts for /security. Each item is grounded in the
 * CRM (BODHINOX_CHAT README "Security" line, prisma RLS migrations,
 * src/app/api/audit-log/export, src/app/api/contacts/[id]/erase,
 * docs/billing-limits.md 30-day grace). No certifications are claimed:
 * none exist in the code or the company.
 */

export type SecurityPoint = { icon: LucideIcon; title: string; body: string };

export const securityPillars: SecurityPoint[] = [
  {
    icon: Database,
    title: "Workspace isolation in the database",
    body: "Every workspace is kept apart by PostgreSQL row-level security, so a query can only see the rows of the workspace it runs for, not just the ones the screen asks for.",
  },
  {
    icon: UserCheck,
    title: "Roles and per-feature permissions",
    body: "Owner, admin, agent and viewer roles, groups and per-feature access. Hide customer phone numbers from members who do not need them.",
  },
  {
    icon: KeyRound,
    title: "Two-factor sign-in",
    body: "Authenticator app codes with one-time recovery codes, on top of a verified email address.",
  },
  {
    icon: ScrollText,
    title: "Audit log",
    body: "See who changed what and when: settings, roles, keys, exports and deletions. Search it, and export it as CSV.",
  },
  {
    icon: Lock,
    title: "Encrypted secrets, private media",
    body: "Meta access tokens, integration keys, webhook secrets and secret workspace values are encrypted at rest. Media sits in private storage, never on a public link.",
  },
  {
    icon: ShieldCheck,
    title: "Safe sessions and passwords",
    body: "Passwords are hashed with Argon2id. Sessions use short-lived tokens with rotating refresh, and you can sign out any device from Login & security.",
  },
];

export const privacyControls: SecurityPoint[] = [
  {
    icon: ClipboardCheck,
    title: "Consent record",
    body: "Each contact shows WhatsApp opt-in status with its source and date.",
  },
  {
    icon: Ban,
    title: "STOP and START",
    body: "A customer who replies STOP is opted out of campaigns and automations at once. START opts them back in.",
  },
  {
    icon: UserX,
    title: "Erase a contact",
    body: "Remove a person's details and messages when they ask, from their contact page.",
  },
  {
    icon: Download,
    title: "Export your workspace",
    body: "Download your contacts, conversations and settings as a file whenever you want.",
  },
  {
    icon: Trash2,
    title: "Deletion with a 30-day grace",
    body: "The owner can delete the workspace. It can be restored for 30 days, then it is erased.",
  },
];

export const messagingCompliance: SecurityPoint[] = [
  {
    icon: MessageCircle,
    title: "Official Cloud API",
    body: "Built on Meta's WhatsApp Business Platform. You connect your own number with Embedded Signup; no unofficial apps or phone bridges.",
  },
  {
    icon: FileCheck2,
    title: "Templates approved by Meta",
    body: "Messages that start a conversation use templates Meta has reviewed. We show Meta's status and reason as it reports them.",
  },
  {
    icon: Clock,
    title: "24-hour window enforced",
    body: "Free-form replies are only sent inside the customer service window. Outside it, the app and the API ask for an approved template.",
  },
];

export const legalLinks: { label: string; href: string; note: string }[] = [
  { label: "Privacy policy", href: "/privacy", note: "What we collect, why, and for how long" },
  { label: "Terms of service", href: "/terms", note: "The agreement for using Bodhinox Connect" },
  { label: "Data deletion", href: "/data-deletion", note: "How to delete your data, or a customer's" },
  { label: "Acceptable use", href: "/acceptable-use", note: "Messaging rules every workspace agrees to" },
];
