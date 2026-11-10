import { Hero } from "@/components/home/Hero";
import {
  FinalCta,
  HomeFaq,
  HowItWorks,
  Industries,
  Outcomes,
  Pillars,
  PricingTeaser,
  ProblemOutcome,
  Trust,
} from "@/components/home/Sections";
import { Spotlights } from "@/components/home/Spotlights";
import { homeFaqs } from "@/content/faqs";
import { faqPageJsonLd, JsonLd, pageMetadata, softwareApplicationJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "WhatsApp CRM and Marketing Platform | Bodhinox Connect",
  absoluteTitle: true,
  description:
    "WhatsApp CRM and marketing platform for Indian businesses: shared inbox, broadcasts, chatbot flows, AI agent, store and Razorpay UPI payments in one place.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemOutcome />
      <Pillars />
      <HowItWorks />
      <Spotlights />
      <Outcomes />
      <Industries />
      <Trust />
      <PricingTeaser />
      <HomeFaq faqs={homeFaqs} />
      <FinalCta />
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={faqPageJsonLd(homeFaqs)} />
    </>
  );
}
