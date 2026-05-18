import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaTv, FaStar } from 'react-icons/fa';
import '../styles/ChannelCard.css';

const ChannelCard = ({ channel }) => {
  const { id, nome, categoria, imagem } = channel;

  return (
    <Link to={`/player/channel/${id}`} className="channel-card">
      <div className="channel-poster">
        {imagem ? (
          <img 
            src={imagem} 
            alt={nome}
            className="channel-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="channel-placeholder">
            <FaTv />
          </div>
        )}
        
        <div className="channel-overlay">
          <button className="play-btn">
            <FaPlay />
          </button>
        </div>
        
        <div className="channel-badge">
          <span className="live-badge">AO VIVO</span>
        </div>
      </div>
      
      <div className="channel-info">
        <h3 className="channel-name">{nome || 'Canal'}</h3>
        <div className="channel-meta">
          <span className="category">{categoria || 'Geral'}</span>
        </div>
      </div>
    </Link>
  );
};

export default ChannelCard;
