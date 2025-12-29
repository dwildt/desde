/**
 * HabitCard.js
 * Componente de card individual de hábito
 */

class HabitCard {
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
    const escapedName = this.escapeHtml(habit.name);
    const escapedId = this.escapeHtml(habit.id);
    const escapedFormattedDate = this.escapeHtml(formattedDate);

    // Obter marco atual e próximo
    const currentMilestone = Milestones.getCurrentMilestone(days);
    const nextMilestone = Milestones.getNextMilestone(days);

    // Badge de marco
    const milestoneBadge = `
      <div class="milestone-badge ${currentMilestone.color}" aria-label="Marco ${currentMilestone.name}">
        <span class="milestone-icon" aria-hidden="true">${currentMilestone.icon}</span>
        <span class="milestone-label">${currentMilestone.name}</span>
      </div>
    `;

    // Barra de progresso (só mostra se não atingiu o último marco)
    const progressBar = nextMilestone ? `
      <div class="milestone-progress">
        <div class="milestone-progress-bar">
          <div
            class="milestone-progress-fill ${nextMilestone.tier.color}"
            style="width: ${nextMilestone.progress}%"
            role="progressbar"
            aria-valuenow="${nextMilestone.progress}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Progresso para ${nextMilestone.tier.name}: ${nextMilestone.progress}%"
          ></div>
        </div>
        <p class="milestone-progress-text">${Milestones.getProgressText(days)}</p>
      </div>
    ` : '';

    return `
      <article
        class="habit-card"
        role="article"
        aria-labelledby="habit-name-${escapedId}"
        aria-describedby="habit-days-${escapedId}"
      >
        <div class="habit-card-header">
          <h3 id="habit-name-${escapedId}" class="habit-name">${escapedName}</h3>
          <button
            class="habit-delete-btn"
            data-action="confirm-delete"
            data-habit-id="${escapedId}"
            data-habit-name="${escapedName}"
            aria-label="Deletar hábito ${escapedName}"
            data-tooltip="Deletar hábito"
            tabindex="0"
          >
            <span aria-hidden="true">🗑️</span>
          </button>
        </div>
        ${milestoneBadge}
        <p class="habit-since">
          <span class="habit-since-label">Desde</span>
          <strong>${escapedFormattedDate}</strong>
        </p>
        <div
          id="habit-days-${escapedId}"
          class="habit-days"
          role="status"
          aria-live="polite"
          style="background: ${currentMilestone.gradient}"
        >
          <span class="days-number">${days}</span>
          <span class="days-label" aria-label="${days} ${daysLabel.toLowerCase()} total">${daysLabel}</span>
        </div>
        ${progressBar}
      </article>
    `;
  }
}
