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

  /*
   * The panel was once rendered inside `.site-header`, whose backdrop-filter makes it
   * the containing block for `position: fixed` descendants. Its `inset: 66px 0 0`
   * resolved against the 66px-tall header, so it opened as a 65px sliver: populated,
   * technically "visible" to Playwright, and showing nothing. Asserting visibility is
   * therefore not enough - the panel has to be measured against the viewport, and
   * every link it contains has to be inside it.
   */
  test('the open mobile panel fills the screen and shows every link', async ({
    page,
    isMobile,
    viewport
  }) => {
    test.skip(!isMobile, 'Hamburger is only rendered below 980px.');

    await page.goto('/en');
    await page.getByRole('button', { name: 'Open menu' }).click();

    const panel = page.locator('#mobile-nav-panel');
    const box = await panel.boundingBox();
    expect(box).not.toBeNull();
    // Everything below the header, give or take a pixel of rounding.
    expect(box!.height).toBeGreaterThan(viewport!.height * 0.8);
    expect(box!.width).toBeCloseTo(viewport!.width, 0);

    const links = panel.getByRole('link');
    const count = await links.count();
    expect(count).toBeGreaterThan(5);
    for (let i = 0; i < count; i += 1) {
      const link = await links.nth(i).boundingBox();
      expect(link).not.toBeNull();
      expect(link!.y).toBeGreaterThanOrEqual(box!.y - 1);
      expect(link!.y + link!.height).toBeLessThanOrEqual(box!.y + box!.height + 1);
    }
  });

  test('the header row never overflows a phone screen', async ({ page, isMobile, viewport }) => {
    test.skip(!isMobile, 'Only the phone layout is at risk of overflowing.');

    await page.goto('/zh');
    // The toggle is the only way into the navigation, so it must never be the
    // thing that gets flex-shrunk off the edge when the row runs out of room.
    const toggle = await page.locator('.nav-toggle').boundingBox();
    expect(toggle).not.toBeNull();
    expect(toggle!.width).toBeGreaterThanOrEqual(40);
    expect(toggle!.x + toggle!.width).toBeLessThanOrEqual(viewport!.width);

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewport!.width);
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
