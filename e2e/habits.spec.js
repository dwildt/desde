import { test, expect } from '@playwright/test';

test.describe('Fluxo Principal de Hábitos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('desde-has-visited', 'true');
    });
    await page.reload();
  });

  test('deve carregar a página com blank state quando não há hábitos', async ({ page }) => {
    await expect(page).toHaveTitle(/Desde/);
    await expect(page.locator('.blank-state-welcome')).toBeVisible();
    await expect(page.locator('.habit-card')).toHaveCount(0);
  });

  test('deve adicionar um novo hábito', async ({ page }) => {
    await page.getByRole('button', { name: /adicionar.*hábito/i }).first().click();
    await page.fill('#habitName', 'Meditação');
    await page.fill('#habitStartDate', '2025-12-20');
    await page.getByRole('button', { name: /salvar novo hábito/i }).click();

    await expect(page.locator('#addHabitModal')).not.toBeVisible();
    await expect(page.locator('.habit-name:has-text("Meditação")')).toBeVisible();
    await expect(page.locator('.habit-card')).toHaveCount(1);
  });

  test('deve deletar um hábito', async ({ page }) => {
    await page.getByRole('button', { name: /adicionar.*hábito/i }).first().click();
    await page.fill('#habitName', 'Teste');
    await page.fill('#habitStartDate', '2025-01-01');
    await page.getByRole('button', { name: /salvar novo hábito/i }).click();
    await expect(page.locator('#addHabitModal')).not.toBeVisible();
    await expect(page.locator('.habit-card')).toHaveCount(1);

    await page.locator('.habit-delete-btn').first().click();
    await page.click('button:has-text("Deletar")');

    await expect(page.locator('.habit-card')).toHaveCount(0);
    await expect(page.locator('.blank-state-welcome')).toBeVisible();
  });

  test('deve cancelar deleção de hábito', async ({ page }) => {
    await page.getByRole('button', { name: /adicionar.*hábito/i }).first().click();
    await page.fill('#habitName', 'Teste');
    await page.fill('#habitStartDate', '2025-01-01');
    await page.getByRole('button', { name: /salvar novo hábito/i }).click();
    await expect(page.locator('#addHabitModal')).not.toBeVisible();
    await expect(page.locator('.habit-card')).toHaveCount(1);

    await page.locator('.habit-delete-btn').first().click();
    await page.locator('#confirmDialog button:has-text("Cancelar")').click();

    await expect(page.locator('.habit-card')).toHaveCount(1);
  });

  test('não deve submeter formulário vazio', async ({ page }) => {
    await page.getByRole('button', { name: /adicionar.*hábito/i }).first().click();
    await expect(page.locator('#addHabitModal')).toBeVisible();

    await page.getByRole('button', { name: /salvar novo hábito/i }).click();

    await expect(page.locator('#addHabitModal')).toBeVisible();
  });
});
