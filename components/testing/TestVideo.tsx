"use client";

import { track } from "@/lib/analytics";

/** A real test recording with controls. Never autoplays and keeps its audio. */
export function TestVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster?: string;
  label: string;
}) {
  return (
    <video
      controls
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
      onPlay={() => track("watch_test", { method: "video" })}
      className="aspect-video w-full rounded-[14px] border border-line bg-void"
    >
      <source src={src} />
    </video>
  );
}
