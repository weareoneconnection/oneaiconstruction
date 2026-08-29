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

const TIMEOUT_MS = 5000;

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

const UNREACHABLE_KEY = 'oneai-demo-api-unreachable';

/**
 * Once the endpoint has failed, stop probing it for the rest of the session.
 *
 * Without this, every page view retries a dead endpoint and logs another
 * browser-level network error to the console. A visitor who opens devtools on
 * a marketing site should not find it arguing with an API.
 */
function markUnreachable(): void {
  try {
    sessionStorage.setItem(UNREACHABLE_KEY, '1');
  } catch {
    // Private browsing, or storage disabled. Retrying is the acceptable cost.
  }
}

export function demoApiUnreachable(): boolean {
  try {
    return sessionStorage.getItem(UNREACHABLE_KEY) === '1';
  } catch {
    return false;
  }
}

async function get<T>(path: string, init?: RequestInit): Promise<T | null> {
  const base = demoApiBase();
  if (!base || demoApiUnreachable()) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

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
    markUnreachable();
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
  }>('/meta');
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
  }>('/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });

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
