'use client';

import { useState } from 'react';
import { getAskTwinContent } from '../lib/ask-twin';
import type { Dictionary } from '../lib/i18n/dictionaries';
import type { Locale } from '../lib/i18n/config';

export function AskTwinDemo({ locale, t }: { locale: Locale; t: Dictionary }) {
  const { answers, evidenceIndex } = getAskTwinContent(locale);
  const ta = t.demos.ask;

  const [index, setIndex] = useState(0);
  const [openEvidence, setOpenEvidence] = useState<string | null>(null);
  const answer = answers[index];

  function selectQuestion(next: number) {
    setIndex(next);
    setOpenEvidence(null);
  }

  return (
    <div className="ask-demo">
      <div className="ask-selector" role="tablist" aria-label={ta.questionsLabel}>
        {answers.map((item, itemIndex) => (
          <button
            key={item.question}
            role="tab"
            type="button"
            aria-selected={itemIndex === index}
            className={itemIndex === index ? 'active' : ''}
            onClick={() => selectQuestion(itemIndex)}
          >
            {item.question}
          </button>
        ))}

        <p className="ask-note">{ta.note}</p>
      </div>

      <div className="answer-panel">
        <div className="answer-head">
          <span>{ta.label}</span>
          <span className="answer-head-right">
            {answer.provisional && <i className="provisional-badge">{ta.provisionalBadge}</i>}
            <strong className={answer.provisional ? 'is-capped' : ''}>
              {answer.confidence}% {ta.confidence}
            </strong>
          </span>
        </div>

        <p className={`answer-summary${answer.provisional ? ' is-provisional' : ''}`}>
          {answer.summary}
        </p>

        <ol className="claim-list">
          {answer.claims.map((claim) => (
            <li key={claim.text}>
              <p>{claim.text}</p>
              <div className="claim-evidence">
                {claim.evidenceIds.map((id) => {
                  const record = evidenceIndex[id];
                  const isOpen = openEvidence === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      className={`evidence-chip${isOpen ? ' is-open' : ''}`}
                      aria-expanded={isOpen}
                      onClick={() => setOpenEvidence(isOpen ? null : id)}
                    >
                      {record.weight === 'primary' && <i className="dot" aria-hidden="true" />}
                      {id}
                    </button>
                  );
                })}
              </div>

              {claim.evidenceIds.includes(openEvidence ?? '') && openEvidence && (
                <EvidenceCard
                  record={evidenceIndex[openEvidence]}
                  typeLabel={
                    ta.evidenceTypes[
                      evidenceIndex[openEvidence].type as keyof typeof ta.evidenceTypes
                    ] ?? evidenceIndex[openEvidence].type
                  }
                  weightLabel={
                    evidenceIndex[openEvidence].weight === 'primary'
                      ? ta.weightPrimary
                      : ta.weightSupporting
                  }
                />
              )}
            </li>
          ))}
        </ol>

        {answer.unsupported && (
          <p className="unsupported">
            <strong>{ta.notSupported}</strong> {answer.unsupported}
          </p>
        )}

        <p className="confidence-basis">
          <strong>{ta.whyConfidence}</strong> {answer.confidenceBasis}
        </p>

        <div className="recommendation">
          <span>{ta.recommendedAction}</span>
          <strong>{answer.recommendation} →</strong>
        </div>

        {/* The product returns this block on every answer; the demo shows the
            same fields so it cannot imply more certainty than the real thing. */}
        <dl className="provenance">
          <div>
            <dt>{ta.provenance}</dt>
            <dd>{answer.reasoning.modelBacked ? ta.modelBacked : ta.localReasoner}</dd>
          </div>
          <div>
            <dt>{ta.retrievalLabel}</dt>
            <dd>{answer.reasoning.retrieval.toUpperCase()}</dd>
          </div>
          <div>
            <dt>{ta.sampleLabel}</dt>
            <dd>
              {answer.reasoning.sampleSize > 0
                ? `${answer.reasoning.sampleSize} ${ta.activities}`
                : ta.noEvidence}
            </dd>
          </div>
        </dl>
        <p className="provenance-note">{ta.provenanceNote}</p>
      </div>
    </div>
  );
}

function EvidenceCard({
  record,
  typeLabel,
  weightLabel
}: {
  record: { id: string; date: string; source: string; excerpt: string; weight: string };
  typeLabel: string;
  weightLabel: string;
}) {
  return (
    <div className="evidence-card">
      <div className="evidence-card-head">
        <strong>{record.id}</strong>
        <span>{typeLabel}</span>
        <span className={`weight weight-${record.weight}`}>{weightLabel}</span>
      </div>
      <p className="evidence-excerpt">{record.excerpt}</p>
      <div className="evidence-card-foot">
        <span>{record.source}</span>
        <time dateTime={record.date}>{record.date}</time>
      </div>
    </div>
  );
}
