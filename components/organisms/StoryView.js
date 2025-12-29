/**
 * StoryView.js
 * Modal de visualização tipo Instagram Stories (9:16)
 */

class StoryView {
  /**
   * Renderiza o modal de Story View
   * @returns {string} HTML do modal
   */
  static render() {
    return `
      <div id="storyViewModal" class="story-modal" role="dialog" aria-labelledby="storyTitle" aria-modal="true" style="display: none;">
        <div class="story-modal-overlay" data-action="close-story"></div>

        <div class="story-container">
          <!-- Navegação -->
          <button
            class="story-nav story-nav-prev"
            data-action="story-prev"
            aria-label="Hábito anterior"
            title="Anterior (←)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <button
            class="story-nav story-nav-next"
            data-action="story-next"
            aria-label="Próximo hábito"
            title="Próximo (→)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Conteúdo do Story -->
          <div class="story-content" id="storyContent">
            <!-- Será preenchido dinamicamente -->
          </div>

          <!-- Barra de ações laterais -->
          <div class="story-actions">
            <button
              class="story-action-btn"
              data-action="share-story"
              aria-label="Compartilhar story"
              title="Compartilhar"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="16 6 12 2 8 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <button
              class="story-action-btn"
              data-action="download-story"
              aria-label="Salvar imagem"
              title="Salvar imagem"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="7 10 12 15 17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <button
              class="story-action-btn"
              data-action="close-story"
              aria-label="Fechar visualização"
              title="Fechar (ESC)"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza o conteúdo de um story individual
   * @param {Object} habit - Objeto do hábito
   * @param {number} days - Número de dias
   * @param {string} formattedDate - Data formatada
   * @returns {string} HTML do story
   */
  static renderStoryContent(habit, days, formattedDate) {
    const milestone = Milestones.getCurrentMilestone(days);
    const nextMilestone = Milestones.getNextMilestone(days);
    const daysLabel = days === 1 ? 'Dia' : 'Dias';

    // Mapeamento de cores para SVG gradient
    const colorMap = {
      'bronze': { start: '#ff7b00', end: '#ff9800' },
      'silver': { start: '#ff5722', end: '#ff7043' },
      'gold': { start: '#e91e63', end: '#f06292' },
      'platinum': { start: '#9c27b0', end: '#ba68c8' },
      'diamond': { start: '#673ab7', end: '#9575cd' },
      'sapphire': { start: '#3f51b5', end: '#7986cb' },
      'infinity': { start: '#2196f3', end: '#64b5f6' }
    };

    const colors = colorMap[nextMilestone?.tier.color] || colorMap[milestone.color];

    // Círculo de progresso SVG
    const progressCircle = nextMilestone ? `
      <svg class="story-progress-ring" width="280" height="280" viewBox="0 0 280 280">
        <circle
          class="story-progress-ring-bg"
          cx="140"
          cy="140"
          r="130"
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          stroke-width="8"
        />
        <circle
          class="story-progress-ring-fill"
          cx="140"
          cy="140"
          r="130"
          fill="none"
          stroke="url(#gradient-${milestone.color})"
          stroke-width="8"
          stroke-dasharray="${(nextMilestone.progress / 100) * 816.8} 816.8"
          stroke-linecap="round"
          transform="rotate(-90 140 140)"
        />
        <defs>
          <linearGradient id="gradient-${milestone.color}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>
    ` : '';

    return `
      <div class="story-card" style="background: ${milestone.gradient}">
        <!-- Header -->
        <div class="story-header">
          <div class="story-milestone-badge">
            <span class="story-milestone-icon">${milestone.icon}</span>
            <span class="story-milestone-name">${milestone.name}</span>
          </div>
          <div class="story-label">Desde</div>
        </div>

        <!-- Conteúdo principal -->
        <div class="story-main">
          ${progressCircle}

          <div class="story-days-container">
            <div class="story-days-number">${days}</div>
            <div class="story-days-label">${daysLabel}</div>
          </div>

          <div class="story-habit-name">${this.escapeHtml(habit.name)}</div>
          <div class="story-date">Desde ${formattedDate}</div>

          ${nextMilestone ? `
            <div class="story-next-milestone">
              <div class="story-next-label">Próximo marco</div>
              <div class="story-next-info">
                <span class="story-next-icon">${nextMilestone.tier.icon}</span>
                <span class="story-next-name">${nextMilestone.tier.name}</span>
              </div>
              <div class="story-next-days">${Milestones.getProgressText(days)}</div>
            </div>
          ` : `
            <div class="story-max-milestone">
              <div class="story-trophy">🏆</div>
              <div class="story-max-text">Marco Máximo Atingido!</div>
            </div>
          `}
        </div>

        <!-- Footer -->
        <div class="story-footer">
          <div class="story-branding">
            <span class="story-app-icon">🗓️</span>
            <div class="story-branding-text">
              <span class="story-app-name">Desde</span>
              <span class="story-app-url">dwildt.github.io/desde</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Escapa HTML para prevenir XSS
   * @param {string} str - String para escapar
   * @returns {string} String escapada
   */
  static escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Abre o modal de Story View
   * @param {number} habitIndex - Índice do hábito a exibir
   */
  static open(habitIndex = 0) {
    const modal = document.getElementById('storyViewModal');
    if (!modal) return;

    const habits = Storage.getHabits();
    const settings = Storage.getSettings();
    const sortedHabits = HabitUtils.sortHabits(habits, settings.sortBy);

    if (sortedHabits.length === 0) return;

    // Garantir índice válido
    this.currentIndex = Math.max(0, Math.min(habitIndex, sortedHabits.length - 1));
    this.habits = sortedHabits;

    this.renderCurrentStory();

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Foco no container para capturar teclas
    setTimeout(() => {
      const container = modal.querySelector('.story-container');
      if (container) container.focus();
    }, 100);
  }

  /**
   * Fecha o modal de Story View
   */
  static close() {
    const modal = document.getElementById('storyViewModal');
    if (!modal) return;

    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  /**
   * Renderiza o story atual
   */
  static renderCurrentStory() {
    if (!this.habits || this.habits.length === 0) return;

    const habit = this.habits[this.currentIndex];
    const days = HabitUtils.calculateDaysSince(habit.startDate);
    const formattedDate = HabitUtils.formatDate(habit.startDate);

    const content = document.getElementById('storyContent');
    if (content) {
      content.innerHTML = this.renderStoryContent(habit, days, formattedDate);
    }

    // Atualizar estado dos botões de navegação
    const prevBtn = document.querySelector('.story-nav-prev');
    const nextBtn = document.querySelector('.story-nav-next');

    if (prevBtn) {
      prevBtn.disabled = this.currentIndex === 0;
      prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
    }

    if (nextBtn) {
      nextBtn.disabled = this.currentIndex === this.habits.length - 1;
      nextBtn.style.opacity = this.currentIndex === this.habits.length - 1 ? '0.3' : '1';
    }
  }

  /**
   * Navega para o story anterior
   */
  static previousStory() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderCurrentStory();
    }
  }

