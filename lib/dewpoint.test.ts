import { describe, expect, it } from "vitest";

import { dewPointF } from "@/lib/dewpoint";

describe("dewPointF", () => {
  it.each([
    [75, 60, 60.2],
    [70, 50, 50.5],
    [90, 80, 83.3],
    [68, 40, 42.8],
  ])("%s°F at %s%% RH is about %s°F", (air, rh, expected) => {
    expect(dewPointF(air, rh)).toBeCloseTo(expected, 0);
  });

  it("equals the air temperature at 100% humidity", () => {
    expect(dewPointF(80, 100)).toBeCloseTo(80, 5);
  });
});
