import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import PokemonDetail from './components/PokemonDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/about/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
