/**
 * Header.js
 * Componente de cabeçalho simplificado com menu hambúrguer
 * Padronizado para todas as resoluções (desktop + mobile)
 */

/* global Button, ViewModeToggle */

class Header {
  /**
   * Renderiza o header
   * @returns {string} HTML do header
   */
  static render() {
    // Botões principais sempre visíveis
    const addHabitButton = Button.render({
      text: '+ Adicionar Hábito',
      variant: 'primary',
      action: 'open-modal',
      actionData: { modalId: 'addHabitModal' },
      ariaLabel: 'Adicionar novo hábito'
    });

    const viewModeToggle = ViewModeToggle.render();

    // Menu hambúrguer com ações secundárias
    const menuButton = Button.render({
      text: '☰',
      variant: 'secondary',
      action: 'open-modal',
      actionData: { modalId: 'headerMenu' },
      ariaLabel: 'Abrir menu'
    });

    return `
      <header class="header" role="banner">
        <div class="container">
          <div class="header-content">
            <h1>🗓️ Desde</h1>
            <nav class="header-actions" role="navigation" aria-label="Ações principais">
              ${addHabitButton}
              ${viewModeToggle}
              ${menuButton}
            </nav>
          </div>
        </div>
      </header>
    `;
  }
}
