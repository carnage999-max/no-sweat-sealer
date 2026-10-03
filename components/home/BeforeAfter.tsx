import Link from "next/link";

import { BeforeAfterSlider } from "@/components/testing/BeforeAfterSlider";
import { btn } from "@/components/ui/button";
import { latestComparison } from "@/content/tests";

/**
 * Renders only when a published test has matched before/after photos: same
 * cup, same environment, same elapsed time. Until then it renders nothing,
 * rather than faking a comparison with an illustration.
 */
export function BeforeAfter() {
  const test = latestComparison();
  if (!test) return null;

  return (
    <section className="band border-t border-line bg-graphite">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <h2 className="display display-lg">Same cup. Same room. Same minute.</h2>
          <p className="lede mt-6 text-frost">
            Drag the line to compare the untreated control with the treated cup at {test.durationMinutes}{" "}
            minutes. Conditions are listed with the test.
          </p>
          <Link href="/testing" className={`${btn("ghost")} mt-8`}>
            See the conditions
          </Link>
        </div>
        <BeforeAfterSlider {...test.media} />
      </div>
    </section>
  );
}
