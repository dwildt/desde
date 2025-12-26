/**
 * ConfirmDialog.js
 * Componente de modal de confirmação
 */

class ConfirmDialog {
  /**
   * Exibe um diálogo de confirmação
   * @param {Object} options - Opções do diálogo
   * @param {string} options.title - Título do diálogo
   * @param {string} options.message - Mensagem do diálogo
   * @param {string} options.confirmText - Texto do botão de confirmação
   * @param {string} options.cancelText - Texto do botão de cancelar
   * @param {Function} options.onConfirm - Callback ao confirmar
   * @returns {boolean} Resultado da confirmação
   */
  static show({ title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', onConfirm }) {
    const confirmed = window.confirm(`${title}\n\n${message}`);
    if (confirmed && onConfirm) {
      onConfirm();
    }
    return confirmed;
  }

  /**
   * Renderiza um modal customizado (para implementação futura)
   * @param {Object} options - Opções do modal
   * @returns {string} HTML do modal
   */
  static render({ title, message, confirmText = 'Confirmar', cancelText = 'Cancelar' }) {
    return `
      <div class="modal-overlay" id="confirmDialog">
        <div class="modal">
          <h3 class="modal-title">${title}</h3>
          <p class="modal-message">${message}</p>
          <div class="modal-actions">
            ${Button.render({ text: cancelText, variant: 'secondary', onClick: 'closeConfirmDialog()' })}
            ${Button.render({ text: confirmText, variant: 'danger', onClick: 'confirmAction()' })}
          </div>
        </div>
      </div>
    `;
  }
}
