import Link from "next/link";
import { ContactDetails, SupportEmail } from "@/components/legal/LegalBits";
import { LEGAL_UPDATED, LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { legalLinks } from "@/content/nav";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Data deletion instructions",
  description:
    "How to delete your Bodhinox Connect account and data, including data received from WhatsApp and Meta, what we remove, what we keep by law and how long it takes.",
  path: "/data-deletion",
});

const sections: LegalSection[] = [
  {
    id: "account-holders",
    title: `If you have a ${site.name} account`,
    content: (
      <>
        <p>
          Sign in to the app at <a href={site.loginUrl}>{site.appUrl.replace(/^https?:\/\//, "")}</a> and open{" "}
          <strong>Settings → Privacy &amp; access</strong>.
        </p>
        <ul>
          <li>
            <strong>Delete a workspace:</strong> the workspace owner chooses to delete the workspace. Sending stops at
            once. The workspace can be restored for 30 days in case the request was a mistake; after that its contacts,
            conversations, media, campaigns, orders and settings are erased, except billing and tax records the law
            requires us to keep.
          </li>
          <li>
            <strong>Delete your account:</strong> delete your account from the same page. Your sign-in identity is
            anonymised and your sessions and API keys are revoked at once. Workspaces where you are the only member are
            closed as above. Workspaces you shared with others stay with their owners.
          </li>
          <li>
            <strong>Export first:</strong> you can download a copy of a workspace from the same page before deleting it.
            The export file is available for 7 days.
          </li>
          <li>
            <strong>Disconnect an account you connected:</strong> disconnecting a WhatsApp number, Instagram account,
            Facebook Page or other integration in Settings stops new data arriving from it; disconnecting a WhatsApp
            number also deletes our access token for it.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "facebook",
    title: "If you connected a Facebook account",
    content: (
      <>
        <p>
          {site.name} uses Facebook Login only to let a business connect its WhatsApp Business account, Instagram
          account, Facebook Pages or ad accounts to a workspace. We do not store your Facebook profile, friends, posts or
          other personal Facebook data.
        </p>
        <p>To remove our access:</p>
        <ol>
          <li>
            In Facebook, go to <strong>Settings &amp; privacy → Settings → Business integrations</strong> (or{" "}
            <strong>Apps and websites</strong>).
          </li>
          <li>Select {site.name} and remove it.</li>
          <li>
            Facebook then withdraws our access and sends us a deletion request. You get a confirmation code and a link to
            a status page in the {site.name} app, where you can check the request.
          </li>
        </ol>
        <p>
          To delete business data that a workspace holds (messages, contacts, orders), the workspace owner deletes it as
          described in <a href="#account-holders">For account holders</a>.
        </p>
      </>
    ),
  },
  {
    id: "messaged-a-business",
    title: `If you messaged a business that uses ${site.name}`,
    content: (
      <p>
        Your messages and contact details belong to that business’s workspace, and the business decides what happens to
        them. Ask the business to delete your data; reply STOP on WhatsApp to stop its campaigns. If you cannot reach the
        business, write to <SupportEmail /> with the business’s name and your phone number. We will pass the request on
        and help where we can, after confirming that the number is yours.
      </p>
    ),
  },
  {
    id: "website",
    title: "If you contacted us through this website",
    content: (
      <p>
        This website ({site.domain}) sets no tracking or analytics cookies and keeps no visitor profiles. If you wrote to
        us or used the contact form, write to <SupportEmail /> from the same email address and ask us to delete your
        messages.
      </p>
    ),
  },
  {
    id: "what-we-keep",
    title: "What we keep, and for how long",
    content: (
      <ul>
        <li>
          Billing, invoice and tax records, for as long as Indian tax and accounting law requires.
        </li>
        <li>
          An audit identity in the workspaces you belonged to, so a business’s own records of who did what stay intact.
          Your sign-in identity itself is anonymised.
        </li>
        <li>Logs and security records, only for as long as needed to secure the service, then deleted.</li>
      </ul>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <p>
          For any other deletion request, write to <SupportEmail />. We acknowledge requests within 3 working days and
          complete verified requests within 30 days.
        </p>
        <ContactDetails />
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      title="Data deletion instructions"
      crumb="Data deletion"
      path={legalLinks.dataDeletion}
      updated={LEGAL_UPDATED}
      sections={sections}
      intro={
        <p>
          This page explains how to have your data deleted from {site.name}, including data received from WhatsApp and
          Meta. The <Link href={legalLinks.privacy}>Privacy policy</Link> explains what we keep and for how long.
        </p>
      }
    />
  );
}
