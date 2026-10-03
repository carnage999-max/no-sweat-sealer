import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { json, mockFetch } from "@/test/fetch-mock";

const valid = {
  business: "Corner Café",
  name: "Jordan Ellis",
  email: "jordan@example.com",
  phone: "207-555-0100",
  industry: "Café / coffee shop",
  monthlyVolume: "25–100 units",
  desiredSize: "1 gallon",
  message: "We pour about 300 iced drinks a day.",
};

function post(body: unknown) {
  return new Request("http://localhost/api/commercial", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.9" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function loadRoute() {
  vi.resetModules();
  return (await import("./route")).POST;
}

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://shop.test");
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("CONTACT_FROM_EMAIL", "No Sweat <leads@example.test>");
  vi.stubEnv("CONTACT_RECEIVER_EMAILS", "team@example.test");
  vi.stubEnv("TURNSTILE_SECRET_KEY", "");
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/commercial", () => {
  it("emails a valid inquiry to the team with the visitor as reply-to", async () => {
    const { calls } = mockFetch({ "api.resend.com/emails": () => json({ id: "email_1" }) });
    const POST = await loadRoute();

    const response = await POST(post(valid));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });

    const sent = JSON.parse(calls[0].body);
    expect(sent.from).toBe("No Sweat <leads@example.test>");
    expect(sent.to).toEqual(["team@example.test"]);
    expect(sent.reply_to).toBe("jordan@example.com");
    expect(sent.subject).toBe("Commercial inquiry — Corner Café — Café / coffee shop");
    expect(sent.text).toContain("Monthly volume: 25–100 units");
    expect(sent.text).toContain("We pour about 300 iced drinks a day.");
  });

  it("returns field-level errors for an invalid inquiry and sends nothing", async () => {
    const { calls } = mockFetch({});
    const POST = await loadRoute();

    const response = await POST(post({ ...valid, email: "nope", industry: "" }));
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(Object.keys(body.fieldErrors).sort()).toEqual(["email", "industry"]);
    expect(calls).toHaveLength(0);
  });

  it("silently swallows honeypot submissions", async () => {
    const { calls } = mockFetch({});
    const POST = await loadRoute();

    const response = await POST(post({ ...valid, website: "http://spam.example" }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(calls).toHaveLength(0);
  });

  it("answers 503 when email is not configured", async () => {
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
    const { calls } = mockFetch({});
    const POST = await loadRoute();
    const response = await POST(post(valid));
    expect(response.status).toBe(503);
    expect(calls).toHaveLength(0);
  });

  it("answers 502 when the email provider rejects the message", async () => {
    mockFetch({
      "api.resend.com/emails": () => json({ name: "validation_error", message: "bad", statusCode: 422 }, 422),
    });
    const POST = await loadRoute();
    expect((await POST(post(valid))).status).toBe(502);
  });

  it("rejects unreadable JSON", async () => {
    mockFetch({});
    const POST = await loadRoute();
    expect((await POST(post("{oops"))).status).toBe(400);
  });

  describe("with Turnstile configured", () => {
    beforeEach(() => vi.stubEnv("TURNSTILE_SECRET_KEY", "ts_secret"));

    it("requires a token", async () => {
      const { calls } = mockFetch({});
      const POST = await loadRoute();
      const response = await POST(post(valid));
      expect(response.status).toBe(400);
      expect(calls).toHaveLength(0);
    });

    it("accepts a token Cloudflare approves for this action and host", async () => {
      const { calls } = mockFetch({
        "challenges.cloudflare.com": () =>
          json({ success: true, action: "commercial_inquiry", hostname: "shop.test" }),
        "api.resend.com/emails": () => json({ id: "email_1" }),
      });
      const POST = await loadRoute();
      const response = await POST(post({ ...valid, turnstileToken: "tok" }));
      expect(response.status).toBe(200);
      expect(calls.map((call) => call.url)).toEqual([
        expect.stringContaining("challenges.cloudflare.com"),
        expect.stringContaining("api.resend.com"),
      ]);
    });

    it("rejects a token issued for a different action", async () => {
      mockFetch({
        "challenges.cloudflare.com": () =>
          json({ success: true, action: "contact_form", hostname: "shop.test" }),
      });
      const POST = await loadRoute();
      expect((await POST(post({ ...valid, turnstileToken: "tok" }))).status).toBe(400);
    });

    it("rejects a token issued for a different hostname", async () => {
      mockFetch({
        "challenges.cloudflare.com": () =>
          json({ success: true, action: "commercial_inquiry", hostname: "evil.example" }),
      });
      const POST = await loadRoute();
      expect((await POST(post({ ...valid, turnstileToken: "tok" }))).status).toBe(400);
    });
  });
});
