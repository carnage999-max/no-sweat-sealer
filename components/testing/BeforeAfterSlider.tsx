"use client";

import Image from "next/image";
import { useId, useState } from "react";

import { track } from "@/lib/analytics";

/**
 * Draggable before/after comparison. A full-size transparent range input
 * drives it, so pointer drag, touch drag and arrow keys all work natively and
 * stay accessible. The two buttons below are the tap-to-toggle fallback.
 */
export function BeforeAfterSlider({
  untreatedSrc,
  treatedSrc,
  alt,
  aspect = "16 / 10",
  untreatedLabel = "Untreated",
  treatedLabel = "No Sweat test",
}: {
  untreatedSrc: string;
  treatedSrc: string;
  alt: string;
  aspect?: string;
  untreatedLabel?: string;
  treatedLabel?: string;
}) {
  const [position, setPosition] = useState(50);
  const [touched, setTouched] = useState(false);
  const id = useId();

  function move(next: number) {
    setPosition(next);
    if (!touched) {
      setTouched(true);
      track("watch_test", { method: "comparison_slider" });
    }
  }

  return (
    <div>
      <div
        className="relative isolate overflow-hidden rounded-[14px] border border-line focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-cyan"
        style={{ aspectRatio: aspect }}
      >
        <Image src={untreatedSrc} alt={alt} fill sizes="(min-width: 1024px) 720px, 92vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <Image src={treatedSrc} alt="" fill sizes="(min-width: 1024px) 720px, 92vw" className="object-cover" />
        </div>

        <p className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-void/75 px-3 py-1.5 text-[0.8rem] backdrop-blur">
          <span aria-hidden className="h-2 w-2 rounded-full bg-wet" />
          {untreatedLabel}
        </p>
        <p className="pointer-events-none absolute right-4 top-4 flex items-center gap-2 rounded-full bg-void/75 px-3 py-1.5 text-[0.8rem] backdrop-blur">
          <span aria-hidden className="h-2 w-2 rounded-full bg-cyan" />
          {treatedLabel}
        </p>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-cyan shadow-[0_0_20px_3px_rgb(26_200_244_/_0.6)]"
          style={{ left: `${position}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cyan bg-void text-cyan">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>

        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => move(Number(event.target.value))}
          aria-label={`Comparison position. Drag to reveal ${treatedLabel.toLowerCase()} on the right and ${untreatedLabel.toLowerCase()} on the left.`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      <div className="mt-3 flex gap-2" role="group" aria-label="Show one side">
        <button
          type="button"
          onClick={() => move(100)}
          aria-pressed={position === 100}
          className="rounded-[10px] border border-line-strong px-4 py-2 text-sm hover:border-wet aria-pressed:border-wet aria-pressed:text-wet"
        >
          {untreatedLabel}
        </button>
        <button
          type="button"
          onClick={() => move(0)}
          aria-pressed={position === 0}
          className="rounded-[10px] border border-line-strong px-4 py-2 text-sm hover:border-cyan aria-pressed:border-cyan aria-pressed:text-cyan"
        >
          {treatedLabel}
        </button>
      </div>
    </div>
  );
}
