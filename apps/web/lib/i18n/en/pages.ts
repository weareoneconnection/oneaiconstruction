export const pages = {
  products: {
    meta: {
      title: 'Products',
      description:
        'Construction OS organises project work, knowledge and agents. Construction Twin connects physical state, time, evidence and prediction. Use either alone or both as one intelligence layer.'
    },
    eyebrow: 'PRODUCTS',
    h1: 'Two products. One project intelligence layer.',
    lede: 'Construction OS organises work and knowledge. Construction Twin connects physical state, time, evidence and prediction. They share the same Project World Model, so adopting one does not strand you from the other.',
    chooseTitle: 'Choose the layer that matches your project need.',
    compare: {
      eyebrow: 'HOW THEY DIFFER',
      title: 'Start where the pain is.',
      copy: 'Most teams begin with one and add the other once the first has proved its value.',
      caption: 'Comparison of Construction OS and Construction Twin',
      question: 'Question you are trying to answer',
      os: 'Construction OS',
      twin: 'Construction Twin',
      primary: 'Primary',
      linked: 'Linked',
      partial: 'Partial',
      none: '—',
      rows: [
        'Where is the record that justifies this?',
        'What is the physical state of the project right now?',
        'Why is this activity late, and what caused it?',
        'When will we actually finish, and how confident are we?',
        'Who approved this, on what evidence?',
        'Can we automate this recurring coordination work?'
      ]
    }
  },

  os: {
    meta: {
      title: 'Construction OS',
      description:
        'The operating system for construction delivery: commercial control, schedule, documents, QA/QC, HSE, field and smart site — with governed AI agents and a verifiable audit trail across all of it.'
    },
    eyebrow: 'CONSTRUCTION OS',
    h1: 'One system for how the project actually runs.',
    lede: 'Contracts, budget, procurement, schedule, documents, quality, safety and field work in one governed platform — connected to the systems you already use, not replacing them.',
    openProduct: 'Open Construction OS',
    capabilitiesEyebrow: 'MODULES',
    capabilitiesTitle: 'What is in the platform.',
    capabilities: [
      {
        title: 'Commercial control',
        text: 'Contracts, payments, claims, change orders, procurement packages and budget lines, with cost forecast snapshots that feed the same intelligence layer as the schedule.'
      },
      {
        title: 'Schedule & controls',
        text: 'Native Primavera P6 XER and MS Project XML import, activity tracking, and slippage surfaced against the approved baseline.'
      },
      {
        title: 'Document intelligence',
        text: 'Document intake with OCR, line-level BOQ comparison between two parsed documents, evidence extraction, revision tracking and full document lineage.'
      },
      {
        title: 'Quality, safety & risk',
        text: 'QA/QC issues, safety observations, field inspections, corrective actions with follow-up, and a risk centre that ties them back to schedule and cost.'
      },
      {
        title: 'Field & smart site',
        text: 'Mobile field capture that works offline with electronic signatures, plus site cameras, AI-detected video events and environmental readings against thresholds.'
      },
      {
        title: 'Governed AI & approvals',
        text: 'Multi-stage approval policies, an action centre, execution logs, and AI recommendations that always arrive as pending approval for a named human.'
      }
    ],
    smartSiteEyebrow: 'SMART SITE',
    smartSiteTitle: 'The site itself becomes a source of evidence.',
    smartSiteCopy:
      'Cameras and sensors are not a separate dashboard. A detected event carries its confidence, an AI summary and a suggested action, and is routed into the module that owns it — so a safety observation becomes a corrective action with the footage attached.',
    smartSiteItems: [
      {
        title: 'Site cameras',
        text: 'Zone-mapped cameras with stream and snapshot capture, health status and last-seen tracking.'
      },
      {
        title: 'AI video events',
        text: 'Detected events carry type, severity, confidence, an AI summary and a suggested action, routed to the owning module.'
      },
      {
        title: 'Environmental readings',
        text: 'Metrics captured against thresholds per zone, with status derived from the threshold rather than eyeballed.'
      },
      {
        title: 'Offline field capture',
        text: 'Daily reports, inspections and attachments recorded offline with electronic signatures, then synced when the device reconnects.'
      }
    ],
    worksWith: {
      eyebrow: 'WORKS WITH',
      title: 'An intelligence layer, not another silo.',
      copy: 'Construction OS reads from the systems already in place and writes results back through governed workflows.',
      inputs: ['Procore', 'Autodesk ACC', 'Primavera P6', 'SharePoint · ERP'],
      brand: 'CONSTRUCTION OS',
      output: 'Governed action'
    },
    integrationsLink: 'See the full connector catalog →'
  },

  twin: {
    meta: {
      title: 'Construction Twin',
      description:
        'A living AI representation of your project. Connect IFC geometry, 4D schedule, field evidence and probabilistic forecasting to understand the project in space, time and context.'
    },
    eyebrow: 'CONSTRUCTION TWIN',
    h1: 'A living AI representation of the project.',
    lede: 'Connect geometry, schedule, evidence and intelligence to understand the project in space, time and context — and to see where it is heading.',
    openProduct: 'Open Construction Twin',
    timeline: {
      eyebrow: '4D PROJECT INTELLIGENCE',
      title: 'See. Understand. Predict.',
      copy: 'Compare baseline, actual progress and a forecast range built from reconciled actuals rather than reported ones.'
    },
    ask: {
      eyebrow: 'ASK TWIN',
      title: 'Evidence-backed project reasoning.',
      copy: 'Every answer is constructed from records you can open. Where evidence is missing, the Twin says so instead of producing a plausible sentence.'
    },
    capabilitiesEyebrow: 'CAPABILITIES',
    capabilitiesTitle: 'What the Twin holds.',
    capabilities: [
      {
        title: 'IFC / BIM ingestion',
        text: 'IFC semantic ingestion with IfcOpenShell, and a transparent fallback parser that labels its own reduced fidelity rather than hiding it.'
      },
      {
        title: '3D Tiles & LOD streaming',
        text: 'IFC converted to GLB and 3D Tiles 1.1, with LOD0/1/2 and Cesium spatial streaming for models too large to load whole.'
      },
      {
        title: 'Distributed asset pipeline',
        text: 'Conversion runs as partitioned jobs with worker leases, cancel and resume, and a content-addressed cache that skips work already done.'
      },
      {
        title: '4D schedule link',
        text: 'Activities bound to entities, with baseline, actual and forecast state per element, and an S-curve derived from the schedule itself.'
      },
      {
        title: 'Portfolio & comparison',
        text: 'A portfolio view across projects and a side-by-side comparison workspace, not just a single-project dashboard.'
      },
      {
        title: 'Verifiable audit trail',
        text: 'Observations, recommendations, approvals and executions written to a hash-chained log, with an endpoint that re-walks the chain and reports the first break.'
      },
      {
        title: 'Realtime & offline',
        text: 'Live project events over WebSocket with Redis fan-out across replicas, and a cached shell that keeps working offline, queueing comments until reconnect.'
      },
      {
        title: 'Evidence-backed reasoning',
        text: 'BM25 retrieval over project records, derived claims, verified citations, and an enforced downgrade when nothing matches.'
      },
      {
        title: 'Probabilistic forecast',
        text: 'P10/P50/P90 computed from measured activity slippage, each result reporting its model, sample size and calibration state.'
      }
    ]
  },

  solutions: {
    meta: {
      title: 'Solutions',
      description:
        'Project intelligence, schedule intelligence, risk intelligence and construction agents. Start with one high-value decision, then expand the intelligence layer as evidence and adoption grow.'
    },
    eyebrow: 'SOLUTIONS',
    h1: 'Intelligence around the project decisions that matter.',
    lede: 'Start with a high-value problem, then expand the intelligence layer as evidence and adoption grow. Every deployment we have seen succeed began narrow.',
    sectionEyebrow: 'CORE AREAS',
    sectionTitle: 'Six places the intelligence layer pays for itself.',
    items: [
      {
        title: 'Project Intelligence',
        text: 'Unify project context across data, evidence and operational decisions so a question about the project has one answer rather than four.'
      },
      {
        title: 'Schedule Intelligence',
        text: 'Explain slippage, identify the drivers behind it and expose downstream impact before it reaches a progress report.'
      },
      {
        title: 'AI Digital Twin',
        text: 'Connect project entities with 4D state, field evidence and intelligence into a model you can interrogate.'
      },
      {
        title: 'Risk Intelligence',
        text: 'Quantify and explain schedule, resource and delivery exposure, with every driver traced to its source record.'
      },
      {
        title: 'Construction Agents',
        text: 'Coordinate repeatable work under policy, approval and audit — capability constrained by design, not by configuration.'
      },
      {
        title: 'Executive Briefing',
        text: 'Convert fragmented project updates into concise management insight that survives being questioned.'
      }
    ]
  },

  platform: {
    meta: {
      title: 'Platform',
      description:
        'The intelligence layer between project data and action. Model-agnostic, integration-oriented and designed around explainability, governance and enterprise control.'
    },
    eyebrow: 'PLATFORM',
    h1: 'The intelligence layer between project data and action.',
    lede: 'Model-agnostic, integration-oriented and designed around explainability, governance and enterprise control.',
    architecture: {
      eyebrow: 'ARCHITECTURE',
      title: 'Five layers, one project object.',
      copy: 'The Project World Model is the durable asset. Everything above it is replaceable, and everything below it is something you already own.'
    },
    foundationsEyebrow: 'FOUNDATIONS',
    foundationsTitle: 'Enterprise foundations.',
    foundations: [
      {
        title: 'Project World Model',
        text: 'A common semantic layer for entities, activities, evidence, risks and actions.'
      },
      {
        title: 'OneAI Forge',
        text: 'AI model lifecycle, evaluation, deployment and governance infrastructure.'
      },
      {
        title: 'Agent Runtime',
        text: 'Tool-using agents with policy boundaries and mandatory human approval gates.'
      },
      {
        title: 'Evidence Layer',
        text: 'Trace every conclusion back to source records, with revision and authority awareness.'
      },
      {
        title: 'Open Integration',
        text: 'Connect BIM, schedules, documents, APIs and external enterprise platforms.'
      },
      {
        title: 'Observability',
        text: 'Track system health, AI behaviour, audit events and operational quality.'
      }
    ],
    deeper: {
      eyebrow: 'GO DEEPER',
      title: 'Why the world model comes first.',
      copy: 'The architecture above only makes sense if you accept a specific claim about where construction AI actually fails.',
      worldModel: 'Read: The Project World Model →',
      evidence: 'Read: Evidence-First Retrieval →'
    }
  },

  industries: {
    meta: {
      title: 'Industries',
      description:
        'Built for capital projects with complex interfaces: rail and transit, complex buildings, industrial facilities and major infrastructure programmes.'
    },
    eyebrow: 'INDUSTRIES',
    h1: 'Built for capital projects with complex interfaces.',
    lede: 'We prioritise environments where schedule uncertainty, evidence fragmentation and coordination cost are highest — because that is where an intelligence layer changes the outcome rather than the reporting.',
    sectionEyebrow: 'FOCUS SECTORS',
    sectionTitle: 'Where we start.',
    items: [
      {
        title: 'Rail & Transit',
        text: 'Stations, depots and multi-package rail programmes with contested interface responsibility.'
      },
      {
        title: 'Buildings',
        text: 'Complex public, commercial and high-rise construction with dense trade sequencing.'
      },
      {
        title: 'Industrial',
        text: 'Factories, data centres and mission-critical facilities where handover dates carry revenue.'
      },
      {
        title: 'Infrastructure',
        text: 'Airports, bridges, highways and major public works under public scrutiny.'
      }
    ]
  },

  enterprise: {
    meta: {
      title: 'Enterprise',
      description:
        'AI with governance built in: RBAC and identity, human-in-the-loop approval, full auditability, private deployment and model flexibility for capital project organisations.'
    },
    eyebrow: 'ENTERPRISE',
    h1: 'AI with governance built in.',
    lede: 'Designed for controlled pilots, enterprise integration and human-accountable decisions — on projects where every significant decision may eventually be examined.',
    securityLink: 'Security & Trust',
    controlsEyebrow: 'CONTROLS',
    controlsTitle: 'Enterprise controls.',
    controls: [
      {
        title: 'RBAC & Identity',
        text: 'SSO via SAML and OIDC, SCIM provisioning, and permissions scoped to project, package and record type.'
      },
      {
        title: 'Human-in-the-loop',
        text: 'Explicit approval before any consequential AI-recommended action, recorded with its evidence set.'
      },
      {
        title: 'Auditability',
        text: 'Immutable evidence, reasoning, approval and outcome trails — exportable for claims proceedings.'
      },
      {
        title: 'Private Deployment',
        text: 'Cloud, private cloud and customer-VPC deployment, with region selection for data residency.'
      },
      {
        title: 'Model Flexibility',
        text: 'No lock-in to a single foundation model or provider; self-hosted options for restricted data.'
      },
      {
        title: 'Integration-first',
        text: 'Connect existing BIM, schedule and project-control systems rather than replacing them.'
      }
    ],
    procurement: {
      eyebrow: 'PROCUREMENT',
      title: 'What your security review will ask for.',
      copy: 'We would rather hand this over at the first meeting than at the fourth.',
      items: [
        {
          label: 'DOCUMENTATION',
          title: 'Security pack',
          text: 'Architecture overview, DPA, sub-processor list and penetration test summary, under NDA.'
        },
        {
          label: 'COMMITMENTS',
          title: 'Written, not implied',
          text: 'No training on customer data, region selection and notification windows are contractual terms.'
        },
        {
          label: 'ASSURANCE',
          title: 'Current status, stated plainly',
          text: 'We tell you what is implemented, what is in programme and what is roadmap.'
        }
      ],
      seeSecurity: 'See Security & Trust'
    }
  }
} as const;
