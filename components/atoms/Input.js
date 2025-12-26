/**
 * Input.js
 * Componente de input reutilizável
 */

class Input {
  /**
   * Renderiza um input
   * @param {Object} options - Opções do input
   * @param {string} options.type - Tipo do input (text, date, etc)
   * @param {string} options.name - Nome do input
   * @param {string} options.value - Valor inicial
   * @param {string} options.placeholder - Placeholder
   * @param {boolean} options.required - Se é obrigatório
   * @returns {string} HTML do input
   */
  static render({ type = 'text', name, value = '', placeholder = '', required = false }) {
    const requiredAttr = required ? 'required' : '';
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : '';

    return `
      <input
        type="${type}"
        name="${name}"
        value="${value}"
        class="input"
        ${placeholderAttr}
        ${requiredAttr}
      />
    `;
  }
}
