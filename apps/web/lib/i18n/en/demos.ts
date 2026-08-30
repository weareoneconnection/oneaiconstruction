export const demos = {
  twin: {
    topbar: 'STATION 02 / PROJECT TWIN',
    live: 'LIVE',
    sceneLabel:
      'Interactive 3D model of Station 02. Drag to rotate, or use the zone buttons below.',
    rotateLeft: 'Rotate model left',
    rotateRight: 'Rotate model right',
    pause: 'Pause',
    rotate: 'Rotate',
    hint: 'Drag to orbit',
    selectedEntity: 'SELECTED ENTITY',
    selectZone: 'Select a zone',
    status: 'Status',
    progress: 'Progress',
    variance: 'Variance',
    risk: 'Risk',
    evidence: 'Evidence',
    askTwin: 'Ask Twin →',
    statusLabels: {
      complete: 'Complete',
      active: 'In progress',
      delayed: 'Delayed',
      planned: 'Planned'
    },
    riskLabels: { low: 'Low', medium: 'Medium', high: 'High' },
    zones: {
      A: { name: 'Roof Zone A', activity: 'ROOF-A-018 · Steel erection' },
      B: { name: 'Roof Zone B', activity: 'ROOF-B-023 · Connection plate install' },
      C: { name: 'Concourse Zone C', activity: 'CONC-C-041 · Slab pour sequence' },
      D: { name: 'Platform Zone D', activity: 'PLAT-D-007 · Track slab prep' }
    }
  },

  ask: {
    label: 'ASK TWIN',
    confidence: 'confidence',
    questionsLabel: 'Example questions',
    note: 'Every claim below is built from records, not retrieved text. Open one to see the source.',
    notSupported: 'Not supported by evidence:',
    whyConfidence: 'Why this confidence:',
    recommendedAction: 'Recommended action',
    weightPrimary: 'primary',
    weightSupporting: 'supporting',
    provisionalBadge: 'PROVISIONAL',
    provenance: 'Provenance',
    modelBacked: 'Model-backed',
    localReasoner: 'Local reasoner',
    retrievalLabel: 'Retrieval',
    sampleLabel: 'Schedule sample',
    activities: 'activities',
    noEvidence: 'No matching record',
    provenanceNote:
      'The product reports these fields on every answer. This demo shows the same ones.',
    evidenceLabel: 'Evidence',
    liveBasis: 'Answered live against the demo project, from {count} retrieved records.',
    evidenceTypes: {
      'Daily Report': 'Daily Report',
      'Delivery Record': 'Delivery Record',
      'Schedule Activity': 'Schedule Activity',
      'Non-Conformance': 'Non-Conformance',
      Baseline: 'Baseline',
      'Progress Update': 'Progress Update',
      'Risk Model Run': 'Risk Model Run',
      'Recovery Scenario': 'Recovery Scenario',
      'Resource Plan': 'Resource Plan'
    }
  },

  live: {
    badge: 'LIVE',
    badgeTitle: 'Answered by the running product, not a scripted demo',
    staticBadge: 'SAMPLE',
    staticTitle: 'Representative data. The live demo endpoint is not reachable from here.',
    loading: 'Asking the project…',
    forecastTitle: 'Live from the demo project',
    forecastCaption:
      'Current P10/P50/P90 delay in days, computed by the running product on the seeded demo project.',
    calibrated: 'Calibrated',
    uncalibrated: 'Uncalibrated',
    sample: 'sample',
    illustrative:
      'Interactive illustration — drag the data date to see how a forecast cone responds.',
    p10: 'P10',
    p50: 'P50',
    p90: 'P90',
    days: 'd'
  },
  accuracy: {
    badge: 'LIVE',
    title: 'Scored so far',
    headers: {
      kind: 'Prediction',
      scored: 'Scored',
      hitRate: 'Within tolerance',
      mae: 'Mean absolute error'
    },
    kinds: {
      delay_days: 'Schedule delay',
      forecast_cost: 'Cost forecast',
      risk_level: 'Risk level'
    },
    pending: 'not yet due',
    none: '—',
    totalPredictions: 'predictions recorded',
    asOf: 'as of',
    thin: 'Too few scored predictions to read anything into yet. The figures move as predictions reach their horizon date, and this page shows whatever they say.'
  },
  commercial: {
    badge: 'LIVE',
    eyebrow: 'LIVE COST POSITION',
    title: 'The cost picture, from the running product.',
    copy: 'Aggregate figures from a demonstration organization, read live. No contracts, vendors or project names — the shape of the position, not somebody’s ledger.',
    metrics: {
      baselineAmount: 'Approved baseline',
      committedAmount: 'Committed',
      actualAmount: 'Actual to date',
      forecastAmount: 'Forecast at completion',
      varianceAmount: 'Variance vs baseline',
      pendingChangeAmount: 'Pending change orders',
      claimAmount: 'Open claims',
      exposureAmount: 'Total exposure'
    },
    flagsTitle: 'What the platform is flagging',
    severity: { high: 'High', medium: 'Medium', low: 'Low' },
    projects: 'projects',
    contracts: 'contracts'
  },
  timeline: {
    eyebrow: '4D PROJECT INTELLIGENCE',
    title: 'Baseline · Actual · Forecast range',
    dataDate: 'Data date · Day',
    sliderLabel: 'Data date, in days from project start',
    legend: {
      baseline: 'Baseline',
      actual: 'Actual',
      p50: 'P50 forecast',
      cone: 'P10–P90 range'
    },
    stats: {
      planned: 'Planned progress',
      actual: 'Actual progress',
      p50Variance: 'P50 variance',
      p90Variance: 'P90 variance',
      p10Best: 'P10 (best case)',
      day: 'Day'
    },
    chartLabel:
      'Progress S-curve at data date day {dataDate}. Planned {planned} percent, actual {actual} percent. Forecast completion P50 day {p50}, P90 day {p90}, against a baseline of day {baseline}.',
    beyondHorizon: 'beyond horizon'
  },

  architecture: {
    layers: [
      { name: 'Applications', items: 'Construction OS · Construction Twin' },
      { name: 'Intelligence', items: 'Agents · Retrieval · Risk · Forecast · Simulation' },
      { name: 'Project World Model', items: 'Entities · Activities · Evidence · Risks · Actions' },
      { name: 'AI Infrastructure', items: 'OneAI Forge · Model Routing · Evaluation · Governance' },
      { name: 'Project Data', items: 'IFC/BIM · P6 · Documents · Photos · APIs' }
    ]
  }
} as const;
