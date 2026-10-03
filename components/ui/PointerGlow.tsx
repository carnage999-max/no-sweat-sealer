"use client";

import { useRef, type ReactNode } from "react";

/**
 * Wraps a section and lets a soft cyan spotlight follow the cursor. The
 * position is written straight to CSS variables, so moving the mouse never
 * re-renders anything. Mouse only: touch and pen are ignored.
 */
export function PointerGlow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const { clientX, clientY } = event;
        if (frame.current) return;
        frame.current = window.requestAnimationFrame(() => {
          frame.current = 0;
          const el = ref.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${clientX - rect.left}px`);
          el.style.setProperty("--my", `${clientY - rect.top}px`);
        });
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden opacity-70 md:block"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx, 72%) var(--my, 30%), rgb(26 200 244 / 0.16), transparent 62%)",
        }}
      />
      {children}
    </div>
  );
}
