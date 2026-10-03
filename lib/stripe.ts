import Stripe from "stripe";

let client: Stripe | null = null;

/**
 * Lazily constructed so a missing key never fails `next build`. Returns null
 * when Stripe is not configured; callers answer with a graceful 503.
 */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  client ??= new Stripe(key, {
    httpClient: Stripe.createFetchHttpClient(),
    maxNetworkRetries: 2,
    appInfo: { name: "no-sweat-site" },
  });
  return client;
}
