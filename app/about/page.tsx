import type { Metadata } from "next";
import Link from "next/link";

import { btn } from "@/components/ui/button";
import { PageIntro } from "@/components/ui/PageIntro";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "About No Sweat®, a clear water-based spray engineered to reduce exterior condensation on cold drinkware.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        title="About No Sweat®."
        lede="A clear, water-based spray for the outside of cold drinkware, developed in the open."
      />
      <section className="band">
        <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="prose-ns">
            <h2>The problem we started with</h2>
            <p>
              Cold drinks sweat. The water runs down the cup onto hands, desks, counters and cupholders. No Sweat® is
              engineered to reduce that exterior condensation.
            </p>
            <h2>How we work</h2>
            <p>
              No Sweat® is in prototype testing. We publish each test with its conditions, formula revision and status
              on the <Link href="/testing">Testing page</Link>, and we word what the product does carefully: engineered to
              reduce condensation, not to promise a perfectly dry cup.
            </p>
            <p>
              Safety information is public too. The <Link href="/safety">Safety page</Link> and the Safety Data Sheet
              cover handling, first aid and storage.
            </p>
            <h2>Part of the Se7en family</h2>
            <p>
              No Sweat® is part of the{" "}
              <a href={SITE.family.url} target="_blank" rel="noopener noreferrer">
                {SITE.family.name}
              </a>{" "}
              family of companies.
            </p>
          </div>
          <div>
            <h2 className="display display-md">Manufacturer</h2>
            <address className="mt-6 not-italic text-frost">
              No Sweat
              {SITE.contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <a href={SITE.contact.phoneHref} className="mt-1 block hover:text-cyan">
                {SITE.contact.phone}
              </a>
            </address>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className={btn("ghost")}>
                Contact
              </Link>
              <Link href="/products/no-sweat" className={btn("primary")}>
                Shop No Sweat
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
