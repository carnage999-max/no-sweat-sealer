import type { Metadata } from "next";
import Link from "next/link";

import { HowItWorks } from "@/components/home/HowItWorks";
import { Science } from "@/components/home/Science";
import { btn } from "@/components/ui/button";
import { PageIntro } from "@/components/ui/PageIntro";
import { resolveVideo } from "@/lib/media";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How to apply No Sweat®: prep, apply, cure. Plus a plain-language look at why cold cups sweat.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro
        title="Prep. Apply. Cure."
        lede="Applying No Sweat® takes a few minutes and a clean cup. Here is how it goes on, and why cold cups sweat in the first place."
        video={resolveVideo("how-it-works")}
      />
      <HowItWorks heading="h2" />
      <Science />
      <section className="band border-t border-line">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <p className="display display-md max-w-xl">See the conditions behind the claims.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/testing" className={btn("ghost", "lg")}>
              Testing
            </Link>
            <Link href="/products/no-sweat" className={btn("primary", "lg")}>
              Shop No Sweat
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
