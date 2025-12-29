/**
 * view-mode.js
 * Gerenciador de modos de visualização (grid/list)
 */

class ViewMode {
  static MODES = {
    GRID: 'grid',
    LIST: 'list'
  };

  /**
   * Obtém o modo atual do localStorage
   * @returns {string} Modo atual (grid ou list)
   */
  static getCurrentMode() {
    const settings = Storage.getSettings();
    return settings.viewMode || this.MODES.GRID;
  }

  /**
   * Define o modo de visualização
   * @param {string} mode - Modo (grid ou list)
   */
  static setMode(mode) {
    if (!Object.values(this.MODES).includes(mode)) {
      console.error(`Modo inválido: ${mode}`);
      return;
    }

    // Salvar no localStorage
    const settings = Storage.getSettings();
    settings.viewMode = mode;
    Storage.saveSettings(settings);

    // Aplicar visualmente
    this.applyMode(mode);
  }

  /**
   * Aplica o modo visualmente (atualiza classes do DOM)
   * @param {string} mode - Modo a aplicar
   */
  static applyMode(mode) {
    const habitsList = document.getElementById('habitsList');
    if (!habitsList) return;

    // Remover todas as classes de modo
    Object.values(this.MODES).forEach(m => {
      habitsList.classList.remove(`mode-${m}`);
    });

    // Adicionar classe do modo atual
    habitsList.classList.add(`mode-${mode}`);

    // Atualizar botões do toggle
    this.updateToggleButtons(mode);
  }

  /**
   * Atualiza estado visual dos botões de toggle
   * @param {string} activeMode - Modo ativo
   */
  static updateToggleButtons(activeMode) {
    const buttons = document.querySelectorAll('[data-action="set-view-mode"]');
    buttons.forEach(button => {
      const buttonMode = button.dataset.mode;
      if (buttonMode === activeMode) {
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
      } else {
        button.classList.remove('active');
        button.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /**
   * Inicializa o sistema de view modes
   */
  static init() {
    // Aplicar modo salvo ao carregar
    const currentMode = this.getCurrentMode();
    this.applyMode(currentMode);
  }
}
