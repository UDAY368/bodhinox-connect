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
import { AppointmentsScreen, BookingPageCard, BookingPhone } from "@/components/product/screens/AppointmentsScreen";
import { PaymentsCard } from "@/components/product/screens/SalesScreen";
import { getFeature } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("appointments");

export const metadata = pageMetadata({
  title: feature.seoTitle,
  description: feature.metaDescription,
  path: feature.href,
});

const linkClass = "text-primary underline underline-offset-4 hover:text-primary-hover";

const faqs: Faq[] = [
  {
    question: "How does WhatsApp appointment booking work?",
    answer:
      "You share a booking page link. The customer picks a service, a practitioner, a date and a time, then confirms by sending the code shown on the page to your WhatsApp number. The booking appears in your schedule and the customer gets a confirmation and a manage-booking link on WhatsApp.",
  },
  {
    question: "Are reminders sent automatically?",
    answer:
      "Yes. Customers get a WhatsApp reminder 24 hours before and again 2 hours before the appointment, without anyone on your team having to send them.",
  },
  {
    question: "Can customers pay in advance?",
    answer:
      "Yes. Mark a service as paid and set its price. The customer pays through Razorpay by UPI, card or net banking, and the payment is linked to the booking. Paid slots cut no-shows.",
  },
  {
    question: "Can I manage several practitioners and branches?",
    answer:
      "Yes. Add practitioners with their own weekly hours and holidays, and locations with their own time zones. Customers choose who they want to see and where, and you can filter the schedule by practitioner and location.",
  },
  {
    question: "Can customers book from a chatbot instead of the booking page?",
    answer:
      "Yes. Add a booking step to a chatbot flow and customers can pick a slot inside the WhatsApp chat. The booking goes into the same schedule.",
  },
  {
    question: "What happens after the appointment?",
    answer:
      "Mark each visit completed or a no-show. You can create follow-up tasks, such as sending a care routine or booking the next visit, and every booking shows on the contact's timeline.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="WhatsApp appointment booking with automatic reminders"
      lead="Share a booking page, let customers confirm on WhatsApp, take payment in advance through Razorpay, and let reminders go out by themselves 24 hours and 2 hours before every visit."
      heroVisual={
        <HeroScreen label="Appointments schedule for the week with bookings by practitioner and location, a needs-attention list with a booking waiting for its WhatsApp code and a paid booking link sent, and after-visit tasks.">
          <AppointmentsScreen height={800} />
        </HeroScreen>
      }
      bulletsHeading="Everything in appointments"
      faqs={faqs}
      related={["commerce", "whatsapp-forms", "automation"]}
    >
      <Highlights label="Appointment booking highlights">
        <HighlightRow
          id="hl-page"
          eyebrow="Booking page"
          heading="A booking page you can share anywhere"
          visual={
            <ScreenVisual
              designWidth={560}
              label="A public booking page: choose a service, a practitioner with their qualifications and languages, a date and a time slot."
              className="mx-auto max-w-xl"
            >
              <BookingPageCard />
            </ScreenVisual>
          }
        >
          <p>
            Customers pick a service, a practitioner, a date and a time on a clean page with your name on it. Put the
            link in your Instagram bio, your Google profile, your campaigns and your flows.
          </p>
        </HighlightRow>
        <HighlightRow
          flip
          id="hl-confirm"
          eyebrow="Confirmed on WhatsApp"
          heading="Confirmed with a code, reminded twice"
          visual={
            <PhoneVisual label="A booking confirmed on WhatsApp with the code BOOK 4821, followed by a reminder message before the consultation.">
              <BookingPhone />
            </PhoneVisual>
          }
        >
          <p>
            The customer confirms by sending a short code to your WhatsApp, so every booking comes with a real, reachable
            number. Reminders go out 24 hours and 2 hours before, and a manage-booking link lets them reschedule or cancel.
          </p>
        </HighlightRow>
        <HighlightRow
          id="hl-paid"
          eyebrow="Paid appointments"
          heading="Take payment when the slot is booked"
          visual={
            <ScreenVisual
              designWidth={600}
              label="Razorpay payments: collected today, settled to bank, next payout and refunds, with payment links matched to bookings and orders."
            >
              <PaymentsCard />
            </ScreenVisual>
          }
        >
          <p>
            Mark a service as paid and the customer pays through Razorpay by UPI, card or net banking while booking.
            Payments are matched to the booking and settle to your own account.
          </p>
        </HighlightRow>
      </Highlights>

      <CopySection id="problem" eyebrow="The problem" heading="Booking by chat eats the front desk's day">
        <p>
          Clinics, salons, tutors and consultants in India take most bookings over WhatsApp and the phone. Each one is a
          small back-and-forth. Which day suits you? Morning or evening? Dr. Lakshmi or Dr. Rao? Someone checks a paper
          diary or a shared spreadsheet, offers a slot, waits for a reply, and by then the slot has gone to someone else.
        </p>
        <p>
          Then come the no-shows. Without a reminder, a good share of customers forget. Without an advance payment, there
          is no cost to skipping. The slot sits empty and the practitioner&apos;s time is lost.
        </p>
        <p>
          Appointment booking on WhatsApp lets customers book themselves, confirms each booking on the chat app they
          already use, and sends the reminders for you.
        </p>
      </CopySection>

      <CopySection id="how-it-works" eyebrow="How it works" heading="Services, people and places, set up once" tone="sunken">
        <h3>Services</h3>
        <p>
          Add each service with its duration, buffer time between appointments, capacity for group sessions, price, and
          whether it happens online or in person.
        </p>
        <h3>Practitioners and locations</h3>
        <p>
          Add the people who see customers, with their weekly hours and holidays, and the locations they work from, each
          with its own time zone. Customers only see slots that are really free.
        </p>
        <h3>Booking page and WhatsApp confirmation</h3>
        <p>
          Share your public booking page. The customer picks a slot and confirms by sending a code to your WhatsApp. They
          get a confirmation with a manage-booking link to reschedule or cancel without calling you.
        </p>
        <h3>Reminders and payments</h3>
        <p>
          Reminders go out automatically 24 hours and 2 hours before. For paid services, the customer pays through
          Razorpay while booking. You can also add a booking step to a{" "}
          <Link href="/features/automation" className={linkClass}>
            chatbot flow
          </Link>{" "}
          so customers book without leaving the chat.
        </p>
        <h3>Schedule, outcomes and follow-ups</h3>
        <p>
          See the schedule by day, week or list, filtered by practitioner and location. Mark each visit completed or a
          no-show, and create follow-up tasks such as sending a diet chart or booking the next visit. Every booking shows
          on the contact&apos;s timeline in the CRM.
        </p>
      </CopySection>

      <CopySection id="who-its-for" eyebrow="Who it is for" heading="For businesses that sell time">
        <p>
          Appointment booking suits clinics, Ayurveda and wellness centres, dentists, physiotherapists, salons and spas,
          tutors and coaching centres, consultants, and repair and home services: anyone who sells time instead of
          stock. A paid booking holds the slot, and two reminders help the customer turn up.
        </p>
        <p>
          If you also sell products, the same workspace runs your{" "}
          <Link href="/features/commerce" className={linkClass}>
            online store and payments
          </Link>
          , so a customer who books a consultation can order the recommended products in the same chat.
        </p>
      </CopySection>
    </PillarPage>
  );
}
