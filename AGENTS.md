# AGENTS.md — AI Assistants no Projeto Desde

Documentação das ferramentas de AI utilizadas no desenvolvimento e suas respectivas configurações.

## Ferramentas em Uso

| Ferramenta | Arquivo de Contexto | Uso Principal |
|------------|-------------------|---------------|
| Claude Code (Anthropic) | `CLAUDE.md` | Desenvolvimento, refatoração, revisão de código, testes |
| GitHub Copilot | `.github/copilot-instructions.md` | Autocomplete e sugestões inline no editor |
| Gemini CLI (Google) | `GEMINI.md` | Consultas e tarefas via terminal |

## Convenções Compartilhadas

Todos os assistentes devem seguir as mesmas regras independentemente da ferramenta:

### Workflow
1. **Sem issue, sem trabalho** — toda alteração precisa de uma issue aberta no GitHub
2. **Testes e lint obrigatórios** — `npm run lint` e `npm test` devem passar antes de qualquer commit
3. **E2E para fluxos de usuário** — `npm run test:e2e` obrigatório para mudanças visíveis
4. **Documentação como entrega** — `README.md` e docs afetados devem ser atualizados junto com o código

### Formato de Commit
Conventional Commits com referência à issue:
```
tipo: descrição curta

Closes #N
```

### Qualidade Mínima
- Lighthouse Accessibility ≥ 100
- ESLint: zero erros/warnings
- WCAG AA: contraste 4.5:1 em texto normal

## Referências

- [CLAUDE.md](CLAUDE.md) — instruções completas para Claude Code
- [GEMINI.md](GEMINI.md) — instruções para Gemini CLI
- [.github/copilot-instructions.md](.github/copilot-instructions.md) — instruções para GitHub Copilot
- [CONTRIBUTING.md](CONTRIBUTING.md) — workflow completo de desenvolvimento
