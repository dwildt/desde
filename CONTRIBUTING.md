# Guia de Contribuição

Obrigado por considerar contribuir com o projeto **Desde**! Este documento fornece diretrizes para tornar o processo de contribuição claro e eficiente.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Workflow de Desenvolvimento](#workflow-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Testes](#testes)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Funcionalidades](#sugerir-funcionalidades)

## 📜 Código de Conduta

Este projeto segue um Código de Conduta para garantir um ambiente acolhedor e inclusivo para todos:

- Seja respeitoso e profissional
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros da comunidade

## 🤝 Como Posso Contribuir?

Existem várias formas de contribuir:

1. **Reportar bugs** - Encontrou um problema? Abra uma issue!
2. **Sugerir funcionalidades** - Tem uma ideia? Compartilhe conosco!
3. **Melhorar documentação** - Documentação nunca é demais
4. **Corrigir bugs** - Escolha uma issue e mande um PR
5. **Implementar features** - Pegue uma issue marcada como `enhancement`
6. **Melhorar testes** - Aumentar cobertura é sempre bem-vindo

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js 20+ e npm
- Git

### Setup

```bash
# 1. Fork o repositório no GitHub

# 2. Clone seu fork
git clone https://github.com/SEU-USUARIO/desde.git
cd desde

# 3. Adicione o repositório original como upstream
git remote add upstream https://github.com/dwildt/desde.git

# 4. Instale as dependências
npm install

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## 🔄 Workflow de Desenvolvimento

### 1. Crie uma Branch

```bash
# Atualize sua main
git checkout main
git pull upstream main

# Crie uma branch para sua feature/fix
git checkout -b tipo/descricao-curta

# Exemplos:
# git checkout -b feature/adicionar-tags
# git checkout -b fix/corrigir-calculo-dias
# git checkout -b docs/melhorar-readme
```

### 2. Faça Suas Mudanças

- Escreva código seguindo os [Padrões de Código](#padrões-de-código)
- Adicione testes quando aplicável
- Mantenha commits pequenos e focados
- Teste localmente antes de commitar

### 3. Execute os Testes

```bash
# Linter (obrigatório passar)
npm run lint

# Testes unitários (obrigatório passar)
npm test

# Testes E2E (recomendado)
npm run test:e2e
```

**IMPORTANTE**: Sempre execute `npm run lint` e `npm test` antes de fazer commit. Se algum comando falhar, corrija os erros antes de prosseguir.

### 4. Commit e Push

```bash
# Adicione seus arquivos
git add .

# Faça commit (veja padrões abaixo)
git commit -m "tipo: descrição curta"

# Push para seu fork
git push origin sua-branch
```

### 5. Abra um Pull Request

1. Vá para o repositório original no GitHub
2. Clique em "New Pull Request"
3. Selecione sua branch
4. Preencha o template de PR
5. Aguarde review

## 📝 Padrões de Código

### JavaScript

- Use ES6+ (const/let, arrow functions, template strings)
- Sem ponto-e-vírgula (configuração ESLint)
- Indentação: 2 espaços
- Aspas simples para strings
- Nomes de variáveis/funções em camelCase
- Nomes de classes em PascalCase

### Estrutura de Componentes

Siga o padrão Atomic Design:

```javascript
class MeuComponente {
  static render(props = {}) {
    return `
      <div class="meu-componente">
        <!-- HTML do componente -->
      </div>
    `
  }

  static initialize() {
    // Inicialização se necessário
  }
}
```

### CSS

- Use CSS Variables definidas em [styles/variables.css](styles/variables.css)
- Prefira classes a IDs
- Nomes de classes em kebab-case
- Organize por componente

```css
.meu-componente {
  padding: var(--spacing-md);
  color: var(--text-primary);
  background: var(--surface-color);
}
```

## ✅ Testes

### Testes Unitários (Jest)

Crie testes em `tests/`:

```javascript
// tests/meu-modulo.test.js
describe('MeuModulo', () => {
  test('deve fazer algo específico', () => {
    // Arrange
    const input = 'valor'

    // Act
    const resultado = MeuModulo.funcao(input)

    // Assert
    expect(resultado).toBe('esperado')
  })
})
```

### Testes E2E (Playwright)

Crie testes em `e2e/`:

```javascript
// e2e/minha-feature.spec.js
test('deve realizar fluxo completo', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // Interações
  await page.click('button:has-text("Meu Botão")')

  // Asserções
  await expect(page.locator('.resultado')).toBeVisible()
})
```

## 📦 Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

### Formato

```
tipo(escopo opcional): descrição curta

