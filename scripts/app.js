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
 * Inicializa a aplicação
 */
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  initializeData();
  renderApp();
  updateThemeIcon();
});
