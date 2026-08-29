import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#070a0e',
        color: '#37d8ff',
        fontSize: 30,
        fontWeight: 800,
        letterSpacing: '-0.04em',
        borderRadius: 14,
        border: '2px solid rgba(55,216,255,0.45)'
      }}
    >
      1A
    </div>,
    size
  );
}
