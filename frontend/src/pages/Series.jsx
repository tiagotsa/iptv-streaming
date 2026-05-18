import React from 'react';
import { FaVideo, FaPlay, FaStar, FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Series.css';

// Dados de exemplo para séries (TMDB IDs reais)
const featuredSeries = [
  { id: 76479, title: 'The Boys', genre: 'Ação/Drama', year: 2019, rating: 8.5, seasons: 4 },
  { id: 1399, title: 'Game of Thrones', genre: 'Fantasia/Drama', year: 2011, rating: 9.3, seasons: 8 },
  { id: 1429, title: 'Attack on Titan', genre: 'Anime/Ação', year: 2013, rating: 9.1, seasons: 4 },
  { id: 66732, title: 'Stranger Things', genre: 'Ficção/Mistério', year: 2016, rating: 8.7, seasons: 4 },
  { id: 60625, title: 'Rick and Morty', genre: 'Animação/Comédia', year: 2013, rating: 9.2, seasons: 7 },
  { id: 82856, title: 'The Mandalorian', genre: 'Ficção/Aventura', year: 2019, rating: 8.7, seasons: 3 },
];

const animeSeries = [
  { id: 1429, title: 'Attack on Titan', genre: 'Anime/Ação', year: 2013, rating: 9.1, seasons: 4 },
  { id: 46260, title: 'Naruto Shippuden', genre: 'Anime/Ação', year: 2007, rating: 8.7, seasons: 21 },
  { id: 60572, title: 'Pokémon', genre: 'Anime/Aventura', year: 1997, rating: 7.5, seasons: 26 },
  { id: 63926, title: 'One Piece', genre: 'Anime/Aventura', year: 1999, rating: 8.9, seasons: 20 },
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
              to={`/player/tv/${series.id}?season=1&episode=1`}
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
              to={`/player/tv/${series.id}?season=1&episode=1`}
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
