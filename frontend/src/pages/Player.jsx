import React, { useState } from 'react';
import {
  useParams,
  useSearchParams,
  useNavigate
} from 'react-router-dom';

import {
  FaArrowLeft,
  FaTv,
  FaFilm,
  FaVideo,
  FaExpand,
  FaCompress,
  FaExternalLinkAlt
} from 'react-icons/fa';

import '../styles/Player.css';

const Player = () => {
  const { type, id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const season = searchParams.get('season') || 1;
  const episode = searchParams.get('episode') || 1;

  const isMobile =
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
    );

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
      case 'movie':
        return <FaFilm />;

      case 'tv':
        return <FaVideo />;

      case 'channel':
      default:
        return <FaTv />;
    }
  };

  const openPlayer = () => {
    const newWindow = window.open(embedUrl, '_blank');

    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = embedUrl;
    }
  };

  if (!id || !type) {
    return (
      <div className="player-page error">
        <div className="error-container">
          <h2>URL inválida</h2>

          <p>O player precisa de um tipo e ID válidos.</p>

          <button onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="player-page">

      {/* Navegação */}
      <div className="player-nav">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
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

            <div
              style={{
                width: '100%',
                minHeight: '350px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '20px',
                background: '#111',
                borderRadius: '12px',
                padding: '30px'
              }}
            >
              <FaTv
                style={{
                  fontSize: '60px',
                  color: '#e50914'
                }}
              />

              <h2
                style={{
                  color: '#fff',
                  textAlign: 'center'
                }}
              >
                Abrir Player Externo
              </h2>

              <p
                style={{
                  color: '#ccc',
                  textAlign: 'center',
                  maxWidth: '400px'
                }}
              >
                Alguns canais possuem proteção contra carregamento interno
                em celulares.
              </p>

              <button
                onClick={openPlayer}
                style={{
                  background: '#e50914',
                  color: '#fff',
                  border: 'none',
                  padding: '15px 25px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <FaExternalLinkAlt />
                Abrir Canal
              </button>
            </div>

          ) : (

            <iframe
              src={embedUrl}
              title={`Player - ${title}`}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              className="video-iframe"
              referrerPolicy="no-referrer-when-downgrade"
            />

          )}

        </div>

        {/* Controles */}
        {!isMobile && (
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
        )}

      </div>

      {/* Informações */}
      <div className="player-info">

        <div className="info-card">

          <h3>Dicas de Uso</h3>

          <ul>
            <li>Use tela cheia para melhor experiência</li>
            <li>Alguns canais podem abrir em página externa</li>
            <li>Players IPTV podem variar conforme dispositivo</li>
            <li>No celular o player externo é mais estável</li>
          </ul>

        </div>

        <div className="info-card">

          <h3>Problemas?</h3>

          <ul>
            <li>Atualize a página</li>
            <li>Teste outro navegador</li>
            <li>Desative bloqueadores</li>
            <li>Teste outra conexão</li>
          </ul>

        </div>

      </div>

    </div>
  );
};

export default Player;