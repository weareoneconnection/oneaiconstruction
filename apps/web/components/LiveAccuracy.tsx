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
                  {kind.hitRate === null ? ta.none : `${kind.hitRate}%`}
                </td>
                <td>{kind.meanAbsoluteError === null ? ta.none : kind.meanAbsoluteError}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* A hit rate over three scored predictions is noise, and presenting it
          without saying so would be the exact failure this page argues against. */}
      {totalScored < 20 && <p className="table-note">{ta.thin}</p>}
    </div>
  );
}
