import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const tmpDir = process.cwd();

const openImportExportModal = async (page) => {
  await page.getByRole('button', { name: /abrir menu/i }).click();
  await page.getByRole('button', { name: /importar ou exportar/i }).click();
  await expect(page.locator('#importExportModal')).toBeVisible();
};

test.describe('Import/Export de Dados', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('desde-has-visited', 'true');
    });
    await page.reload();
  });

  test('deve abrir modal de import/export', async ({ page }) => {
    await openImportExportModal(page);
    await expect(page.locator('h2:has-text("Importar / Exportar Dados")')).toBeVisible();
  });

  test('deve exportar dados para JSON', async ({ page }) => {
    await openImportExportModal(page);

    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("Baixar JSON")');
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/desde-backup-\d{4}-\d{2}-\d{2}\.json/);

    const downloadPath = await download.path();
    const content = fs.readFileSync(downloadPath, 'utf-8');
    const data = JSON.parse(content);

    expect(data).toHaveProperty('exportDate');
    expect(data).toHaveProperty('version');
    expect(data).toHaveProperty('data');
    expect(data.data).toHaveProperty('habits');
    expect(Array.isArray(data.data.habits)).toBeTruthy();
  });

  test('deve importar dados válidos de JSON', async ({ page }) => {
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
      settings: { theme: 'light', language: 'pt' }
    };

    const tmpPath = path.join(tmpDir, 'tmp-import-test.json');
    fs.writeFileSync(tmpPath, JSON.stringify(testData));

    try {
      await openImportExportModal(page);

      const fileInput = page.locator('#importFileInput');
      page.once('dialog', dialog => dialog.accept());
      await fileInput.setInputFiles(tmpPath);
      await page.waitForTimeout(500);

      await expect(page.locator('.habit-name:has-text("Hábito Importado")')).toBeVisible();
    } finally {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    }
  });

  test('deve rejeitar JSON inválido', async ({ page }) => {
    const tmpPath = path.join(tmpDir, 'tmp-invalid-test.json');
    fs.writeFileSync(tmpPath, JSON.stringify({ invalid: 'data' }));

    try {
      await openImportExportModal(page);

      let alertMessage = '';
      page.once('dialog', async dialog => {
        alertMessage = dialog.message();
        await dialog.accept();
      });

      const fileInput = page.locator('#importFileInput');
      await fileInput.setInputFiles(tmpPath);
      await page.waitForTimeout(500);

      expect(alertMessage).toContain('Erro');
    } finally {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    }
  });
});
