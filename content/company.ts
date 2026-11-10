/**
 * Business identity shown in the footer, on About and on Contact, and used
 * in Organization JSON-LD. Meta reviewers check this against the business
 * verification documents.
 *
 * Fill in legalName, address and phone ONLY with the exact values on the
 * registration documents. Each one renders only when it is filled in.
 * Never invent a legal name, address, CIN or GSTIN.
 */

export type CompanyAddress = {
  street: string;
  locality: string; // city
  region: string; // state
  postalCode: string;
  country: string;
};

export type Company = {
  brand: string;
  operator: string;
  country: string;
  countryCode: string;
  email: string;
  /** Registered legal entity name, exactly as on the documents. Leave empty until confirmed. */
  legalName?: string;
  /** Registered address. Leave undefined until confirmed. */
  address?: CompanyAddress;
  /** Public business phone in E.164, for example "+91XXXXXXXXXX". Leave empty until confirmed. */
  phone?: string;
};

export const company: Company = {
  brand: "Bodhinox Connect",
  operator: "Bodhinox",
  country: "India",
  countryCode: "IN",
  email: "uday@bodhinox.com",
  // TODO(owner): fill these in from the registration documents.
  legalName: "",
  address: undefined,
  phone: "",
};

/** One-line address for display, or null when no address is set. */
export function formatAddress(address = company.address): string | null {
  if (!address) return null;
  return [address.street, address.locality, address.region, address.postalCode, address.country]
    .filter(Boolean)
    .join(", ");
}
