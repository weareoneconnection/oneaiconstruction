import type { Box } from './projection';

export type ZoneStatus = 'complete' | 'active' | 'delayed' | 'planned';
export type ZoneId = 'A' | 'B' | 'C' | 'D';

/**
 * Geometry and metrics for the demo station package. Names and activity text
 * are translated in the dictionaries and joined at render time, so the massing
 * itself stays in one place.
 */
export type Zone = Box & {
  id: ZoneId;
  status: ZoneStatus;
  progress: number;
  delayDays: number;
  evidence: string[];
};

export const zones: Zone[] = [
  {
    id: 'A',
    origin: { x: -2.6, y: 0, z: -1.7 },
    size: { x: 2.4, y: 2.3, z: 1.7 },
    status: 'complete',
    progress: 100,
    delayDays: 0,
    evidence: ['INS-1182', 'DR-233']
  },
  {
    id: 'B',
    origin: { x: 0.2, y: 0, z: -1.9 },
    size: { x: 2.5, y: 3.2, z: 2.0 },
    status: 'delayed',
    progress: 67,
    delayDays: 4,
    evidence: ['DR-241', 'DLV-CP23', 'NCR-0091']
  },
  {
    id: 'C',
    origin: { x: -2.2, y: 0, z: 0.6 },
    size: { x: 2.2, y: 1.9, z: 1.9 },
    status: 'active',
    progress: 82,
    delayDays: 1,
    evidence: ['PR-330', 'SRV-77']
  },
  {
    id: 'D',
    origin: { x: 0.6, y: 0, z: 0.9 },
    size: { x: 2.0, y: 1.3, z: 1.6 },
    status: 'planned',
    progress: 18,
    delayDays: 0,
    evidence: ['BASE-V12']
  }
];

export const STATUS_RISK: Record<ZoneStatus, 'low' | 'medium' | 'high'> = {
  complete: 'low',
  active: 'medium',
  delayed: 'high',
  planned: 'low'
};
