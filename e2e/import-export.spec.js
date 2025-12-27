/**
 * import-export.spec.js
 * Testes E2E para Import/Export de dados
 */

const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Import/Export de Dados', () => {
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

  test('deve abrir modal de import/export', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Clicar no botão de import/export (💾)
    await page.click('button[aria-label="Importar ou Exportar dados"]');

    // Verificar que modal está visível
    await expect(page.locator('#importExportModal')).toBeVisible();
    await expect(page.locator('h2:has-text("Importar / Exportar Dados")')).toBeVisible();
  });

  test('deve exportar dados para JSON', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Abrir modal
    await page.click('button[aria-label="Importar ou Exportar dados"]');

    // Configurar listener para download
    const downloadPromise = page.waitForEvent('download');

    // Clicar em exportar
    await page.click('button:has-text("Baixar JSON")');

    // Aguardar download
    const download = await downloadPromise;

    // Verificar nome do arquivo
    expect(download.suggestedFilename()).toMatch(/desde-backup-\d{4}-\d{2}-\d{2}\.json/);

    // Salvar arquivo temporariamente e verificar conteúdo
    const downloadPath = await download.path();
    const fs = require('fs');
    const content = fs.readFileSync(downloadPath, 'utf-8');
    const data = JSON.parse(content);

    // Verificar estrutura do JSON
    expect(data).toHaveProperty('exportDate');
    expect(data).toHaveProperty('version');
    expect(data).toHaveProperty('data');
    expect(data.data).toHaveProperty('habits');
    expect(Array.isArray(data.data.habits)).toBeTruthy();
  });

  test('deve importar dados válidos de JSON', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Criar arquivo JSON de teste
    const testData = {
      exportDate: new Date().toISOString(),
      version: '1.0.0',
      data: {
        habits: [
          {
            id: 'test-1',
            name: 'Hábito Importado',
            startDate: '2025-01-01',
            createdAt: new Date().toISOString()
          }
        ]
      },
      settings: {
        theme: 'light',
        language: 'pt'
      }
    };

    // Criar arquivo temporário
    const fs = require('fs');
    const tmpPath = path.join(__dirname, '../tmp-import-test.json');
    fs.writeFileSync(tmpPath, JSON.stringify(testData));

    // Abrir modal
    await page.click('button[aria-label="Importar ou Exportar dados"]');

    // Upload do arquivo
    const fileInput = page.locator('#importFileInput');
    await fileInput.setInputFiles(tmpPath);

    // Aguardar alert de sucesso e aceitar
    page.once('dialog', dialog => dialog.accept());

    // Aguardar um pouco para processar
    await page.waitForTimeout(500);

    // Verificar que o hábito importado está visível
    await expect(page.locator('.habit-name:has-text("Hábito Importado")')).toBeVisible();

    // Limpar arquivo temporário
    fs.unlinkSync(tmpPath);
  });

  test('deve rejeitar JSON inválido', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Criar arquivo JSON inválido
    const invalidData = {
      invalid: 'data'
    };

    const fs = require('fs');
    const tmpPath = path.join(__dirname, '../tmp-invalid-test.json');
    fs.writeFileSync(tmpPath, JSON.stringify(invalidData));

    // Abrir modal
    await page.click('button[aria-label="Importar ou Exportar dados"]');

    // Configurar listener para o alert de erro
    let alertMessage = '';
    page.once('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    // Upload do arquivo
    const fileInput = page.locator('#importFileInput');
    await fileInput.setInputFiles(tmpPath);

    // Aguardar processamento
    await page.waitForTimeout(500);

    // Verificar que mostrou erro
    expect(alertMessage).toContain('Erro');

    // Limpar arquivo temporário
    fs.unlinkSync(tmpPath);
  });
});
