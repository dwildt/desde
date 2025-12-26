/**
 * Icon.js
 * Componente de ícone (emoji) reutilizável
 */

class Icon {
  /**
   * Renderiza um ícone
   * @param {Object} options - Opções do ícone
   * @param {string} options.emoji - Emoji a ser exibido
   * @param {string} options.ariaLabel - Label de acessibilidade
   * @returns {string} HTML do ícone
   */
  static render({ emoji, ariaLabel = '' }) {
    const ariaAttr = ariaLabel ? `aria-label="${ariaLabel}"` : 'aria-hidden="true"';

    return `
      <span class="icon" ${ariaAttr}>${emoji}</span>
    `;
  }
}
