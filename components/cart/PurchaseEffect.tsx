"use client";

import { useEffect } from "react";

import { track } from "@/lib/analytics";

import { clearCart } from "./cart-store";

/**
 * Runs once after a confirmed payment: empties the saved cart and records the
 * purchase. The session id guards against a refresh counting it twice.
 */
export function PurchaseEffect({
  sessionId,
  value,
  currency,
}: {
  sessionId: string;
  value: number;
  currency: string;
}) {
  useEffect(() => {
    clearCart();
    const key = `nosweat.purchase.${sessionId}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {
      // Storage unavailable: skip de-duplication, still track once.
    }
    track("purchase", { transaction_id: sessionId, value, currency: currency.toUpperCase() });
  }, [sessionId, value, currency]);

  return null;
}
