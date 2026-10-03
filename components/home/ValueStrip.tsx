import { Marquee } from "@/components/ui/Marquee";

const ITEMS = [
  "Engineered to reduce condensation",
  "Drier hands",
  "Cleaner desks",
  "Clear water-based spray",
  "Made for cold drinks",
  "4 oz, 16 oz and 1 gallon",
] as const;

export function ValueStrip() {
  return <Marquee items={ITEMS} />;
}
