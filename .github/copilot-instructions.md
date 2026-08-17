# Instruções para GitHub Copilot

Contexto do projeto **Desde** — rastreador de hábitos em Vanilla JavaScript puro (sem frameworks).

## Stack

- **Frontend**: HTML5, CSS3 (CSS Variables), JavaScript ES6+ sem transpiler
- **Armazenamento**: LocalStorage (sem banco de dados, sem backend)
- **Testes**: Jest (unitários) + Playwright (E2E — Chromium, Firefox, WebKit)
- **Linter**: ESLint
- **Deploy**: GitHub Pages via GitHub Actions

## Arquitetura — Atomic Design

```
components/
├── atoms/         Button.js, Input.js, Icon.js, Badge.js
├── molecules/     HabitCard.js, FormField.js, HeaderMenu.js,
│                  ThemeToggle.js, ViewModeToggle.js, SortSelector.js,
│                  ConfirmDialog.js
└── organisms/     Header.js, HabitList.js, AddHabitModal.js,
                   ImportExportModal.js, HelpModal.js, WelcomeModal.js,
                   StoryView.js
```

Componentes são **classes com métodos estáticos** que retornam strings HTML:

```javascript
class MeuComponente {
  static render(props = {}) {
    return `<div class="meu-componente">...</div>`
  }
}
```

## Convenções

- Sem ponto-e-vírgula (ESLint configurado)
- Aspas simples para strings JS
- `kebab-case` para classes CSS, `camelCase` para variáveis, `PascalCase` para classes
- Sem comentários óbvios — documentar apenas o WHY quando não for evidente
- Sempre usar `escapeHtml()` antes de interpolar input do usuário no HTML
- Sempre usar CSS Variables (`var(--spacing-md)`, `var(--text-primary)`) — nunca valores literais

## Comandos

```bash
npm start              # servidor local em http://localhost:3000
npm test               # testes unitários
npm run test:e2e       # testes E2E
npm run lint           # ESLint
npm run audit          # lint + testes (atalho pré-commit)
```

## Workflow Obrigatório

1. **Toda mudança precisa de uma issue** aberta no GitHub antes de começar
2. **Antes de commitar**: `npm run lint` e `npm test` devem passar sem erros
3. **Mudanças em fluxos de usuário**: `npm run test:e2e` deve passar
4. **Documentação**: atualizar `README.md` e outros docs afetados como parte da entrega

## Formato de Commit

Conventional Commits com referência à issue:

```
tipo: descrição curta

Closes #N
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`

## Qualidade

- **Lighthouse Accessibility**: 100 — não regredir
- **WCAG AA**: contraste mínimo 4.5:1 para texto normal
- **ESLint**: zero warnings/errors antes de qualquer commit
