import { DropletIcon } from "@/components/ui/icons";

/** An endless ticker. The second copy is hidden from assistive tech. */
export function Marquee({ items }: { items: readonly string[] }) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center ${hidden ? "marquee-dup" : ""}`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="display display-sm px-6 text-ice/90 sm:px-9">{item}</span>
          <DropletIcon className="h-5 w-5 shrink-0 text-cyan" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee border-y border-line bg-graphite/60 py-5">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
