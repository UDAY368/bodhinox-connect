/**
 * Public API and webhook reference for /developers. Taken from the CRM's
 * docs/public-api.md and src/lib/webhooks/events.ts (BODHINOX_CHAT).
 * Keep it in step with those files; do not add endpoints that do not exist.
 */

export const apiHost = "https://app.bodhinoxconnect.in";

export type Endpoint = { method: "GET" | "POST" | "PATCH" | "DELETE"; path: string; scope: string; does: string };

export const endpoints: Endpoint[] = [
  { method: "GET", path: "/api/v1/me", scope: "None", does: "The workspace a key belongs to and the scopes it carries" },
  { method: "POST", path: "/api/v1/messages", scope: "messages:send", does: "Send a text, media or template message to a phone number" },
  { method: "GET", path: "/api/v1/contacts", scope: "contacts:read", does: "List contacts, with search and tag filters" },
  { method: "POST", path: "/api/v1/contacts", scope: "contacts:write", does: "Create a contact, or return the existing one for that phone" },
  { method: "GET", path: "/api/v1/contacts/{id}", scope: "contacts:read", does: "Read one contact, with tags and custom fields" },
  { method: "PATCH", path: "/api/v1/contacts/{id}", scope: "contacts:write", does: "Update name, email, company, tags or custom fields" },
  { method: "POST", path: "/api/v1/contacts/{id}/flows", scope: "messages:send", does: "Start an active flow for a contact" },
  { method: "GET", path: "/api/v1/conversations", scope: "conversations:read", does: "List conversations, filtered by status or contact" },
  { method: "GET", path: "/api/v1/conversations/{id}", scope: "conversations:read", does: "Read one conversation" },
  { method: "GET", path: "/api/v1/conversations/{id}/messages", scope: "messages:read", does: "List a conversation's messages with delivery status" },
  { method: "POST", path: "/api/v1/conversations/{id}/messages", scope: "messages:send", does: "Reply in a conversation on WhatsApp or Instagram" },
  { method: "POST", path: "/api/v1/broadcasts", scope: "broadcasts:send", does: "Launch a template broadcast, up to 1,000 recipients a request" },
  { method: "GET", path: "/api/v1/broadcasts/{id}", scope: "broadcasts:send", does: "Broadcast status with sent, delivered and read counts" },
  { method: "POST", path: "/api/v1/webhooks", scope: "webhooks:manage", does: "Register an HTTPS endpoint for the events you choose" },
  { method: "GET", path: "/api/v1/webhooks", scope: "webhooks:manage", does: "List your endpoints (the secret is never returned)" },
  { method: "PATCH", path: "/api/v1/webhooks/{id}", scope: "webhooks:manage", does: "Change the URL, events or channels, or re-enable" },
  { method: "DELETE", path: "/api/v1/webhooks/{id}", scope: "webhooks:manage", does: "Remove an endpoint" },
];

export const scopes: { scope: string; allows: string }[] = [
  { scope: "messages:send", allows: "Send messages and start flows" },
  { scope: "messages:read", allows: "Read messages and their delivery status" },
  { scope: "contacts:read", allows: "List and read contacts" },
  { scope: "contacts:write", allows: "Create and update contacts" },
  { scope: "conversations:read", allows: "List and read conversations" },
  { scope: "broadcasts:send", allows: "Launch broadcasts and read their progress" },
  { scope: "webhooks:manage", allows: "Register and manage outbound webhooks" },
];

export const webhookEvents: { event: string; when: string }[] = [
  { event: "message.received", when: "A contact sends you a message on WhatsApp, or on Instagram if the endpoint opted in" },
  { event: "message.status_updated", when: "A message you sent was sent, delivered, read or failed" },
  { event: "conversation.created", when: "A new conversation opens for a contact" },
  { event: "broadcast.completed", when: "A broadcast finishes, with its delivery counts" },
  { event: "template.status_updated", when: "Meta approves, rejects or pauses a template" },
  { event: "flow.completed", when: "A chatbot flow run finishes, with the answers it collected" },
  { event: "order.created", when: "A store order arrives from Shopify, WooCommerce or a WhatsApp cart" },
  { event: "order.paid", when: "A store order is paid" },
  { event: "payment_link.paid", when: "A payment link sent from Bodhinox Connect is paid in full" },
  { event: "appointment.booked", when: "An appointment is booked and confirmed" },
  { event: "appointment.cancelled", when: "An appointment is cancelled" },
  { event: "appointment.rescheduled", when: "An appointment moves to a new time" },
  { event: "appointment.completed", when: "Staff mark an appointment completed" },
  { event: "appointment.no_show", when: "Staff mark an appointment as a no-show" },
];

export const sendMessageExample = `
curl -X POST ${apiHost}/api/v1/messages \\
  -H "Authorization: Bearer bx_live_xxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
        "to": "+919876543210",
        "type": "template",
        "template": {
          "name": "order_update",
          "language": "en_US",
          "params": ["A123"]
        }
      }'
`;

export const sendMessageResponse = `
// 201 Created
{
  "data": {
    "message_id": "9b1f…",
    "whatsapp_message_id": "wamid.HBgM…",
    "conversation_id": "c41e…",
    "contact_id": "4f2a…",
    "contact_created": true
  }
}
`;

export const signatureExample = `
import crypto from "node:crypto";

// header looks like "t=1767225600,v1=5d41…"
export function verifySignature(header, rawBody, secret) {
  const [, t, v1] = header.match(/t=(\\d+),v1=([0-9a-f]+)/) ?? [];
  if (!t || Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(\`\${t}.\${rawBody}\`)
    .digest("hex");
  return (
    expected.length === v1.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(v1))
  );
}
`;

export const webhookPayloadExample = `
{
  "id": "6c1d2f0e-6a43-4c39-9a8e-2f7b1f3c9d10",
  "event": "order.paid",
  "occurred_at": "2026-11-02T10:00:00.000Z",
  "account_id": "…",
  "data": {
    "order_id": "b0c6…",
    "source": "woocommerce",
    "order_number": "5001",
    "total": "₹1,499.50",
    "currency": "INR",
    "customer_phone": "+919876543210"
  }
}
`;
