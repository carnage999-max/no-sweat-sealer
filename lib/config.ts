/**
 * Server-side configuration. Every value is read lazily from the environment
 * inside a function, never at module scope, so a missing variable can never
 * fail `next build`.
 */

const FALLBACK_SITE_URL = "https://nosweatsealer.com";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/+$/, "");
  return process.env.NODE_ENV === "production"
    ? FALLBACK_SITE_URL
    : "http://localhost:3000";
}

export function getReceiverEmails(): string[] {
  return (process.env.CONTACT_RECEIVER_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export function getFromEmail(): string | undefined {
  return process.env.CONTACT_FROM_EMAIL?.trim() || undefined;
}

export function getShippingRateIds(): string[] {
  return (process.env.STRIPE_SHIPPING_RATE_IDS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export function getShippingCountries(): string[] {
  const configured = (process.env.CHECKOUT_SHIPPING_COUNTRIES ?? "")
    .split(",")
    .map((value) => value.trim().toUpperCase())
    .filter(Boolean);
  return configured.length > 0 ? configured : ["US"];
}

export function isAutomaticTaxEnabled(): boolean {
  return process.env.STRIPE_AUTOMATIC_TAX === "true";
}
