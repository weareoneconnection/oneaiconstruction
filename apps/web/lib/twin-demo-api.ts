/**
 * Client for the Construction Twin public demo endpoint.
 *
 * The site renders its static content first and only upgrades to live data
 * after hydration. Every failure mode — unset URL, network error, timeout,
 * 429, malformed payload — resolves to `null`, and the caller keeps whatever
 * it was already showing. A marketing page must never depend on an API being
 * up, and must never spin waiting for one.
 *
 * See the product's docs/PUBLIC_DEMO.md for the contract.
 */

/**
 * Reads are database queries and answer in well under a second. `/ask` runs a
 * retrieval pass and a model call, and measured ~5.3s against the live demo
 * endpoint — a single shared 5s budget aborted it every time.
 */
const READ_TIMEOUT_MS = 5000;
const ASK_TIMEOUT_MS = 20000;

export type DemoMeta = {
  readOnly: boolean;
  projectId: string;
  allowedQuestions: string[];
  disclosure: string;
};

export type DemoEvidence = {
  id: string;
  sourceType: string;
  sourceId: string;
  content: string;
  relevance: number;
};

export type DemoAnswer = {
  question: string;
  answer: string;
  /** 0–1 from the API; the UI renders it as a percentage. */
  confidence: number;
  provisional: boolean;
  evidence: DemoEvidence[];
  claims: { text: string; supported: boolean }[];
  reasoning: {
    modelBacked: boolean;
    mode: string;
    retrieval: string;
    sampleSize: number;
  };
};

export type DemoForecast = {
  p10: number;
  p50: number;
  p90: number;
  calibrated: boolean;
  sampleSize: number | null;
  note: string | null;
};

export function demoApiBase(): string | null {
  const base = process.env.NEXT_PUBLIC_TWIN_DEMO_API?.trim();
  return base ? base.replace(/\/$/, '') : null;
}

const UNREACHABLE_KEY = 'oneai-demo-api-unreachable-until';

/**
 * How long a failure is remembered. Long enough to stop a dead endpoint being
 * retried on every page view; short enough that a visitor who arrives during a
 * deploy or a cold start is not stuck on sample data for their whole session.
 *
 * An earlier version remembered the failure for the entire session, which meant
 * one transient blip permanently downgraded that visitor even though the
 * endpoint recovered seconds later.
 */
const UNREACHABLE_TTL_MS = 90_000;

function markUnreachable(): void {
  try {
    sessionStorage.setItem(UNREACHABLE_KEY, String(Date.now() + UNREACHABLE_TTL_MS));
  } catch {
    // Private browsing, or storage disabled. Retrying is the acceptable cost.
  }
}

export function demoApiUnreachable(): boolean {
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

async function get<T>(
  path: string,
  init?: RequestInit,
  {
    timeoutMs = READ_TIMEOUT_MS,
    recordFailure = false
  }: { timeoutMs?: number; recordFailure?: boolean } = {}
): Promise<T | null> {
  const base = demoApiBase();
  if (!base || demoApiUnreachable()) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${base}${path}`, {
      ...init,
      signal: controller.signal,
      headers: { Accept: 'application/json', ...(init?.headers ?? {}) }
    });
    // 429 included: a rate-limited visitor sees the static content, not an
    // error. A 429 is not "unreachable" though — the endpoint is up, this
    // visitor is simply over budget, so it is not remembered as a failure.
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    // Only the availability probe records a failure. A slow or aborted data
    // call means this request did not land, not that the endpoint is down —
    // and treating the two the same is what stranded visitors on sample data.
    if (recordFailure) markUnreachable();
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchDemoMeta(): Promise<DemoMeta | null> {
  const raw = await get<{
    read_only: boolean;
    project_id: string;
    allowed_questions: string[];
    disclosure: string;
  }>('/meta', undefined, { recordFailure: true });
  if (!raw?.project_id || !Array.isArray(raw.allowed_questions)) return null;

  return {
    readOnly: Boolean(raw.read_only),
    projectId: raw.project_id,
    allowedQuestions: raw.allowed_questions,
    disclosure: raw.disclosure ?? ''
  };
}

export async function fetchDemoAnswer(question: string): Promise<DemoAnswer | null> {
  const raw = await get<{
    question: string;
    answer: string;
    confidence: number;
    provisional: boolean;
    evidence?: {
      id: string;
      source_type: string;
      source_id: string;
      content: string;
      relevance: number;
    }[];
    claims?: { text: string; supported: boolean }[];
    reasoning?: {
      model_backed?: boolean;
      mode?: string;
      retrieval?: string;
      schedule_sample_size?: number;
    };
  }>(
    '/ask',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    },
    { timeoutMs: ASK_TIMEOUT_MS }
  );

  if (!raw?.answer) return null;

  return {
    question: raw.question,
    answer: raw.answer,
    confidence: raw.confidence,
    provisional: Boolean(raw.provisional),
    evidence: (raw.evidence ?? []).map((item) => ({
      id: item.id,
      sourceType: item.source_type,
      sourceId: item.source_id,
      content: item.content,
      relevance: item.relevance
    })),
    claims: raw.claims ?? [],
    reasoning: {
      // Reported as-is. A demo that claimed model-backed reasoning it did not
      // use would undercut the evidence policy it exists to demonstrate.
      modelBacked: Boolean(raw.reasoning?.model_backed),
      mode: raw.reasoning?.mode ?? 'unknown',
      retrieval: raw.reasoning?.retrieval ?? 'unknown',
      sampleSize: raw.reasoning?.schedule_sample_size ?? 0
    }
  };
}

export async function fetchDemoForecast(): Promise<DemoForecast | null> {
  const raw = await get<{
    delay_days?: { p10: number; p50: number; p90: number };
    calibrated?: boolean;
    sample_size?: number;
    note?: string;
    warning?: string;
  }>('/forecast');

  const delay = raw?.delay_days;
  if (!delay || typeof delay.p50 !== 'number') return null;

  return {
    p10: delay.p10,
    p50: delay.p50,
    p90: delay.p90,
    calibrated: Boolean(raw?.calibrated),
    sampleSize: typeof raw?.sample_size === 'number' ? raw.sample_size : null,
    note: raw?.note ?? raw?.warning ?? null
  };
}
