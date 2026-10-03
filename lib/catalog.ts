/**
 * Single source of truth for what is sold and for how much.
 *
 * Prices live here, in cents, and ONLY here. The browser never sends a price:
 * the checkout API accepts a variant id and a quantity and looks the rest up
 * on the server, so a tampered request cannot change what is charged.
 *
 * To change a price, name or availability, edit this file. No page template
 * needs to change.
 */

export type VariantId = "4oz" | "16oz" | "1gal";

export type Variant = {
  id: VariantId;
  sku: string;
  /** Full product name as it appears in the cart and on the receipt. */
  name: string;
  /** Short label for selectors, e.g. "4 oz". */
  sizeLabel: string;
  /** One line shown under the name. */
  tagline: string;
  priceCents: number;
  currency: "usd";
  /** Product render, 1122 x 1402. */
  image: string;
  inStock: boolean;
  /** Commercial sizes get a callout and a nudge toward the wholesale form. */
  commercial: boolean;
};

export const VARIANTS: readonly Variant[] = [
  {
    id: "4oz",
    sku: "NS-4OZ",
    name: "No Sweat® 4 oz Spray",
    sizeLabel: "4 oz",
    tagline: "Personal spray bottle",
    priceCents: 1499,
    currency: "usd",
    image: "/product/4-oz-spray-bottle.png",
    inStock: true,
    commercial: false,
  },
  {
    id: "16oz",
    sku: "NS-16OZ",
    name: "No Sweat® 16 oz Refill",
    sizeLabel: "16 oz",
    tagline: "Refill bottle",
    priceCents: 3499,
    currency: "usd",
    image: "/product/16-oz-refill-bottle.png",
    inStock: true,
    commercial: false,
  },
  {
    id: "1gal",
    sku: "NS-1GAL",
    name: "No Sweat® Commercial Gallon",
    sizeLabel: "1 gallon",
    tagline: "Commercial jug",
    priceCents: 14900,
    currency: "usd",
    image: "/product/1-gallon.png",
    inStock: true,
    commercial: true,
  },
];

export const DEFAULT_VARIANT_ID: VariantId = "4oz";

export function isVariantId(value: unknown): value is VariantId {
  return VARIANTS.some((variant) => variant.id === value);
}

export function getVariant(id: string): Variant | undefined {
  return VARIANTS.find((variant) => variant.id === id);
}

export function formatPrice(cents: number, currency: string = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
