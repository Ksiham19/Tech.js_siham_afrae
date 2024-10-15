const axios = require('axios');

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

// Fonction pour obtenir les informations d'un Pokémon
async function getPokemon(name) {
  try {
    const response = await axios.get(`${POKEAPI_URL}/${name}`);
    const data = response.data;
    const moves = data.moves.slice(0, 5).map(move => ({
      name: move.move.name,
      power: Math.floor(Math.random() * 50) + 1, // Puissance aléatoire entre 1 et 50
      accuracy: Math.random() // Précision aléatoire entre 0 et 1
    }));
    return {
      name: data.name,
      moves: moves
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données du Pokémon:', error);
  }
}

// Fonction pour obtenir un Pokémon aléatoire pour le bot
async function getRandomPokemon() {
  try {
    const randomId = Math.floor(Math.random() * 150) + 1; // Id aléatoire entre 1 et 150
    const response = await axios.get(`${POKEAPI_URL}/${randomId}`);
    const data = response.data;
    const moves = data.moves.slice(0, 5).map(move => ({
      name: move.move.name,
      power: Math.floor(Math.random() * 50) + 1, // Puissance aléatoire entre 1 et 50
      accuracy: Math.random() // Précision aléatoire entre 0 et 1
    }));
    return {
      name: data.name,
      moves: moves
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données du Pokémon:', error);
  }
}

module.exports = { getPokemon, getRandomPokemon };
