"use client";

import { cartCount } from "@/lib/cart";
import { CartIcon } from "@/components/ui/icons";

import { openCartDrawer, useCartLines } from "./cart-store";

export function CartButton() {
  const count = cartCount(useCartLines());

  return (
    <button
      type="button"
      onClick={openCartDrawer}
      aria-label={count > 0 ? `Open cart, ${count} ${count === 1 ? "item" : "items"}` : "Open cart"}
      className="relative flex h-11 w-11 items-center justify-center rounded-[10px] text-ice transition-colors hover:text-cyan"
    >
      <CartIcon className="h-[22px] w-[22px]" />
      {count > 0 ? (
        <span className="tnum absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-cyan px-1 text-[11px] font-bold leading-none text-void">
          {count}
        </span>
      ) : null}
    </button>
  );
}
