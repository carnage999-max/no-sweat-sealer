import { describe, expect, it } from "vitest";

import {
  cartCount,
  cartSubtotalCents,
  MAX_QUANTITY_PER_LINE,
  parseCheckoutRequest,
  restoreCart,
} from "@/lib/cart";

describe("parseCheckoutRequest (the payment trust boundary)", () => {
  it("accepts a valid cart", () => {
    const result = parseCheckoutRequest({
      items: [
        { variantId: "4oz", quantity: 2 },
        { variantId: "1gal", quantity: 1 },
      ],
    });
    expect(result).toEqual({
      ok: true,
      lines: [
        { variantId: "4oz", quantity: 2 },
        { variantId: "1gal", quantity: 1 },
      ],
    });
  });

  it.each([
    ["null", null],
    ["a string", "4oz"],
    ["no items", {}],
    ["empty items", { items: [] }],
    ["items not an array", { items: "4oz" }],
  ])("rejects %s", (_label, body) => {
    expect(parseCheckoutRequest(body).ok).toBe(false);
  });

  it("rejects an unknown variant", () => {
    const result = parseCheckoutRequest({ items: [{ variantId: "5gal", quantity: 1 }] });
    expect(result.ok).toBe(false);
  });

  it.each([0, -1, 1.5, 100, "2", null, NaN, Infinity])(
    "rejects quantity %s",
    (quantity) => {
      const result = parseCheckoutRequest({ items: [{ variantId: "4oz", quantity }] });
      expect(result.ok).toBe(false);
    },
  );

  it("accepts the maximum quantity", () => {
    const result = parseCheckoutRequest({
      items: [{ variantId: "4oz", quantity: MAX_QUANTITY_PER_LINE }],
    });
    expect(result.ok).toBe(true);
  });

  it("rejects duplicate lines instead of silently merging them", () => {
    const result = parseCheckoutRequest({
      items: [
        { variantId: "4oz", quantity: 1 },
        { variantId: "4oz", quantity: 1 },
      ],
    });
    expect(result.ok).toBe(false);
  });

  it("ignores any client-supplied price", () => {
    const result = parseCheckoutRequest({
      items: [{ variantId: "4oz", quantity: 1, price: 1, priceCents: 1, unit_amount: 1 }],
    });
    expect(result).toEqual({ ok: true, lines: [{ variantId: "4oz", quantity: 1 }] });
  });
});

describe("restoreCart (saved-cart recovery)", () => {
  it("drops garbage and clamps quantities", () => {
    expect(
      restoreCart([
        { variantId: "4oz", quantity: 3 },
        { variantId: "nope", quantity: 1 },
        { variantId: "16oz", quantity: 5000 },
        { variantId: "1gal", quantity: "x" },
        null,
        42,
      ]),
    ).toEqual([
      { variantId: "4oz", quantity: 3 },
      { variantId: "16oz", quantity: MAX_QUANTITY_PER_LINE },
    ]);
  });

  it("merges duplicates and survives non-arrays", () => {
    expect(
      restoreCart([
        { variantId: "4oz", quantity: 2 },
        { variantId: "4oz", quantity: 3 },
      ]),
    ).toEqual([{ variantId: "4oz", quantity: 5 }]);
    expect(restoreCart("garbage")).toEqual([]);
    expect(restoreCart(undefined)).toEqual([]);
  });
});

describe("cart totals", () => {
  const lines = [
    { variantId: "4oz", quantity: 2 },
    { variantId: "1gal", quantity: 1 },
  ] as const;

  it("counts units", () => {
    expect(cartCount(lines)).toBe(3);
  });

  it("totals in cents from the catalog", () => {
    expect(cartSubtotalCents(lines)).toBe(2 * 1499 + 14900);
  });
});
