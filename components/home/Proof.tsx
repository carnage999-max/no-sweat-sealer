import Link from "next/link";

import { TestCard } from "@/components/testing/TestCard";
import { btn } from "@/components/ui/button";
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
      <section className="band border-t border-line bg-void">
        <div className="wrap">
          <h2 className="display display-lg">
            {CLAIMS.testingHeadline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <div className="mt-10">
            <TestCard test={latest} />
          </div>
          <Link href="/testing" className={`${btn("ghost")} mt-8`}>
            All tests and methodology
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="band border-t border-line bg-void">
      <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <h2 className="display display-lg">{CLAIMS.testingInProgressHeadline[0]}</h2>
          <p className="lede mt-6 text-frost">{CLAIMS.testingInProgressBody}</p>
          <Link href="/testing" className={`${btn("ghost")} mt-8`}>
            See testing status
          </Link>
        </div>
        <div>
          <p className="font-semibold">Every test record includes</p>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {RECORD_FIELDS.map((field) => (
              <li key={field} className="py-3 text-frost">
                {field}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
