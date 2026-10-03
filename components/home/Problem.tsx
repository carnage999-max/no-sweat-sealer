import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { CLAIMS } from "@/content/claims";

export function Problem() {
  return (
    <section className="band">
      <div className="wrap">
        <Reveal>
          <h2 className="display display-lg max-w-4xl">
            {CLAIMS.problemHeadline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal variant="scale" className="mt-10">
          <figure>
            <div className="overflow-hidden rounded-[18px] border border-cyan/30 shadow-[0_30px_90px_-30px_rgb(26_200_244_/_0.45)]">
              <Image
                src="/new-des/example-with-comparison-oncup.jpeg"
                alt="An iced coffee cup split down the middle. Without No Sweat, the left half is covered in condensation, drips and a puddle. With No Sweat, the right half is clear."
                width={1536}
                height={1024}
                sizes="(min-width: 1280px) 1216px, 94vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-[0.8rem] text-frost">Illustration, not test data.</figcaption>
          </figure>
        </Reveal>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {CLAIMS.problemPoints.map((point, index) => (
            <Reveal as="li" key={point.title} delay={index * 120} className="glass p-6">
              <p className="display display-sm">{point.title}</p>
              <p className="mt-3 text-frost">{point.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
