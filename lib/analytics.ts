import type { Variant } from "@/lib/catalog";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends an event to GA4 when it is loaded (NEXT_PUBLIC_GA_ID set). A no-op
 * otherwise, so call sites never need to check.
 *
 * Events used: view_item, select_variant, add_to_cart, begin_checkout,
 * purchase, commercial_lead, watch_test.
 */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}

export function ecommerceItem(variant: Variant, quantity = 1) {
  return {
    item_id: variant.sku,
    item_name: variant.name,
    item_variant: variant.sizeLabel,
    price: variant.priceCents / 100,
    quantity,
  };
}
