import React,{useEffect,useState} from "react";
import axios from 'axios';

function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");
}

const fetchData = async 