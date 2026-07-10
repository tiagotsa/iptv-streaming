import React from 'react';
import { FaVideo, FaPlay, FaStar, FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Series.css';

// Dados de exemplo para séries (TMDB IDs reais)
const featuredSeries = [
  { id: 194797, title: 'Doona', genre: 'Romance/Drama', year: 2023, rating: 8.5, seasons: 1 },
  { id: 110382, title: 'Pachinko', genre: 'Drama/Épico', year: 2022, rating: 8.6, seasons: 2 },
];

const animeSeries = [
  { id: 194797, title: 'Doona', genre: 'Romance/Drama', year: 2023, rating: 8.5, seasons: 1 },
  { id: 110382, title: 'Pachinko', genre: 'Drama/Épico', year: 2022, rating: 8.6, seasons: 2 },
];

const Series = () => {
  return (
    <div className="series-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-title">
          <FaVideo className="header-icon" />
          <div>
            <h1>Séries</h1>
            <p>As melhores séries para maratonar</p>
          </div>
        </div>
      </div>

      {/* Séries em Destaque */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Séries em Destaque</h2>
          <span className="badge">Populares</span>
        </div>
        
        <div className="series-grid">
          {featuredSeries.map((series) => (
            <Link
              key={series.id}
              to={`/serie/${series.id}`}
              className="series-card"
            >
              <div className="series-poster">
                <div className="poster-placeholder">
                  <FaVideo />
                </div>
                <div className="series-overlay">
                  <button className="play-btn">
                    <FaPlay />
                  </button>
                </div>
                <div className="series-rating">
                  <FaStar />
                  <span>{series.rating}</span>
                </div>
                <div className="series-seasons">
                  <span>{series.seasons} Temporadas</span>
                </div>
              </div>
              <div className="series-info">
                <h3>{series.title}</h3>
                <div className="series-meta">
                  <span className="genre">{series.genre}</span>
                  <span className="year">
                    <FaCalendar />
                    {series.year}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Animes */}
      <section className="category-section">
        <div className="section-header">
          <h2>Animes</h2>
          <span className="badge badge-anime">Animes</span>
        </div>
        
        <div className="series-grid">
          {animeSeries.map((series) => (
            <Link
              key={series.id}
              to={`/serie/${series.id}`}
              className="series-card"
            >
              <div className="series-poster">
                <div className="poster-placeholder anime-bg">
                  <FaVideo />
                </div>
                <div className="series-overlay">
                  <button className="play-btn">
                    <FaPlay />
                  </button>
                </div>
                <div className="series-rating">
                  <FaStar />
                  <span>{series.rating}</span>
                </div>
                <div className="series-seasons">
                  <span>{series.seasons} Temporadas</span>
                </div>
              </div>
              <div className="series-info">
                <h3>{series.title}</h3>
                <div className="series-meta">
                  <span className="genre">{series.genre}</span>
                  <span className="year">
                    <FaCalendar />
                    {series.year}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Pronto para maratonar?</h2>
          <p>Escolha uma série e comece a assistir agora mesmo!</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">
              <FaPlay /> Começar Agora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Series;
