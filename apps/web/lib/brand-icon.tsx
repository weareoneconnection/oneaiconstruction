import type { ReactElement } from 'react';

/**
 * The king-post truss as a launcher tile, at any size.
 *
 * Drawn as literal SVG rather than through the BrandMark component because
 * Satori — which rasterises these routes — resolves no CSS custom properties,
 * so every colour here has to be a literal.
 *
 * `inset` is the share of the tile left empty around the mark. Android masks
 * icons to a circle or squircle and only guarantees the middle 80% survives, so
 * a maskable tile has to hold the whole mark well inside its own edge.
 */
export const TILE_BACKGROUND = '#070a0e';
const STROKE = '#f6f8fb';
const MEMBER = '#37d8ff';

export function brandIconElement({
  size,
  boxed = true,
  inset = 0
}: {
  size: number;
  boxed?: boolean;
  inset?: number;
}): ReactElement {
  const mark = Math.round(size * (1 - inset * 2));
  // Every coordinate below is expressed against the 64-unit grid the mark is
  // designed on, so the geometry scales exactly rather than being re-tuned.
  const scale = mark / 64;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: TILE_BACKGROUND
      }}
    >
      <svg width={mark} height={mark} viewBox="0 0 64 64">
        {boxed && (
          <rect
            x="1"
            y="1"
            width="62"
            height="62"
            rx="16"
            fill="rgba(55,216,255,0.06)"
            stroke="rgba(55,216,255,0.45)"
            strokeWidth={Math.max(1, 1 / scale)}
          />
        )}
        <path
          d="M32 13 L53 51 L11 51 Z"
          fill="none"
          stroke={STROKE}
          strokeOpacity="0.9"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <line
          x1="21"
          y1="35"
          x2="43"
          y2="35"
          stroke={STROKE}
          strokeOpacity="0.9"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <line x1="32" y1="13" x2="32" y2="51" stroke={MEMBER} strokeWidth="3.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
