import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { formatPrice, VARIANTS } from "@/lib/catalog";

/**
 * The three sizes as product cards. On a phone they become a swipeable row
 * that snaps card by card; from tablet up they sit side by side.
 */
export function SizeStrip() {
  return (
    <ul className="-mx-[1.1rem] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[1.1rem] pb-4 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
      {VARIANTS.map((variant, index) => (
        <Reveal
          as="li"
          key={variant.id}
          delay={index * 120}
          className="w-[78%] shrink-0 snap-center sm:w-[56%] md:w-auto"
        >
          <TiltCard className="glass h-full overflow-hidden">
            <div className="relative aspect-[4/5] overflow-hidden bg-black">
              <Image
                src={variant.image}
                alt={`${variant.name}, glowing electric blue with ice and water droplets.`}
                fill
                sizes="(min-width: 768px) 380px, 78vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              {variant.commercial ? (
                <p className="glass absolute left-3 top-3 px-3 py-1 text-[0.8rem] font-semibold">Commercial</p>
              ) : null}
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="display display-md">{variant.sizeLabel}</h3>
                <p className="tnum text-2xl font-bold">{formatPrice(variant.priceCents)}</p>
              </div>
              <p className="mt-1 text-frost">{variant.tagline}</p>
              <div className="mt-5 flex flex-col gap-3">
                <AddToCartButton variantId={variant.id} className="w-full" />
                <Link
                  href={`/products/no-sweat?size=${variant.id}`}
                  className="text-center text-sm text-frost underline underline-offset-4 hover:text-cyan"
                >
                  Details and directions
                </Link>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </ul>
  );
}
