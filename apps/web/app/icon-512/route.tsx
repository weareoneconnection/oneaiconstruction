import { ImageResponse } from 'next/og';
import { brandIconElement } from '../../lib/brand-icon';

export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(brandIconElement({ size: 512 }), { width: 512, height: 512 });
}
