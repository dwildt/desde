/**
 * Input.js
 * Componente de input reutilizável
 */

class Input {
  /**
   * Renderiza um input
   * @param {Object} options - Opções do input
   * @param {string} options.id - ID do input
   * @param {string} options.type - Tipo do input (text, date, etc)
   * @param {string} options.name - Nome do input
   * @param {string} options.value - Valor inicial
   * @param {string} options.placeholder - Placeholder
   * @param {boolean} options.required - Se é obrigatório
   * @param {string} options.min - Valor mínimo (para date/number)
   * @param {string} options.max - Valor máximo (para date/number)
   * @returns {string} HTML do input
   */
  static render({ id, type = 'text', name, value = '', placeholder = '', required = false, min = '', max = '' }) {
    const requiredAttr = required ? 'required' : '';
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : '';
    const idAttr = id ? `id="${id}"` : '';
    const minAttr = min ? `min="${min}"` : '';
    const maxAttr = max ? `max="${max}"` : '';

    return `
      <input
        type="${type}"
        name="${name}"
        value="${value}"
        class="input"
        ${idAttr}
        ${placeholderAttr}
        ${requiredAttr}
        ${minAttr}
        ${maxAttr}
      />
    `;
  }
}
