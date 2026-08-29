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
          <strong>
            {answer.confidence}% {ta.confidence}
          </strong>
        </div>

        <p className="answer-summary">{answer.summary}</p>

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
