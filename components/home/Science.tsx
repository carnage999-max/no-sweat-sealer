import Link from "next/link";

import { btn } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { CLAIMS } from "@/content/claims";

import { DewPoint } from "./DewPoint";

export function Science() {
  return (
    <section className="band border-y border-white/10 bg-graphite">
      <div className="wrap">
        <Reveal>
          <h2 className="display display-lg max-w-5xl">
            {CLAIMS.scienceHeadline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="space-y-5 text-frost">
              {CLAIMS.scienceBody.map((paragraph) => (
                <p key={paragraph} className="measure">
                  {paragraph}
                </p>
              ))}
            </div>
            <Link href="/testing" className={`${btn("ghost")} mt-9`}>
              See our testing
            </Link>
          </Reveal>
          <Reveal variant="scale">
            <DewPoint />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
