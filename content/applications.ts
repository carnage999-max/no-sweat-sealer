export type ApplicationStatus =
  /** Drinkware: the product's tested focus. */
  | "core"
  /** Being evaluated. Shown with no performance claims. */
  | "evaluating"
  /** Safety-related uses. Hidden until independently validated. */
  | "held";

export type Application = {
  id: string;
  name: string;
  status: ApplicationStatus;
  note: string;
};

export const APPLICATIONS: readonly Application[] = [
  {
    id: "plastic-cups",
    name: "Disposable plastic cups",
    status: "core",
    note: "Iced coffee, tea and soda cups.",
  },
  {
    id: "tumblers",
    name: "Reusable tumblers",
    status: "core",
    note: "Insulated and uninsulated tumblers you carry all day.",
  },
  {
    id: "glassware",
    name: "Glassware",
    status: "core",
    note: "Cold-drink glasses at home and behind the bar.",
  },
  {
    id: "stainless",
    name: "Stainless drinkware",
    status: "core",
    note: "Bottles and mugs in brushed or coated steel.",
  },
  {
    id: "service",
    name: "Beverage-service equipment",
    status: "core",
    note: "Pitchers, shakers and server-side drinkware.",
  },

  {
    id: "mirrors",
    name: "Mirrors and bathroom glass",
    status: "evaluating",
    note: "Fogged mirrors and shower glass.",
  },
  {
    id: "display-glass",
    name: "Refrigerated display glass",
    status: "evaluating",
    note: "Cooler doors and display cases.",
  },
  {
    id: "optics",
    name: "Optics and lenses",
    status: "evaluating",
    note: "Camera lenses, binoculars and eyewear.",
  },

  // Safety-related uses stay out of public copy until independently validated.
  { id: "vehicle-glass", name: "Vehicle windows and mirrors", status: "held", note: "" },
  { id: "helmets", name: "Helmets and visors", status: "held", note: "" },
  { id: "safety-response", name: "Safety and response equipment", status: "held", note: "" },
] as const;

export const coreApplications = () => APPLICATIONS.filter((a) => a.status === "core");
export const evaluatingApplications = () =>
  APPLICATIONS.filter((a) => a.status === "evaluating");
