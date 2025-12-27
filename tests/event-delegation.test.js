/**
 * event-delegation.test.js
 * Testes unitários para o sistema EventDelegation
 */

// Mock da classe EventDelegation para testes
class EventDelegation {
  static registry = new Map();

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

  static init() {
    this.register('[data-action="close-modal"]', 'click', function() {
      const modalId = this.dataset.modalId;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'none';
      }
    });

    this.register('[data-action="open-modal"]', 'click', function() {
      const modalId = this.dataset.modalId;
      if (modalId === 'addHabitModal') AddHabitModal.open();
      if (modalId === 'importExportModal') ImportExportModal.open();
    });
  }

  static unregister(selector, eventType, context = document) {
    const key = `${selector}-${eventType}`;
    const listener = this.registry.get(key);
    if (listener) {
      context.removeEventListener(eventType, listener);
      this.registry.delete(key);
    }
  }

  static clear() {
    this.registry.clear();
  }
}

describe('EventDelegation', () => {
  beforeEach(() => {
    // Limpar registry antes de cada teste
    EventDelegation.clear();

    // Setup DOM
    document.body.innerHTML = `
      <div id="test-container">
        <button data-action="test-action" data-value="123">Test Button</button>
        <div data-action="close-modal" data-modal-id="testModal">Close</div>
      </div>
      <div id="testModal" style="display: flex;">Modal</div>
    `;
  });

  afterEach(() => {
    EventDelegation.clear();
    document.body.innerHTML = '';
  });

  describe('register', () => {
    test('deve registrar um event handler', () => {
      const handler = jest.fn();
      EventDelegation.register('[data-action="test-action"]', 'click', handler);

      const button = document.querySelector('[data-action="test-action"]');
      button.click();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('deve passar o elemento correto como context no handler', () => {
      let capturedContext = null;
      const handler = function() {
        capturedContext = this;
      };

      EventDelegation.register('[data-action="test-action"]', 'click', handler);

      const button = document.querySelector('[data-action="test-action"]');
      button.click();

      expect(capturedContext).toBe(button);
    });

    test('não deve registrar o mesmo handler duas vezes', () => {
      const handler = jest.fn();
      EventDelegation.register('[data-action="test-action"]', 'click', handler);
      EventDelegation.register('[data-action="test-action"]', 'click', handler);

      expect(EventDelegation.registry.size).toBe(1);
    });

    test('deve funcionar com delegação em elementos filhos', () => {
      const handler = jest.fn();
      EventDelegation.register('[data-action="test-action"]', 'click', handler);

      // Criar elemento filho dentro do botão
      const button = document.querySelector('[data-action="test-action"]');
      const span = document.createElement('span');
      span.textContent = 'Child';
      button.appendChild(span);

      // Clicar no filho deve acionar o handler do pai
      span.click();

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('init', () => {
    test('deve inicializar handlers globais de close-modal', () => {
      EventDelegation.init();

      const closeButton = document.querySelector('[data-action="close-modal"]');
      const modal = document.getElementById('testModal');

      expect(modal.style.display).toBe('flex');

      closeButton.click();

      expect(modal.style.display).toBe('none');
    });

    test('deve registrar handlers de open-modal', () => {
      // Limpar registry para evitar handlers anteriores
      EventDelegation.clear();

      // Mock das funções globais
      global.AddHabitModal = { open: jest.fn() };
      global.ImportExportModal = { open: jest.fn() };

      EventDelegation.init();

      // Criar botão de abrir modal
      const openButton = document.createElement('button');
      openButton.setAttribute('data-action', 'open-modal');
      openButton.setAttribute('data-modal-id', 'addHabitModal');
      document.body.appendChild(openButton);

      openButton.click();

      expect(global.AddHabitModal.open).toHaveBeenCalled();

      // Cleanup
      delete global.AddHabitModal;
      delete global.ImportExportModal;
    });
  });

  describe('unregister', () => {
    test('deve remover um handler registrado', () => {
      const handler = jest.fn();
      EventDelegation.register('[data-action="test-action"]', 'click', handler);

      const button = document.querySelector('[data-action="test-action"]');
      button.click();
      expect(handler).toHaveBeenCalledTimes(1);

      EventDelegation.unregister('[data-action="test-action"]', 'click');

      button.click();
      expect(handler).toHaveBeenCalledTimes(1); // Não deve ter aumentado
    });

    test('deve remover entrada do registry', () => {
      const handler = jest.fn();
      EventDelegation.register('[data-action="test-action"]', 'click', handler);

      expect(EventDelegation.registry.size).toBe(1);

      EventDelegation.unregister('[data-action="test-action"]', 'click');

      expect(EventDelegation.registry.size).toBe(0);
    });
  });

  describe('clear', () => {
    test('deve limpar todos os handlers do registry', () => {
      EventDelegation.register('[data-action="test-action"]', 'click', jest.fn());
      EventDelegation.register('[data-action="close-modal"]', 'click', jest.fn());

      expect(EventDelegation.registry.size).toBe(2);

      EventDelegation.clear();

      expect(EventDelegation.registry.size).toBe(0);
    });
  });

  describe('Casos de uso reais', () => {
    test('deve funcionar com múltiplos elementos com mesma action', () => {
      const handler = jest.fn();
      EventDelegation.register('[data-action="test-action"]', 'click', handler);

      // Criar múltiplos botões
      document.body.innerHTML = `
        <button data-action="test-action">Button 1</button>
        <button data-action="test-action">Button 2</button>
        <button data-action="test-action">Button 3</button>
      `;

      const buttons = document.querySelectorAll('[data-action="test-action"]');
      buttons[0].click();
      buttons[1].click();
      buttons[2].click();

      expect(handler).toHaveBeenCalledTimes(3);
    });

    test('deve acessar data-attributes do elemento', () => {
      let capturedValue = null;
      const handler = function() {
        capturedValue = this.dataset.value;
      };

      EventDelegation.register('[data-action="test-action"]', 'click', handler);

      const button = document.querySelector('[data-action="test-action"]');
      button.click();

      expect(capturedValue).toBe('123');
    });
  });
});
