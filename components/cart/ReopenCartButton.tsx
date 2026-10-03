"use client";

import { btn } from "@/components/ui/button";

import { openCartDrawer } from "./cart-store";

export function ReopenCartButton() {
  return (
    <button type="button" onClick={openCartDrawer} className={btn("primary", "lg")}>
      Open my cart
    </button>
  );
}
