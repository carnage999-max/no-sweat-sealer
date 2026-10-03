/**
 * Shared form definitions and validation. Pure (no Node or browser APIs), so
 * the same code validates on the client for instant feedback and on the server
 * as the authoritative check.
 */

export const INDUSTRIES = [
  "Café / coffee shop",
  "Restaurant",
  "Bar / nightlife",
  "Event / catering",
  "Convenience / retail",
  "Beverage manufacturer / distributor",
  "Other",
] as const;

export const MONTHLY_VOLUMES = [
  "Under 25 units",
  "25–100 units",
  "100–500 units",
  "500+ units",
  "Not sure yet",
] as const;

export const DESIRED_SIZES = [
  "4 oz",
  "16 oz",
  "1 gallon",
  "A mix of sizes",
  "Not sure yet",
] as const;

export const CONTACT_TOPICS = [
  "Order support",
  "Product question",
  "Safety / SDS",
  "Press",
  "Other",
] as const;

export type FieldErrors = Record<string, string>;

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors: FieldErrors };

export type CommercialInquiry = {
  business: string;
  name: string;
  email: string;
  phone: string;
  industry: (typeof INDUSTRIES)[number];
  monthlyVolume: (typeof MONTHLY_VOLUMES)[number];
  desiredSize: (typeof DESIRED_SIZES)[number];
  message: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  topic: (typeof CONTACT_TOPICS)[number];
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function oneLine(value: unknown, max: number): string {
  return typeof value === "string"
    ? value.replace(/\s+/g, " ").trim().slice(0, max)
    : "";
}

function multiLine(value: unknown, max: number): string {
  return typeof value === "string"
    ? value
        .replace(/\r\n/g, "\n")
        .replace(/\n{4,}/g, "\n\n\n")
        .trim()
        .slice(0, max)
    : "";
}

function oneOf<T extends string>(
  value: string,
  options: readonly T[],
): T | undefined {
  return options.find((option) => option === value);
}

function fail<T>(fieldErrors: FieldErrors): ValidationResult<T> {
  const error = Object.values(fieldErrors)[0] ?? "Please check the form.";
  return { ok: false, error, fieldErrors };
}

function asRecord(input: unknown): Record<string, unknown> {
  return typeof input === "object" && input !== null
    ? (input as Record<string, unknown>)
    : {};
}

/** A field real visitors never see. Bots tend to fill every input they find. */
export const HONEYPOT_FIELD = "website";

export function isHoneypotTripped(input: unknown): boolean {
  return oneLine(asRecord(input)[HONEYPOT_FIELD], 200).length > 0;
}

export function validateCommercialInquiry(
  input: unknown,
): ValidationResult<CommercialInquiry> {
  const raw = asRecord(input);
  const errors: FieldErrors = {};

  const business = oneLine(raw.business, 160);
  const name = oneLine(raw.name, 120);
  const email = oneLine(raw.email, 200);
  const phone = oneLine(raw.phone, 40);
  const message = multiLine(raw.message, 4000);
  const industry = oneOf(oneLine(raw.industry, 80), INDUSTRIES);
  const monthlyVolume = oneOf(oneLine(raw.monthlyVolume, 40), MONTHLY_VOLUMES);
  const desiredSize = oneOf(oneLine(raw.desiredSize, 40), DESIRED_SIZES);

  if (!business) errors.business = "Please enter your business name.";
  if (!name) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";
  if (!industry) errors.industry = "Please choose your industry.";
  if (!monthlyVolume) errors.monthlyVolume = "Please choose an estimated monthly volume.";
  if (!desiredSize) errors.desiredSize = "Please choose a size.";

  if (Object.keys(errors).length > 0 || !industry || !monthlyVolume || !desiredSize) {
    return fail(errors);
  }

  return {
    ok: true,
    data: { business, name, email, phone, industry, monthlyVolume, desiredSize, message },
  };
}

export function validateContactMessage(
  input: unknown,
): ValidationResult<ContactMessage> {
  const raw = asRecord(input);
  const errors: FieldErrors = {};

  const name = oneLine(raw.name, 120);
  const email = oneLine(raw.email, 200);
  const message = multiLine(raw.message, 4000);
  const topic = oneOf(oneLine(raw.topic, 80), CONTACT_TOPICS);

  if (!name) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";
  if (!topic) errors.topic = "Please choose a topic.";
  if (message.length < 10) errors.message = "Please add a little more detail to your message.";

  if (Object.keys(errors).length > 0 || !topic) {
    return fail(errors);
  }

  return { ok: true, data: { name, email, topic, message } };
}
