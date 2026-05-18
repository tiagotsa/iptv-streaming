import React, { useState } from 'react';
import { FaFilm, FaPlay, FaStar, FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Filmes.css';

// Dados de exemplo para filmes (TMDB IDs reais)
const featuredMovies = [
  { id: 912649, title: 'Venom: A Última Rodada', genre: 'Ação/Ficção', year: 2024, rating: 7.2 },
  { id: 533535, title: 'Deadpool & Wolverine', genre: 'Ação/Comédia', year: 2024, rating: 7.8 },
  { id: 519182, title: 'Meu Malvado Favorito 4', genre: 'Animação', year: 2024, rating: 7.1 },
  { id: 1022789, title: 'Divertida Mente 2', genre: 'Animação', year: 2024, rating: 7.6 },
  { id: 748783, title: 'Garfield: Fora de Casa', genre: 'Animação/Comédia', year: 2024, rating: 6.8 },
  { id: 945961, title: 'Alien: Romulus', genre: 'Ficção/Terror', year: 2024, rating: 7.3 },
];

const movieCategories = [
  { id: 'acao', name: 'Ação', icon: '💥' },
  { id: 'comedia', name: 'Comédia', icon: '😂' },
  { id: 'drama', name: 'Drama', icon: '🎭' },
  { id: 'terror', name: 'Terror', icon: '👻' },
  { id: 'ficcao', name: 'Ficção', icon: '🚀' },
  { id: 'romance', name: 'Romance', icon: '💕' },
  { id: 'animacao', name: 'Animação', icon: '🎨' },
  { id: 'documentario', name: 'Documentário', icon: '📚' },
];

const Filmes = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="filmes-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-title">
          <FaFilm className="header-icon" />
          <div>
            <h1>Filmes</h1>
            <p>Os melhores filmes e lançamentos</p>
          </div>
        </div>
      </div>

      {/* Categorias */}
      <section className="categories-section">
        <div className="categories-list">
          <button
            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Todos
          </button>
          {movieCategories.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Destaques */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Destaques</h2>
          <span className="badge">Novidades</span>
        </div>
        
        <div className="movies-grid">
          {featuredMovies.map((movie) => (
            <Link
              key={movie.id}
              to={`/player/movie/${movie.id}`}
              className="movie-card"
            >
              <div className="movie-poster">
                <div className="poster-placeholder">
                  <FaFilm />
                </div>
                <div className="movie-overlay">
                  <button className="play-btn">
                    <FaPlay />
                  </button>
                </div>
                <div className="movie-rating">
                  <FaStar />
                  <span>{movie.rating}</span>
                </div>
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <div className="movie-meta">
                  <span className="genre">{movie.genre}</span>
                  <span className="year">
                    <FaCalendar />
                    {movie.year}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Como Funciona */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>Como Assistir</h2>
          <p>É rápido e fácil começar a assistir</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Escolha</h3>
            <p>Navegue pelo catálogo e escolha o que quer assistir</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Clique</h3>
            <p>Clique no conteúdo desejado para abrir o player</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Assista</h3>
            <p>Aproveite sua programação favorita em alta qualidade</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Filmes;
