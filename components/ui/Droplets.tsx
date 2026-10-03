const DROPLETS = [
  { left: "6%", size: 14, duration: 13, delay: 0, drift: 18 },
  { left: "14%", size: 26, duration: 19, delay: 3, drift: -22 },
  { left: "23%", size: 10, duration: 11, delay: 6, drift: 10 },
  { left: "34%", size: 20, duration: 17, delay: 1.5, drift: -14 },
  { left: "47%", size: 12, duration: 14, delay: 8, drift: 24 },
  { left: "58%", size: 30, duration: 21, delay: 4, drift: -18 },
  { left: "68%", size: 16, duration: 15, delay: 9, drift: 12 },
  { left: "77%", size: 11, duration: 12, delay: 2, drift: -10 },
  { left: "86%", size: 24, duration: 18, delay: 7, drift: 20 },
  { left: "94%", size: 13, duration: 16, delay: 5, drift: -16 },
] as const;

/** Decorative droplets that rise behind a hero. Fixed values keep SSR and client identical. */
export function Droplets() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {DROPLETS.map((d) => (
        <span
          key={d.left}
          className="droplet"
          style={{
            left: d.left,
            width: d.size,
            height: d.size,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            ["--drift" as string]: `${d.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
