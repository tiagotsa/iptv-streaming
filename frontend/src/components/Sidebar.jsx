import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaTv, 
  FaFilm, 
  FaVideo, 
  FaStar, 
  FaHeart, 
  FaHistory,
  FaCog,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import '../styles/Sidebar.css';

const menuItems = [
  { path: '/', icon: FaHome, label: 'Início' },
  { path: '/canais', icon: FaTv, label: 'Canais' },
  { path: '/filmes', icon: FaFilm, label: 'Filmes' },
  { path: '/series', icon: FaVideo, label: 'Séries' },
];

const userItems = [
  { path: '/favoritos', icon: FaHeart, label: 'Favoritos' },
  { path: '/historico', icon: FaHistory, label: 'Histórico' },
  { path: '/configuracoes', icon: FaCog, label: 'Configurações' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      <div className="sidebar-content">
        <div className="sidebar-section">
          <span className="section-title">Menu</span>
          <nav className="sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-section">
          <span className="section-title">Minha Conta</span>
          <nav className="sidebar-nav">
            {userItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
