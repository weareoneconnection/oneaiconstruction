import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/**
 * The king-post truss, boxed. This is the one place the container belongs:
 * a launcher tile needs its own edge, running layout does not.
 *
 * Drawn as literal SVG rather than through the BrandMark component because
 * Satori resolves no CSS custom properties — every colour here is a literal.
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#070a0e'
      }}
    >
      <svg width="64" height="64" viewBox="0 0 64 64">
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
        <path
          d="M32 13 L53 51 L11 51 Z"
          fill="none"
          stroke="#f6f8fb"
          strokeOpacity="0.9"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <line
          x1="21"
          y1="35"
          x2="43"
          y2="35"
          stroke="#f6f8fb"
          strokeOpacity="0.9"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <line
          x1="32"
          y1="13"
          x2="32"
          y2="51"
          stroke="#37d8ff"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
    </div>,
    size
  );
}
