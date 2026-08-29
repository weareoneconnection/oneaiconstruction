import type { AskTwinContent } from './types';

export const en: AskTwinContent = {
  evidenceIndex: {
    'DR-241': {
      id: 'DR-241',
      type: 'Daily Report',
      date: '2026-08-15',
      source: 'Site Supervisor · Roof package',
      excerpt:
        'Tower crane unavailable 07:00–15:20 due to unscheduled maintenance. Roof Zone B steel erection stood down; crew reassigned to Zone C preparation.',
      weight: 'primary'
    },
    'DLV-CP23': {
      id: 'DLV-CP23',
      type: 'Delivery Record',
      date: '2026-08-16',
      source: 'Procurement · Steel subcontractor',
      excerpt:
        'Connection plate consignment CP-23 delivered partial (62 of 104 units). Balance rescheduled to 2026-08-24. Supplier cites mill rolling delay.',
      weight: 'primary'
    },
    'ROOF-B-023': {
      id: 'ROOF-B-023',
      type: 'Schedule Activity',
      date: '2026-08-28',
      source: 'Baseline v12 · Progress update W34',
      excerpt:
        'Planned duration 18d, elapsed 22d, 67% complete. Total float consumed. Activity is now critical; two successors affected.',
      weight: 'primary'
    },
    'NCR-0091': {
      id: 'NCR-0091',
      type: 'Non-Conformance',
      date: '2026-08-19',
      source: 'QA/QC Inspector',
      excerpt:
        'Bolt torque values on 6 connections below specification. Rework instructed; re-inspection scheduled. Estimated 1.5d impact to Zone B.',
      weight: 'supporting'
    },
    'BASE-V12': {
      id: 'BASE-V12',
      type: 'Baseline',
      date: '2026-03-02',
      source: 'Approved programme revision 12',
      excerpt:
        'Contractual baseline against which all variance in this answer is measured. Roof package completion planned 2026-10-14.',
      weight: 'supporting'
    },
    'PROG-W34': {
      id: 'PROG-W34',
      type: 'Progress Update',
      date: '2026-08-24',
      source: 'Planner · Week 34 update',
      excerpt:
        'Roof package 71% complete against 79% planned. Enclosure activities show early signs of the same crane-dependency constraint.',
      weight: 'primary'
    },
    'RISK-0828': {
      id: 'RISK-0828',
      type: 'Risk Model Run',
      date: '2026-08-28',
      source: 'Monte Carlo · 10,000 iterations',
      excerpt:
        'P50 completion 2026-10-29 (+15d vs baseline). P90 2026-11-12 (+29d). Largest single driver: connection plate lead time (contributing 41% of variance).',
      weight: 'primary'
    },
    'SCEN-S04': {
      id: 'SCEN-S04',
      type: 'Recovery Scenario',
      date: '2026-08-28',
      source: 'Scenario simulation S-04',
      excerpt:
        'Resequence Zone C ahead of Zone B completion and secure dedicated crane capacity for 6 shifts. Modelled recovery 9.2d of the 14.7d exposure. Estimated cost £48k.',
      weight: 'primary'
    },
    'RP-17': {
      id: 'RP-17',
      type: 'Resource Plan',
      date: '2026-08-26',
      source: 'Resource plan revision 17',
      excerpt:
        'Second mobile crane available from 2026-09-02 at 6-shift minimum hire. No conflicting demand recorded in the same window.',
      weight: 'supporting'
    }
  },

  answers: [
    {
      question: 'Why is Roof Zone B delayed?',
      summary:
        'Roof Zone B is 4 days behind baseline and has consumed its float. Two causes account for most of the variance, and a third is adding to it.',
      claims: [
        {
          text: 'Crane unavailability on 15 August cost a full shift of steel erection.',
          evidenceIds: ['DR-241']
        },
        {
          text: 'A partial connection-plate delivery on 16 August left the crew short of 42 units, with the balance not due until 24 August.',
          evidenceIds: ['DLV-CP23']
        },
        {
          text: 'Rework on six under-torqued connections is adding an estimated 1.5 days.',
          evidenceIds: ['NCR-0091']
        },
        {
          text: 'The activity is now critical, with two successors exposed.',
          evidenceIds: ['ROOF-B-023', 'BASE-V12']
        }
      ],
      confidence: 89,
      confidenceBasis:
        'Four independent records, three of them primary sources, all within the variance window. No contradicting evidence found.',
      recommendation: 'Review mitigation scenario S-04 with the Project Director'
    },
    {
      question: 'What is the current schedule risk?',
      summary:
        'Schedule exposure is concentrated in roof steel and enclosure. If current variance persists, the most likely delay is 15 days, with a P90 case of 29 days.',
      claims: [
        {
          text: 'P50 completion moves to 29 October, 15 days beyond the approved baseline.',
          evidenceIds: ['RISK-0828', 'BASE-V12']
        },
        {
          text: 'Connection-plate lead time is the single largest driver, contributing 41% of forecast variance.',
          evidenceIds: ['RISK-0828', 'DLV-CP23']
        },
        {
          text: 'Enclosure activities show early signs of the same crane-dependency constraint.',
          evidenceIds: ['PROG-W34']
        }
      ],
      confidence: 84,
      confidenceBasis:
        'Model run is current (28 August) and its drivers trace to primary records. Confidence is capped below 90 because enclosure exposure rests on a single progress update.',
      recommendation: 'Escalate connection-plate lead time to the procurement review',
      unsupported:
        'No evidence was found linking the M&E package to this exposure. Any claim of downstream M&E impact is currently unsupported.'
    },
    {
      question: 'What should the team do next?',
      summary:
        'One modelled scenario recovers roughly two thirds of the exposure at a known cost. It requires a decision this week to remain viable.',
      claims: [
        {
          text: 'Resequencing Zone C and securing 6 dedicated crane shifts recovers 9.2 of the 14.7 days of exposure, at an estimated £48k.',
          evidenceIds: ['SCEN-S04']
        },
        {
          text: 'A second mobile crane is available from 2 September with no competing demand recorded.',
          evidenceIds: ['RP-17']
        }
      ],
      confidence: 81,
      confidenceBasis:
        'Scenario is modelled against current project state, but crane availability is a single-source claim and the window closes on 2 September.',
      recommendation: 'Human approval required before publishing the mitigation plan'
    }
  ]
};
