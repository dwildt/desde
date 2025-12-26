/**
 * WelcomeModal.js
 * Modal de boas-vindas exibido na primeira visita
 */

class WelcomeModal {
  /**
   * Renderiza o modal de boas-vindas
   * @returns {string} HTML do modal
   */
  static render() {
    return `
      <div
        id="welcomeModal"
        class="modal"
        style="display: none;"
        role="dialog"
        aria-labelledby="welcomeModalTitle"
        aria-modal="true"
      >
        <div class="modal-overlay"></div>
        <div class="modal-content welcome-modal-content">
          <div class="modal-header">
            <h2 id="welcomeModalTitle">👋 Bem-vindo ao Desde!</h2>
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
              <h3>🗑️ Hábitos de Exemplo</h3>
              <p>
                Os 3 hábitos que você está vendo são apenas <strong>exemplos</strong>.
                Você pode deletá-los clicando no ícone 🗑️ em cada card.
              </p>
            </div>

            <div class="welcome-section">
              <h3>➕ Adicione Seus Hábitos</h3>
              <p>
                Clique em <strong>"+ Adicionar Hábito"</strong> no topo da página e informe:
              </p>
              <ul>
                <li>O nome do hábito</li>
                <li>A data em que você começou a mantê-lo</li>
              </ul>
            </div>

            <div class="welcome-section welcome-important">
              <h3>💾 Dados Locais</h3>
              <p>
                <strong>Importante:</strong> Seus dados ficam armazenados <strong>localmente no navegador</strong> deste dispositivo.
              </p>
              <ul>
                <li>Os dados são <strong>seus</strong> e ficam apenas no seu dispositivo</li>
                <li>Configure no dispositivo que você <strong>normalmente consulta</strong></li>
                <li>Use a função de <strong>Export/Import (💾)</strong> para fazer backup ou sincronizar entre dispositivos</li>
              </ul>
              <p class="welcome-tip">
                💡 <strong>Dica:</strong> Daniel Wildt, por exemplo, mantém suas configurações no celular dele,
                pois é onde ele consulta diariamente seus hábitos.
              </p>
            </div>
          </div>

          <div class="modal-footer">
            ${Button.render({
              text: 'Entendi, vamos começar!',
              variant: 'primary',
              onClick: 'WelcomeModal.close()',
              ariaLabel: 'Fechar modal de boas-vindas e começar a usar'
            })}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Verifica se é a primeira visita e abre o modal
   */
  static checkFirstVisit() {
    const hasVisited = localStorage.getItem('desde-has-visited');

    if (!hasVisited) {
      // Aguardar um pouco para garantir que a página carregou
      setTimeout(() => {
        this.open();
      }, 500);
    }
  }

  /**
   * Abre o modal de boas-vindas
   */
  static open() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
      modal.style.display = 'flex';

      // Adicionar listener para tecla ESC
      this.escListener = (e) => {
        if (e.key === 'Escape') {
          this.close();
        }
      };
      document.addEventListener('keydown', this.escListener);

      // Focus no botão
      setTimeout(() => {
        const button = modal.querySelector('button');
        if (button) button.focus();
      }, 100);
    }
  }

  /**
   * Fecha o modal e marca como visitado
   */
  static close() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
      modal.style.display = 'none';

      // Marcar que o usuário já visitou
      localStorage.setItem('desde-has-visited', 'true');

      // Remover listener da tecla ESC
      if (this.escListener) {
        document.removeEventListener('keydown', this.escListener);
        this.escListener = null;
      }
    }
  }
}
