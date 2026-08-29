/**
 * Verifiable product facts.
 *
 * Every entry here was checked against the product source before being put on
 * the website, and carries the file it came from. If a claim cannot be traced
 * to a line of shipped code, it does not belong in this file — and therefore
 * does not belong on the site.
 *
 * Sources:
 *   twin = weareoneconnection/oneaiconstructiontwin  @ v0.7.1
 *   os   = weareoneconnection/OnAIConstructionOS     @ main
 */

/** Enterprise connectors. Source: os services/project-service/src/enterprise.ts */
export const connectors = [
  {
    id: 'procore',
    name: 'Procore',
    category: 'project_controls',
    auth: 'OAuth',
    directions: ['import', 'export', 'bidirectional'],
    modules: ['contracts', 'procurement', 'budget', 'schedule', 'qaqc', 'hse', 'field'],
    objects: ['projects', 'commitments', 'budget', 'submittals', 'rfis', 'observations']
  },
  {
    id: 'autodesk',
    name: 'Autodesk Construction Cloud',
    category: 'design',
    auth: 'OAuth',
    directions: ['import', 'export', 'bidirectional'],
    modules: ['documents', 'qaqc', 'hse', 'field'],
    objects: ['projects', 'docs', 'issues', 'forms', 'photos']
  },
  {
    id: 'p6',
    name: 'Primavera P6',
    category: 'schedule',
    auth: 'API key',
    directions: ['import', 'export', 'bidirectional'],
    modules: ['schedule'],
    objects: ['projects', 'wbs', 'activities', 'relationships', 'baselines']
  },
  {
    id: 'sharepoint',
    name: 'SharePoint',
    category: 'documents',
    auth: 'OAuth',
    directions: ['import', 'export'],
    modules: ['documents', 'contracts', 'reports'],
    objects: ['document_libraries', 'contract_folders', 'published_reports']
  },
  {
    id: 'google_drive',
    name: 'Google Drive',
    category: 'documents',
    auth: 'OAuth',
    directions: ['import', 'bidirectional'],
    modules: ['documents', 'budget'],
    objects: ['shared_drives', 'sheets']
  },
  {
    id: 'outlook',
    name: 'Outlook',
    category: 'communications',
    auth: 'OAuth',
    directions: ['import'],
    modules: ['approvals'],
    objects: ['mail_threads']
  },
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'communications',
    auth: 'OAuth',
    directions: ['import'],
    modules: ['approvals'],
    objects: ['mail_threads']
  },
  {
    id: 'erp',
    name: 'ERP / Finance',
    category: 'commercial',
    auth: 'API key',
    directions: ['import', 'export', 'bidirectional'],
    modules: ['budget', 'costs', 'procurement'],
    objects: ['cost_codes', 'commitments', 'payments']
  }
] as const;

export type ConnectorId = (typeof connectors)[number]['id'];

/**
 * Published accuracy tolerances. A prediction is recorded with a due date, then
 * scored against the measured outcome when that date arrives.
 * Source: os services/project-service/src/analytics.ts `scorePrediction`,
 * unit-tested in analytics.test.ts.
 */
export const accuracyTolerances = [
  { kind: 'delay_days', tolerance: '±7', unit: 'days' },
  { kind: 'forecast_cost', tolerance: '±10', unit: '%' },
  { kind: 'risk_level', tolerance: '±20', unit: 'points' }
] as const;

/**
 * Evidence-policy behaviours enforced in code, not stated in documentation.
 * Source: twin apps/api/app/services/intelligence.py
 */
export const evidenceGuarantees = [
  { id: 'no-evidence', confidenceCap: '0.4' },
  { id: 'unverified-citation', confidenceCap: '0.45' },
  { id: 'provenance', confidenceCap: null },
  { id: 'thin-sample', confidenceCap: null }
] as const;

/** Security controls that exist in shipped code. */
export const securityControls = [
  { id: 'oidc', product: 'twin' },
  { id: 'scim', product: 'os' },
  { id: 'mfa', product: 'os' },
  { id: 'rbac', product: 'both' },
  { id: 'audit-chain', product: 'both' },
  { id: 'tenant-isolation', product: 'both' },
  { id: 'retention', product: 'os' },
  { id: 'backup', product: 'both' },
  { id: 'asset-authz', product: 'twin' },
  { id: 'rate-limit', product: 'both' }
] as const;

/** Construction OS module map. Source: os apps/web/src/pages + 51 Prisma models. */
export const osModules = [
  { id: 'commercial', pages: ['CommercialControl', 'Contracts', 'Costs', 'Budget', 'Procurement'] },
  { id: 'schedule', pages: ['Schedule', 'Imports'] },
  { id: 'documents', pages: ['DocumentIntake', 'Registers'] },
  { id: 'quality-safety', pages: ['QAQC', 'HSE', 'RiskCenter'] },
  { id: 'field', pages: ['FieldMobile', 'SmartSite'] },
  { id: 'governance', pages: ['Approvals', 'ActionCenter', 'DataGovernance', 'SecurityAudit'] },
  { id: 'insight', pages: ['Dashboard', 'Reports', 'Projects'] }
] as const;

/**
 * Validation figures from the product's own release testing.
 * Source: twin TEST_REPORT_V07.md
 */
export const validation = {
  twinAutomatedTests: 31,
  twinE2EChecks: 29,
  twinPilotReadiness: 100,
  osTestFiles: 35,
  osEndpoints: 143,
  osDataModels: 51,
  twinEndpoints: 60
} as const;
