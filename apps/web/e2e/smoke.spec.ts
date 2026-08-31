import { expect, test } from '@playwright/test';

const ROUTES = [
  '',
  '/products',
  '/products/construction-os',
  '/products/construction-twin',
  '/solutions',
  '/platform',
  '/integrations',
  '/industries',
  '/enterprise',
  '/security',
  '/customers',
  '/pricing',
  '/resources',
  '/resources/project-world-model',
  '/pilot',
  '/company',
  '/contact'
];

const LOCALES = ['en', 'zh'] as const;

for (const locale of LOCALES) {
  test.describe(`[${locale}] every route renders`, () => {
    for (const route of ROUTES) {
      const path = `/${locale}${route}`;

      test(`${path} returns 200 with metadata and one h1`, async ({ page }) => {
        const errors: string[] = [];
        page.on('pageerror', (error) => errors.push(error.message));

        const response = await page.goto(path);
        expect(response?.status()).toBe(200);

        await expect(page).toHaveTitle(/.+/);
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('html')).toHaveAttribute(
          'lang',
          locale === 'zh' ? 'zh-Hans' : 'en'
        );

        // Canonical and both hreflang alternates must be present on every page.
        await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
        await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
        await expect(page.locator('link[rel="alternate"][hreflang="zh-Hans"]')).toHaveCount(1);
        await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);

        expect(errors).toEqual([]);
      });
    }
  });
}

test('sitemap lists every route in both locales', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);
  const body = await response.text();

  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      expect(body).toContain(`oneaiconstruction.com/${locale}${route}<`);
    }
  }
});

/*
 * `not-found.tsx` is part of every page's render tree, so a single dynamic API
 * call inside it (it used to read a middleware-set header) opted the whole
 * `[locale]` segment out of static rendering. Next kept reporting the pages as
 * SSG while emitting no HTML, and every request went to an origin function under
 * `Cache-Control: no-store` - invisible in the build output and in the browser.
 * The only reliable signal is the response header, so assert on it.
 */
test('marketing pages are cacheable, not no-store', async ({ request }) => {
  for (const path of ['/en', '/zh', '/zh/products', '/en/resources/project-world-model']) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const cacheControl = response.headers()['cache-control'] ?? '';
    expect(cacheControl, `${path} must be cacheable`).not.toContain('no-store');
  }
});

/*
 * Every one of these 404'd or was absent at some point: the manifest shipped with
 * no `icons` array at all, and /apple-icon did not exist, so "add to home screen"
 * gave Android a blank tile and iOS a screenshot of the page. None of it shows up
 * in the build, in the browser, or on the site itself.
 */
test('every home-screen icon is served', async ({ request }) => {
  const icons = ['/icon', '/apple-icon', '/icon-192', '/icon-512', '/icon-maskable'];

  for (const path of icons) {
    const response = await request.get(path);
    expect(response.status(), `${path} must exist`).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    // A PNG carries its dimensions in the IHDR chunk at a fixed offset, which is
    // the only way to tell a real icon from a 1px placeholder.
    const body = await response.body();
    expect(body.subarray(0, 8).toString('binary')).toBe('\x89PNG\r\n\x1a\n');
    expect(body.readUInt32BE(16)).toBeGreaterThanOrEqual(64);
  }
});

test('the manifest declares installable icons', async ({ request }) => {
  const manifest = await (await request.get('/manifest.webmanifest')).json();
  const icons: { src: string; sizes: string; purpose?: string }[] = manifest.icons ?? [];

  expect(icons.length).toBeGreaterThanOrEqual(3);
  expect(icons.some((icon) => icon.sizes === '512x512')).toBe(true);
  // Android crops to a circle; without a maskable cut the mark loses its corners.
  expect(icons.some((icon) => icon.purpose === 'maskable')).toBe(true);

  for (const icon of icons) {
    expect((await request.get(icon.src)).status(), `${icon.src} must exist`).toBe(200);
  }
});

/*
 * The mark is drawn on a 64-unit artboard it does not fill — the truss occupies
 * about 71% of it — so sizing a tile against the artboard silently paints a much
 * smaller mark than asked for. That is how the iOS icon shipped at 57% of its
 * tile when it was meant to be 80%, small enough to look wrong beside other apps
 * and invisible to every other check: the PNG was the right size and the right
 * shape.
 *
 * So measure the pixels. Anything that is not the tile background is the mark.
 */
test('the mark fills its tile', async ({ request }) => {
  const sharp = (await import('sharp')).default;
  const background = [7, 10, 14];

  // Android crops a maskable icon to a centred circle of 80% diameter, and a
  // triangle inside a circle is genuinely tight, so it is held to a lower bar.
  const expectations = [
    { path: '/apple-icon', min: 0.7 },
    { path: '/icon-maskable', min: 0.5 }
  ];

  for (const { path, min } of expectations) {
    const png = await (await request.get(path)).body();
    const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true });

    let left = info.width;
    let right = -1;
    for (let y = 0; y < info.height; y += 1) {
      for (let x = 0; x < info.width; x += 1) {
        const i = (y * info.width + x) * info.channels;
        const painted = background.some((channel, offset) => Math.abs(data[i + offset] - channel) > 12);
        if (painted) {
          if (x < left) left = x;
          if (x > right) right = x;
        }
      }
    }

    const filled = (right - left + 1) / info.width;
    expect(filled, `${path} paints ${Math.round(filled * 100)}% of its tile`).toBeGreaterThanOrEqual(min);
  }
});

test('the apple-touch-icon is declared in the head', async ({ page }) => {
  await page.goto('/en');
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
});

test('robots.txt points at the sitemap', async ({ request }) => {
  const body = await (await request.get('/robots.txt')).text();
  expect(body).toContain('Sitemap:');
  expect(body).toContain('Disallow: /api/');
});
