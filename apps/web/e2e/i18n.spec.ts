import { expect, test } from '@playwright/test';

test.describe('locale routing', () => {
  test('a bare path redirects to a locale prefix', async ({ page }) => {
    await page.goto('/products');
    await expect(page).toHaveURL(/\/(en|zh)\/products$/);
  });

  test('Accept-Language selects Chinese', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'zh-CN' });
    const page = await context.newPage();

    await page.goto('/');
    await expect(page).toHaveURL(/\/zh$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hans');

    await context.close();
  });

  test('Accept-Language falls back to English for an unsupported language', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'de-DE' });
    const page = await context.newPage();

    await page.goto('/');
    await expect(page).toHaveURL(/\/en$/);

    await context.close();
  });

  test('the switcher changes language and stays on the same page', async ({ page }) => {
    await page.goto('/en/pricing');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Start small');

    await page
      .getByRole('group', { name: /Switch language|切换语言/ })
      .getByRole('button', { name: '中文' })
      .click();

    await expect(page).toHaveURL(/\/zh\/pricing$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hans');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('小步开始');
  });

  test('the chosen language survives a later bare-path visit', async ({ page }) => {
    await page.goto('/en/platform');
    await page
      .getByRole('group', { name: /Switch language|切换语言/ })
      .getByRole('button', { name: '中文' })
      .click();
    await expect(page).toHaveURL(/\/zh\/platform$/);

    // The switcher writes the same cookie the middleware reads.
    await page.goto('/');
    await expect(page).toHaveURL(/\/zh$/);
  });

  test('hreflang alternates point at the sibling translation', async ({ page }) => {
    await page.goto('/zh/security');

    const en = page.locator('link[rel="alternate"][hreflang="en"]');
    const zh = page.locator('link[rel="alternate"][hreflang="zh-Hans"]');

    await expect(en).toHaveAttribute('href', /\/en\/security$/);
    await expect(zh).toHaveAttribute('href', /\/zh\/security$/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/zh\/security$/);
  });

  test('Chinese articles are served from the Chinese content directory', async ({ page }) => {
    await page.goto('/zh/resources/project-world-model');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('项目世界模型');
    await expect(page.locator('.prose')).toContainText('共享的语义层');
  });
});

test.describe('metadata routes escape the locale redirect', () => {
  /**
   * These live at the app root, not under `[locale]`. The middleware's
   * "skip anything with a file extension" rule does not cover them, because
   * they have none — so they were being redirected to `/en/opengraph-image`,
   * which 404s. Every page still looked fine while every social share card
   * and the browser tab icon was broken.
   */
  for (const path of ['/opengraph-image', '/icon']) {
    test(`${path} is served directly, not redirected`, async ({ request }) => {
      const response = await request.get(path, { maxRedirects: 0 });
      expect(response.status(), `${path} must not redirect`).toBe(200);
      expect(response.headers()['content-type']).toContain('image/');
    });
  }

  for (const path of ['/sitemap.xml', '/robots.txt', '/manifest.webmanifest']) {
    test(`${path} is served directly`, async ({ request }) => {
      const response = await request.get(path, { maxRedirects: 0 });
      expect(response.status(), `${path} must not redirect`).toBe(200);
    });
  }

  test('the og:image URL a crawler reads actually resolves', async ({ page, request }) => {
    await page.goto('/en');
    const url = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(url).toBeTruthy();

    // The tag carries an absolute production URL; re-point it at the server
    // under test so this checks the route, not the live site.
    const { pathname, search } = new URL(url as string);
    const response = await request.get(`${pathname}${search}`, { maxRedirects: 0 });
    expect(response.status()).toBe(200);
  });
});
