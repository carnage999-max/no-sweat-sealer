import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
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
    <section id="how" className="on-paper band relative overflow-hidden bg-paper text-ink">
      <div
        aria-hidden
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgb(26_200_244_/_0.25),transparent_65%)] blur-2xl"
      />
      <div className="wrap relative">
        <Reveal>
          <Heading className="display display-lg max-w-3xl">Three steps. Outside of the cup only.</Heading>
        </Reveal>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 140}
              className="group relative rounded-[16px] border border-ink/10 bg-white p-7 shadow-[0_20px_50px_-30px_rgb(8_18_26_/_0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-deep/40 hover:shadow-[0_30px_60px_-24px_rgb(6_106_140_/_0.45)]"
            >
              <span className="tnum absolute right-5 top-4 font-[family-name:var(--font-display)] text-5xl font-extrabold italic text-cyan-deep/15">
                {index + 1}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#1ac8f4,#5aa9ff)] text-void transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <step.icon className="h-6 w-6" />
              </span>
              <p className="display display-md mt-5">{step.title}</p>
              <p className="mt-3 text-slate">{step.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10 grid gap-6 md:grid-cols-2 md:gap-10">
          <p className="measure">{CLAIMS.mechanism}</p>
          <p className="measure text-slate">
            Apply to outside surfaces only, never to the inside of a cup or any surface that touches food or
            drink.{" "}
            <Link href="/safety" className="font-semibold text-ink underline underline-offset-4 hover:text-cyan-deep">
              Safety and directions
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
