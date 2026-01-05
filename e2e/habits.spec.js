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

    // Clicar no botão de adicionar (do blank state ou header)
    await page.getByRole('button', { name: /adicionar.*hábito/i }).first().click();

    // Preencher formulário
    await page.fill('#habitName', 'Meditação');
    await page.fill('#habitStartDate', '2025-12-20');

    // Submeter formulário usando aria-label
    await page.getByRole('button', { name: /salvar novo hábito/i }).click();

    // Aguardar modal fechar
    await expect(page.locator('#addHabitModal')).not.toBeVisible();

    // Verificar que o hábito foi adicionado
    await expect(page.locator('.habit-name:has-text("Meditação")')).toBeVisible();

    // Verificar que temos 1 hábito agora (sem hábitos pré-cadastrados)
    const habitCards = page.locator('.habit-card');
    await expect(habitCards).toHaveCount(1);
  });

  test('deve deletar um hábito', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Primeiro adicionar um hábito
    await page.getByRole('button', { name: /adicionar.*hábito/i }).first().click();
    await page.fill('#habitName', 'Teste');
    await page.fill('#habitStartDate', '2025-01-01');
    await page.getByRole('button', { name: /salvar novo hábito/i }).click();
    await expect(page.locator('#addHabitModal')).not.toBeVisible();

    // Verificar que hábito foi criado
    await expect(page.locator('.habit-card')).toHaveCount(1);

    // Clicar no botão de deletar do primeiro hábito
    await page.locator('.habit-delete-btn').first().click();

    // Confirmar deleção no modal
    await page.click('button:has-text("Deletar")');

    // Verificar que hábito foi removido e blank state voltou
    await expect(page.locator('.habit-card')).toHaveCount(0);
    await expect(page.locator('.blank-state-welcome')).toBeVisible();
  });

  test('deve cancelar deleção de hábito', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Primeiro adicionar um hábito
    await page.getByRole('button', { name: /adicionar.*hábito/i }).first().click();
    await page.fill('#habitName', 'Teste');
    await page.fill('#habitStartDate', '2025-01-01');
    await page.getByRole('button', { name: /salvar novo hábito/i }).click();
    await expect(page.locator('#addHabitModal')).not.toBeVisible();

    // Verificar que hábito foi criado
    await expect(page.locator('.habit-card')).toHaveCount(1);

    // Clicar no botão de deletar
    await page.locator('.habit-delete-btn').first().click();

    // Cancelar deleção (usar seletor específico do modal de confirmação)
    await page.locator('#confirmDialog button:has-text("Cancelar")').click();

    // Verificar que hábito ainda existe
    await expect(page.locator('.habit-card')).toHaveCount(1);
  });

  test('não deve submeter formulário vazio', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Abrir modal
    await page.getByRole('button', { name: /adicionar.*hábito/i }).first().click();

    // Aguardar modal abrir
    await expect(page.locator('#addHabitModal')).toBeVisible();

    // Tentar submeter sem preencher
    await page.getByRole('button', { name: /salvar novo hábito/i }).click();

    // Modal deve continuar aberto (verificar que o modal existe)
    await expect(page.locator('#addHabitModal')).toBeVisible();
  });
});
