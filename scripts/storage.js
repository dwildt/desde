/**
 * storage.js
 * Gerenciamento de dados no localStorage
 */

class Storage {
  static KEYS = {
    HABITS: 'desde-habits',
    SETTINGS: 'desde-settings'
  };

  /**
   * Obtém todos os hábitos
   * @returns {Array} Array de hábitos
   */
  static getHabits() {
    try {
      const data = localStorage.getItem(this.KEYS.HABITS);
      if (!data) return [];

      const parsed = JSON.parse(data);
      return parsed.habits || [];
    } catch (error) {
      console.error('Erro ao carregar hábitos:', error);
      return [];
    }
  }

  /**
   * Salva hábitos
   * @param {Array} habits - Array de hábitos
   * @returns {boolean} Sucesso
   */
  static saveHabits(habits) {
    try {
      const data = { habits };
      localStorage.setItem(this.KEYS.HABITS, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Erro ao salvar hábitos:', error);
      return false;
    }
  }

  /**
   * Adiciona novo hábito
   * @param {Object} habit - Objeto de hábito
   * @returns {boolean} Sucesso
   */
  static addHabit(habit) {
    const habits = this.getHabits();
    habits.push({
      ...habit,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    });
    return this.saveHabits(habits);
  }

  /**
   * Deleta hábito
   * @param {string} habitId - ID do hábito
   * @returns {boolean} Sucesso
   */
  static deleteHabit(habitId) {
    const habits = this.getHabits().filter(h => h.id !== habitId);
    return this.saveHabits(habits);
  }

  /**
   * Exporta dados para JSON
   * @returns {Object} Dados de export
   */
  static exportData() {
    return {
      exportDate: new Date().toISOString(),
      version: '1.0.0',
      data: {
        habits: this.getHabits()
      },
      settings: this.getSettings()
    };
  }

  /**
   * Importa dados de JSON
   * @param {Object} data - Dados de import
   * @returns {boolean} Sucesso
   */
  static importData(data) {
    try {
      if (!data.data || !Array.isArray(data.data.habits)) {
        throw new Error('Formato inválido');
      }

      this.saveHabits(data.data.habits);
      if (data.settings) {
        this.saveSettings(data.settings);
      }

      return true;
    } catch (error) {
      console.error('Erro ao importar:', error);
      return false;
    }
  }

  /**
   * Gera ID único
   * @returns {string} UUID v4
   */
  static generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Obtém configurações
   * @returns {Object} Configurações
   */
  static getSettings() {
    try {
      const data = localStorage.getItem(this.KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        theme: 'light',
        language: 'pt',
        viewMode: 'grid',
        sortBy: 'most-days'
      };
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      return {
        theme: 'light',
        language: 'pt',
        viewMode: 'grid',
        sortBy: 'most-days'
      };
    }
  }

  /**
   * Salva configurações
   * @param {Object} settings - Configurações
   * @returns {boolean} Sucesso
   */
  static saveSettings(settings) {
    try {
      localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      return false;
    }
  }
}
