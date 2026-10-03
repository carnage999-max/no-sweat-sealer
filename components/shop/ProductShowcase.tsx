"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatPrice, getVariant, VARIANTS, type VariantId } from "@/lib/catalog";

/** One product image at a time, switched by size. */
export function ProductShowcase() {
  const [variantId, setVariantId] = useState<VariantId>("4oz");
  const variant = getVariant(variantId)!;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[500px] overflow-hidden rounded-[18px] border border-cyan/30 bg-black shadow-[0_30px_90px_-30px_rgb(43_123_255_/_0.6)]">
        {VARIANTS.map((option) => (
          <Image
            key={option.id}
            src={option.image}
            alt={option.id === variantId ? `${option.name}, glowing electric blue with ice and water droplets.` : ""}
            fill
            sizes="(min-width: 1024px) 500px, 92vw"
            className={`object-cover transition-all duration-700 ${
              option.id === variantId ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="mx-auto w-full max-w-[500px] lg:mx-0">
        <div className="flex gap-2" role="group" aria-label="Size">
          {VARIANTS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setVariantId(option.id)}
              aria-pressed={variantId === option.id}
              className="flex-1 rounded-[10px] border border-white/15 px-3 py-3 text-center font-semibold transition-all hover:border-cyan/60 aria-pressed:border-cyan aria-pressed:bg-cyan/15 aria-pressed:text-cyan"
            >
              {option.sizeLabel}
            </button>
          ))}
        </div>

        <h3 className="display display-md mt-8">{variant.name}</h3>
        <p className="mt-2 text-frost">{variant.tagline}</p>
        <p className="tnum mt-5 text-4xl font-bold">{formatPrice(variant.priceCents)}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <AddToCartButton variantId={variant.id} className="sm:min-w-[12rem]" />
          <Link
            href={`/products/no-sweat?size=${variant.id}`}
            className="inline-flex items-center justify-center rounded-[10px] border border-white/20 px-6 py-3.5 font-semibold transition-all hover:-translate-y-0.5 hover:border-cyan hover:text-cyan"
          >
            Details and directions
          </Link>
        </div>
        {variant.commercial ? (
          <p className="mt-5 text-frost">
            Need more than a few?{" "}
            <Link href="/commercial" className="font-semibold text-ice underline underline-offset-4 hover:text-cyan">
              Send a commercial inquiry
            </Link>
            .
          </p>
        ) : null}
      </div>
    </div>
  );
}
