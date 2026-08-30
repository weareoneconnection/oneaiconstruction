'use client';

import { useEffect, useState } from 'react';
import type { Dictionary } from '../lib/i18n/dictionaries';
import type { Locale } from '../lib/i18n/config';
import {
  fetchOsCommercial,
  osDemoApiBase,
  osDemoApiUnreachable,
  type DemoCommercial
} from '../lib/os-demo-api';

/** Compact currency, so a nine-figure baseline does not wreck the layout. */
function money(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);
}

const HEADLINE = ['baselineAmount', 'committedAmount', 'actualAmount', 'forecastAmount'] as const;

const EXPOSURE = [
  'varianceAmount',
  'pendingChangeAmount',
  'claimAmount',
  'exposureAmount'
] as const;

/**
 * The commercial position, read live from Construction OS.
 *
 * Renders nothing when the endpoint is unset or unreachable: the product page
 * describes these modules in prose either way, and an empty panel would say
 * less than no panel.
 */
export function LiveCommercial({ locale, t }: { locale: Locale; t: Dictionary }) {
  const tc = t.demos.commercial;
  const [data, setData] = useState<DemoCommercial | null>(null);

  useEffect(() => {
    if (!osDemoApiBase() || osDemoApiUnreachable()) return;
    let cancelled = false;

    fetchOsCommercial().then((result) => {
      if (!cancelled) setData(result);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) return null;

  const m = data.metrics;

  return (
    <div className="live-commercial">
      <div className="live-accuracy-head">
        <span className="source-badge is-live">{tc.badge}</span>
        <strong>{tc.title}</strong>
        <span className="live-accuracy-meta">
          {m.projectCount} {tc.projects} · {m.contractCount} {tc.contracts}
        </span>
      </div>

      <p className="table-note">{tc.copy}</p>

      <div className="cost-grid">
        {HEADLINE.map((key) => (
          <div key={key}>
            <dt>{tc.metrics[key]}</dt>
            <dd>{money(m[key], locale)}</dd>
          </div>
        ))}
      </div>

      <div className="cost-grid is-exposure">
        {EXPOSURE.map((key) => (
          <div key={key}>
            <dt>{tc.metrics[key]}</dt>
            <dd className={m[key] > 0 ? 'danger' : ''}>{money(m[key], locale)}</dd>
          </div>
        ))}
      </div>

      {data.riskFlags.length > 0 && (
        <div className="risk-flags">
          <h4>{tc.flagsTitle}</h4>
          <ul>
            {data.riskFlags.map((flag) => (
              <li key={flag.key}>
                <span className={`flag-severity is-${flag.severity}`}>
                  {tc.severity[flag.severity as keyof typeof tc.severity] ?? flag.severity}
                </span>
                {flag.label}
                {typeof flag.count === 'number' && ` (${flag.count})`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
