import { TestVideo } from "@/components/testing/TestVideo";
import { BeforeAfterSlider } from "@/components/testing/BeforeAfterSlider";
import { STATUS_LABEL, type TestRecord } from "@/content/tests";

function formatDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00Z`);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line py-3">
      <dt className="text-[0.8rem] text-frost">{label}</dt>
      <dd className="tnum mt-0.5 font-semibold">{value}</dd>
    </div>
  );
}

/**
 * One published test, with every condition that was recorded. Conditions are
 * what make a result believable, so they are never collapsed or hidden.
 */
export function TestCard({ test }: { test: TestRecord }) {
  const { media } = test;

  return (
    <article className="glass p-5 sm:p-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h3 className="display display-md">Test {test.id}</h3>
          <p className="mt-1 text-frost">{formatDate(test.date)}</p>
        </div>
        <p className="rounded-full border border-line-strong px-3 py-1 text-[0.85rem]">
          {STATUS_LABEL[test.status]}
        </p>
      </header>

      {media ? (
        <div className="mt-6">
          {media.videoSrc ? (
            <TestVideo src={media.videoSrc} poster={media.poster} label={media.alt} />
          ) : media.untreatedSrc && media.treatedSrc ? (
            <BeforeAfterSlider untreatedSrc={media.untreatedSrc} treatedSrc={media.treatedSrc} alt={media.alt} />
          ) : null}
        </div>
      ) : null}

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 font-semibold">
            <span aria-hidden className="h-2 w-2 rounded-full bg-wet" />
            Untreated control
          </p>
          <p className="mt-2 text-frost">{test.controlResult}</p>
        </div>
        <div>
          <p className="flex items-center gap-2 font-semibold">
            <span aria-hidden className="h-2 w-2 rounded-full bg-cyan" />
            Treated with No Sweat®
          </p>
          <p className="mt-2 text-frost">{test.treatedResult}</p>
        </div>
      </div>

      <dl className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        <Fact label="Cup material" value={test.cupMaterial} />
        <Fact label="Surface preparation" value={test.surfacePrep} />
        <Fact label="Formula revision" value={test.formulaRevision} />
        <Fact label="Coats and cure time" value={`${test.coats} ${test.coats === 1 ? "coat" : "coats"}, ${test.cureMinutes} min`} />
        <Fact label="Room temperature" value={`${test.ambientTempF}°F`} />
        <Fact label="Relative humidity" value={`${test.humidityPct}%`} />
        <Fact label="Drink temperature" value={`${test.drinkTempF}°F`} />
        <Fact label="Duration" value={`${test.durationMinutes} min`} />
      </dl>

      {test.notes ? <p className="mt-6 text-frost">{test.notes}</p> : null}
    </article>
  );
}
