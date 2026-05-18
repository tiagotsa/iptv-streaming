# 🚀 Como Iniciar a Plataforma IPTV

## Opção 1: Usando os Scripts .bat (Recomendado)

### 1. Instalar dependências (primeira vez apenas)

Dê duplo clique no arquivo:
```
init.bat
```

Ou execute no PowerShell:
```powershell
cd C:\iptv\iptv-plataforma
.\init.bat
```

### 2. Iniciar a aplicação

Dê duplo clique no arquivo:
```
start.bat
```

Isso iniciará:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

---

## Opção 2: Usando o Terminal Manualmente

### Terminal 1 - Backend:
```powershell
cd C:\iptv\iptv-plataforma\backend
npm start
```

### Terminal 2 - Frontend:
```powershell
cd C:\iptv\iptv-plataforma\frontend
npm start
```

---

## 📁 Estrutura de Arquivos

```
iptv-plataforma/
├── backend/              # API Node.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/             # React App
│   ├── src/
│   ├── public/
│   └── package.json
├── init.bat              # Instala dependências
├── start.bat             # Inicia a aplicação
└── README-START.md       # Este arquivo
```

---

## 🔧 Solução de Problemas

### Erro: "Cannot find module 'express'"
Execute:
```powershell
cd C:\iptv\iptv-plataforma\backend
npm install
```

### Erro: "react-scripts não é reconhecido"
Execute:
```powershell
cd C:\iptv\iptv-plataforma\frontend
npm install
```

### Porta 5000 ou 3000 ocupada
- Backend: Edite o arquivo `backend/.env` e altere a porta
- Frontend: O React automaticamente perguntará se deseja usar outra porta

---

## 📞 Suporte

Se encontrar problemas, verifique:
1. Node.js está instalado (versão 18+): `node --version`
2. npm está funcionando: `npm --version`
3. Todas as dependências foram instaladas

---

**Pronto para usar!** 🎉
Acesse http://localhost:3000 após iniciar a aplicação.
