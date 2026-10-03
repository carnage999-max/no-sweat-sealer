import Link from "next/link";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { JugIcon, RefillBottleIcon, SprayBottleIcon } from "@/components/ui/icons";
import { formatPrice, VARIANTS, type VariantId } from "@/lib/catalog";

export const SIZE_ICONS: Record<VariantId, typeof JugIcon> = {
  "4oz": SprayBottleIcon,
  "16oz": RefillBottleIcon,
  "1gal": JugIcon,
};

/** The three sizes as one object, not three cards: shared border, hairline dividers. */
export function SizeStrip() {
  return (
    <div className="grid overflow-hidden rounded-[14px] border border-line bg-graphite md:grid-cols-3 md:divide-x md:divide-line">
      {VARIANTS.map((variant) => {
        const Icon = SIZE_ICONS[variant.id];
        return (
          <div
            key={variant.id}
            className="flex flex-col border-b border-line p-7 last:border-b-0 md:border-b-0 md:p-8"
          >
            <div className="flex items-start justify-between">
              <Icon className="h-14 w-14 text-cyan" strokeWidth={1.5} />
              {variant.commercial ? (
                <p className="rounded-full border border-line-strong px-3 py-1 text-[0.8rem] text-frost">
                  Commercial
                </p>
              ) : null}
            </div>
            <h3 className="display display-md mt-6">{variant.sizeLabel}</h3>
            <p className="mt-1 text-frost">{variant.tagline}</p>
            <p className="tnum mt-6 text-3xl font-bold">{formatPrice(variant.priceCents)}</p>

            <div className="mt-auto flex flex-col gap-3 pt-8">
              <AddToCartButton variantId={variant.id} className="w-full" />
              <Link
                href={`/products/no-sweat?size=${variant.id}`}
                className="text-center text-sm text-frost underline underline-offset-4 hover:text-cyan"
              >
                Details and directions
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
