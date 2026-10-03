import Link from "next/link";

import { ApplyIcon, CureIcon, PrepIcon } from "@/components/ui/icons";
import { CLAIMS } from "@/content/claims";

const STEPS = [
  {
    icon: PrepIcon,
    title: "Prep",
    body: "Clean the outside of the cup with isopropyl alcohol and let it dry.",
  },
  {
    icon: ApplyIcon,
    title: "Apply",
    body: "Shake well. In a well-ventilated area, spray from 6 to 10 inches away in light, even coats.",
  },
  {
    icon: CureIcon,
    title: "Cure",
    body: "Let it dry for 5 minutes, then add a second thin coat for best results.",
  },
] as const;

/** The only numbered list on the site, because it is the only real sequence. */
export function HowItWorks({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const Heading = heading;
  return (
    <section id="how" className="on-paper band bg-paper text-ink">
      <div className="wrap">
        <Heading className="display display-lg max-w-3xl">Three steps. Outside of the cup only.</Heading>

        <ol className="mt-12 grid border-y border-ink/15 md:grid-cols-3 md:divide-x md:divide-ink/15">
          {STEPS.map((step, index) => (
            <li key={step.title} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0">
              <div className="flex items-center gap-4">
                <step.icon className="h-9 w-9 text-cyan-deep" />
                <p className="display display-md">
                  <span className="tnum mr-2 text-cyan-deep">{index + 1}</span>
                  {step.title}
                </p>
              </div>
              <p className="mt-4 text-slate">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <p className="measure">{CLAIMS.mechanism}</p>
          <p className="measure text-slate">
            Apply to outside surfaces only, never to the inside of a cup or any surface that touches food or
            drink.{" "}
            <Link href="/safety" className="font-semibold text-ink underline underline-offset-4 hover:text-cyan-deep">
              Safety and directions
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
