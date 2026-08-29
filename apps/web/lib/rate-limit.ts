/**
 * In-memory fixed-window rate limiter.
 *
 * Adequate for a single-region marketing deployment. If the site is ever scaled
 * to multiple instances or a fully serverless runtime, swap the map for Upstash
 * Redis / Vercel KV — the call signature is designed to stay the same.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60 * 60 * 1000 } = {}
): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    hits.set(key, { count: 1, resetAt });
    if (hits.size > 10_000) sweep(now);
    return { ok: true, remaining: limit - 1, resetAt };
  }

  entry.count += 1;
  return {
    ok: entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt
  };
}

function sweep(now: number) {
  for (const [key, entry] of hits) if (now > entry.resetAt) hits.delete(key);
}

/** Best-effort client IP from proxy headers (Vercel / Cloudflare). */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return (
    forwarded?.split(',')[0]?.trim() ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}
