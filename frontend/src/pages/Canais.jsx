import React, { useState, useMemo } from 'react';
import { FaTv, FaFilter, FaSort, FaSearch } from 'react-icons/fa';
import { useCanais } from '../hooks/useApi';
import ChannelCard from '../components/ChannelCard';
import Loading from '../components/Loading';
import '../styles/Canais.css';

const Canais = () => {
  const { data: canaisData, loading, error } = useCanais();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Extrair categorias únicas
  const categories = useMemo(() => {
    if (!canaisData?.data) return [];
    const cats = [...new Set(canaisData.data.map(c => c.categoria).filter(Boolean))];
    return cats.sort();
  }, [canaisData]);

  // Filtrar e ordenar canais
  const filteredChannels = useMemo(() => {
    if (!canaisData?.data) return [];
    
    let channels = [...canaisData.data];

    // Filtro por busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      channels = channels.filter(c => 
        c.nome?.toLowerCase().includes(term) ||
        c.categoria?.toLowerCase().includes(term)
      );
    }

    // Filtro por categoria
    if (selectedCategory !== 'all') {
      channels = channels.filter(c => c.categoria === selectedCategory);
    }

    // Ordenação
    channels.sort((a, b) => {
      if (sortBy === 'name') {
        return (a.nome || '').localeCompare(b.nome || '');
      }
      return 0;
    });

    return channels;
  }, [canaisData, searchTerm, selectedCategory, sortBy]);

  if (loading) return <Loading />;
  
  if (error) {
    return (
      <div className="error-container">
        <FaTv className="error-icon" />
        <h2>Erro ao carregar canais</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="canais-page">
      {/* Header da página */}
      <div className="page-header">
        <div className="header-title">
          <FaTv className="header-icon" />
          <div>
            <h1>Canais de TV</h1>
            <p>{filteredChannels.length} canais disponíveis</p>
          </div>
        </div>
      </div>

      {/* Filtros e busca */}
      <div className="filters-bar">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Buscar canal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <div className="filter-select">
            <FaFilter />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Todas as categorias</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-select">
            <FaSort />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Nome</option>
              <option value="category">Categoria</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de canais */}
      {filteredChannels.length > 0 ? (
        <div className="channels-grid">
          {filteredChannels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <FaTv className="no-results-icon" />
          <h3>Nenhum canal encontrado</h3>
          <p>Tente ajustar os filtros ou buscar por outro termo.</p>
        </div>
      )}
    </div>
  );
};

export default Canais;
