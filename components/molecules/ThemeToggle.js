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
      <button class="theme-toggle" onclick="toggleTheme()" aria-label="Alternar tema">
        <span class="theme-icon">🌙</span>
      </button>
    `;
  }
}
