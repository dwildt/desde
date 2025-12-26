/**
 * FormField.js
 * Componente de campo de formulário (Label + Input)
 */

class FormField {
  /**
   * Renderiza um campo de formulário
   * @param {Object} options - Opções do campo
   * @param {string} options.id - ID do input
   * @param {string} options.label - Label do campo
   * @param {string} options.type - Tipo do input
   * @param {string} options.name - Nome do input
   * @param {string} options.value - Valor inicial
   * @param {string} options.placeholder - Placeholder
   * @param {boolean} options.required - Se é obrigatório
   * @param {string} options.min - Valor mínimo (para date/number)
   * @param {string} options.max - Valor máximo (para date/number)
   * @returns {string} HTML do campo
   */
  static render({ id, label, type, name, value = '', placeholder = '', required = false, min = '', max = '' }) {
    const fieldId = id || name;
    return `
      <div class="form-field">
        <label for="${fieldId}" class="form-label">${label}</label>
        ${Input.render({ id: fieldId, type, name: name || fieldId, value, placeholder, required, min, max })}
      </div>
    `;
  }
}
