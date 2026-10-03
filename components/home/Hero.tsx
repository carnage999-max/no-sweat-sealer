import Image from "next/image";
import Link from "next/link";

import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { btn } from "@/components/ui/button";
import { Droplets } from "@/components/ui/Droplets";
import { PointerGlow } from "@/components/ui/PointerGlow";
import { CLAIMS } from "@/content/claims";
import { publishedTests } from "@/content/tests";
import type { VideoMedia } from "@/lib/media";

/**
 * Copy on the left, the logo on the right (on top on phones). The aurora
 * glow and rising droplets are a stand-in background: once
 * public/video/home-hero.mp4 exists, the video replaces them.
 */
export function Hero({ video }: { video: VideoMedia | null }) {
  const hasTest = publishedTests().length > 0;

  return (
    <section className="relative isolate overflow-hidden">
      {video ? (
        <div aria-hidden className="absolute inset-0 -z-10 opacity-55">
          <BackgroundVideo media={video} />
        </div>
      ) : (
        <>
          <div aria-hidden className="aurora absolute inset-0 -z-20" />
          <Droplets />
        </>
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(4_7_12_/_0.2)_0%,rgb(4_7_12_/_0.65)_100%)]"
      />

      <PointerGlow>
        <div className="wrap grid items-center gap-4 pb-14 pt-6 sm:pt-10 lg:min-h-[calc(100svh-104px)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:py-16">
          <div className="order-1 flex justify-center lg:order-2">
            <Image
              src="/new-des/new-logo.jpeg"
              alt="No Sweat®. Chrome and ice-blue wordmark with a droplet in the O, ringed by a blue arc beside a tumbler."
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 1024px) 560px, 88vw"
              className="h-auto w-full max-w-[560px] mix-blend-screen [mask-image:radial-gradient(ellipse_closest-side,#000_70%,transparent)]"
            />
          </div>

          <div className="order-2 text-center lg:order-1 lg:text-left">
            <h1 className="display chrome-text" style={{ fontSize: "clamp(2.3rem, 8vw, 4.6rem)" }}>
              {CLAIMS.heroHeadline.map((line, index) => (
                <span key={line} className="line-mask">
                  <span className="line-up" style={{ animationDelay: `${0.15 + index * 0.14}s` }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p className="lede mx-auto mt-6 text-frost lg:mx-0">{CLAIMS.heroSubhead}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
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
            <p className="mx-auto mt-6 max-w-md text-[0.9rem] text-frost lg:mx-0">{CLAIMS.heroTrustLine}</p>
          </div>
        </div>
      </PointerGlow>
    </section>
  );
}
