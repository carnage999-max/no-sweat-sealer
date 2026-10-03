import Image from "next/image";

import { coreApplications, evaluatingApplications } from "@/content/applications";
import { FLAGS } from "@/content/claims";

export function Applications() {
  const core = coreApplications();
  const evaluating = evaluatingApplications();

  return (
    <section id="applications" className="band border-t border-line bg-void">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="display display-lg">Made for cold drinkware.</h2>
            <p className="lede mt-6 text-frost">
              No Sweat® goes on the outside of the cup. Drinkware is where our testing is focused.
            </p>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {core.map((app) => (
                <li key={app.id} className="grid gap-1 py-4 sm:grid-cols-[15rem_1fr] sm:gap-6">
                  <p className="font-semibold">{app.name}</p>
                  <p className="text-frost">{app.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <figure>
            <div className="relative aspect-square overflow-hidden rounded-[14px] border border-line">
              <Image
                src="/images/tumbler-split.jpg"
                alt="A stainless tumbler with condensation beaded across its left half and a clean brushed finish on its right half."
                fill
                sizes="(min-width: 1024px) 480px, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.8rem] text-frost">Illustration, not test data.</figcaption>
          </figure>
        </div>

        {FLAGS.showEvaluatingApplications && evaluating.length > 0 ? (
          <div className="mt-20 grid gap-10 border-t border-line pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <figure className="order-last lg:order-first">
              <div className="relative aspect-[1110/860] overflow-hidden rounded-[14px] border border-line">
                <Image
                  src="/images/mirror-concept.jpg"
                  alt="Concept image of a bathroom mirror, fogged on the left and clear on the right."
                  fill
                  sizes="(min-width: 1024px) 520px, 92vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[0.8rem] text-frost">
                Concept illustration. Not test data.
              </figcaption>
            </figure>
            <div>
              <h3 className="display display-md">Additional applications under evaluation</h3>
              <p className="mt-5 max-w-xl text-frost">
                We are exploring other surfaces. They have not been tested and carry no performance claims. We
                will list a surface as supported only once it has been.
              </p>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {evaluating.map((app) => (
                  <li key={app.id} className="grid gap-1 py-4 sm:grid-cols-[15rem_1fr] sm:gap-6">
                    <p className="font-semibold">{app.name}</p>
                    <p className="text-frost">{app.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
