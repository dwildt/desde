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
      <header class="header">
        <div class="container">
          <div class="header-content">
            <h1>🗓️ Desde</h1>
            ${ThemeToggle.render()}
          </div>
        </div>
      </header>
    `;
  }
}
