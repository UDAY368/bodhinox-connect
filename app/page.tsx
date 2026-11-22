import { Hero } from "@/components/home/Hero";
import {
  AdsAndChannels,
  FeatureRows,
  FinalCtaSection,
  HomeFaqSection,
  IndustriesSection,
  IntegrationsSection,
  PricingTeaserSection,
  ProductTourSection,
  ReplacesStrip,
  TrustSection,
} from "@/components/home/HomeSections";
import { homeFaqs } from "@/content/faqs";
import { faqPageJsonLd, JsonLd, pageMetadata, softwareApplicationJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "WhatsApp and Instagram CRM for India | Bodhinox Connect",
  absoluteTitle: true,
  description:
    "WhatsApp and Instagram CRM for Indian businesses: shared inbox, campaigns, chatbot flows, KHAGA AI agents, online store, Razorpay payments and bookings in one place.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ReplacesStrip />
      <ProductTourSection />
      <FeatureRows />
      <AdsAndChannels />
      <IntegrationsSection />
      <TrustSection />
      <IndustriesSection />
      <PricingTeaserSection />
      <HomeFaqSection faqs={homeFaqs} />
      <FinalCtaSection />
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={faqPageJsonLd(homeFaqs)} />
    </>
  );
}
