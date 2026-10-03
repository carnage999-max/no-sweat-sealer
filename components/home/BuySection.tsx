import Link from "next/link";

import { SizeStrip } from "@/components/shop/SizeStrip";
import { Reveal } from "@/components/ui/Reveal";

export function BuySection() {
  return (
    <section id="buy" className="band relative overflow-hidden">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(43_123_255_/_0.28),transparent_65%)] blur-3xl"
      />
      <div className="wrap relative">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display display-lg">Pick your size.</h2>
          <p className="max-w-sm text-frost">Directions and the Safety Data Sheet are on every product page.</p>
        </Reveal>
        <div className="mt-10">
          <SizeStrip />
        </div>
        <p className="mt-8 text-frost">
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
