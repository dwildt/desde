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
      <div id="addHabitModal" class="modal" style="display: none;">
        <div class="modal-overlay" onclick="AddHabitModal.close()"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h2>Adicionar Novo Hábito</h2>
            <button class="modal-close" onclick="AddHabitModal.close()" aria-label="Fechar modal">
              ✕
            </button>
          </div>

          <form id="addHabitForm" class="modal-body" onsubmit="AddHabitModal.handleSubmit(event)">
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
                onClick: 'AddHabitModal.close()'
              })}
              ${Button.render({
                text: 'Adicionar',
                variant: 'primary',
                type: 'submit'
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
      document.getElementById('habitName')?.focus();
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
