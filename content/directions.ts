/**
 * Directions and handling guidance, in one place. The FAQ, the product page and
 * the Safety page all read from here so they cannot disagree.
 *
 * DIRECTIONS come from the application directions on the previous site.
 * HANDLING, FIRST_AID and STORAGE come from the Safety Data Sheet
 * (issue date 2025-10-16, revision 1.0). Check any edit against that document.
 */

export const DIRECTIONS = [
  "Clean the outside of the cup with isopropyl alcohol and let it dry.",
  "Shake the bottle well.",
  "In a well-ventilated area, spray from 6 to 10 inches away in light, even coats.",
  "Let it dry for 5 minutes.",
  "Apply a second thin coat for best results.",
] as const;

export const HANDLING = [
  "Apply to outside surfaces only. Do not apply to the inside of a cup or to any surface that touches food or drink. Not for ingestion.",
  "Use only outdoors or in a well-ventilated area.",
  "Avoid breathing the spray mist.",
  "Wear eye protection. Nitrile gloves are recommended for frequent use.",
  "Wash hands after handling.",
  "Spilled product can make floors slippery. Absorb it with an inert material.",
] as const;

export const FIRST_AID = [
  { when: "If inhaled", action: "Move to fresh air. If symptoms persist, seek medical attention." },
  { when: "On skin", action: "Wash with soap and water." },
  {
    when: "In eyes",
    action:
      "Rinse with water for several minutes. Remove contact lenses if present and easy to do, and keep rinsing. If irritation persists, get medical advice.",
  },
  {
    when: "If swallowed",
    action: "Rinse mouth. Do not induce vomiting. Seek medical advice if a large amount was swallowed.",
  },
] as const;

export const STORAGE =
  "Keep tightly closed at 41–86°F (5–30°C). Keep from freezing and out of direct sunlight. Shelf life is about 24 months.";

export const SDS_HREF = "/doc/No_Sweat_SDS.pdf";
