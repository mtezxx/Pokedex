import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");

    const fetchPokemonData = async (url) => {
      try {
        const response = await axios.get(url);
        const results = response.data.results;

        const pokemonDetails = await Promise.all(
          results.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            return detailsResponse.data;
          })
        );

        setPokemonList(pokemonDetails);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      fetchPokemonData("https://pokeapi.co/api/v2/pokemon/?limit=12");
    }, []);

    const handleNext = () => {
      fetchPokemonData(nextUrl);
    };

    const handlePrev = () => {
      fetchPokemonData(prevUrl);
    };

    return (
      <div className="min-h-screen bg-gradient-to-r from-teal-500 to-blue-500 text-center py-8">
        <h1 className="text-7xl font-serif font-black text-gray-700 mb-8">Pokédex</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {pokemonList.map((pokemon, index) => (
            <Link to={`/about/${pokemon.id}`} key={index} className="block bg-blue shadow-md rounded-lg p-4 hover:bg-gray-100 transition duration-300 ease-in-out">
              <li>
                {pokemon.sprites.front_default && (
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto w-24 h-24" />
                )}
                <p className="text-lg font-semibold mt-2">{`#${pokemon.id} ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</p>
              </li>
            </Link>
          ))}
        </ul>
        <div className="mt-8 mb-8 flex justify-center space-x-4">
    {prevUrl && (
        <button
            className="text-4xl font-semibold text-black hover:text-blue-700"
            onClick={handlePrev}
            aria-label="Previous"
        >
            ←
        </button>
    )}
    {nextUrl && (
        <button
            className="text-4xl font-semibold text-black hover:text-blue-700"
            onClick={handleNext}
            aria-label="Next"
        >
            →
        </button>
    )}
        </div>
      </div>
    );
}

export default Pokedex;
