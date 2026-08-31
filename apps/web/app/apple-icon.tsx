import { ImageResponse } from 'next/og';
import { brandIconElement } from '../lib/brand-icon';

/**
 * iOS "add to home screen". Without this route the request 404s and iOS falls
 * back to a screenshot of the page, which is what it was doing.
 *
 * 180x180 is what current iPhones ask for; iOS downscales it for everything else.
 *
 * The container box is dropped here for the same reason as the maskable cut: iOS
 * masks the tile with its own squircle at roughly 22% corner radius, against the
 * box's 25%, so the border would survive along the flats and be cut away at the
 * corners - a frame with four gaps in it. Full bleed lets iOS do the shaping.
 *
 * 0.76 is the painted width of the mark against the tile. iOS's squircle is
 * forgiving enough to take 0.90 uncut, but a mark that close to the edge reads
 * as cramped next to other icons on a home screen.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(brandIconElement({ size: size.width, boxed: false, fill: 0.76 }), size);
}
