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
    // 1. Preparar inputs
    const nameInput = Input.render({
      id: 'habitName',
      type: 'text',
      name: 'habitName',
      placeholder: 'Ex: Ler livros, Exercícios físicos...',
      required: true
    });

    const dateInput = Input.render({
      id: 'habitStartDate',
      type: 'date',
      name: 'habitStartDate',
      required: true,
      max: new Date().toISOString().split('T')[0]
    });

    // 2. Preparar fields
    const nameField = FormField.render({
      id: 'habitName',
      label: 'Nome do Hábito',
      inputHtml: nameInput
    });

    const dateField = FormField.render({
      id: 'habitStartDate',
      label: 'Data de Início',
      inputHtml: dateInput
    });

    // 3. Preparar botões
    const cancelButton = Button.render({
      text: 'Cancelar',
      variant: 'secondary',
      action: 'close-modal',
      actionData: { modalId: 'addHabitModal' },
      ariaLabel: 'Cancelar criação de hábito'
    });

    const submitButton = Button.render({
      text: 'Adicionar',
      variant: 'primary',
      type: 'submit',
      ariaLabel: 'Salvar novo hábito'
    });

    // 4. Template final (limpo, sem aninhamento)
    return `
      <div
        id="addHabitModal"
        class="modal"
        style="display: none;"
        role="dialog"
        aria-labelledby="addHabitModalTitle"
        aria-modal="true"
      >
        <div class="modal-overlay" data-action="close-modal" data-modal-id="addHabitModal"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h2 id="addHabitModalTitle">Adicionar Novo Hábito</h2>
            <button
              class="modal-close"
              data-action="close-modal"
              data-modal-id="addHabitModal"
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
            aria-label="Formulário para adicionar novo hábito"
          >
            ${nameField}
            ${dateField}

            <div class="modal-footer">
              ${cancelButton}
              ${submitButton}
            </div>
          </form>
        </div>
      </div>
    `;
  }

  /**
   * Inicializa event handlers
   */
  static init() {
    document.addEventListener('submit', (e) => {
      if (e.target.id === 'addHabitForm') {
        this.handleSubmit(e);
      }
    });
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
