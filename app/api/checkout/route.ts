import { parseCheckoutRequest } from "@/lib/cart";
import { buildCheckoutParams } from "@/lib/checkout";
import {
  getShippingCountries,
  getShippingRateIds,
  getSiteUrl,
  isAutomaticTaxEnabled,
} from "@/lib/config";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

function fail(error: string, status: number): Response {
  return Response.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Your cart could not be read.", 400);
  }

  const parsed = parseCheckoutRequest(body);
  if (!parsed.ok) return fail(parsed.error, 400);

  const stripe = getStripe();
  if (!stripe) {
    console.warn("[checkout] STRIPE_SECRET_KEY is not set. Checkout is disabled.");
    return fail("Checkout is temporarily unavailable. Please try again shortly.", 503);
  }

  try {
    const session = await stripe.checkout.sessions.create(
      buildCheckoutParams(parsed.lines, {
        siteUrl: getSiteUrl(),
        shippingCountries: getShippingCountries(),
        shippingRateIds: getShippingRateIds(),
        automaticTax: isAutomaticTaxEnabled(),
      }),
    );
    if (!session.url) throw new Error("Stripe returned a session without a URL.");
    return Response.json({ ok: true, url: session.url });
  } catch (error) {
    console.error("[checkout] Could not create the Checkout Session:", error);
    return fail("We couldn't start checkout just now. Please try again.", 502);
  }
}
