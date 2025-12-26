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
      <div id="importExportModal" class="modal" style="display: none;">
        <div class="modal-overlay" onclick="ImportExportModal.close()"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h2>Importar / Exportar Dados</h2>
            <button class="modal-close" onclick="ImportExportModal.close()" aria-label="Fechar modal">
              ✕
            </button>
          </div>

          <div class="modal-body">
            <!-- Export Section -->
            <div class="import-export-section">
              <h3>Exportar Dados</h3>
              <p class="section-description">
                Faça backup dos seus hábitos exportando para um arquivo JSON.
              </p>
              ${Button.render({
                text: '📥 Baixar JSON',
                variant: 'primary',
                onClick: 'ImportExportModal.handleExport()',
                ariaLabel: 'Exportar dados para JSON'
              })}
            </div>

            <!-- Divider -->
            <div class="modal-divider"></div>

            <!-- Import Section -->
            <div class="import-export-section">
              <h3>Importar Dados</h3>
              <p class="section-description">
                Restaure seus hábitos a partir de um arquivo JSON exportado anteriormente.
              </p>

              <input
                type="file"
                id="importFileInput"
                accept=".json"
                style="display: none;"
                onchange="ImportExportModal.handleFileSelect(event)"
              />

              ${Button.render({
                text: '📤 Selecionar Arquivo',
                variant: 'secondary',
                onClick: 'document.getElementById("importFileInput").click()',
                ariaLabel: 'Selecionar arquivo JSON para importar'
              })}

              <p id="importFileName" class="import-file-name"></p>
            </div>
          </div>

          <div class="modal-footer">
            ${Button.render({
              text: 'Fechar',
              variant: 'secondary',
              onClick: 'ImportExportModal.close()'
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
