
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/tiagotsa/iptv-streaming/blob/main/LICENSE)


# IPTV Premium 🎬

https://iptv-streaming-frontend.onrender.com/

Uma plataforma moderna de streaming de canais de TV, filmes e séries desenvolvida com React, Node.js e Express.

![IPTV Premium](https://img.shields.io/badge/IPTV-Premium-e50914?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=node.js)

## ✨ Funcionalidades

- 📺 **Canais de TV ao vivo** - Acesse canais de TV em tempo real
- 🎬 **Filmes** - Catálogo de filmes com player integrado
- 📺 **Séries** - Assista suas séries favoritas
- 🔍 **Busca e Filtros** - Encontre conteúdo facilmente
- 📱 **Design Responsivo** - Funciona em todos os dispositivos
- 🎨 **Interface Moderna** - Design escuro e elegante

## 🚀 Tecnologias

### Frontend
- React 18
- React Router DOM
- React Icons
- Styled Components
- Axios

### Backend
- Node.js
- Express
- Axios
- CORS
- dotenv

## 📁 Estrutura do Projeto

```
iptv-plataforma/
├── backend/
│   ├── server.js          # Servidor Express
│   ├── package.json       # Dependências do backend
│   └── .env              # Variáveis de ambiente
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── hooks/        # Custom hooks
│   │   ├── styles/       # Arquivos CSS
│   │   ├── App.js        # Componente principal
│   │   └── index.js      # Ponto de entrada
│   └── package.json      # Dependências do frontend
└── README.md
```

## 🛠️ Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/iptv-plataforma.git
cd iptv-plataforma
```

### 2. Instale as dependências do Backend

```bash
cd backend
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na pasta `backend`:

```env
PORT=5000
NODE_ENV=development
BETTERFLIX_API_URL=https://betterflix.click/api
```

### 4. Instale as dependências do Frontend

```bash
cd ../frontend
npm install
```

## 🚀 Executando o Projeto

### 1. Inicie o Backend

```bash
cd backend
npm start
```

O servidor estará rodando em `http://localhost:5000`

### 2. Inicie o Frontend

Em outro terminal:

```bash
cd frontend
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## ☁️ Deploy no Render

O projeto já inclui um arquivo `render.yaml` para deploy automático no Render.

### Passos de deploy

1. Crie um repositório no GitHub e envie este projeto.
2. Acesse o painel do Render e crie um novo serviço:
   - `Web Service` para o backend
   - `Static Site` para o frontend
3. Para o backend, use as seguintes configurações:
   - Diretório: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     - `BETTERFLIX_API_URL=https://betterflix.click/api`
4. Para o frontend, use essas configurações:
   - Diretório: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Environment Variables:
     - `VITE_API_URL=https://<seu-backend>.onrender.com/api`
5. Se preferir, importe o `render.yaml` diretamente no Render para criar as duas services automaticamente.

### Observação

- O frontend precisa da URL completa do backend Render em `VITE_API_URL`.
- Se o nome do backend for `iptv-backend`, a URL geralmente será `https://iptv-backend.onrender.com/api`.

## 📱 Telas da Aplicação

### Home
- Banner principal com destaques
- Categorias de conteúdo
- Canais em destaque
- Recursos da plataforma

### Canais
- Lista de canais de TV
- Busca e filtros
- Organização por categoria
- Player ao vivo

### Filmes
- Catálogo de filmes
- Filtragem por gênero
- Destaques e lançamentos
- Player integrado

### Séries
- Séries e animes
- Navegação por temporadas
- Episódios organizados
- Player contínuo

## 🔧 API Endpoints

### Backend

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Health check |
| GET | `/api/canais` | Lista todos os canais |
| GET | `/api/jogos` | Lista jogos ao vivo |
| GET | `/api/canal/:id` | Detalhes de um canal |
| GET | `/api/filmes/:id` | Informações de um filme |
| GET | `/api/series/:id` | Informações de uma série |

### BetterFlix API

| Endpoint | Descrição |
|----------|-----------|
| `GET /api/player` | Player embed |
| `GET /api/canais.json` | Lista de canais |
| `GET /api/jogos.json` | Lista de jogos |

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request


## 👨‍💻 Sobre o Desenvolvedor
Este projeto reflete o compromisso com a escrita de código limpo, modular e eficiente. Foi desenvolvido por:

Tiago Almeida
Software Developer Especialista em JavaScript Full Stack.


## 📝 Licença

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/tiagotsa/iptv-streaming/blob/main/LICENSE)


## 🙏 Agradecimentos

- [BetterFlix](https://betterflix.click) - API de streaming
- [React](https://reactjs.org) - Biblioteca frontend
- [Express](https://expressjs.com) - Framework backend

---

<p align="center">
  Feito com ❤️ e ☕
</p>
