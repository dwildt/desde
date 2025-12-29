/**
 * Header.js
 * Componente de cabeçalho com ThemeToggle
 */

class Header {
  /**
   * Renderiza o header
   * @returns {string} HTML do header
   */
  static render() {
    // Extrair botões para variáveis ANTES do template
    const addHabitButton = Button.render({
      text: '+ Adicionar Hábito',
      variant: 'primary',
      action: 'open-modal',
      actionData: { modalId: 'addHabitModal' },
      ariaLabel: 'Adicionar novo hábito'
    });

    const importExportButton = Button.render({
      text: '💾',
      variant: 'secondary',
      action: 'open-modal',
      actionData: { modalId: 'importExportModal' },
      ariaLabel: 'Importar ou Exportar dados'
    });

    const storyButton = Button.render({
      text: '📸',
      variant: 'secondary',
      action: 'open-story',
      actionData: { index: 0 },
      ariaLabel: 'Visualizar no modo Stories'
    });

    const sortSelector = SortSelector.render();
    const viewModeToggle = ViewModeToggle.render();
    const themeToggle = ThemeToggle.render();

    return `
      <header class="header" role="banner">
        <div class="container">
          <div class="header-content">
            <h1>🗓️ Desde</h1>
            <nav class="header-actions" role="navigation" aria-label="Ações principais">
              ${addHabitButton}
              ${importExportButton}
              ${storyButton}
              ${sortSelector}
              ${viewModeToggle}
              ${themeToggle}
            </nav>
          </div>
        </div>
      </header>
    `;
  }
}
