'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { getAskTwinContent } from '../lib/ask-twin';
import type { Answer } from '../lib/ask-twin';
import type { Dictionary } from '../lib/i18n/dictionaries';
import type { Locale } from '../lib/i18n/config';
import { format } from '../lib/i18n/format';
import {
  demoApiBase,
  demoApiUnreachable,
  fetchDemoAnswer,
  fetchDemoMeta,
  type DemoAnswer
} from '../lib/twin-demo-api';

type LiveState = { status: 'off' | 'checking' | 'live'; questions: string[] };

export function AskTwinDemo({ locale, t }: { locale: Locale; t: Dictionary }) {
  const { answers, evidenceIndex } = getAskTwinContent(locale);
  const ta = t.demos.ask;
  const tl = t.demos.live;

  const [index, setIndex] = useState(0);
  const [openEvidence, setOpenEvidence] = useState<string | null>(null);
  const [live, setLive] = useState<LiveState>({ status: 'off', questions: [] });
  const [liveAnswers, setLiveAnswers] = useState<Record<string, DemoAnswer>>({});
  const [pending, setPending] = useState(false);

  const answer = answers[index];

  /**
   * The English question text is the API's allowlist key. The Chinese site
   * shows translated questions but must ask in the language the endpoint was
   * configured with, so the English set is the lookup.
   */
  const askKeys = useMemo(() => getAskTwinContent('en').answers.map((a) => a.question), []);
  const askKey = askKeys[index];

  // Probe once after hydration. Static content is already on screen.
  useEffect(() => {
    if (!demoApiBase() || demoApiUnreachable()) return;
    let cancelled = false;

    setLive((value) => ({ ...value, status: 'checking' }));
    fetchDemoMeta().then((meta) => {
      if (cancelled) return;
      setLive(
        meta
          ? { status: 'live', questions: meta.allowedQuestions }
          : { status: 'off', questions: [] }
      );
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch the selected question's live answer, once per question.
  const requested = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (live.status !== 'live') return;
    if (!live.questions.includes(askKey)) return;
    if (liveAnswers[askKey] || requested.current.has(askKey)) return;

    requested.current.add(askKey);
    setPending(true);
    fetchDemoAnswer(askKey, locale)
      .then((result) => {
        if (result) setLiveAnswers((value) => ({ ...value, [askKey]: result }));
      })
      .finally(() => setPending(false));
  }, [live, askKey, liveAnswers, locale]);

  const liveAnswer = liveAnswers[askKey];
  const isLive = Boolean(liveAnswer);

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
          <span className="answer-source">
            {ta.label}
            <i
              className={isLive ? 'source-badge is-live' : 'source-badge'}
              title={isLive ? tl.badgeTitle : tl.staticTitle}
            >
              {isLive ? tl.badge : tl.staticBadge}
            </i>
          </span>
          <span className="answer-head-right">
            {(liveAnswer?.provisional ?? answer.provisional) && (
              <i className="provisional-badge">{ta.provisionalBadge}</i>
            )}
            <strong className={(liveAnswer?.provisional ?? answer.provisional) ? 'is-capped' : ''}>
              {liveAnswer ? Math.round(liveAnswer.confidence * 100) : answer.confidence}%{' '}
              {ta.confidence}
            </strong>
          </span>
        </div>

        {pending && !liveAnswer ? (
          <p className="answer-summary is-loading">{tl.loading}</p>
        ) : (
          <LiveOrStatic
            answer={answer}
            liveAnswer={liveAnswer}
            ta={ta}
            evidenceIndex={evidenceIndex}
            openEvidence={openEvidence}
            setOpenEvidence={setOpenEvidence}
          />
        )}

        <p className="confidence-basis">
          <strong>{ta.whyConfidence}</strong>{' '}
          {liveAnswer
            ? format(ta.liveBasis, { count: liveAnswer.evidence.length })
            : answer.confidenceBasis}
        </p>

        <div className="recommendation">
          <span>{ta.recommendedAction}</span>
          <strong>{answer.recommendation} →</strong>
        </div>

        {/* The product returns this block on every answer; the demo shows the
            same fields, live values included, so it cannot imply more
            certainty than the real thing. */}
        <dl className="provenance">
          <div>
            <dt>{ta.provenance}</dt>
            <dd>
              {(liveAnswer?.reasoning.modelBacked ?? answer.reasoning.modelBacked)
                ? ta.modelBacked
                : ta.localReasoner}
            </dd>
          </div>
          <div>
            <dt>{ta.retrievalLabel}</dt>
            <dd>{(liveAnswer?.reasoning.retrieval ?? answer.reasoning.retrieval).toUpperCase()}</dd>
          </div>
          <div>
            <dt>{ta.sampleLabel}</dt>
            <dd>
              {(() => {
                const size = liveAnswer?.reasoning.sampleSize ?? answer.reasoning.sampleSize;
                return size > 0 ? `${size} ${ta.activities}` : ta.noEvidence;
              })()}
            </dd>
          </div>
        </dl>
        <p className="provenance-note">{ta.provenanceNote}</p>
      </div>
    </div>
  );
}

function LiveOrStatic({
  answer,
  liveAnswer,
  ta,
  evidenceIndex,
  openEvidence,
  setOpenEvidence
}: {
  answer: Answer;
  liveAnswer?: DemoAnswer;
  ta: Dictionary['demos']['ask'];
  evidenceIndex: ReturnType<typeof getAskTwinContent>['evidenceIndex'];
  openEvidence: string | null;
  setOpenEvidence: (value: string | null) => void;
}) {
  if (liveAnswer) {
    return (
      <>
        <p className={`answer-summary${liveAnswer.provisional ? ' is-provisional' : ''}`}>
          {liveAnswer.answer}
        </p>

        {liveAnswer.evidence.length > 0 && (
          <div className="claim-evidence live-evidence">
            <span className="evidence-label">{ta.evidenceLabel}</span>
            {liveAnswer.evidence.map((item) => {
              const isOpen = openEvidence === item.id;
              return (
                <div key={item.id} className="live-evidence-item">
                  <button
                    type="button"
                    className={`evidence-chip${isOpen ? ' is-open' : ''}`}
                    aria-expanded={isOpen}
                    onClick={() => setOpenEvidence(isOpen ? null : item.id)}
                  >
                    <i className="dot" aria-hidden="true" />
                    {item.sourceId}
                  </button>
                  {isOpen && (
                    <div className="evidence-card">
                      <div className="evidence-card-head">
                        <strong>{item.sourceId}</strong>
                        <span>{item.sourceType}</span>
                      </div>
                      <p className="evidence-excerpt">{item.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }

  return (
    <>
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
    </>
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
