# CLAUDE.md — Instruções para Claude Code

Contexto do projeto **Desde** para o Claude Code CLI.

## Projeto

Rastreador de hábitos em **Vanilla JavaScript puro** (sem frameworks). O usuário informa quando começou um hábito e o app mostra há quantos dias ele mantém a prática.

- **Stack**: HTML5, CSS3 (CSS Variables), JavaScript ES6+ sem transpiler
- **Armazenamento**: LocalStorage (sem banco de dados, sem backend)
- **Deploy**: GitHub Pages (arquivos estáticos)
- **CI**: GitHub Actions — ESLint + Jest + Playwright a cada push/PR

## Comandos

```bash
npm start              # servidor local em http://localhost:3000
npm test               # testes unitários (Jest) — 68 testes
npm run test:coverage  # testes com relatório de cobertura
npm run test:e2e       # testes E2E (Playwright) — 45 testes, 3 browsers
npm run lint           # ESLint
npm run lint:fix       # ESLint com autocorreção
npm run audit          # lint + testes unitários (atalho pré-commit)
```

## Arquitetura

### Atomic Design

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

### Scripts principais

| Arquivo | Responsabilidade |
|---------|-----------------|
| `scripts/app.js` | Orquestrador — inicializa e re-renderiza |
| `scripts/storage.js` | CRUD no localStorage |
| `scripts/habit-utils.js` | Cálculo de datas e ordenação |
| `scripts/milestones.js` | Sistema de marcos (Bronze → Infinito) |
| `scripts/view-mode.js` | Alternância grid/lista |
| `scripts/event-delegation.js` | Delegação de eventos global |
| `scripts/theme.js` | Dark/light mode |

### CSS

| Arquivo | Conteúdo |
|---------|----------|
| `styles/variables.css` | Tokens de design (cores, espaçamento, tipografia) |
| `styles/themes.css` | Overrides dark mode |
| `styles/components.css` | Estilos gerais de componentes |
| `styles/milestones.css` | Badges e gradientes de marcos |
| `styles/story-mode.css` | Layout Stories 9:16 |
| `styles/view-modes.css` | Grid e lista compacta |
| `styles/animations.css` | Transições e animações |

## Convenções de Código

- **Sem frameworks** — zero dependências de runtime
- **Classes estáticas** — componentes são classes com métodos `static render()` que retornam strings HTML
- **ES6+** — const/let, arrow functions, template literals, destructuring
- **Sem ponto-e-vírgula** — configuração ESLint do projeto
- **Aspas simples** para strings JS
- **kebab-case** para classes CSS, **camelCase** para variáveis JS, **PascalCase** para classes
- **Sem comentários óbvios** — só documentar o WHY quando não for evidente
- **XSS**: sempre usar `escapeHtml()` antes de interpolar input do usuário no HTML

### Padrão de componente

```javascript
class MeuComponente {
  static render(props = {}) {
    return `<div class="meu-componente">...</div>`
  }
}
```

### CSS Variables obrigatórias

Nunca usar valores literais de cor ou espaçamento. Usar sempre variáveis de `variables.css`:
- Cores: `var(--primary-orange)`, `var(--text-primary)`, `var(--surface)`, etc.
- Espaçamento: `var(--spacing-sm)`, `var(--spacing-md)`, etc.
- Bordas: `var(--border-radius-md)`, `var(--border-color)`, etc.

## Workflow Obrigatório

1. **Toda mudança precisa de uma issue** aberta no GitHub antes de começar
2. **Antes de commitar**: `npm run lint` e `npm test` devem passar
3. **Mudanças em fluxos de usuário**: `npm run test:e2e` deve passar
4. **Commits**: Conventional Commits com referência à issue (`Closes #N`)
5. **Documentação**: atualizar `README.md` e outros docs afetados como parte da entrega

### Formato de commit

```
tipo(escopo): descrição curta (#N)

Closes #N
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`

## Qualidade

- **Lighthouse Accessibility**: 100 — não regredir
- **ESLint**: zero warnings/errors
- **Testes**: todos devem passar antes de qualquer push
- **WCAG AA**: contraste mínimo 4.5:1 para texto normal

## Testes

### Unitários (Jest + JSDOM)
- Localização: `tests/`
- Cobrem: `habit-utils`, `milestones`, `storage`, `theme`, `event-delegation`
- Componentes visuais não têm testes unitários (são templates HTML estáticos)

### E2E (Playwright)
- Localização: `e2e/`
- Browsers: Chromium, Firefox, WebKit
- Cobrem: blank state, hábitos (CRUD), tema, import/export, header menu
- WebKit está desativado no CI para reduzir tempo de execução
