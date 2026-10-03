"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { addToCart, openCartDrawer } from "@/components/cart/cart-store";
import { startCheckout } from "@/components/cart/checkout";
import { btn } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { ecommerceItem, track } from "@/lib/analytics";
import { MAX_QUANTITY_PER_LINE } from "@/lib/cart";
import { formatPrice, getVariant, VARIANTS, type VariantId } from "@/lib/catalog";
import { SDS_HREF } from "@/content/directions";


export function BuyBox({ initialVariantId }: { initialVariantId: VariantId }) {
  const [variantId, setVariantId] = useState<VariantId>(initialVariantId);
  const [quantity, setQuantity] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const variant = getVariant(variantId)!;

  useEffect(() => {
    track("view_item", {
      currency: "USD",
      value: variant.priceCents / 100,
      items: [ecommerceItem(variant)],
    });
    // Fire once per page view, for the size the page opened on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function select(next: VariantId) {
    setVariantId(next);
    setError(null);
    window.history.replaceState(null, "", `?size=${next}`);
    const picked = getVariant(next);
    if (picked) track("select_variant", { item_id: picked.sku, item_variant: picked.sizeLabel });
  }

  function add() {
    addToCart(variantId, quantity);
    openCartDrawer();
    track("add_to_cart", {
      currency: "USD",
      value: (variant.priceCents / 100) * quantity,
      items: [ecommerceItem(variant, quantity)],
    });
  }

  async function buyNow() {
    setBusy(true);
    setError(null);
    track("begin_checkout", {
      currency: "USD",
      value: (variant.priceCents / 100) * quantity,
      items: [ecommerceItem(variant, quantity)],
    });
    const outcome = await startCheckout([{ variantId, quantity }]);
    if (!outcome.ok) {
      setError(outcome.error);
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
      <div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] border border-cyan/30 bg-black shadow-[0_30px_90px_-30px_rgb(43_123_255_/_0.55)]">
          {VARIANTS.map((option) => (
            <Image
              key={option.id}
              src={option.image}
              alt={option.id === variantId ? `${option.name}, glowing electric blue with ice and water droplets.` : ""}
              fill
              priority={option.id === initialVariantId}
              sizes="(min-width: 1024px) 560px, 94vw"
              className={`object-cover transition-all duration-700 ${
                option.id === variantId ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="display display-lg">{variant.name}</h1>
        <p className="mt-2 text-frost">{variant.tagline}</p>
        <p className="tnum mt-6 text-4xl font-bold">{formatPrice(variant.priceCents)}</p>

        <fieldset className="mt-8">
          <legend className="text-[0.95rem] font-semibold">Size</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {VARIANTS.map((option) => (
              <label
                key={option.id}
                className="cursor-pointer rounded-[10px] border border-line-strong px-3 py-3 text-center has-[:checked]:border-cyan has-[:checked]:bg-cyan/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cyan"
              >
                <input
                  type="radio"
                  name="size"
                  value={option.id}
                  checked={variantId === option.id}
                  onChange={() => select(option.id)}
                  className="sr-only"
                />
                <span className="block font-semibold">{option.sizeLabel}</span>
                <span className="tnum block text-sm text-frost">{formatPrice(option.priceCents)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6">
          <p className="text-[0.95rem] font-semibold">Quantity</p>
          <div className="mt-3 inline-flex items-center rounded-[10px] border border-line-strong">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-12 w-12 items-center justify-center text-frost hover:text-cyan"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="tnum w-10 text-center font-semibold" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY_PER_LINE, q + 1))}
              className="flex h-12 w-12 items-center justify-center text-frost hover:text-cyan"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={add} disabled={!variant.inStock} className={btn("primary", "lg")}>
            Add to cart
          </button>
          <button type="button" onClick={buyNow} disabled={busy || !variant.inStock} className={btn("ghost", "lg")}>
            {busy ? "Opening checkout…" : "Buy now"}
          </button>
        </div>
        {error ? (
          <p role="alert" className="mt-4 rounded-[10px] border border-wet/50 bg-wet/10 px-4 py-3 text-sm">
            {error}
          </p>
        ) : null}

        <p className="mt-5 text-sm text-frost">You&rsquo;ll confirm shipping details at checkout.</p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-[0.95rem]">
          <a href="#directions" className="font-semibold underline underline-offset-4 hover:text-cyan">
            Directions
          </a>
          <a
            href={SDS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4 hover:text-cyan"
          >
            Safety Data Sheet (PDF)
          </a>
          {variant.commercial ? (
            <Link href="/commercial" className="font-semibold underline underline-offset-4 hover:text-cyan">
              Commercial inquiry
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
