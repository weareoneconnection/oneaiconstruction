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
