import Image from "next/image";
import Link from "next/link";

import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { btn } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { CLAIMS } from "@/content/claims";
import type { VideoMedia } from "@/lib/media";

export function CommercialBand({ video }: { video: VideoMedia | null }) {
  return (
    <section className="relative isolate overflow-hidden border-y border-white/10 bg-graphite">
      <div
        aria-hidden
        className="absolute -right-20 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(43_123_255_/_0.45),transparent_65%)] blur-3xl"
      />
      {video ? (
        <div aria-hidden className="absolute inset-0 -z-10 opacity-35">
          <BackgroundVideo media={video} />
        </div>
      ) : null}
      <div className="wrap grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal variant="left">
          <h2 className="display" style={{ fontSize: "clamp(2.1rem, 6vw, 4.6rem)" }}>
            {CLAIMS.commercialHeadline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="lede mt-6 text-frost">{CLAIMS.commercialBody}</p>
          <Link href="/commercial" className={`${btn("primary", "lg")} mt-8`}>
            Commercial &amp; wholesale
          </Link>
        </Reveal>
        <Reveal variant="right" className="mx-auto w-full max-w-[420px]">
          <TiltCard className="overflow-hidden rounded-[18px] border border-cyan/30 shadow-[0_30px_90px_-30px_rgb(26_200_244_/_0.5)]">
            <Image
              src="/product/1-gallon.png"
              alt="No Sweat® commercial 1 gallon jug, glowing electric blue."
              width={1122}
              height={1402}
              sizes="(min-width: 1024px) 420px, 80vw"
              className="h-auto w-full"
            />
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
