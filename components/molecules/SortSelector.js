/**
 * SortSelector.js
 * Seletor de ordenação de hábitos
 */

class SortSelector {
  /**
   * Renderiza o seletor de ordenação
   * @returns {string} HTML do seletor
   */
  static render() {
    return `
      <div class="sort-selector">
        <label for="habitSort" class="sort-label">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 4h10M3 8h7M3 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M13 10l1.5 1.5L13 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </label>
        <select
          id="habitSort"
          class="sort-select"
          data-action="change-sort"
          aria-label="Ordenar hábitos"
        >
          <option value="most-days">Maior tempo</option>
          <option value="least-days">Menor tempo</option>
          <option value="newest">Mais recente</option>
          <option value="alphabetical">A-Z</option>
        </select>
      </div>
    `;
  }
}
