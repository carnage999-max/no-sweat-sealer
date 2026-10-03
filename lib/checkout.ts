import type Stripe from "stripe";

import type { CartLine } from "@/lib/cart";
import { getVariant } from "@/lib/catalog";

export type CheckoutOptions = {
  siteUrl: string;
  shippingCountries: string[];
  shippingRateIds: string[];
  automaticTax: boolean;
};

/**
 * Builds the Stripe Checkout Session from a validated cart.
 *
 * Pure on purpose: no network, no environment access, so the exact payload that
 * would be sent to Stripe can be asserted in a unit test.
 */
export function buildCheckoutParams(
  lines: readonly CartLine[],
  options: CheckoutOptions,
): Stripe.Checkout.SessionCreateParams {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = lines.map(
    (line) => {
      const variant = getVariant(line.variantId);
      if (!variant) {
        throw new Error(`Unknown variant: ${line.variantId}`);
      }
      return {
        quantity: line.quantity,
        price_data: {
          currency: variant.currency,
          unit_amount: variant.priceCents,
          product_data: {
            name: variant.name,
            description: variant.tagline,
            metadata: { sku: variant.sku, variant_id: variant.id },
          },
        },
      };
    },
  );

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    line_items: lineItems,
    shipping_address_collection: {
      allowed_countries: options.shippingCountries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
    },
    allow_promotion_codes: true,
    success_url: `${options.siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${options.siteUrl}/cancel`,
    metadata: {
      source: "nosweat-site",
      cart: lines.map((line) => `${line.variantId}:${line.quantity}`).join(","),
    },
  };

  if (options.shippingRateIds.length > 0) {
    params.shipping_options = options.shippingRateIds.map((id) => ({
      shipping_rate: id,
    }));
  }

  if (options.automaticTax) {
    params.automatic_tax = { enabled: true };
  }

  return params;
}
