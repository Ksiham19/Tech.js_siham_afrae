const axios = require('axios');
const inquirer = require('inquirer');
const { getPokemon, getRandomPokemon } = require('./pokemon');

let playerHP = 300;
let botHP = 300;

// Fonction pour choisir un Pokémon pour le joueur
async function playerChoosePokemon() {
  const { pokemonName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'pokemonName',
      message: 'Choisissez un Pokémon :',
      default: 'pikachu', // Suggestion par défaut
    },
  ]);

  const playerPokemon = await getPokemon(pokemonName.toLowerCase());
  console.log(`Vous avez choisi ${playerPokemon.name} !`);
  return playerPokemon;
}

// Fonction pour que le bot choisisse un Pokémon aléatoire
async function botChoosePokemon() {
  const botPokemon = await getRandomPokemon();
  console.log(`Le bot a choisi ${botPokemon.name} !`);
  return botPokemon;
}

// Fonction pour exécuter un combat
async function battle(playerPokemon, botPokemon) {
  console.log(`Début du combat entre ${playerPokemon.name} et ${botPokemon.name} !`);
  
  // Les deux combattants utilisent leurs attaques jusqu'à ce que l'un tombe à 0 HP
  while (playerHP > 0 && botHP > 0) {
    // Le joueur choisit une attaque
    const { chosenMove } = await inquirer.prompt([
      {
        type: 'list',
        name: 'chosenMove',
        message: `Choisissez une attaque pour ${playerPokemon.name} :`,
        choices: playerPokemon.moves.map((move, index) => ({
          name: `${move.name} (Power: ${move.power}, Accuracy: ${Math.floor(move.accuracy * 100)}%)`,
          value: index,
        })),
      },
    ]);

    // Exécution de l'attaque du joueur
    const playerMove = playerPokemon.moves[chosenMove];
    if (Math.random() < playerMove.accuracy) {
      botHP -= playerMove.power;
      console.log(`${playerPokemon.name} utilise ${playerMove.name} ! Bot HP restant : ${botHP}`);
    } else {
      console.log(`${playerPokemon.name} a raté son attaque !`);
    }

    // Vérification si le bot est KO
    if (botHP <= 0) break;

    // Le bot attaque le joueur
    let botMove = botPokemon.moves[Math.floor(Math.random() * botPokemon.moves.length)];
    if (Math.random() < botMove.accuracy) {
      playerHP -= botMove.power;
      console.log(`${botPokemon.name} utilise ${botMove.name} ! Player HP restant : ${playerHP}`);
    } else {
      console.log(`${botPokemon.name} a raté son attaque !`);
    }
  }

  // Affichage du gagnant
  if (playerHP <= 0) {
    console.log(`Le bot a gagné avec ${botHP} HP restants !`);
  } else {
    console.log(`Vous avez gagné avec ${playerHP} HP restants !`);
  }
}

// Fonction principale
async function main() {
  const playerPokemon = await playerChoosePokemon();
  const botPokemon = await botChoosePokemon();
  await battle(playerPokemon, botPokemon);
}

main();
