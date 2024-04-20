import React,{useEffect,useState} from "react";
import axios from 'axios';

function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");
}

const fetchData = async  (url) => {
    try{
        const response = await axios.get(url);
        const result = response.data.result;

        const pokemonDetails = await Promise.all(
            result.map(async(pokemon) => {
                const detailResponse = await axios.get(pokemon.url);
                return detailResponse.data;
            } )
        )
    }
}