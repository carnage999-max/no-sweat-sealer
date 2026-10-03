"use client";

import { ecommerceItem, track } from "@/lib/analytics";
import { getVariant, type VariantId } from "@/lib/catalog";
import { btn, type ButtonVariant } from "@/components/ui/button";

import { addToCart, openCartDrawer } from "./cart-store";

export function AddToCartButton({
  variantId,
  quantity = 1,
  variant = "primary",
  className = "",
  children = "Add to cart",
}: {
  variantId: VariantId;
  quantity?: number;
  variant?: ButtonVariant;
  className?: string;
  children?: React.ReactNode;
}) {
  const product = getVariant(variantId);
  if (!product) return null;

  return (
    <button
      type="button"
      disabled={!product.inStock}
      className={`${btn(variant)} ${className}`}
      onClick={() => {
        addToCart(variantId, quantity);
        openCartDrawer();
        track("add_to_cart", {
          currency: "USD",
          value: (product.priceCents / 100) * quantity,
          items: [ecommerceItem(product, quantity)],
        });
      }}
    >
      {product.inStock ? children : "Out of stock"}
    </button>
  );
}
