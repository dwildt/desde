/**
 * HabitList.js
 * Componente de lista de hábitos
 */

/* global Button */

class HabitList {
  /**
   * Renderiza a lista de hábitos
   * @param {Array} habits - Array de hábitos
   * @param {string} sortBy - Critério de ordenação
   * @returns {string} HTML da lista
   */
  static render(habits, sortBy = 'most-days') {
    if (!habits || habits.length === 0) {
      return this.renderEmptyState();
    }

    // Ordenar hábitos conforme critério
    const sortedHabits = HabitUtils.sortHabits(habits, sortBy);

    const habitCards = sortedHabits.map(habit => {
      const days = HabitUtils.calculateDaysSince(habit.startDate);
      const formattedDate = HabitUtils.formatDate(habit.startDate);
      return HabitCard.render(habit, days, formattedDate);
    }).join('');

    return habitCards;
  }

  /**
   * Renderiza estado vazio com boas-vindas
   * @returns {string} HTML do estado vazio
   */
  static renderEmptyState() {
    const addFirstHabitButton = Button.render({
      text: '+ Adicionar Primeiro Hábito',
      variant: 'primary',
      action: 'open-modal',
      actionData: { modalId: 'addHabitModal' },
      ariaLabel: 'Adicionar seu primeiro hábito'
    });

    return `
      <div class="empty-state blank-state-welcome" role="status" aria-live="polite">
        <span class="empty-icon" aria-hidden="true">🗓️</span>
        <h2>Bem-vindo ao Desde!</h2>
        <p>Acompanhe há quantos dias você mantém seus hábitos!</p>

        <div class="blank-state-button">
          ${addFirstHabitButton}
        </div>

        <div class="blank-state-examples">
          <h3>📝 Exemplos do que você pode rastrear:</h3>
          <ul>
            <li><span aria-hidden="true">🧘</span> Meditando</li>
            <li><span aria-hidden="true">🏃</span> Correndo</li>
            <li><span aria-hidden="true">📚</span> Lendo</li>
            <li><span aria-hidden="true">💻</span> Programando</li>
            <li><span aria-hidden="true">✍️</span> Escrevendo</li>
          </ul>
          <p class="examples-note">Informe quando você começou e acompanhe sua continuidade!</p>
        </div>

        <p class="blank-state-tip">💡 Seus dados ficam salvos apenas neste navegador</p>
      </div>
    `;
  }
}
