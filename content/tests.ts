/**
 * The testing record. Add an entry here to publish a test; set `public: false`
 * to keep it internal without deleting it. Nothing on the site is hard-coded:
 * the homepage proof section, the Testing page and the before/after slider all
 * read from this list.
 *
 * Only real, matched-condition results belong here. Never add simulated or
 * illustrative material as a test.
 */

export type TestStatus = "prototype" | "development" | "verified" | "superseded";

export type TestMedia = {
  /** Same cup, same environment, same elapsed time. */
  untreatedSrc?: string;
  treatedSrc?: string;
  videoSrc?: string;
  poster?: string;
  alt: string;
};

export type TestRecord = {
  id: string;
  /** ISO date, e.g. "2026-10-14". */
  date: string;
  status: TestStatus;
  public: boolean;
  cupMaterial: string;
  surfacePrep: string;
  formulaRevision: string;
  coats: number;
  cureMinutes: number;
  ambientTempF: number;
  humidityPct: number;
  drinkTempF: number;
  durationMinutes: number;
  controlResult: string;
  treatedResult: string;
  notes?: string;
  media?: TestMedia;
};

export const TESTS: readonly TestRecord[] = [];

export const STATUS_LABEL: Record<TestStatus, string> = {
  prototype: "Prototype",
  development: "Development test",
  verified: "Verified",
  superseded: "Superseded",
};

export function publishedTests(): TestRecord[] {
  return TESTS.filter((test) => test.public).sort((a, b) => b.date.localeCompare(a.date));
}

/** The newest published test that has matched before/after photos. */
export function latestComparison(): (TestRecord & { media: Required<Pick<TestMedia, "untreatedSrc" | "treatedSrc" | "alt">> }) | null {
  for (const test of publishedTests()) {
    const media = test.media;
    if (media?.untreatedSrc && media.treatedSrc) {
      return { ...test, media: { untreatedSrc: media.untreatedSrc, treatedSrc: media.treatedSrc, alt: media.alt } };
    }
  }
  return null;
}
