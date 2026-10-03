import Image from "next/image";
import Link from "next/link";

import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { btn } from "@/components/ui/button";
import { CLAIMS } from "@/content/claims";
import { publishedTests } from "@/content/tests";
import type { VideoMedia } from "@/lib/media";

/**
 * The split cup: untreated on the left (warm), treated on the right (cyan).
 * On load a cyan line sweeps across it once, lifting a veil off the treated
 * half. Skipped entirely for visitors who prefer reduced motion.
 */
function SplitCup() {
  return (
    <figure className="relative">
      <div className="relative aspect-[730/694] overflow-hidden rounded-[14px] border border-line">
        <Image
          src="/images/hero-macro.jpg"
          alt="A clear cup of iced coffee split down the middle: the left half is covered in condensation with drips and a puddle, the right half is clear."
          fill
          priority
          sizes="(min-width: 1024px) 560px, 92vw"
          className="object-cover"
        />
        <div aria-hidden className="wipe-veil absolute inset-y-0 right-0 bg-void" style={{ left: "50%" }} />
        <div
          aria-hidden
          className="wipe-line absolute inset-y-0 w-[3px] -translate-x-1/2 bg-cyan shadow-[0_0_24px_4px_rgb(26_200_244_/_0.7)]"
          style={{ left: "50%" }}
        />
        <p className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-void/70 px-3 py-1.5 text-[0.8rem] backdrop-blur">
          <span aria-hidden className="h-2 w-2 rounded-full bg-wet" />
          Untreated
        </p>
        <p className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-void/70 px-3 py-1.5 text-[0.8rem] backdrop-blur">
          <span aria-hidden className="h-2 w-2 rounded-full bg-cyan" />
          With No Sweat®
        </p>
      </div>
      <figcaption className="mt-3 text-[0.8rem] text-frost">
        Illustration, not test data.
      </figcaption>
    </figure>
  );
}

export function Hero({ video }: { video: VideoMedia | null }) {
  const hasTest = publishedTests().length > 0;

  return (
    <section className="relative isolate overflow-hidden">
      {video ? (
        <div aria-hidden className="absolute inset-0 -z-10 opacity-50">
          <BackgroundVideo media={video} />
        </div>
      ) : null}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--color-void)_0%,var(--color-void)_34%,rgb(5_8_13_/_0.55)_100%)]"
      />

      <div className="wrap grid items-center gap-12 py-14 sm:py-20 lg:min-h-[calc(100svh-104px)] lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
        <div>
          <h1 className="display" style={{ fontSize: "clamp(2.5rem, 6vw, 5.1rem)" }}>
            {CLAIMS.heroHeadline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="lede mt-7 text-frost">{CLAIMS.heroSubhead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/products/no-sweat" className={btn("primary", "lg")}>
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
          <p className="mt-8 max-w-md text-[0.9rem] text-frost">{CLAIMS.heroTrustLine}</p>
        </div>

        <SplitCup />
      </div>
    </section>
  );
}
