type Bead = { y: number; r: number };

const UNTREATED: Bead[] = [
  { y: 48, r: 8 },
  { y: 82, r: 6 },
  { y: 112, r: 10 },
  { y: 150, r: 7 },
  { y: 182, r: 9 },
  { y: 214, r: 6 },
  { y: 244, r: 8 },
];

const TREATED: Bead[] = [
  { y: 70, r: 3.5 },
  { y: 156, r: 4 },
  { y: 228, r: 3 },
];

const VAPOR = [
  [22, 42], [58, 70], [96, 38], [34, 112], [78, 134], [18, 170], [64, 196], [104, 168], [40, 236], [92, 250],
];

function Panel({ x, treated, beads }: { x: number; treated: boolean; beads: Bead[] }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="0" y="0" width="150" height="280" fill="#0b1118" />
      {VAPOR.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" fill="#9fb3c2" opacity="0.55" />
      ))}
      <rect x="150" y="0" width="22" height="280" fill="#1b2935" stroke="#34475a" />
      {treated ? <rect x="146" y="0" width="5" height="280" fill="#1ac8f4" /> : null}
      <rect x="172" y="0" width="148" height="280" fill="#0a2230" />
      {beads.map((bead) => (
        <circle
          key={bead.y}
          cx={146 - (treated ? 2 : bead.r * 0.4)}
          cy={bead.y}
          r={bead.r}
          fill="#eaf6fb"
          fillOpacity="0.22"
          stroke="#eaf6fb"
          strokeOpacity="0.8"
        />
      ))}
    </g>
  );
}

/**
 * A simplified cross-section of a cold cup wall. Warm, humid room air on the
 * left; the chilled wall and drink on the right. Untreated beads up heavily;
 * with No Sweat® there are fewer and smaller beads, not none.
 */
export function ScienceDiagram() {
  return (
    <figure>
      <svg
        viewBox="0 0 660 300"
        role="img"
        aria-label="Simplified cross-section of a cold cup wall. Untreated, many large water beads collect on the outside of the wall. With No Sweat, a thin layer sits on the wall and only a few small beads remain."
        className="w-full overflow-hidden rounded-[14px] border border-line"
      >
        <Panel x={0} treated={false} beads={UNTREATED} />
        <Panel x={340} treated beads={TREATED} />
        <rect x="320" y="0" width="20" height="300" fill="#05080d" />

        <g fontFamily="var(--font-public-sans), sans-serif" fontSize="12" fill="#eaf6fb">
          <text x="14" y="292" fill="#9fb3c2">Humid room air</text>
          <text x="156" y="292" fill="#9fb3c2">Wall</text>
          <text x="196" y="292" fill="#9fb3c2">Cold drink</text>
          <text x="354" y="292" fill="#9fb3c2">Humid room air</text>
          <text x="496" y="292" fill="#9fb3c2">Wall</text>
          <text x="536" y="292" fill="#9fb3c2">Cold drink</text>
        </g>
        <g fontFamily="var(--font-public-sans), sans-serif" fontSize="13" fontWeight="600">
          <circle cx="16" cy="18" r="4" fill="#c98a4b" />
          <text x="26" y="22" fill="#eaf6fb">Untreated</text>
          <circle cx="356" cy="18" r="4" fill="#1ac8f4" />
          <text x="366" y="22" fill="#eaf6fb">With No Sweat®</text>
        </g>
      </svg>
      <figcaption className="mt-3 text-[0.8rem] text-frost">Simplified diagram, not to scale.</figcaption>
    </figure>
  );
}
