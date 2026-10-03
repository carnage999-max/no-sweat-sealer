import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Shipping and returns",
  description: "How No Sweat® orders ship, and what to do if something arrives damaged or wrong.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <>
      <PageIntro title="Shipping and returns." />
      <section className="band">
        <div className="wrap">
          <div className="prose-ns">
            <h2>Shipping</h2>
            <p>
              Orders currently ship within the United States. You&rsquo;ll see your shipping details at checkout, before
              you pay. Taxes, where they apply, are calculated at checkout as well.
            </p>
            <p>
              Buying in volume for a business? Send a <Link href="/commercial">commercial inquiry</Link> instead and we
              will follow up about sizes, pricing and delivery.
            </p>

            <h2>If something is wrong with your order</h2>
            <p>
              If your order arrives damaged or isn&rsquo;t what you ordered, <Link href="/contact">contact us</Link> with
              your order details and, if you can, a photo. We&rsquo;ll work out a replacement or refund with you.
            </p>

            <h2>Returns</h2>
            <p>
              Please <Link href="/contact">contact us</Link> before sending anything back, so we can tell you how to
              proceed. Do not ship opened or partly used spray bottles without speaking to us first.
            </p>

            <h2>Safety</h2>
            <p>
              Read the <Link href="/safety">safety information</Link> before use. Keep product tightly closed and out of
              freezing temperatures during transit and storage.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
