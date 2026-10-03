import Stripe from "stripe";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { json, mockFetch } from "@/test/fetch-mock";

const SECRET = "whsec_test_secret";

function signedRequest(event: object, overrides: { signature?: string | null } = {}) {
  const payload = JSON.stringify(event);
  const signature =
    overrides.signature === undefined
      ? new Stripe("sk_test_123").webhooks.generateTestHeaderString({ payload, secret: SECRET })
      : overrides.signature;
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (signature !== null) headers["stripe-signature"] = signature;
  return new Request("http://localhost/api/stripe/webhook", {
    method: "POST",
    headers,
    body: payload,
  });
}

function sessionEvent(type: string, session: Record<string, unknown> = {}) {
  return {
    id: "evt_test_1",
    object: "event",
    api_version: "2026-09-30.endive",
    type,
    data: {
      object: {
        id: "cs_test_1",
        object: "checkout.session",
        payment_status: "paid",
        currency: "usd",
        amount_total: 2998,
        customer_details: {
          name: "Jordan <b>Ellis</b>",
          email: "jordan@example.com",
          phone: null,
        },
        collected_information: {
          shipping_details: {
            name: "Jordan Ellis",
            address: {
              line1: "1 Main St",
              line2: null,
              city: "Detroit",
              state: "ME",
              postal_code: "04929",
              country: "US",
            },
          },
        },
        ...session,
      },
    },
  };
}

const lineItems = {
  object: "list",
  has_more: false,
  url: "/v1/checkout/sessions/cs_test_1/line_items",
  data: [
    {
      id: "li_1",
      object: "item",
      description: "No Sweat® 4 oz Spray",
      quantity: 2,
      amount_total: 2998,
    },
  ],
};

async function loadRoute() {
  vi.resetModules();
  return (await import("./route")).POST;
}

beforeEach(() => {
  vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_123");
  vi.stubEnv("STRIPE_WEBHOOK_SECRET", SECRET);
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("CONTACT_FROM_EMAIL", "No Sweat <orders@example.test>");
  vi.stubEnv("CONTACT_RECEIVER_EMAILS", "team@example.test, owner@example.test");
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/stripe/webhook", () => {
  it("answers 503 when not configured, so Stripe retries later", async () => {
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", "");
    mockFetch({});
    const POST = await loadRoute();
    expect((await POST(signedRequest(sessionEvent("checkout.session.completed")))).status).toBe(503);
  });

  it("rejects a request with no signature", async () => {
    mockFetch({});
    const POST = await loadRoute();
    const response = await POST(signedRequest(sessionEvent("checkout.session.completed"), { signature: null }));
    expect(response.status).toBe(400);
  });

  it("rejects a forged signature and sends nothing", async () => {
    const { calls } = mockFetch({});
    const POST = await loadRoute();
    const response = await POST(
      signedRequest(sessionEvent("checkout.session.completed"), { signature: "t=1,v1=deadbeef" }),
    );
    expect(response.status).toBe(400);
    expect(calls).toHaveLength(0);
  });

  it("rejects a payload that was tampered with after signing", async () => {
    const { calls } = mockFetch({});
    const POST = await loadRoute();
    const event = sessionEvent("checkout.session.completed");
    const original = signedRequest(event);
    const tampered = new Request(original.url, {
      method: "POST",
      headers: original.headers,
      body: JSON.stringify(sessionEvent("checkout.session.completed", { amount_total: 1 })),
    });
    expect((await POST(tampered)).status).toBe(400);
    expect(calls).toHaveLength(0);
  });

  it("emails the team when an order is paid", async () => {
    const { calls } = mockFetch({
      "/line_items": () => json(lineItems),
      "api.resend.com/emails": () => json({ id: "email_1" }),
    });
    const POST = await loadRoute();

    const response = await POST(signedRequest(sessionEvent("checkout.session.completed")));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ received: true });

    const mail = calls.find((call) => call.url.includes("api.resend.com"));
    expect(mail).toBeDefined();
    const sent = JSON.parse(mail!.body);
    expect(sent.from).toBe("No Sweat <orders@example.test>");
    expect(sent.to).toEqual(["team@example.test", "owner@example.test"]);
    expect(sent.reply_to).toBe("jordan@example.com");
    expect(sent.subject).toBe("New No Sweat order — $29.98");
    expect(sent.text).toContain("2 × No Sweat® 4 oz Spray");
    expect(sent.text).toContain("Detroit, ME, 04929");
    // Customer-supplied name must never be able to inject markup.
    expect(sent.html).not.toContain("<b>Ellis</b>");
    expect(sent.html).toContain("&lt;b&gt;Ellis&lt;/b&gt;");
  });

  it("does not email for an unpaid session (async payment still pending)", async () => {
    const { calls } = mockFetch({});
    const POST = await loadRoute();
    const response = await POST(
      signedRequest(sessionEvent("checkout.session.completed", { payment_status: "unpaid" })),
    );
    expect(response.status).toBe(200);
    expect(calls).toHaveLength(0);
  });

  it("emails when a delayed payment later succeeds", async () => {
    const { calls } = mockFetch({
      "/line_items": () => json(lineItems),
      "api.resend.com/emails": () => json({ id: "email_1" }),
    });
    const POST = await loadRoute();
    const response = await POST(signedRequest(sessionEvent("checkout.session.async_payment_succeeded")));
    expect(response.status).toBe(200);
    expect(calls.some((call) => call.url.includes("api.resend.com"))).toBe(true);
  });

  it("ignores unrelated events", async () => {
    const { calls } = mockFetch({});
    const POST = await loadRoute();
    const response = await POST(signedRequest({ ...sessionEvent("charge.refunded"), type: "charge.refunded" }));
    expect(response.status).toBe(200);
    expect(calls).toHaveLength(0);
  });

  it("returns 500 when the notification fails, so Stripe retries", async () => {
    mockFetch({
      "/line_items": () => json(lineItems),
      "api.resend.com/emails": () => json({ name: "validation_error", message: "bad", statusCode: 422 }, 422),
    });
    const POST = await loadRoute();
    const response = await POST(signedRequest(sessionEvent("checkout.session.completed")));
    expect(response.status).toBe(500);
  });

  it("returns 500 when email is not configured instead of dropping the order silently", async () => {
    vi.stubEnv("CONTACT_RECEIVER_EMAILS", "");
    mockFetch({ "/line_items": () => json(lineItems) });
    const POST = await loadRoute();
    const response = await POST(signedRequest(sessionEvent("checkout.session.completed")));
    expect(response.status).toBe(500);
  });
});
