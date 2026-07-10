import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import '../styles/EpisodeCard.css';

const EpisodeCard = ({ seriesId, season, episode, title, description }) => {
  return (
    <Link
      to={`/player/tv/${seriesId}?season=${season}&episode=${episode}`}
      className="episode-card"
    >
      <div className="episode-thumbnail">
        <div className="thumbnail-placeholder">
          <FaPlay />
        </div>
        <div className="episode-overlay">
          <button className="play-btn"><FaPlay /></button>
        </div>
      </div>
      <div className="episode-info">
        <h4>Episódio {episode}</h4>
        <p className="episode-title">{title || 'Sem título'}</p>
        <p className="episode-desc">{description}</p>
      </div>
    </Link>
  );
};

export default EpisodeCard;
