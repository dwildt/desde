/**
 * app.js
 * Orquestrador principal da aplicação
 */

// Dados iniciais pré-cadastrados
const INITIAL_HABITS = [
  {
    name: 'Escrevendo',
    startDate: '2024-01-01'
  },
  {
    name: 'Codando',
    startDate: '2025-08-07'
  },
  {
    name: 'Exercícios Físicos',
    startDate: '2025-12-21'
  }
];

/**
 * Inicializa dados pré-cadastrados se não houver dados
 */
function initializeData() {
  const habits = Storage.getHabits();

  if (habits.length === 0) {
    INITIAL_HABITS.forEach(habit => {
      Storage.addHabit(habit);
    });
  }
}

/**
 * Renderiza a aplicação
 */
function renderApp() {
  const habits = Storage.getHabits();
  const settings = Storage.getSettings();
  const habitsList = document.getElementById('habitsList');

  if (habitsList) {
    habitsList.innerHTML = HabitList.render(habits, settings.sortBy);

    // Adiciona classe para animações escalonadas
    habitsList.classList.add('loaded');

    // Remove e re-adiciona para re-trigger das animações
    setTimeout(() => {
      habitsList.classList.remove('loaded');
    }, 1000);
  }

  // Atualizar select de ordenação
  updateSortSelect();
}

/**
 * Toggle tema (função global para onclick)
 */
function toggleTheme() {
  Theme.toggle();
  updateThemeIcon();
}

/**
 * Atualiza ícone do tema
 */
function updateThemeIcon() {
  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) {
    const currentTheme = Theme.getTheme();
    themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  }
}

/**
 * Atualiza select de ordenação
 */
function updateSortSelect() {
  const sortSelect = document.getElementById('habitSort');
  if (sortSelect) {
    const settings = Storage.getSettings();
    sortSelect.value = settings.sortBy || 'most-days';
  }
}

/**
 * Manipula adição de hábito
 */
function handleAddHabit(event) {
  const { name, startDate } = event.detail;

  // Adicionar hábito no storage
  const success = Storage.addHabit({ name, startDate });

  if (success) {
    // Re-renderizar lista
    renderApp();

    // Feedback visual (opcional - por enquanto apenas re-renderiza)
    console.log('Hábito adicionado com sucesso:', name);
  } else {
    alert('Erro ao adicionar hábito. Tente novamente.');
  }
}

/**
 * Manipula deleção de hábito
 */
function handleDeleteHabit(event) {
  const { habitId } = event.detail;

  // Deletar hábito do storage
  const success = Storage.deleteHabit(habitId);

  if (success) {
    // Re-renderizar lista
    renderApp();

    console.log('Hábito deletado com sucesso:', habitId);
  } else {
    alert('Erro ao deletar hábito. Tente novamente.');
  }
}

/**
 * Manipula exportação de dados
 */
function handleExport() {
  const data = Storage.exportData();

  // Criar blob com dados JSON
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });

  // Criar link de download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;

  // Nome do arquivo com data atual
  const date = new Date().toISOString().split('T')[0];
  link.download = `desde-backup-${date}.json`;

  // Fazer download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Limpar URL
  URL.revokeObjectURL(url);

  console.log('Dados exportados com sucesso');
}

/**
 * Manipula importação de dados
 */
function handleImport(event) {
  const { data } = event.detail;

  // Validar e importar dados
  const success = Storage.importData(data);

  if (success) {
    // Re-renderizar aplicação com novos dados
    renderApp();

    // Fechar modal e mostrar mensagem de sucesso
    if (typeof ImportExportModal !== 'undefined') {
      ImportExportModal.close();
    }

    alert('Dados importados com sucesso!');
    console.log('Dados importados com sucesso');
  } else {
    alert('Erro ao importar dados. Verifique se o arquivo está no formato correto.');
  }
}

/**
 * Manipula mudança de ordenação
 */
function handleSortChange(event) {
  const sortBy = event.target.value;

  // Salvar preferência
  const settings = Storage.getSettings();
  settings.sortBy = sortBy;
  Storage.saveSettings(settings);

  // Re-renderizar com nova ordem
  renderApp();
}

/**
 * Inicializa event listeners
 */
function initializeEventListeners() {
  // Listener para adicionar hábito
  window.addEventListener('habit:add', handleAddHabit);

  // Listener para deletar hábito
  window.addEventListener('habit:delete', handleDeleteHabit);

  // Listener para exportar dados
  window.addEventListener('data:export', handleExport);

  // Listener para importar dados
  window.addEventListener('data:import', handleImport);

  // Event delegation: Handler para confirmar deleção de hábito
  EventDelegation.register('[data-action="confirm-delete"]', 'click', function() {
    const habitId = this.dataset.habitId;
    const habitName = this.dataset.habitName;
    ConfirmDialog.open(habitId, habitName);
  });

  // Event delegation: Handler para alternar tema
  EventDelegation.register('[data-action="toggle-theme"]', 'click', toggleTheme);

  // Event delegation: Handler para mudança de ordenação
  EventDelegation.register('[data-action="change-sort"]', 'change', handleSortChange);

  // Event delegation: Handler para abrir story view
  EventDelegation.register('[data-action="open-story"]', 'click', function() {
    StoryView.open(0);
  });

  // Event delegation: Handler para fechar story
  EventDelegation.register('[data-action="close-story"]', 'click', function() {
    StoryView.close();
  });

  // Event delegation: Handler para story anterior
  EventDelegation.register('[data-action="story-prev"]', 'click', function() {
    StoryView.previousStory();
  });

  // Event delegation: Handler para próximo story
  EventDelegation.register('[data-action="story-next"]', 'click', function() {
    StoryView.nextStory();
  });

  // Event delegation: Handler para compartilhar story
  EventDelegation.register('[data-action="share-story"]', 'click', function() {
    StoryView.shareStory();
  });

  // Event delegation: Handler para download story
  EventDelegation.register('[data-action="download-story"]', 'click', function() {
    StoryView.downloadStory();
  });
}

/**
 * Inicializa a aplicação
 */
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  ViewMode.init();
  initializeData();
  renderApp();
  updateThemeIcon();
  initializeEventListeners();

  // Inicializar modais
  if (typeof ConfirmDialog !== 'undefined') {
    ConfirmDialog.init();
  }
  if (typeof AddHabitModal !== 'undefined') {
    AddHabitModal.init();
  }
  if (typeof ImportExportModal !== 'undefined') {
    ImportExportModal.init();
  }

  // Verificar se é a primeira visita e mostrar modal de boas-vindas
  if (typeof WelcomeModal !== 'undefined') {
    WelcomeModal.checkFirstVisit();
  }

  // Inicializar StoryView
  if (typeof StoryView !== 'undefined') {
    StoryView.init();
  }
});
