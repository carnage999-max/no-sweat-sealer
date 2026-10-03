import { getVariant, isVariantId, type VariantId } from "./catalog";

export const MAX_QUANTITY_PER_LINE = 99;

/** What a cart stores: which size, and how many. Never a price. */
export type CartLine = {
  variantId: VariantId;
  quantity: number;
};

function toQuantity(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isInteger(value)) return null;
  if (value < 1 || value > MAX_QUANTITY_PER_LINE) return null;
  return value;
}

/**
 * Lenient parse for restoring a saved cart: silently drops anything invalid,
 * clamps quantities and merges duplicate lines. Used on the client only.
 */
export function restoreCart(input: unknown): CartLine[] {
  if (!Array.isArray(input)) return [];
  const merged = new Map<VariantId, number>();
  for (const entry of input) {
    if (typeof entry !== "object" || entry === null) continue;
    const { variantId, quantity } = entry as Record<string, unknown>;
    if (!isVariantId(variantId)) continue;
    if (typeof quantity !== "number" || !Number.isFinite(quantity)) continue;
    const clamped = Math.min(
      MAX_QUANTITY_PER_LINE,
      Math.max(1, Math.floor(quantity)),
    );
    merged.set(
      variantId,
      Math.min(MAX_QUANTITY_PER_LINE, (merged.get(variantId) ?? 0) + clamped),
    );
  }
  return [...merged].map(([variantId, quantity]) => ({ variantId, quantity }));
}

export type CheckoutRequestResult =
  | { ok: true; lines: CartLine[] }
  | { ok: false; error: string };

/**
 * Strict parse for the checkout API. Anything malformed is rejected outright
 * rather than repaired, because this is the trust boundary for a payment.
 */
export function parseCheckoutRequest(input: unknown): CheckoutRequestResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Your cart could not be read." };
  }
  const items = (input as { items?: unknown }).items;
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, error: "Your cart is empty." };
  }
  if (items.length > 10) {
    return { ok: false, error: "Your cart has too many items." };
  }

  const seen = new Set<string>();
  const lines: CartLine[] = [];

  for (const entry of items) {
    if (typeof entry !== "object" || entry === null) {
      return { ok: false, error: "Your cart could not be read." };
    }
    const { variantId, quantity } = entry as Record<string, unknown>;
    if (typeof variantId !== "string" || !isVariantId(variantId)) {
      return { ok: false, error: "One of the items in your cart is unavailable." };
    }
    if (seen.has(variantId)) {
      return { ok: false, error: "Your cart contains a duplicate item." };
    }
    seen.add(variantId);

    const qty = toQuantity(quantity);
    if (qty === null) {
      return {
        ok: false,
        error: `Quantity must be a whole number from 1 to ${MAX_QUANTITY_PER_LINE}.`,
      };
    }
    if (!getVariant(variantId)?.inStock) {
      return { ok: false, error: "One of the items in your cart is out of stock." };
    }
    lines.push({ variantId, quantity: qty });
  }

  return { ok: true, lines };
}

export function cartCount(lines: readonly CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function cartSubtotalCents(lines: readonly CartLine[]): number {
  return lines.reduce((sum, line) => {
    const variant = getVariant(line.variantId);
    return sum + (variant ? variant.priceCents * line.quantity : 0);
  }, 0);
}
