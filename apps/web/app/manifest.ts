import type { MetadataRoute } from 'next';
import { site } from '../lib/config';

/**
 * Without an `icons` array a browser has nothing to install with: Android showed
 * a blank tile and iOS a screenshot of the page. `any` is the icon as drawn;
 * `maskable` is the cut Android may crop to a circle, so the mark sits well
 * inside the tile there.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: 'OneAI Construction',
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#070a0e',
    theme_color: '#070a0e',
    icons: [
      { src: '/icon-192', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ]
  };
}
