import type { CartLine } from "@/lib/cart";

export type CheckoutOutcome = { ok: true } | { ok: false; error: string };

/**
 * Asks the server to create a Stripe Checkout Session and sends the browser
 * there. The client sends only variant ids and quantities; prices are the
 * server's business.
 */
export async function startCheckout(lines: readonly CartLine[]): Promise<CheckoutOutcome> {
  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: lines.map(({ variantId, quantity }) => ({ variantId, quantity })),
      }),
    });
    const body = (await response.json().catch(() => null)) as
      | { ok: true; url: string }
      | { ok: false; error: string }
      | null;

    if (!response.ok || !body || !body.ok) {
      return {
        ok: false,
        error:
          body && !body.ok
            ? body.error
            : "We couldn't start checkout just now. Please try again.",
      };
    }
    window.location.assign(body.url);
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "We couldn't reach the server. Check your connection and try again.",
    };
  }
}
