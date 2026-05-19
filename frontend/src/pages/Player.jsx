import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTv, FaFilm, FaVideo, FaExpand, FaCompress } from 'react-icons/fa';
import '../styles/Player.css';

const Player = () => {
  const { type, id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const season = searchParams.get('season') || 1;
  const episode = searchParams.get('episode') || 1;

  const baseUrl = 'https://betterflix.click/api/player';
  let embedUrl = '';
  let title = '';
  let contentType = type;

  switch (type) {
    case 'movie':
      embedUrl = `${baseUrl}?id=${id}&type=movie`;
      title = 'Filme';
      contentType = 'movie';
      break;
    case 'tv':
      embedUrl = `${baseUrl}?id=${id}&type=tv&season=${season}&episode=${episode}`;
      title = 'Série';
      contentType = 'tv';
      break;
    case 'channel':
    default:
      embedUrl = `${baseUrl}?id=${id}&type=channel`;
      title = 'Canal ao Vivo';
      contentType = 'channel';
      break;
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

  if (!id || !type) {
    return (
      <div className="player-page error">
        <div className="error-container">
          <h2>URL inválida</h2>
          <p>O player precisa de um tipo e ID válidos.</p>
          <button onClick={() => navigate(-1)}>Voltar</button>
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

  {isMobile ? (
    <div className="mobile-player">
      <button
        className="mobile-play-btn"
        onClick={() => window.open(embedUrl, '_blank')}
      >
        ▶ Abrir Player
      </button>

    </div>

  ) : (

    <iframe
      src={embedUrl}
      title={`Player - ${title}`}
      allowFullScreen
      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
      frameBorder="0"
      className="video-iframe"
      referrerPolicy="no-referrer"
      sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
    />

  )}

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
