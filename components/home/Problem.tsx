import Image from "next/image";

import { CLAIMS } from "@/content/claims";

export function Problem() {
  return (
    <section className="band border-t border-line bg-graphite">
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <figure>
          <div className="relative aspect-[760/470] overflow-hidden rounded-[14px] border border-line">
            <Image
              src="/images/problem-puddle.jpg"
              alt="A sweating iced drink beside a spreading puddle on a dark counter, with drops still running down the cup."
              fill
              sizes="(min-width: 1024px) 600px, 92vw"
              className="object-cover"
            />
            <p className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-void/70 px-3 py-1.5 text-[0.8rem] backdrop-blur">
              <span aria-hidden className="h-2 w-2 rounded-full bg-wet" />
              Untreated
            </p>
          </div>
          <figcaption className="mt-3 text-[0.8rem] text-frost">Illustration, not test data.</figcaption>
        </figure>

        <div>
          <h2 className="display display-lg">
            {CLAIMS.problemHeadline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {CLAIMS.problemPoints.map((point) => (
              <li key={point.title} className="grid gap-1 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <p className="font-semibold">{point.title}</p>
                <p className="text-frost">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
