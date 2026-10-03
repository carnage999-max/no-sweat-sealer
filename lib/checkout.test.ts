import { describe, expect, it } from "vitest";

import { buildCheckoutParams } from "@/lib/checkout";

const base = {
  siteUrl: "https://example.com",
  shippingCountries: ["US"],
  shippingRateIds: [] as string[],
  automaticTax: false,
};

describe("buildCheckoutParams", () => {
  const lines = [
    { variantId: "4oz", quantity: 2 },
    { variantId: "1gal", quantity: 1 },
  ] as const;

  it("prices every line from the server-side catalog", () => {
    const params = buildCheckoutParams(lines, base);
    expect(params.mode).toBe("payment");
    expect(params.line_items).toEqual([
      {
        quantity: 2,
        price_data: {
          currency: "usd",
          unit_amount: 1499,
          product_data: {
            name: "No Sweat® 4 oz Spray",
            description: "Personal spray bottle",
            metadata: { sku: "NS-4OZ", variant_id: "4oz" },
          },
        },
      },
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: 14900,
          product_data: {
            name: "No Sweat® Commercial Gallon",
            description: "Commercial jug",
            metadata: { sku: "NS-1GAL", variant_id: "1gal" },
          },
        },
      },
    ]);
  });

  it("returns to the site with the session id, and cancels to /cancel", () => {
    const params = buildCheckoutParams(lines, base);
    expect(params.success_url).toBe(
      "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
    );
    expect(params.cancel_url).toBe("https://example.com/cancel");
  });

  it("collects a shipping address in the configured countries", () => {
    const params = buildCheckoutParams(lines, { ...base, shippingCountries: ["US", "CA"] });
    expect(params.shipping_address_collection).toEqual({
      allowed_countries: ["US", "CA"],
    });
  });

  it("omits shipping options and tax unless configured", () => {
    const params = buildCheckoutParams(lines, base);
    expect(params.shipping_options).toBeUndefined();
    expect(params.automatic_tax).toBeUndefined();
  });

  it("applies configured shipping rates and automatic tax", () => {
    const params = buildCheckoutParams(lines, {
      ...base,
      shippingRateIds: ["shr_1", "shr_2"],
      automaticTax: true,
    });
    expect(params.shipping_options).toEqual([
      { shipping_rate: "shr_1" },
      { shipping_rate: "shr_2" },
    ]);
    expect(params.automatic_tax).toEqual({ enabled: true });
  });

  it("records the cart in metadata and allows promotion codes", () => {
    const params = buildCheckoutParams(lines, base);
    expect(params.metadata).toEqual({ source: "nosweat-site", cart: "4oz:2,1gal:1" });
    expect(params.allow_promotion_codes).toBe(true);
  });
});
