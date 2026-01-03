/**
 * HelpModal.js
 * Modal com instruções de uso do aplicativo
 */

/* global Button */

class HelpModal {
  /**
   * Renderiza o modal de ajuda
   * @returns {string} HTML do modal
   */
  static render() {
    const closeButton = Button.render({
      text: 'Fechar',
      variant: 'primary',
      action: 'close-modal',
      actionData: { modalId: 'helpModal' },
      ariaLabel: 'Fechar modal de ajuda'
    });

    return `
      <div
        id="helpModal"
        class="modal"
        style="display: none;"
        role="dialog"
        aria-labelledby="helpModalTitle"
        aria-modal="true"
      >
        <div class="modal-overlay" data-action="close-modal" data-modal-id="helpModal"></div>
        <div class="modal-content welcome-modal-content">
          <div class="modal-header">
            <h2 id="helpModalTitle">❓ Como Usar o Desde</h2>
            <button
              class="modal-close"
              data-action="close-modal"
              data-modal-id="helpModal"
              aria-label="Fechar modal de ajuda"
            >
              ✕
            </button>
          </div>

          <div class="modal-body">
            <div class="welcome-section">
              <h3>🎯 O que é o Desde?</h3>
              <p>
                Um rastreador de hábitos que mostra quantos dias se passaram desde que você começou cada hábito.
                Perfeito para manter a motivação visual de consistência!
              </p>
            </div>

            <div class="welcome-section">
              <h3>➕ Como Adicionar Hábitos</h3>
              <p>
                Clique em <strong>"+ Adicionar Hábito"</strong> no topo da página e informe:
              </p>
              <ul>
                <li>O nome do hábito</li>
                <li>A data em que você começou a mantê-lo</li>
              </ul>
            </div>

            <div class="welcome-section">
              <h3>💾 Exportar e Importar Dados</h3>
              <p>
                Use o menu hambúrguer (☰) para acessar a opção <strong>"💾 Importar/Exportar"</strong>:
              </p>
              <ul>
                <li><strong>Exportar:</strong> Faça backup dos seus hábitos em um arquivo JSON</li>
                <li><strong>Importar:</strong> Restaure seus dados em outro dispositivo ou navegador</li>
              </ul>
            </div>

            <div class="welcome-section welcome-important">
              <h3>💡 Dados Locais</h3>
              <p>
                <strong>Importante:</strong> Seus dados ficam armazenados <strong>localmente no navegador</strong> deste dispositivo.
              </p>
              <ul>
                <li>Os dados são <strong>seus</strong> e ficam apenas no seu dispositivo</li>
                <li>Configure no dispositivo que você <strong>normalmente consulta</strong></li>
                <li>Use a função de <strong>Export/Import (💾)</strong> para fazer backup ou sincronizar entre dispositivos</li>
              </ul>
            </div>
          </div>

          <div class="modal-footer">
            ${closeButton}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Abre o modal de ajuda
   */
  static open() {
    const modal = document.getElementById('helpModal');
    if (modal) {
      modal.style.display = 'flex';

      // Adicionar listener para tecla ESC
      this.escListener = (e) => {
        if (e.key === 'Escape') {
          this.close();
        }
      };
      document.addEventListener('keydown', this.escListener);

      // Focus no botão de fechar
      setTimeout(() => {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
      }, 100);
    }
  }

  /**
   * Fecha o modal
   */
  static close() {
    const modal = document.getElementById('helpModal');
    if (modal) {
      modal.style.display = 'none';

      // Remover listener da tecla ESC
      if (this.escListener) {
        document.removeEventListener('keydown', this.escListener);
        this.escListener = null;
      }
    }
  }
}
