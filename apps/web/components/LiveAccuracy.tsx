'use client';

import { useEffect, useState } from 'react';
import type { Dictionary } from '../lib/i18n/dictionaries';
import type { Locale } from '../lib/i18n/config';
import {
  fetchOsAccuracy,
  osDemoApiBase,
  osDemoApiUnreachable,
  type DemoAccuracy
} from '../lib/os-demo-api';

/**
 * How the published tolerances are actually performing.
 *
 * The page above this states the tolerances and promises that "when we have
 * enough scored predictions across live projects to be statistically
 * meaningful, the aggregate lands on this page — good or bad". This is that
 * aggregate. It renders nothing when the endpoint is unset or unreachable, so
 * the promise stays a promise rather than becoming a broken panel.
 */
export function LiveAccuracy({ locale, t }: { locale: Locale; t: Dictionary }) {
  const ta = t.demos.accuracy;
  const [accuracy, setAccuracy] = useState<DemoAccuracy | null>(null);

  useEffect(() => {
    if (!osDemoApiBase() || osDemoApiUnreachable()) return;
    let cancelled = false;

    fetchOsAccuracy().then((result) => {
      if (!cancelled) setAccuracy(result);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!accuracy || accuracy.kinds.length === 0) return null;

  /**
   * Below this, a percentage is noise rather than a result.
   *
   * A 100% hit rate over one scored prediction is not a good result — it is
   * not a result at all, and printing it beside a caveat still leaves "100%"
   * as the thing a reader screenshots. The scored count is always shown, so
   * nothing is hidden; only the meaningless ratio is withheld.
   */
  const MIN_SCORED_FOR_RATE = 10;

  /**
   * Mean absolute error is in the prediction's own units: days, points, or
   * currency. A cost error printed raw reads as `6887674.26`, which is a
   * number nobody parses at a glance — compact notation for the large one,
   * plain for the small ones.
   */
  function formatError(kind: string, value: number): string {
    if (kind === 'forecast_cost') {
      return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
        notation: 'compact',
        maximumFractionDigits: 1
      }).format(value);
    }
    return String(value);
  }

  const totalScored = accuracy.kinds.reduce((sum, kind) => sum + kind.scored, 0);
  const asOf = new Date(accuracy.generatedAt).toLocaleDateString(
    locale === 'zh' ? 'zh-CN' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="live-accuracy">
      <div className="live-accuracy-head">
        <span className="source-badge is-live">{ta.badge}</span>
        <strong>{ta.title}</strong>
        <span className="live-accuracy-meta">
          {accuracy.totalPredictions} {ta.totalPredictions} · {ta.asOf} {asOf}
        </span>
      </div>

      <div className="compare-table-wrap">
        <table className="compare-table tolerance-table">
          <caption className="visually-hidden">{ta.title}</caption>
          <thead>
            <tr>
              <th scope="col">{ta.headers.kind}</th>
              <th scope="col">{ta.headers.scored}</th>
              <th scope="col">{ta.headers.hitRate}</th>
              <th scope="col">{ta.headers.mae}</th>
            </tr>
          </thead>
          <tbody>
            {accuracy.kinds.map((kind) => (
              <tr key={kind.kind}>
                <th scope="row">{ta.kinds[kind.kind as keyof typeof ta.kinds] ?? kind.kind}</th>
                <td>
                  {kind.scored}
                  {kind.open > 0 && (
                    <span className="pending-note">
                      {' '}
                      (+{kind.open} {ta.pending})
                    </span>
                  )}
                </td>
                <td className="tolerance-value">
                  {kind.hitRate === null || kind.scored < MIN_SCORED_FOR_RATE
                    ? ta.none
                    : `${kind.hitRate}%`}
                </td>
                <td>
                  {kind.meanAbsoluteError === null || kind.scored < MIN_SCORED_FOR_RATE
                    ? ta.none
                    : formatError(kind.kind, kind.meanAbsoluteError)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalScored < MIN_SCORED_FOR_RATE * accuracy.kinds.length && (
        <p className="table-note">{ta.thin}</p>
      )}
    </div>
  );
}
