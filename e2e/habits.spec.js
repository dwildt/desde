/**
 * habits.spec.js
 * Testes E2E para fluxo principal de hábitos
 */

const { test, expect } = require('@playwright/test');

test.describe('Fluxo Principal de Hábitos', () => {
  test.beforeEach(async ({ page }) => {
    // Limpar localStorage antes de cada teste
    await page.goto('http://localhost:3000');
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
  });

  test('deve carregar a página com blank state quando não há hábitos', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Verificar título
    await expect(page).toHaveTitle(/Desde/);

    // Verificar que blank state está visível
    const blankState = page.locator('.blank-state-welcome');
    await expect(blankState).toBeVisible();

    // Verificar que não há habit cards
    const habitCards = page.locator('.habit-card');
    await expect(habitCards).toHaveCount(0);
  });

  test('deve adicionar um novo hábito', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Clicar no botão de adicionar
    await page.click('button:has-text("Adicionar Hábito")');

    // Preencher formulário
    await page.fill('#habitName', 'Meditação');
    await page.fill('#habitStartDate', '2025-12-20');

    // Submeter formulário
    await page.click('button[type="submit"]:has-text("Adicionar")');

    // Verificar que o hábito foi adicionado
    await expect(page.locator('.habit-name:has-text("Meditação")')).toBeVisible();

    // Verificar que temos 4 hábitos agora (3 pré-cadastrados + 1 novo)
    const habitCards = page.locator('.habit-card');
    await expect(habitCards).toHaveCount(4);
  });

  test('deve deletar um hábito', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Contar hábitos iniciais
    const initialCount = await page.locator('.habit-card').count();

    // Clicar no botão de deletar do primeiro hábito
    await page.locator('.habit-delete-btn').first().click();

    // Confirmar deleção no modal
    await page.click('button:has-text("Deletar")');

    // Verificar que um hábito foi removido
    const newCount = await page.locator('.habit-card').count();
    expect(newCount).toBe(initialCount - 1);
  });

  test('deve cancelar deleção de hábito', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Contar hábitos iniciais
    const initialCount = await page.locator('.habit-card').count();

    // Clicar no botão de deletar
    await page.locator('.habit-delete-btn').first().click();

    // Cancelar deleção (usar seletor específico do modal de confirmação)
    await page.locator('#confirmDialog button:has-text("Cancelar")').click();

    // Verificar que nenhum hábito foi removido
    const newCount = await page.locator('.habit-card').count();
    expect(newCount).toBe(initialCount);
  });

  test('não deve submeter formulário vazio', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Abrir modal
    await page.click('button:has-text("Adicionar Hábito")');

    // Tentar submeter sem preencher
    await page.click('button[type="submit"]:has-text("Adicionar")');

    // Modal deve continuar aberto (verificar que o modal existe)
    await expect(page.locator('#addHabitModal')).toBeVisible();
  });
});
