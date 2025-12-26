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
    startDate: '2025-12-26'
  },
  {
    name: 'Ler livros',
    startDate: '2025-12-26'
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
  const habitsList = document.getElementById('habitsList');

  if (habitsList) {
    habitsList.innerHTML = HabitList.render(habits);

    // Adiciona classe para animações escalonadas
    habitsList.classList.add('loaded');

    // Remove e re-adiciona para re-trigger das animações
    setTimeout(() => {
      habitsList.classList.remove('loaded');
    }, 1000);
  }
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
}

/**
 * Inicializa a aplicação
 */
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  initializeData();
  renderApp();
  updateThemeIcon();
  initializeEventListeners();
});
