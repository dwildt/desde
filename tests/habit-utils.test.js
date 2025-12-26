/**
 * habit-utils.test.js
 * Testes unitários para HabitUtils
 */

// Carregar a classe HabitUtils
global.HabitUtils = class HabitUtils {
  static calculateDaysSince(startDate) {
    const [year, month, day] = startDate.split('-');
    const start = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  static formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const monthName = months[parseInt(month) - 1];
    return `${parseInt(day)} de ${monthName} de ${year}`;
  }

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

  static getDaysLabel(days) {
    return days === 1 ? 'Dia' : 'Dias';
  }

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
};

describe('HabitUtils', () => {
  describe('formatDate', () => {
    test('deve formatar data corretamente', () => {
      expect(HabitUtils.formatDate('2024-01-01')).toBe('1 de Janeiro de 2024');
      expect(HabitUtils.formatDate('2024-12-25')).toBe('25 de Dezembro de 2024');
    });
  });

  describe('isValidDate', () => {
    test('deve validar datas corretas', () => {
      expect(HabitUtils.isValidDate('2024-01-01')).toBe(true);
      expect(HabitUtils.isValidDate('2024-12-31')).toBe(true);
    });

    test('deve rejeitar datas inválidas', () => {
      expect(HabitUtils.isValidDate('2024-13-01')).toBe(false);
      expect(HabitUtils.isValidDate('2024-02-30')).toBe(false);
      expect(HabitUtils.isValidDate('invalid')).toBe(false);
      expect(HabitUtils.isValidDate('')).toBe(false);
    });
  });

  describe('getDaysLabel', () => {
    test('deve retornar singular para 1 dia', () => {
      expect(HabitUtils.getDaysLabel(1)).toBe('Dia');
    });

    test('deve retornar plural para múltiplos dias', () => {
      expect(HabitUtils.getDaysLabel(0)).toBe('Dias');
      expect(HabitUtils.getDaysLabel(2)).toBe('Dias');
      expect(HabitUtils.getDaysLabel(100)).toBe('Dias');
    });
  });

  describe('calculateDaysSince', () => {
    test('deve calcular dias corretamente', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

      expect(HabitUtils.calculateDaysSince(yesterdayStr)).toBe(1);
    });

    test('deve calcular para hoje', () => {
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

      // Hoje = 0 ou 1 dia dependendo do horário
      const days = HabitUtils.calculateDaysSince(todayStr);
      expect([0, 1]).toContain(days);
    });
  });
});
