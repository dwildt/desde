/**
 * FormField.js
 * Componente de campo de formulário (Label + Input)
 */

class FormField {
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
   * Renderiza um campo de formulário (versão desacoplada)
   * @param {Object} options - Opções do campo
   * @param {string} options.id - ID do input
   * @param {string} options.label - Label do campo
   * @param {string} options.inputHtml - HTML do input já renderizado
   * @param {string} options.helpText - Texto de ajuda (opcional)
   * @returns {string} HTML do campo
   */
  static render({ id, label, inputHtml, helpText = '' }) {
    const escapedId = this.escapeHtml(id);
    const escapedLabel = this.escapeHtml(label);
    const escapedHelpText = this.escapeHtml(helpText);

    return `
      <div class="form-field">
        <label for="${escapedId}" class="form-label">${escapedLabel}</label>
        ${inputHtml}
        ${escapedHelpText ? `<span class="form-help">${escapedHelpText}</span>` : ''}
      </div>
    `;
  }

  /**
   * Renderiza um campo de formulário (versão legada - retrocompatibilidade)
   * @deprecated Use render() com inputHtml
   */
  static renderLegacy({ id, label, type, name, value = '', placeholder = '', required = false, min = '', max = '' }) {
    const fieldId = id || name;
    const inputHtml = Input.render({
      id: fieldId,
      type,
      name: name || fieldId,
      value,
      placeholder,
      required,
      min,
      max
    });

    return this.render({ id: fieldId, label, inputHtml });
  }
}
