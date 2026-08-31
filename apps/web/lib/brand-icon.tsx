import type { ReactElement } from 'react';

/**
 * The king-post truss as a launcher tile, at any size.
 *
 * Drawn as literal SVG rather than through the BrandMark component because
 * Satori — which rasterises these routes — resolves no CSS custom properties,
 * so every colour here has to be a literal.
 */
export const TILE_BACKGROUND = '#070a0e';
const STROKE = '#f6f8fb';
const MEMBER = '#37d8ff';
const STROKE_WIDTH = 3.2;

/**
 * The mark is drawn on a 64-unit artboard but does not fill it: the truss spans
 * x 11..53 and y 13..51, so the artboard carries about 29% of its own padding.
 * Sizing a tile against the artboard therefore paints a mark far smaller than
 * intended — it is what left the iOS icon at 57% of its tile when it was meant
 * to be 80%. `MARK_BOX` is the tight square around the painted mark, stroke
 * included, and `fill` is measured against that.
 */
const HALF_STROKE = STROKE_WIDTH / 2;
const MARK_SIDE = 53 + HALF_STROKE - (11 - HALF_STROKE);
const MARK_BOX = `${11 - HALF_STROKE} ${32 - MARK_SIDE / 2} ${MARK_SIDE} ${MARK_SIDE}`;

export function brandIconElement({
  size,
  boxed = true,
  fill = 1
}: {
  size: number;
  /** Draw the container box at the tile edge. For tiles the platform masks itself, don't. */
  boxed?: boolean;
  /** Painted width of the mark as a fraction of the tile. Ignored when boxed. */
  fill?: number;
}): ReactElement {
  const inner = boxed ? size : Math.round(size * fill);

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
      <svg width={inner} height={inner} viewBox={boxed ? '0 0 64 64' : MARK_BOX}>
        {boxed && (
          <rect
            x="1"
            y="1"
            width="62"
            height="62"
            rx="16"
            fill="rgba(55,216,255,0.06)"
            stroke="rgba(55,216,255,0.45)"
            strokeWidth="1"
          />
        )}
        <path
          d="M32 13 L53 51 L11 51 Z"
          fill="none"
          stroke={STROKE}
          strokeOpacity="0.9"
          strokeWidth={STROKE_WIDTH}
          strokeLinejoin="round"
        />
        <line
          x1="21"
          y1="35"
          x2="43"
          y2="35"
          stroke={STROKE}
          strokeOpacity="0.9"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
        />
        <line x1="32" y1="13" x2="32" y2="51" stroke={MEMBER} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      </svg>
    </div>
  );
}
