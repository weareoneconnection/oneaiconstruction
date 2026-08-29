import { expect, test } from '@playwright/test';

test.describe('contact form', () => {
  test('rejects a free-mail address with a field-level message', async ({ page }) => {
    await page.goto('/en/contact');

    await page.getByLabel('Name').fill('Test Person');
    await page.getByLabel('Company').fill('Test Contractor Ltd');
    await page.getByLabel('Work email').fill('someone@gmail.com');
    await page
      .getByLabel('Project / use case')
      .fill('We would like to discuss a pilot on a live rail station package.');

    await page.getByRole('button', { name: 'Request Enterprise Demo' }).click();

    await expect(page.getByText('Please use your work email address.')).toBeVisible();
  });

  test('returns validation errors in Chinese on the Chinese form', async ({ page }) => {
    await page.goto('/zh/contact');

    await page.getByLabel('姓名').fill('测试用户');
    await page.getByLabel('公司').fill('测试建设集团');
    await page.getByLabel('工作邮箱').fill('someone@qq.com');
    await page.getByLabel('项目 / 应用场景').fill('我们想在一个在建的地铁车站标段上讨论试点合作。');

    await page.getByRole('button', { name: '申请企业演示' }).click();

    await expect(page.getByText('请使用你的工作邮箱。')).toBeVisible();
  });

  test('accepts a valid submission and confirms receipt', async ({ page }) => {
    await page.goto('/en/contact');

    await page.getByLabel('Name').fill('Test Person');
    await page.getByLabel('Company').fill('Test Contractor Ltd');
    await page.getByLabel('Work email').fill('test.person@testcontractor.com');
    await page
      .getByLabel('Project / use case')
      .fill('We would like to discuss a pilot on a live rail station package.');

    await page.getByRole('button', { name: 'Request Enterprise Demo' }).click();

    await expect(page.getByText('Request received.')).toBeVisible();
  });

  test('the API rejects a malformed payload', async ({ request }) => {
    const response = await request.post('/api/contact', { data: { name: 'x' } });
    expect(response.status()).toBe(422);
    expect((await response.json()).fieldErrors).toBeTruthy();
  });

  test('the API localises its validation errors', async ({ request }) => {
    const response = await request.post('/api/contact', { data: { name: 'x', locale: 'zh' } });
    expect(response.status()).toBe(422);
    const body = await response.json();
    expect(body.fieldErrors.name).toBe('请填写你的姓名。');
  });
});
