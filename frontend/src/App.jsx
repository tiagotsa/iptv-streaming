import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Canais from './pages/Canais';
import Filmes from './pages/Filmes';
import Series from './pages/Series';
import Player from './pages/Player';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/canais" element={<Canais />} />
            <Route path="/filmes" element={<Filmes />} />
            <Route path="/series" element={<Series />} />
            <Route path="/player/:type/:id" element={<Player />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
