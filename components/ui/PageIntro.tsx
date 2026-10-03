import type { ReactNode } from "react";

import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { Droplets } from "@/components/ui/Droplets";
import type { VideoMedia } from "@/lib/media";

/** The opening band of every inner page: one h1, one lede, optional loop behind. */
export function PageIntro({
  title,
  lede,
  video,
  children,
}: {
  title: ReactNode;
  lede?: ReactNode;
  video?: VideoMedia | null;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      <div aria-hidden className="aurora absolute inset-0 -z-20" />
      <Droplets />
      {video ? (
        <div aria-hidden className="absolute inset-0 -z-10 opacity-45">
          <BackgroundVideo media={video} />
        </div>
      ) : null}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--color-void)_0%,var(--color-void)_45%,rgb(5_8_13_/_0.6)_100%)]"
      />
      <div className="wrap py-16 sm:py-24">
        <h1 className="display chrome-text max-w-4xl" style={{ fontSize: "clamp(2.2rem, 5.4vw, 4.4rem)" }}>
          {title}
        </h1>
        {lede ? <p className="lede mt-6 text-frost">{lede}</p> : null}
        {children}
      </div>
    </section>
  );
}
