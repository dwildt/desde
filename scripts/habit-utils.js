/**
 * habit-utils.js
 * Utilitários para cálculos e formatação de datas de hábitos
 */

class HabitUtils {
  /**
   * Calcula dias desde a data inicial
   * @param {string} startDate - Data no formato YYYY-MM-DD
   * @returns {number} Número de dias
   */
  static calculateDaysSince(startDate) {
    const [year, month, day] = startDate.split('-');
    const start = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  /**
   * Formata data em português
   * @param {string} dateString - Data no formato YYYY-MM-DD
   * @returns {string} Data formatada (ex: "1 de Janeiro de 2024")
   */
  static formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const monthName = months[parseInt(month) - 1];
    return `${parseInt(day)} de ${monthName} de ${year}`;
  }

  /**
   * Valida formato de data YYYY-MM-DD
   * @param {string} dateString - Data a validar
   * @returns {boolean} Se é válida
   */
  static isValidDate(dateString) {
    if (!dateString) return false;

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    return date.getFullYear() === parseInt(year) &&
           date.getMonth() === parseInt(month) - 1 &&
           date.getDate() === parseInt(day);
  }

  /**
   * Retorna o label correto para dias (singular/plural)
   * @param {number} days - Número de dias
   * @returns {string} "Dia" ou "Dias"
   */
  static getDaysLabel(days) {
    return days === 1 ? 'Dia' : 'Dias';
  }

  /**
   * Calcula duração detalhada (anos, meses, dias)
   * @param {string} startDate - Data no formato YYYY-MM-DD
   * @returns {Object} {anos, meses, dias}
   */
  static calculateDetailedDuration(startDate) {
    const [year, month, day] = startDate.split('-');
    const start = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();

    let years = today.getFullYear() - start.getFullYear();
    let months = today.getMonth() - start.getMonth();
    let days = today.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  /**
   * Ordena hábitos conforme critério
   * @param {Array} habits - Array de hábitos
   * @param {string} sortBy - Critério (most-days, least-days, newest, alphabetical)
   * @returns {Array} Hábitos ordenados
   */
  static sortHabits(habits, sortBy = 'most-days') {
    const sorted = [...habits]; // Clone para não mutar original

    switch (sortBy) {
      case 'most-days':
        // Maior tempo primeiro (mais dias)
        return sorted.sort((a, b) => {
          const daysA = this.calculateDaysSince(a.startDate);
          const daysB = this.calculateDaysSince(b.startDate);
          return daysB - daysA;
        });

      case 'least-days':
        // Menor tempo primeiro (menos dias)
        return sorted.sort((a, b) => {
          const daysA = this.calculateDaysSince(a.startDate);
          const daysB = this.calculateDaysSince(b.startDate);
          return daysA - daysB;
        });

      case 'newest':
        // Mais recente primeiro (por createdAt)
        return sorted.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA;
        });

      case 'alphabetical':
        // Ordem alfabética (A-Z)
        return sorted.sort((a, b) => {
          return a.name.localeCompare(b.name, 'pt-BR');
        });

      default:
        return sorted;
    }
  }
}
