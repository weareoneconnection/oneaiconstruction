'use client';

import { useEffect, useState } from 'react';
import type { Dictionary } from '../lib/i18n/dictionaries';
import {
  demoApiBase,
  demoApiUnreachable,
  fetchDemoForecast,
  type DemoForecast
} from '../lib/twin-demo-api';

/**
 * The real current forecast for the demo project, shown beside — not merged
 * into — the interactive chart.
 *
 * The chart above it is an illustration driven by a local model, because the
 * public endpoint has no data-date parameter to drive. Blending the two would
 * imply the slider was moving live figures. Keeping them separate lets the
 * chart stay interactive while the live numbers stay true.
 *
 * Renders nothing at all when the endpoint is unset or unreachable.
 */
export function LiveForecast({ t }: { t: Dictionary }) {
  const tl = t.demos.live;
  const [forecast, setForecast] = useState<DemoForecast | null>(null);

  useEffect(() => {
    if (!demoApiBase() || demoApiUnreachable()) return;
    let cancelled = false;

    fetchDemoForecast().then((result) => {
      if (!cancelled) setForecast(result);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!forecast) return null;

  const days = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}${tl.days}`;

  return (
    <div className="live-forecast">
      <div className="live-forecast-head">
        <span className="source-badge is-live">{tl.badge}</span>
        <strong>{tl.forecastTitle}</strong>
        <span className={forecast.calibrated ? 'calibration is-calibrated' : 'calibration'}>
          {forecast.calibrated ? tl.calibrated : tl.uncalibrated}
          {forecast.sampleSize != null && ` · ${tl.sample} ${forecast.sampleSize}`}
        </span>
      </div>

      <div className="live-forecast-values">
        <div>
          <dt>{tl.p10}</dt>
          <dd>{days(forecast.p10)}</dd>
        </div>
        <div>
          <dt>{tl.p50}</dt>
          <dd>{days(forecast.p50)}</dd>
        </div>
        <div>
          <dt>{tl.p90}</dt>
          <dd className="danger">{days(forecast.p90)}</dd>
        </div>
      </div>

      <p className="live-forecast-caption">
        {tl.forecastCaption}
        {forecast.note ? ` ${forecast.note}` : ''}
      </p>
    </div>
  );
}
