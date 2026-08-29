'use client';

import { useMemo, useState } from 'react';
import {
  BASELINE_DAYS,
  buildForecast,
  completionDay,
  HORIZON_DAYS,
  type ForecastPoint
} from '../lib/forecast';
import type { Dictionary } from '../lib/i18n/dictionaries';
import { format } from '../lib/i18n/format';

const CHART = { width: 720, height: 300, padLeft: 46, padRight: 18, padTop: 16, padBottom: 34 };

export function TimelineDemo({ t }: { t: Dictionary }) {
  const tl = t.demos.timeline;
  const [dataDate, setDataDate] = useState(68);
  const points = useMemo(() => buildForecast(dataDate), [dataDate]);

  const baselineFinish = completionDay(points, 'baseline') ?? BASELINE_DAYS;
  const p50Finish = completionDay(points, 'p50');
  const p90Finish = completionDay(points, 'p90');
  const p10Finish = completionDay(points, 'p10');

  const current = points.filter((point) => point.actual != null).at(-1);
  const plannedNow = points.find((point) => point.day >= dataDate)?.baseline ?? 0;
  const actualNow = current?.actual ?? 0;

  const x = (day: number) =>
    CHART.padLeft + (day / HORIZON_DAYS) * (CHART.width - CHART.padLeft - CHART.padRight);
  const y = (value: number) =>
    CHART.height -
    CHART.padBottom -
    (value / 100) * (CHART.height - CHART.padTop - CHART.padBottom);

  const line = (key: keyof ForecastPoint) =>
    points
      .filter((point) => point[key] != null)
      .map((point, index) => `${index === 0 ? 'M' : 'L'}${x(point.day)} ${y(point[key] as number)}`)
      .join(' ');

  const cone = useMemo(() => {
    const upper = points.filter((point) => point.p10 != null);
    const lower = [...points].reverse().filter((point) => point.p90 != null);
    if (upper.length === 0) return '';
    return (
      upper
        .map((point, i) => `${i === 0 ? 'M' : 'L'}${x(point.day)} ${y(point.p10 as number)}`)
        .join(' ') +
      ' ' +
      lower.map((point) => `L${x(point.day)} ${y(point.p90 as number)}`).join(' ') +
      ' Z'
    );
  }, [points]);

  const variance = p50Finish != null ? p50Finish - baselineFinish : 0;
  const p90Variance = p90Finish != null ? p90Finish - baselineFinish : 0;

  return (
    <div className="timeline-card">
      <div className="timeline-head">
        <div>
          <span className="eyebrow">{tl.eyebrow}</span>
          <h3>{tl.title}</h3>
        </div>
        <strong>
          {tl.dataDate} {dataDate}
        </strong>
      </div>

      <label className="timeline-slider">
        <span className="visually-hidden">{tl.sliderLabel}</span>
        <input
          type="range"
          min={20}
          max={104}
          step={2}
          value={dataDate}
          onChange={(event) => setDataDate(Number(event.target.value))}
        />
      </label>

      <div className="chart-wrap">
        <svg
          viewBox={`0 0 ${CHART.width} ${CHART.height}`}
          className="forecast-chart"
          role="img"
          aria-label={format(tl.chartLabel, {
            dataDate,
            planned: plannedNow.toFixed(0),
            actual: actualNow.toFixed(0),
            p50: p50Finish?.toFixed(0) ?? tl.beyondHorizon,
            p90: p90Finish?.toFixed(0) ?? tl.beyondHorizon,
            baseline: baselineFinish.toFixed(0)
          })}
        >
          <g className="chart-grid" aria-hidden="true">
            {[0, 25, 50, 75, 100].map((value) => (
              <g key={value}>
                <line
                  x1={CHART.padLeft}
                  y1={y(value)}
                  x2={CHART.width - CHART.padRight}
                  y2={y(value)}
                />
                <text x={CHART.padLeft - 10} y={y(value) + 4} textAnchor="end">
                  {value}%
                </text>
              </g>
            ))}
            {[0, 40, 80, 120, 160].map((day) => (
              <text key={day} x={x(day)} y={CHART.height - 12} textAnchor="middle">
                D{day}
              </text>
            ))}
          </g>

          <path className="cone" d={cone} />
          <path className="curve baseline" d={line('baseline')} />
          <path className="curve p50" d={line('p50')} />
          <path className="curve actual" d={line('actual')} />

          <line
            className="data-date"
            x1={x(dataDate)}
            y1={CHART.padTop}
            x2={x(dataDate)}
            y2={CHART.height - CHART.padBottom}
          />

          {current && (
            <circle
              className="actual-dot"
              cx={x(current.day)}
              cy={y(current.actual as number)}
              r={4}
            />
          )}
        </svg>
      </div>

      <div className="chart-legend" aria-hidden="true">
        <span className="key baseline">{tl.legend.baseline}</span>
        <span className="key actual">{tl.legend.actual}</span>
        <span className="key p50">{tl.legend.p50}</span>
        <span className="key cone">{tl.legend.cone}</span>
      </div>

      <div className="timeline-stats">
        <span>
          {tl.stats.planned} <b>{plannedNow.toFixed(0)}%</b>
        </span>
        <span>
          {tl.stats.actual} <b>{actualNow.toFixed(0)}%</b>
        </span>
        <span>
          {tl.stats.p50Variance}{' '}
          <b className={variance > 0.5 ? 'danger' : ''}>
            {variance > 0 ? '+' : ''}
            {variance.toFixed(1)}d
          </b>
        </span>
        <span>
          {tl.stats.p90Variance}{' '}
          <b className={p90Variance > 0.5 ? 'danger' : ''}>
            {p90Variance > 0 ? '+' : ''}
            {p90Variance.toFixed(1)}d
          </b>
        </span>
        <span>
          {tl.stats.p10Best}{' '}
          <b>{p10Finish != null ? `${tl.stats.day} ${p10Finish.toFixed(0)}` : '—'}</b>
        </span>
      </div>
    </div>
  );
}
