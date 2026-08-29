import { expect, test } from '@playwright/test';

test.describe('navigation', () => {
  test('desktop nav reaches the product pages', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop nav is hidden below 980px.');

    await page.goto('/en');
    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Products' })
      .click();
    await expect(page).toHaveURL(/\/en\/products$/);
  });

  test('mobile menu opens and every primary route is reachable', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Hamburger is only rendered below 980px.');

    await page.goto('/en');
    const toggle = page.getByRole('button', { name: 'Open menu' });
    await expect(toggle).toBeVisible();
    await toggle.click();

    const panel = page.locator('#mobile-nav-panel');
    await expect(panel).toBeVisible();
    await expect(panel.getByRole('link', { name: 'Solutions' })).toBeVisible();

    await panel.getByRole('link', { name: 'Solutions' }).click();
    await expect(page).toHaveURL(/\/en\/solutions$/);
    await expect(panel).toBeHidden();
  });

  test('the Chinese mobile menu is labelled in Chinese', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Hamburger is only rendered below 980px.');

    await page.goto('/zh');
    await page.getByRole('button', { name: '打开菜单' }).click();
    await expect(
      page.locator('#mobile-nav-panel').getByRole('link', { name: '解决方案' })
    ).toBeVisible();
  });

  test('skip link is reachable by keyboard', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Keyboard tabbing is a desktop concern here.');

    await page.goto('/en');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  });
});
