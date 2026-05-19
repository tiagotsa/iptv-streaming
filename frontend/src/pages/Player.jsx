import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import {
  FaArrowLeft,
  FaTv,
  FaFilm,
  FaVideo,
  FaExpand,
  FaCompress
} from 'react-icons/fa';

import '../styles/Player.css';

const Player = () => {
  const { type, id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isFullscreen, setIsFullscreen] = useState(false);

  // Correção dos Fallbacks
  const season = searchParams.get('season') ?? '1';
  const episode = searchParams.get('episode') ?? '1';

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
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const getIcon = () => {
    switch (contentType) {
      case 'movie':
        return <FaFilm />;
      case 'tv':
        return <FaVideo />;
      case 'channel':
      default:
        return <FaTv />;
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
      {/* NAV */}
      <div className="player-nav">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Voltar
        </button>

        <div className="content-info">
          {getIcon()}
          <span>{title}</span>
        </div>
      </div>

      {/* PLAYER */}
      <div className="player-container">
        <div className="video-wrapper">
          {/* MOBILE + CANAIS (Corrigido para usar link nativo 'a') */}
          {isMobile && contentType === 'channel' ? (
            <div className="external-player">
              <div className="external-message">
                <h2>Canal ao Vivo</h2>
                <p>
                  Para melhor compatibilidade no celular, o canal será aberto diretamente em nova aba.
                </p>
                <a
                  href={embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-btn"
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  ▶️ Assistir Canal
                </a>
              </div>
            </div>
          ) : (
            /* DESKTOP OU FILMES/SÉRIES */
            <iframe
              src={embedUrl}
              title={Player - `${title}`}
              className="video-iframe"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )}
        </div>

        {/* CONTROLES */}
        <div className="player-controls">
          <div className="controls-left">
            <span className="now-playing">
              <FaTv />
              Reproduzindo: {title}
            </span>
          </div>
[19/05/2026 17:38] Betterflix - Chat: <div className="controls-right">
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

      {/* INFO */}
      <div className="player-info">
        <div className="info-card">
          <h3>Dicas de Uso</h3>
          <ul>
            <li>Use tela cheia para melhor experiência</li>
            <li>Atualize a página caso o player trave</li>
            <li>Alguns canais podem abrir externamente no celular</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>Problemas?</h3>
          <ul>
            <li>Verifique sua conexão</li>
            <li>Teste outro navegador</li>
            <li>Limpe o cache do navegador</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Player;