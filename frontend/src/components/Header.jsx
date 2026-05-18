import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaBell } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <span className="logo-icon">📺</span>
          <span className="logo-text">IPTV<span>Premium</span></span>
        </Link>
        
        <nav className="header-nav">
          <Link to="/canais" className="nav-link">Canais</Link>
          <Link to="/filmes" className="nav-link">Filmes</Link>
          <Link to="/series" className="nav-link">Séries</Link>
        </nav>
      </div>

      <div className="header-right">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar canais, filmes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <FaSearch />
          </button>
        </form>

        <button className="icon-btn">
          <FaBell />
        </button>
        
        <button className="user-btn">
          <FaUser />
          <span>Entrar</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
