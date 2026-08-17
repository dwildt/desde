import { test, expect } from '@playwright/test';

const openMenu = async (page) => {
  await page.getByRole('button', { name: /abrir menu/i }).click();
};

const toggleTheme = async (page) => {
  await page.locator('.theme-toggle').click();
};

test.describe('Tema Dark/Light', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('desde-has-visited', 'true');
    });
    await page.reload();
  });

  test('deve carregar com tema light por padrão', async ({ page }) => {
    const theme = await page.getAttribute('html', 'data-theme');
    expect(theme === 'light' || theme === null).toBeTruthy();
  });

  test('deve alternar para tema dark', async ({ page }) => {
    await openMenu(page);
    await toggleTheme(page);

    const theme = await page.getAttribute('html', 'data-theme');
    expect(theme).toBe('dark');
  });

  test('deve persistir tema após reload', async ({ page }) => {
    await openMenu(page);
    await toggleTheme(page);
    await page.reload();

    const theme = await page.getAttribute('html', 'data-theme');
    expect(theme).toBe('dark');
  });

  test('deve alternar entre dark e light múltiplas vezes', async ({ page }) => {
    await openMenu(page);

    await toggleTheme(page);
    let theme = await page.getAttribute('html', 'data-theme');
    expect(theme).toBe('dark');

    await toggleTheme(page);
    theme = await page.getAttribute('html', 'data-theme');
    expect(theme).toBe('light');

    await toggleTheme(page);
    theme = await page.getAttribute('html', 'data-theme');
    expect(theme).toBe('dark');
  });
});
