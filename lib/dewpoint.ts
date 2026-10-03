// Magnus formula coefficients (Alduchov & Eskridge), accurate to about ±0.4°C
// for everyday room conditions.
const A = 17.62;
const B = 243.12;

export const fahrenheitToCelsius = (f: number) => ((f - 32) * 5) / 9;
export const celsiusToFahrenheit = (c: number) => (c * 9) / 5 + 32;

/** Dew point in °F for an air temperature in °F and relative humidity in %. */
export function dewPointF(airF: number, relativeHumidity: number): number {
  const t = fahrenheitToCelsius(airF);
  const gamma = Math.log(relativeHumidity / 100) + (A * t) / (B + t);
  return celsiusToFahrenheit((B * gamma) / (A - gamma));
}
