import Link from "next/link";
import {
  CopySection,
  HeroScreen,
  HighlightRow,
  Highlights,
  PillarPage,
  ScreenVisual,
  VisualPanel,
} from "@/components/features/PillarPage";
import { MockStage } from "@/components/product/MockStage";
import { ProductsScreen } from "@/components/product/screens/ProductsScreen";
import { OrdersScreen, PaymentsCard } from "@/components/product/screens/SalesScreen";
import { StoreDesktopPreview, StoreScreen, StorefrontPhone } from "@/components/product/screens/StoreScreen";
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
    question: "Do I get my own online store, or only a WhatsApp catalogue?",
    answer:
      "You get both. Your catalogue powers product messages in WhatsApp and a full online store with its own link and QR code. Pick a template, edit the theme, home sections, menu, footer and pages with a phone and desktop preview, and choose whether the shop is open, password protected or coming soon.",
  },
  {
    question: "How do customers order from the store?",
    answer:
      "Buyers fill their cart on the store and either confirm the order with a code sent to their WhatsApp, or send the cart to you as a WhatsApp message. Either way the order, the contact and the chat stay linked in Bodhinox Connect.",
  },
  {
    question: "How do Razorpay payments work?",
    answer:
      "You connect your own Razorpay account. Customers pay by UPI, card or net banking through a Razorpay payment link in the chat or at checkout on your store. The payment is matched to the order, and the money goes to your Razorpay account as usual.",
  },
  {
    question: "Can customers pay cash on delivery?",
    answer:
      "Yes. You can offer cash on delivery alongside online payment. COD orders appear in the same list as prepaid orders, so you can follow them through to delivery.",
  },
  {
    question: "I already sell on Shopify or WooCommerce. Can I still use this?",
    answer:
      "Yes. Connect your Shopify or WooCommerce store and Bodhinox Connect sends order messages on WhatsApp for orders placed there, while you keep running the store you have. You can also sync your catalogue with the Meta catalogue.",
  },
  {
    question: "Do you take a cut of my sales?",
    answer:
      "No. There is no fee on orders. Razorpay and Shiprocket charge their usual rates on your own accounts, and your Bodhinox Connect plan covers the software.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="A WhatsApp store and online shop with UPI payments"
      lead="Build your own online store from your catalogue, take orders on WhatsApp, collect UPI, card and net banking payments through Razorpay or cash on delivery, and ship with Shiprocket. No fee on orders."
      heroVisual={
        <HeroScreen label="Online store settings: setup checklist, the public shop link with a QR code, the current template with an edit theme button, visibility set to published, and a live preview of the shop.">
          <StoreScreen height={800} />
        </HeroScreen>
      }
      bulletsHeading="Everything in products, store and payments"
      faqs={faqs}
      related={["campaigns", "instagram", "appointments"]}
    >
      <Highlights label="Store and payments highlights">
        <HighlightRow
          id="hl-store"
          eyebrow="Online store builder"
          heading="Your own shop, on desktop and phone"
          visual={
            <VisualPanel className="grid items-center gap-4 sm:grid-cols-[2.4fr_1fr]">
              <MockStage
                designWidth={900}
                label="The public online store on a desktop browser, with a sale banner, category menu and bestsellers."
              >
                <StoreDesktopPreview />
              </MockStage>
              <MockStage
                designWidth={320}
                label="The same store on a phone, with products, prices and an order button."
                className="mx-auto w-full max-w-[220px]"
              >
                <StorefrontPhone />
              </MockStage>
            </VisualPanel>
          }
        >
          <p>
            Pick a template, set your brand, then edit home sections, menu, footer and pages with a live phone and desktop
            preview. Share the link or QR code, collect reviews and watch shop reports.
          </p>
        </HighlightRow>
        <HighlightRow
          flip
          id="hl-catalogue"
          eyebrow="Catalogue"
          heading="One catalogue for chat, store and Meta"
          visual={
            <ScreenVisual
              designWidth={1280}
              label="Product catalogue grid with categories, collections, prices, stock levels and live switches, and a Meta catalogue link."
            >
              <ProductsScreen height={720} />
            </ScreenVisual>
          }
        >
          <p>
            Products with categories, collections, variants and stock feed your store, product messages in chat and your
            Meta catalogue. Switch a product off and it disappears everywhere.
          </p>
        </HighlightRow>
        <HighlightRow
          id="hl-orders"
          eyebrow="Orders and payments"
          heading="Every order paid, packed and tracked"
          visual={
            <div className="flex flex-col gap-4">
              <ScreenVisual
                designWidth={1280}
                label="Orders list with an open order showing items, GST, cash on delivery total, courier and shipping status, and a link to the chat."
              >
                <OrdersScreen height={720} />
              </ScreenVisual>
              <ScreenVisual
                designWidth={600}
                label="Razorpay payments: collected today, settled to bank, next payout and refunds, with payment links matched to orders."
              >
                <PaymentsCard />
              </ScreenVisual>
            </div>
          }
        >
          <p>
            Razorpay links are matched to orders, so nobody checks screenshots. Each order shows items, GST, payment and
            shipping status, and returns and refunds stay on the same record.
          </p>
        </HighlightRow>
      </Highlights>

      <CopySection id="problem" eyebrow="The problem" heading="Selling on WhatsApp by hand is slow">
        <p>
          A lot of Indian buying already happens on WhatsApp. A customer asks for photos, you send them, they pick one,
          you share your UPI ID, they send a screenshot, and someone checks the bank app to confirm. Then you note the
          address in a register, book a courier on another website and copy the tracking number back into the chat.
        </p>
        <p>
          Every step is manual, so every step can go wrong. Screenshots get missed or faked. Stock runs out after you
          promised the item. Two staff members sell the last piece to two customers. Nobody can tell you at the end of
          the month how much came in through WhatsApp.
        </p>
        <p>
          Building a separate website does not fix it on its own either. Customers still ask questions on WhatsApp before
          they buy, and the website order and the chat live in two systems that never meet. A WhatsApp store puts the
          products, the shop, the cart, the payment and the shipping in one place, next to the conversation.
        </p>
      </CopySection>

      <CopySection id="how-it-works" eyebrow="How it works" heading="From catalogue to delivered order" tone="sunken">
        <h3>Your catalogue</h3>
        <p>
          Add products with variants such as size and colour, group them into categories and collections, and set stock
          for each. Sync with the Meta catalogue so the same products show in WhatsApp.
        </p>
        <h3>Your online store</h3>
        <p>
          Publish a store from that catalogue with a ready-made template. The theme editor covers brand colours and
          fonts, home sections, menu, footer and extra pages, with a phone and desktop preview before you publish. Your
          shop gets a shareable link and a QR code for your counter, packaging and Instagram bio. Keep it open to
          everyone, protect it with a password, or show a coming soon page while you get ready, and set up redirects when
          a page moves.
        </p>
        <h3>Ordering through WhatsApp</h3>
        <p>
          Buyers confirm their order with a code sent to their WhatsApp, or send their cart to you as a WhatsApp
          message. You can also send product messages, store links and payment links straight from the inbox or from a
          flow step.
        </p>
        <h3>Get paid through Razorpay</h3>
        <p>
          Connect your Razorpay account and customers pay by UPI, card or net banking. Payments are matched to orders, so
          there are no screenshots to check. Offer cash on delivery as well if your customers prefer it.
        </p>
        <h3>Orders, refunds and shipping</h3>
        <p>
          Each order has its own record with items, payment and delivery status, and order notices go to the customer on
          WhatsApp. Returns and refunds are handled from the same order. Connect Shiprocket to ship and share tracking.
          If you also sell on Shopify or WooCommerce, their orders can trigger WhatsApp messages too.
        </p>
        <h3>Reviews and shop reports</h3>
        <p>
          Collect product reviews on your store, and see shop reports and commerce revenue in analytics, next to your
          conversations and campaigns.
        </p>
      </CopySection>

      <CopySection id="who-its-for" eyebrow="Who it is for" heading="For businesses that already sell in chat">
        <p>
          The store suits D2C brands, boutiques, home bakers, handloom sellers, Ayurvedic and wellness brands, electronics
          shops and any business whose customers already ask for photos and prices on WhatsApp or Instagram. It also suits
          businesses with a Shopify or WooCommerce store who want order updates and pre-sale questions handled in chat.
        </p>
        <p>
          You keep your own Razorpay and Shiprocket accounts, so payments and shipping charges work as they do today, and
          there is no fee on orders. Bodhinox Connect records the orders and keeps the customer conversation, the payment
          and the delivery in one timeline.
        </p>
        <p>
          A simple way to begin is to add your ten best-selling products, publish the store with a template, connect
          Razorpay and share the link in your Instagram bio and your next campaign. Each order then shows up in the CRM,
          so you can see who buys again. Selling time instead of stock? See{" "}
          <Link href="/features/appointments" className="text-primary underline underline-offset-4 hover:text-primary-hover">
            appointment booking
          </Link>
          .
        </p>
      </CopySection>
    </PillarPage>
  );
}
