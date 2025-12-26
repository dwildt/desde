# Desde - Rastreador de Hábitos

Um aplicativo web minimalista para rastrear seus hábitos e ver há quantos dias você está mantendo-os. Construído com JavaScript vanilla e foco em simplicidade e performance.

## 🎯 Sobre o Projeto

**Desde** (do espanhol "desde" = "desde") é um rastreador de hábitos que mostra visualmente quantos dias se passaram desde que você começou cada hábito. Perfeito para quem quer manter motivação visual de consistência em suas práticas diárias.

### Características Principais

- ✨ Interface limpa e intuitiva
- 📊 Visualização em cards com contadores de dias
- 🌓 Modo claro e escuro
- 💾 Export/Import de dados em JSON
- 📱 Totalmente responsivo
- ⚡ 100% Vanilla JavaScript (sem frameworks)
- 🎨 Design System baseado nas cores Wildtech
- ♿ Acessível (ARIA labels, navegação por teclado)
- 🔒 Dados salvos localmente no navegador

## 🚀 Demo

🔗 **[Ver aplicação ao vivo](https://dwildt.github.io/desde/)**

## 📸 Screenshots

### Modo Claro
![Modo Light](docs/screenshots/light-mode.png)

### Modo Escuro
![Modo Dark](docs/screenshots/dark-mode.png)

### Adicionar Hábito
![Adicionar Hábito](docs/screenshots/add-habit.png)

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3 (CSS Variables), JavaScript (ES6+)
- **Arquitetura**: Atomic Design (Atoms → Molecules → Organisms)
- **Armazenamento**: LocalStorage API
- **Testes Unitários**: Jest + JSDOM
- **Testes E2E**: Playwright (Chromium, Firefox, WebKit)
- **Qualidade de Código**: ESLint
- **CI/CD**: GitHub Actions
- **Deploy**: GitHub Pages

## 📦 Instalação e Uso

### Pré-requisitos

- Node.js 20+ e npm

### Instalação

```bash
# Clonar repositório
git clone https://github.com/dwildt/desde.git
cd desde

# Instalar dependências
npm install
```

### Executar Localmente

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Aplicação estará disponível em http://localhost:3000
```

### Executar Testes

```bash
# Testes unitários
npm test

# Testes E2E
npm run test:e2e

# Linter
npm run lint
```

## 📚 Como Usar

1. **Adicionar um hábito**: Clique em "+ Adicionar Hábito", preencha o nome e a data de início
2. **Ver progresso**: Cada card mostra quantos dias se passaram desde o início
3. **Deletar hábito**: Clique no ícone 🗑️ no card (com confirmação)
4. **Alternar tema**: Use o botão 🌙/☀️ no cabeçalho
5. **Export/Import**: Clique em 💾 para fazer backup ou restaurar dados

### Estrutura de Dados (Export JSON)

```json
{
  "exportDate": "2025-12-26T00:00:00.000Z",
  "version": "1.0.0",
  "data": {
    "habits": [
      {
        "id": "uuid-v4",
        "name": "Escrevendo",
        "startDate": "2024-01-01",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  },
  "settings": {
    "theme": "light",
    "language": "pt"
  }
}
```

## 🏗️ Arquitetura

### Atomic Design

O projeto segue a metodologia Atomic Design para organização de componentes:

```
components/
├── atoms/          # Componentes básicos
│   ├── Button.js
│   ├── Input.js
│   ├── Icon.js
│   └── Badge.js
├── molecules/      # Combinações de atoms
│   ├── HabitCard.js
│   ├── FormField.js
│   ├── ThemeToggle.js
│   └── ConfirmDialog.js
└── organisms/      # Componentes complexos
    ├── Header.js
    ├── HabitList.js
    ├── AddHabitModal.js
    └── ImportExportModal.js
```

### Estrutura de Pastas

```
desde/
├── .github/
│   ├── workflows/          # CI/CD (ci.yml, deploy.yml)
│   └── ISSUE_TEMPLATE/     # Templates de issues
├── components/             # Componentes Atomic Design
├── scripts/
│   ├── app.js             # Orquestrador principal
│   ├── storage.js         # LocalStorage API
│   ├── habit-utils.js     # Cálculo de datas
│   └── theme.js           # Gerenciamento de tema
├── styles/
│   ├── main.css
│   ├── variables.css      # Design System
│   ├── themes.css         # Dark/Light themes
│   └── components.css
├── tests/                 # Testes unitários (Jest)
├── e2e/                   # Testes E2E (Playwright)
├── index.html
├── package.json
├── jest.config.js
├── playwright.config.js
└── eslint.config.js
```

## 🎨 Design System

### Cores Wildtech

**Light Mode**
- Primário: `#ff7b00` (laranja)
- Secundário: `#8b4513` (marrom)
- Gradiente: `linear-gradient(135deg, #ff7b00 0%, #8b4513 100%)`
- Background: `#f5f7fa`
- Surface: `#ffffff`
- Texto: `#333333`

**Dark Mode**
- Background: `#1a1a1a`
- Surface: `#2d2d2d`
- Texto: `#e0e0e0`
- (Primário e gradiente mantidos)

## 🧪 Testes

### Cobertura de Testes

- **22 testes unitários** (Storage, HabitUtils, Theme)
- **13 testes E2E** (Fluxo principal, Tema, Import/Export)
- **Total**: 35 testes automatizados

### Executar Testes

```bash
# Todos os testes unitários
npm test

# Com cobertura
npm test -- --coverage

# Testes E2E (requer aplicação rodando)
npm run test:e2e

# Testes E2E com UI
npx playwright test --ui
```

## 🚀 Deploy

O projeto usa GitHub Actions para CI/CD automático:

- **CI**: Roda ESLint + Jest + Playwright a cada push/PR
- **Deploy**: Deploya automaticamente para GitHub Pages ao fazer push na branch `main`

### Deploy Manual

```bash
# Build não é necessário (Vanilla JS)
# Apenas commitar e fazer push para main
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

## 🤝 Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre como contribuir com o projeto.

## 📋 Hábitos Pré-cadastrados

A aplicação vem com 4 hábitos de exemplo (carregados na primeira execução):

1. **Escrevendo** - desde 01/01/2024
2. **Codando** - desde 07/08/2025
3. **Exercícios Físicos** - desde 26/12/2025
4. **Ler livros** - desde 26/12/2025

Você pode deletá-los e adicionar os seus próprios!

## 📄 Licença

Este projeto é open source e está disponível sob a [MIT License](LICENSE).

## 👨‍💻 Autor

Desenvolvido por **David Wildt** como parte do desafio #100DaysOfCode.

- GitHub: [@dwildt](https://github.com/dwildt)
- LinkedIn: [David Wildt](https://www.linkedin.com/in/davidwildt/)

## 🙏 Agradecimentos

- Design inspirado nas cores da [Wildtech](https://wildtech.com.br/)
- Metodologia Atomic Design por Brad Frost
- Comunidade #100DaysOfCode

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
