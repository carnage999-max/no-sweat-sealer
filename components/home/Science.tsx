import Link from "next/link";

import { btn } from "@/components/ui/button";
import { CLAIMS } from "@/content/claims";

import { ScienceDiagram } from "./ScienceDiagram";

export function Science() {
  return (
    <section className="band border-t border-line bg-graphite">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <div>
          <h2 className="display display-lg">
            {CLAIMS.scienceHeadline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <div className="mt-8 space-y-5 text-frost">
            {CLAIMS.scienceBody.map((paragraph) => (
              <p key={paragraph} className="measure">
                {paragraph}
              </p>
            ))}
          </div>
          <Link href="/testing" className={`${btn("ghost")} mt-9`}>
            See our testing
          </Link>
        </div>
        <ScienceDiagram />
      </div>
    </section>
  );
}
