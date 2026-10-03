import type { Metadata } from "next";
import Link from "next/link";

import { SizeRows } from "@/components/shop/SizeRows";
import { PageIntro } from "@/components/ui/PageIntro";
import { SDS_HREF } from "@/content/directions";

export const metadata: Metadata = {
  title: "Shop",
  description: "Choose a No Sweat® size: a 4 oz spray, a 16 oz refill or a 1-gallon commercial jug.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <PageIntro
        title="Choose your size."
        lede="Three sizes, one clear spray. Add to your cart without leaving the page."
      />
      <section className="band">
        <div className="wrap">
          <SizeRows />
          <div className="mt-12 grid gap-8 border-t border-line pt-10 md:grid-cols-2">
            <p className="measure text-frost">
              Every product page has the directions and the Safety Data Sheet next to the buy button, so you can read
              them before you spray.
            </p>
            <p className="measure text-frost">
              Buying for a café, bar or event?{" "}
              <Link href="/commercial" className="font-semibold text-ice underline underline-offset-4 hover:text-cyan">
                Send a commercial inquiry
              </Link>
              . You can also{" "}
              <a href={SDS_HREF} target="_blank" rel="noopener noreferrer" className="font-semibold text-ice underline underline-offset-4 hover:text-cyan">
                download the Safety Data Sheet
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
