/**
 * Input.js
 * Componente de input reutilizável
 */

class Input {
  /**
   * Escapa atributos HTML para prevenir XSS
   * @param {string} str - String para escapar
   * @returns {string} String escapada
   */
  static escapeAttr(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

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
  static render({
    id,
    type = 'text',
    name,
    value = '',
    placeholder = '',
    required = false,
    min = '',
    max = ''
  }) {
    const escapedType = this.escapeAttr(type);
    const escapedName = this.escapeAttr(name);
    const escapedValue = this.escapeAttr(value);
    const escapedPlaceholder = this.escapeAttr(placeholder);
    const escapedId = this.escapeAttr(id);
    const escapedMin = this.escapeAttr(min);
    const escapedMax = this.escapeAttr(max);

    const requiredAttr = required ? 'required' : '';
    const placeholderAttr = escapedPlaceholder ? `placeholder="${escapedPlaceholder}"` : '';
    const idAttr = escapedId ? `id="${escapedId}"` : '';
    const minAttr = escapedMin ? `min="${escapedMin}"` : '';
    const maxAttr = escapedMax ? `max="${escapedMax}"` : '';

    return `
      <input
        type="${escapedType}"
        name="${escapedName}"
        value="${escapedValue}"
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
