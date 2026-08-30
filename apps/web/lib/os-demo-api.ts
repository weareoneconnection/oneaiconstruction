/**
 * Client for the Construction OS public demo endpoint.
 *
 * Same contract as the Twin client in `twin-demo-api.ts`: the page renders its
 * static content first and only upgrades after hydration, and every failure
 * mode resolves to `null` so the visitor keeps what they were already shown.
 *
 * See the OS repo's docs/PUBLIC_DEMO.md.
 */

const READ_TIMEOUT_MS = 5000;
const UNREACHABLE_KEY = 'oneai-os-demo-unreachable-until';
const UNREACHABLE_TTL_MS = 90_000;

/** One scored prediction type: how often it lands, and by how much it misses. */
export type AccuracyKind = {
  kind: string;
  total: number;
  open: number;
  scored: number;
  /** Percentage, or null when nothing has been scored yet. */
  hitRate: number | null;
  meanAbsoluteError: number | null;
};

export type DemoAccuracy = {
  generatedAt: string;
  totalPredictions: number;
  kinds: AccuracyKind[];
};

export type DemoCommercial = {
  generatedAt: string;
  riskLevel: string;
  metrics: {
    projectCount: number;
    contractCount: number;
    baselineAmount: number;
    committedAmount: number;
    actualAmount: number;
    forecastAmount: number;
    varianceAmount: number;
    pendingChangeAmount: number;
    claimAmount: number;
    exposureAmount: number;
    overduePayments: number;
  };
  riskFlags: { key: string; severity: string; label: string; amount?: number; count?: number }[];
};

export function osDemoApiBase(): string | null {
  const base = process.env.NEXT_PUBLIC_OS_DEMO_API?.trim();
  return base ? base.replace(/\/$/, '') : null;
}

function markUnreachable(): void {
  try {
    sessionStorage.setItem(UNREACHABLE_KEY, String(Date.now() + UNREACHABLE_TTL_MS));
  } catch {
    // Private browsing, or storage disabled. Retrying is the acceptable cost.
  }
}

export function osDemoApiUnreachable(): boolean {
  try {
    const until = Number(sessionStorage.getItem(UNREACHABLE_KEY));
    if (!until) return false;
    if (Date.now() >= until) {
      sessionStorage.removeItem(UNREACHABLE_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

async function get<T>(path: string): Promise<T | null> {
  const base = osDemoApiBase();
  if (!base || osDemoApiUnreachable()) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), READ_TIMEOUT_MS);

  try {
    const response = await fetch(`${base}${path}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    // A 429 means this visitor is over budget, not that the endpoint is down,
    // so it is not remembered as a failure.
    if (!response.ok) return null;

    const body = (await response.json()) as { ok?: boolean; item?: T };
    return body?.ok && body.item ? body.item : null;
  } catch {
    markUnreachable();
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export function fetchOsAccuracy(): Promise<DemoAccuracy | null> {
  return get<DemoAccuracy>('/accuracy');
}

export function fetchOsCommercial(): Promise<DemoCommercial | null> {
  return get<DemoCommercial>('/commercial');
}
