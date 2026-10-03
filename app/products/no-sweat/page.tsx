import type { Metadata } from "next";
import Link from "next/link";

import { BuyBox } from "@/components/shop/BuyBox";
import { FaqList } from "@/components/ui/Accordion";
import { DownloadIcon } from "@/components/ui/icons";
import { btn } from "@/components/ui/button";
import { DIRECTIONS, HANDLING, SDS_HREF } from "@/content/directions";
import { featuredFaqs } from "@/content/faq";
import { DEFAULT_VARIANT_ID, isVariantId, VARIANTS } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "No Sweat® spray",
  description:
    "Buy No Sweat®, a clear water-based spray engineered to reduce exterior condensation on cold drinkware. 4 oz, 16 oz and 1 gallon.",
  alternates: { canonical: "/products/no-sweat" },
};

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ size?: string | string[] }>;
}) {
  const { size } = await searchParams;
  const initial = typeof size === "string" && isVariantId(size) ? size : DEFAULT_VARIANT_ID;
  const siteUrl = getSiteUrl();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "No Sweat®",
    description:
      "A clear, water-based spray engineered to reduce exterior condensation on cold drinkware.",
    brand: { "@type": "Brand", name: "No Sweat" },
    image: VARIANTS.map((variant) => `${siteUrl}${variant.image}`),
    offers: VARIANTS.map((variant) => ({
      "@type": "Offer",
      name: variant.name,
      sku: variant.sku,
      price: (variant.priceCents / 100).toFixed(2),
      priceCurrency: variant.currency.toUpperCase(),
      availability: variant.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${siteUrl}/products/no-sweat?size=${variant.id}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <section className="py-10 sm:py-16">
        <div className="wrap">
          <BuyBox initialVariantId={initial} />
        </div>
      </section>

      <section id="directions" className="band border-t border-line bg-graphite">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="display display-md">Directions</h2>
            <ol className="mt-6 space-y-4">
              {DIRECTIONS.map((step, index) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="tnum font-bold text-cyan">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="display display-md">Before you spray</h2>
            <ul className="mt-6 space-y-3 text-frost">
              {HANDLING.map((item) => (
                <li key={item} className="border-l-2 border-line-strong pl-4">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SDS_HREF} target="_blank" rel="noopener noreferrer" className={btn("ghost")}>
                <DownloadIcon className="h-4 w-4" />
                Safety Data Sheet
              </a>
              <Link href="/safety" className={btn("ghost")}>
                Full safety information
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="on-paper band bg-paper text-ink">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className="display display-lg">Common questions</h2>
          <FaqList faqs={featuredFaqs()} tone="paper" />
        </div>
      </section>
    </>
  );
}
