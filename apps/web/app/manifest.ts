import type { MetadataRoute } from 'next';
import { site } from '../lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: 'OneAI Construction',
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#070a0e',
    theme_color: '#070a0e'
  };
}
