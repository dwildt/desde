/**
 * ViewModeToggle.js
 * Toggle entre modos de visualização (Grid/Lista)
 */

class ViewModeToggle {
  /**
   * Renderiza o toggle de modo de visualização
   * @returns {string} HTML do toggle
   */
  static render() {
    return `
      <div class="view-mode-toggle" role="group" aria-label="Modo de visualização">
        <button
          class="view-mode-btn"
          data-action="set-view-mode"
          data-mode="grid"
          aria-label="Visualização em grade"
          aria-pressed="true"
          data-tooltip="Grade"
          tabindex="0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/>
            <rect x="12" y="2" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/>
            <rect x="2" y="12" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/>
            <rect x="12" y="12" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </button>
        <button
          class="view-mode-btn"
          data-action="set-view-mode"
          data-mode="list"
          aria-label="Visualização em lista"
          aria-pressed="false"
          data-tooltip="Lista"
          tabindex="0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="2" y="3" width="16" height="3" rx="1" stroke="currentColor" stroke-width="1.5"/>
            <rect x="2" y="8.5" width="16" height="3" rx="1" stroke="currentColor" stroke-width="1.5"/>
            <rect x="2" y="14" width="16" height="3" rx="1" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </button>
      </div>
    `;
  }
}
