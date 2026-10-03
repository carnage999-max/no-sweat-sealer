import type { Metadata } from "next";

import { btn } from "@/components/ui/button";
import { DownloadIcon } from "@/components/ui/icons";
import { PageIntro } from "@/components/ui/PageIntro";
import { DIRECTIONS, FIRST_AID, HANDLING, SDS_HREF, STORAGE } from "@/content/directions";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Safety and directions",
  description:
    "How to apply No Sweat® safely: directions, handling, first aid, storage and the Safety Data Sheet.",
  alternates: { canonical: "/safety" },
};

const COMPOSITION = [
  ["Water", "80–92%"],
  ["Acrylic polymer dispersion (water-borne)", "3–10%"],
  ["Hydrophobic fumed silica (treated)", "1–5%"],
  ["Isopropyl alcohol (co-solvent)", "0.5–2%"],
  ["Additives (wetting and flow agents, preservatives)", "Under 1%"],
] as const;

export default function SafetyPage() {
  return (
    <>
      <PageIntro
        title="Safety and directions."
        lede="Read this before you spray. It is drawn from the product's Safety Data Sheet."
      >
        <a href={SDS_HREF} target="_blank" rel="noopener noreferrer" className={`${btn("primary", "lg")} mt-8`}>
          <DownloadIcon className="h-5 w-5" />
          Download the Safety Data Sheet
        </a>
      </PageIntro>

      <section className="band">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
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

            <h2 className="display display-md mt-14">Handling</h2>
            <ul className="mt-6 space-y-3 text-frost">
              {HANDLING.map((item) => (
                <li key={item} className="border-l-2 border-line-strong pl-4">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="display display-md mt-14">Storage</h2>
            <p className="mt-6 text-frost">{STORAGE}</p>
          </div>

          <div>
            <h2 className="display display-md">First aid</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {FIRST_AID.map((item) => (
                <div key={item.when} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="font-semibold">{item.when}</dt>
                  <dd className="text-frost">{item.action}</dd>
                </div>
              ))}
            </dl>

            <h2 className="display display-md mt-14">What it&rsquo;s made of</h2>
            <p className="mt-4 text-frost">Approximate ranges by weight, from the Safety Data Sheet.</p>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {COMPOSITION.map(([name, range]) => (
                <div key={name} className="flex justify-between gap-6 py-3">
                  <dt className="text-frost">{name}</dt>
                  <dd className="tnum shrink-0 font-semibold">{range}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-frost">
              Not classified as hazardous under GHS when used as intended. It may cause mild eye irritation, and
              respiratory irritation if the spray mist is inhaled.
            </p>

            <h2 className="display display-md mt-14">Questions</h2>
            <p className="mt-4 text-frost">
              {SITE.contact.phoneNote}:{" "}
              <a href={SITE.contact.phoneHref} className="font-semibold text-ice hover:text-cyan">
                {SITE.contact.phone}
              </a>
              . {SITE.contact.addressLines.join(", ")}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
