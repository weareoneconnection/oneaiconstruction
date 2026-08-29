/**
 * Renders a schema.org JSON-LD block. The payload is authored in `lib/seo.ts`
 * from static, first-party data — never from user input — so serialising it
 * into a script tag is safe.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
