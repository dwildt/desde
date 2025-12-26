/**
 * AddHabitModal.js
 * Modal para adicionar novo hábito
 */

class AddHabitModal {
  /**
   * Renderiza o modal de adicionar hábito
   * @returns {string} HTML do modal
   */
  static render() {
    return `
      <div
        id="addHabitModal"
        class="modal"
        style="display: none;"
        role="dialog"
        aria-labelledby="addHabitModalTitle"
        aria-modal="true"
      >
        <div class="modal-overlay" onclick="AddHabitModal.close()"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h2 id="addHabitModalTitle">Adicionar Novo Hábito</h2>
            <button
              class="modal-close"
              onclick="AddHabitModal.close()"
              aria-label="Fechar modal de adicionar hábito"
              data-tooltip="Fechar"
              tabindex="0"
            >
              ✕
            </button>
          </div>

          <form
            id="addHabitForm"
            class="modal-body"
            onsubmit="AddHabitModal.handleSubmit(event)"
            aria-label="Formulário para adicionar novo hábito"
          >
            ${FormField.render({
              id: 'habitName',
              label: 'Nome do Hábito',
              type: 'text',
              placeholder: 'Ex: Ler livros, Exercícios físicos...',
              required: true
            })}

            ${FormField.render({
              id: 'habitStartDate',
              label: 'Data de Início',
              type: 'date',
              required: true,
              max: new Date().toISOString().split('T')[0]
            })}

            <div class="modal-footer">
              ${Button.render({
                text: 'Cancelar',
                variant: 'secondary',
                onClick: 'AddHabitModal.close()',
                ariaLabel: 'Cancelar criação de hábito'
              })}
              ${Button.render({
                text: 'Adicionar',
                variant: 'primary',
                type: 'submit',
                ariaLabel: 'Salvar novo hábito'
              })}
            </div>
          </form>
        </div>
      </div>
    `;
  }

  /**
   * Abre o modal
   */
  static open() {
    const modal = document.getElementById('addHabitModal');
    if (modal) {
      modal.style.display = 'flex';

      // Adicionar listener para tecla ESC
      this.escListener = (e) => {
        if (e.key === 'Escape') {
          this.close();
        }
      };
      document.addEventListener('keydown', this.escListener);

      // Focus no primeiro campo
      setTimeout(() => {
        document.getElementById('habitName')?.focus();
      }, 100);
    }
  }

  /**
   * Fecha o modal
   */
  static close() {
    const modal = document.getElementById('addHabitModal');
    if (modal) {
      modal.style.display = 'none';
      document.getElementById('addHabitForm')?.reset();

      // Remover listener da tecla ESC
      if (this.escListener) {
        document.removeEventListener('keydown', this.escListener);
        this.escListener = null;
      }
    }
  }

  /**
   * Manipula o submit do formulário
   * @param {Event} event - Evento de submit
   */
  static handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('habitName')?.value.trim();
    const startDate = document.getElementById('habitStartDate')?.value;

    if (!name || !startDate) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Validar data
    if (!HabitUtils.isValidDate(startDate)) {
      alert('Data inválida.');
      return;
    }

    // Emitir evento customizado com os dados do hábito
    const habitData = { name, startDate };
    const addEvent = new CustomEvent('habit:add', { detail: habitData });
    window.dispatchEvent(addEvent);

    this.close();
  }
}
