export const pages3 = {
  pilot: {
    meta: {
      title: 'Enterprise Pilot',
      description:
        'Start with one project and one measurable problem. A fixed-scope 8–12 week pilot with success metrics agreed in writing before work begins.'
    },
    eyebrow: 'ENTERPRISE PILOT',
    h1: 'Start with one project and one measurable problem.',
    lede: 'A controlled scope validates technical fit, business value and adoption before anyone has to defend a platform decision.',
    ctaPrimary: 'Request a Pilot',
    ctaSecondary: 'See engagement model',
    firstPilotEyebrow: 'RECOMMENDED FIRST PILOT',
    firstPilotTitle: 'Schedule & project intelligence.',
    firstPilot: [
      {
        label: 'USE CASE',
        title: 'Schedule & Project Intelligence',
        text: 'Connect IFC/BIM, baseline schedule, daily reports, inspections and evidence records.'
      },
      {
        label: 'MEASURE',
        title: 'Value, not features',
        text: 'Risk lead time, evidence retrieval speed, reporting effort and decision-cycle reduction.'
      },
      {
        label: 'OUTPUT',
        title: 'Evidence-backed actions',
        text: 'Actual vs planned, delay cause, forecast range, mitigation scenarios and approvals.'
      }
    ],
    runEyebrow: 'HOW IT RUNS',
    runTitle: 'Twelve weeks, four checkpoints.',
    runCopy:
      'Nothing here depends on a data migration finishing first. If week five does not produce something the team uses, we say so.',
    weeks: [
      {
        range: 'Weeks 1–2',
        title: 'Scope and success test',
        text: 'Agree the project, the decision we are trying to improve and the metrics that will decide whether it worked. Written down before anything is built.'
      },
      {
        range: 'Weeks 3–5',
        title: 'Connect the data',
        text: 'Ingest IFC/BIM, the baseline schedule, daily reports and evidence records. Reconcile claimed against evidenced progress and surface the gap.'
      },
      {
        range: 'Weeks 6–9',
        title: 'Intelligence in the loop',
        text: 'Risk drivers, forecast ranges and Ask Twin running against live project context, used by the real team in their real weekly cycle.'
      },
      {
        range: 'Weeks 10–12',
        title: 'Measure and decide',
        text: 'Report against the success test — honestly — and make a go/no-go call with the evidence to support either answer.'
      }
    ],
    needEyebrow: 'WHAT WE NEED FROM YOU',
    needTitle: 'Less than you would expect.',
    needCopy:
      'A pilot that requires a year of data cleansing before it produces anything is not a pilot.',
    inputsLabel: 'INPUTS',
    inputs: 'IFC · Baseline Schedule · Daily Reports · RFI/NCR · Inspections · Photos',
    outputsLabel: 'OUTPUTS',
    outputs: 'Actual vs Planned · Delay Cause · Risk · Forecast · Evidence · Mitigation',
    startCta: 'Start Enterprise Pilot'
  },

  company: {
    meta: {
      title: 'Company',
      description:
        'OneAI Construction builds the intelligence layer for capital projects. Why construction, why now, and the principles we will not trade away.'
    },
    eyebrow: 'COMPANY',
    h1: 'Building intelligence for the physical world.',
    lede: 'OneAI Construction is a OneAI Labs product focused entirely on construction and infrastructure — the sector where coordination failure is most expensive and least visible until it is too late to absorb.',
    viewEyebrow: 'POINT OF VIEW',
    viewTitle: 'Construction does not need another dashboard.',
    narrative: [
      'The industry has spent two decades digitising documents and is still surprised by delays that were visible in its own records weeks earlier. The problem was never a shortage of data. It was that no system held the project as a single coherent object — geometry, time, evidence and decisions in one place, connected well enough to reason over.',
      'Every project already contains the signal. A delivery record moves, an inspection is deferred, a crane is reallocated. Those facts exist, in systems that have never been introduced to one another, and by the time they converge into a monthly report the decision window that could have absorbed them has closed.',
      'We think the right response is an intelligence layer: something that understands project context, preserves evidence, reasons about risk with its sources attached, and coordinates action under explicit human control. Not a chatbot over a document store, and not another silo asking teams to enter the same data a fourth time.'
    ],
    closingPrefix: 'That is the whole company. Two products — ',
    closingMiddle: ' and ',
    closingAfterProducts: ' — built on one ',
    worldModelLink: 'Project World Model',
    closingSuffix:
      ', deployed one project at a time against a success test we agree before we start.',
    principlesEyebrow: 'PRINCIPLES',
    principlesTitle: 'What we will not trade away.',
    principlesCopy:
      'These constrain the roadmap. When a feature request conflicts with one of them, the principle wins.',
    principles: [
      {
        title: 'Evidence before conclusion',
        text: 'If the system cannot cite the record behind a claim, it does not make the claim. This is an architectural constraint, not a prompt instruction.'
      },
      {
        title: 'Humans stay accountable',
        text: 'AI recommends. A named person approves anything consequential, and the approval is recorded with the evidence that was visible at the time.'
      },
      {
        title: 'The world model outlives the model',
        text: 'Foundation models will keep changing. The semantic representation of your project is the durable asset, so we keep the model layer replaceable.'
      },
      {
        title: 'Integrate, do not replace',
        text: 'Capital projects run on systems that work. We are the layer between them, not a proposal to rip them out.'
      },
      {
        title: 'Report honestly',
        text: 'Pilots have success tests agreed in writing before work starts. When a test fails, we say so.'
      },
      {
        title: 'Governance is the product',
        text: 'On projects where decisions get examined years later, the audit trail is not compliance overhead around the product. It is the thing being bought.'
      }
    ],
    finalCta: {
      eyebrow: 'WORK WITH US',
      title: 'Bring one real problem.',
      copy: 'The most useful first conversation is about a decision you are struggling to make on a live project — not a feature list.',
      primary: 'Book a Demo',
      secondary: 'Read our thinking'
    }
  },

  contact: {
    meta: {
      title: 'Book an Enterprise Demo',
      description:
        'Talk to the OneAI Construction team about project data, current workflows, measurable value and a realistic pilot path. One real project problem is the best place to start.'
    },
    eyebrow: 'BOOK A DEMO',
    h1: 'Bring one real project problem.',
    lede: 'We will focus the conversation on your project data, current workflows, measurable value and a realistic pilot path — not on a feature tour.',
    points: [
      'Enterprise demo',
      'Pilot scoping',
      'Technical architecture',
      'Integration discussion'
    ],
    preferEmail: 'Prefer email?',
    form: {
      name: 'Name',
      company: 'Company',
      email: 'Work email',
      role: 'Role (optional)',
      interest: 'What would you like to discuss?',
      message: 'Project / use case',
      messagePlaceholder:
        'Which project, which systems are in place today, and what decision is hardest to make right now?',
      submit: 'Request Enterprise Demo',
      submitting: 'Sending…',
      note: 'We use your details only to respond to this request. No newsletter, no resale.',
      honeypot: 'Website',
      successTitle: 'Request received.',
      successBodyPrefix:
        'A member of the OneAI Construction team will reply within one business day. If your request is urgent, email ',
      networkError: 'Network error. Please check your connection or email us directly.',
      genericError: 'We could not send your request.',
      interests: {
        'enterprise-demo': 'Enterprise demo',
        pilot: 'Pilot scoping',
        'technical-architecture': 'Technical architecture',
        partnership: 'Partnership',
        other: 'Other'
      }
    }
  },

  resources: {
    meta: {
      title: 'Resources & Insights',
      description:
        'Technical and methodological writing on construction intelligence: the Project World Model, probabilistic schedule forecasting, evidence-first retrieval and AI governance on capital projects.'
    },
    eyebrow: 'RESOURCES',
    h1: 'How we think about construction intelligence.',
    lede: 'Methodology, architecture and governance — written for the people who have to defend the decision, not just approve the software.',
    readPrefix: 'Read ·',
    minRead: 'min',
    minReadSuffix: 'min read',
    relatedEyebrow: 'KEEP READING',
    relatedTitle: 'Related writing',
    notFound: 'Not found'
  },

  integrations: {
    meta: {
      title: 'Integrations',
      description:
        'Bidirectional connectors to Procore, Autodesk Construction Cloud and Primavera P6, plus SharePoint, Google Drive, Outlook, Gmail and ERP — with delta sync and write-back.'
    },
    eyebrow: 'INTEGRATIONS',
    h1: 'Connect the systems you already run.',
    lede: 'OneAI Construction is an intelligence layer, which only works if it reads from the systems your teams use today. Connectors are bidirectional where the source platform allows it, support delta sync, and write results back rather than stranding them.',
    ctaPrimary: 'Discuss your stack',
    ctaSecondary: 'See the platform',
    catalogEyebrow: 'CONNECTOR CATALOG',
    catalogTitle: 'What ships today.',
    catalogCopy:
      'Each connector declares its direction, the modules it feeds and the objects it moves. Nothing on this page is a roadmap item.',
    headers: {
      connector: 'Connector',
      auth: 'Auth',
      direction: 'Direction',
      modules: 'Feeds'
    },
    categories: {
      project_controls: 'Project controls',
      design: 'Design & BIM',
      schedule: 'Schedule',
      documents: 'Documents',
      communications: 'Communications',
      commercial: 'Commercial'
    },
    directions: { import: 'Import', export: 'Export', bidirectional: 'Bidirectional' },
    modules: {
      contracts: 'Contracts',
      procurement: 'Procurement',
      budget: 'Budget',
      schedule: 'Schedule',
      qaqc: 'QA/QC',
      hse: 'HSE',
      field: 'Field',
      documents: 'Documents',
      reports: 'Reports',
      approvals: 'Approvals',
      costs: 'Costs'
    },
    formatsEyebrow: 'SCHEDULE FORMATS',
    formatsTitle: 'Native schedule import, not just CSV.',
    formatsCopy:
      'Schedules arrive in the formats planners actually work in. WBS, activities, logic relationships and baselines are preserved.',
    formats: [
      {
        title: 'Primavera P6 XER',
        text: 'Native XER import, including WBS, activities, relationships and baselines.'
      },
      {
        title: 'MS Project XML',
        text: 'Native XML import for teams standardised on Microsoft Project.'
      },
      {
        title: 'CSV',
        text: 'A plain path for exports from any other planning tool, or for a fast first pilot.'
      }
    ],
    syncEyebrow: 'HOW SYNC BEHAVES',
    syncTitle: 'Designed to survive being run every hour.',
    syncItems: [
      {
        title: 'Delta sync',
        text: 'Connectors move what changed rather than re-importing whole libraries on every run.'
      },
      {
        title: 'Write-back',
        text: 'Results and published reports flow back to the source system, so the intelligence layer does not become a place work goes to die.'
      },
      {
        title: 'Health and errors',
        text: 'Every connector records its last sync, last health check and last error, surfaced in the integration command centre.'
      },
      {
        title: 'Scoped credentials',
        text: 'OAuth or API key per connector, stored by reference, scoped to the tenant that configured it.'
      }
    ],
    apiEyebrow: 'BUILD YOUR OWN',
    apiTitle: 'An open API underneath all of it.',
    apiCopy:
      'Both products expose their full surface over HTTP with OpenAPI 3.0 documentation, server-sent events for realtime, and webhooks for outbound integration. If a connector does not exist yet, the API is not a second-class path — it is the same one the connectors use.',
    apiItems: [
      { value: '143', label: 'API endpoints across Construction OS' },
      { value: '60+', label: 'API endpoints across Construction Twin' },
      { value: 'OpenAPI 3.0', label: 'Self-serve documentation at /docs' },
      { value: 'SSE', label: 'Realtime event stream for approvals, jobs and field events' }
    ]
  },

  notFound: {
    title: 'Page not found',
    lede: 'The page you asked for does not exist, or has moved.',
    home: 'Back to home',
    resources: 'Read our thinking',
    code: '404'
  },

  apiErrors: {
    tooMany: 'Too many requests. Please try again later or email us directly.',
    malformed: 'Malformed request body.',
    checkForm: 'Please check the form.',
    undelivered: 'We could not deliver your request. Please email us directly.',
    unexpected: 'Something went wrong. Please email us directly.'
  },

  validation: {
    name: 'Please enter your full name.',
    company: 'Please enter your company.',
    emailInvalid: 'Please enter a valid email address.',
    emailFree: 'Please use your work email address.',
    message: 'Tell us a little about the project or problem (20+ characters).'
  }
} as const;
