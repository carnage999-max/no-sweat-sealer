import type { Metadata } from "next";
import Link from "next/link";

import { TestCard } from "@/components/testing/TestCard";
import { btn } from "@/components/ui/button";
import { PageIntro } from "@/components/ui/PageIntro";
import { CLAIMS } from "@/content/claims";
import { publishedTests, STATUS_LABEL, type TestStatus } from "@/content/tests";

export const metadata: Metadata = {
  title: "Testing",
  description:
    "Every No Sweat® test, published with its conditions, formula revision and status.",
  alternates: { canonical: "/testing" },
};

const STATUS_MEANING: Record<TestStatus, string> = {
  prototype: "An early formula or exploratory run. Shown so you can see the work, not as a result to rely on.",
  development: "A structured test of a candidate formula under recorded conditions.",
  verified: "Repeated and reviewed under documented conditions.",
  superseded: "Replaced by a later formula revision. Kept for the record.",
};

const RECORD_FIELDS = [
  "Test ID and date",
  "Cup material and surface preparation",
  "Formula revision",
  "Number of coats and cure time",
  "Room temperature and relative humidity",
  "Drink temperature and duration",
  "Control and treated results",
  "Photos or video, side by side where possible",
];

export default function TestingPage() {
  const tests = publishedTests();

  return (
    <>
      <PageIntro
        title={tests.length > 0 ? "Don't take our word for it." : "We test in the open."}
        lede={
          tests.length > 0
            ? "Every result below is published with the conditions it was recorded under."
            : CLAIMS.testingInProgressBody
        }
      />

      <section className="band">
        <div className="wrap">
          {tests.length > 0 ? (
            <div className="space-y-10">
              {tests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          ) : (
            <div className="glass p-8 sm:p-10">
              <p className="display display-md">No published tests yet.</p>
              <p className="mt-4 max-w-2xl text-frost">
                We publish a test once its conditions, formula revision and results are recorded. Check back here, or
                see how No Sweat® is applied in the meantime.
              </p>
              <Link href="/how-it-works" className={`${btn("ghost")} mt-6`}>
                How it works
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="band border-t border-line bg-graphite">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="display display-md">What every record includes</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {RECORD_FIELDS.map((field) => (
                <li key={field} className="py-3 text-frost">
                  {field}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="display display-md">What the status labels mean</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {(Object.keys(STATUS_MEANING) as TestStatus[]).map((status) => (
                <div key={status} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-semibold">{STATUS_LABEL[status]}</dt>
                  <dd className="text-frost">{STATUS_MEANING[status]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
