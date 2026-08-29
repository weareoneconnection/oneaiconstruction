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

export type Answer = {
  question: string;
  summary: string;
  claims: { text: string; evidenceIds: string[] }[];
  confidence: number;
  confidenceBasis: string;
  recommendation: string;
  unsupported?: string;
};

export type AskTwinContent = {
  evidenceIndex: Record<string, EvidenceRecord>;
  answers: Answer[];
};
