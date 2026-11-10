import { CopySection, PillarPage } from "@/components/features/PillarPage";
import { OrdersMockup, StoreChatMockup } from "@/components/features/PillarMockups";
import { getFeature } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("commerce");

export const metadata = pageMetadata({
  title: feature.seoTitle,
  description: feature.metaDescription,
  path: feature.href,
});

const faqs: Faq[] = [
  {
    question: "How do Razorpay WhatsApp payments work?",
    answer:
      "You connect your own Razorpay account. When a customer checks out in chat, they get a Razorpay payment link or checkout and pay by UPI, card or net banking. The payment is recorded against the order, and the money goes to your Razorpay account as usual.",
  },
  {
    question: "Can customers pay cash on delivery?",
    answer:
      "Yes. You can offer cash on delivery alongside online payment. The order is recorded in the same list as prepaid orders, so you can follow it through to delivery.",
  },
  {
    question: "I already sell on Shopify or WooCommerce. Do I need to add products again?",
    answer:
      "No. The store can sync products with Shopify, WooCommerce and the Meta catalogue, so you keep managing them where you do today and show them in WhatsApp.",
  },
  {
    question: "Can I take paid bookings for services?",
    answer:
      "Yes. Set up your services, staff and locations, and share a booking page. Customers pick a slot and can pay while booking, so you get fewer no-shows.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="A WhatsApp store with Razorpay payments"
      lead="Show products inside the chat, let customers build a cart and pay by UPI, card or net banking through Razorpay, or cash on delivery. Then ship with Shiprocket and send the invoice."
      heroVisual={<StoreChatMockup />}
      bulletsHeading="Everything in store and payments"
      faqs={faqs}
      related={["campaigns", "automation", "crm-analytics"]}
    >
      <CopySection id="problem" eyebrow="The problem" heading="Selling on WhatsApp by hand is slow">
        <p>
          A lot of Indian buying already happens on WhatsApp. A customer asks for photos, you send them, they pick one,
          you share your UPI ID, they send a screenshot, and someone checks the bank app to confirm. Then you note the
          address in a register, book a courier on another website and copy the tracking number back into the chat.
        </p>
        <p>
          Every step is manual, so every step can go wrong. Screenshots get missed or faked. Stock runs out after you
          promised the item. Two staff members sell the last piece to two customers. Nobody can tell you at the end of
          the month how much came in through WhatsApp, and GST invoices are made later in a hurry.
        </p>
        <p>
          A WhatsApp store puts the products, the cart, the payment and the shipping in one place, while the customer
          stays in the chat they started.
        </p>
      </CopySection>

      <CopySection
        id="how-it-works"
        eyebrow="How it works"
        heading="From product message to delivered order"
        aside={<OrdersMockup />}
      >
        <h3>Your catalogue</h3>
        <p>
          Add products with variants such as size and colour, set stock for each, and get an alert when stock runs low.
          If your products already live in Shopify, WooCommerce or the Meta catalogue, sync them instead of typing them
          again.
        </p>
        <h3>Shop inside the chat</h3>
        <p>
          Send product messages in a chat, or share your WhatsApp storefront so customers can browse and add items to a
          cart. Checkout happens without leaving WhatsApp, and you can also add products and payment steps to a flow.
        </p>
        <h3>Get paid through Razorpay</h3>
        <p>
          Connect your Razorpay account and customers pay by UPI, card or net banking through a payment link or
          checkout. Payments are matched to orders, so there are no screenshots to check. If you prefer, offer cash on
          delivery as well.
        </p>
        <h3>Orders, invoices and refunds</h3>
        <p>
          Each order has its own record with items, payment and delivery status. Customers get a receipt, and you can
          issue GST invoices. Returns and refunds are handled from the same order, so the history stays together.
        </p>
        <h3>Ship with Shiprocket</h3>
        <p>
          Connect Shiprocket to book a pickup for an order and share tracking with the customer. The customer can ask
          about delivery in the same chat and your team sees the status right there.
        </p>
        <h3>Appointments and paid bookings</h3>
        <p>
          The same tools work for services. Set up the services you offer, your staff and your locations, and share a
          booking page. Customers pick a time and can pay in advance, which cuts no-shows.
        </p>
      </CopySection>

      <CopySection id="who-its-for" eyebrow="Who it is for" heading="For businesses that already sell in chat">
        <p>
          The WhatsApp store suits D2C brands, boutiques, home bakers, handloom sellers, electronics shops and any
          business whose customers already ask for photos and prices on WhatsApp. It also suits businesses with an
          online store who want to recover customers that ask questions before buying, and close the sale in the chat.
        </p>
        <p>
          Bookings suit salons, clinics, tutors, consultants and repair services: anyone who sells time instead of
          stock. A paid booking holds the slot, and a reminder before the appointment helps the customer turn up.
        </p>
        <p>
          You keep your own Razorpay and Shiprocket accounts, so payments and shipping charges work as they do today.
          Bodhinox Connect records the orders and keeps the customer conversation, the payment and the delivery in one
          timeline.
        </p>
        <p>
          A simple way to begin is to add your ten best-selling products, connect Razorpay and send product messages to
          customers who ask about them. Once that works, share the storefront link in your campaigns and add a payment
          step to your order flow. Each order then shows up in the CRM, so you can see who buys again.
        </p>
      </CopySection>
    </PillarPage>
  );
}
