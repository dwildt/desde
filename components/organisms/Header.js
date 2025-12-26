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
    return `
      <header class="header" role="banner">
        <div class="container">
          <div class="header-content">
            <h1>🗓️ Desde</h1>
            <nav class="header-actions" role="navigation" aria-label="Ações principais">
              ${Button.render({
                text: '+ Adicionar Hábito',
                variant: 'primary',
                onClick: 'AddHabitModal.open()',
                ariaLabel: 'Adicionar novo hábito'
              })}
              ${Button.render({
                text: '💾',
                variant: 'secondary',
                onClick: 'ImportExportModal.open()',
                ariaLabel: 'Importar ou Exportar dados'
              })}
              ${ThemeToggle.render()}
            </nav>
          </div>
        </div>
      </header>
    `;
  }
}
