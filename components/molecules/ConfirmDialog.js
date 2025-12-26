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
    return `
      <div id="confirmDialog" class="modal" style="display: none;">
        <div class="modal-overlay" onclick="ConfirmDialog.close()"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h2>Confirmar Exclusão</h2>
            <button class="modal-close" onclick="ConfirmDialog.close()" aria-label="Fechar modal">
              ✕
            </button>
          </div>

          <div class="modal-body">
            <p id="confirmMessage" class="confirm-message"></p>
          </div>

          <div class="modal-footer">
            ${Button.render({
              text: 'Cancelar',
              variant: 'secondary',
              onClick: 'ConfirmDialog.close()'
            })}
            ${Button.render({
              text: 'Deletar',
              variant: 'danger',
              onClick: 'ConfirmDialog.confirm()'
            })}
          </div>
        </div>
      </div>
    `;
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
