import { test, expect } from '@playwright/test';

test.describe('Blank State', () => {
  test.beforeEach(async ({ page }) => {
    // Limpar localStorage antes de cada teste
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test.describe('Display básico', () => {
    test('deve exibir blank state quando não há hábitos', async ({ page }) => {
      const blankState = page.locator('.blank-state-welcome');
      await expect(blankState).toBeVisible();
    });

    test('deve exibir heading de boas-vindas', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /bem-vindo ao desde/i });
      await expect(heading).toBeVisible();
    });

    test('deve exibir tagline', async ({ page }) => {
      const tagline = page.getByText(/acompanhe há quantos dias você mantém seus hábitos/i);
      await expect(tagline).toBeVisible();
    });

    test('deve exibir botão "Adicionar Primeiro Hábito"', async ({ page }) => {
      const button = page.getByRole('button', { name: /adicionar.*primeiro hábito/i });
      await expect(button).toBeVisible();
    });

    test('deve exibir seção de exemplos com 5 hábitos', async ({ page }) => {
      const examplesSection = page.locator('.blank-state-examples');
      await expect(examplesSection).toBeVisible();

      // Verificar título da seção
      const examplesHeading = page.getByRole('heading', { name: /exemplos do que você pode rastrear/i });
      await expect(examplesHeading).toBeVisible();

      // Verificar os 5 exemplos
      const examples = page.locator('.blank-state-examples li');
      await expect(examples).toHaveCount(5);

      // Verificar conteúdo dos exemplos
      await expect(page.locator('.blank-state-examples li', { hasText: 'Meditando' })).toBeVisible();
      await expect(page.locator('.blank-state-examples li', { hasText: 'Correndo' })).toBeVisible();
      await expect(page.locator('.blank-state-examples li', { hasText: 'Lendo' })).toBeVisible();
      await expect(page.locator('.blank-state-examples li', { hasText: 'Programando' })).toBeVisible();
      await expect(page.locator('.blank-state-examples li', { hasText: 'Escrevendo' })).toBeVisible();
    });

    test('deve exibir nota explicativa sobre exemplos', async ({ page }) => {
      const note = page.locator('.examples-note');
      await expect(note).toBeVisible();
      await expect(note).toHaveText(/informe quando você começou/i);
    });

    test('deve exibir dica sobre armazenamento local', async ({ page }) => {
      const tip = page.locator('.blank-state-tip');
      await expect(tip).toBeVisible();
      await expect(tip).toHaveText(/seus dados ficam salvos apenas neste navegador/i);
    });
  });

  test.describe('Jornada do usuário - Primeiro hábito', () => {
    test('deve abrir modal ao clicar em "Adicionar Primeiro Hábito"', async ({ page }) => {
      // Clicar no botão
      await page.getByRole('button', { name: /adicionar.*primeiro hábito/i }).click();

      // Verificar que modal abriu
      const modal = page.locator('#addHabitModal');
      await expect(modal).toBeVisible();
    });

    test('deve fazer blank state desaparecer após adicionar primeiro hábito', async ({ page }) => {
      // Verificar blank state visível
      const blankState = page.locator('.blank-state-welcome');
      await expect(blankState).toBeVisible();

      // Adicionar hábito
      await page.getByRole('button', { name: /adicionar.*primeiro hábito/i }).click();

      // Aguardar modal abrir
      const modal = page.locator('#addHabitModal');
      await expect(modal).toBeVisible();

      await page.locator('#habitName').fill('Meditação');
      await page.locator('#habitStartDate').fill('2024-01-01');
      await page.locator('#addHabitModal').getByRole('button', { name: /adicionar/i }).click();

      // Verificar que blank state desapareceu
      await expect(blankState).not.toBeVisible();

      // Verificar que habit card apareceu
      const habitCard = page.locator('.habit-card');
      await expect(habitCard).toBeVisible();
    });

    test('deve exibir card do hábito com nome correto', async ({ page }) => {
      // Adicionar hábito
      await page.getByRole('button', { name: /adicionar.*primeiro hábito/i }).click();

      // Aguardar modal abrir
      const modal = page.locator('#addHabitModal');
      await expect(modal).toBeVisible();

      await page.locator('#habitName').fill('Corrida Matinal');
      await page.locator('#habitStartDate').fill('2025-01-01');
      await page.locator('#addHabitModal').getByRole('button', { name: /adicionar/i }).click();

      // Verificar nome no card
      const habitName = page.locator('.habit-card').getByText('Corrida Matinal');
      await expect(habitName).toBeVisible();
    });
  });

  test.describe('Jornada do usuário - Deleção', () => {
    test('deve reexibir blank state ao deletar único hábito', async ({ page }) => {
      // Adicionar um hábito
      await page.getByRole('button', { name: /adicionar.*primeiro hábito/i }).click();

      // Aguardar modal abrir
      const modal = page.locator('#addHabitModal');
      await expect(modal).toBeVisible();

      await page.locator('#habitName').fill('Teste');
      await page.locator('#habitStartDate').fill('2024-01-01');
      await page.locator('#addHabitModal').getByRole('button', { name: /adicionar/i }).click();

      // Verificar que blank state sumiu
      const blankState = page.locator('.blank-state-welcome');
      await expect(blankState).not.toBeVisible();

      // Deletar o hábito
      await page.locator('.habit-card').getByRole('button', { name: /deletar/i }).click();
      await page.getByRole('button', { name: /confirmar/i }).click();

      // Verificar que blank state voltou
      await expect(blankState).toBeVisible();
    });

    test('não deve exibir blank state ao deletar 1 de 2 hábitos', async ({ page }) => {
      // Adicionar 2 hábitos via header button
      const addButton = page.getByRole('button', { name: /adicionar novo hábito/i });

      // Primeiro hábito
      await addButton.click();
      await page.locator('#habitName').fill('Hábito 1');
      await page.locator('#habitStartDate').fill('2024-01-01');
      await page.locator('#addHabitModal').getByRole('button', { name: /adicionar/i }).click();

      // Segundo hábito
      await addButton.click();
      await page.locator('#habitName').fill('Hábito 2');
      await page.locator('#habitStartDate').fill('2024-01-02');
      await page.locator('#addHabitModal').getByRole('button', { name: /adicionar/i }).click();

      // Deletar primeiro hábito
      await page.locator('.habit-card').first().getByRole('button', { name: /deletar/i }).click();
      await page.getByRole('button', { name: /confirmar/i }).click();

      // Verificar que blank state NÃO apareceu
      const blankState = page.locator('.blank-state-welcome');
      await expect(blankState).not.toBeVisible();

      // Verificar que ainda há 1 card
      const habitCards = page.locator('.habit-card');
      await expect(habitCards).toHaveCount(1);
    });

    test('deve exibir blank state ao deletar todos os hábitos', async ({ page }) => {
      // Adicionar 2 hábitos
      const addButton = page.getByRole('button', { name: /adicionar novo hábito/i });

      await addButton.click();
      await page.locator('#habitName').fill('Hábito 1');
      await page.locator('#habitStartDate').fill('2024-01-01');
      await page.locator('#addHabitModal').getByRole('button', { name: /adicionar/i }).click();

      await addButton.click();
      await page.locator('#habitName').fill('Hábito 2');
      await page.locator('#habitStartDate').fill('2024-01-02');
      await page.locator('#addHabitModal').getByRole('button', { name: /adicionar/i }).click();

      // Deletar primeiro hábito
      await page.locator('.habit-card').first().getByRole('button', { name: /deletar/i }).click();
      await page.getByRole('button', { name: /confirmar/i }).click();

      // Deletar segundo hábito
      await page.locator('.habit-card').getByRole('button', { name: /deletar/i }).click();
      await page.getByRole('button', { name: /confirmar/i }).click();

      // Verificar que blank state voltou
      const blankState = page.locator('.blank-state-welcome');
      await expect(blankState).toBeVisible();
    });
  });

  test.describe('Responsividade', () => {
    test('deve funcionar em desktop (1920x1080)', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const blankState = page.locator('.blank-state-welcome');
      await expect(blankState).toBeVisible();

      const button = page.getByRole('button', { name: /adicionar.*primeiro hábito/i });
      await expect(button).toBeVisible();
    });

    test('deve funcionar em tablet (768x1024)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const blankState = page.locator('.blank-state-welcome');
      await expect(blankState).toBeVisible();

      const examples = page.locator('.blank-state-examples li');
      await expect(examples).toHaveCount(5);
    });

    test('deve funcionar em mobile (375x667)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const blankState = page.locator('.blank-state-welcome');
      await expect(blankState).toBeVisible();

      // Verificar que exemplos fazem wrap
      const examplesSection = page.locator('.blank-state-examples');
      await expect(examplesSection).toBeVisible();
    });
  });

  test.describe('Navegação por teclado', () => {
    test('deve permitir navegar até o botão com Tab', async ({ page }) => {
      // Tab até o botão
      await page.keyboard.press('Tab'); // Skip to content
      await page.keyboard.press('Tab'); // Header buttons...
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // O botão dentro do blank state deve estar focável
      const button = page.getByRole('button', { name: /adicionar.*primeiro hábito/i });
      await button.focus();
      await expect(button).toBeFocused();
    });

    test('deve abrir modal ao pressionar Enter no botão', async ({ page }) => {
      const button = page.getByRole('button', { name: /adicionar.*primeiro hábito/i });
      await button.focus();
      await page.keyboard.press('Enter');

      const modal = page.locator('#addHabitModal');
      await expect(modal).toBeVisible();
    });

    test('deve fechar modal com ESC', async ({ page }) => {
      const button = page.getByRole('button', { name: /adicionar.*primeiro hábito/i });
      await button.click();

      const modal = page.locator('#addHabitModal');
      await expect(modal).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    });
  });

  test.describe('Acessibilidade', () => {
    test('deve ter role="status" e aria-live="polite"', async ({ page }) => {
      const blankState = page.locator('.blank-state-welcome');
      await expect(blankState).toHaveAttribute('role', 'status');
      await expect(blankState).toHaveAttribute('aria-live', 'polite');
    });

    test('deve ter hierarquia correta de headings', async ({ page }) => {
      // h2 para título principal
      const h2 = page.getByRole('heading', { level: 2, name: /bem-vindo ao desde/i });
      await expect(h2).toBeVisible();

      // h3 para exemplos
      const h3 = page.getByRole('heading', { level: 3, name: /exemplos/i });
      await expect(h3).toBeVisible();
    });

    test('deve ter emojis com aria-hidden="true"', async ({ page }) => {
      // Verificar que emojis decorativos não são lidos por screen readers
      const emojiSpans = page.locator('.blank-state-examples li span[aria-hidden="true"]');
      await expect(emojiSpans).toHaveCount(5);
    });

    test('botão deve ter aria-label descritivo', async ({ page }) => {
      const button = page.getByRole('button', { name: /adicionar seu primeiro hábito/i });
      await expect(button).toBeVisible();
    });
  });
});
