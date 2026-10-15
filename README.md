# Desafio Módulo 3 – Buscador de Usuários do GitHub

Aplicação em **React + TypeScript (Vite)** que busca usuários do GitHub e lista seus repositórios.

## Funcionalidades
- Campo de busca por nome de usuário (com validação de campo vazio)
- Indicador de carregamento e mensagens de erro (usuário não encontrado, erro de rede, limite da API)
- Página do usuário (`/user/:username`) com avatar, nome, bio e repositórios em cards
- Modal com visibilidade, link, descrição e linguagem do repositório
- Layout responsivo (desktop, tablet e celular)

## Como rodar
Pré-requisito: Node.js 18+

```bash
npm install
npm run dev      # abre em http://localhost:5173
npm run build    # gera a versão de produção em dist/
npm run preview  # serve o build
```

## Estrutura
```
src/
  components/  Loading, RepoCard, RepoModal
  pages/       Home, UserPage
  services/    github.ts (chamadas à API)
  types/       github.ts (interfaces dos dados)
```

API utilizada: https://api.github.com/users/{usuario} e https://api.github.com/users/{usuario}/repos
