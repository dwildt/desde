/**
 * Button.js
 * Componente de botão reutilizável
 */

class Button {
  /**
   * Escapa HTML para prevenir XSS
   * @param {string} str - String para escapar
   * @returns {string} String escapada
   */
  static escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Converte camelCase para kebab-case
   * @param {string} str - String em camelCase
   * @returns {string} String em kebab-case
   */
  static toKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  /**
   * Renderiza um botão
   * @param {Object} options - Opções do botão
   * @param {string} options.text - Texto do botão
   * @param {string} options.variant - Variante do botão (primary, secondary, danger)
   * @param {string} options.onClick - [DEPRECATED] Use action + actionData
   * @param {string} options.action - Data-action para event delegation
   * @param {Object} options.actionData - Dados extras como data-attributes
   * @param {string} options.ariaLabel - Label de acessibilidade
   * @param {string} options.type - Tipo do botão (button, submit, reset)
   * @returns {string} HTML do botão
   */
  static render({
    text,
    variant = 'primary',
    onClick = '',
    action = '',
    actionData = {},
    ariaLabel = '',
    type = 'button'
  }) {
    const variantClass = `button-${variant}`;
    const escapedText = this.escapeHtml(text);
    const escapedAriaLabel = this.escapeHtml(ariaLabel);

    // Suporte para onClick (DEPRECATED) e data-action (NOVO)
    let dataAttrs = '';
    if (action) {
      dataAttrs = `data-action="${this.escapeHtml(action)}"`;
      // Adicionar data-attributes extras (convertendo camelCase para kebab-case)
      Object.entries(actionData).forEach(([key, value]) => {
        const kebabKey = this.toKebabCase(key);
        dataAttrs += ` data-${kebabKey}="${this.escapeHtml(String(value))}"`;
      });
    } else if (onClick) {
      // Fallback para onClick (será removido nas próximas fases)
      dataAttrs = `onclick="${onClick}"`;
    }

    const ariaAttr = escapedAriaLabel ? `aria-label="${escapedAriaLabel}"` : '';

    return `
      <button
        type="${type}"
        class="button ${variantClass}"
        ${dataAttrs}
        ${ariaAttr}
        tabindex="0"
      >
        ${escapedText}
      </button>
    `;
  }
}
