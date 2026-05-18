import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  validateStatus: (status) => status >= 200 && status < 400,
});

// Hook genérico para fazer requisições GET
export const useFetch = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { enabled = true, dependencies = [] } = options;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (enabled && endpoint) {
      fetchData();
    } else if (!enabled) {
      setLoading(false);
    }
  }, [endpoint, enabled]);

  return { data, loading, error, refetch: fetchData };
};

// Hook para buscar canais
export const useCanais = () => {
  return useFetch('/canais');
};

// Hook para buscar jogos ao vivo
export const useJogos = () => {
  return useFetch('/jogos');
};

// Hook para buscar detalhes de um canal
export const useCanal = (id) => {
  return useFetch(`/canal/${id}`, {
    enabled: !!id,
    dependencies: [id],
  });
};

// Hook para buscar filme
export const useFilme = (id) => {
  return useFetch(`/filmes/${id}`, {
    enabled: !!id,
    dependencies: [id],
  });
};

// Hook para buscar série
export const useSerie = (id, season = 1, episode = 1) => {
  return useFetch(`/series/${id}?season=${season}&episode=${episode}`, {
    enabled: !!id,
    dependencies: [id, season, episode],
  });
};

export default api;
