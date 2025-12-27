/**
 * ThemeToggle.js
 * Componente de toggle dark/light mode
 */

class ThemeToggle {
  /**
   * Renderiza o botão de toggle de tema
   * @returns {string} HTML do toggle
   */
  static render() {
    return `
      <button
        class="theme-toggle"
        data-action="toggle-theme"
        aria-label="Alternar entre tema claro e escuro"
        data-tooltip="Alternar tema"
        tabindex="0"
      >
        <span class="theme-icon" aria-hidden="true">🌙</span>
      </button>
    `;
  }
}
