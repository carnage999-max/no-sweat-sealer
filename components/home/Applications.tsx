import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { coreApplications } from "@/content/applications";
import { FLAGS } from "@/content/claims";

const GALLERY = [
  {
    src: "/new-des/example-on-bathroom-mirror.jpeg",
    alt: "A bathroom mirror, fogged on the left and clear on the right, with the No Sweat logo.",
    width: 1536,
    height: 1024,
  },
  {
    src: "/new-des/example-use-on-car-and-daily-life.jpeg",
    alt: "A car windshield, fogged on the left and clear on the right, with icons for everyday uses.",
    width: 1672,
    height: 941,
  },
  {
    src: "/new-des/example-use-for-law-enforcement.jpeg",
    alt: "A safety-response helmet visor and side mirrors, fogged on the left and clear on the right.",
    width: 1672,
    height: 941,
  },
] as const;

export function Applications() {
  const core = coreApplications();

  return (
    <section id="applications" className="band">
      <div className="wrap">
        <Reveal>
          <h2 className="display display-lg max-w-3xl">Made for cold drinkware.</h2>
          <p className="lede mt-6 text-frost">
            No Sweat® goes on the outside of the cup. Drinkware is where our testing is focused.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {core.map((app, index) => (
            <Reveal as="li" key={app.id} delay={index * 80} className="glass p-5">
              <p className="font-semibold">{app.name}</p>
              <p className="mt-1 text-frost">{app.note}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal variant="scale" className="mt-16">
          <div className="overflow-hidden rounded-[18px] border border-cyan/30 shadow-[0_30px_90px_-30px_rgb(43_123_255_/_0.5)]">
            <Image
              src="/new-des/applications.jpeg"
              alt="No Sweat concept collage showing automotive, helmets, bathrooms and showers, drinkware, optics, cameras, marine and commercial uses."
              width={1672}
              height={941}
              sizes="(min-width: 1280px) 1216px, 94vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>

        {FLAGS.showEvaluatingApplications ? (
          <>
            <div className="mt-6 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
              {GALLERY.map((image, index) => (
                <Reveal key={image.src} delay={index * 120}>
                  <div className="group overflow-hidden rounded-[16px] border border-white/10 transition-all duration-300 hover:border-cyan/60 hover:shadow-[0_24px_60px_-24px_rgb(26_200_244_/_0.5)]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 46vw, 94vw"
                      className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-5 max-w-3xl text-[0.9rem] text-frost">
              Concept imagery. Surfaces beyond drinkware are under evaluation and have not been tested.
            </p>
          </>
        ) : null}
      </div>
    </section>
  );
}
