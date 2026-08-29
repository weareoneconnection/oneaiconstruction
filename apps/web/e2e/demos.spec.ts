import { expect, test } from '@playwright/test';

test.describe('interactive demos', () => {
  test('Ask Twin opens a real evidence record', async ({ page }) => {
    await page.goto('/en/products/construction-twin');

    await page.getByRole('button', { name: 'DR-241' }).click();

    const card = page.locator('.evidence-card');
    await expect(card).toBeVisible();
    await expect(card.getByText('Daily Report', { exact: true })).toBeVisible();
    await expect(card.getByText(/Tower crane unavailable/)).toBeVisible();
  });

  test('Ask Twin serves Chinese evidence on the Chinese site', async ({ page }) => {
    await page.goto('/zh/products/construction-twin');

    await page.getByRole('button', { name: 'DR-241' }).click();

    const card = page.locator('.evidence-card');
    await expect(card).toBeVisible();
    await expect(card.getByText('施工日志', { exact: true })).toBeVisible();
    await expect(card.getByText(/塔吊因计划外检修/)).toBeVisible();
  });

  test('Ask Twin surfaces what evidence does not support', async ({ page }) => {
    await page.goto('/en/products/construction-twin');

    await page.getByRole('tab', { name: 'What is the current schedule risk?' }).click();
    await expect(page.getByText('Not supported by evidence:')).toBeVisible();
  });

  test('forecast chart responds to the data date', async ({ page }) => {
    await page.goto('/en/products/construction-twin');

    const chart = page.locator('.forecast-chart');
    const before = await chart.getAttribute('aria-label');

    await page.locator('.timeline-slider input').fill('96');

    await expect.poll(async () => chart.getAttribute('aria-label')).not.toBe(before);
  });

  test('forecast chart describes itself in Chinese', async ({ page }) => {
    await page.goto('/zh/products/construction-twin');

    const label = await page.locator('.forecast-chart').getAttribute('aria-label');
    expect(label).toContain('进度 S 曲线');
  });

  test('twin scene lets you select a zone', async ({ page }) => {
    await page.goto('/en');

    await page.locator('.zone-switch button', { hasText: 'C' }).click();
    await expect(page.getByRole('heading', { name: 'Concourse Zone C' })).toBeVisible();
  });

  test('twin scene is translated', async ({ page }) => {
    await page.goto('/zh');

    await page.locator('.zone-switch button', { hasText: 'C' }).click();
    await expect(page.getByRole('heading', { name: '站厅 C 区' })).toBeVisible();
  });
});
