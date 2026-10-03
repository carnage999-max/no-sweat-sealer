import { describe, expect, it } from "vitest";

import {
  isHoneypotTripped,
  validateCommercialInquiry,
  validateContactMessage,
} from "@/lib/forms";
import { escapeHtml, renderEmail } from "@/lib/html";

const commercial = {
  business: "Corner Café",
  name: "Jordan Ellis",
  email: "jordan@example.com",
  phone: "",
  industry: "Café / coffee shop",
  monthlyVolume: "25–100 units",
  desiredSize: "1 gallon",
  message: "",
};

describe("validateCommercialInquiry", () => {
  it("accepts a complete inquiry, with phone and message optional", () => {
    const result = validateCommercialInquiry(commercial);
    expect(result.ok).toBe(true);
  });

  it("reports every missing required field", () => {
    const result = validateCommercialInquiry({});
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(Object.keys(result.fieldErrors).sort()).toEqual(
      ["business", "desiredSize", "email", "industry", "monthlyVolume", "name"].sort(),
    );
  });

  it("rejects values outside the allowed lists", () => {
    const result = validateCommercialInquiry({ ...commercial, industry: "Hacking" });
    expect(result.ok).toBe(false);
  });

  it("rejects a malformed email", () => {
    const result = validateCommercialInquiry({ ...commercial, email: "not-an-email" });
    expect(result.ok).toBe(false);
  });

  it("collapses whitespace and strips newlines from single-line fields", () => {
    const result = validateCommercialInquiry({
      ...commercial,
      business: "  Corner \n\n  Café  ",
    });
    expect(result.ok && result.data.business).toBe("Corner Café");
  });

  it("truncates oversized input instead of trusting it", () => {
    const result = validateCommercialInquiry({ ...commercial, message: "x".repeat(10_000) });
    expect(result.ok && result.data.message.length).toBe(4000);
  });
});

describe("validateContactMessage", () => {
  it("requires a real message", () => {
    const result = validateContactMessage({
      name: "A",
      email: "a@example.com",
      topic: "Press",
      message: "short",
    });
    expect(result.ok).toBe(false);
  });

  it("accepts a valid message", () => {
    const result = validateContactMessage({
      name: "A",
      email: "a@example.com",
      topic: "Order support",
      message: "Where is my order please?",
    });
    expect(result.ok).toBe(true);
  });
});

describe("honeypot", () => {
  it("trips only when the hidden field has content", () => {
    expect(isHoneypotTripped({ website: "http://spam.example" })).toBe(true);
    expect(isHoneypotTripped({ website: "   " })).toBe(false);
    expect(isHoneypotTripped({})).toBe(false);
    expect(isHoneypotTripped(null)).toBe(false);
  });
});

describe("email rendering", () => {
  it("escapes attacker-controlled values", () => {
    const html = renderEmail({
      heading: "<b>x</b>",
      rows: [["Name", '"><script>alert(1)</script>']],
      message: "<img src=x onerror=alert(1)>",
    });
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;script&gt;");
  });

  it("escapes the five dangerous characters", () => {
    expect(escapeHtml(`&<>"'`)).toBe("&amp;&lt;&gt;&quot;&#39;");
  });
});
