import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Terms of use and sale",
  description: "The terms that apply to using this site and buying No Sweat® products.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageIntro title="Terms of use and sale." />
      <section className="on-paper band bg-paper text-ink">
        <div className="wrap">
          <div className="prose-ns">
            <h2>Using this site</h2>
            <p>
              By using this site you agree to these terms. If you do not agree, please do not use it. We may update them
              from time to time, and the version on this page is the one that applies.
            </p>

            <h2>Using the product</h2>
            <p>
              Use No Sweat® only as directed, and read the <Link href="/safety">safety information</Link> and the Safety
              Data Sheet before you do. Apply it to outside surfaces only, and never to the inside of a cup or to any
              surface that touches food or drink. It is not for ingestion.
            </p>
            <p>
              No Sweat® is engineered to reduce exterior condensation. Results depend on conditions such as temperature
              and humidity and are not guaranteed.
            </p>

            <h2>Orders and payment</h2>
            <p>
              Prices are shown in U.S. dollars. Payment is processed by Stripe, and we do not see or store your card
              details. An order is accepted when we confirm it. We may cancel or refuse an order, for example if a price
              is shown in error or a product is unavailable, and if we do we will refund anything you have paid.
            </p>
            <p>
              Shipping and returns are described on the <Link href="/shipping-returns">shipping and returns page</Link>.
            </p>

            <h2>Our content</h2>
            <p>
              The No Sweat® name, logo and the content of this site belong to us or our licensors. You may not copy or
              reuse them without our permission.
            </p>

            <h2>Disclaimers and limits of liability</h2>
            <p>
              The site and products are provided as is, without warranties of any kind beyond those the law requires. To
              the extent the law allows, we are not liable for indirect or consequential losses, and our total liability
              for any claim is limited to the amount you paid for the product concerned.
            </p>

            <h2>Governing law</h2>
            <p>These terms are governed by the laws of the State of Maine, United States.</p>

            <h2>Contact</h2>
            <p>
              Questions about these terms? <Link href="/contact">Contact us</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
