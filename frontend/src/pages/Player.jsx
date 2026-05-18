import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaTv, FaFilm, FaVideo, FaExpand, FaCompress } from 'react-icons/fa';
import { useCanal, useFilme, useSerie } from '../hooks/useApi';
import Loading from '../components/Loading';
import '../styles/Player.css';

const Player = () => {
  const { type, id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const season = searchParams.get('season') || 1;
  const episode = searchParams.get('episode') || 1;

  // Buscar dados baseado no tipo
  const { data: canalData, loading: canalLoading, error: canalError } = useCanal(type === 'channel' ? id : null);
  const { data: filmeData, loading: filmeLoading, error: filmeError } = useFilme(type === 'movie' ? id : null);
  const { data: serieData, loading: serieLoading, error: serieError } = useSerie(type === 'tv' ? id : null, season, episode);

  const loading = canalLoading || filmeLoading || serieLoading;
  const error = canalError || filmeError || serieError;

  // Determinar qual dado usar
  let contentData = null;
  let embedUrl = '';
  let title = '';
  let contentType = '';

  console.log('Player debug:', {
    type,
    id,
    season,
    episode,
    loading,
    error,
    canalData,
    filmeData,
    serieData,
  });

  if (type === 'channel' && canalData) {
    contentData = canalData.data;
    embedUrl = contentData?.embedUrl || `https://betterflix.click/api/player?id=${id}&type=channel`;
    title = 'Canal ao Vivo';
    contentType = 'channel';
  } else if (type === 'movie' && filmeData) {
    contentData = filmeData.data;
    embedUrl = contentData?.embedUrl || `https://betterflix.click/api/player?id=${id}&type=movie`;
    title = 'Filme';
    contentType = 'movie';
  } else if (type === 'tv' && serieData) {
    contentData = serieData.data;
    embedUrl = contentData?.embedUrl || `https://betterflix.click/api/player?id=${id}&type=tv&season=${season}&episode=${episode}`;
    title = 'Série';
    contentType = 'tv';
  }

  // Fallback para URL
  if (!embedUrl) {
    const baseUrl = 'https://betterflix.click/api/player';
    switch (type) {
      case 'movie':
        embedUrl = `${baseUrl}?id=${id}&type=movie`;
        break;
      case 'tv':
        embedUrl = `${baseUrl}?id=${id}&type=tv&season=${season}&episode=${episode}`;
        break;
      case 'channel':
      default:
        embedUrl = `${baseUrl}?id=${id}&type=channel`;
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getIcon = () => {
    switch (contentType) {
      case 'movie': return <FaFilm />;
      case 'tv': return <FaVideo />;
      case 'channel':
      default: return <FaTv />;
    }
  };

  if (loading) {
    return (
      <div className="player-page loading">
        <Loading />
        <p>Carregando player...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="player-page error">
        <div className="error-container">
          <h2>Erro ao carregar player</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Tentar novamente</button>
        </div>
      </div>
    );
  }

  return (
    <div className="player-page">
      {/* Navegação */}
      <div className="player-nav">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Voltar
        </button>
        <div className="content-info">
          {getIcon()}
          <span>{title}</span>
        </div>
      </div>

      {/* Player */}
      <div className="player-container">
        <div className="video-wrapper">
          <iframe
            src={embedUrl}
            title={`Player - ${title}`}
            allowFullScreen
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            frameBorder="0"
            className="video-iframe"
          />
        </div>
        
        {/* Controles do player */}
        <div className="player-controls">
          <div className="controls-left">
            <span className="now-playing">
              <FaTv /> Reproduzindo: {title}
            </span>
          </div>
          <div className="controls-right">
            <button 
              className="control-btn fullscreen-btn"
              onClick={toggleFullscreen}
              title="Tela cheia"
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
          </div>
        </div>
      </div>

      {/* Informações adicionais */}
      <div className="player-info">
        <div className="info-card">
          <h3>Dicas de Uso</h3>
          <ul>
            <li>Use o botão de tela cheia para uma experiência imersiva</li>
            <li>O player suporta controles de teclado (espaço para pausar, setas para volume)</li>
            <li>Qualidade automática baseada na sua conexão</li>
          </ul>
        </div>
        
        <div className="info-card">
          <h3>Problemas?</h3>
          <p>Se o player não carregar:</p>
          <ul>
            <li>Verifique sua conexão com a internet</li>
            <li>Atualize a página (F5)</li>
            <li>Limpe o cache do navegador</li>
            <li>Tente usar outro navegador</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Player;
