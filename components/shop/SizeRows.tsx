import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Reveal } from "@/components/ui/Reveal";
import { formatPrice, VARIANTS } from "@/lib/catalog";

/** Each size gets its own full-width row, image alternating sides on desktop. */
export function SizeRows() {
  return (
    <div className="space-y-20 lg:space-y-28">
      {VARIANTS.map((variant, index) => (
        <Reveal key={variant.id} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div
            className={`relative mx-auto aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-[18px] border border-cyan/30 bg-black shadow-[0_30px_90px_-30px_rgb(43_123_255_/_0.6)] ${
              index % 2 === 1 ? "lg:order-2" : ""
            }`}
          >
            <Image
              src={variant.image}
              alt={`${variant.name}, glowing electric blue with ice and water droplets.`}
              fill
              sizes="(min-width: 1024px) 480px, 92vw"
              className="object-cover"
            />
          </div>
          <div className="mx-auto w-full max-w-[480px] lg:mx-0">
            {variant.commercial ? (
              <p className="mb-4 inline-block rounded-full border border-cyan/40 px-3 py-1 text-sm text-cyan">Commercial</p>
            ) : null}
            <h2 className="display display-lg">{variant.sizeLabel}</h2>
            <p className="mt-3 text-lg">{variant.name}</p>
            <p className="mt-1 text-frost">{variant.tagline}</p>
            <p className="tnum mt-6 text-4xl font-bold">{formatPrice(variant.priceCents)}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton variantId={variant.id} className="sm:min-w-[12rem]" />
              <Link
                href={`/products/no-sweat?size=${variant.id}`}
                className="inline-flex items-center justify-center rounded-[10px] border border-white/20 px-6 py-3.5 font-semibold transition-all hover:-translate-y-0.5 hover:border-cyan hover:text-cyan"
              >
                Details and directions
              </Link>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
