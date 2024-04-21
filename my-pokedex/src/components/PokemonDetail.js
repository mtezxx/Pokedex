import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

// Define a larger SVG arrow component for the back button
const BackArrowIcon = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
    </svg>
);

function PokemonDetail() {
  const [pokemonData, setPokemonData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
      const fetchPokemonData = async () => {
          if (!id) {
              return;
          }
          const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
          try {
              const response = await axios.get(url);
              setPokemonData(response.data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchPokemonData();
  }, [id]);

  if (!pokemonData) {
      return <div className="text-center mt-8 text-xl text-gray-800">Loading...</div>;
  }
  const capitalizeFirstLetter = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
};
  return (
    <div className="container mx-auto text-center mt-8 px-4 py-2">
    <h1 className="text-5xl font-bold text-gray-800 mb-6">{capitalizeFirstLetter(pokemonData.name)}</h1>
    {pokemonData.sprites.front_default && (
        <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="mx-auto mb-8 rounded-lg"
            style={{ width: '200px', height: '200px' }}
        />
    )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-start">
              <div className="bg-teal-500 shadow-lg rounded-lg p-5 text-slate-500 h-full">
                  <h2 className="text-xl font-semibold mb-3">Type(s):</h2>
                  <p className="text-lg">{pokemonData.types.map(type => type.type.name).join(', ')}</p>
              </div>
              <div className="bg-teal-500 shadow-lg rounded-lg p-5 text-slate-500 h-full">
                  <h2 className="text-xl font-semibold mb-3">Height:</h2>
                  <p className="text-lg">{pokemonData.height} m</p>
              </div>
              <div className="bg-teal-500 shadow-lg rounded-lg p-5 text-slate-500 h-full">
                  <h2 className="text-xl font-semibold mb-3">Weight:</h2>
                  <p className="text-lg">{pokemonData.weight} kg</p>
              </div>
              <div className="bg-teal-500 shadow-lg rounded-lg p-5 text-slate-500 h-full">
                  <h2 className="text-xl font-semibold mb-3">Abilities:</h2>
                  <ul className="overflow-y-auto max-h-40">
                      {pokemonData.abilities.map((ability, index) => (
                          <li key={index} className="text-lg">{ability.ability.name}</li>
                      ))}
                  </ul>
              </div>
              <div className="bg-teal-500 shadow-lg rounded-lg p-5 text-slate-500 col-span-1 lg:col-span-4">
                  <h2 className="text-xl font-semibold mb-3">Stats:</h2>
                  <ul>
                      {pokemonData.stats.map((stat, index) => (
                          <li key={index} className="text-lg">{stat.stat.name}: {stat.base_stat}</li>
                      ))}
                  </ul>
              </div>
          </div>
          <Link to="/" className="inline-block text-gray-800 hover:text-slate-500 mx-4 py-3 text-xl font-semibold"><BackArrowIcon /></Link>
      </div>
  );
}

export default PokemonDetail;
