import { ImageResponse } from 'next/og';
import { brandIconElement } from '../../lib/brand-icon';

/**
 * The maskable cut. Android crops a home-screen icon to whatever shape the
 * launcher uses and only guarantees a centred circle of 80% diameter survives.
 *
 * The container box is dropped — a rounded rectangle inside a circular mask
 * reads as a mistake — and the inset is set from the mark's own geometry rather
 * than by eye: at 0.08 the truss fills 84% of the tile while its furthest
 * corner lands 190px from centre, inside the 205px safe radius. A more timid
 * inset survives the crop too, but leaves the mark looking lost in the tile.
 */
export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(brandIconElement({ size: 512, boxed: false, inset: 0.08 }), {
    width: 512,
    height: 512
  });
}
