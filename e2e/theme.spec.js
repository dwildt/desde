/**
 * theme.spec.js
 * Testes E2E para funcionalidade de tema
 */

const { test, expect } = require('@playwright/test');

test.describe('Tema Dark/Light', () => {
  test.beforeEach(async ({ page }) => {
    // Limpar localStorage antes de cada teste
    await page.goto('http://localhost:3000');
    await page.evaluate(() => {
      localStorage.clear();
      // Marcar como já visitado para não mostrar o WelcomeModal
      localStorage.setItem('desde-has-visited', 'true');
    });
    await page.reload();
  });

  test('deve carregar com tema light por padrão', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Verificar que o atributo data-theme é light ou não existe
    const theme = await page.getAttribute('html', 'data-theme');
    expect(theme === 'light' || theme === null).toBeTruthy();
  });

  test('deve alternar para tema dark', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Clicar no botão de toggle
    await page.click('.theme-toggle');

    // Verificar que mudou para dark
    const theme = await page.getAttribute('html', 'data-theme');
    expect(theme).toBe('dark');
  });

  test('deve persistir tema após reload', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Alternar para dark
    await page.click('.theme-toggle');

    // Recarregar página
    await page.reload();

    // Verificar que manteve dark
    const theme = await page.getAttribute('html', 'data-theme');
    expect(theme).toBe('dark');
  });

  test('deve alternar entre dark e light múltiplas vezes', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Light -> Dark
    await page.click('.theme-toggle');
    let theme = await page.getAttribute('html', 'data-theme');
    expect(theme).toBe('dark');

    // Dark -> Light
    await page.click('.theme-toggle');
    theme = await page.getAttribute('html', 'data-theme');
    expect(theme).toBe('light');

    // Light -> Dark novamente
    await page.click('.theme-toggle');
    theme = await page.getAttribute('html', 'data-theme');
    expect(theme).toBe('dark');
  });
});
