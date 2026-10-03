"use client";

import { useEffect, useState } from "react";

import type { VideoMedia } from "@/lib/media";

/**
 * A muted, looping, decorative background video. It is never the Largest
 * Contentful Paint (the poster or still image beneath it is), it is skipped
 * entirely for visitors who prefer reduced motion, and a load failure simply
 * leaves the still image showing.
 */
export function BackgroundVideo({
  media,
  className = "",
}: {
  media: VideoMedia;
  className?: string;
}) {
  const [allowed, setAllowed] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAllowed(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  if (!allowed || failed) return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      poster={media.poster}
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    >
      {media.sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
