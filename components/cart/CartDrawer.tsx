"use client";

import Link from "next/link";
import { useState } from "react";

import { ecommerceItem, track } from "@/lib/analytics";
import { cartSubtotalCents, type CartLine } from "@/lib/cart";
import { formatPrice, getVariant } from "@/lib/catalog";
import { Drawer } from "@/components/ui/Drawer";
import { btn } from "@/components/ui/button";
import { CloseIcon, MinusIcon, PlusIcon } from "@/components/ui/icons";

import { startCheckout } from "./checkout";
import {
  closeCartDrawer,
  removeFromCart,
  setCartQuantity,
  useCartDrawerOpen,
  useCartLines,
} from "./cart-store";

function LineRow({ line }: { line: CartLine }) {
  const variant = getVariant(line.variantId);
  if (!variant) return null;

  return (
    <li className="flex gap-4 border-b border-line py-5">
      <div className="min-w-0 flex-1">
        <p className="font-semibold leading-snug">{variant.name}</p>
        <p className="mt-0.5 text-sm text-frost">{variant.sizeLabel}</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center rounded-[10px] border border-line-strong">
            <button
              type="button"
              aria-label={`Decrease quantity of ${variant.name}`}
              onClick={() => setCartQuantity(line.variantId, line.quantity - 1)}
              className="flex h-9 w-9 items-center justify-center text-frost hover:text-cyan"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="tnum w-8 text-center text-sm font-semibold" aria-live="polite">
              {line.quantity}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity of ${variant.name}`}
              onClick={() => setCartQuantity(line.variantId, line.quantity + 1)}
              className="flex h-9 w-9 items-center justify-center text-frost hover:text-cyan"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(line.variantId)}
            className="text-sm text-frost underline underline-offset-4 hover:text-ice"
          >
            Remove
          </button>
        </div>
      </div>
      <p className="tnum font-semibold">{formatPrice(variant.priceCents * line.quantity)}</p>
    </li>
  );
}

export function CartDrawer() {
  const open = useCartDrawerOpen();
  const lines = useCartLines();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subtotal = cartSubtotalCents(lines);

  async function checkout() {
    setBusy(true);
    setError(null);
    track("begin_checkout", {
      currency: "USD",
      value: subtotal / 100,
      items: lines.flatMap((line) => {
        const variant = getVariant(line.variantId);
        return variant ? [ecommerceItem(variant, line.quantity)] : [];
      }),
    });
    const outcome = await startCheckout(lines);
    if (!outcome.ok) {
      setError(outcome.error);
      setBusy(false);
    }
  }

  return (
    <Drawer open={open} onClose={closeCartDrawer} label="Your cart">
      <div className="flex items-center justify-between border-b border-line px-6 py-5">
        <h2 className="display display-sm">Your cart</h2>
        <button
          type="button"
          onClick={closeCartDrawer}
          aria-label="Close cart"
          className="flex h-10 w-10 items-center justify-center rounded-[10px] text-frost hover:text-ice"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-start justify-center px-6">
          <p className="display display-md">Nothing here yet.</p>
          <p className="mt-3 text-frost">Pick a size to get started.</p>
          <Link href="/shop" onClick={closeCartDrawer} className={`${btn("primary")} mt-6`}>
            Shop No Sweat
          </Link>
        </div>
      ) : (
        <>
          <ul className="flex-1 overflow-y-auto px-6">
            {lines.map((line) => (
              <LineRow key={line.variantId} line={line} />
            ))}
          </ul>
          <div className="border-t border-line px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-frost">Subtotal</span>
              <span className="tnum text-xl font-bold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-sm text-frost">
              You&rsquo;ll confirm shipping details at checkout.
            </p>
            {error ? (
              <p role="alert" className="mt-4 rounded-[10px] border border-wet/50 bg-wet/10 px-4 py-3 text-sm">
                {error}
              </p>
            ) : null}
            <button
              type="button"
              onClick={checkout}
              disabled={busy}
              className={`${btn("primary", "lg")} mt-4 w-full`}
            >
              {busy ? "Opening checkout…" : "Checkout"}
            </button>
          </div>
        </>
      )}
    </Drawer>
  );
}
