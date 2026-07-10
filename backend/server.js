const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// CONFIGURAÇÕES GERAIS
// ==========================================

app.disable('etag');

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

// ==========================================
// CORS
// ==========================================

app.use(cors());

// ==========================================
// JSON
// ==========================================

app.use(express.json());

// ==========================================
// LOGS
// ==========================================

app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${
      req.headers.origin || 'No origin'
    }`
  );

  next();
});

// ==========================================
// CONFIG API
// ==========================================

const BETTERFLIX_BASE_URL =
  process.env.BETTERFLIX_API_URL || 'https://betterflix.click/api';

// ==========================================
// AXIOS CONFIG
// ==========================================

const axiosConfig = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
    Accept: 'application/json, text/plain, */*',
    Referer: 'https://betterflix.click/',
    Origin: 'https://betterflix.click'
  },
  timeout: 15000
};

// ==========================================
// ROTA RAIZ
// ==========================================

app.get('/', (req, res) => {
  res.send('API IPTV funcionando!');
});

// ==========================================
// API INFO
// ==========================================

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

// ==========================================
// HEALTH CHECK
// ==========================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'IPTV Platform API'
  });
});

// ==========================================
// LISTAR CANAIS
// ==========================================

app.get('/api/canais', async (req, res) => {
  try {

    console.log('Buscando canais...');

    const response = await axios.get(
      `${BETTERFLIX_BASE_URL}/canais.json`,
      axiosConfig
    );

    console.log('Status Betterflix:', response.status);

    // Verifica se é array válido
    if (!Array.isArray(response.data)) {

      console.error('Formato inválido retornado pela API');
      console.error(response.data);

      return res.json({
        success: true,
        data: [],
        categorias: {},
        total: 0
      });
    }

    // Organizar canais
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

    console.error('Erro ao buscar canais');

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }

    // NÃO QUEBRA FRONTEND
    res.json({
      success: true,
      data: [],
      categorias: {},
      total: 0
    });
  }
});

// ==========================================
// LISTAR JOGOS
// ==========================================

app.get('/api/jogos', async (req, res) => {
  try {

    console.log('Buscando jogos...');

    const response = await axios.get(
      `${BETTERFLIX_BASE_URL}/jogos.json`,
      axiosConfig
    );

    console.log('Status Betterflix:', response.status);

    if (!Array.isArray(response.data)) {

      console.error('Formato inválido retornado pela API');
      console.error(response.data);

      return res.json({
        success: true,
        data: [],
        total: 0
      });
    }

    res.json({
      success: true,
      data: response.data,
      total: response.data.length
    });

  } catch (error) {

    console.error('Erro ao buscar jogos');

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }

    // NÃO QUEBRA FRONTEND
    res.json({
      success: true,
      data: [],
      total: 0
    });
  }
});

// ==========================================
// FILMES
// ==========================================

app.get('/api/filmes/:id', async (req, res) => {
  try {

    const { id } = req.params;

    const embedUrl =
      `${BETTERFLIX_BASE_URL}/player?id=${id}&type=movie`;

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

// ==========================================
// SÉRIES
// ==========================================

app.get('/api/series/:id', async (req, res) => {
  try {

    const { id } = req.params;
    const { season = 1, episode = 1 } = req.query;

    const embedUrl =
      `${BETTERFLIX_BASE_URL}/player?id=${id}&type=tv&season=${season}&episode=${episode}`;

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

// ==========================================
// CANAL ESPECÍFICO
// ==========================================

app.get('/api/canal/:id', async (req, res) => {
  try {

    const { id } = req.params;

    const embedUrl =
      `${BETTERFLIX_BASE_URL}/player?id=${id}&type=channel`;

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

// ==========================================
// START SERVER
// ==========================================

const server = app.listen(PORT, () => {

  console.log(`Servidor IPTV rodando na porta ${PORT}`);
  console.log(`API disponível em: http://localhost:${PORT}/api`);

});

// ==========================================
// SERVER ERRORS
// ==========================================

server.on('error', (err) => {

  if (err && err.code === 'EADDRINUSE') {

    console.error(`A porta ${PORT} já está em uso.`);

    process.exit(1);
  }

  throw err;
});