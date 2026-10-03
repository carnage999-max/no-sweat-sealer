/**
 * Every performance claim on the site, in one place.
 *
 * Prototype testing has shown condensation can still form under some
 * conditions, so the site only uses qualified language ("engineered to
 * reduce", "helps keep"). Do not add "completely dry", "prevents condensation",
 * "food-safe", "non-toxic", "dishwasher safe", durability periods, coverage
 * counts or performance percentages until the final formulation has been
 * independently substantiated.
 */
export const CLAIMS = {
  heroHeadline: ["The end of", "cup sweat."],
  heroSubhead:
    "No Sweat® is engineered to reduce exterior condensation on cold drinkware, helping keep hands, desks, counters and cupholders drier.",
  heroTrustLine: "Developed to reduce exterior condensation on cold drinkware.",

  problemHeadline: ["Your drink should be cold.", "Your desk shouldn't be wet."],
  problemPoints: [
    { title: "Wet hands", body: "Every sip starts with a slippery grip." },
    {
      title: "Soaked cupholders and desks",
      body: "Condensation runs down the cup and soaks whatever it sits on.",
    },
    {
      title: "Water rings and cleanup",
      body: "Rings on wood, puddles on counters, and a towel every time.",
    },
  ],

  testingHeadline: ["Don't take our word for it.", "Watch the test."],
  testingInProgressHeadline: ["We test in the open."],
  testingInProgressBody:
    "Prototype testing is under way. Each test is published with its conditions, formula revision and status, so you can see what was tested and how. New results appear on the Testing page as they are verified.",

  mechanism:
    "No Sweat® forms a thin, clear layer on the outside of the cup. It is engineered to change how heat and moisture behave at that surface.",

  benefits: [
    {
      title: "Less condensation",
      body: "Engineered to reduce the water that collects on the outside of a cold cup.",
    },
    {
      title: "Cleaner surfaces",
      body: "Helps keep water off desks, counters and cupholders.",
    },
    {
      title: "Clear application",
      body: "A clear, water-based spray that goes on the outside of the cup.",
    },
    {
      title: "Built for cold-drink environments",
      body: "Sized from a personal bottle to a commercial gallon for cafés, bars and events.",
    },
  ],

  scienceHeadline: ["Condensation is physics.", "So is the solution."],
  scienceBody: [
    "Condensation forms when a surface is colder than the dew point of the air around it. A cold drink chills the outside of its cup below that point, so water vapor in the room turns to liquid on the cup.",
    "No Sweat® is engineered to reduce that effect at the surface. How well it works depends on temperature and humidity, which is why we publish our test conditions.",
  ],

  commercialHeadline: ["Built for more", "than one cup."],
  commercialBody:
    "Cafés, restaurants, bars and event teams pour cold drinks all day. Tell us about your volume and we'll follow up about commercial sizes and pricing.",

  finalHeadline: ["Stop living", "with the drip."],
} as const;

export const FLAGS = {
  /** Show the "additional applications under evaluation" band. */
  showEvaluatingApplications: true,
  /** Customer reviews. Off until there are real ones. */
  showReviews: false,
} as const;