[corpo opcional]

[rodapé opcional]
```

### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração
- `test`: Adicionar/corrigir testes
- `chore`: Tarefas de build/config

### Exemplos

```bash
feat: adicionar sistema de tags para hábitos
fix: corrigir cálculo de dias em anos bissextos
docs: atualizar README com novos comandos
test: adicionar testes E2E para import/export
refactor: reorganizar componentes em Atomic Design
```

### Closes Issues

Se o commit resolve uma issue, adicione no final:

```bash
git commit -m "fix: corrigir bug no cálculo - Closes #42"
```

## 🔀 Pull Requests

### Template

Ao abrir um PR, preencha:

```markdown
## Descrição
[Descrição clara das mudanças]

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Checklist
- [ ] Código segue os padrões do projeto
- [ ] Self-review realizado
- [ ] Comentários adicionados em código complexo
- [ ] Documentação atualizada
- [ ] Sem novos warnings
- [ ] Testes adicionados/atualizados
- [ ] Todos os testes passam
- [ ] ESLint passa sem erros

## Issues Relacionadas
Closes #[número da issue]
```

### Boas Práticas

- Um PR deve resolver uma issue/problema específico
- Mantenha PRs pequenos e focados
- Atualize sua branch com main regularmente
- Responda aos comentários de review
- Mantenha o histórico limpo (squash commits se necessário)

## 🐛 Reportar Bugs

Use o template de Bug Report:

1. Vá para [Issues](https://github.com/dwildt/desde/issues)
2. Clique em "New Issue"
3. Selecione "Bug Report"
4. Preencha:
   - Descrição clara do bug
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Ambiente (navegador, OS, versão)
   - Console logs/erros

## 💡 Sugerir Funcionalidades

Use o template de Feature Request:

1. Vá para [Issues](https://github.com/dwildt/desde/issues)
2. Clique em "New Issue"
3. Selecione "Feature Request"
4. Preencha:
   - Descrição da funcionalidade
   - Problema que resolve
   - Solução proposta
   - Alternativas consideradas
   - Impacto (UI, lógica, dados, performance)
   - Prioridade sugerida

## 🏗️ Arquitetura do Projeto

### Atomic Design

```
components/
├── atoms/          # Componentes mais básicos (Button, Input)
├── molecules/      # Combinações de atoms (HabitCard, FormField, HeaderMenu)
└── organisms/      # Componentes complexos (Header, HabitList)
```

**Componentes Molecules:**
- `HabitCard`: Card de exibição de hábito
- `FormField`: Campo de formulário com label
- `HeaderMenu`: Modal com ações secundárias (Sort, Import/Export, Stories, Theme)
- `ThemeToggle`: Toggle de tema claro/escuro
- `ViewModeToggle`: Toggle de visualização (Grid/List)
- `SortSelector`: Seletor de ordenação
- `ConfirmDialog`: Modal de confirmação de ações

### Fluxo de Dados

1. `app.js` orquestra tudo
2. `storage.js` gerencia localStorage
3. Componentes emitem custom events
4. `app.js` escuta eventos e atualiza estado
5. Re-render quando necessário

### Eventos Customizados

```javascript
// Disparar evento
const event = new CustomEvent('habit:add', { detail: { habit } })
window.dispatchEvent(event)

// Escutar evento
window.addEventListener('habit:add', handleAddHabit)
```

## 📚 Recursos Úteis

- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) - Metodologia de componentes
- [Conventional Commits](https://www.conventionalcommits.org/) - Padrão de commits
- [Jest](https://jestjs.io/) - Framework de testes
- [Playwright](https://playwright.dev/) - Testes E2E
- [ESLint](https://eslint.org/) - Linter JavaScript
- [MDN Web Docs](https://developer.mozilla.org/) - Referência Web APIs

## ❓ Dúvidas?

- Abra uma [Discussion](https://github.com/dwildt/desde/discussions)
- Comente em issues existentes
- Entre em contato via [LinkedIn](https://www.linkedin.com/in/davidwildt/)

## 🙏 Agradecimentos

Toda contribuição é valorizada, não importa o tamanho! Obrigado por ajudar a melhorar o Desde.

---

**Happy Coding!** 🚀
