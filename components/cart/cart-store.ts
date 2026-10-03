"use client";

import { useSyncExternalStore } from "react";

import { MAX_QUANTITY_PER_LINE, restoreCart, type CartLine } from "@/lib/cart";
import type { VariantId } from "@/lib/catalog";

const STORAGE_KEY = "nosweat.cart.v1";
const EMPTY: readonly CartLine[] = Object.freeze([]);

let lines: readonly CartLine[] = EMPTY;
let drawerOpen = false;
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    lines = raw ? restoreCart(JSON.parse(raw)) : EMPTY;
  } catch {
    lines = EMPTY;
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Private mode or full storage: the cart still works for this page view.
  }
}

function onStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY && event.key !== null) return;
  loaded = false;
  load();
  emit();
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function setLines(next: readonly CartLine[]) {
  lines = next;
  persist();
  emit();
}

export function useCartLines(): readonly CartLine[] {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return lines;
    },
    () => EMPTY,
  );
}

export function useCartDrawerOpen(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => drawerOpen,
    () => false,
  );
}

export function openCartDrawer() {
  drawerOpen = true;
  emit();
}

export function closeCartDrawer() {
  drawerOpen = false;
  emit();
}

export function addToCart(variantId: VariantId, quantity = 1) {
  load();
  const existing = lines.find((line) => line.variantId === variantId);
  const next = existing
    ? lines.map((line) =>
        line.variantId === variantId
          ? { ...line, quantity: Math.min(MAX_QUANTITY_PER_LINE, line.quantity + quantity) }
          : line,
      )
    : [...lines, { variantId, quantity: Math.min(MAX_QUANTITY_PER_LINE, quantity) }];
  setLines(next);
}

export function setCartQuantity(variantId: VariantId, quantity: number) {
  load();
  if (quantity < 1) return removeFromCart(variantId);
  setLines(
    lines.map((line) =>
      line.variantId === variantId
        ? { ...line, quantity: Math.min(MAX_QUANTITY_PER_LINE, quantity) }
        : line,
    ),
  );
}

export function removeFromCart(variantId: VariantId) {
  load();
  setLines(lines.filter((line) => line.variantId !== variantId));
}

export function clearCart() {
  setLines(EMPTY);
}
