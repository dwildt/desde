/**
 * theme.js
 * Gerenciamento de tema dark/light
 */

class Theme {
  static THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
  };

  /**
   * Inicializa o tema
   */
  static init() {
    const savedTheme = this.getTheme();
    this.applyTheme(savedTheme);
  }

  /**
   * Obtém tema atual
   * @returns {string} Tema atual
   */
  static getTheme() {
    const settings = Storage.getSettings();
    return settings.theme || this.THEMES.LIGHT;
  }

  /**
   * Aplica tema
   * @param {string} theme - Tema a aplicar
   */
  static applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.saveTheme(theme);
  }

  /**
   * Alterna tema
   */
  static toggle() {
    const current = this.getTheme();
    const newTheme = current === this.THEMES.LIGHT ? this.THEMES.DARK : this.THEMES.LIGHT;
    this.applyTheme(newTheme);
  }

  /**
   * Salva tema
   * @param {string} theme - Tema a salvar
   */
  static saveTheme(theme) {
    const settings = Storage.getSettings();
    settings.theme = theme;
    Storage.saveSettings(settings);
  }
}
