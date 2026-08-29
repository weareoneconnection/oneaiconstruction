export const pages2 = {
  security: {
    meta: {
      title: 'Security & Trust',
      description:
        'What is implemented today in OneAI Construction, stated precisely: OIDC sign-in, SCIM provisioning, TOTP two-factor, tenant isolation, hash-chained verifiable audit, and the assurance work that is still ahead of us.'
    },
    eyebrow: 'SECURITY & TRUST',
    h1: 'What is actually implemented.',
    lede: 'Capital project data is commercially sensitive and frequently contested. Every control below exists in shipped code today. Where a control is not yet built, this page says so rather than implying it.',
    cta: 'Request the security pack',
    commitments: [
      {
        title: 'Never used for training',
        text: 'Your project data does not train foundation models. Committed contractually, and the platform is model-agnostic by design.'
      },
      {
        title: 'You choose the region',
        text: 'Deployment to EU, UK, US or a customer-nominated region, including your own VPC.'
      },
      {
        title: 'Every conclusion is auditable',
        text: 'Observations, recommendations, approvals and executions are written to a hash-chained log with a verification endpoint.'
      }
    ],
    controlsEyebrow: 'IMPLEMENTED',
    controlsTitle: 'Controls that exist in shipped code.',
    controlsCopy:
      'Everything in this section is running in the product today. It is the list we would walk a security reviewer through, line by line.',
    controls: [
      {
        heading: 'Identity and access',
        points: [
          'OIDC sign-in with PKCE, session refresh and provider sign-out (Construction Twin)',
          'SCIM 2.0 user provisioning and de-provisioning (Construction OS)',
          'TOTP two-factor enrollment to RFC 6238, compatible with standard authenticator apps',
          'Role-based access control scoped to tenant, organization, project and record type',
          'AI agents inherit — and cannot exceed — the permissions of their principal'
        ]
      },
      {
        heading: 'Verifiable audit',
        points: [
          'Hash-chained audit records, making tampering detectable rather than merely discouraged',
          'A verification endpoint that re-walks the chain and reports the first break',
          'Every AI conclusion linked to the evidence set that was visible at the time',
          'Exportable audit trail suitable for claims and dispute proceedings'
        ]
      },
      {
        heading: 'Tenant and data isolation',
        points: [
          'Tenant, organization and project scoping enforced at the data-access layer',
          'Generated assets served through authenticated, tenant-scoped delivery — no public static mount',
          'Cross-tenant asset access is refused, and that refusal is covered by an automated test',
          'Upload type, size, filename and checksum validation on ingest'
        ]
      },
      {
        heading: 'Operations and recovery',
        points: [
          'Database and object-store backup, verification and restore utilities',
          'Scheduled data-retention sweeps, plus an on-demand sweep for a data-subject request',
          'Backup restore drills exposed as an operation, not left as a manual runbook step',
          'Readiness and health endpoints, worker heartbeats, Prometheus metrics and optional OpenTelemetry export'
        ]
      },
      {
        heading: 'Application hardening',
        points: [
          'Rate limiting keyed on a stable credential fingerprint, per caller',
          'Request IDs and security headers on every response',
          'Short-lived access tokens with refresh and session revocation',
          'Continuous dependency scanning; typecheck, lint, unit tests and build gated in CI'
        ]
      },
      {
        heading: 'Model handling',
        points: [
          'Customer project data is never used to train foundation models',
          'Model-agnostic routing — no lock-in to a single provider or model generation',
          'Self-hosted open-weight models available for restricted-data workloads',
          'Every AI response reports whether it was model-backed, and by which provider and model'
        ]
      }
    ],
    roadmapEyebrow: 'NOT YET BUILT',
    roadmapTitle: 'What we have not done.',
    roadmapCopy:
      'Most vendors leave this section out. We would rather you learn it here than four meetings into a procurement process.',
    roadmap: [
      {
        heading: 'SAML 2.0 single sign-on',
        text: 'Not implemented. OIDC and SCIM are. If your identity platform requires SAML specifically, tell us during pilot scoping — it is a known gap, not a surprise.'
      },
      {
        heading: 'SOC 2 Type II and ISO 27001',
        text: 'Neither certification is held today, and no audit is in progress. The controls above are designed to be auditable when we start, but we will not claim a programme we have not begun.'
      },
      {
        heading: 'Third-party penetration testing',
        text: 'Not yet commissioned. Internal review, automated dependency scanning and CI gates are in place. An external test is planned before general availability.'
      },
      {
        heading: 'Immutable audit storage',
        text: 'The audit chain makes tampering detectable. It does not make records immutable — WORM storage or an external notary would be required, and neither is in the product today.'
      },
      {
        heading: 'Load and availability testing at scale',
        text: 'Load-testing tooling ships with the product, but published availability figures are operating targets rather than a measured or contractual SLA.'
      }
    ],
    disclosure: {
      eyebrow: 'RESPONSIBLE DISCLOSURE',
      title: 'Found something? Tell us.',
      copy: 'We investigate every credible report and will not pursue legal action against good-faith security research conducted within a reasonable scope.',
      contactLabel: 'SECURITY CONTACT',
      responseLabel: 'RESPONSE TARGET',
      responseText: 'Acknowledgement within 2 business days.',
      docsLabel: 'DOCUMENTATION',
      docsText: 'Architecture, DPA and sub-processor list available under NDA.'
    }
  },

  customers: {
    meta: {
      title: 'Proof & Accuracy',
      description:
        'How OneAI Construction proves what it claims: published prediction tolerances scored against measured outcomes, an evidence policy enforced in code, and release validation you can reproduce.'
    },
    eyebrow: 'PROOF',
    h1: 'We publish how we are wrong.',
    lede: 'We are pre-reference-customer, so there are no case studies on this page yet. What we can show you is the machinery that will produce them — and that already runs against every prediction the platform makes.',
    metricsEyebrow: 'MEASURED, NOT CLAIMED',
    metricsTitle: 'Every prediction is scored against what actually happened.',
    metricsCopy:
      'A prediction is written down with a due date. When that date arrives, the platform compares it to the measured outcome and records the absolute error and whether it was a hit. The tolerances are fixed in code and unit-tested — we cannot quietly widen them to flatter a result.',
    toleranceHeaders: {
      kind: 'Prediction',
      tolerance: 'Counts as a hit within',
      where: 'Measured against'
    },
    tolerances: [
      { kind: 'Schedule delay', tolerance: '±7 days', where: 'Forecast delay at the horizon date' },
      { kind: 'Cost forecast', tolerance: '±10%', where: 'Forecast amount at the horizon date' },
      {
        kind: 'Risk level',
        tolerance: '±20 points',
        where: 'Project risk score at the horizon date'
      }
    ],
    tolerancesNote:
      'Hit rate and mean absolute error are exposed to every customer through the platform’s own analytics, per organization. When we have enough scored predictions across live projects to be statistically meaningful, the aggregate lands on this page — good or bad.',
    evidenceEyebrow: 'ENFORCED IN CODE',
    evidenceTitle: 'The evidence policy is a constraint, not a slogan.',
    evidenceCopy:
      'These four behaviours are implemented in the reasoning service and covered by the release test suite. They are not prompt instructions, which a model is free to ignore.',
    evidenceItems: [
      {
        title: 'No record, no confident answer',
        text: 'When nothing in the project matches the question, the response is flagged provisional, confidence is capped at 0.4, and the answer text states it must not be used as the basis for a contractual decision.'
      },
      {
        title: 'The AI’s own citations are verified',
        text: 'Every reference in an answer is checked against the records actually retrieved. If the model cites something that was not, confidence is capped at 0.45 and the answer names the unverified reference.'
      },
      {
        title: 'Provenance on every response',
        text: 'Each answer reports whether it was model-backed, which provider and model produced it, the retrieval method, and the schedule sample size it reasoned over.'
      },
      {
        title: 'Thin samples refuse to look confident',
        text: 'With fewer than three measured activities the forecast returns the recorded baseline delay and a warning, instead of a distribution that would look authoritative and be meaningless.'
      }
    ],
    validationEyebrow: 'RELEASE VALIDATION',
    validationTitle: 'What was actually tested in the last release.',
    validationCopy:
      'These are the numbers from the product’s own validation report, not a marketing summary of it.',
    validationItems: [
      { value: '31', label: 'Automated tests passing against an isolated database per run' },
      { value: '29', label: 'Live end-to-end checks against a running API and asset worker' },
      { value: '100', label: 'Pilot readiness score from the end-to-end validation chain' },
      { value: '143', label: 'API endpoints across the Construction OS service surface' }
    ],
    limitsEyebrow: 'BOUNDARIES',
    limitsTitle: 'We publish our limitations.',
    limitsCopy:
      'The product ships a numbered list of explicit boundaries — uncalibrated risk heuristics, lexical rather than semantic retrieval, forecast that does not traverse the dependency network. Ask for it during evaluation and we will hand it over before you ask twice.',
    finalCta: {
      eyebrow: 'YOUR PROJECT',
      title: 'Be the first reference.',
      copy: 'Pick one project and one decision that is currently hard to make. We agree the success test in writing before we start, and we report against it honestly — including when it fails.',
      primary: 'Start an Enterprise Pilot',
      secondary: 'Book a Demo'
    }
  },

  pricing: {
    meta: {
      title: 'Pricing & Engagement Model',
      description:
        'How OneAI Construction engagements are structured: a fixed-fee pilot with an agreed success test, annual programme licensing, and enterprise deployment with custom governance.'
    },
    eyebrow: 'PRICING',
    h1: 'Start small. Prove it. Then scale.',
    lede: 'We would rather sell you a pilot you can approve this quarter than a platform you have to defend for a year. The engagement model is built around that order.',
    tiersEyebrow: 'ENGAGEMENT MODEL',
    tiersTitle: 'Three ways to work with us.',
    mostCommon: 'Most common',
    tiers: [
      {
        name: 'Pilot',
        price: 'Fixed fee',
        duration: '8–12 weeks',
        summary:
          'One project, one measurable problem, a defined success test agreed before we start.',
        includes: [
          'One project scope',
          'Up to 3 data source integrations',
          'Construction Twin or Construction OS',
          'Named success metrics and a go/no-go review',
          'Shared implementation team'
        ],
        cta: 'Scope a pilot'
      },
      {
        name: 'Programme',
        price: 'Annual licence',
        duration: 'Per project portfolio',
        summary:
          'Production deployment across a portfolio, with the integrations and governance to match.',
        includes: [
          'Multiple projects and packages',
          'Full integration suite — BIM, schedule, documents, field',
          'Both products, one intelligence layer',
          'SSO, RBAC and audit export',
          'Named customer success lead',
          'Quarterly model and methodology review'
        ],
        cta: 'Talk to sales'
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        duration: 'Multi-year',
        summary:
          'Private or customer-VPC deployment with bespoke governance and integration commitments.',
        includes: [
          'Private cloud or customer-VPC deployment',
          'Self-hosted model options for restricted data',
          'Custom integration and data-residency commitments',
          'Contractual SLAs and security review support',
          'Executive sponsorship and roadmap input'
        ],
        cta: 'Contact us'
      }
    ],
    faqEyebrow: 'QUESTIONS',
    faqTitle: 'The things procurement asks first.',
    faqs: [
      {
        question: 'Why is there no price on the page?',
        answer:
          'Because the honest answer depends on project count, integration complexity and deployment model, and a headline number that ignores those would mislead you. What we can commit to publicly is the shape: pilots are fixed-fee with a defined scope, and programme licensing is annual and per-portfolio.'
      },
      {
        question: 'What does the pilot actually cost?',
        answer:
          'A fixed fee agreed before work starts, scoped to one project and up to three integrations. It is deliberately sized to be approved without a capital business case, because the point of the pilot is to produce the evidence that justifies the larger one.'
      },
      {
        question: 'What happens if the pilot does not meet its success test?',
        answer:
          'We report that it did not, and you are under no obligation to continue. The success metrics are agreed in writing at the start precisely so that this conversation is factual rather than negotiated.'
      },
      {
        question: 'Do we need to replace our existing systems?',
        answer:
          'No. OneAI Construction is designed as an intelligence layer over your existing BIM, schedule and project-control systems. If a deployment requires you to abandon a working system, we have designed it wrong.'
      }
    ]
  }
} as const;
