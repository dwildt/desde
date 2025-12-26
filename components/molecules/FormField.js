/**
 * FormField.js
 * Componente de campo de formulário (Label + Input)
 */

class FormField {
  /**
   * Renderiza um campo de formulário
   * @param {Object} options - Opções do campo
   * @param {string} options.label - Label do campo
   * @param {string} options.type - Tipo do input
   * @param {string} options.name - Nome do input
   * @param {string} options.value - Valor inicial
   * @param {string} options.placeholder - Placeholder
   * @param {boolean} options.required - Se é obrigatório
   * @returns {string} HTML do campo
   */
  static render({ label, type, name, value = '', placeholder = '', required = false }) {
    return `
      <div class="form-field">
        <label for="${name}" class="form-label">${label}</label>
        ${Input.render({ type, name, value, placeholder, required })}
      </div>
    `;
  }
}
