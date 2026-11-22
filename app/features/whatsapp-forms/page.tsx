import Link from "next/link";
import {
  CopySection,
  HeroScreen,
  HighlightRow,
  Highlights,
  PhoneVisual,
  PillarPage,
  ScreenVisual,
} from "@/components/features/PillarPage";
import { ContactProfileScreen, SegmentsCard } from "@/components/product/screens/ContactsScreen";
import { FormBuilderScreen, FormPhone } from "@/components/product/screens/FormsScreen";
import { getFeature } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("whatsapp-forms");

export const metadata = pageMetadata({
  title: feature.seoTitle,
  description: feature.metaDescription,
  path: feature.href,
});

const linkClass = "text-primary underline underline-offset-4 hover:text-primary-hover";

const faqs: Faq[] = [
  {
    question: "What are WhatsApp Forms?",
    answer:
      "WhatsApp Forms are built on Meta Flows, WhatsApp's own way of showing a form inside the chat. The customer taps a button, a form with one or more screens opens over the conversation, and they fill it in without leaving WhatsApp.",
  },
  {
    question: "How many screens and which fields can a form have?",
    answer:
      "Up to 10 screens. Fields include short and long text, email, phone, number, date, dropdown, single choice, multiple choice and an opt-in checkbox. Each field can be required and validated.",
  },
  {
    question: "Where do the answers go?",
    answer:
      "Each answer is saved straight to a field on the contact, such as name, email or skin type. You also get a responses list for each form with CSV export.",
  },
  {
    question: "How do I send a form to customers?",
    answer:
      "From the inbox composer, as a step in a chatbot flow, as a button on an approved template, or in a campaign. You publish the form to Meta in one click before sending it.",
  },
  {
    question: "Can a form record WhatsApp marketing consent?",
    answer:
      "Yes. Add an opt-in checkbox to the form. When the customer ticks it, the opt-in is recorded on their contact with the form as the source and the date.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="WhatsApp Forms built on Meta Flows"
      lead="Build multi-screen forms that open inside the WhatsApp chat. Collect leads, bookings and feedback without a website, and save every answer straight to the contact."
      heroVisual={
        <HeroScreen label="The form builder: a list of screens, field settings with the contact field each answer saves to, and a live phone preview of the form.">
          <FormBuilderScreen height={760} />
        </HeroScreen>
      }
      bulletsHeading="Everything in WhatsApp Forms"
      faqs={faqs}
      related={["automation", "crm-analytics", "appointments"]}
    >
      <Highlights label="WhatsApp Forms highlights">
        <HighlightRow
          id="hl-phone"
          eyebrow="Inside the chat"
          heading="A real form, without leaving WhatsApp"
          visual={
            <PhoneVisual label="A WhatsApp Form open over the chat on a phone, step 1 of 3, asking for full name and skin type.">
              <FormPhone />
            </PhoneVisual>
          }
        >
          <p>
            Customers tap a button and a native form opens over the chat, with dropdowns, choices, dates and a consent
            checkbox. No browser, no login, no lost leads on a slow website.
          </p>
        </HighlightRow>
        <HighlightRow
          flip
          id="hl-contact"
          eyebrow="Saved to the contact"
          heading="Every answer lands on the customer record"
          visual={
            <ScreenVisual
              designWidth={1280}
              label="A contact profile with custom fields filled from form answers, the opt-in record with its source and date, and the contact timeline."
            >
              <ContactProfileScreen height={720} />
            </ScreenVisual>
          }
        >
          <p>
            Map each field to a contact field once. Answers are validated and saved as soon as the form is sent, together
            with the opt-in record if the customer ticked the box.
          </p>
        </HighlightRow>
        <HighlightRow
          id="hl-segments"
          eyebrow="Put answers to work"
          heading="Segment and follow up on what people told you"
          visual={
            <ScreenVisual
              designWidth={620}
              label="Segments built from contact data, such as dry-skin buyers and Instagram reel leads, with contact counts."
            >
              <SegmentsCard />
            </ScreenVisual>
          }
        >
          <p>
            Answers become segment rules, flow conditions and campaign variables. Ask once for skin type and send each
            customer the routine that suits them.
          </p>
        </HighlightRow>
      </Highlights>

      <CopySection id="problem" eyebrow="The problem" heading="Collecting details over chat is slow and messy">
        <p>
          When a business needs a few details from a customer, such as name, city, budget, preferred date or the problem
          they want solved, it usually asks one question at a time in the chat. The customer answers some, skips others,
          and replies to the third question an hour later. Someone then copies the answers into a spreadsheet by hand.
        </p>
        <p>
          Sending a link to a web form is not much better. The customer leaves WhatsApp, the page loads slowly on mobile
          data, and many never come back. The answers end up in a separate tool that nobody connects to the chat.
        </p>
        <p>
          WhatsApp Forms keep the whole exchange inside the chat, in one tidy form, and put the answers where your team
          already works.
        </p>
      </CopySection>

      <CopySection id="how-it-works" eyebrow="How it works" heading="Build, publish, send, use the answers" tone="sunken">
        <h3>Build with a live preview</h3>
        <p>
          Add up to 10 screens and choose fields for each: short and long text, email, phone, number, date, dropdown,
          single choice, multiple choice and an opt-in checkbox. A phone preview beside the builder shows exactly what
          the customer will see. Set the button text and the confirmation message.
        </p>
        <h3>Save answers to contact fields</h3>
        <p>
          For each field, choose the contact field the answer saves to. Required fields and validation keep the data
          clean, so a phone number looks like a phone number and a date is a date.
        </p>
        <h3>Publish and send anywhere</h3>
        <p>
          Publish the form to Meta in one click. Then send it from the inbox, add it as a step in a{" "}
          <Link href="/features/automation" className={linkClass}>
            chatbot flow
          </Link>
          , attach it to a template button, or include it in a{" "}
          <Link href="/features/campaigns" className={linkClass}>
            campaign
          </Link>
          .
        </p>
        <h3>Responses and export</h3>
        <p>
          Every form has a responses list with each submission, and you can export it as CSV for your records or another
          tool.
        </p>
      </CopySection>

      <CopySection id="who-its-for" eyebrow="Who it is for" heading="For any business that asks the same questions">
        <p>
          WhatsApp Forms suit lead capture, enquiries, consultations, admissions, feedback and surveys. A skincare brand
          asks skin type and concerns before recommending a routine. A coaching institute collects the student&apos;s
          class, subjects and preferred batch. A real estate firm asks budget, location and move-in date. A clinic
          collects patient details before a visit.
        </p>
        <p>
          Forms work well with click-to-WhatsApp ads: the ad opens a chat, a welcome flow sends the form, and a qualified
          lead with full details reaches your team within a minute.
        </p>
      </CopySection>
    </PillarPage>
  );
}
