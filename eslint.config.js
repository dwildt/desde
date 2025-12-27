const js = require('@eslint/js');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      '**/*.config.js',
      'tests/setup.js',
      'coverage/**',
      'playwright-report/**',
      'test-results/**'
    ]
  },
  {
    files: ['scripts/**/*.js', 'components/**/*.js', 'tests/**/*.js', 'e2e/**/*.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        alert: 'readonly',
        setTimeout: 'readonly',
        Blob: 'readonly',
        URL: 'readonly',
        FileReader: 'readonly',
        CustomEvent: 'readonly',

        // Jest globals
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
        global: 'readonly',

        // Playwright globals
        page: 'readonly',

        // Node.js globals (para testes E2E)
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',

        // Classes da aplicação (globals para componentes)
        Storage: 'readonly',
        HabitUtils: 'readonly',
        Theme: 'readonly',
        Button: 'readonly',
        Input: 'readonly',
        Icon: 'readonly',
        Badge: 'readonly',
        HabitCard: 'readonly',
        FormField: 'readonly',
        ThemeToggle: 'readonly',
        ConfirmDialog: 'readonly',
        Header: 'readonly',
        HabitList: 'readonly',
        AddHabitModal: 'readonly',
        ImportExportModal: 'readonly',
        WelcomeModal: 'readonly',

        // Funções globais (app.js)
        toggleTheme: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'off',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': 'off', // Desabilitado devido a template strings com HTML
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'no-redeclare': 'off',
      'prefer-const': 'error'
    }
  }
];
