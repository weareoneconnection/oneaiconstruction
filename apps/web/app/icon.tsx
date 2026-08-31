import { ImageResponse } from 'next/og';
import { brandIconElement } from '../lib/brand-icon';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/** The browser tab. */
export default function Icon() {
  return new ImageResponse(brandIconElement({ size: size.width }), size);
}
