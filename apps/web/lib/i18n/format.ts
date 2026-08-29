/**
 * Substitute `{name}` placeholders in a dictionary string.
 *
 * Dictionaries are passed from server components into client components, so
 * every value has to be serialisable — which rules out storing a formatter
 * function. Templates plus this helper keep word order translatable without
 * breaking the RSC boundary.
 */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}
