/**
 * ConfirmDialog.js
 * Componente de modal de confirmação
 */

class ConfirmDialog {
  static currentHabitId = null;

  /**
   * Renderiza o modal de confirmação
   * @returns {string} HTML do modal
   */
  static render() {
    // Extrair botões para variáveis ANTES do template
    const cancelButton = Button.render({
      text: 'Cancelar',
      variant: 'secondary',
      action: 'close-modal',
      actionData: { modalId: 'confirmDialog' },
      ariaLabel: 'Cancelar exclusão do hábito'
    });

    const deleteButton = Button.render({
      text: 'Deletar',
      variant: 'danger',
      action: 'confirm-delete-habit',
      ariaLabel: 'Confirmar exclusão do hábito'
    });

    return `
      <div
        id="confirmDialog"
        class="modal"
        style="display: none;"
        role="dialog"
        aria-labelledby="confirmDialogTitle"
        aria-describedby="confirmMessage"
        aria-modal="true"
      >
        <div class="modal-overlay" data-action="close-modal" data-modal-id="confirmDialog"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h2 id="confirmDialogTitle">Confirmar Exclusão</h2>
            <button
              class="modal-close"
              data-action="close-modal"
              data-modal-id="confirmDialog"
              aria-label="Fechar modal de confirmação"
              data-tooltip="Fechar"
              tabindex="0"
            >
              ✕
            </button>
          </div>

          <div class="modal-body">
            <p id="confirmMessage" class="confirm-message"></p>
          </div>

          <div class="modal-footer">
            ${cancelButton}
            ${deleteButton}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Inicializa event handlers
   */
  static init() {
    EventDelegation.register('[data-action="confirm-delete-habit"]', 'click', () => {
      ConfirmDialog.confirm();
    });
  }

  /**
   * Abre o modal de confirmação
   * @param {string} habitId - ID do hábito a deletar
   * @param {string} habitName - Nome do hábito
   */
  static open(habitId, habitName) {
    this.currentHabitId = habitId;

    const modal = document.getElementById('confirmDialog');
    const message = document.getElementById('confirmMessage');

    if (modal && message) {
      message.textContent = `Tem certeza que deseja deletar o hábito "${habitName}"? Esta ação não pode ser desfeita.`;
      modal.style.display = 'flex';

      // Adicionar listener para tecla ESC
      this.escListener = (e) => {
        if (e.key === 'Escape') {
          this.close();
        }
      };
      document.addEventListener('keydown', this.escListener);

      // Focus no primeiro botão
      setTimeout(() => {
        const firstButton = modal.querySelector('button');
        if (firstButton) firstButton.focus();
      }, 100);
    }
  }

  /**
   * Fecha o modal de confirmação
   */
  static close() {
    const modal = document.getElementById('confirmDialog');
    if (modal) {
      modal.style.display = 'none';
      this.currentHabitId = null;

      // Remover listener da tecla ESC
      if (this.escListener) {
        document.removeEventListener('keydown', this.escListener);
        this.escListener = null;
      }
    }
  }

  /**
   * Confirma a ação de deletar
   */
  static confirm() {
    if (this.currentHabitId) {
      // Emitir evento customizado com o ID do hábito
      const deleteEvent = new CustomEvent('habit:delete', {
        detail: { habitId: this.currentHabitId }
      });
      window.dispatchEvent(deleteEvent);

      this.close();
    }
  }
}
