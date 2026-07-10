// frontend/src/pages/SerieDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaStar, FaCalendar } from 'react-icons/fa';
import EpisodeCard from '../components/EpisodeCard';
import '../styles/SerieDetail.css';

// Dados de exemplo - você vai buscar da API depois
const seriesData = {
  194797: {
    title: 'Doona',
    genre: 'Romance/Drama',
    year: 2023,
    rating: 8.5,
    seasons: 1,
    description: 'Uma série sobre romance e relacionamentos em tempos modernos.',
    episodes: {
      1: [
        { episode: 1, title: 'Episódio 1', description: 'O começo de uma história' },
        { episode: 2, title: 'Episódio 2', description: 'Desenvolvimentos' },
        { episode: 3, title: 'Episódio 3', description: 'Conflitos' },
        { episode: 4, title: 'Episódio 4', description: 'Revelações' },
        { episode: 5, title: 'Episódio 5', description: 'Climax' },
        { episode: 6, title: 'Episódio 6', description: 'Resoluções' },
        { episode: 7, title: 'Episódio 7', description: 'Penúltimo' },
        { episode: 8, title: 'Episódio 8', description: 'Desfecho' },
      ],
    }
  },
  110382: {
    title: 'Pachinko',
    genre: 'Drama/Épico',
    year: 2022,
    rating: 8.6,
    seasons: 2,
    description: 'Uma épica saga familiar que segue várias gerações de uma família coreana através das décadas.',
    episodes: {
      1: Array.from({ length: 8 }, (_, i) => ({ 
        episode: i + 1, 
        title: `Episódio ${i + 1}`, 
        description: `Temporada 1 - Episódio ${i + 1}` 
      })),
      2: Array.from({ length: 8 }, (_, i) => ({ 
        episode: i + 1, 
        title: `Episódio ${i + 1}`, 
        description: `Temporada 2 - Episódio ${i + 1}` 
      })),
    }
  },
};

const SerieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeason, setSelectedSeason] = useState(1);

  const serie = seriesData[id];

  if (!serie) {
    return <div className="not-found">Série não encontrada</div>;
  }

  const episodes = serie.episodes[selectedSeason] || [];

  return (
    <div className="serie-detail-page">
      {/* Botão voltar */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Voltar
      </button>

      {/* Informações da série */}
      <div className="serie-header">
        <div className="serie-poster">
          <div className="poster-placeholder">
            <FaVideo />
          </div>
        </div>
        <div className="serie-details">
          <h1>{serie.title}</h1>
          <div className="serie-meta">
            <span><FaStar /> {serie.rating}</span>
            <span><FaCalendar /> {serie.year}</span>
            <span>{serie.genre}</span>
          </div>
          <p className="description">{serie.description}</p>
        </div>
      </div>

      {/* Seletor de Temporadas */}
      <div className="seasons-selector">
        <label>Temporada:</label>
        <select 
          value={selectedSeason} 
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
          className="season-select"
        >
          {Array.from({ length: serie.seasons }, (_, i) => i + 1).map(season => (
            <option key={season} value={season}>
              Temporada {season}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de Episódios */}
      <div className="episodes-section">
        <h2>Episódios - Temporada {selectedSeason}</h2>
        <div className="episodes-grid">
          {episodes.map(ep => (
            <EpisodeCard
              key={ep.episode}
              seriesId={id}
              season={selectedSeason}
              episode={ep.episode}
              title={ep.title}
              description={ep.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SerieDetail;