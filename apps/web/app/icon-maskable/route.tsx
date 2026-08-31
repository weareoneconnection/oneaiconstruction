import { ImageResponse } from 'next/og';
import { brandIconElement } from '../../lib/brand-icon';

/**
 * The maskable cut. Android crops a home-screen icon to whatever shape the
 * launcher uses and only guarantees a centred circle of 80% diameter survives.
 *
 * The container box is dropped — a rounded rectangle inside a circular mask
 * reads as a mistake — and the fill is set from the mark's own geometry rather
 * than by eye: a wide triangle inside a circle is genuinely tight. At 0.58 the
 * furthest point of the truss lands 197px from centre against the 205px safe
 * radius; 0.62 already clips. This is the largest the mark can honestly be here,
 * and it is why the Android tile reads smaller than the iOS one.
 */
export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(brandIconElement({ size: 512, boxed: false, fill: 0.58 }), {
    width: 512,
    height: 512
  });
}
