"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { CartButton } from "@/components/cart/CartButton";
import { Drawer } from "@/components/ui/Drawer";
import { btn } from "@/components/ui/button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { NAV } from "@/content/site";

import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-void/75 backdrop-blur-xl">
      <div className="wrap flex h-[68px] items-center gap-3 sm:gap-6">
        <Logo height={46} />

        <nav aria-label="Primary" className="ml-2 hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => {
            const active = item.href === pathname;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-[0.92rem] transition-colors hover:text-cyan ${
                  active ? "text-cyan" : "text-ice"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
          <CartButton />
          <Link href="/products/no-sweat" className={btn("primary", "sm")}>
            Buy<span className="hidden sm:inline">&nbsp;No Sweat</span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-10 items-center justify-center rounded-[10px] text-ice hover:text-cyan lg:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} label="Menu" side="left">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <Logo height={44} />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-[10px] text-frost hover:text-ice"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="display display-md block rounded-lg px-3 py-3.5 hover:text-cyan"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-line px-5 py-5">
          <Link
            href="/products/no-sweat"
            onClick={() => setMenuOpen(false)}
            className={`${btn("primary", "lg")} w-full`}
          >
            Buy No Sweat
          </Link>
        </div>
      </Drawer>
    </header>
  );
}
