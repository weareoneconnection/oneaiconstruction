export const pages2 = {
  security: {
    meta: {
      title: 'Security & Trust',
      description:
        'Data residency, model handling, access control, auditability and assurance for OneAI Construction. Your project data is never used to train foundation models.'
    },
    eyebrow: 'SECURITY & TRUST',
    h1: 'Your project data stays yours.',
    lede: 'Capital project data is commercially sensitive and frequently contested. Everything below is designed around that reality rather than retrofitted onto a consumer AI product.',
    cta: 'Request the security pack',
    commitments: [
      {
        title: 'Never used for training',
        text: 'Your project data does not train foundation models. Contractually committed.'
      },
      {
        title: 'You choose the region',
        text: 'EU, UK, US or a customer-nominated region, including your own VPC.'
      },
      {
        title: 'Every conclusion is auditable',
        text: 'Evidence, reasoning, approval and outcome are recorded and exportable.'
      }
    ],
    controlsEyebrow: 'CONTROLS',
    controlsTitle: 'What is in place today.',
    controlsCopy:
      'We distinguish between what is implemented, what is in programme and what is on the roadmap — and we will tell you which is which in a security review.',
    controls: [
      {
        heading: 'Data residency and isolation',
        points: [
          'Single-tenant project data isolation with per-project encryption scope',
          'Deployment to EU, UK, US or customer-nominated regions',
          'Private cloud and customer-VPC deployment supported for enterprise agreements'
        ]
      },
      {
        heading: 'Model handling',
        points: [
          'Customer project data is never used to train foundation models',
          'Zero-retention inference agreements with model providers where offered',
          'Model-agnostic routing — no lock-in to a single provider or model generation',
          'Self-hosted open-weight models available for restricted-data workloads'
        ]
      },
      {
        heading: 'Access and identity',
        points: [
          'SSO via SAML 2.0 and OIDC; SCIM user provisioning',
          'Role-based access control scoped to project, package and record type',
          'Agents inherit — and cannot exceed — the permissions of their principal'
        ]
      },
      {
        heading: 'Auditability',
        points: [
          'Immutable log of observations, recommendations, approvals and executions',
          'Every AI conclusion linked to the evidence set visible at the time',
          'Exportable audit trail suitable for claims and dispute proceedings'
        ]
      },
      {
        heading: 'Encryption and infrastructure',
        points: [
          'TLS 1.3 in transit; AES-256 at rest',
          'Secrets management with scoped, rotating credentials',
          'Continuous dependency and container vulnerability scanning'
        ]
      },
      {
        heading: 'Assurance programme',
        points: [
          'SOC 2 Type II programme underway — current status shared under NDA',
          'ISO 27001 alignment as the control baseline',
          'Annual third-party penetration testing; summary reports available to customers',
          'Documented incident response with contractual notification windows'
        ]
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
      title: 'Customers & Results',
      description:
        'How capital project teams use OneAI Construction to surface risk earlier, assemble evidence-backed delay narratives faster and make forecast decisions they can defend.'
    },
    eyebrow: 'CUSTOMERS',
    h1: 'Measured on decisions, not dashboards.',
    lede: 'We deploy on one project, agree the success test before we start, and report against it honestly. These are the results that came out of that process.',
    metrics: [
      {
        value: '14 days',
        label: 'Median lead time on risks surfaced before they hit a progress report'
      },
      { value: '−71%', label: 'Time to assemble an evidence-backed delay narrative' },
      { value: '<3 min', label: 'Median time to retrieve the records behind any project claim' },
      { value: '100%', label: 'AI-recommended actions carrying a named human approval' }
    ],
    casesEyebrow: 'CASE STUDIES',
    casesTitle: 'What changed on the project.',
    casesCopy:
      'Each engagement below started as a fixed-scope pilot with a named metric. Client identities are withheld at their request; figures are verified against project records.',
    labels: { challenge: 'Challenge', approach: 'Approach', outcome: 'Outcome' },
    cases: [
      {
        slug: 'rail-station-package',
        sector: 'Rail & Transit',
        title: 'Roof steel risk surfaced 14 days before it reached a report',
        scope: 'Metro station package · 18-month programme · 4 primary subcontractors',
        challenge:
          'Progress reporting ran on a monthly cycle. Delivery constraints on connection plates were visible in procurement records weeks before they appeared as schedule variance, but nothing connected the two systems.',
        approach:
          'Connected IFC geometry, the baseline schedule, daily reports and delivery records into a single Project World Model. Risk drivers were linked back to source records so that every forecast movement could be attributed.',
        outcomes: [
          'Connection-plate lead-time drift detected 14 days before the activity became critical',
          'Delay narrative assembly reduced from roughly two days to under four hours',
          'Recovery scenario comparison moved from opinion to two costed forecast curves'
        ],
        disclosure: 'Client anonymised at their request. Figures verified against project records.'
      },
      {
        slug: 'data-centre-fitout',
        sector: 'Industrial',
        title: 'One evidence trail across four reporting systems',
        scope: 'Hyperscale data centre fit-out · multi-package delivery',
        challenge:
          'Four contractors reported progress in four formats. Reconciling claimed against evidenced completion consumed most of the project controls team’s week.',
        approach:
          'Ingested each reporting stream into a shared activity and evidence layer, with automated reconciliation between claimed percent-complete and inspection-backed completion.',
        outcomes: [
          'Weekly reconciliation effort reduced from around three days to half a day',
          'Claimed-versus-evidenced gap made visible per package for the first time',
          'Commercial team gained a defensible record ahead of a contested variation'
        ],
        disclosure: 'Client anonymised at their request. Figures verified against project records.'
      }
    ],
    finalCta: {
      eyebrow: 'YOUR PROJECT',
      title: 'Run the same test.',
      copy: 'Pick one project and one decision that is currently hard to make. We will scope a pilot around it and agree how we will know whether it worked.',
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
