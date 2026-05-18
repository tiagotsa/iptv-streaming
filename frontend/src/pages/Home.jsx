import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaTv, FaFilm, FaVideo, FaFire } from 'react-icons/fa';
import { useCanais } from '../hooks/useApi';
import ChannelCard from '../components/ChannelCard';
import Loading from '../components/Loading';
import '../styles/Home.css';

const featuredCategories = [
  { id: 'canais', title: 'Canais ao Vivo', icon: FaTv, color: '#e50914', description: 'Assista canais de TV em tempo real' },
  { id: 'filmes', title: 'Filmes', icon: FaFilm, color: '#e50914', description: 'Os melhores filmes e lançamentos' },
  { id: 'series', title: 'Séries', icon: FaVideo, color: '#e50914', description: 'Séries completas para maratonar' },
];

const Home = () => {
  const { data: canaisData, loading, error } = useCanais();

  // Pegar apenas alguns canais para exibir na home
  const featuredChannels = canaisData?.data?.slice(0, 8) || [];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            <FaFire /> Destaque
          </span>
          <h1 className="hero-title">
            Assista aos Melhores<br />
            <span className="highlight">Canais e Filmes</span>
          </h1>
          <p className="hero-description">
            Milhares de canais de TV, filmes e séries em um só lugar. 
            Qualidade HD e transmissão estável.
          </p>
          <div className="hero-buttons">
            <Link to="/canais" className="btn btn-primary">
              <FaPlay /> Ver Canais
            </Link>
            <Link to="/filmes" className="btn btn-secondary">
              <FaFilm /> Explorar Filmes
            </Link>
          </div>
        </div>
        <div className="hero-gradient" />
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Categorias</h2>
          <p>Escolha o que você quer assistir</p>
        </div>
        <div className="categories-grid">
          {featuredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/${category.id}`}
                className="category-card"
                style={{ '--category-color': category.color }}
              >
                <div className="category-icon">
                  <Icon />
                </div>
                <div className="category-info">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Channels Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Canais em Destaque</h2>
          <Link to="/canais" className="view-all">Ver todos</Link>
        </div>
        
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="error-message">
            <p>Erro ao carregar canais. Tente novamente.</p>
          </div>
        ) : (
          <div className="channels-grid">
            {featuredChannels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Por que escolher nossa plataforma?</h2>
        </div>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <h3>Carregamento Rápido</h3>
            <p>Infraestrutura otimizada com CDN global para carregamento instantâneo.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎬</div>
            <h3>Conteúdo Atualizado</h3>
            <p>Servidores sincronizados em tempo real. Sempre com os últimos lançamentos.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <h3>Multi-Dispositivo</h3>
            <p>Assista no seu TV, celular, tablet ou computador. Uma conta, todos os dispositivos.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <h3>Interface Intuitiva</h3>
            <p>Design moderno e fácil de usar. Encontre o que você quer assistir em segundos.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
