/**
 * ImportExportModal.js
 * Modal para importar e exportar dados em JSON
 */

class ImportExportModal {
  /**
   * Renderiza o modal de import/export
   * @returns {string} HTML do modal
   */
  static render() {
    return `
      <div
        id="importExportModal"
        class="modal"
        style="display: none;"
        role="dialog"
        aria-labelledby="importExportModalTitle"
        aria-modal="true"
      >
        <div class="modal-overlay" onclick="ImportExportModal.close()"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h2 id="importExportModalTitle">Importar / Exportar Dados</h2>
            <button
              class="modal-close"
              onclick="ImportExportModal.close()"
              aria-label="Fechar modal de importar/exportar"
              data-tooltip="Fechar"
              tabindex="0"
            >
              ✕
            </button>
          </div>

          <div class="modal-body">
            <!-- Export Section -->
            <section class="import-export-section" aria-labelledby="exportSectionTitle">
              <h3 id="exportSectionTitle">Exportar Dados</h3>
              <p class="section-description">
                Faça backup dos seus hábitos exportando para um arquivo JSON.
              </p>
              ${Button.render({
      text: '📥 Baixar JSON',
      variant: 'primary',
      onClick: 'ImportExportModal.handleExport()',
      ariaLabel: 'Exportar dados para JSON'
    })}
            </section>

            <!-- Divider -->
            <div class="modal-divider" role="separator" aria-hidden="true"></div>

            <!-- Import Section -->
            <section class="import-export-section" aria-labelledby="importSectionTitle">
              <h3 id="importSectionTitle">Importar Dados</h3>
              <p class="section-description">
                Restaure seus hábitos a partir de um arquivo JSON exportado anteriormente.
              </p>

              <input
                type="file"
                id="importFileInput"
                accept=".json"
                style="display: none;"
                onchange="ImportExportModal.handleFileSelect(event)"
                aria-label="Selecionar arquivo JSON"
              />

              ${Button.render({
      text: '📤 Selecionar Arquivo',
      variant: 'secondary',
      onClick: 'document.getElementById("importFileInput").click()',
      ariaLabel: 'Selecionar arquivo JSON para importar'
    })}

              <p id="importFileName" class="import-file-name" role="status" aria-live="polite"></p>
            </section>
          </div>

          <div class="modal-footer">
            ${Button.render({
      text: 'Fechar',
      variant: 'secondary',
      onClick: 'ImportExportModal.close()',
      ariaLabel: 'Fechar modal'
    })}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Abre o modal
   */
  static open() {
    const modal = document.getElementById('importExportModal');
    if (modal) {
      modal.style.display = 'flex';

      // Limpar nome do arquivo selecionado
      const fileNameEl = document.getElementById('importFileName');
      if (fileNameEl) {
        fileNameEl.textContent = '';
      }

      // Adicionar listener para tecla ESC
      this.escListener = (e) => {
        if (e.key === 'Escape') {
          this.close();
        }
      };
      document.addEventListener('keydown', this.escListener);

      // Focus no primeiro botão
      setTimeout(() => {
        const firstButton = modal.querySelector('button');
        if (firstButton) firstButton.focus();
      }, 100);
    }
  }

  /**
   * Fecha o modal
   */
  static close() {
    const modal = document.getElementById('importExportModal');
    if (modal) {
      modal.style.display = 'none';

      // Resetar input de arquivo
      const fileInput = document.getElementById('importFileInput');
      if (fileInput) {
        fileInput.value = '';
      }

      // Remover listener da tecla ESC
      if (this.escListener) {
        document.removeEventListener('keydown', this.escListener);
        this.escListener = null;
      }
    }
  }

  /**
   * Manipula exportação de dados
   */
  static handleExport() {
    // Emitir evento customizado para export
    const exportEvent = new CustomEvent('data:export');
    window.dispatchEvent(exportEvent);
  }

  /**
   * Manipula seleção de arquivo
   * @param {Event} event - Evento de change do input file
   */
  static handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Mostrar nome do arquivo
    const fileNameEl = document.getElementById('importFileName');
    if (fileNameEl) {
      fileNameEl.textContent = `Arquivo selecionado: ${file.name}`;
    }

    // Ler arquivo
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        // Emitir evento customizado com os dados
        const importEvent = new CustomEvent('data:import', {
          detail: { data }
        });
        window.dispatchEvent(importEvent);
      } catch (error) {
        alert('Erro ao ler arquivo JSON. Verifique se o arquivo está no formato correto.');
        console.error('Erro ao fazer parse do JSON:', error);
      }
    };

    reader.onerror = () => {
      alert('Erro ao ler arquivo. Tente novamente.');
    };

    reader.readAsText(file);
  }
}
