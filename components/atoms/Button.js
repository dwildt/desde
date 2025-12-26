/**
 * Button.js
 * Componente de botão reutilizável
 */

class Button {
  /**
   * Renderiza um botão
   * @param {Object} options - Opções do botão
   * @param {string} options.text - Texto do botão
   * @param {string} options.variant - Variante do botão (primary, secondary, danger)
   * @param {string} options.onClick - Função onClick
   * @param {string} options.ariaLabel - Label de acessibilidade
   * @param {string} options.type - Tipo do botão (button, submit, reset)
   * @returns {string} HTML do botão
   */
  static render({ text, variant = 'primary', onClick = '', ariaLabel = '', type = 'button' }) {
    const variantClass = `button-${variant}`;
    const ariaAttr = ariaLabel ? `aria-label="${ariaLabel}"` : '';
    const onClickAttr = onClick ? `onclick="${onClick}"` : '';

    return `
      <button
        type="${type}"
        class="button ${variantClass}"
        ${onClickAttr}
        ${ariaAttr}
        tabindex="0"
      >
        ${text}
      </button>
    `;
  }
}
