export const home = {
  pill: 'AI-NATIVE CONSTRUCTION INTELLIGENCE',
  h1Line1: 'Intelligence',
  h1Line2Prefix: 'for the ',
  h1Line2Accent: 'Built World.',
  lede: 'Connect BIM, schedules, documents, field evidence and AI into one living project intelligence system.',
  ctaPrimary: 'Book Enterprise Demo',
  ctaSecondary: 'Explore Construction Twin',
  principle: ['SEE', 'UNDERSTAND', 'PREDICT', 'ACT'],
  signals: [
    {
      title: 'Evidence-first',
      text: 'No matching record? The answer is capped at 0.4 confidence and says so.'
    },
    {
      title: 'Citations verified',
      text: 'We check our own AI’s references, and name the ones it could not support.'
    },
    {
      title: 'Accuracy published',
      text: 'Every prediction is scored against what actually happened, to a fixed tolerance.'
    }
  ],
  signalsLink: 'See how each of these is enforced →',

  dataFlow: {
    eyebrow: 'FROM DATA TO INTELLIGENCE',
    title: 'Turn fragmented project data into a living decision system.',
    copy: 'OneAI Construction connects project context across space, time, documents, evidence and decisions—then turns that context into usable intelligence.',
    inputs: ['BIM / IFC', 'Schedule', 'Documents', 'Field Evidence'],
    brand: 'ONEAI CONSTRUCTION',
    output: 'Understand · Predict · Act'
  },
  products: {
    eyebrow: 'TWO CORE PRODUCTS',
    title: 'An operating system and a living project twin.',
    copy: 'Use them independently—or together as one project intelligence layer.',
    os: {
      label: '01 / CONSTRUCTION OS',
      title: 'The Operating System for Construction Intelligence.',
      text: 'Connect people, workflows, project knowledge and AI agents across the project lifecycle.',
      features: [
        'Document Intelligence',
        'Project Knowledge',
        'RFI / NCR / Inspection',
        'Workflow Automation',
        'Construction Agents',
        'Governance & Audit'
      ],
      link: 'Explore Construction OS →'
    },
    twin: {
      label: '02 / CONSTRUCTION TWIN',
      title: 'A Living AI Representation of Your Project.',
      text: 'Connect BIM, schedule, evidence and AI to understand what is happening and what happens next.',
      features: [
        'IFC / BIM',
        '4D Schedule',
        'Twin Entities',
        'Evidence Graph',
        'Risk Intelligence',
        'Forecast & Simulation'
      ],
      link: 'Explore Construction Twin →'
    }
  },
  ask: {
    eyebrow: 'ASK TWIN',
    title: 'Ask your project. Get an answer you can trace.',
    copy: 'Not another chatbot. Every claim is built from records you can open—and where evidence is missing, the Twin says so.'
  },
  timeline: {
    eyebrow: '4D PROJECT INTELLIGENCE',
    title: 'See the project across time.',
    copy: 'Compare baseline, actual progress and a forecast range from the same project context. Move the data date to watch the uncertainty cone respond.'
  },
  metricsLink: 'See the full validation report →',
  prediction: {
    eyebrow: 'FROM REPORTING TO PREDICTION',
    title: 'Know the risk before it becomes the report.',
    copy: 'Move from static dashboards to probabilistic forecasts, explainable drivers and scenario-based recovery planning.',
    items: [
      {
        title: 'Risk Intelligence',
        text: 'Quantify probability, impact and exposure with evidence-linked risk drivers.'
      },
      {
        title: 'P10 / P50 / P90 Forecast',
        text: 'Understand the range of likely schedule outcomes instead of relying on a single date.'
      },
      {
        title: 'What-if Simulation',
        text: 'Compare recovery scenarios, resource changes and downstream schedule impact before acting.'
      }
    ]
  },
  agents: {
    eyebrow: 'CONSTRUCTION AGENTS',
    title: 'AI that can work—not just answer.',
    copy: 'Observe, reason and recommend within clear permissions. Humans remain in control, and every critical action is auditable.',
    steps: ['Observe', 'Reason', 'Recommend', 'Human Approval', 'Execute', 'Audit']
  },
  architecture: {
    eyebrow: 'PLATFORM ARCHITECTURE',
    title: 'Built as the intelligence layer—not another silo.',
    copy: 'Connect existing design, schedule and project-control systems while keeping AI infrastructure model-agnostic and enterprise-controlled.'
  },
  industries: {
    eyebrow: 'INDUSTRIES',
    title: 'Built for complex projects where coordination matters.',
    copy: 'Start with sectors where project data, schedule risk and multi-party execution create the highest value for intelligence.',
    items: [
      {
        title: 'Rail & Transit',
        text: 'Stations, depots, rail infrastructure and multi-contract interfaces.'
      },
      {
        title: 'Buildings',
        text: 'Complex public buildings, commercial, high-rise and mixed-use projects.'
      },
      {
        title: 'Industrial',
        text: 'Factories, data centers, manufacturing and mission-critical facilities.'
      },
      {
        title: 'Infrastructure',
        text: 'Airports, bridges, roads and large-scale capital programs.'
      }
    ]
  },
  pilot: {
    eyebrow: 'ENTERPRISE PILOT',
    title: 'Start with one project. Prove measurable value.',
    copy: 'Deploy on a controlled scope, connect existing project data and measure whether OneAI Construction improves visibility, risk detection and decision speed.',
    inputsLabel: 'INPUTS',
    inputs: 'IFC · Baseline Schedule · Daily Reports · RFI/NCR · Inspections · Photos',
    outputsLabel: 'OUTPUTS',
    outputs: 'Actual vs Planned · Delay Cause · Risk · Forecast · Evidence · Mitigation',
    cta: 'Start Enterprise Pilot'
  },
  finalCta: {
    eyebrow: 'ONEAI CONSTRUCTION',
    title: 'Build with intelligence.',
    copy: 'Bring your project context together. Understand what matters. Act before problems become outcomes.',
    primary: 'Book Enterprise Demo',
    secondary: 'Explore the Platform'
  }
} as const;
