import Link from "next/link";

import { SizeStrip } from "@/components/shop/SizeStrip";

export function BuySection() {
  return (
    <section id="buy" className="band border-t border-line bg-void">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display display-lg">Pick your size.</h2>
          <p className="max-w-sm text-frost">
            Directions and the Safety Data Sheet are on every product page.
          </p>
        </div>
        <div className="mt-10">
          <SizeStrip />
        </div>
        <p className="mt-6 text-frost">
          Buying for a café, bar or event?{" "}
          <Link href="/commercial" className="font-semibold text-ice underline underline-offset-4 hover:text-cyan">
            Send a commercial inquiry
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
