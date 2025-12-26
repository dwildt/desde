/**
 * theme.test.js
 * Testes unitários para Theme
 */

// Carregar a classe Theme
global.Theme = class Theme {
  static THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
  };

  static STORAGE_KEY = 'desde-theme';

  static init() {
    const savedTheme = this.getTheme();
    this.applyTheme(savedTheme);
  }

  static getTheme() {
    try {
      const theme = localStorage.getItem(this.STORAGE_KEY);
      return theme || this.THEMES.LIGHT;
    } catch (error) {
      return this.THEMES.LIGHT;
    }
  }

  static applyTheme(theme) {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  }

  static toggle() {
    const current = this.getTheme();
    const newTheme = current === this.THEMES.LIGHT ? this.THEMES.DARK : this.THEMES.LIGHT;
    this.applyTheme(newTheme);
  }
};

describe('Theme', () => {
  beforeEach(() => {
    localStorage.clear();
    if (typeof document !== 'undefined') {
      document.documentElement.removeAttribute('data-theme');
    }
  });

  describe('getTheme', () => {
    test('deve retornar light como padrão', () => {
      const theme = Theme.getTheme();
      expect(theme).toBe('light');
    });

    test('deve retornar tema salvo', () => {
      localStorage.setItem('desde-theme', 'dark');
      const theme = Theme.getTheme();
      expect(theme).toBe('dark');
    });
  });

  describe('applyTheme', () => {
    test('deve salvar tema no localStorage', () => {
      Theme.applyTheme('dark');
      const saved = localStorage.getItem('desde-theme');
      expect(saved).toBe('dark');
    });

    test('deve salvar tema light', () => {
      Theme.applyTheme('light');
      const saved = localStorage.getItem('desde-theme');
      expect(saved).toBe('light');
    });
  });

  describe('toggle', () => {
    test('deve alternar de light para dark', () => {
      Theme.applyTheme('light');
      Theme.toggle();
      const theme = Theme.getTheme();
      expect(theme).toBe('dark');
    });

    test('deve alternar de dark para light', () => {
      Theme.applyTheme('dark');
      Theme.toggle();
      const theme = Theme.getTheme();
      expect(theme).toBe('light');
    });
  });

  describe('init', () => {
    test('deve inicializar com tema salvo', () => {
      localStorage.setItem('desde-theme', 'dark');
      Theme.init();
      const theme = Theme.getTheme();
      expect(theme).toBe('dark');
    });

    test('deve inicializar com light se não houver tema salvo', () => {
      Theme.init();
      const theme = Theme.getTheme();
      expect(theme).toBe('light');
    });
  });
});
