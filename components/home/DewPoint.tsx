"use client";

import { useId, useState } from "react";

import { DropletIcon } from "@/components/ui/icons";
import { dewPointF } from "@/lib/dewpoint";

const SCALE_MIN = 20;
const SCALE_MAX = 100;
const ICED_DRINK_F = 38;

const toPercent = (f: number) =>
  `${Math.min(100, Math.max(0, ((f - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100))}%`;

function Slider({
  label,
  value,
  unit,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        <span className="tnum text-lg font-bold text-cyan">
          {value}
          {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-2 w-full cursor-pointer accent-[#1ac8f4]"
      />
    </div>
  );
}

/**
 * Pure physics, no product claim: pick a room and see the dew point, and
 * whether an iced drink sits below it (and so will sweat).
 */
export function DewPoint() {
  const [airF, setAirF] = useState(78);
  const [humidity, setHumidity] = useState(65);

  const dew = dewPointF(airF, humidity);
  const gap = Math.round(dew - ICED_DRINK_F);
  const sweats = gap > 0;

  return (
    <div className="glass p-6 sm:p-8">
      <p className="font-semibold text-frost">Try your room</p>

      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <Slider label="Room temperature" value={airF} unit="°F" min={55} max={100} onChange={setAirF} />
        <Slider label="Humidity" value={humidity} unit="%" min={20} max={95} onChange={setHumidity} />
      </div>

      <div className="mt-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-frost">Dew point</p>
          <p className="display tnum text-[clamp(3rem,9vw,4.75rem)] leading-none text-ice [text-shadow:0_0_32px_rgb(26_200_244_/_0.55)]">
            {Math.round(dew)}°F
          </p>
        </div>
        <p className="max-w-[12rem] text-right text-sm text-frost">
          Any surface colder than this collects water.
        </p>
      </div>

      <div className="relative mt-10 mb-12" aria-hidden>
        <div className="h-3 rounded-full bg-[linear-gradient(90deg,#2b7bff,#1ac8f4_40%,#d19554_80%,#e0663f)]" />
        <div
          className="absolute -top-9 -translate-x-1/2 text-center transition-[left] duration-500 ease-out"
          style={{ left: toPercent(dew) }}
        >
          <p className="whitespace-nowrap text-xs font-semibold text-ice">Dew point</p>
          <div className="mx-auto mt-1 h-5 w-0.5 bg-ice" />
        </div>
        <div
          className="absolute top-5 -translate-x-1/2 text-center transition-[left] duration-500 ease-out"
          style={{ left: toPercent(ICED_DRINK_F) }}
        >
          <DropletIcon className="mx-auto h-5 w-5 text-cyan" />
          <p className="whitespace-nowrap text-xs font-semibold text-cyan">Iced drink</p>
        </div>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`rounded-[12px] border px-4 py-3 transition-colors duration-500 ${
          sweats ? "border-wet/40 bg-wet/10" : "border-cyan/40 bg-cyan/10"
        }`}
      >
        {sweats
          ? `An iced drink (about ${ICED_DRINK_F}°F) is ${gap}°F below the dew point in this room, so water vapor will condense on the cup.`
          : `An iced drink (about ${ICED_DRINK_F}°F) stays above the dew point in this room, so condensation is unlikely.`}
      </p>
    </div>
  );
}
