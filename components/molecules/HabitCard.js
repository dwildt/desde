/**
 * HabitCard.js
 * Componente de card individual de hábito
 */

class HabitCard {
  /**
   * Renderiza um card de hábito
   * @param {Object} habit - Objeto de hábito
   * @param {string} habit.name - Nome do hábito
   * @param {string} habit.startDate - Data de início (YYYY-MM-DD)
   * @param {number} days - Dias desde o início
   * @param {string} formattedDate - Data formatada em português
   * @returns {string} HTML do card
   */
  static render(habit, days, formattedDate) {
    const daysLabel = days === 1 ? 'Dia' : 'Dias';

    return `
      <article class="habit-card" role="article" aria-labelledby="habit-name-${habit.id}">
        <div class="habit-card-header">
          <h3 id="habit-name-${habit.id}" class="habit-name">${habit.name}</h3>
          <button
            class="habit-delete-btn"
            onclick="ConfirmDialog.open('${habit.id}', '${habit.name}')"
            aria-label="Deletar hábito ${habit.name}"
            data-tooltip="Deletar hábito"
            tabindex="0"
          >
            🗑️
          </button>
        </div>
        <p class="habit-since">Desde <strong>${formattedDate}</strong></p>
        <div class="habit-days" aria-live="polite">
          <span class="days-number" aria-label="${days} ${daysLabel.toLowerCase()}">${days}</span>
          <span class="days-label">${daysLabel} Total</span>
        </div>
      </article>
    `;
  }
}
