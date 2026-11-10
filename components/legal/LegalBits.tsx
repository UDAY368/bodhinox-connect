import Link from "next/link";
import { company, formatAddress } from "@/content/company";
import { site } from "@/content/site";

/** The support email as a visible mailto link. */
export function SupportEmail() {
  return <a href={site.mailto}>{site.email}</a>;
}

/**
 * Who runs the service. The legal name and registered address appear only
 * once they are filled in content/company.ts; nothing is invented here.
 */
export function OperatorSentence() {
  const address = formatAddress();
  return (
    <p>
      {site.name} is operated by {company.legalName || company.operator}
      {address ? <>, whose registered address is {address}</> : null}, from {company.country}. In these documents,
      “{company.operator}”, “we”, “us” and “our” mean the operator of {site.name}.
    </p>
  );
}

/** Contact lines for the end of each policy: email, plus address and phone once set. */
export function ContactDetails() {
  const address = formatAddress();
  return (
    <ul>
      <li>
        Email: <SupportEmail />
      </li>
      {company.legalName ? <li>Legal name: {company.legalName}</li> : null}
      {address ? <li>Postal address: {address}</li> : null}
      {company.phone ? (
        <li>
          Phone: <a href={`tel:${company.phone}`}>{company.phone}</a>
        </li>
      ) : null}
      <li>
        Contact page: <Link href="/contact">{site.domain}/contact</Link>
      </li>
    </ul>
  );
}
