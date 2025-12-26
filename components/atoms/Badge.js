/**
 * Badge.js
 * Componente de badge reutilizável
 */

class Badge {
  /**
   * Renderiza um badge
   * @param {Object} options - Opções do badge
   * @param {string} options.text - Texto do badge
   * @param {string} options.variant - Variante do badge (primary, secondary, success, etc)
   * @returns {string} HTML do badge
   */
  static render({ text, variant = 'primary' }) {
    const variantClass = `badge-${variant}`;

    return `
      <span class="badge ${variantClass}">${text}</span>
    `;
  }
}
