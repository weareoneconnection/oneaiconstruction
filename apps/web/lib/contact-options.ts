/**
 * Shared by the client form and the server validator. Kept free of any zod
 * import so the browser bundle does not pull the validation library in just to
 * render a select element.
 */
export const INTEREST_VALUES = [
  'enterprise-demo',
  'pilot',
  'technical-architecture',
  'partnership',
  'other'
] as const;

export type Interest = (typeof INTEREST_VALUES)[number];

export const INTEREST_LABELS: Record<Interest, string> = {
  'enterprise-demo': 'Enterprise demo',
  pilot: 'Pilot scoping',
  'technical-architecture': 'Technical architecture',
  partnership: 'Partnership',
  other: 'Other'
};
