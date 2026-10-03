import type { Metadata } from "next";

import { CommercialForm } from "@/components/forms/CommercialForm";
import { PageIntro } from "@/components/ui/PageIntro";
import { CLAIMS } from "@/content/claims";
import { formatPrice, getVariant } from "@/lib/catalog";
import { resolveVideo } from "@/lib/media";

export const metadata: Metadata = {
  title: "Commercial & wholesale",
  description:
    "No Sweat® for cafés, restaurants, bars and event teams. Tell us your volume and we'll follow up about commercial sizes and pricing.",
  alternates: { canonical: "/commercial" },
};

const SETTINGS = [
  { name: "Cafés and coffee shops", note: "Iced drinks all day, every day." },
  { name: "Restaurants", note: "Cold drinks at the table and at the pass." },
  { name: "Bars and nightlife", note: "Cocktails, beer and mixed drinks over ice." },
  { name: "Events and catering", note: "Large service runs with cups in constant motion." },
  { name: "Beverage makers and distributors", note: "Wholesale and distribution inquiries are welcome." },
] as const;

export default function CommercialPage() {
  const gallon = getVariant("1gal");

  return (
    <>
      <PageIntro
        title={
          <>
            {CLAIMS.commercialHeadline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </>
        }
        lede={CLAIMS.commercialBody}
        video={resolveVideo("commercial-hero")}
      />

      <section className="band">
        <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2 className="display display-md">Who it&rsquo;s for</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {SETTINGS.map((setting) => (
                <li key={setting.name} className="py-4">
                  <p className="font-semibold">{setting.name}</p>
                  <p className="text-frost">{setting.note}</p>
                </li>
              ))}
            </ul>
            {gallon ? (
              <p className="mt-8 max-w-md text-frost">
                The {gallon.sizeLabel} commercial jug is {formatPrice(gallon.priceCents)} online. If you need more than
                a few, send an inquiry and we&rsquo;ll follow up about volume.
              </p>
            ) : null}
          </div>

          <div id="inquiry" className="glass p-6 sm:p-10">
            <h2 className="display display-md">Commercial inquiry</h2>
            <p className="mt-3 mb-8 text-frost">Tell us about your business and we&rsquo;ll reply by email.</p>
            <CommercialForm />
          </div>
        </div>
      </section>
    </>
  );
}
