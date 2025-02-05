# RM Traceability SaaS - Front-end

O **RM Traceability SaaS - Front-end** é a interface do usuário para a solução de rastreabilidade de produtos. A aplicação permite que os usuários façam login, visualizem dashboards, gerenciem empresas e produtos, além de acompanhar a rastreabilidade dos itens por meio de QR Codes.

## Sumário

- [Recursos](#recursos)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Instalação](#instalação)
- [Execução](#execução)
- [Testes](#testes)
- [Deploy](#deploy)
- [Docker](#docker)
- [Tecnologias](#tecnologias)
- [Contato](#contato)

## Recursos

- **Autenticação e Autorização:** Interface para login e controle de acesso.
- **Dashboard:** Visualização de informações e relatórios.
- **Gerenciamento de Empresas e Produtos:** Cadastro e manutenção dos dados relacionados.
- **Geração e Leitura de QR Codes:** Funcionalidades para rastrear produtos via QR Code.
- **Integração com a API:** Comunicação com o back-end (NestJS) por meio de requisições RESTful.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- Navegador moderno (Chrome, Firefox, Edge, etc.)

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto (ou use um exemplo `.env.example`) com as seguintes variáveis (ajuste conforme necessário):

```env
REACT_APP_API_URL=http://localhost:3001
```

## Instalação

Para instalar as dependências do projeto, execute um dos comandos abaixo na raiz do projeto:

```bash
yarn install
# ou
npm install
```

## Execução

yarn start
# ou
npm start

## Testes

yarn test
# ou
npm test


## Tecnologias

React – Biblioteca para construção da interface do usuário.
Axios – Cliente HTTP para comunicação com a API.
React Router – Gerenciamento de rotas e navegação.
Styled Components ou CSS Modules – Estilização da aplicação (ou outra abordagem de sua preferência).

## Contato

Discord:
Autor: Rafael Magalhães
