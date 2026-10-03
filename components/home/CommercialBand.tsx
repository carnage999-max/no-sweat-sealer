import Link from "next/link";

import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { btn } from "@/components/ui/button";
import { CLAIMS } from "@/content/claims";
import type { VideoMedia } from "@/lib/media";

export function CommercialBand({ video }: { video: VideoMedia | null }) {
  return (
    <section className="relative isolate overflow-hidden border-t border-line bg-void">
      {video ? (
        <div aria-hidden className="absolute inset-0 -z-10 opacity-40">
          <BackgroundVideo media={video} />
        </div>
      ) : null}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--color-void)_0%,var(--color-void)_40%,rgb(5_8_13_/_0.6)_100%)]"
      />
      <div className="wrap grid gap-10 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-32">
        <h2 className="display" style={{ fontSize: "clamp(2.25rem, 5.6vw, 4.6rem)" }}>
          {CLAIMS.commercialHeadline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <div>
          <p className="lede text-frost">{CLAIMS.commercialBody}</p>
          <Link href="/commercial" className={`${btn("primary", "lg")} mt-8`}>
            Commercial &amp; wholesale
          </Link>
        </div>
      </div>
    </section>
  );
}
