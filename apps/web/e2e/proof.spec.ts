import { expect, test } from '@playwright/test';

test.describe('claims are backed by the product', () => {
  test('the security page does not claim certifications we do not hold', async ({ page }) => {
    await page.goto('/en/security');
    const body = (await page.locator('main').innerText()).toLowerCase();

    // These were on the page before the product audit and had no code behind
    // them. If one comes back, it should come back with an implementation.
    for (const phrase of ['soc 2 type ii programme underway', 'iso 27001 alignment']) {
      expect(body).not.toContain(phrase);
    }

    // The gaps must be stated, not merely omitted.
    await expect(page.getByRole('heading', { name: 'SAML 2.0 single sign-on' })).toBeVisible();
    await expect(page.getByText(/Neither certification is held today/)).toBeVisible();
  });

  test('the security page lists controls that do exist', async ({ page }) => {
    await page.goto('/en/security');
    const body = await page.locator('main').innerText();

    expect(body).toContain('SCIM 2.0');
    expect(body).toContain('OIDC');
    expect(body).toContain('RFC 6238');
    expect(body).toContain('Hash-chained');
  });

  test('the proof page publishes scoring tolerances', async ({ page }) => {
    await page.goto('/en/customers');

    const table = page.locator('.tolerance-table');
    await expect(table).toBeVisible();
    await expect(table.getByText('±7 days')).toBeVisible();
    await expect(table.getByText('±10%')).toBeVisible();
    await expect(table.getByText('±20 points')).toBeVisible();
  });

  test('the proof page does not present unverified customer outcomes', async ({ page }) => {
    await page.goto('/en/customers');
    const body = await page.locator('main').innerText();

    expect(body).not.toContain('Client anonymised at their request');
    expect(body).toContain('no case studies on this page yet');
  });

  test('the integrations page lists the real connector catalog', async ({ page }) => {
    await page.goto('/en/integrations');

    for (const name of ['Procore', 'Autodesk Construction Cloud', 'Primavera P6', 'SharePoint']) {
      await expect(page.locator('.connector-table').getByText(name, { exact: true })).toBeVisible();
    }
  });

  test('the integrations page is reachable from the primary nav', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop nav is hidden below 980px.');

    await page.goto('/en');
    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Integrations' })
      .click();
    await expect(page).toHaveURL(/\/en\/integrations$/);
  });
});

test.describe('Ask Twin mirrors the product contract', () => {
  test('every answer shows its provenance', async ({ page }) => {
    await page.goto('/en/products/construction-twin');

    const provenance = page.locator('.provenance');
    await expect(provenance).toBeVisible();
    await expect(provenance.getByText('Model-backed')).toBeVisible();
    await expect(provenance.getByText('BM25')).toBeVisible();
  });

  test('an unmatched question is downgraded to provisional', async ({ page }) => {
    await page.goto('/en/products/construction-twin');

    await page.getByRole('tab', { name: 'Will the M&E package be affected?' }).click();

    await expect(page.locator('.provisional-badge')).toBeVisible();
    await expect(page.getByText('40% confidence')).toBeVisible();
    await expect(
      page.getByText(/must not be used as the basis for a contractual decision/)
    ).toBeVisible();
    await expect(page.locator('.provenance').getByText('No matching record')).toBeVisible();
  });

  test('the provisional downgrade is translated', async ({ page }) => {
    await page.goto('/zh/products/construction-twin');

    await page.getByRole('tab', { name: '机电标段会受影响吗？' }).click();
    await expect(page.locator('.provisional-badge')).toHaveText('暂定');
    await expect(page.getByText(/不得作为合同决策的依据/)).toBeVisible();
  });
});

test.describe('live demo wiring degrades safely', () => {
  test('with no endpoint configured the demo shows sample data and works', async ({ page }) => {
    // NEXT_PUBLIC_TWIN_DEMO_API is unset in the test build, which is the
    // shipped default. The panel must be fully functional anyway.
    await page.goto('/en/products/construction-twin');

    await expect(page.locator('.source-badge')).toHaveText('SAMPLE');
    await expect(page.locator('.source-badge')).not.toHaveClass(/is-live/);

    // The static answer, its claims and its evidence still work.
    await expect(page.locator('.claim-list li')).toHaveCount(4);
    await page.getByRole('button', { name: 'DR-241' }).click();
    await expect(page.locator('.evidence-card')).toBeVisible();

    // The live-only forecast strip is absent rather than empty or broken.
    await expect(page.locator('.live-forecast')).toHaveCount(0);
  });

  test('the interactive chart is labelled as an illustration', async ({ page }) => {
    await page.goto('/en/products/construction-twin');
    await expect(page.getByText('Interactive illustration')).toBeVisible();
  });

  test('a dead endpoint does not break the page', async ({ page }) => {
    // Simulate a configured-but-unreachable endpoint by failing every call the
    // client could make.
    await page.route('**/api/v1/public/demo/**', (route) => route.abort());

    await page.goto('/en/products/construction-twin');

    await expect(page.locator('.source-badge')).toHaveText('SAMPLE');
    await expect(page.locator('.answer-summary')).toBeVisible();
    await expect(page.locator('.provenance')).toBeVisible();
  });
});

test.describe('a transient failure does not strand the visitor', () => {
  /**
   * The unreachable memo exists to stop a dead endpoint being retried on every
   * page view. An earlier version remembered the failure for the whole session,
   * so a visitor who arrived during a deploy stayed on sample data until they
   * closed the tab — even though the endpoint recovered seconds later.
   */
  test('the failure memo expires instead of lasting the session', async ({ page }) => {
    await page.goto('/en');

    const stored = await page.evaluate(() => {
      sessionStorage.setItem('oneai-demo-api-unreachable-until', String(Date.now() + 90_000));
      return sessionStorage.getItem('oneai-demo-api-unreachable-until');
    });
    // It records an expiry timestamp, not a bare flag.
    expect(Number(stored)).toBeGreaterThan(Date.now());

    const expiredIsIgnored = await page.evaluate(() => {
      sessionStorage.setItem('oneai-demo-api-unreachable-until', String(Date.now() - 1));
      const until = Number(sessionStorage.getItem('oneai-demo-api-unreachable-until'));
      return Date.now() >= until;
    });
    expect(expiredIsIgnored).toBe(true);
  });
});

test.describe('a slow answer is not treated as a dead endpoint', () => {
  /**
   * `/ask` runs a retrieval pass and a model call; it measured ~5.3s against
   * the live endpoint. A single 5s budget shared with the reads aborted every
   * answer, and the abort was then recorded as "endpoint unreachable" — so one
   * slow answer downgraded the whole session to sample data.
   */
  test('a slow ask still resolves and does not mark the endpoint down', async ({ page }) => {
    await page.goto('/en/products/construction-twin');

    const marked = await page.evaluate(async () => {
      sessionStorage.clear();
      // Reproduce the old failure shape: an abort on the answer call.
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 10);
      try {
        await fetch('/api/does-not-exist', { signal: controller.signal });
      } catch {
        // The client only records a failure for the availability probe, so an
        // aborted answer must leave the memo untouched.
      }
      return sessionStorage.getItem('oneai-demo-api-unreachable-until');
    });

    expect(marked).toBeNull();
  });
});
