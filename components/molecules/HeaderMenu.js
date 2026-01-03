/**
 * HeaderMenu.js
 * Menu hambúrguer para ações secundárias
 * Padronizado para todas as resoluções (desktop + mobile)
 */

/* global Button, ThemeToggle */

class HeaderMenu {
  /**
   * Renderiza o modal do menu hambúrguer
   * @returns {string} HTML do modal
   */
  static render() {
    return `
      <div
        id="headerMenu"
        class="modal header-menu-modal"
        style="display: none;"
        role="dialog"
        aria-labelledby="headerMenuTitle"
        aria-modal="true"
      >
        <div class="modal-overlay" data-action="close-modal" data-modal-id="headerMenu"></div>
        <div class="modal-content header-menu-content">
          <div class="modal-header">
            <h2 id="headerMenuTitle">Menu</h2>
            <button
              class="modal-close"
              data-action="close-modal"
              data-modal-id="headerMenu"
              aria-label="Fechar menu"
            >
              ✕
            </button>
          </div>

          <div class="modal-body header-menu-body">
            <!-- Sort Selector -->
            <div class="header-menu-item">
              <label class="header-menu-label">
                <svg class="header-menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4h14M3 8h10M3 12h6M3 16h8"/>
                </svg>
                Ordenar por
              </label>
              ${this.renderSortSelect()}
            </div>

            <!-- Import/Export -->
            <div class="header-menu-item">
              ${Button.render({
      text: '💾 Importar/Exportar',
      variant: 'secondary',
      action: 'open-modal',
      actionData: { modalId: 'importExportModal' },
      ariaLabel: 'Importar ou Exportar dados'
    })}
            </div>

            <!-- Stories -->
            <div class="header-menu-item">
              ${Button.render({
      text: '📸 Visualizar Stories',
      variant: 'secondary',
      action: 'open-story',
      actionData: { index: 0 },
      ariaLabel: 'Visualizar no modo Stories'
    })}
            </div>

            <!-- Theme Toggle -->
            <div class="header-menu-item">
              ${ThemeToggle.render()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza o select de ordenação
   * @returns {string} HTML do select
   */
  static renderSortSelect() {
    const currentSort = localStorage.getItem('sortBy') || 'date';
    return `
      <select
        class="header-menu-select"
        data-action="change-sort"
        aria-label="Selecionar ordenação"
      >
        <option value="name" ${currentSort === 'name' ? 'selected' : ''}>Nome</option>
        <option value="date" ${currentSort === 'date' ? 'selected' : ''}>Mais Antigo Primeiro (Padrão)</option>
        <option value="days" ${currentSort === 'days' ? 'selected' : ''}>Dias de Continuidade</option>
      </select>
    `;
  }
}
