const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.disable('etag');
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

app.get('/', (req, res) => {
  res.send('API IPTV funcionando!');
});

// Configuração CORS SUPER SIMPLES - permite TUDO
app.use(cors());
app.use(express.json());

// Middleware para log de requisições (opcional, mas útil para debug)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin || 'No origin'}`);
  next();
});

const BETTERFLIX_BASE_URL = process.env.BETTERFLIX_API_URL || 'https://betterflix.click/api';

// Rota para listar canais
app.get('/api/canais', async (req, res) => {
  try {
    const response = await axios.get(`${BETTERFLIX_BASE_URL}/canais.json`);
    
    // Organizar canais por categoria
    const canaisPorCategoria = response.data.reduce((acc, canal) => {
      const categoria = canal.categoria || 'Geral';
      if (!acc[categoria]) {
        acc[categoria] = [];
      }
      acc[categoria].push(canal);
      return acc;
    }, {});

    res.json({
      success: true,
      data: response.data,
      categorias: canaisPorCategoria,
      total: response.data.length
    });
  } catch (error) {
    console.error('Erro ao buscar canais:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar canais'
    });
  }
});

// Rota para listar jogos ao vivo
app.get('/api/jogos', async (req, res) => {
  try {
    const response = await axios.get(`${BETTERFLIX_BASE_URL}/jogos.json`);
    res.json({
      success: true,
      data: response.data,
      total: response.data.length
    });
  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar jogos'
    });
  }
});

// Rota para buscar filmes (TMDB)
app.get('/api/filmes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const embedUrl = `${BETTERFLIX_BASE_URL}/player?id=${id}&type=movie`;
    
    res.json({
      success: true,
      data: {
        id,
        type: 'movie',
        embedUrl
      }
    });
  } catch (error) {
    console.error('Erro ao buscar filme:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar filme'
    });
  }
});

// Rota para buscar séries (TMDB)
app.get('/api/series/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { season = 1, episode = 1 } = req.query;
    const embedUrl = `${BETTERFLIX_BASE_URL}/player?id=${id}&type=tv&season=${season}&episode=${episode}`;
    
    res.json({
      success: true,
      data: {
        id,
        type: 'tv',
        season,
        episode,
        embedUrl
      }
    });
  } catch (error) {
    console.error('Erro ao buscar série:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar série'
    });
  }
});

// Rota para buscar canal específico
app.get('/api/canal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const embedUrl = `${BETTERFLIX_BASE_URL}/player?id=${id}&type=channel`;
    
    res.json({
      success: true,
      data: {
        id,
        type: 'channel',
        embedUrl
      }
    });
  } catch (error) {
    console.error('Erro ao buscar canal:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar canal'
    });
  }
});

// Rota raiz para verificar API
app.get('/api', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'IPTV Platform API',
    message: 'Bem-vindo à API do IPTV Premium',
    routes: [
      '/api/canais',
      '/api/jogos',
      '/api/filmes/:id',
      '/api/series/:id',
      '/api/canal/:id',
      '/api/health'
    ]
  });
});

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'IPTV Platform API'
  });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor IPTV rodando na porta ${PORT}`);
  console.log(`API disponível em: http://localhost:${PORT}/api`);
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`A porta ${PORT} já está em uso.`);
    console.error('Finalize o processo que está usando a porta 5000 ou altere PORT no arquivo backend/.env.');
    process.exit(1);
  }

  throw err;
});
