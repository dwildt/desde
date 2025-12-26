/**
 * storage.test.js
 * Testes unitários para Storage
 */

// Carregar a classe Storage
global.Storage = class Storage {
  static KEYS = {
    HABITS: 'desde-habits',
    SETTINGS: 'desde-settings'
  };

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

  static addHabit(habit) {
    const habits = this.getHabits();
    habits.push({
      ...habit,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    });
    return this.saveHabits(habits);
  }

  static deleteHabit(habitId) {
    const habits = this.getHabits().filter(h => h.id !== habitId);
    return this.saveHabits(habits);
  }

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

  static generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static getSettings() {
    try {
      const data = localStorage.getItem(this.KEYS.SETTINGS);
      return data ? JSON.parse(data) : { theme: 'light', language: 'pt' };
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      return { theme: 'light', language: 'pt' };
    }
  }

  static saveSettings(settings) {
    try {
      localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      return false;
    }
  }
};

describe('Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getHabits', () => {
    test('deve retornar array vazio quando não há dados', () => {
      const habits = Storage.getHabits();
      expect(habits).toEqual([]);
    });

    test('deve retornar hábitos salvos', () => {
      const mockHabits = [
        { id: '1', name: 'Teste', startDate: '2024-01-01' }
      ];
      Storage.saveHabits(mockHabits);

      const habits = Storage.getHabits();
      expect(habits).toEqual(mockHabits);
    });
  });

  describe('addHabit', () => {
    test('deve adicionar hábito com id e createdAt', () => {
      const habit = { name: 'Novo Hábito', startDate: '2024-01-01' };
      Storage.addHabit(habit);

      const habits = Storage.getHabits();
      expect(habits).toHaveLength(1);
      expect(habits[0]).toHaveProperty('id');
      expect(habits[0]).toHaveProperty('createdAt');
      expect(habits[0].name).toBe('Novo Hábito');
    });
  });

  describe('deleteHabit', () => {
    test('deve deletar hábito pelo id', () => {
      const habits = [
        { id: '1', name: 'Hábito 1', startDate: '2024-01-01' },
        { id: '2', name: 'Hábito 2', startDate: '2024-01-02' }
      ];
      Storage.saveHabits(habits);

      Storage.deleteHabit('1');

      const remaining = Storage.getHabits();
      expect(remaining).toHaveLength(1);
      expect(remaining[0].id).toBe('2');
    });
  });

  describe('exportData', () => {
    test('deve exportar dados com formato correto', () => {
      const habits = [
        { id: '1', name: 'Test', startDate: '2024-01-01' }
      ];
      Storage.saveHabits(habits);

      const exported = Storage.exportData();

      expect(exported).toHaveProperty('exportDate');
      expect(exported).toHaveProperty('version');
      expect(exported.data.habits).toEqual(habits);
    });
  });

  describe('importData', () => {
    test('deve importar dados válidos', () => {
      const validData = {
        version: '1.0.0',
        data: {
          habits: [
            { id: '1', name: 'Importado', startDate: '2024-01-01' }
          ]
        }
      };

      const success = Storage.importData(validData);
      expect(success).toBe(true);

      const habits = Storage.getHabits();
      expect(habits).toHaveLength(1);
      expect(habits[0].name).toBe('Importado');
    });

    test('deve rejeitar dados inválidos', () => {
      const invalidData = { invalid: true };

      const success = Storage.importData(invalidData);
      expect(success).toBe(false);
    });
  });
});
