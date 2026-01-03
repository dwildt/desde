import { test, expect } from '@playwright/test';

test.describe('Header Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve exibir botões principais no header', async ({ page }) => {
    // Verifica botão Adicionar Hábito
    const addButton = page.getByRole('button', { name: /adicionar novo hábito/i });
    await expect(addButton).toBeVisible();

    // Verifica View Mode Toggle (Grid e List)
    const gridButton = page.getByRole('button', { name: /visualização em grade/i });
    const listButton = page.getByRole('button', { name: /visualização em lista/i });
    await expect(gridButton).toBeVisible();
    await expect(listButton).toBeVisible();

    // Verifica botão Menu
    const menuButton = page.getByRole('button', { name: /abrir menu/i });
    await expect(menuButton).toBeVisible();
  });

  test('deve abrir modal do menu ao clicar no botão hambúrguer', async ({ page }) => {
    // Clicar no botão de menu
    await page.getByRole('button', { name: /abrir menu/i }).click();

    // Verificar que o modal está visível
    const modal = page.locator('#headerMenu');
    await expect(modal).toBeVisible();

    // Verificar título do modal
    const title = modal.getByRole('heading', { name: /menu/i });
    await expect(title).toBeVisible();
  });

  test('deve exibir todas as opções dentro do menu', async ({ page }) => {
    // Abrir menu
    await page.getByRole('button', { name: /abrir menu/i }).click();

    const modal = page.locator('#headerMenu');

    // Verificar Sort Select
    const sortLabel = modal.getByText(/ordenar por/i);
    await expect(sortLabel).toBeVisible();

    const sortSelect = modal.locator('.header-menu-select');
    await expect(sortSelect).toBeVisible();

    // Verificar botão Import/Export
    const importExportButton = modal.getByRole('button', { name: /importar ou exportar/i });
    await expect(importExportButton).toBeVisible();

    // Verificar botão Stories
    const storiesButton = modal.getByRole('button', { name: /visualizar.*stories/i });
    await expect(storiesButton).toBeVisible();

    // Verificar Theme Toggle
    const themeToggle = modal.locator('.theme-toggle');
    await expect(themeToggle).toBeVisible();
  });

  test('deve fechar modal ao clicar no botão X', async ({ page }) => {
    // Abrir menu
    await page.getByRole('button', { name: /abrir menu/i }).click();

    const modal = page.locator('#headerMenu');
    await expect(modal).toBeVisible();

    // Clicar no botão de fechar
    await modal.getByRole('button', { name: /fechar menu/i }).click();

    // Verificar que o modal foi fechado
    await expect(modal).not.toBeVisible();
  });

  test('deve fechar modal ao clicar no overlay', async ({ page }) => {
    // Abrir menu
    await page.getByRole('button', { name: /abrir menu/i }).click();

    const modal = page.locator('#headerMenu');
    await expect(modal).toBeVisible();

    // Clicar no overlay
    await page.locator('.modal-overlay').first().click();

    // Verificar que o modal foi fechado
    await expect(modal).not.toBeVisible();
  });

  test('deve fechar modal ao pressionar ESC', async ({ page }) => {
    // Abrir menu
    await page.getByRole('button', { name: /abrir menu/i }).click();

    const modal = page.locator('#headerMenu');
    await expect(modal).toBeVisible();

    // Pressionar ESC
    await page.keyboard.press('Escape');

    // Verificar que o modal foi fechado
    await expect(modal).not.toBeVisible();
  });

  test('deve alterar ordenação via select no menu', async ({ page }) => {
    // Abrir menu
    await page.getByRole('button', { name: /abrir menu/i }).click();

    const sortSelect = page.locator('.header-menu-select');

    // Verificar valor padrão
    await expect(sortSelect).toHaveValue('date');

    // Mudar para ordenação por nome
    await sortSelect.selectOption('name');
    await expect(sortSelect).toHaveValue('name');

    // Mudar para ordenação por dias
    await sortSelect.selectOption('days');
    await expect(sortSelect).toHaveValue('days');
  });

  test('deve manter ordenação após fechar e reabrir menu', async ({ page }) => {
    // Abrir menu e mudar ordenação
    await page.getByRole('button', { name: /abrir menu/i }).click();
    await page.locator('.header-menu-select').selectOption('name');

    // Fechar menu
    await page.getByRole('button', { name: /fechar menu/i }).click();

    // Reabrir menu
    await page.getByRole('button', { name: /abrir menu/i }).click();

    // Verificar que ordenação foi mantida
    const sortSelect = page.locator('.header-menu-select');
    await expect(sortSelect).toHaveValue('name');
  });

  test.describe('Responsividade', () => {
    test('deve funcionar em desktop (1920x1080)', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const menuButton = page.getByRole('button', { name: /abrir menu/i });
      await expect(menuButton).toBeVisible();

      await menuButton.click();
      const modal = page.locator('#headerMenu');
      await expect(modal).toBeVisible();
    });

    test('deve funcionar em tablet (768x1024)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const menuButton = page.getByRole('button', { name: /abrir menu/i });
      await expect(menuButton).toBeVisible();

      await menuButton.click();
      const modal = page.locator('#headerMenu');
      await expect(modal).toBeVisible();
    });

    test('deve funcionar em mobile (375x667)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const menuButton = page.getByRole('button', { name: /abrir menu/i });
      await expect(menuButton).toBeVisible();

      await menuButton.click();
      const modal = page.locator('#headerMenu');
      await expect(modal).toBeVisible();
    });
  });

  test.describe('Integração com outras funcionalidades', () => {
    test('deve abrir modal de Import/Export via menu', async ({ page }) => {
      // Abrir menu
      await page.getByRole('button', { name: /abrir menu/i }).click();

      // Clicar em Import/Export
      await page.getByRole('button', { name: /importar ou exportar/i }).click();

      // Verificar que modal de Import/Export abriu
      const importExportModal = page.locator('#importExportModal');
      await expect(importExportModal).toBeVisible();
    });

    test('deve abrir Stories via menu', async ({ page }) => {
      // Primeiro adicionar um hábito (necessário para Stories)
      await page.getByRole('button', { name: /adicionar novo hábito/i }).click();
      await page.locator('#habitName').fill('Teste');
      await page.locator('#habitDate').fill('2024-01-01');
      await page.getByRole('button', { name: /salvar/i }).click();

      // Abrir menu
      await page.getByRole('button', { name: /abrir menu/i }).click();

      // Clicar em Stories
      await page.getByRole('button', { name: /visualizar.*stories/i }).click();

      // Verificar que Stories abriu
      const storyModal = page.locator('#storyView');
      await expect(storyModal).toBeVisible();
    });

    test('deve alternar tema via menu', async ({ page }) => {
      // Obter tema atual
      const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

      // Abrir menu
      await page.getByRole('button', { name: /abrir menu/i }).click();

      // Clicar no theme toggle
      await page.locator('.theme-toggle').click();

      // Verificar que tema mudou
      const newTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
      expect(newTheme).not.toBe(initialTheme);
    });
  });
});
