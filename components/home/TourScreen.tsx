"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { MockStage } from "@/components/product/MockStage";

/*
 * Product-tour screens, loaded per tab. Only the first tab is in the HTML;
 * the others load when the visitor opens them, which keeps the home page
 * light (each full screen is ~800 DOM nodes).
 */

function Placeholder() {
  return <div className="aspect-[1280/780] w-full rounded-[22px] border border-border bg-card" />;
}
const loading = Placeholder;

const InboxScreen = dynamic(() => import("@/components/product/screens/InboxScreen").then((m) => m.InboxScreen), { loading });
const ContactsScreen = dynamic(() => import("@/components/product/screens/ContactsScreen").then((m) => m.ContactsScreen), { loading });
const AutomationScreen = dynamic(() => import("@/components/product/screens/AutomationScreen").then((m) => m.AutomationScreen), { loading });
const BroadcastsScreen = dynamic(() => import("@/components/product/screens/CampaignsScreen").then((m) => m.BroadcastsScreen), { loading });
const AiAgentsScreen = dynamic(() => import("@/components/product/screens/AiScreen").then((m) => m.AiAgentsScreen), { loading });
const PipelineScreen = dynamic(() => import("@/components/product/screens/SalesScreen").then((m) => m.PipelineScreen), { loading });
const ProductsScreen = dynamic(() => import("@/components/product/screens/ProductsScreen").then((m) => m.ProductsScreen), { loading });
const StoreScreen = dynamic(() => import("@/components/product/screens/StoreScreen").then((m) => m.StoreScreen), { loading });
const AnalyticsScreen = dynamic(() => import("@/components/product/screens/AnalyticsScreen").then((m) => m.AnalyticsScreen), { loading });

function screenFor(id: string): ReactNode {
  switch (id) {
    case "inbox":
      return <InboxScreen height={760} />;
    case "contacts":
      return <ContactsScreen height={760} />;
    case "automation":
      return <AutomationScreen height={760} />;
    case "campaigns":
      return <BroadcastsScreen height={760} />;
    case "ai":
      return <AiAgentsScreen height={760} />;
    case "sales":
      return <PipelineScreen />;
    case "products":
      return <ProductsScreen />;
    case "store":
      return <StoreScreen />;
    case "analytics":
      return <AnalyticsScreen />;
    default:
      return null;
  }
}

export function TourScreen({ id, label }: { id: string; label: string }) {
  const screen = screenFor(id);
  if (!screen) return null;
  return (
    <MockStage designWidth={1280} label={label} className="mx-auto max-w-[1200px]">
      {screen}
    </MockStage>
  );
}
