import Link from "next/link";

import { TestCard } from "@/components/testing/TestCard";
import { btn } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { CLAIMS } from "@/content/claims";
import { publishedTests } from "@/content/tests";

const RECORD_FIELDS = [
  "Cup material and surface preparation",
  "Formula revision, coats and cure time",
  "Room temperature and humidity",
  "Drink and ice temperature",
  "Duration",
  "Control and treated results",
  "Photos and video from the same session",
];

export function Proof() {
  const latest = publishedTests()[0];

  if (latest) {
    return (
      <section className="band">
        <div className="wrap">
          <Reveal>
            <h2 className="display display-lg">
              {CLAIMS.testingHeadline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal className="mt-10">
            <TestCard test={latest} />
          </Reveal>
          <Link href="/testing" className={`${btn("ghost")} mt-8`}>
            All tests and methodology
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="band">
      <div className="wrap">
        <Reveal className="glass grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="display display-lg">{CLAIMS.testingInProgressHeadline[0]}</h2>
            <p className="lede mt-6 text-frost">{CLAIMS.testingInProgressBody}</p>
            <Link href="/testing" className={`${btn("ghost")} mt-8`}>
              See testing status
            </Link>
          </div>
          <div>
            <p className="font-semibold">Every test record includes</p>
            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {RECORD_FIELDS.map((field) => (
                <li key={field} className="py-3 text-frost">
                  {field}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
