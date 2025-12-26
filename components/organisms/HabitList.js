/**
 * HabitList.js
 * Componente de lista de hábitos
 */

class HabitList {
  /**
   * Renderiza a lista de hábitos
   * @param {Array} habits - Array de hábitos
   * @returns {string} HTML da lista
   */
  static render(habits) {
    if (!habits || habits.length === 0) {
      return this.renderEmptyState();
    }

    const habitCards = habits.map(habit => {
      const days = HabitUtils.calculateDaysSince(habit.startDate);
      const formattedDate = HabitUtils.formatDate(habit.startDate);
      return HabitCard.render(habit, days, formattedDate);
    }).join('');

    return habitCards;
  }

  /**
   * Renderiza estado vazio
   * @returns {string} HTML do estado vazio
   */
  static renderEmptyState() {
    return `
      <div class="empty-state" role="status" aria-live="polite">
        <span class="empty-icon" aria-hidden="true">📝</span>
        <h2>Nenhum hábito cadastrado</h2>
        <p>Adicione seu primeiro hábito para começar a acompanhar!</p>
      </div>
    `;
  }
}
