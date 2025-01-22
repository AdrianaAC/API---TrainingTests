import "./App.css";
import { useState, useEffect } from "react";
import WizardInput from "./components/wizardInput";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokeID, setPokeID] = useState(1);
  const [pokemon, setPokemon] = useState({
    name: "Bulbasaur",
    abilities: [],
    cries: {},
    base_experience: 64,
    height: 7,
    movers: [{ move: { name: "razor-leaf" } }],
    species: {
      name: "BulbaSaur",
    },
    weight: 136,
    sprites: {},
  });

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`).then((response) => {
      response.json().then((res) => {
        console.log("res:", res);
        setPokemon(res);
      });
    });
  }, [pokeID]);

  const handleNext = function () {
    setPokeID((prev) => prev + 1);
  };
  const handlePrevious = function () {
    setPokeID((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handlePickRandom = function () {
    setPokeID(Math.floor(Math.random() * 1000) + 1);
  };

  return (
    <div className="App">
      <h1>Wizard Data</h1>
      <WizardInput />
      <div className="PokemonApp">
        <h2 className="PokedexHeader">Consuela`s Pokedex</h2>
        <div>
          <PokemonCard
            id={pokeID}
            pokemon={pokemon}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            handlePickRandom={handlePickRandom}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
