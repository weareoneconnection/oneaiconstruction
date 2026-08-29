import { expect, test } from '@playwright/test';

const ROUTES = [
  '',
  '/products',
  '/products/construction-os',
  '/products/construction-twin',
  '/solutions',
  '/platform',
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

test('robots.txt points at the sitemap', async ({ request }) => {
  const body = await (await request.get('/robots.txt')).text();
  expect(body).toContain('Sitemap:');
  expect(body).toContain('Disallow: /api/');
});
