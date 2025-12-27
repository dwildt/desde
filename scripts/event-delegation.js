/**
 * event-delegation.js
 * Centralized event handling system using event delegation pattern
 */

class EventDelegation {
  static registry = new Map();

  /**
   * Register an event handler using delegation
   * @param {string} selector - CSS selector for target elements
   * @param {string} eventType - Event type (click, submit, etc.)
   * @param {Function} handler - Event handler function
   * @param {Element} context - Context element (defaults to document)
   */
  static register(selector, eventType, handler, context = document) {
    const key = `${selector}-${eventType}`;
    if (!this.registry.has(key)) {
      const listener = (e) => {
        const target = e.target.closest(selector);
        if (target) handler.call(target, e);
      };
      context.addEventListener(eventType, listener);
      this.registry.set(key, listener);
    }
  }

  /**
   * Initialize global event handlers
   */
  static init() {
    // Handler para fechar modais
    this.register('[data-action="close-modal"]', 'click', function() {
      const modalId = this.dataset.modalId;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'none';
      }
    });

    // Handler para abrir modais
    this.register('[data-action="open-modal"]', 'click', function() {
      const modalId = this.dataset.modalId;
      if (modalId === 'addHabitModal') AddHabitModal.open();
      if (modalId === 'importExportModal') ImportExportModal.open();
    });
  }

  /**
   * Unregister an event handler
   * @param {string} selector - CSS selector
   * @param {string} eventType - Event type
   * @param {Element} context - Context element
   */
  static unregister(selector, eventType, context = document) {
    const key = `${selector}-${eventType}`;
    const listener = this.registry.get(key);
    if (listener) {
      context.removeEventListener(eventType, listener);
      this.registry.delete(key);
    }
  }

  /**
   * Clear all registered handlers
   */
  static clear() {
    this.registry.clear();
  }
}
