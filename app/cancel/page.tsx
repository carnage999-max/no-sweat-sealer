import type { Metadata } from "next";
import Link from "next/link";

import { ReopenCartButton } from "@/components/cart/ReopenCartButton";
import { btn } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Checkout cancelled",
  robots: { index: false, follow: false },
};

export default function CancelPage() {
  return (
    <section className="band">
      <div className="wrap max-w-2xl">
        <h1 className="display display-lg">Checkout cancelled.</h1>
        <p className="lede mt-6 text-frost">You haven&rsquo;t been charged. Your cart is still saved.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ReopenCartButton />
          <Link href="/shop" className={btn("ghost", "lg")}>
            Keep shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
