# Mental Health — Vue 3 (Refatorado)

Projeto refatorado com **Vue 3 + Vite**, seguindo a metodologia de componentização.

## 🏗️ Estrutura

```
src/
├── assets/
│   ├── global.css          # Design tokens e reset global
│   ├── icons/
│   └── images/
├── composables/
│   ├── useApi.js           # Chamadas à API do backend
│   └── useStorage.js       # Abstração do localStorage
├── components/
│   ├── GradientLayout.vue  # Wrapper com gradiente de fundo
│   ├── BaseInput.vue       # Input reutilizável (v-model)
│   ├── BaseButton.vue      # Botão reutilizável (variantes)
│   ├── AuthCard.vue        # Card glassmorphism para auth
│   ├── PageHeader.vue      # Header com botão voltar
│   ├── AppFooter.vue       # Rodapé fixo com CVV
│   ├── CvvPanel.vue        # Painel slide-up CVV
│   ├── CalendarioSemana.vue # Calendário semanal dinâmico
│   ├── CardNavegacao.vue   # Card de navegação da Home
│   ├── MensagemDia.vue     # Mensagem motivacional diária
│   ├── PerfilOverlay.vue   # Overlay de foto de perfil
│   ├── PerguntaEscala.vue  # Pergunta escala 1-5
│   ├── PerguntaBotoes.vue  # Pergunta Sim/Não
│   └── GraficoRadar.vue    # Gráfico radar (Chart.js)
├── router/
│   └── index.js            # Rotas da aplicação
├── views/
│   ├── InicialView.vue     # Tela inicial (typewriter)
│   ├── LoginView.vue       # Login
│   ├── CadastroView.vue    # Cadastro
│   ├── NomeView.vue        # Escolha de apelido
│   ├── HomeView.vue        # Dashboard principal
│   ├── ChecagemView.vue    # Checagem de humor
│   ├── PerguntasView.vue   # Relatório diário
│   ├── SenhaView.vue       # Verificação de senha
│   └── GraficoView.vue     # Mapa de humor (radar)
├── App.vue
└── main.js
```

## 🚀 Como rodar

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

## 🔧 Build para produção

```bash
npm run build
```

## 📦 Dependências

- **vue** ^3.4 — Framework principal
- **vue-router** ^4.2 — Roteamento SPA (hash mode)
- **chart.js** ^4.4 — Gráfico radar
- **vite** + **@vitejs/plugin-vue** — Build tool
