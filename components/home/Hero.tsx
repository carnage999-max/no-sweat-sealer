import Image from "next/image";
import Link from "next/link";

import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { btn } from "@/components/ui/button";
import { Droplets } from "@/components/ui/Droplets";
import { PointerGlow } from "@/components/ui/PointerGlow";
import { CLAIMS } from "@/content/claims";
import { publishedTests } from "@/content/tests";
import type { VideoMedia } from "@/lib/media";

export function Hero({ video }: { video: VideoMedia | null }) {
  const hasTest = publishedTests().length > 0;

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="aurora absolute inset-0 -z-20" />
      {video ? (
        <div aria-hidden className="absolute inset-0 -z-10 opacity-40">
          <BackgroundVideo media={video} />
        </div>
      ) : null}
      <Droplets />

      <PointerGlow>
        <div className="wrap grid items-center gap-6 pb-14 pt-6 sm:pt-10 lg:min-h-[calc(100svh-104px)] lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 lg:py-16">
          <div className="relative">
            <Image
              src="/new-des/new-logo.jpeg"
              alt="No Sweat®. Chrome and ice-blue wordmark with a droplet in the O, ringed by a blue arc beside a tumbler."
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 640px) 380px, 70vw"
              className="-ml-2 w-[70vw] max-w-[380px] mix-blend-screen [mask-image:radial-gradient(ellipse_closest-side,#000_70%,transparent)] sm:-ml-6"
            />

            <h1
              className="display chrome-text mt-2"
              style={{ fontSize: "clamp(2.4rem, 8.2vw, 4.5rem)" }}
            >
              {CLAIMS.heroHeadline.map((line, index) => (
                <span key={line} className="line-mask">
                  <span className="line-up" style={{ animationDelay: `${0.15 + index * 0.14}s` }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p className="lede mt-6 text-frost">{CLAIMS.heroSubhead}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/products/no-sweat" className={`${btn("primary", "lg")} sm:min-w-[11rem]`}>
                Shop No Sweat
              </Link>
              {hasTest ? (
                <Link href="/testing" className={btn("ghost", "lg")}>
                  Watch the test
                </Link>
              ) : (
                <Link href="/how-it-works" className={btn("ghost", "lg")}>
                  See how it works
                </Link>
              )}
            </div>
            <p className="mt-6 max-w-md text-[0.9rem] text-frost">{CLAIMS.heroTrustLine}</p>
          </div>

          <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(43_123_255_/_0.55),transparent_68%)] blur-2xl"
            />
            <Image
              src="/product/4-oz-spray-bottle.png"
              alt="No Sweat® 4 oz spray bottle, glowing electric blue with ice and water droplets."
              width={1122}
              height={1402}
              priority
              sizes="(min-width: 1024px) 520px, 80vw"
              className="float relative mx-auto max-h-[72svh] w-auto mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,#000_45%,transparent_78%)]"
            />
            <p className="glass absolute left-0 top-[14%] z-10 hidden px-4 py-2 text-[0.85rem] font-semibold sm:block">
              Clear, water-based spray
            </p>
            <p className="glass absolute bottom-[16%] right-0 z-10 hidden px-4 py-2 text-[0.85rem] font-semibold sm:block">
              Three sizes
            </p>
          </div>
        </div>
      </PointerGlow>
    </section>
  );
}
