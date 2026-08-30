import { ImageResponse } from 'next/og';
import { site } from '../lib/config';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${site.name} — ${site.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: 'linear-gradient(135deg, #070a0e 0%, #0b1620 60%, #061015 100%)',
        color: '#f6f8fb',
        fontFamily: 'sans-serif'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <svg width="60" height="60" viewBox="0 0 64 64">
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>ONEAI</span>
          <span style={{ fontSize: 13, color: '#9aa8b7', letterSpacing: 6 }}>CONSTRUCTION</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 15, letterSpacing: 6, color: '#37d8ff', fontWeight: 700 }}>
          AI-NATIVE CONSTRUCTION INTELLIGENCE
        </span>
        <span
          style={{
            fontSize: 82,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1.05,
            marginTop: 20
          }}
        >
          Intelligence for
        </span>
        <span
          style={{
            fontSize: 82,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1.05,
            color: '#37d8ff'
          }}
        >
          the Built World.
        </span>
      </div>

      <div style={{ display: 'flex', gap: 18, fontSize: 17, color: '#8ea0b2', letterSpacing: 3 }}>
        <span>SEE</span>
        <span style={{ color: '#475665' }}>→</span>
        <span>UNDERSTAND</span>
        <span style={{ color: '#475665' }}>→</span>
        <span>PREDICT</span>
        <span style={{ color: '#475665' }}>→</span>
        <span>ACT</span>
      </div>
    </div>,
    size
  );
}
