import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { json, mockFetch } from "@/test/fetch-mock";

function post(body: unknown) {
  return new Request("http://localhost/api/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function loadRoute() {
  vi.resetModules();
  return (await import("./route")).POST;
}

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://shop.test");
  vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_123");
  vi.stubEnv("STRIPE_SHIPPING_RATE_IDS", "");
  vi.stubEnv("STRIPE_AUTOMATIC_TAX", "");
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/checkout", () => {
  it("rejects unreadable and invalid carts without touching Stripe", async () => {
    const { calls } = mockFetch({});
    const POST = await loadRoute();

    expect((await POST(post("{not json"))).status).toBe(400);
    expect((await POST(post({ items: [] }))).status).toBe(400);
    expect((await POST(post({ items: [{ variantId: "9gal", quantity: 1 }] }))).status).toBe(400);
    expect((await POST(post({ items: [{ variantId: "4oz", quantity: 0 }] }))).status).toBe(400);
    expect(calls).toHaveLength(0);
  });

  it("answers 503 (not a crash) when Stripe is not configured", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "");
    const { calls } = mockFetch({});
    const POST = await loadRoute();

    const response = await POST(post({ items: [{ variantId: "4oz", quantity: 1 }] }));
    expect(response.status).toBe(503);
    expect(calls).toHaveLength(0);
  });

  it("creates a session priced from the catalog and returns its URL", async () => {
    const { calls } = mockFetch({
      "api.stripe.com/v1/checkout/sessions": () =>
        json({
          id: "cs_test_1",
          object: "checkout.session",
          url: "https://checkout.stripe.com/c/pay/cs_test_1",
        }),
    });
    const POST = await loadRoute();

    // The request tries to sneak in a price. It must be ignored.
    const response = await POST(
      post({ items: [{ variantId: "4oz", quantity: 2, price: 1, unit_amount: 1 }] }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: true,
      url: "https://checkout.stripe.com/c/pay/cs_test_1",
    });

    expect(calls).toHaveLength(1);
    const [call] = calls;
    expect(call.method).toBe("POST");
    expect(call.headers.authorization).toBe("Bearer sk_test_123");

    const form = new URLSearchParams(call.body);
    expect(form.get("mode")).toBe("payment");
    expect(form.get("line_items[0][quantity]")).toBe("2");
    expect(form.get("line_items[0][price_data][unit_amount]")).toBe("1499");
    expect(form.get("line_items[0][price_data][currency]")).toBe("usd");
    expect(form.get("line_items[0][price_data][product_data][name]")).toBe("No Sweat® 4 oz Spray");
    expect(form.get("success_url")).toBe("https://shop.test/success?session_id={CHECKOUT_SESSION_ID}");
    expect(form.get("cancel_url")).toBe("https://shop.test/cancel");
    expect(form.get("shipping_address_collection[allowed_countries][0]")).toBe("US");
    expect(form.get("metadata[cart]")).toBe("4oz:2");
  });

  it("does not leak Stripe error details to the browser", async () => {
    mockFetch({
      "api.stripe.com/v1/checkout/sessions": () =>
        json({ error: { type: "invalid_request_error", message: "SECRET internal detail" } }, 400),
    });
    const POST = await loadRoute();

    const response = await POST(post({ items: [{ variantId: "16oz", quantity: 1 }] }));
    expect(response.status).toBe(502);
    const text = await response.text();
    expect(text).not.toContain("SECRET");
    expect(JSON.parse(text).ok).toBe(false);
  });
});