  /**
   * Navega para o próximo story
   */
  static nextStory() {
    if (this.currentIndex < this.habits.length - 1) {
      this.currentIndex++;
      this.renderCurrentStory();
    }
  }

  /**
   * Compartilha o story usando Web Share API
   */
  static async shareStory() {
    if (!this.habits || this.habits.length === 0) return;

    const habit = this.habits[this.currentIndex];
    const days = HabitUtils.calculateDaysSince(habit.startDate);
    const milestone = Milestones.getCurrentMilestone(days);
    const daysLabel = days === 1 ? 'dia' : 'dias';

    const shareData = {
      title: `Desde - ${habit.name}`,
      text: `🎯 ${habit.name}\n${milestone.icon} Marco ${milestone.name}\n📅 ${days} ${daysLabel} de continuidade!\n\nRastreie seus hábitos com Desde:`,
      url: window.location.href
    };

    // Verificar se Web Share API está disponível
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('Story compartilhado com sucesso');
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Erro ao compartilhar:', error);
          this.fallbackShare(shareData);
        }
      }
    } else {
      this.fallbackShare(shareData);
    }
  }

  /**
   * Fallback para compartilhamento (copiar para clipboard)
   * @param {Object} shareData - Dados para compartilhar
   */
  static fallbackShare(shareData) {
    const text = `${shareData.text}\n${shareData.url}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          alert('✅ Texto copiado para a área de transferência!');
        })
        .catch(err => {
          console.error('Erro ao copiar:', err);
          alert('❌ Erro ao copiar texto');
        });
    } else {
      alert('Compartilhamento não disponível neste navegador');
    }
  }

  /**
   * Salva o story como imagem (placeholder para futura implementação com html2canvas)
   */
  static downloadStory() {
    if (!this.habits || this.habits.length === 0) return;

    const habit = this.habits[this.currentIndex];
    const days = HabitUtils.calculateDaysSince(habit.startDate);

    // Placeholder - futura implementação com html2canvas
    alert(`📸 Funcionalidade de download em desenvolvimento!\n\nPor enquanto, você pode:\n• Tirar um screenshot da tela (Print Screen)\n• Usar a ferramenta de recorte do seu sistema\n\nHábito: ${habit.name}\nDias: ${days}`);

    console.log('Download story - Em desenvolvimento. Use html2canvas para implementar.');
  }

  /**
   * Inicializa event listeners
   */
  static init() {
    // Listeners já são registrados via EventDelegation no app.js
    // Este método fica aqui para consistência com outros componentes

    // Listener de teclado
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('storyViewModal');
      if (!modal || modal.style.display === 'none') return;

      switch(e.key) {
        case 'Escape':
          this.close();
          break;
        case 'ArrowLeft':
          this.previousStory();
          break;
        case 'ArrowRight':
          this.nextStory();
          break;
      }
    });
  }
}

// Estado do componente
StoryView.currentIndex = 0;
StoryView.habits = [];
