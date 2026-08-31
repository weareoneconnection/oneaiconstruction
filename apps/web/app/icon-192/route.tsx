import { ImageResponse } from 'next/og';
import { brandIconElement } from '../../lib/brand-icon';

/**
 * Manifest icons need URLs the manifest can name, which the `icon.tsx`
 * convention does not give (Next hashes those). Hence a plain route.
 */
export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(brandIconElement({ size: 192 }), { width: 192, height: 192 });
}
