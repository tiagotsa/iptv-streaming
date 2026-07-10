# Solução para Problemas CORS no Deploy Vercel

## Problema Identificado
O frontend no Vercel (`https://iptv-streaming-brown.vercel.app`) não consegue acessar o backend no Railway (`https://iptv-streaming-production.up.railway.app`) devido a políticas CORS.

## Solução Implementada

### 1. Backend (Railway) - Atualizado
**Arquivo:** `backend/server.js`
```javascript
// Configurar CORS para permitir o frontend no Vercel
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://iptv-streaming-brown.vercel.app',
    'https://iptv-streaming.vercel.app',
    'https://iptv-streaming-*.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
```

### 2. Frontend (Vercel) - Atualizado
**Arquivos modificados:**
- `frontend/vite.config.js` - Proxy para desenvolvimento
- `frontend/package.json` - Scripts de build
- `frontend/.env.production` - URL da API de produção
- `frontend/.env.development` - Configuração de desenvolvimento
- `frontend/.env.local` - Configuração local (opcional)

### 3. Script de Correção de Permissões
**Arquivo:** `frontend/scripts/fix-permissions.js`
- Corrige permissões dos binários no `node_modules/.bin/`
- Funciona tanto no Windows quanto no Linux

## Passos para Aplicar a Solução

### Passo 1: Atualizar o Backend no Railway
1. Faça commit das alterações no backend:
   ```bash
   cd backend
   git add server.js
   git commit -m "Fix CORS configuration for Vercel"
   git push
   ```

2. O Railway fará deploy automático

### Passo 2: Atualizar o Frontend no Vercel
1. Faça commit das alterações no frontend:
   ```bash
   cd frontend
   git add .
   git commit -m "Fix CORS and permission issues"
   git push
   ```

2. O Vercel fará deploy automático

### Passo 3: Verificar a Configuração
1. **Backend Railway**: Certifique-se de que está rodando na porta correta
2. **Frontend Vercel**: Verifique se a variável `VITE_API_URL` está correta
3. **Teste**: Acesse `https://iptv-streaming-brown.vercel.app/canais`

## Configuração de Ambiente

### Produção (Vercel)
```
VITE_API_URL=https://iptv-streaming-production.up.railway.app/api
```

### Desenvolvimento Local
```
VITE_API_URL=/api  (proxy redireciona para localhost:5000)
```

## Testes Locais

### 1. Iniciar Backend
```bash
cd backend
npm install
npm start
# Servidor rodando em http://localhost:5000
```

### 2. Iniciar Frontend
```bash
cd frontend
npm install
npm run dev
# Aplicação rodando em http://localhost:3000
```

### 3. Testar API
```bash
# Testar rota de canais
curl http://localhost:5000/api/canais

# Testar health check
curl http://localhost:5000/api/health
```

## Solução de Problemas

### Se ainda houver erro CORS:
1. Verifique se o backend está realmente rodando no Railway
2. Confirme se a URL do backend está correta no `.env.production`
3. Teste a API diretamente: `https://iptv-streaming-production.up.railway.app/api/canais`

### Se houver erro 404:
1. Verifique se a rota `/api/canais` existe no backend
2. Confirme se o backend está respondendo corretamente

### Se houver erro de permissão:
1. O script `fix-permissions.js` já resolve isso
2. Verifique se o script está sendo executado durante o build

## URLs Importantes
- **Frontend Vercel**: `https://iptv-streaming-brown.vercel.app`
- **Backend Railway**: `https://iptv-streaming-production.up.railway.app`
- **API Canais**: `https://iptv-streaming-production.up.railway.app/api/canais`
- **Health Check**: `https://iptv-streaming-production.up.railway.app/api/health`

## Monitoramento
1. Verifique os logs do Railway para erros no backend
2. Verifique os logs do Vercel para erros no frontend
3. Use o console do navegador para ver erros CORS detalhados

## Próximos Passos
1. Após aplicar as correções, teste todas as funcionalidades
2. Verifique se filmes e séries também estão funcionando
3. Configure monitoramento contínuo
4. Considere adicionar autenticação se necessário