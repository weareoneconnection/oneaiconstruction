/**
 * Forecast model behind the timeline demo.
 *
 * The previous version drew three decorative bars from an arbitrary formula.
 * This produces an S-curve baseline, an actual curve that accumulates real
 * variance, and a widening P10/P50/P90 cone — which is what the surrounding
 * copy has always claimed the product does.
 */

export type ForecastPoint = {
  day: number;
  /** Baseline is only drawn to its own completion; null afterwards. */
  baseline: number | null;
  actual: number | null;
  p10: number | null;
  p50: number | null;
  p90: number | null;
};

/** Day on which the approved baseline reaches completion. */
export const BASELINE_DAYS = 120;

/**
 * The chart runs past baseline completion. Without headroom a forecast that is
 * behind plan can never reach 100% on screen, so every variance figure would
 * read as zero.
 */
export const HORIZON_DAYS = 190;

const STEP = 2;

/** Cumulative S-curve progress, normalised 0–1. */
function sCurve(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped * clamped * (3 - 2 * clamped);
}

function baselineAt(day: number): number {
  return sCurve(day / BASELINE_DAYS) * 100;
}

/**
 * Planned work in the step ending on `day`.
 *
 * Past baseline completion the S-curve is flat, so a late forecast would stall
 * just short of 100% forever. Beyond that point the mean project rate is used
 * instead: a project running late works at a normal pace, not at the
 * decelerating rate of a curve that was shaped for an on-time finish.
 */
const MEAN_RATE = 100 / (BASELINE_DAYS / STEP);

function plannedIncrement(day: number): number {
  if (day > BASELINE_DAYS) return MEAN_RATE;
  return baselineAt(day) - baselineAt(day - STEP);
}

/**
 * Productivity relative to plan. Drops through the crane-availability and
 * connection-plate window, then partially recovers — the story the Ask Twin
 * evidence describes.
 */
function productivity(day: number): number {
  if (day < 34) return 1;
  if (day < 58) return 0.8;
  if (day < 76) return 0.9;
  return 0.92;
}

export function buildForecast(dataDate: number): ForecastPoint[] {
  const points: ForecastPoint[] = [];

  let actual = 0;
  let actualAtDataDate = 0;

  for (let day = 0; day <= HORIZON_DAYS; day += STEP) {
    if (day <= dataDate) {
      actual = Math.min(100, actual + plannedIncrement(day) * productivity(day));
      actualAtDataDate = actual;
    }

    points.push({
      day,
      baseline: day <= BASELINE_DAYS ? baselineAt(day) : null,
      actual: day <= dataDate ? actual : null,
      p10: null,
      p50: null,
      p90: null
    });
  }

  // Project forward from the last observed actual, at the trailing productivity
  // rate, with uncertainty that widens the further out the forecast reaches.
  const rate = productivity(dataDate);
  const anchorIndex = findLastIndex(points, (point) => point.day <= dataDate);

  let p10 = actualAtDataDate;
  let p50 = actualAtDataDate;
  let p90 = actualAtDataDate;

  // The cone starts on the actual curve so the two visually join up.
  points[anchorIndex].p10 = actualAtDataDate;
  points[anchorIndex].p50 = actualAtDataDate;
  points[anchorIndex].p90 = actualAtDataDate;

  for (let i = anchorIndex + 1; i < points.length; i += 1) {
    const point = points[i];
    const increment = plannedIncrement(point.day);
    const horizon = (point.day - dataDate) / BASELINE_DAYS;
    const spread = 0.3 * Math.sqrt(Math.max(0, horizon));

    p10 = Math.min(100, p10 + increment * (rate + spread));
    p50 = Math.min(100, p50 + increment * rate);
    p90 = Math.min(100, p90 + increment * Math.max(0.3, rate - spread));

    point.p10 = p10;
    point.p50 = p50;
    point.p90 = p90;
  }

  return points;
}

/** Day on which a curve first reaches 100%, interpolated, or null if it never does. */
export function completionDay(
  points: ForecastPoint[],
  key: 'baseline' | 'p10' | 'p50' | 'p90'
): number | null {
  for (let i = 1; i < points.length; i += 1) {
    const previous = points[i - 1][key];
    const current = points[i][key];
    if (previous == null || current == null) continue;
    if (current >= 99.95) {
      const span = current - previous;
      const ratio = span === 0 ? 0 : (100 - previous) / span;
      return points[i - 1].day + ratio * (points[i].day - points[i - 1].day);
    }
  }
  return null;
}

function findLastIndex<T>(items: T[], predicate: (item: T) => boolean): number {
  for (let i = items.length - 1; i >= 0; i -= 1) {
    if (predicate(items[i])) return i;
  }
  return 0;
}
