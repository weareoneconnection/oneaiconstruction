export type EvidenceWeight = 'primary' | 'supporting';

export type EvidenceRecord = {
  id: string;
  /** Key into `demos.ask.evidenceTypes`, so the label is translated. */
  type: string;
  date: string;
  source: string;
  excerpt: string;
  weight: EvidenceWeight;
};

/**
 * Mirrors the shape the product's `/projects/{id}/ask` endpoint actually
 * returns, including the provenance block. The site shows the same fields the
 * product shows, so the demo cannot imply more certainty than the real thing.
 */
export type Reasoning = {
  modelBacked: boolean;
  mode: string;
  retrieval: string;
  sampleSize: number;
};

export type Answer = {
  question: string;
  summary: string;
  claims: { text: string; evidenceIds: string[] }[];
  confidence: number;
  confidenceBasis: string;
  recommendation: string;
  unsupported?: string;
  /** True when no project record matched; confidence is capped at 0.4. */
  provisional?: boolean;
  reasoning: Reasoning;
};

export type AskTwinContent = {
  evidenceIndex: Record<string, EvidenceRecord>;
  answers: Answer[];
};
