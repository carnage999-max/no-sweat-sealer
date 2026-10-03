"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";

/**
 * `useLayoutEffect` in the browser, `useEffect` during the server render pass.
 * Keeps the synchronous pre-paint measurement without React's SSR warning.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* -------------------------------------------------------------------- */
/* Shared reveal controller                                              */
/*                                                                       */
/* One IntersectionObserver plus one rAF-throttled scroll/resize sweep    */
/* serve every element on the page.                                      */
/*                                                                       */
/* The sweep is the load-bearing half. A per-element observer on its own  */
/* can miss elements during a fast wheel scroll or an anchor jump, which  */
/* strands them at opacity 0 forever. The sweep reveals anything whose    */
/* top is above the trigger line — which covers both "entering the        */
/* viewport" and "already scrolled well past" — so nothing gets stuck.    */
/*                                                                       */
/* The sweep is driven by scroll/resize/hashchange AND by a low-frequency */
/* interval. The interval is the real guarantee: a programmatic jump — an */
/* anchor, a restored scroll position, scrollTo({behavior:"instant"}) —   */
/* can land without producing a scroll event or an observer callback at   */
/* all. Polling costs one bounding-rect read per pending element a few    */
/* times a second, runs only while something is still pending, and stops  */
/* the moment the last element is revealed.                              */
/* -------------------------------------------------------------------- */

const SWEEP_INTERVAL_MS = 300;

const pending = new Set<HTMLElement>();
let observer: IntersectionObserver | null = null;
let frame = 0;
let timer = 0;

function show(el: HTMLElement) {
  if (!pending.delete(el)) return;
  observer?.unobserve(el);

  const ms = Number(el.dataset.revealDelay ?? 0);
  if (ms > 0) {
    window.setTimeout(() => el.setAttribute("data-reveal", "shown"), ms);
  } else {
    el.setAttribute("data-reveal", "shown");
  }

  if (pending.size === 0) teardown();
}

function sweep() {
  const limit = window.innerHeight * 0.94;
  for (const el of [...pending]) {
    if (el.getBoundingClientRect().top < limit) show(el);
  }
}

function scheduleSweep() {
  if (frame) return;
  frame = window.requestAnimationFrame(() => {
    frame = 0;
    sweep();
  });
}

function teardown() {
  window.removeEventListener("scroll", scheduleSweep);
  window.removeEventListener("resize", scheduleSweep);
  window.removeEventListener("hashchange", scheduleSweep);
  observer?.disconnect();
  observer = null;
  if (frame) window.cancelAnimationFrame(frame);
  frame = 0;
  if (timer) window.clearInterval(timer);
  timer = 0;
}

function register(el: HTMLElement) {
  if (pending.size === 0) {
    window.addEventListener("scroll", scheduleSweep, { passive: true });
    window.addEventListener("resize", scheduleSweep, { passive: true });
    window.addEventListener("hashchange", scheduleSweep);
    timer = window.setInterval(sweep, SWEEP_INTERVAL_MS);
  }

  pending.add(el);

  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // `boundingClientRect.top < 0` catches elements the observer first
        // sees only after they have already been scrolled past.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          show(entry.target as HTMLElement);
        }
      }
    },
    // Generous bottom margin: start the reveal before the element is
    // technically on screen, which also widens the window for fast scrolls.
    { rootMargin: "220px 0px 220px 0px", threshold: 0 },
  );

  observer.observe(el);
}

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger, in ms, applied only to elements that animate in on scroll. */
  delay?: number;
  id?: string;
  /** Entrance style. */
  variant?: "up" | "scale" | "left" | "right";
};

/**
 * Fade/lift-on-scroll wrapper.
 *
 * Server output carries a bare `data-reveal` attribute, which CSS renders fully
 * visible. On mount the element is measured synchronously against the viewport
 * BEFORE any hidden state is written, so anything already on screen — the hero
 * above all — is marked "shown" in the same pass and can never flash invisible.
 * Only genuinely below-the-fold elements are switched to the hidden state.
 *
 * The state lives on the DOM node and is toggled through the ref: no setState,
 * therefore no re-render and no setState-in-effect lint violation.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  id,
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Synchronous measurement, before any hidden state is applied.
    const alreadyVisible =
      el.getBoundingClientRect().top < window.innerHeight * 0.94;

    if (alreadyVisible || prefersReduced) {
      el.setAttribute("data-reveal", "shown");
      return;
    }

    // Safe to hide only now that we know the element is below the fold.
    el.setAttribute("data-reveal", "pending");
    register(el);

    return () => {
      if (pending.delete(el)) {
        observer?.unobserve(el);
        if (pending.size === 0) teardown();
      }
    };
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-reveal=""
      data-variant={variant}
      data-reveal-delay={delay || undefined}
    >
      {children}
    </Tag>
  );
}
