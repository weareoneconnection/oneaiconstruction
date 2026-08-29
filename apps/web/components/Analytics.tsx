import Script from 'next/script';
import { site } from '../lib/config';

/**
 * Privacy-preserving analytics (Plausible). Cookieless and GDPR-friendly, so no
 * consent banner is required — which matters for an enterprise audience that
 * bounces off cookie walls. Renders nothing unless a domain is configured.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  const host = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || 'https://plausible.io';

  return (
    <Script
      defer
      data-domain={domain}
      src={`${host}/js/script.js`}
      strategy="afterInteractive"
      title={`Analytics for ${site.name}`}
    />
  );
}
